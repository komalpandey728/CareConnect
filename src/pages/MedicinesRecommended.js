import React, { useState, useEffect } from "react";
import "./MedicinesRecommended.css";

const MedicinesRecommended = () => {
  // Dummy data (replace later with DB data)
  const [medicines, setMedicines] = useState([
    {
      id: 1,
      doctor: "Dr. Mehta",
      specialty: "Cardiologist",
      date: "15 Oct 2025",
      medicine: "Atorvastatin 10mg",
      dosage: "1 tablet daily after dinner",
      duration: "30 days",
      notes: "Helps manage cholesterol levels.",
    },
    {
      id: 2,
      doctor: "Dr. Sharma",
      specialty: "Dermatologist",
      date: "10 Oct 2025",
      medicine: "Cetirizine 10mg",
      dosage: "1 tablet before bed",
      duration: "10 days",
      notes: "Relieves skin allergy and itching.",
    },
    {
      id: 3,
      doctor: "Dr. Patel",
      specialty: "ENT Specialist",
      date: "05 Oct 2025",
      medicine: "Amoxicillin 500mg",
      dosage: "1 capsule every 8 hours",
      duration: "7 days",
      notes: "Complete full course for ear infection.",
    },
  ]);

  return (
    <div className="medicines-page">
      <div className="medicines-overlay">
        <div className="medicines-container">
          <h2 className="medicines-title">Medicines Recommended</h2>
          <p className="medicines-subtitle">
            View all the prescriptions recommended by your doctors.
          </p>

          <div className="medicines-list">
            {medicines.length > 0 ? (
              medicines.map((med) => (
                <div key={med.id} className="medicine-card">
                  <h3>{med.medicine}</h3>
                  <p className="medicine-dosage">
                    <strong>Dosage:</strong> {med.dosage}
                  </p>
                  <p>
                    <strong>Duration:</strong> {med.duration}
                  </p>
                  <p>
                    <strong>Doctor:</strong> {med.doctor} ({med.specialty})
                  </p>
                  <p>
                    <strong>Date Prescribed:</strong> {med.date}
                  </p>
                  <p className="medicine-notes">
                    <strong>Notes:</strong> {med.notes}
                  </p>
                </div>
              ))
            ) : (
              <p className="no-medicines">No medicines prescribed yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicinesRecommended;
