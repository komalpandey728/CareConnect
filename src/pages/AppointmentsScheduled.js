import React, { useEffect, useState } from "react";
import "./AppointmentsScheduled.css";

const AppointmentsScheduled = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("careconnectUser"));

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        if (!user?._id) return;

        const res = await fetch(`http://localhost:5000/api/appointments/patient/${user._id}`);
        const data = await res.json();

        if (res.ok) {
          setAppointments(data);
        } else {
          console.error("Error fetching:", data.message);
        }
      } catch (err) {
        console.error("Error fetching appointments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [user]);

  if (loading) {
    return (
      <div className="appointments-bg">
        <div className="appointments-container">
          <h2 className="appointments-title">📅 Scheduled Appointments</h2>
          <p className="loading-text">Loading your appointments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="appointments-bg">
      <div className="appointments-container">
        <h2 className="appointments-title">📅 Scheduled Appointments</h2>

        {appointments.length > 0 ? (
          <div className="appointments-list">
            {appointments.map((appt, index) => (
              <div key={index} className="appointment-card">
                <div className="appointment-header">
                  <h3>Dr. {appt.doctorId?.name || "Unknown Doctor"}</h3>
                  <span
                    className={`appt-type ${
                      appt.appointmentType?.toLowerCase().includes("online")
                        ? "online"
                        : "offline"
                    }`}
                  >
                    {appt.appointmentType}
                  </span>
                </div>
                <div className="appointment-details">
                  <p><strong>Specialty:</strong> {appt.doctorId?.specialty || "N/A"}</p>
                  <p><strong>Date:</strong> {new Date(appt.date).toDateString()}</p>
                  <p><strong>Time:</strong> {appt.time}</p>
                  <p><strong>Status:</strong> {appt.status}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-appointments">No appointments scheduled yet.</p>
        )}
      </div>
    </div>
  );
};

export default AppointmentsScheduled;
