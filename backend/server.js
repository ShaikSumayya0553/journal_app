import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";

const app = express();

app.use(cors({
  origin: "https://journal-btdlq0a5p-sumayya-s-projects1.vercel.app",
  credentials: true
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

app.get("/", (req, res) => {
  res.send("Backend running successfully");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});