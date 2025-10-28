import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaCalendar, FaStethoscope } from 'react-icons/fa';
import specialities from "../data/specialities"; 
import './Doctors.css';

const Doctors = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const navigate = useNavigate(); // ✅ Added for routing

  const handleCardClick = (path) => {
    navigate(`/speciality/${path}`);
  };

  return (
    <div className="doctors-page">
      {/* 🔷 Search Banner */}
      <div className="search-banner">
        <div className="banner-text">
          <h1>Find the right doctor for your ailments</h1>
        </div>
        <div className="doctor-images">
          <img src="/images/doctorimg.png" alt="Doctors" className="doctor-img-large" />
        </div>
      </div>

      
      {/* 🔷 Specialties Grid */}
      <div className="specialties-section">
        <h2>CareConnect's Specialities - Expertise You Can Trust</h2>
        <div className="specialties-grid">
          {specialities.map(specialty => (
            <div
              key={specialty.id}
              className="specialty-card"
              onClick={() => handleCardClick(specialty.path)} // ✅ added click navigation
            >
              <div className="specialty-icon-container">
                <FaStethoscope className="specialty-card-icon" /> 
              </div>
              <h3 className="specialty-name-en">{specialty.name}</h3>
              <p className="specialty-name-hi">{specialty.nameHi}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
