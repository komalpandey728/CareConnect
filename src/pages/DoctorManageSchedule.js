import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DoctorManageSchedule.css";

const DoctorManageSchedule = () => {
  // Replace with logged-in doctor's ID (in real app, get from auth context or localStorage)
  const doctorId = localStorage.getItem("doctorId") || "YOUR_DOCTOR_ID_HERE";

  const [slots, setSlots] = useState([
    { day: "Monday", startTime: "", endTime: "" },
    { day: "Tuesday", startTime: "", endTime: "" },
    { day: "Wednesday", startTime: "", endTime: "" },
    { day: "Thursday", startTime: "", endTime: "" },
    { day: "Friday", startTime: "", endTime: "" },
    { day: "Saturday", startTime: "", endTime: "" },
    { day: "Sunday", startTime: "", endTime: "" },
  ]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  /* -------------------------------------------------------------------------- */
  /*                           FETCH EXISTING SCHEDULE                          */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/doctors/${doctorId}/schedule`
        );
        if (res.data.length > 0) setSlots(res.data);
      } catch (error) {
        console.error("Error fetching schedule:", error);
      }
    };
    fetchSchedule();
  }, [doctorId]);

  /* -------------------------------------------------------------------------- */
  /*                            HANDLE INPUT CHANGES                            */
  /* -------------------------------------------------------------------------- */
  const handleChange = (index, field, value) => {
    const updatedSlots = [...slots];
    updatedSlots[index][field] = value;
    setSlots(updatedSlots);
  };

  /* -------------------------------------------------------------------------- */
  /*                          SAVE/UPDATE DOCTOR SCHEDULE                       */
  /* -------------------------------------------------------------------------- */
  const handleSaveSchedule = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        `http://localhost:5000/api/doctors/${doctorId}/schedule`,
        { slots }
      );
      setMessage("✅ Schedule updated successfully!");
    } catch (error) {
      console.error("Error saving schedule:", error);
      setMessage("❌ Failed to save schedule. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="manage-schedule-container">
      <div className="schedule-card">
        <h2>Manage Weekly Schedule</h2>
        <form onSubmit={handleSaveSchedule}>
          <table>
            <thead>
              <tr>
                <th>Day</th>
                <th>Start Time</th>
                <th>End Time</th>
              </tr>
            </thead>
            <tbody>
              {slots.map((slot, index) => (
                <tr key={slot.day}>
                  <td>{slot.day}</td>
                  <td>
                    <input
                      type="time"
                      value={slot.startTime}
                      onChange={(e) =>
                        handleChange(index, "startTime", e.target.value)
                      }
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="time"
                      value={slot.endTime}
                      onChange={(e) =>
                        handleChange(index, "endTime", e.target.value)
                      }
                      required
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Schedule"}
          </button>
        </form>

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default DoctorManageSchedule;
cd