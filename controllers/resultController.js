import Result from "../models/Result.js";

export const getRecentActivity = async (req, res) => {
  try {
    const results = await Result.find()
      .populate("studentId", "name")
      .populate("recommendedCourse", "name")
      .sort({ updatedAt: -1 })
      .limit(5);

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
