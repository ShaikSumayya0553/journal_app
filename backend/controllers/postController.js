import db from "../config/db.js";

// Create a new post linked to the authenticated user
export const createPost = (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id; // Attached by verifyToken middleware

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  const sql = "INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)";
  
  db.query(sql, [title, content, userId], (err, result) => {
    if (err) {
      console.error("Create post error:", err);
      return res.status(500).json({ error: "Database error during post creation" });
    }
    
    return res.status(201).json({ 
      message: "Post created successfully",
      postId: result.insertId 
    });
  });
};

// Retrieve only the posts that belong to the logged-in user
export const getPosts = (req, res) => {
  const userId = req.user.id; // Attached by verifyToken middleware

  const sql = "SELECT * FROM posts WHERE user_id = ? ORDER BY id DESC";

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Get posts error:", err);
      return res.status(500).json({ error: "Database error while fetching posts" });
    }

    return res.json(result);
  });
};