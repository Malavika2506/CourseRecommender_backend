//backend/routes/questionRoutes.js
import express from "express";
import Question from "../models/Question.js";

const router = express.Router();

// GET all questions
// router.get("/", async (req, res) => {
//   const questions = await Question.find();
//   res.json(questions);
// });

router.get("/", async (req, res) => {
  try {
    const questions = await Question.find().populate("course");
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ADD question
router.post("/", async (req, res) => {
  const question = new Question(req.body);
  await question.save();
  res.json(question);
});

export default router;
