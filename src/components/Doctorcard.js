import React from "react";
import "./DoctorCard.css";

const DoctorCard = ({ doctor }) => {
  return (
    <div className="doctor-card">
      <img src={doctor.image} alt={doctor.name} className="doctor-image" />
      <div className="doctor-info">
        <h3>{doctor.name}</h3>
        <p className="specialty">{doctor.specialty}</p>
        <p className="experience">{doctor.experience} years experience</p>
        <div className="card-footer">
          <button className="btn-book">Book Appointment</button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;