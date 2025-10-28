import React from "react";
import { useAuth } from "../context/AuthContext";
import "./ProfilePages.css";

export default function Profile() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="page-container">
        <div className="card">
          <h2>No Profile Found</h2>
          <p>Please log in to view your profile information.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="card">
        <h2>My Profile</h2>
        <div className="profile-details">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>City:</strong> {user.city}</p>
        </div>
        <hr />
        <p>Welcome to CareConnect, {user.name}.</p>
      </div>
    </div>
  );
}
