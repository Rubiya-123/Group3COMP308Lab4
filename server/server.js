require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

if (!process.env.GEMINI_API_KEY) {
  console.error("Missing GEMINI_API_KEY in .env");
  process.exit(1);
}

const SYSTEM_PROMPT = `
You are an AI study assistant.

Your task is to convert raw text into structured study notes.

Rules:
- Output ONLY in this format:

Summary:
- ...

Key Points:
- ...
- ...

Important Terms:
- Term: Definition

- Keep it concise and easy to study
- Do NOT add extra commentary
- Do NOT change format
`;

app.post("/api/generate", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        error: "Input text is required.",
      });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `${SYSTEM_PROMPT}\n\n${text}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error?.message || "Failed to generate notes.",
      });
    }

    const output =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

    res.json({ result: output });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({
      error: "Server error while generating notes.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});