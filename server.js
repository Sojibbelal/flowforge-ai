import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
// Important Fix: Dynamic Port for render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));
// Dynamic port code end
app.post("/generate", async (req, res) => {
  const { url } = req.body;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDnvC-kol0e0PYS8cECUGNVpoRLWD4pWnk`,
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
    const data = await response.json();

    const result =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from AI";

    res.json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
  error: error.message || "Something went wrong"
});
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));
