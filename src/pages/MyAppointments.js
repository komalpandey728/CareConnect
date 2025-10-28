import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./MyAppointments.css";

const MyAppointments = () => {
  const { currentUser } = useAuth();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (currentUser) {
      // Simulated fetch – replace with real API call later if needed
      const dummyAppointments = [
        {
          doctor: "Dr. Alice Johnson",
          date: "2025-10-30",
          time: "10:00 AM",
          status: "Confirmed",
        },
        {
          doctor: "Dr. Mark Brown",
          date: "2025-11-02",
          time: "2:30 PM",
          status: "Pending",
        },
      ];
      setAppointments(dummyAppointments);
    }
  }, [currentUser]);

  return (
    <div className="my-appointments-container">
      <h2>My Appointments</h2>
      {appointments.length > 0 ? (
        <div className="appointments-list">
          {appointments.map((appt, index) => (
            <div key={index} className="appointment-card">
              <p><strong>Doctor:</strong> {appt.doctor}</p>
              <p><strong>Date:</strong> {appt.date}</p>
              <p><strong>Time:</strong> {appt.time}</p>
              <p><strong>Status:</strong> {appt.status}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No appointments found.</p>
      )}
    </div>
  );
};

export default MyAppointments;
