const express = require('express');
const { nanoid } = require('nanoid');
const { exec } = require('child_process'); // Windows own builtin tool

const app = express();
app.use(express.json());
app.use(express.static(__dirname));

const urlDatabase = {}; 

// 1. URL Shorten -> API Endpoint
app.post('/api/shorten', (req, res) => {
    try {
        const { longUrl } = req.body;
        if (!longUrl) {
            return res.status(400).json({ error: 'Please provide a URL' });
        }
        const shortCode = nanoid(6);
        urlDatabase[shortCode] = longUrl;
        res.json({ shortUrl: `http://localhost:5000/${shortCode}` });
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
});

// 2. Redirect Route
app.get('/:shortCode', (req, res) => {
    try {
        const { shortCode } = req.params;
        const originalUrl = urlDatabase[shortCode];
        if (originalUrl) {
            return res.redirect(originalUrl);
        } else {
            return res.status(404).json({ error: 'URL not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
});

// 3. Server Start and AUTO Browser Open logic
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    
    
    
    exec('start http://localhost:5000/index.html');
});