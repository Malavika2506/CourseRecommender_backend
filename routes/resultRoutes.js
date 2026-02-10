//backend/routes/resultRoutes.js
import express from "express";
import Question from "../models/Question.js";
import Result from "../models/Result.js";
import authMiddleware from "../middleware/authMiddleware.js";
import Student from "../models/Student.js";

const router = express.Router();

router.post("/submit", authMiddleware, async (req, res) => {
  const studentId = req.user.id;
  const { answers } = req.body;

  const questions = await Question.find().sort({ _id: 1 });

  const scores = {
    mern: 0,
    flutter: 0,
    datasci: 0,
    cybersecurity: 0,
    react: 0,
    pythonfs: 0,
    uiux: 0,
    devops: 0,
  };

  questions.forEach((q, index) => {
    if (answers[index] === "yes") {
      Object.entries(q.points).forEach(([course, value]) => {
        scores[course] += value;
      });
    }
  });

  const bestCourseKey = Object.keys(scores).reduce((a, b) =>
    scores[a] > scores[b] ? a : b
  );

  // 🔹 Save result
await Result.findOneAndUpdate(
  { studentId },
  {
    studentId,
    scores,
    recommended: bestCourseKey,
    details: courseDetails[bestCourseKey], // 👈 add details
  },
  { upsert: true, new: true }
);


  // 🔹 Save / update student (THIS MAKES ADMIN LIST WORK)
  await Student.findOneAndUpdate(
    { email: req.user.email },
    {
      name: req.user.name,
      email: req.user.email,
      answers,
      scores,
      bestCourse: bestCourseKey,
    },
    { upsert: true }
  );

  res.json({ recommended: bestCourseKey });
});


router.get("/me", authMiddleware, async (req, res) => {
  const result = await Result.findOne({ studentId: req.user.id })
    .sort({ updatedAt: -1 });

  if (!result) {
    return res.status(404).json({ message: "No result found" });
  }

  res.json(result);
});


export default router;
