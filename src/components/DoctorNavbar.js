import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./DoctorNavbar.css";
import { useAuth } from "../context/AuthContext";

function DoctorNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/DoctorSignIn");
  };

  return (
    <nav className="doctor-navbar">
      <div className="doctor-navbar-container">
        {/* Logo */}
        <Link to="/" className="doctor-logo">
          CareConnect
        </Link>

        {/* Navigation Links */}
        <ul className="doctor-nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/DoctorDashboard">Doctor Dashboard</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>

        {/* User Dropdown */}
        {user ? (
          <div
            className="doctor-user-dropdown"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <div className="doctor-user-avatar">
              👨‍⚕️ {user.name || "Doctor"}
            </div>
            {dropdownOpen && (
              <div className="doctor-dropdown-menu">
                <button onClick={() => navigate("/settings")}>⚙️ Settings</button>
                <button onClick={handleLogout}>🚪 Logout</button>
              </div>
            )}
          </div>
        ) : (
          <div className="doctor-auth-buttons">
            <Link to="/DoctorSignIn" className="btn-signin">
              Sign In
            </Link>
            <Link to="/DoctorRegistration" className="btn-register">
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default DoctorNavbar;
