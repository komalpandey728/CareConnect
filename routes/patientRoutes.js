import express from "express";
import Doctor from "../models/Doctor.js";

const router = express.Router();

// ✅ Get doctors by specialty — only for patient side
router.get("/doctors/:specialty", async (req, res) => {
  try {
    const { specialty } = req.params;
    if (!specialty) return res.status(400).json({ message: "Specialty required" });

    // Case-insensitive specialty match
    const doctors = await Doctor.find({
      specialty: { $regex: new RegExp(`^${specialty}$`, "i") },
    }).select("-password");

    return res.status(200).json({ doctors });
  } catch (err) {
    console.error("❌ Error fetching doctors by specialty:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
