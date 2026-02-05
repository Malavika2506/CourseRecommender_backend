import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  answers: [Boolean],
  scores: {
    mern: Number,
    flutter: Number,
    datasci: Number,
    cybersecurity: Number,
    react: Number,
    pythonfs: Number,
    uiux: Number,
    devops: Number,
  },
  bestCourse: String,
});

export default mongoose.model("Student", studentSchema);
