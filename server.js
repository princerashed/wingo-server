const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/wingo', async (req, res) => {
    try {
        const response = await fetch('https://draw.ar-lottery01.com/WinGo/WinGo_1M.json');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "API Failed" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server running...");
});
