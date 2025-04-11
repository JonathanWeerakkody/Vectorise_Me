// server.js - Backend processing with vtracer v0.6.x + SVG ViewBox Fix
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;
const { execFile } = require('child_process');
const sizeOf = require('image-size'); // <-- ADDED: For getting image dimensions
const { DOMParser, XMLSerializer } = require('@xmldom/xmldom'); // <-- ADDED: For parsing SVG

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// --- Multer Configuration ---
const storage = multer.diskStorage({
    destination: async (req, file, cb) => { // Use async here
        const uploadPath = path.join(__dirname, 'uploads');
        try {
            await fs.mkdir(uploadPath, { recursive: true }); // Ensure exists using async/await
            cb(null, uploadPath);
        } catch (err) {
            cb(err);
        }
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const imageFileFilter = (req, file, cb) => {
    // Allow common image types explicitly
    const allowedTypes = ['image/jpeg', 'image/png', 'image/bmp', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPG, PNG, BMP, WEBP allowed.'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: imageFileFilter,
    limits: { fileSize: 15 * 1024 * 1024 } // 15MB limit
});

// --- Static Files ---
const publicPath = path.join(__dirname, 'public');
console.log(`[Server INFO] Serving static files from: ${publicPath}`);
app.use(express.static(publicPath)); // Serve HTML, CSS, JS from 'public'

// --- Conversion Endpoint ---
app.post('/convert', upload.single('imageFile'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No image file uploaded.' });
    }

    const inputImagePath = req.file.path;
    const outputSvgPath = inputImagePath + '.svg';
    const filesToDelete = [inputImagePath, outputSvgPath]; // Files to cleanup
    let originalDimensions = null; // To store image dimensions

    console.log(`[Server INFO] Received file: ${inputImagePath} (${req.file.mimetype})`);
    console.log(`[Server INFO] Options received:`, req.body);

    try {
        // --- Get Original Image Dimensions ---
        try {
            originalDimensions = sizeOf(inputImagePath);
            console.log(`[Server INFO] Original dimensions: ${originalDimensions.width}x${originalDimensions.height}`);
        } catch (dimError) {
            console.warn(`[Server WARN] Could not get dimensions for ${inputImagePath}:`, dimError.message);
            // Proceed without dimensions, viewBox might be missing/wrong
        }

        // --- Prepare vtracer Arguments ---
        const vtracerArgs = [
            '-i', inputImagePath,
            '-o', outputSvgPath
        ];

        const validOptions = [
            'colormode', 'mode', 'corner_threshold', 'splice_threshold',
            'segment_length', 'filter_speckle', 'color_precision',
            'gradient_step', 'path_precision', 'hierarchical', 'preset'
        ];

        for (const key of validOptions) {
             let cliKey = key;
             let formKey = key;

             // Map form names to CLI flag names if different
             if (key === 'colormode') formKey = 'color_mode';

             if (req.body[formKey] !== undefined && req.body[formKey] !== null && req.body[formKey] !== '') {
                 const numericOpts = [
                    'corner_threshold', 'splice_threshold', 'segment_length',
                    'filter_speckle', 'color_precision', 'gradient_step', 'path_precision'
                 ];
                 if (numericOpts.includes(cliKey) && isNaN(parseFloat(req.body[formKey]))) {
                      console.warn(`[Server WARN] Invalid numeric value for ${cliKey} from form key ${formKey}: ${req.body[formKey]}`);
                      continue;
                 }
                 vtracerArgs.push(`--${cliKey}`, String(req.body[formKey]));
             }
         }

        console.log(`[Server INFO] Running VTracer: vtracer ${vtracerArgs.join(' ')}`);

        // --- Execute vtracer ---
        const vtracerPromise = new Promise((resolve, reject) => {
            execFile('vtracer', vtracerArgs, { timeout: 60000 }, (error, stdout, stderr) => {
                if (stderr && !error) console.warn(`[VTracer stderr]: ${stderr}`);
                if (error) {
                    console.error(`[VTracer Error]: Exit code ${error.code}, Signal ${error.signal}`);
                    if (stderr) console.error(`[VTracer stderr]: ${stderr}`);
                    error.stderrContent = stderr; // Attach stderr for reporting
                    return reject(error);
                }
                console.log(`[VTracer stdout]: ${stdout}`);
                resolve(stdout);
            });
        });

        await vtracerPromise;
        console.log('[Server INFO] VTracer finished successfully.');

        // --- Read Generated SVG ---
        let svgData = await fs.readFile(outputSvgPath, 'utf8');

        // --- START: Modify SVG for ViewBox and Scaling ---
        try {
            const parser = new DOMParser();
            // Important: Use error handler to catch parsing issues
            let parseError = null;
            const doc = parser.parseFromString(svgData, 'image/svg+xml', {
                 locator: {}, // Required for errorHandler
                 errorHandler: (level, msg) => {
                     if (level === 'error' || level === 'fatalError') {
                         parseError = msg;
                         console.error(`[SVG Parse ${level}]: ${msg}`);
                     } else {
                         console.warn(`[SVG Parse ${level}]: ${msg}`);
                     }
                 }
             });

            if (parseError) {
                throw new Error(`SVG Parsing failed: ${parseError}`);
            }

            const svgElement = doc.documentElement; // Get the root <svg> element

            if (!svgElement || svgElement.nodeName !== 'svg') {
                 throw new Error('Could not find root <svg> element in VTracer output.');
            }

            // 1. Ensure viewBox is present (using original dimensions if available)
            if (!svgElement.getAttribute('viewBox') && originalDimensions) {
                svgElement.setAttribute('viewBox', `0 0 ${originalDimensions.width} ${originalDimensions.height}`);
                console.log(`[Server FIX] Added viewBox="0 0 ${originalDimensions.width} ${originalDimensions.height}"`);
            } else if (svgElement.getAttribute('viewBox')) {
                 console.log('[Server INFO] SVG already has viewBox:', svgElement.getAttribute('viewBox'));
            } else {
                 console.warn('[Server WARN] Cannot add viewBox: original dimensions unknown.');
            }

            // 2. Remove width/height attributes IF they have units (like px, cm, %)
            const widthAttr = svgElement.getAttribute('width');
            const heightAttr = svgElement.getAttribute('height');
            const hasUnit = (attr) => attr && /[a-z%]/i.test(attr); // Check for letters or %

            if (hasUnit(widthAttr)) {
                svgElement.removeAttribute('width');
                console.log('[Server FIX] Removed width attribute with unit:', widthAttr);
            }
            if (hasUnit(heightAttr)) {
                svgElement.removeAttribute('height');
                console.log('[Server FIX] Removed height attribute with unit:', heightAttr);
            }

             // 3. OPTIONAL: Add unitless width/height matching viewBox (if viewBox exists and they are missing)
            // This can sometimes help rendering consistency, but viewBox is the primary driver
             const viewBox = svgElement.getAttribute('viewBox');
             if (viewBox) {
                 const parts = viewBox.split(/[,\s]+/); // Split by space or comma
                 if (parts.length === 4) {
                     const vbWidth = parts[2];
                     const vbHeight = parts[3];
                     if (!svgElement.hasAttribute('width') || hasUnit(svgElement.getAttribute('width'))) {
                         svgElement.setAttribute('width', vbWidth);
                         console.log(`[Server FIX] Set unitless width="${vbWidth}"`);
                     }
                     if (!svgElement.hasAttribute('height') || hasUnit(svgElement.getAttribute('height'))) {
                         svgElement.setAttribute('height', vbHeight);
                          console.log(`[Server FIX] Set unitless height="${vbHeight}"`);
                     }
                 }
             }


            // Serialize the modified SVG back to a string
            const serializer = new XMLSerializer();
            svgData = serializer.serializeToString(svgElement); // Update svgData with modified version

        } catch (svgModifyError) {
            console.error('[Server ERROR] Failed to modify SVG:', svgModifyError.message);
            // Send the original SVG data anyway, maybe the frontend can handle it
            console.warn('[Server WARN] Sending potentially unmodified SVG due to modification error.');
        }
        // --- END: Modify SVG ---

        // --- Send Response ---
        res.json({ svg: svgData });

    } catch (error) {
        // --- Handle Errors ---
        console.error("[Server ERROR] Conversion process failed:", error);
        let userMessage = 'Image vectorization failed.';
         if (error.code === 'ETIMEDOUT') {
             userMessage = 'Conversion timed out (image might be too complex or large).';
         } else if (error.stderrContent && error.stderrContent.toLowerCase().includes('unsupported image format')) {
             userMessage = 'Unsupported image format provided to vectorizer.';
         } else if (error.stderrContent && error.stderrContent.toLowerCase().includes('error')) {
             // Try to extract a more specific error from vtracer stderr
              const firstErrorLine = error.stderrContent.split('\n').find(line => line.toLowerCase().includes('error'));
              userMessage = firstErrorLine ? `Vectorizer Error: ${firstErrorLine.trim()}` : 'Vectorization tool encountered an error.';
         } else if (error.code === 'ENOENT') {
             userMessage = 'Vectorization tool (vtracer) not found or not executable on server.';
             console.error("Please ensure 'vtracer' is installed and in the system's PATH or provide the full path.");
         } else if (error.message && error.message.includes('File too large')){
             userMessage = 'Uploaded file exceeds size limit (15MB).';
         } else if (error.message) {
              userMessage = `Error: ${error.message}`;
         }
        res.status(500).json({ error: userMessage });

    } finally {
        // --- Cleanup ---
        console.log('[Server INFO] Cleaning up temporary files...');
        for (const filePath of filesToDelete) {
            try {
                await fs.unlink(filePath);
                console.log(`[Server INFO] Deleted: ${filePath}`);
            } catch (unlinkErr) {
                if (unlinkErr.code !== 'ENOENT') { // Don't log error if file never existed
                    console.error(`[Server WARN] Error deleting temp file ${filePath}:`, unlinkErr.message);
                }
            }
        }
    }
});


// --- Basic Error Handler ---
app.use((err, req, res, next) => {
    console.error("[Server ERROR] Unhandled Error:", err.stack || err); // Log stack trace
    if (err instanceof multer.MulterError) {
        // Handle specific Multer errors (like file size limit)
        if (err.code === 'LIMIT_FILE_SIZE') {
             return res.status(400).json({ error: 'File too large. Maximum size is 15MB.' });
        }
        return res.status(400).json({ error: `Upload Error: ${err.message}` });
    } else if (err.message.includes('Invalid file type')) {
         // Handle the custom file type error from filter
         return res.status(400).json({ error: err.message });
    } else if (res.headersSent) {
        // If headers already sent, delegate to default Express handler
        return next(err);
    } else {
        // Provide a generic error for anything else
        res.status(500).json({ error: 'An unexpected server error occurred.' });
    }
});

// --- Start Server ---
app.listen(port, () => {
    console.log(`[vectorise.me] Server listening on port ${port}`);
    console.log(`[vectorise.me] Access the app at http://localhost:${port}`);
});