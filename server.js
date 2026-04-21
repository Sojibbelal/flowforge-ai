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
   OPTIONAL BROWSER TEST ROUTE
========================= */
app.get("/generate", (req, res) => {
  res.send("Use POST /generate instead 🚀");
});

/* =========================
   MAIN AI ROUTE
========================= */
console.log("API KEY:", process.env.GEMINI_API_KEY); // Temp code for debugging

app.post("/generate", async (req, res) => {
  try {
    console.log("REQUEST HIT /generate");
    console.log("BODY:", req.body);

    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
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
                  text: `
You are an expert eCommerce marketer.

Analyze this Shopify store: ${url}

Generate:

1. Welcome Email Flow (3 emails)
2. Abandoned Cart Flow (3 emails)
3. Chatbot Script (FAQ + sales)

Make it:
- High converting
- Clear structure
- Actionable output
                  `,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

console.log("FULL GEMINI RESPONSE:", JSON.stringify(data, null, 2));

if (!data || data.error) {
  return res.json({
    result: "Gemini API Error: " + (data?.error?.message || "Unknown error")
  });
}

const result =
  data?.candidates?.[0]?.content?.parts?.[0]?.text;

if (!result) {
  return res.json({
    result: "No valid AI response received. Check logs."
  });
}

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
