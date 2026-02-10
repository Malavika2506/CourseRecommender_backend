//backend/routes/analytics.js
import express from "express";
import Student from "../models/Student.js";

const router = express.Router();

router.get("/courses", async (req, res) => {
  const students = await Student.find();

  const counts = {};
  students.forEach(s => {
    counts[s.bestCourse] = (counts[s.bestCourse] || 0) + 1;
  });

  res.json(counts);
});

export default router;
