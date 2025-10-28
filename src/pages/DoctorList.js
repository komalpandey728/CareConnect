import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./DoctorList.css";

const DoctorList = () => {
  const { path } = useParams(); // 'path' is your specialty slug (like 'cardiology')
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/patient/doctors/${path}`);
        const data = await res.json();
        setDoctors(data.doctors || []);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, [path]);

  if (loading) {
    return (
      <div className="doctorlist-bg">
        <div className="doctorlist-box">
          <h2>Loading doctors...</h2>
        </div>
      </div>
    );
  }

  if (doctors.length === 0) {
    return (
      <div className="doctorlist-bg">
        <div className="doctorlist-box">
          <h2>No doctors found for this specialty.</h2>
        </div>
      </div>
    );
  }

  const specialtyName = doctors[0]?.specialty || path;

  return (
    <div className="doctorlist-bg">
      <div className="doctorlist-box">
        <h2>{specialtyName}</h2>
        <p className="subtitle">Consult top doctors in {specialtyName}</p>

        <div className="doctor-list">
          {doctors.map((doctor) => (
            <div key={doctor._id} className="doctor-item">
              <h3>{doctor.name}</h3>
              <p><strong>Qualification:</strong> {doctor.qualification}</p>
              <p><strong>Experience:</strong> {doctor.experience} years</p>
              <p><strong>Consultation Fee:</strong> ₹{doctor.consultationFees}</p>
              <button
                className="book-btn"
                onClick={() => navigate("/book", { state: { doctor } })}
              >
                Book Appointment
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorList;
