import mongoose from "mongoose";

const ResultSchema = new mongoose.Schema({
  studentId: String,
  scores: Object,
  recommended: String,
});

export default mongoose.model("Result", ResultSchema);
