const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// Live Result
app.get("/api/live", async (req, res) => {
  try {
    const response = await fetch("https://draw.ar-lottery01.com/WinGo/WinGo_1M.json");
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch live data" });
  }
});

// Analyze Route
app.get("/api/analyze", async (req, res) => {
  try {
    const response = await fetch("https://draw.ar-lottery01.com/WinGo/WinGo_1M/GetHistoryIssuePage.json");
    const data = await response.json();

    const results = data.data.list.map(item => parseInt(item.number));

    let frequency = {};
    let big = 0, small = 0, odd = 0, even = 0;

    results.forEach(num => {
      frequency[num] = (frequency[num] || 0) + 1;

      if (num >= 5) big++;
      else small++;

      if (num % 2 === 0) even++;
      else odd++;
    });

    let hotNumber = Object.keys(frequency).reduce((a, b) =>
      frequency[a] > frequency[b] ? a : b
    );

    let coldNumber = Object.keys(frequency).reduce((a, b) =>
      frequency[a] < frequency[b] ? a : b
    );

    res.json({
      totalRounds: results.length,
      frequency,
      big,
      small,
      odd,
      even,
      hotNumber,
      coldNumber,
      suggestion: `Based on trend, ${hotNumber} has higher probability`
    });

  } catch (error) {
    res.status(500).json({ error: "Analysis failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
