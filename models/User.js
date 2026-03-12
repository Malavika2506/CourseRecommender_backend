// //backend/models/User.js
// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   password: String,
//   role: { type: String, enum: ["admin", "student"], default: "student" },
// });

// export default mongoose.model("User", userSchema);
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,

  email: {
    type: String,
    unique: true
  },

  password: String,

  role: {
    type: String,
    enum: ["admin", "student"],
    default: "student"
  },

  // Admin Settings Fields
  companyName: String,
  address: String,
  location: String,
  phone: String

}, { timestamps: true });

export default mongoose.model("User", userSchema);
