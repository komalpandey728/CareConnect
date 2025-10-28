import express from "express";
import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";

const router = express.Router();

// 📌 Book appointment
router.post("/book", async (req, res) => {
  try {
    const { doctorId, patientId, date, time } = req.body;

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    const slot = doctor.availableSlots.find(
      (s) => !s.isBooked && time >= s.startTime && time <= s.endTime
    );

    if (!slot) {
      return res.status(400).json({ message: "Slot not available" });
    }

    slot.isBooked = true;
    await doctor.save();

    const appointment = new Appointment({
      doctorId,
      patientId,
      date,
      time,
    });

    await appointment.save();
    res.status(201).json({ message: "Appointment booked", appointment });
  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// 📌 Get appointments by patient
router.get("/patient/:id", async (req, res) => {
  const appointments = await Appointment.find({ patientId: req.params.id }).populate("doctorId");
  res.json(appointments);
});

// 📌 Get appointments by doctor
router.get("/doctor/:id", async (req, res) => {
  const appointments = await Appointment.find({ doctorId: req.params.id }).populate("patientId");
  res.json(appointments);
});

export default router;
