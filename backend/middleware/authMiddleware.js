import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  
  if (!authHeader) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  const token = authHeader.startsWith("Bearer ") 
    ? authHeader.split(" ")[1] 
    : authHeader;

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || "journal_app_jwt_secret_token_key_2026");
    req.user = verified; // Contains user session { id, email, name }
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid or expired token." });
  }
};
