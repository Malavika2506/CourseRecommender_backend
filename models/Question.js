//backend/models/Question.js
import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },

  points: {
    mern: { type: Number, default: 0 },
    flutter: { type: Number, default: 0 },
    datasci: { type: Number, default: 0 },
    cybersecurity: { type: Number, default: 0 },
    react: { type: Number, default: 0 },
    pythonfs: { type: Number, default: 0 },
    uiux: { type: Number, default: 0 },
    devops: { type: Number, default: 0 },
  },

  // ✅ ADD THIS
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },

}, { timestamps: true });

export default mongoose.model("Question", QuestionSchema);
