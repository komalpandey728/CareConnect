import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("careconnectUser");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("careconnectUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const API_URL = "http://localhost:5000/api/auth";

  // REGISTER (for patients)
  const register = async (formData) => {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!res.ok) throw new Error("Failed to register");
    return res.json();
  };

  // LOGIN (supports both patient & doctor)
  const login = async (email, password, role = "patient") => {
    const endpoint =
      role === "doctor"
        ? `${API_URL}/doctor/login`
        : `${API_URL}/login`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error("Failed to login");
    const data = await res.json();

    localStorage.setItem("careconnectUser", JSON.stringify(data.user || data.doctor));
    localStorage.setItem("careconnectToken", data.token);
    localStorage.setItem("careconnectRole", role);
    setUser(data.user || data.doctor);
  };

  const logout = () => {
    localStorage.removeItem("careconnectUser");
    localStorage.removeItem("careconnectToken");
    localStorage.removeItem("careconnectRole");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
