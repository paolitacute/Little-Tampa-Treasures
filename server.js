const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// 1. Serve all your static files (HTML, CSS, JS, Images) from the current directory
app.use(express.static(__dirname));

// 2. Catch-all route for 404 errors
// Because this is at the bottom, it only triggers if no file was found in step 1
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'));
});

// 3. Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});