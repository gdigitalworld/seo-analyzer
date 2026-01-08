const express = require("express");
const cors = require("cors");
const analyzeSEO = require("./seoAnalyzer");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/analyze", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const report = await analyzeSEO(url);
    res.json(report);
  } catch (error) {
    res.status(500).json({
      error: "This website blocks automated analysis or is not accessible."
    });
  }
});

app.listen(5000, () => {
  console.log("✅ SEO Analyzer server running on http://localhost:5000");
});
