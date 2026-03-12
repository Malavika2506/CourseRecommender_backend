//backend/models/Result.js
import mongoose from "mongoose";

const ResultSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    scores: { type: Object, required: true },

    // ✅ store course reference
    recommendedCourse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },

  },
  { timestamps: true }
);

export default mongoose.model("Result", ResultSchema);
