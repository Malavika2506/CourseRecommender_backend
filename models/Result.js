//backend/models/Result.js
import mongoose from "mongoose";

const ResultSchema = new mongoose.Schema(
  {
    studentId: { type: String, required: true },
    scores: { type: Object, required: true },
    recommended: { type: String, required: true },
    details: { type: String },
  },
  { timestamps: true }
);


export default mongoose.model("Result", ResultSchema);
