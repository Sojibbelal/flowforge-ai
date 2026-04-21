import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.post("/generate", async (req, res) => {
  const { url } = req.body;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDPl7FGALb9aFeXLPm8HN91hMt9oSvoA8w`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Analyze Shopify store: ${url}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    const result =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response";

    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on", PORT));
