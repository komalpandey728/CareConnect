import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

function AuthPage() {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isRegister = location.pathname === "/register";
  const [role, setRole] = useState("patient");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isRegister) {
        if (!form.name || !form.email || !form.password || !form.confirmPassword) {
          setError("Please fill in all required fields");
          return;
        }

        if (form.password !== form.confirmPassword) {
          setError("Passwords do not match");
          return;
        }

        await register(form, role);
      } else {
        if (!form.email || !form.password) {
          setError("Please fill in all required fields");
          return;
        }

        await login(form.email, form.password, role);
      }

      // ✅ Redirect based on role
      if (role === "doctor") navigate("/doctor-dashboard");
      else if (role === "admin") navigate("/admin-dashboard");
      else navigate("/");
    } catch (err) {
      setError("Invalid credentials or registration failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isRegister ? "Create Account" : "Sign In"}</h2>

        {/* Role Selection
        <div className="role-selector">
          {["patient", "doctor", "admin"].map((r) => (
            <button
              key={r}
              type="button"
              className={`role-btn ${role === r ? "active" : ""}`}
              onClick={() => setRole(r)}
            >
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div> */}

        {error && <p className="error-msg">{error}</p>}

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
              />
            </>
          )}

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

          {isRegister && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          )}

          <button type="submit">{isRegister ? "Register" : "Login"}</button>
        </form>

        <p className="auth-footer">
          {isRegister ? (
            <>
              Already have an account?{" "}
              <Link to="/signin" className="auth-link">
                Sign In
              </Link>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <Link to="/register" className="auth-link">
                Register here
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default AuthPage;
