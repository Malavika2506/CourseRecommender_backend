import express from "express";
import Course from "../models/Course.js";

const router = express.Router();

// Get all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new course
router.post("/", async (req, res) => {
  try {
    const { name, description } = req.body;

    const newCourse = new Course({
      name,
      description,
    });

    const saved = await newCourse.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
