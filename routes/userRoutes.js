//backend/routes/userRoutes.js
import express from "express";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// GET all students (from users collection)
router.get("/", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const students = await User.find({ role: "student" })
      .select("name email role");

    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

export default router;
