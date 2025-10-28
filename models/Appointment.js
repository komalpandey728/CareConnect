import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    patientName: { type: String, required: true },
    phone: { type: String, required: true },
    appointmentType: { type: String, enum: ["Offline Visit", "Online Video Call"], required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    status: { type: String, enum: ["Booked", "Completed", "Cancelled"], default: "Booked" },
    mode: { type: String, required: true } 
  },
  { timestamps: true }
);

export default mongoose.model("Appointment", appointmentSchema);
