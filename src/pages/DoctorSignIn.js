import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./DoctorSignIn.css";

const DoctorSignIn = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/doctor/login", form);

      if (res.data?.token && res.data?.doctor) {
        // ✅ Save doctor info in the same structure AuthContext expects
        localStorage.setItem("careconnectUser", JSON.stringify(res.data.doctor));
        localStorage.setItem("careconnectToken", res.data.token);
        localStorage.setItem("careconnectRole", "doctor");

        alert("Doctor login successful!");
        navigate("/DoctorDashboard");
      } else {
        setError("Login failed — invalid response from server");
      }
    } catch (err) {
      console.error("❌ Login Error:", err);
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <h2>Doctor Sign In</h2>
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="signin-btn">
            Sign In
          </button>
        </form>

        <p className="register-link">
          New Doctor? <Link to="/DoctorRegistration">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default DoctorSignIn;
