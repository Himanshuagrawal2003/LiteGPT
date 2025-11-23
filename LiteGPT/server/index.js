require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.post("/api/generate", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      },
      { headers: { "Content-Type": "application/json" } }
    );

    const result =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text ??
      "No response";

    res.json({ reply: result });
  } catch (error) {
    console.log(error.response?.data || error);
    res.status(500).json({ error: "API failed" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
