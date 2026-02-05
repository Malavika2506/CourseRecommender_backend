import express from "express";
import Question from "../models/Question.js";
import Result from "../models/Result.js";
import authMiddleware from "../middleware/authMiddleware.js";

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

  const result = await Result.create({
    studentId,
    scores,
    recommended: bestCourseKey,
  });

  res.json(result);
});

router.get("/me", authMiddleware, async (req, res) => {
  const result = await Result.findOne({ studentId: req.user.id });
  res.json(result);
});

export default router;
