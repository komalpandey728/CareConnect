// routes/auth.js
import bcrypt from "bcryptjs";
import express from "express";
import jwt from "jsonwebtoken";
import multer from "multer";
import Doctor from "../models/Doctor.js";
import User from "../models/User.js";

const router = express.Router();

/* ----------------------------------------
   📁 Multer Setup for File Uploads
---------------------------------------- */
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

/* ----------------------------------------
   👩‍⚕️ Doctor Registration
---------------------------------------- */
router.post("/doctor/register", upload.single("licenseFile"), async (req, res) => {
  try {
    const { name, email, password, specialty, qualification, experience, consultationFees } = req.body;

    if (!name || !email || !password || !specialty || !qualification) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    if (await Doctor.findOne({ email })) {
      return res.status(400).json({ message: "Doctor already exists" });
    }

    if (await User.findOne({ email })) {
      return res.status(403).json({ message: "This email belongs to a patient" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newDoctor = new Doctor({
      name,
      email,
      password: hashedPassword,
      specialty,
      qualification,
      experience,
      consultationFees,
      licenseFile: req.file ? req.file.path : "",
    });

    await newDoctor.save();

    res.status(201).json({ message: "✅ Doctor registered successfully" });
  } catch (error) {
    console.error("❌ Doctor Register Error:", error);
    res.status(500).json({ message: "Server error during doctor registration" });
  }
});

/* ----------------------------------------
   👩‍⚕️ Doctor Login
---------------------------------------- */
router.post("/doctor/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const doctor = await Doctor.findOne({ email });
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: doctor._id, email: doctor.email, role: "doctor" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Doctor login successful",
      token,
      doctor,
    });
  } catch (error) {
    console.error("❌ Doctor Login Error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
});

/* ----------------------------------------
   👤 Patient Login (added safely)
---------------------------------------- */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Patient not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: "patient" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Patient login successful",
      token,
      user,
    });
  } catch (error) {
    console.error("❌ Patient Login Error:", error);
    res.status(500).json({ message: "Server error during patient login" });
  }
});

export default router;
