require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

app.post("/explain", async (req, res) => {

    const { code } = req.body;

    try {

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `
Explain this code in simple language.

Also provide:
1. What the code does
2. Time Complexity
3. Space Complexity
4. Possible Improvements

Code:

${code}
`
        });

        res.json({
            answer: response.text
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            answer: "Something went wrong!"
        });
    }
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});