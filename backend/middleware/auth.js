import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const SECRET = process.env.JWT_SECRET;
const router = express.Router();

// Middleware to validate token
export const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded; // Attach user info to the request
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token." });
  }
};

// Protected route
router.get("/protected", authenticateToken, (req, res) => {
  res.status(200).json({ message: "Access granted to protected route.", user: req.user });
});

export default router;
