import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>CareConnect</h3>
          <p>Quality Healthcare for Everyone</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/doctors">Find Doctors</Link></li>
            <li><Link to="/book">Book Appointment</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: info@careconnect.com</p>
          <p>Phone: 1-800-CARE</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2023 CareConnect. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;