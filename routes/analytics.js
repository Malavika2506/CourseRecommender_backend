// //backend/routes/analytics.js
import express from "express";
import Result from "../models/Result.js";
import Course from "../models/Course.js";

const router = express.Router();

router.get("/courses", async (req, res) => {
  try {
    const results = await Result.find().populate("recommendedCourse");

    const counts = {};

    results.forEach((r) => {
      const courseName = r.recommendedCourse?.name;

      if (courseName) {
        counts[courseName] = (counts[courseName] || 0) + 1;
      }
    });

    res.json(counts);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Analytics error" });
  }
});

export default router;
