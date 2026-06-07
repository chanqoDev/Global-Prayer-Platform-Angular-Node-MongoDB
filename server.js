import express from "express";
import cors from "cors";
// import { v4 as uuidv4 } from 'uuid';
import connectDB from './db.js';
import Prayer from "./models/Prayer.js";
// import dotenv from "dotenv"; // production env vars
// dotenv.config(); // load .env

const allowedOrigins = [
  "https://globalprayerwall.netlify.app",
  "http://localhost:4200",
    'http://127.0.0.1:4200',
]

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({origin: allowedOrigins,
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: true,
}));
app.use(express.json());

// connect to MongoDB
connectDB();

app.get("/", (req, res) => {
  res.send("🌍 Global Prayer Dashboard API is running");
});



// POST: save prayer to MongoDB
app.post("/api/prayers", async (req, res) => {
  try {
    const isoDate = req.body.date ? new Date(req.body.date) : new Date();
    const newPrayer = new Prayer({
      name: req.body.name,
      email: req.body.email,
      region: req.body.region,
      request: req.body.request,
      dateRaw: isoDate.toISOString(),
      dateFormatted: isoDate.toLocaleString("es-MX", { dateStyle: "short", timeStyle: "short" }),
      urgency: req.body.urgency,
    });

    const saved = await newPrayer.save();
    console.log("Prayer saved:", saved);
    res.status(201).json({ message: "Prayer saved successfully", data: saved });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET: fetch prayers
app.get("/api/prayers", async (req, res) => {
  try {
    const prayers = await Prayer.find().sort({ createdAt: -1 });
    res.json({ message: "Fetched prayers", data: prayers });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});



// DELETE
app.delete("/api/prayers/:id", async (req, res) => {
  try {
    await Prayer.findByIdAndDelete(req.params.id);
    res.json({ message: "Prayer deleted", id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// spin up server
app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
})
