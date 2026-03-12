// //backend/routes/resultRoutes.js
import express from "express";
import Question from "../models/Question.js";
import Result from "../models/Result.js";
import Course from "../models/Course.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { getRecentActivity } from "../controllers/resultController.js";

const router = express.Router();

/* -------- RECENT ACTIVITY (ADMIN DASHBOARD) -------- */
router.get("/activity", getRecentActivity);

/* -------- SUBMIT QUIZ -------- */
router.post("/submit", authMiddleware, async (req, res) => {
  try {
    const studentId = req.user._id;
    const { answers } = req.body;

    const questions = await Question.find().sort({ _id: 1 });

    const scores = {};

    questions.forEach((q, index) => {
      if (answers[index] === true) {
        q.courses.forEach((courseId) => {
          scores[courseId] = (scores[courseId] || 0) + 1;
        });
      }
    });

    let bestCourseId = null;
    let maxScore = -1;

    Object.keys(scores).forEach((courseId) => {
      if (scores[courseId] > maxScore) {
        maxScore = scores[courseId];
        bestCourseId = courseId;
      }
    });

    const course = await Course.findById(bestCourseId);

    if (!course) {
      return res.status(404).json({
        message: "Course not found in database",
      });
    }

    const result = await Result.findOneAndUpdate(
      { studentId },
      {
        studentId,
        scores,
        recommendedCourse: course._id,
      },
      { upsert: true, new: true }
    );

    res.json({
      success: true,
      result,
    });

  } catch (error) {
    console.error("Submit Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

/* -------- GET STUDENT RESULT -------- */
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const result = await Result.findOne({
      studentId: req.user._id,
    }).populate("recommendedCourse");

    if (!result) {
      return res.status(404).json({
        message: "No result found",
      });
    }

    res.json(result);

  } catch (error) {
    console.error("Result Fetch Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
