// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";
// import authRoutes from "./routes/authRoutes.js";

// dotenv.config();
// connectDB();

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use("/api/auth", authRoutes);

// app.listen(5000, () => console.log("Server running on port 5000"));


import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import resultRoutes from "./routes/resultRoutes.js";
import studentRoutes from "./routes/students.js";
import userRoutes from "./routes/userRoutes.js";


dotenv.config();
connectDB();

const app = express();

/* -------- MIDDLEWARE -------- */
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

/* -------- ROUTES -------- */
app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/result", resultRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/users", userRoutes);


/* -------- HEALTH CHECK -------- */
app.get("/", (req, res) => {
  res.send("🚀 Course Recommender API is running");
});

/* -------- SERVER -------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
