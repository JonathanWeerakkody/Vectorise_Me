// server.js - Simple static file server
const express = require('express');
const cors =require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000; // Use Render's port or 3000 locally

// Middleware
app.use(cors()); // Allow cross-origin requests if needed

// Serve static files from the 'public' directory
const publicPath = path.join(__dirname, 'public');
console.log(`Serving static files from: ${publicPath}`);
app.use(express.static(publicPath));

// Optional: Handle SPA routing if you ever need it by sending index.html for any unknown routes
// app.get('*', (req, res) => {
//   res.sendFile(path.join(publicPath, 'index.html'));
// });

// Start the server
app.listen(port, () => {
  console.log(`[vectorise.me] Server listening on port ${port}`);
  console.log(`Access the app at http://localhost:${port}`);
});
