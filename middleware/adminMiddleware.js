// backend/middleware/adminMiddleware.js
export default function adminMiddleware(req, res, next) {
  // authMiddleware already verified JWT and set req.user
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access denied" });
  }
  next();
}
