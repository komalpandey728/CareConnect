import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./PatientDashboard.css";

const PatientDashboard = () => {
  const { user } = useAuth(); // Logged-in patient
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!user?._id) return;
    fetch(`http://localhost:5000/api/appointments/patient/${user._id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) setAppointments(data);
        else setMessage("No appointments found.");
      })
      .catch((err) => {
        console.error("Error fetching appointments:", err);
        setMessage("Error loading appointments.");
      })
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) return <div className="dashboard">Loading...</div>;

  return (
    <div className="dashboard">
      <h2>Your Appointments</h2>
      {message && <p>{message}</p>}

      <div className="appointment-list">
        {appointments.map((appt) => (
          <div className="appointment-card" key={appt._id}>
            <h3>Dr. {appt.doctorId?.name}</h3>
            <p>
              <b>Type:</b> {appt.appointmentType || "Offline"}
            </p>
            <p>
              <b>Date:</b> {appt.date} — <b>Time:</b> {appt.time}
            </p>
            <p>
              <b>Status:</b>{" "}
              {new Date(appt.date) < new Date()
                ? "Completed"
                : "Upcoming"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientDashboard;
