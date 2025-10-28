import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./BookAppointment.css";

export default function BookAppointment() {
  const location = useLocation();
  const { user } = useAuth(); // Logged-in patient
  const doctorData = location.state?.doctor;

  const [form, setForm] = useState({
    name: user?.name || "",
    phone: "",
    appointmentType: "",
    doctor: doctorData?.name || "",
    specialty: doctorData?.specialty || "",
    day: "",       // 👈 corresponds to doctor.availableSlots.day
    startTime: "", // 👈 corresponds to slot start time
  });

  const [availableSlots, setAvailableSlots] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  /* -------------------------------------------------------------------------- */
  /*                     FETCH DOCTOR'S AVAILABLE SCHEDULE                      */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    if (doctorData?._id) {
      setLoading(true);
      fetch(`http://localhost:5000/api/doctors/${doctorData._id}/schedule`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setAvailableSlots(data.filter((slot) => !slot.isBooked));
          } else {
            setMessage("No available slots found for this doctor.");
          }
        })
        .catch((err) => {
          console.error("Error fetching slots:", err);
          setMessage("Failed to load slots. Please try again.");
        })
        .finally(() => setLoading(false));
    }
  }, [doctorData]);

  /* -------------------------------------------------------------------------- */
  /*                            HANDLE FORM INPUTS                              */
  /* -------------------------------------------------------------------------- */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* -------------------------------------------------------------------------- */
  /*                          SUBMIT BOOKING REQUEST                            */
  /* -------------------------------------------------------------------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!doctorData || !user) {
      setMessage("Missing doctor or patient information.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/appointments/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctorId: doctorData._id,
          patientId: user._id,
          patientName: form.name,
          phone: form.phone,
          appointmentType: form.appointmentType,
          date: form.day,
          time: form.startTime,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
      } else {
        setMessage(data.message || "Failed to book appointment.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      setMessage("Server error, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                          SUCCESS CONFIRMATION VIEW                         */
  /* -------------------------------------------------------------------------- */
  if (submitted) {
    return (
      <div className="appointment-container">
        <div className="appointment-card">
          <h3>Appointment Confirmed ✅</h3>
          <p>
            Thank you, <strong>{form.name}</strong>! <br />
            Your <strong>{form.appointmentType}</strong> appointment with{" "}
            <strong>{form.doctor}</strong> ({form.specialty}) has been booked.
          </p>
          <p>
            <b>Day:</b> {form.day} at <b>{form.startTime}</b> <br />
            We’ll contact you at <b>{form.phone}</b>.
          </p>
        </div>
      </div>
    );
  }

  /* -------------------------------------------------------------------------- */
  /*                                 FORM UI                                    */
  /* -------------------------------------------------------------------------- */
  return (
    <div className="appointment-container">
      <div className="appointment-card">
        <h2>Book Appointment</h2>

        <form onSubmit={handleSubmit} className="appointment-form">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
          />
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone or WhatsApp"
            required
          />

          <select
            name="appointmentType"
            value={form.appointmentType}
            onChange={handleChange}
            required
          >
            <option value="">Select Appointment Type</option>
            <option value="Offline Visit">Offline Visit</option>
            <option value="Online Video Call">Online Video Call</option>
          </select>

          <label>Choose Day</label>
          <select name="day" value={form.day} onChange={handleChange} required>
            <option value="">Select Day</option>
            {[...new Set(availableSlots.map((slot) => slot.day))].map(
              (day, i) => (
                <option key={i} value={day}>
                  {day}
                </option>
              )
            )}
          </select>

          <label>Choose Time</label>
          <select
            name="startTime"
            value={form.startTime}
            onChange={handleChange}
            required
          >
            <option value="">Select Time</option>
            {availableSlots
              .filter((slot) => slot.day === form.day)
              .map((slot, i) => (
                <option key={i} value={slot.startTime}>
                  {slot.startTime} - {slot.endTime}
                </option>
              ))}
          </select>

          <input
            name="doctor"
            value={form.doctor}
            readOnly
            placeholder="Doctor Name"
          />
          <input
            name="specialty"
            value={form.specialty}
            readOnly
            placeholder="Specialty"
          />

          <button type="submit" disabled={loading}>
            {loading ? "Booking..." : "Confirm Appointment"}
          </button>
        </form>

        {message && <p className="error-msg">{message}</p>}
      </div>
    </div>
  );
}
