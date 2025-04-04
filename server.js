// Import necessary libraries
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { execFile } = require('child_process'); // To run external commands like potrace

// Create an Express application
const app = express();
const port = process.env.PORT || 3000; // Use environment port or 3000

// --- Middleware ---
app.use(cors());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files (HTML, CSS, JS, Assets)

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, 'uploads');
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const imageFileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files (JPG, PNG, WEBP etc.) are allowed!'), false);
    }
};

const upload = multer({ storage: storage, fileFilter: imageFileFilter, limits: { fileSize: 10 * 1024 * 1024 } }); // Add file size limit (e.g., 10MB)

// --- API Endpoint for Image Conversion ---
app.post('/convert', upload.single('imageFile'), (req, res) => {
    if (!req.file) {
        return res.status(400).send({ error: 'No image file uploaded.' });
    }

    const inputImagePath = req.file.path;
    const outputSvgPath = inputImagePath + '.svg'; // Temporary SVG path

    // Potrace arguments (Simple B&W tracing)
    // -s: SVG output, -o: output file, input file last
    // --turdsize 2: Suppress small speckles (adjust as needed)
    const potraceArgs = ['-s', '-o', outputSvgPath, inputImagePath, '--turdsize', '2'];

    console.log(`[vectorise.me] Running Potrace: potrace ${potraceArgs.join(' ')}`);

    // Execute Potrace
    execFile('potrace', potraceArgs, (error, stdout, stderr) => {
        // --- INPUT FILE DELETION ---
        fs.unlink(inputImagePath, (unlinkErr) => {
            if (unlinkErr) console.error("[vectorise.me] Error deleting input image:", unlinkErr);
            else console.log("[vectorise.me] Deleted input image:", inputImagePath);
        });
        // -----------------------------

        if (error) {
            console.error(`[vectorise.me] Potrace execution error: ${error}`);
            console.error(`[vectorise.me] Potrace stderr: ${stderr}`);
             // Cleanup attempt for potentially created (but invalid) SVG
            fs.unlink(outputSvgPath, () => {}); // Ignore error if file doesn't exist

            if (error.code === 'ENOENT') {
                 return res.status(500).send({ error: 'Conversion tool (Potrace) not found on server. Deployment setup might be needed.' });
            }
            return res.status(500).send({ error: `Image conversion failed. Error: ${stderr || error.message}` });
        }

         if (stderr) {
            console.warn(`[vectorise.me] Potrace stderr (might be warnings): ${stderr}`);
        }

        console.log('[vectorise.me] Potrace finished successfully.');

        // Read the generated SVG file
        fs.readFile(outputSvgPath, 'utf8', (readErr, svgData) => {
            // --- OUTPUT SVG FILE DELETION ---
            fs.unlink(outputSvgPath, (unlinkSvgErr) => {
                if (unlinkSvgErr) console.error("[vectorise.me] Error deleting SVG file:", unlinkSvgErr);
                 else console.log("[vectorise.me] Deleted output SVG:", outputSvgPath);
            });
            // ------------------------------

            if (readErr) {
                console.error("[vectorise.me] Error reading SVG file:", readErr);
                return res.status(500).send({ error: 'Could not read conversion result.' });
            }

            // Send the SVG data back to the frontend
            res.send({ svg: svgData });
        });
    });
});

// --- Error Handling Middleware ---
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        console.error("[vectorise.me] Multer error:", err);
        return res.status(400).send({ error: `File upload error: ${err.message}${err.code === 'LIMIT_FILE_SIZE' ? '. Max size 10MB.' : ''}` });
    } else if (err) {
        console.error("[vectorise.me] General error:", err);
         return res.status(400).send({ error: err.message || 'An unexpected error occurred.' });
    }
    next();
});


// --- Start the Server ---
app.listen(port, () => {
    console.log(`[vectorise.me] Server listening at http://localhost:${port}`);
});
