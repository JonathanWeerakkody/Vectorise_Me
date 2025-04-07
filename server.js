// server.js - Backend processing with vtracer v0.6.x
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
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, 'uploads');
        fs.mkdir(uploadPath, { recursive: true }) // Ensure exists
          .then(() => cb(null, uploadPath))
          .catch(err => cb(err));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const imageFileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Invalid file type. Only images allowed.'), false);
};

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
// Middleware to parse JSON and URL-encoded bodies (for form options)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/convert', upload.single('imageFile'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No image file uploaded.' });
    }

    const inputImagePath = req.file.path;
    const outputSvgPath = inputImagePath + '.svg';
    const filesToDelete = [inputImagePath, outputSvgPath]; // Files to cleanup

    console.log(`[Server INFO] Received file: ${inputImagePath}`);
    console.log(`[Server INFO] Options received:`, req.body);

    try {
        // --- Prepare vtracer Arguments ---
        const vtracerArgs = [
            '-i', inputImagePath, // Input file first
            '-o', outputSvgPath  // Output file next
        ];

        // Add options from request body if they exist and are valid
        // Define valid options based on vtracer 0.6.x help output
        const validOptions = [
            'colormode', // NOTE: Help shows 'colormode', form sends 'color_mode'. Let's try 'colormode' first.
                         // If it fails, we might need to map 'color_mode' from form to 'colormode' here.
            'mode',
            'corner_threshold',
            'splice_threshold',
            'segment_length',
            'filter_speckle',
            'color_precision',
            'gradient_step',
            'path_precision',
            'hierarchical',
            'preset' // Allow preset if added to UI later
        ];

        for (const key of validOptions) {
             // Use the key directly if the form 'name' matches the CLI flag name (without '--')
             // We handle the special case 'colormode' vs 'color_mode' below
             let cliKey = key;
             let formKey = key;

             // Special mapping for color_mode from form to colormode for CLI
             if (key === 'colormode') {
                 formKey = 'color_mode'; // The name attribute in the HTML form <select>
             }

             // Check if the data exists in the request body using the formKey
             if (req.body[formKey] !== undefined && req.body[formKey] !== null && req.body[formKey] !== '') {
                 // Validation for numeric types (optional but good)
                 const numericOpts = [
                    'corner_threshold', 'splice_threshold', 'segment_length',
                    'filter_speckle', 'color_precision', 'gradient_step', 'path_precision'
                 ];
                 if (numericOpts.includes(cliKey) && isNaN(parseFloat(req.body[formKey]))) {
                      console.warn(`[Server WARN] Invalid numeric value for ${cliKey} from form key ${formKey}: ${req.body[formKey]}`);
                      continue; // Skip invalid numeric option
                 }
                 // Add the CLI argument with '--' prefix and the cliKey
                 vtracerArgs.push(`--${cliKey}`, String(req.body[formKey]));
             }
         }

        console.log(`[Server INFO] Running VTracer: vtracer ${vtracerArgs.join(' ')}`);

        // --- Execute vtracer ---
        const vtracerPromise = new Promise((resolve, reject) => {
            execFile('vtracer', vtracerArgs, { timeout: 60000 }, (error, stdout, stderr) => { // 60 second timeout
                if (stderr && !error) console.warn(`[VTracer stderr]: ${stderr}`); // Log warnings
                if (error) {
                    console.error(`[VTracer Error]: ${error}`); // Log full error object
                    if (stderr) console.error(`[VTracer stderr]: ${stderr}`);
                    error.stderr = stderr; // Attach stderr for reporting
                    return reject(error);
                }
                console.log(`[VTracer stdout]: ${stdout}`); // Log success output
                resolve(stdout);
            });
        });

        await vtracerPromise; // Wait for completion or error
        console.log('[Server INFO] VTracer finished successfully.');

        // --- Read and Send SVG ---
        const svgData = await fs.readFile(outputSvgPath, 'utf8');
        res.json({ svg: svgData }); // Send result as JSON

    } catch (error) {
        // --- Handle Errors ---
        console.error("[Server ERROR] Conversion process failed:", error);
        let userMessage = 'Image vectorization failed.';
         if (error.code === 'ETIMEDOUT') {
             userMessage = 'Conversion timed out (image might be too complex or large).';
         } else if (error.stderr && error.stderr.toLowerCase().includes('unsupported image format')) {
             userMessage = 'Unsupported image format.';
         } else if (error.stderr && error.stderr.toLowerCase().includes('error')) {
             userMessage = `Vectorization tool error: ${error.stderr.split('\n')[0].trim()}`; // Get first line
         } else if (error.code === 'ENOENT') {
             userMessage = 'Vectorization tool (vtracer) not found on server. Check deployment.';
         } else if (error.message && error.message.includes('File too large')){
             userMessage = 'Uploaded file exceeds size limit.';
         } else if (error.message) {
              userMessage = `Error: ${error.message}`; // General error message
         }
        res.status(500).json({ error: userMessage });

    } finally {
        // --- Cleanup ---
        console.log('[Server INFO] Cleaning up temporary files...');
        for (const filePath of filesToDelete) {
            try {
                await fs.unlink(filePath); // Delete file asynchronously
                console.log(`[Server INFO] Deleted: ${filePath}`);
            } catch (unlinkErr) {
                // Ignore if file doesn't exist (e.g., output wasn't created due to error)
                if (unlinkErr.code !== 'ENOENT') {
                    console.error(`[Server WARN] Error deleting temp file ${filePath}:`, unlinkErr.message);
                }
            }
        }
    }
});


// --- Basic Error Handler ---
app.use((err, req, res, next) => {
    console.error("[Server ERROR] Unhandled Error:", err);
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: `Upload Error: ${err.message}` });
    } else if (err) {
        // Provide a generic error for anything else
        return res.status(500).json({ error: err.message || 'An unexpected server error occurred.' });
    }
    next();
});

// --- Start Server ---
app.listen(port, () => {
    console.log(`[vectorise.me] Server listening on port ${port}`);
});
