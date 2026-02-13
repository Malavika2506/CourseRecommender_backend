//backend/routes/resultRoutes.js
import express from "express";
import Question from "../models/Question.js";
import Result from "../models/Result.js";
import authMiddleware from "../middleware/authMiddleware.js";
import Student from "../models/Student.js";

const router = express.Router();
const courseDetails = {
  mern: "Full stack development using MongoDB, Express, React, and Node.js.",
  flutter: "Cross-platform mobile app development using Flutter.",
  datasci: "Data analysis, visualization, and machine learning foundations.",
  cybersecurity: "Security fundamentals, networks, and ethical hacking.",
  react: "Frontend development with React ecosystem.",
  pythonfs: "Backend development using Python and frameworks.",
  uiux: "User interface and user experience design principles.",
  devops: "CI/CD, cloud, containers, and deployment automation.",
};

// router.post("/submit", authMiddleware, async (req, res) => {
//   // const studentId = req.user.id;
//   const studentId = req.user._id.toString();

//   const { answers } = req.body;

//   const questions = await Question.find().sort({ _id: 1 });

//   const scores = {
//     mern: 0,
//     flutter: 0,
//     datasci: 0,
//     cybersecurity: 0,
//     react: 0,
//     pythonfs: 0,
//     uiux: 0,
//     devops: 0,
//   };

//   questions.forEach((q, index) => {
//     if (answers[index] === "yes") {
//       Object.entries(q.points).forEach(([course, value]) => {
//         scores[course] += value;
//       });
//     }
//   });

//   const bestCourseKey = Object.keys(scores).reduce((a, b) =>
//     scores[a] > scores[b] ? a : b,
//   );

//   // 🔹 Save result
//   await Result.findOneAndUpdate(
//     { studentId },
//     {
//       studentId,
//       scores,
//       recommended: bestCourseKey,
//       details: courseDetails[bestCourseKey], // 👈 add details
//     },
//     { upsert: true, new: true },
//   );

//   // 🔹 Save / update student (THIS MAKES ADMIN LIST WORK)
//   await Student.findOneAndUpdate(
//     { email: req.user.email },
//     {
//       name: req.user.name,
//       email: req.user.email,
//       answers,
//       scores,
//       bestCourse: bestCourseKey,
//     },
//     { upsert: true },
//   );

//   res.json({ recommended: bestCourseKey });
// });

router.post("/submit", authMiddleware, async (req, res) => {
  try {
    const studentId = req.user._id;
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
      if (answers[index] === true) {
        Object.entries(q.points).forEach(([course, value]) => {
          scores[course] += value;
        });
      }
    });

    const bestCourseKey = Object.keys(scores).reduce((a, b) =>
      scores[a] > scores[b] ? a : b,
    );

    await Result.findOneAndUpdate(
      { studentId },
      {
        studentId,
        scores,
        recommended: bestCourseKey,
        details: courseDetails[bestCourseKey],
      },
      { upsert: true, new: true },
    );

    await Student.findOneAndUpdate(
      { email: req.user.email },
      {
        name: req.user.name,
        email: req.user.email,
        answers,
        scores,
        bestCourse: bestCourseKey,
      },
      { upsert: true },
    );

    res.json({ recommended: bestCourseKey });
  } catch (error) {
    console.error("Submit Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/me", authMiddleware, async (req, res) => {
  const result = await Result.findOne({
    studentId: req.user._id,
  }).sort({ updatedAt: -1 });

  if (!result) {
    return res.status(404).json({ message: "No result found" });
  }

  res.json(result);
});

export default router;
