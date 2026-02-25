const express = require("express");
const fetch = require("node-fetch");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

app.get("/api/result", async (req, res) => {
  try {
    const response = await fetch("https://draw.ar-lottery01.com/WinGo/WinGo_1M.json");
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
