import express from "express";
import { createPost, getPosts } from "../controllers/postController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Secure endpoints with verifyToken middleware
router.post("/create", verifyToken, createPost);
router.get("/all", verifyToken, getPosts);

export default router;