// server.js - Simple static file server with explicit WASM MIME type
const express = require('express');
const cors = require('cors'); // Assuming you still want CORS
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Basic CORS setup

// --- PASTE THE SNIPPET HERE ---
// Explicitly set MIME type for .wasm files
app.use((req, res, next) => {
    // Check if the request URL ends with .wasm
    if (req.url.endsWith('.wasm')) {
        // Set the Content-Type header to application/wasm
        res.type('application/wasm');
        // Log to the server console for verification during testing/deployment
        console.log(`[Server INFO] Setting MIME type 'application/wasm' for: ${req.url}`);
    }
    // Pass control to the next middleware in the stack (like express.static)
    next();
});
// --- END OF PASTED SNIPPET ---


// Serve static files from the 'public' directory AFTER setting MIME type
const publicPath = path.join(__dirname, 'public');
console.log(`[Server INFO] Serving static files from: ${publicPath}`);
app.use(express.static(publicPath));


// Start the server
app.listen(port, () => {
  console.log(`[vectorise.me] Server listening on port ${port}`);
  console.log(`Access the app at http://localhost:${port}`);
});
