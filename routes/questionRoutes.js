// //backend/routes/questionRoutes.js
// import express from "express";
// import Question from "../models/Question.js";

// const router = express.Router();

// // GET all questions
// router.get("/", async (req, res) => {
//   try {
//     const questions = await Question.find().populate("courses");
//     res.json(questions);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // ADD question
// router.post("/", async (req, res) => {
//   try {
//     const { text, points, courses } = req.body;

//     const question = new Question({
//       text,
//       points,
//       courses,
//     });

//     const saved = await question.save();
//     res.json(saved);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// export default router;


// backend/routes/questionRoutes.js

import express from "express";
import Question from "../models/Question.js";

const router = express.Router();

/* GET ALL QUESTIONS */
router.get("/", async (req, res) => {
  try {
    const questions = await Question.find().populate("courses");
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ADD QUESTION */
router.post("/", async (req, res) => {
  try {
    const { text, points, courses } = req.body;

    const question = new Question({
      text,
      points,
      courses,
    });

    const saved = await question.save();
    res.json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* UPDATE QUESTION */
router.put("/:id", async (req, res) => {
  try {
    const { text, points, courses } = req.body;

    const updated = await Question.findByIdAndUpdate(
      req.params.id,
      { text, points, courses },
      { new: true }
    ).populate("courses");

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* DELETE QUESTION */
router.delete("/:id", async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);

    res.json({
      message: "Question deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
