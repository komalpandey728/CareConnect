import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import doctorsData from '../data/doctorsData';
import './DoctorRegistration.css';

const DoctorRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    specialization: '',
    customSpecialization: '',
    license: null,
    experience: '',
    qualification: '',
    fees: ''
  });

  // Extract unique specialties from doctorsData
  const specializations = [...new Set(doctorsData.map(doctor => doctor.specialty))];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalSpecialization =
      formData.specialization === 'other'
        ? formData.customSpecialization
        : formData.specialization;

    // Prepare form data for backend (including file)
    const form = new FormData();
    form.append('name', formData.name);
    form.append('email', formData.email);
    form.append('password', formData.password);
    form.append('specialty', finalSpecialization);
    form.append('qualification', formData.qualification);
    form.append('experience', formData.experience);
    form.append('consultationFees', formData.fees);
    form.append('licenseFile', formData.license);

    try {
      const res = await fetch("http://localhost:5000/api/auth/doctor/register", {
  method: "POST",
  body: form,
});

      const data = await res.json();

      if (res.ok) {
        alert('✅ Doctor registered successfully!');
        navigate('/DoctorSignIn');
      } else {
        alert(data.message || '❌ Registration failed');
      }
    } catch (error) {
      console.error('Error registering doctor:', error);
      alert('❌ Server error, please try again later.');
    }
  };

  return (
    <div className="doctor-registration">
      <div className="registration-card">
        <h2>Doctor Registration</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <select
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            required
          >
            <option value="">Select Specialization</option>
            {specializations.map(spec => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
            <option value="other">Other Specialization</option>
          </select>

          {formData.specialization === 'other' && (
            <input
              type="text"
              name="customSpecialization"
              placeholder="Enter your specialization"
              value={formData.customSpecialization}
              onChange={handleChange}
              required
            />
          )}

          <input
            type="text"
            name="qualification"
            placeholder="Qualifications (e.g., MBBS, MD)"
            value={formData.qualification}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="experience"
            placeholder="Years of Experience"
            value={formData.experience}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="fees"
            placeholder="Consultation Fees (₹)"
            value={formData.fees}
            onChange={handleChange}
            required
          />
          <div className="file-upload">
            <label>Medical License *</label>
            <input
              type="file"
              name="licenseFile"
              accept=".pdf,.jpg,.png"
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default DoctorRegistration;
