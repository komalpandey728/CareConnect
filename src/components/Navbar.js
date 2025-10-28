import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  // ✅ Safely get username
  const username = user?.name || user?.email?.split?.("@")[0] || "User";

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        CareConnect
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/doctors">Find Doctors</Link>
        <Link to="/book">Book Appointment</Link>
        <Link to="/about">About</Link>
      </div>

      <div className="auth-buttons">
        {user ? (
          <div
            className="user-dropdown-container"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <span className="welcome-text">Hi, {username} ▼</span>

            {showDropdown && (
              <div className="dropdown-menu">
                <Link to="/profile" className="dropdown-item">
                  My Profile
                </Link>
                <Link to="/appointments" className="dropdown-item">
                  Appointments Scheduled
                </Link>
                <Link to="/previous-appointments" className="dropdown-item">
                  Previous Appointments
                </Link>
                <Link to="/settings" className="dropdown-item">
                  Settings
                </Link>
                <button onClick={handleLogout} className="dropdown-item logout">
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/RoleSelection">
              <button className="signin-btn">Sign In</button>
            </Link>
            <Link to="/register">
              <button className="register-btn">Get Started</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
