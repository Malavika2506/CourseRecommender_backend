// //backend/models/Course.js
// import mongoose from "mongoose";

// const CourseSchema = new mongoose.Schema({
//   key: {
//     type: String,
//     required: true,
//     unique: true
//   },

//   name: {
//     type: String,
//     required: true,
//   },

//   description: {
//     type: String,
//     required: true,
//   },

// }, { timestamps: true });

// export default mongoose.model("Course", CourseSchema);
import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      unique: true
    },

    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Auto generate key
CourseSchema.pre("save", function (next) {
  if (!this.key) {
    this.key = this.name.toLowerCase().replace(/\s+/g, "-");
  }
  next();
});

export default mongoose.model("Course", CourseSchema);
