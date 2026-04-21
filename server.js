import express from "express";
import cors from "cors";

const app = express();

/* =========================
   MIDDLEWARE (MUST BE FIRST)
========================= */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================
   HEALTH CHECK ROUTE
========================= */
app.get("/", (req, res) => {
  res.send("FlowForge AI Backend is running 🚀");
});

/* =========================
   MAIN AI ROUTE
========================= */
app.post("/generate", async (req, res) => {
  try {
    console.log("REQUEST HIT /generate");
    console.log("BODY:", req.body);

    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.AIzaSyDPl7FGALb9aFeXLPm8HN91hMt9oSvoA8w}`,
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
You are an expert eCommerce marketing strategist.

Analyze this Shopify store: ${url}

Generate:

1. Welcome Email Flow (3 emails)
2. Abandoned Cart Flow (3 emails)
3. Chatbot Script (FAQ + sales)

Make it:
- Highly converting
- Clear structure
- Actionable
                  `,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    console.log("GEMINI RESPONSE:", data);

    const result =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from AI";

    return res.json({ result });
  } catch (error) {
    console.error("ERROR:", error);

    return res.status(500).json({
      error: error.message || "Something went wrong",
    });
  }
});

/* =========================
   START SERVER
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
