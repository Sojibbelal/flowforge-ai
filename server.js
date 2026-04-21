import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/generate", async (req, res) => {
  const { url } = req.body;

  // TEMP: fake response (no API cost)
  const result = `
Welcome Flow:
- Email 1: Welcome + Brand intro
- Email 2: Product benefits
- Email 3: Offer discount

Abandoned Cart:
- Reminder after 1 hour
- Discount after 24h

Chatbot:
- FAQ
- Order tracking
- Upsell suggestions
`;

  res.json({ result });
});

app.listen(3000, () => console.log("Server running"));