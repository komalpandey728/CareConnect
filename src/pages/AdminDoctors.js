import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminTable.css";

const AdminDoctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/doctors");
        setDoctors(res.data);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <div className="admin-table-container">
      <h2>All Registered Doctors</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Specialization</th>
            <th>Experience</th>
          </tr>
        </thead>
        <tbody>
          {doctors.length > 0 ? (
            doctors.map((doc) => (
              <tr key={doc._id}>
                <td>{doc.name}</td>
                <td>{doc.email}</td>
                <td>{doc.specialization || "N/A"}</td>
                <td>{doc.experience ? `${doc.experience} years` : "N/A"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No doctors found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDoctors;
