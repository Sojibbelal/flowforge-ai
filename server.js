// Refactor whole code

import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/generate", async (req, res) => {
  const { url } = req.body;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDPl7FGALb9aFeXLPm8HN91hMt9oSvoA8w`,
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
                  text: `
You are an expert eCommerce marketer.

Analyze this Shopify store: ${url}

Generate:

1. Welcome Email Flow (3 emails)
2. Abandoned Cart Flow (3 emails)
3. Chatbot Script (FAQ + sales)

Make it:
- High converting
- Personalized
- Clear and structured

Format properly with headings.
                  `,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    console.log("Gemini response:", data);

    const result =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from AI";

    res.json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message || "Something went wrong",
    });
  }
});

// ✅ ONLY ONE PORT DECLARATION
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));
