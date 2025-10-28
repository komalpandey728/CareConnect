import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

const SignIn = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "", role: "patient" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      // ✅ Correct backend route based on role
      const url =
        form.role === "patient"
          ? "http://localhost:5000/api/auth/login"
          : "http://localhost:5000/api/doctors/login";

      const response = await axios.post(url, {
        email: form.email,
        password: form.password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        alert("Login successful!");
        navigate("/profile");
      } else {
        setError("Invalid response from server");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid credentials. Try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Sign In</h2>
        {error && <p className="error-msg">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="role-selector">
            <label>
              <input
                type="radio"
                name="role"
                value="patient"
                checked={form.role === "patient"}
                onChange={handleChange}
              />
              Patient
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="doctor"
                checked={form.role === "doctor"}
                onChange={handleChange}
              />
              Doctor
            </label>
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>

        <p className="auth-footer">
          Don't have an account?{" "}
          <Link to="/register" className="auth-link">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
