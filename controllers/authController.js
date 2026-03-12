//backend/controllers/authController.js
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const role = email.includes("cybersquare.org") ? "admin" : "student";

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  res.json({ message: "User registered" });
};


export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

const token = jwt.sign(
  {
    _id: user._id,      // change id → _id
    role: user.role,
    name: user.name,
    email: user.email,
  },
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
);



  res
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
    })
    .json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
};


export const getAdminProfile = async (req, res) => {
  try {

    const admin = await User.findById(req.user._id).select(
      "name email companyName address location phone"
    );

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json(admin);

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch admin profile" });
  }
};


export const updateAdminSettings = async (req, res) => {
  try {

    const { username, password, companyName, address, location, phone } = req.body;

    const admin = await User.findById(req.user._id);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Update username
    if (username) {
      admin.name = username;
    }

    // Update password
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      admin.password = hashedPassword;
    }

    // Company details
    admin.companyName = companyName;
    admin.address = address;
    admin.location = location;
    admin.phone = phone;

    await admin.save();

    res.json({
      message: "Admin settings updated successfully",
      admin
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update settings" });
  }
};


/* ============================= */
/* STUDENT PROFILE               */
/* ============================= */

export const getStudentProfile = async (req, res) => {
  try {

    const student = await User.findById(req.user._id)
      .select("name email phone address location");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch student profile" });
  }
};

export const updateStudentProfile = async (req, res) => {
  try {

    const { name, phone, address, location, password } = req.body;

    const student = await User.findById(req.user._id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (name) student.name = name;
    if (phone) student.phone = phone;
    if (address) student.address = address;
    if (location) student.location = location;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      student.password = hashedPassword;
    }

    await student.save();

    res.json({
      message: "Profile updated successfully",
      student
    });

  } catch (error) {
    res.status(500).json({ message: "Failed to update profile" });
  }
};
