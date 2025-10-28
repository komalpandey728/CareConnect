// D:\careconnect-server\routes\appointmentRoutes.js
import express from "express";
import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";

const router = express.Router();


router.post("/book", async (req, res) => {
  try {
    const { doctorId, patientId, patientName, phone, appointmentType, date, time } = req.body;

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    
    const slot = doctor.availableSlots.find(
      (s) => s.day === date && s.startTime === time && !s.isBooked
    );
    if (!slot) return res.status(400).json({ message: "Selected slot not available" });

    
    slot.isBooked = true;
    await doctor.save();

   
    const newAppointment = new Appointment({
      doctorId,
      patientId,
      patientName,
      phone,
      appointmentType,
      date,
      time,
    });

    await newAppointment.save();

    res
      .status(201)
      .json({ message: "Appointment booked successfully", appointment: newAppointment });
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({ message: "Server error while booking appointment" });
  }
});


router.get("/patient/:patientId", async (req, res) => {
  try {
    const { patientId } = req.params;

    const appointments = await Appointment.find({ patientId })
      .populate("doctorId", "name specialty")
      .sort({ date: 1 }); 

    res.status(200).json(appointments);
  } catch (error) {
    console.error("❌ Error fetching patient appointments:", error);
    res.status(500).json({ message: "Server error fetching appointments" });
  }
});



router.get("/doctor/:id", async (req, res) => {
  try {
    const appointments = await Appointment.find({
      doctorId: req.params.id,
    })
      .populate("patientId", "name email phone")
      .populate("doctorId", "name specialty");
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching doctor's appointments:", error);
    res.status(500).json({ message: "Error fetching doctor's appointments" });
  }
});

export default router;
