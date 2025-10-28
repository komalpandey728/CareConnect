import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DoctorSchedule.css";

const DoctorSchedule = () => {
  const [schedule, setSchedule] = useState([]);
  const [day, setDay] = useState("Monday");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // 👇 Replace with logged-in doctor's ID
  const doctorId = "68ff3851ece6bdc9277ba0c2";

  // Fetch existing schedule
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/doctors/${doctorId}/schedule`
        );
        setSchedule(res.data);
      } catch (err) {
        console.error("Error fetching schedule:", err);
      }
    };
    fetchSchedule();
  }, [doctorId]);

  // Add slot (save to MongoDB)
  const handleAddSlot = async () => {
    if (!day || !startTime || !endTime) {
      setMessage("⚠️ Please fill all fields!");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `http://localhost:5000/api/doctors/${doctorId}/schedule`,
        { day, startTime, endTime }
      );
      setSchedule(res.data.slots);
      setMessage("✅ Slot added successfully!");
      setStartTime("");
      setEndTime("");
    } catch (err) {
      console.error("Error adding slot:", err);
      setMessage("❌ Failed to add slot");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="schedule-container">
      <h2>🩺 Manage Your Schedule</h2>

      <div className="add-slot">
        <select value={day} onChange={(e) => setDay(e.target.value)}>
          {[
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ].map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />

        <button onClick={handleAddSlot} disabled={loading}>
          {loading ? "Adding..." : "Add Slot"}
        </button>
      </div>

      {message && <p className="status-message">{message}</p>}

      <div className="schedule-display">
        {schedule.length === 0 ? (
          <p>No slots added yet.</p>
        ) : (
          <table border="1" cellPadding="10">
            <thead>
              <tr>
                <th>Day</th>
                <th>Start</th>
                <th>End</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((slot, i) => (
                <tr key={i}>
                  <td>{slot.day}</td>
                  <td>{slot.startTime}</td>
                  <td>{slot.endTime}</td>
                  <td>{slot.isBooked ? "Booked" : "Available"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DoctorSchedule;
