const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("RT AI Backend Running 🚀");
});

// LIVE DATA ROUTE
app.get("/api/live", async (req, res) => {
  try {
    const response = await fetch(
      "https://draw.ar-lottery01.com/WinGo/WinGo_1M/GetHistoryIssuePage.json"
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Live fetch failed" });
  }
});

// ANALYZE ROUTE
app.get("/api/analyze", async (req, res) => {
  try {
    const response = await fetch(
      "https://draw.ar-lottery01.com/WinGo/WinGo_1M/GetHistoryIssuePage.json"
    );
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
      hotNumber,
      coldNumber,
      big,
      small,
      odd,
      even,
      suggestion: `Trend suggests ${hotNumber} is hot`
    });

  } catch (error) {
    res.status(500).json({ error: "Analysis failed" });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
