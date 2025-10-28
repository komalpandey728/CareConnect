import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminTable.css";

const AdminPatients = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/patients");
        setPatients(res.data);
      } catch (err) {
        console.error("Error fetching patients:", err);
      }
    };
    fetchPatients();
  }, []);

  return (
    <div className="admin-table-container">
      <h2>All Registered Patients</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {patients.length > 0 ? (
            patients.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.email}</td>
                <td>{p.age || "N/A"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>
                No patients found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPatients;
