import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Database connection
import "./config/db.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";

// Initialize app
const app = express();

// Allowed frontend
const allowedOrigins = [
  "https://journal-app-git-main-sumayya-s-projects1.vercel.app",
  "https://journal-btdlq0a5p-sumayya-s-projects1.vercel.app"
];

// Helper to determine if an origin is allowed
const isOriginAllowed = (origin) => {
  if (!origin) return true;
  if (allowedOrigins.includes(origin)) return true;
  // Match localhost and 127.0.0.1 with any port
  if (/^https?:\/\/localhost(:\d+)?$/.test(origin)) return true;
  if (/^https?:\/\/127\.0\.0\.1(:\d+)?$/.test(origin)) return true;
  // Match Vercel deployments for sumayya's project
  if (/^https:\/\/journal-.*-sumayya-s-projects1\.vercel\.app$/.test(origin)) return true;
  return false;
};

// CORS Configuration
app.use(cors({
  origin: function (origin, callback) {
    if (isOriginAllowed(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

// Handle preflight requests
app.options("*", cors());

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Backend running successfully");
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});