import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalDoctors: 25,
    activeDoctors: 18,
    totalPatients: 150,
    activePatients: 120,
  });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      alert('Please log in as admin first.');
      navigate('/AdminSignIn');
    }
  }, [navigate]);

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
      </div>

      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Doctors</h3>
          <p>{stats.totalDoctors}</p>
        </div>
        <div className="stat-card">
          <h3>Total Patients</h3>
          <p>{stats.totalPatients}</p>
        </div>
      </div>

      <div className="admin-actions">
        <div className="action-section">
          <h2>Manage Doctors</h2>
          <button className="action-btn" onClick={() => navigate('/AdminDoctors')}>
            View All Doctors
          </button>
        </div>

        <div className="action-section">
          <h2>Manage Patients</h2>
          <button className="action-btn" onClick={() => navigate('/AdminPatients')}>
            View All Patients
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
