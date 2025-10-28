import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children, allowedRoles }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // Check if the user's role is allowed for this route
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === "doctor") return <Navigate to="/doctor-dashboard" replace />;
    if (user.role === "admin") return <Navigate to="/admin-dashboard" replace />;
    return <Navigate to="/" replace />;
  }

  return children;
}
