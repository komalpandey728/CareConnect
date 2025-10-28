import React from "react";
import "./About.css";

export default function About() {
  return (
    <div className="about-page">
      <div className="overlay">
        <div className="about-container">
          <div className="about-card">
            <h1>About CareConnect</h1>
            <p className="intro">
              CareConnect is a comprehensive healthcare platform designed to make
              quality medical care accessible to everyone — anytime, anywhere.
              We bridge the gap between patients and doctors through a secure,
              easy-to-use online system.
            </p>

            <div className="about-section">
              <h2> Our Mission</h2>
              <p>
                Our mission is to empower patients by giving them quick access
                to verified doctors across multiple specialties. Whether you are
                in a remote village or a busy city, CareConnect ensures you
                receive the medical attention you deserve without delay.
              </p>
            </div>

            <div className="about-section">
              <h2>What We Offer</h2>
              <ul>
                <li>Online and offline doctor consultations</li>
                <li>Easy appointment booking and scheduling</li>
                <li>Digital prescriptions and health records</li>
                <li>24×7 support and emergency assistance</li>
                <li>Health awareness and prevention programs</li>
              </ul>
            </div>

            <div className="about-section">
              <h2> Our Vision</h2>
              <p>
                To build a healthier, connected world where healthcare is not a
                privilege but a basic right. We aim to simplify healthcare for
                both doctors and patients through technology, compassion, and
                trust.
              </p>
            </div>

            <div className="about-section">
              <h2>Our Team</h2>
              <p>
                CareConnect brings together a passionate team of healthcare
                professionals, software developers, and community workers
                dedicated to transforming healthcare delivery across India.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
