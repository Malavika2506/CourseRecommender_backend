import express from "express";
import Student from "../models/Student.js";

const router = express.Router();

// get all students
router.get("/", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// submit answers
router.post("/submit", async (req, res) => {
  const { name, email, answers, questions } = req.body;

  const scores = {
    mern: 0, flutter: 0, datasci: 0, cybersecurity: 0,
    react: 0, pythonfs: 0, uiux: 0, devops: 0,
  };

  questions.forEach((q, i) => {
    if (answers[i]) {
      Object.keys(scores).forEach(course => {
        scores[course] += q.points[course] || 0;
      });
    }
  });

  const bestCourse = Object.keys(scores)
    .reduce((a, b) => scores[a] > scores[b] ? a : b);

  const student = new Student({ name, email, answers, scores, bestCourse });
  await student.save();

  res.json(student);
});

export default router;
