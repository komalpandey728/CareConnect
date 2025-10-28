// D:\careconnect-server\models\Doctor.js
import mongoose from "mongoose";

const slotSchema = new mongoose.Schema({
  day: { type: String, required: true }, // e.g. "Monday"
  startTime: { type: String, required: true }, // e.g. "10:00 AM"
  endTime: { type: String, required: true },   // e.g. "12:00 PM"
  isBooked: { type: Boolean, default: false },
});

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    specialty: { type: String },
    qualification: { type: String }, // updated (singular)
    experience: { type: Number },
    consultationFees: { type: Number },
    licenseFile: { type: String },
    availableSlots: [slotSchema], // for weekly schedule
  },
  { timestamps: true }
);

export default mongoose.model("Doctor", doctorSchema);
