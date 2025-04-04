// Import necessary libraries
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises; // Use promise version
const { execFile } = require('child_process');
// const sharp = require('sharp'); // <-- Can likely remove or comment out sharp

// Create an Express application
const app = express();
const port = process.env.PORT || 3000;

// --- Middleware ---
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Configure Multer (keep as is)
const storage = multer.diskStorage({ /* ... as before ... */ });
const imageFileFilter = (req, file, cb) => { /* ... as before ... */ };
const upload = multer({ storage: storage, fileFilter: imageFileFilter, limits: { fileSize: 10 * 1024 * 1024 } });

// --- API Endpoint for Image Conversion (Make it async) ---
app.post('/convert', upload.single('imageFile'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send({ error: 'No image file uploaded.' });
    }

    const inputImagePath = req.file.path;
    // No intermediate BMP needed now
    const outputSvgPath = inputImagePath + '.svg';

    // Define file paths for easier cleanup
    const filesToDelete = [inputImagePath, outputSvgPath]; // Only input and output now

    try {
        // --- Step 1: Run vtracer on the original input image ---
        // vtracer options:
        // -i : input file
        // -o : output file
        // --mode spline : output using bezier curves (smoother than polygon default)
        // --color_mode color : enable color tracing (default)
        // --filter_speckle 4 : ignore details smaller than 4 pixels (optional, adjust)
        // --path_precision 3 : digits of precision for path data (optional, adjust)

        const vtracerArgs = [
            '-i', inputImagePath,
            '-o', outputSvgPath,
            '--mode', 'spline', // Or 'polygon'
            // '--color_mode', 'color', // It's the default, so often optional
            // '--filter_speckle', '4', // Experiment with this
            // '--path_precision', '3'  // Experiment with this
        ];

        console.log(`[vectorise.me] Running VTracer: vtracer ${vtracerArgs.join(' ')}`);

        const vtracerPromise = new Promise((resolve, reject) => {
            execFile('vtracer', vtracerArgs, (error, stdout, stderr) => { // <-- Use 'vtracer' executable
                // Vtracer often outputs progress/info to stderr even on success
                if (stderr && !error) {
                    console.warn(`[vectorise.me] VTracer stderr (info/warnings): ${stderr}`);
                }
                if (error) {
                    console.error(`[vectorise.me] VTracer execution error: ${error}`);
                    console.error(`[vectorise.me] VTracer stderr: ${stderr}`);
                    error.stderr = stderr; // Attach stderr for better error reporting
                    return reject(error);
                }
                console.log('[vectorise.me] VTracer finished successfully.');
                console.log(`[vectorise.me] VTracer stdout: ${stdout}`);
                resolve(stdout);
            });
        });

        await vtracerPromise; // Wait for vtracer to finish

        // --- Step 2: Read the generated SVG ---
        console.log(`[vectorise.me] Reading SVG file: ${outputSvgPath}`);
        const svgData = await fs.readFile(outputSvgPath, 'utf8');

        // --- Send SVG back to client ---
        res.send({ svg: svgData });

    } catch (error) {
        console.error("[vectorise.me] Error during vtracer conversion process:", error);
        let userMessage = 'Image vectorization failed.';
         // Check for common vtracer or file system errors
         if (error.stderr && error.stderr.toLowerCase().includes('unsupported image format')) {
             userMessage = 'Uploaded image format is not supported by vtracer.';
         } else if (error.stderr && error.stderr.toLowerCase().includes('error')) {
             // Try to grab a useful part of the stderr
             userMessage = `Vectorization tool failed: ${error.stderr.split('\n')[0]}`;
         } else if (error.code === 'ENOENT') { // vtracer command not found
              userMessage = 'Vectorization tool (vtracer) not found on server.';
         } else if (error.message.includes('limit')) {
             userMessage = 'Image might be too large or complex to process.';
         }

        res.status(500).send({ error: userMessage });

    } finally {
         // --- Step 3: Cleanup temporary files ---
         console.log('[vectorise.me] Cleaning up temporary files...');
         for (const filePath of filesToDelete) {
             try {
                 await fs.unlink(filePath);
                 console.log(`[vectorise.me] Deleted: ${filePath}`);
             } catch (unlinkErr) {
                 if (unlinkErr.code !== 'ENOENT') {
                     console.error(`[vectorise.me] Error deleting file ${filePath}:`, unlinkErr);
                 }
             }
         }
         console.log('[vectorise.me] Cleanup complete.');
    }
});

// --- Error Handling Middleware (keep as is) ---
app.use((err, req, res, next) => { /* ... as before ... */ });

// --- Start the Server (keep as is) ---
app.listen(port, () => { /* ... as before ... */ });
