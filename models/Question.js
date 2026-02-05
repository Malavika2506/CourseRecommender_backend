import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  text: String,
  points: {
    mern: Number,
    flutter: Number,
    datasci: Number,
    cybersecurity: Number,
    react: Number,
    pythonfs: Number,
    uiux: Number,
    devops: Number,
  },
});

export default mongoose.model("Question", QuestionSchema);
