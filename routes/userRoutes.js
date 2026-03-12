// //backend/routes/userRoutes.js
import express from "express";
import User from "../models/User.js";
import Result from "../models/Result.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

/* GET ALL STUDENTS WITH THEIR RECOMMENDED COURSE */

router.get("/", authMiddleware, adminMiddleware, async (req, res) => {
  try {

    const students = await User.find({ role: "student" })
      .select("name email role");

    const studentsWithCourse = await Promise.all(
      students.map(async (student) => {

        const result = await Result.findOne({
          studentId: student._id
        }).populate("recommendedCourse");

        return {
          _id: student._id,
          name: student.name,
          email: student.email,
          role: student.role,
          bestCourse: result?.recommendedCourse?.name || null
        };
      })
    );

    res.status(200).json(studentsWithCourse);

  } catch (err) {
    console.error("User fetch error:", err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

export default router;
