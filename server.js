// server.js - Backend processing with vtracer
const express = require('express');
const multer = require('multer'); // For file uploads
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises; // Promise-based FS
const { execFile } = require('child_process'); // To run vtracer

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());

// --- Multer Configuration ---
// Store temporary uploads in an 'uploads/' directory
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, 'uploads');
         // Ensure the directory exists (use async FS)
         fs.mkdir(uploadPath, { recursive: true })
           .then(() => cb(null, uploadPath))
           .catch(err => cb(err));
    },
    filename: function (req, file, cb) {
        // Create a unique filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Filter for image files
const imageFileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only images allowed.'), false);
    }
};

// Configure Multer middleware
const upload = multer({
    storage: storage,
    fileFilter: imageFileFilter,
    limits: { fileSize: 15 * 1024 * 1024 } // 15MB limit
});

// --- Static Files ---
const publicPath = path.join(__dirname, 'public');
console.log(`[Server INFO] Serving static files from: ${publicPath}`);
app.use(express.static(publicPath));

// --- Conversion Endpoint ---
// Added options parsing from request body (requires middleware below)
app.use(express.json()); // Middleware to parse JSON body (for options)
app.use(express.urlencoded({ extended: true })); // Middleware for form data (alternative for options)

app.post('/convert', upload.single('imageFile'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No image file uploaded.' });
    }

    const inputImagePath = req.file.path;
    const outputSvgPath = inputImagePath + '.svg';
    const filesToDelete = [inputImagePath, outputSvgPath];

    console.log(`[Server INFO] Received file: ${inputImagePath}`);
    console.log(`[Server INFO] Conversion options received:`, req.body);

    try {
        // --- Prepare vtracer Arguments ---
        const vtracerArgs = [
            '-i', inputImagePath,
            '-o', outputSvgPath
        ];

        // Add options from request body if they exist and are valid
        const validOptions = [
            'mode', 'color_mode', 'corner_threshold', 'spline_threshold',
            'filter_speckle', 'color_precision', 'path_precision'
        ];
        for (const key of validOptions) {
             if (req.body[key] !== undefined && req.body[key] !== null && req.body[key] !== '') {
                 // Simple validation: Ensure numeric options are numbers if provided
                 const numericOpts = ['corner_threshold', 'spline_threshold', 'filter_speckle', 'color_precision', 'path_precision'];
                 if (numericOpts.includes(key) && isNaN(parseFloat(req.body[key]))) {
                      console.warn(`[Server WARN] Invalid numeric value received for ${key}: ${req.body[key]}`);
                      continue; // Skip invalid numeric option
                 }
                vtracerArgs.push(`--${key}`, String(req.body[key])); // Convert value to string
             }
         }

        console.log(`[Server INFO] Running VTracer: vtracer ${vtracerArgs.join(' ')}`);

        // --- Execute vtracer ---
        const vtracerPromise = new Promise((resolve, reject) => {
            execFile('vtracer', vtracerArgs, (error, stdout, stderr) => {
                if (stderr && !error) console.warn(`[VTracer stderr]: ${stderr}`);
                if (error) {
                    console.error(`[VTracer Error]: ${error}`);
                    if (stderr) console.error(`[VTracer stderr]: ${stderr}`);
                    error.stderr = stderr; // Attach for better reporting
                    return reject(error);
                }
                console.log(`[VTracer stdout]: ${stdout}`);
                resolve(stdout);
            });
        });

        await vtracerPromise; // Wait for vtracer to finish
        console.log('[Server INFO] VTracer finished successfully.');

        // --- Read and Send SVG ---
        const svgData = await fs.readFile(outputSvgPath, 'utf8');
        res.json({ svg: svgData }); // Send as JSON

    } catch (error) {
        console.error("[Server ERROR] Conversion process failed:", error);
        let userMessage = 'Image vectorization failed.';
         if (error.stderr && error.stderr.toLowerCase().includes('unsupported image format')) {
             userMessage = 'Unsupported image format.';
         } else if (error.stderr && error.stderr.toLowerCase().includes('error')) {
             userMessage = `Vectorization tool error: ${error.stderr.split('\n')[0]}`;
         } else if (error.code === 'ENOENT') {
             userMessage = 'Vectorization tool (vtracer) not found on server. Check deployment.';
         } else if (error.message.includes('File too large')){
             userMessage = 'Uploaded file exceeds size limit.';
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
                if (unlinkErr.code !== 'ENOENT') {
                    console.error(`[Server WARN] Error deleting temp file ${filePath}:`, unlinkErr.message);
                }
            }
        }
    }
});


// --- Basic Error Handler for Multer/Other Errors ---
app.use((err, req, res, next) => {
    console.error("[Server ERROR] Unhandled Error:", err);
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: `Upload Error: ${err.message}` });
    } else if (err) {
        return res.status(500).json({ error: err.message || 'An unexpected server error occurred.' });
    }
    next();
});


// --- Start Server ---
app.listen(port, () => {
    console.log(`[vectorise.me] Server listening on port ${port}`);
});
