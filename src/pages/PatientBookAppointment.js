import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PatientBookAppointment.css";

const PatientBookAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [message, setMessage] = useState("");

  const patientId = localStorage.getItem("patientId") || "YOUR_PATIENT_ID_HERE";

  // 📌 Fetch doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/doctors");
        setDoctors(res.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, []);

  // 📌 Fetch schedule for selected doctor
  const handleSelectDoctor = async (id) => {
    setSelectedDoctor(id);
    try {
      const res = await axios.get(`http://localhost:5000/api/doctors/${id}/schedule`);
      setSlots(res.data.filter((slot) => !slot.isBooked));
    } catch (error) {
      console.error("Error fetching slots:", error);
    }
  };

  // 📌 Book selected slot
  const handleBook = async () => {
    if (!selectedDoctor || !selectedSlot) return alert("Please select a slot");
    const chosen = slots.find((s) => s._id === selectedSlot);
    const time = chosen.startTime;
    const date = new Date().toISOString().split("T")[0];

    try {
      const res = await axios.post("http://localhost:5000/api/appointments/book", {
        doctorId: selectedDoctor,
        patientId,
        date,
        time,
      });
      setMessage("✅ Appointment booked successfully!");
    } catch (error) {
      console.error("Booking failed:", error);
      setMessage("❌ Slot not available or booking failed");
    }
  };

  return (
    <div className="patient-booking-container">
      <h2>Book an Appointment</h2>

      {/* Doctor list */}
      <div className="doctor-list">
        {doctors.map((doc) => (
          <div
            key={doc._id}
            className={`doctor-card ${selectedDoctor === doc._id ? "selected" : ""}`}
            onClick={() => handleSelectDoctor(doc._id)}
          >
            <h3>{doc.name}</h3>
            <p>{doc.specialty}</p>
            <p>Fees: ₹{doc.consultationFees}</p>
          </div>
        ))}
      </div>

      {/* Available slots */}
      {selectedDoctor && (
        <div className="slots-section">
          <h3>Available Slots</h3>
          {slots.length === 0 ? (
            <p>No slots available</p>
          ) : (
            <div className="slots-grid">
              {slots.map((slot) => (
                <button
                  key={slot._id}
                  className={selectedSlot === slot._id ? "selected" : ""}
                  onClick={() => setSelectedSlot(slot._id)}
                >
                  {slot.day} {slot.startTime} - {slot.endTime}
                </button>
              ))}
            </div>
          )}
          <button className="book-btn" onClick={handleBook}>
            Book Slot
          </button>
        </div>
      )}

      {message && <p className="msg">{message}</p>}
    </div>
  );
};

export default PatientBookAppointment;
