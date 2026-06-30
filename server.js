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

    if (!code) {
        return res.status(400).json({
            answer: "Please provide some code."
        });
    }

    try {

        const response = await ai.models.generateContent({

            model: "gemini-2.5-flash",

            contents: `
You are a programming teacher.

Explain the following code in very simple English.

Rules:
- Explain like you are teaching a complete beginner.
- Explain every important line separately.
- Use bullet points.
- Keep every point short.
- Never use difficult English.
- Explain why each line is written.
- If removed, explain what happens.
- Use markdown.

Return exactly in this format.

# 🚀 Program Summary

Explain the program in 2-3 simple sentences.

---

# 📝 Line by Line Explanation

For every important line use this format.

### Line 1

Code

\`\`\`cpp
#include<iostream>
\`\`\`

Explanation

• What this line does.

• Why it is needed.

• What happens if removed.

---

Continue for all important lines.

Explain:
- #include
- using namespace std
- int main()
- variable declarations
- loops
- if statements
- functions
- return statement

---

# ▶ Dry Run

Show step-by-step variable changes.

If there is no loop, write:

No dry run required.

---

# 📤 Output

Show only the output.

---

# ⏱ Time Complexity

Write complexity and one short reason.

---

# 💾 Space Complexity

Write complexity and one short reason.

---

# 💡 Improvements

Give exactly 3 simple improvements.

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});