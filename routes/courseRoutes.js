// //backend/routes/courseRoutes.js
// import express from "express";
// import Course from "../models/Course.js";

// const router = express.Router();

// // Get all courses
// router.get("/", async (req, res) => {
//   try {
//     const courses = await Course.find();
//     res.json(courses);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Add course
// router.post("/", async (req, res) => {
//   try {
//     const { key, name, description } = req.body;

//     const newCourse = new Course({
//       key,
//       name,
//       description
//     });

//     const saved = await newCourse.save();
//     res.status(201).json(saved);

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });


// // Update Course
// router.put("/:id", async (req, res) => {
//   try {
//     const { key, name, description } = req.body;
//     const updatedCourse = await Course.findByIdAndUpdate(
//       req.params.id,
//       { key, name, description },
//       { new: true }
//     );
//     res.json(updatedCourse);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Delete Course
// router.delete("/:id", async (req, res) => {
//   try {
//     await Course.findByIdAndDelete(req.params.id);
//     res.json({ message: "Course deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });


// export default router;

import express from "express";
import Course from "../models/Course.js";

const router = express.Router();


// GET ALL COURSES
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// CREATE COURSE
router.post("/", async (req, res) => {
  try {
    const { name, description } = req.body;

    const course = new Course({
      name,
      description,
    });

    const saved = await course.save();

    res.status(201).json(saved);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// UPDATE COURSE
router.put("/:id", async (req, res) => {
  try {
    const { name, description } = req.body;

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );

    res.json(updatedCourse);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// DELETE COURSE
router.delete("/:id", async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Course deleted successfully"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
