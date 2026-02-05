import express from "express";
import Question from "../models/Question.js";
import Result from "../models/Result.js";

const router = express.Router();

const COURSES = {
  mern: "MERN Stack",
  flutter: "Flutter Development",
  datasci: "Data Science",
  cybersecurity: "Cyber Security",
  react: "React Front-End",
  pythonfs: "Python Full Stack",
  uiux: "UI/UX Design",
  devops: "DevOps",
};

// SUBMIT answers
router.post("/submit", async (req, res) => {
  const { studentId, answers } = req.body;
  const questions = await Question.find();

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
      Object.keys(q.points).forEach(course => {
        scores[course] += q.points[course];
      });
    }
  });

  const bestCourseKey = Object.keys(scores).reduce((a, b) =>
    scores[a] > scores[b] ? a : b
  );

  const result = new Result({
    studentId,
    scores,
    recommended: COURSES[bestCourseKey],
  });

  await result.save();
  res.json(result);
});

// GET result
router.get("/:studentId", async (req, res) => {
  const result = await Result.findOne({ studentId: req.params.studentId });
  res.json(result);
});

export default router;
