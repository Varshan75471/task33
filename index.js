const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Endpoint 1: Create a text file with the current timestamp
app.post('/create-file', (req, res) => {
    // Generate filename with current date and time
    const date = new Date();
    const filename = `${date.toISOString().replace(/:/g, '-')}.txt`;
    const content = date.toISOString();

    // File path
    const filePath = path.join(__dirname, 'files', filename);

    // Write the timestamp to the file
    fs.writeFile(filePath, content, (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return res.status(500).send('Error creating file.');
        }
        res.send({ message: 'File created successfully', filename });
    });
});

// Endpoint 2: Retrieve all text files from the folder
app.get('/get-files', (req, res) => {
    const folderPath = path.join(__dirname, 'files');

    // Read the folder and filter only `.txt` files
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error('Error reading folder:', err);
            return res.status(500).send('Error retrieving files.');
        }
        const textFiles = files.filter(file => path.extname(file) === '.txt');
        res.send({ files: textFiles });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
