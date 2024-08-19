const express = require('express');
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");

const apiKey = "AIzaSyB9mgcpq-9njYdbMtGb4_zr3b04h1MUp7g"; // Replace with actual key stored securely
const app = express();
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

app.post('/generate-text', async (req, res) => {
  const { prompt } = req.body; // Get user prompt from request body

  const parts = [
    { text: prompt },
    { text: "output: " },
  ];

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
    });
    res.json({ text: result.response.text() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3001, () => console.log('Server listening on port 3001'));
