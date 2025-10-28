// routes/doctorRoutes.js
import express from "express";
import mongoose from "mongoose";
import Doctor from "../models/Doctor.js";

const router = express.Router();

/* -------------------- Helpers -------------------- */
function normalizeTime(t) {
  return t;
}

/* -------------------- List doctors (for frontend) -------------------- */
router.get("/", async (req, res) => {
  try {
    const { specialty } = req.query;
    const filter = {};
    if (specialty) filter.specialty = specialty;
    const doctors = await Doctor.find(filter).select("-password");
    return res.status(200).json({ doctors });
  } catch (err) {
    console.error("Fetch doctors error:", err);
    return res.status(500).json({ message: "Server error fetching doctors" });
  }
});

/* -------------------- Admin - Get all doctors -------------------- */
router.get("/all", async (req, res) => {
  try {
    const doctors = await Doctor.find().select("-password");
    return res.status(200).json(doctors);
  } catch (err) {
    console.error("Error fetching all doctors:", err);
    return res.status(500).json({ message: "Server error fetching all doctors" });
  }
});

/* -------------------- Get Doctor (basic) -------------------- */
router.get("/:doctorId", async (req, res) => {
  try {
    const { doctorId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(doctorId))
      return res.status(400).json({ message: "Invalid doctor id" });

    const doctor = await Doctor.findById(doctorId).select("-password");
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    return res.status(200).json({ doctor });
  } catch (err) {
    console.error("Fetch doctor error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

/* -------------------- Get Doctor's Schedule -------------------- */
router.get("/:doctorId/schedule", async (req, res) => {
  try {
    const { doctorId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(doctorId))
      return res.status(400).json({ message: "Invalid doctor id" });

    const doctor = await Doctor.findById(doctorId).select("availableSlots");
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    return res.status(200).json(doctor.availableSlots || []);
  } catch (error) {
    console.error("❌ Fetch Schedule Error:", error);
    return res.status(500).json({ message: "Server error fetching schedule" });
  }
});

/* -------------------- Add New Slot -------------------- */
router.post("/:doctorId/schedule", async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { day, startTime, endTime } = req.body;

    console.log("POST /api/doctors/:doctorId/schedule called", { doctorId, body: req.body });

    if (!mongoose.Types.ObjectId.isValid(doctorId))
      return res.status(400).json({ message: "Invalid doctor id" });

    if (!day || !startTime || !endTime) {
      return res.status(400).json({ message: "All fields are required: day, startTime, endTime" });
    }
    if (startTime >= endTime) {
      return res.status(400).json({ message: "startTime must be before endTime" });
    }

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    const newSlot = {
      day,
      startTime: normalizeTime(startTime),
      endTime: normalizeTime(endTime),
      isBooked: false,
    };

    doctor.availableSlots.push(newSlot);
    await doctor.save();

    console.log(`✅ Added slot for doctor ${doctorId}:`, newSlot);

    return res.status(200).json({
      message: "Slot added successfully",
      slots: doctor.availableSlots,
    });
  } catch (error) {
    console.error("❌ Add Slot Error:", error);
    return res.status(500).json({ message: "Server error adding slot", error: error.message });
  }
});

/* -------------------- Delete Slot -------------------- */
router.delete("/:doctorId/schedule/:slotId", async (req, res) => {
  try {
    const { doctorId, slotId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(doctorId))
      return res.status(400).json({ message: "Invalid doctor id" });

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    const beforeCount = doctor.availableSlots.length;
    doctor.availableSlots = doctor.availableSlots.filter(
      (s) => String(s._id) !== String(slotId)
    );
    if (doctor.availableSlots.length === beforeCount) {
      return res.status(404).json({ message: "Slot not found" });
    }

    await doctor.save();
    console.log(`🗑️ Removed slot ${slotId} for doctor ${doctorId}`);

    return res.status(200).json({ message: "Slot removed", slots: doctor.availableSlots });
  } catch (err) {
    console.error("❌ Delete Slot Error:", err);
    return res.status(500).json({ message: "Server error deleting slot" });
  }
});

export default router;
