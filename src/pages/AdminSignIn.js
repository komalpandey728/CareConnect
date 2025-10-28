import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminSignIn.css";

const AdminSignIn = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // ✅ Use form.email and form.password
      const res = await axios.post("http://localhost:5000/api/admin/login", {
        email: form.email,
        password: form.password,
      });

      // ✅ Save JWT token
      localStorage.setItem("adminToken", res.data.token);

      alert("Admin login successful!");
      navigate("/AdminDashboard"); // redirect
    } catch (err) {
      console.error(err);
      setError("Invalid admin credentials");
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <h2>Admin Sign In</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Admin Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
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
      </div>
    </div>
  );
};

export default AdminSignIn;
