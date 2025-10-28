// backend/routes/adminRoutes.js
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const router = express.Router();
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
const dbName = "careconnect";

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    await client.connect();
    const db = client.db(dbName);
    const admins = db.collection("admins");

    const admin = await admins.findOne({ email });
    if (!admin) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Admin login successful", token });
  } catch (err) {
    console.error("Error in admin login:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all doctors
router.get("/doctors", async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const doctors = await db.collection("doctors").find({}).toArray();
    res.json(doctors);
  } catch (err) {
    console.error("Error fetching doctors:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all patients
router.get("/patients", async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const patients = await db.collection("patients").find({}).toArray();
    res.json(patients);
  } catch (err) {
    console.error("Error fetching patients:", err);
    res.status(500).json({ message: "Server error" });
  }
});


export default router;
