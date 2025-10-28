import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./DoctorDashboard.css";

export default function DoctorDashboard() {
  const { user } = useAuth();
  const [slots, setSlots] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [newSlot, setNewSlot] = useState({ day: "", startTime: "", endTime: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const doctorId = user?._id || user?.id;
  const token = localStorage.getItem("careconnectToken");

  /* ---------------- Fetch Doctor's Schedule ---------------- */
  const fetchSchedule = async () => {
    if (!doctorId) return;
    try {
      const res = await fetch(`http://localhost:5000/api/doctors/${doctorId}/schedule`);
      const data = await res.json();
      if (res.ok) {
        setSlots(Array.isArray(data) ? data : []);
      } else {
        setMessage(data.message || "Error loading schedule");
      }
    } catch (err) {
      console.error("❌ Error fetching schedule:", err);
      setMessage("Server error while loading schedule");
    }
  };

  /* ---------------- Fetch Upcoming Appointments ---------------- */
  const fetchAppointments = async () => {
    if (!doctorId) return;
    try {
      const res = await fetch(`http://localhost:5000/api/appointments/doctor/${doctorId}`);
      const data = await res.json();
      if (res.ok) setAppointments(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("❌ Error fetching appointments:", err);
      setMessage("Error loading appointments");
    }
  };

  useEffect(() => {
    if (doctorId) {
      fetchSchedule();
      fetchAppointments();
    }
  }, [doctorId]);

  /* ---------------- Add New Slot ---------------- */
  const handleAddSlot = async (e) => {
    e.preventDefault();

    if (!newSlot.day || !newSlot.startTime || !newSlot.endTime) {
      setMessage("⚠️ Please fill all slot details");
      return;
    }

    if (!doctorId) {
      setMessage("❌ Doctor ID not found. Please re-login.");
      return;
    }

    console.log("🩺 Adding slot for doctorId:", doctorId);
    console.log("📦 Payload:", newSlot);

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`http://localhost:5000/api/doctors/${doctorId}/schedule`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newSlot),
      });

      const data = await res.json();
      console.log("🧾 Response:", data);

      if (res.ok) {
        setMessage("✅ Slot added successfully!");
        setSlots(data.slots);
        setNewSlot({ day: "", startTime: "", endTime: "" });
      } else {
        setMessage(data.message || "⚠️ Failed to add slot");
      }
    } catch (err) {
      console.error("❌ Error adding slot:", err);
      setMessage("🚨 Server error while adding slot");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- Delete Slot ---------------- */
  const handleDeleteSlot = async (slotId) => {
    if (!doctorId) return;
    try {
      const res = await fetch(`http://localhost:5000/api/doctors/${doctorId}/schedule/${slotId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (res.ok) {
        setMessage("🗑️ Slot deleted successfully");
        setSlots(data.slots);
      } else {
        setMessage(data.message || "Failed to delete slot");
      }
    } catch (err) {
      console.error("❌ Delete Slot Error:", err);
      setMessage("Server error deleting slot");
    }
  };

  return (
    <div className="doctor-dashboard">
      <h2>Welcome, Dr. {user?.name}</h2>
      <p className="specialty">{user?.specialty}</p>

      {message && <p className="status-msg">{message}</p>}

      {/* ---------------- Manage Weekly Schedule ---------------- */}
      <div className="dashboard-section">
        <h3>🕐 Manage Weekly Schedule</h3>

        <form onSubmit={handleAddSlot} className="schedule-form">
          <select
            value={newSlot.day}
            onChange={(e) => setNewSlot({ ...newSlot, day: e.target.value })}
            required
          >
            <option value="">Select Day</option>
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
              (d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              )
            )}
          </select>

          <input
            type="time"
            value={newSlot.startTime}
            onChange={(e) => setNewSlot({ ...newSlot, startTime: e.target.value })}
            required
          />
          <input
            type="time"
            value={newSlot.endTime}
            onChange={(e) => setNewSlot({ ...newSlot, endTime: e.target.value })}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Add Slot"}
          </button>
        </form>

        <div className="slots-list">
          {slots.length > 0 ? (
            slots.map((slot) => (
              <div key={slot._id} className={`slot-card ${slot.isBooked ? "booked" : ""}`}>
                <p>
                  <b>{slot.day}</b> — {slot.startTime} to {slot.endTime}
                </p>
                <p>Status: {slot.isBooked ? "Booked ❌" : "Available ✅"}</p>
                {!slot.isBooked && (
                  <button onClick={() => handleDeleteSlot(slot._id)} className="delete-btn">
                    ❌ Remove
                  </button>
                )}
              </div>
            ))
          ) : (
            <p>No schedule added yet.</p>
          )}
        </div>
      </div>

      {/* ---------------- Upcoming Appointments ---------------- */}
      <div className="dashboard-section">
        <h3>📅 Upcoming Appointments</h3>
        {appointments.length > 0 ? (
          <ul className="appointment-list">
            {appointments.map((appt) => (
              <li key={appt._id} className="appointment-item">
                <b>{appt.patientName}</b> ({appt.appointmentType})<br />
                {appt.date} at {appt.time}
                <br />
                📞 {appt.phone}
              </li>
            ))}
          </ul>
        ) : (
          <p>No appointments booked yet.</p>
        )}
      </div>
    </div>
  );
}
