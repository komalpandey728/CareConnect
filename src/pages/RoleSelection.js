import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RoleSelection.css';

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    switch(role) {
      case 'patient':
        navigate('/signin'); // Regular patient signin
        break;
      case 'doctor':
        navigate('/DoctorSignIn');
        break;
      case 'admin':
        navigate('/AdminSignIn');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <div className="role-container">
      <div className="role-card">
        <h2>Welcome to CareConnect</h2>
        <p>Please select your role</p>
        <div className="role-buttons">
          <button 
            className="role-btn patient"
            onClick={() => handleRoleSelect('patient')}
          >
            Patient Portal
          </button>
          <button 
            className="role-btn doctor"
            onClick={() => handleRoleSelect('doctor')}
          >
            Doctor Portal
          </button>
          <button 
            className="role-btn admin"
            onClick={() => handleRoleSelect('admin')}
          >
            Admin Portal
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;