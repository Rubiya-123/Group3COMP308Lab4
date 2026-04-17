require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

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

   const response = await fetch(
  `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
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
              text: SYSTEM_PROMPT + "\n\n" + text,
            },
          ],
        },
      ],
    }),
  }
);

    const data = await response.json();

    console.log(data); 

    const output =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response";

    res.json({ result: output });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error generating notes" });
  }
});


  

app.listen(5000, () => console.log("Server running on port 5000"));
