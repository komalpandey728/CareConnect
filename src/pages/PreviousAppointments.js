import React, { useEffect, useState } from "react";
import "./PreviousAppointments.css";

const PreviousAppointments = () => {
  const [pastAppointments, setPastAppointments] = useState([]);

  useEffect(() => {
    // Temporary sample past appointments — will come from DB later
    const samplePastAppointments = [
      {
        doctor: "Dr. Riya Mehta",
        date: "10 Oct 2025",
        time: "11:00 AM",
        type: "Online",
        specialty: "Cardiology",
        feedback: "Very helpful and kind doctor.",
      },
      {
        doctor: "Dr. Arjun Patel",
        date: "02 Oct 2025",
        time: "03:15 PM",
        type: "Offline",
        specialty: "Dermatology",
        feedback: "Good consultation, prescribed effective medicine.",
      },
      {
        doctor: "Dr. Neha Sharma",
        date: "18 Sep 2025",
        time: "09:45 AM",
        type: "Online",
        specialty: "Pediatrics",
        feedback: "Quick and clear advice. Highly recommended.",
      },
    ];

    setPastAppointments(samplePastAppointments);
  }, []);

  return (
    <div className="previous-bg">
      <div className="previous-container">
        <h2 className="previous-title">🕓 Previous Appointments</h2>

        {pastAppointments.length > 0 ? (
          <div className="previous-list">
            {pastAppointments.map((appt, index) => (
              <div key={index} className="previous-card">
                <div className="previous-header">
                  <h3>{appt.doctor}</h3>
                  <span className={`appt-type ${appt.type.toLowerCase()}`}>
                    {appt.type}
                  </span>
                </div>

                <div className="previous-details">
                  <p><strong>Specialty:</strong> {appt.specialty}</p>
                  <p><strong>Date:</strong> {appt.date}</p>
                  <p><strong>Time:</strong> {appt.time}</p>
                  <p><strong>Feedback:</strong> {appt.feedback}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-appointments">No previous appointments found.</p>
        )}
      </div>
    </div>
  );
};

export default PreviousAppointments;
