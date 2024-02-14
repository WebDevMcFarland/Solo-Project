const express = require('express');
const path = require('path');
// const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');


const app = express();
// const PORT = 3000; // Set the port to 3000


// Serve static files from the build directory
app.use(express.static(path.join(__dirname, '../dist')));

// Route handler for the /login route
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.get('/recipes', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '../dist/404.html'));
});



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});