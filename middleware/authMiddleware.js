//backend/middleware/authMiddleware.js
import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {
  console.log("🔥 Incoming cookies:", req.cookies);

  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}
