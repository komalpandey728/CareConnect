import React, { useState, useEffect } from 'react';
import './DoctorProfile.css';

const DoctorProfile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    specialization: '',
    qualification: '',
    experience: '',
    fees: '',
    license: ''
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // TODO: Fetch doctor profile from API/database
    // For now using dummy data
    setProfile({
      name: "Dr. Smith",
      email: "dr.smith@example.com",
      specialization: "Cardiology",
      qualification: "MBBS, MD",
      experience: "10",
      fees: "500",
      license: "ML123456"
    });
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    // TODO: Add API call to update profile
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <h2>Doctor Profile</h2>
      
      <div className="profile-card">
        {!isEditing ? (
          <div className="profile-details">
            <div className="detail-group">
              <label>Name:</label>
              <p>{profile.name}</p>
            </div>
            <div className="detail-group">
              <label>Email:</label>
              <p>{profile.email}</p>
            </div>
            <div className="detail-group">
              <label>Specialization:</label>
              <p>{profile.specialization}</p>
            </div>
            <div className="detail-group">
              <label>Qualification:</label>
              <p>{profile.qualification}</p>
            </div>
            <div className="detail-group">
              <label>Experience:</label>
              <p>{profile.experience} years</p>
            </div>
            <div className="detail-group">
              <label>Consultation Fees:</label>
              <p>₹{profile.fees}</p>
            </div>
            <button 
              className="edit-btn"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleUpdate} className="edit-form">
            {/* Add form fields for editing */}
            <button type="submit">Save Changes</button>
            <button 
              type="button" 
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default DoctorProfile;