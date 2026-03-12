// //backend/routes/authRoutes.js
// import express from "express";
// import { login, register } from "../controllers/authController.js";

// const router = express.Router();

// router.post("/login", login);
// router.post("/register", register);

// export default router;

// backend/routes/authRoutes.js

import express from "express";
import {
  register,
  login,
  updateAdminSettings,
  getAdminProfile,
  getStudentProfile,
  updateStudentProfile,
} from "../controllers/authController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

/* ---------- AUTH ---------- */

router.post("/register", register);
router.post("/login", login);


/* ---------- STUDENT PROFILE ---------- */

router.get(
  "/student-profile",
  authMiddleware,
  getStudentProfile
);

router.put(
  "/update-student",
  authMiddleware,
  updateStudentProfile
);


/* ---------- ADMIN SETTINGS ---------- */

// Get admin profile
router.get(
  "/admin-profile",
  authMiddleware,
  adminMiddleware,
  getAdminProfile
);

// Update admin settings
router.put(
  "/update-admin",
  authMiddleware,
  adminMiddleware,
  updateAdminSettings
);

export default router;

