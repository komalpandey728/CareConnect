import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaCalendarCheck,
  FaVideo,
  FaHeart,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import "./Home.css";

const faqs = [
  {
    id: 1,
    question: "How to book an appointment online?",
    answer:
      "You can book an appointment by clicking the 'Book Consultation' button or visiting our doctors page. Select your preferred doctor and available time slot.",
  },
  {
    id: 2,
    question: "Why choose online consultation?",
    answer:
      "Online consultations offer convenience, accessibility, and cost-effectiveness. You can consult with doctors from the comfort of your home, saving time and travel costs.",
  },
  {
    id: 3,
    question: "How to consult a doctor offline or online through CareConnect?",
    answer:
      "You can consult a doctor either online through video calls or offline by visiting their clinic. Choose your preferred method and book an appointment accordingly.",
  },
  {
    id: 4,
    question: "How does CareConnect work?",
    answer:
      "CareConnect connects you with qualified doctors for online and offline consultations. Browse doctors, book appointments, and access health information all in one place.",
  },
  {
    id: 5,
    question: "When to consult a doctor?",
    answer:
      "Consult a doctor when you experience persistent symptoms, need a diagnosis, require medical advice, or need a prescription.",
  },
  {
    id: 6,
    question: "Benefits of choosing CareConnect's online services?",
    answer:
      "CareConnect offers highly-qualified doctors, 24/7 availability, emergency medical services, affordable consultations, and personalized solutions.",
  },
];

const FAQ = ({ question, answer, isOpen, onClick }) => (
  <div className="faq-item">
    <button
      className={`faq-question ${isOpen ? "active" : ""}`}
      onClick={onClick}
    >
      <span>{question}</span>
      <span className="faq-icon">
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </span>
    </button>
    {isOpen && <div className="faq-answer">{answer}</div>}
  </div>
);

const Home = () => {
  const navigate = useNavigate();
  const [openFAQ, setOpenFAQ] = useState(null);

  const handleBookConsultation = () => {
    navigate("/book");
  };

  const handleFindConsultant = () => {
    navigate("/doctors");
  };

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div
      className="home-container"
      style={{
        backgroundImage: "url('/images/hospital-background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
      }}
    >
      {/* 🏥 Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Quality Healthcare for <span className="highlight">Everyone</span>
          </h1>

          <p className="hero-description">
            Connect with qualified doctors for free or affordable consultations.
            Access essential health information and get the care you deserve,
            regardless of your location or income.
          </p>

          <div className="features">
            <div className="feature-item">
              <FaCalendarCheck className="feature-icon" />
              <span>Easy Booking</span>
            </div>
            <div className="feature-item">
              <FaVideo className="feature-icon" />
              <span>Virtual Consultations</span>
            </div>
            <div className="feature-item">
              <FaHeart className="feature-icon" />
              <span>Affordable Care</span>
            </div>
          </div>

          <div className="cta-buttons">
            <button className="btn-primary" onClick={handleBookConsultation}>
              Book Consultation
            </button>
            <button className="btn-secondary" onClick={handleFindConsultant}>
              Find Consultant
            </button>
          </div>

          <div className="stats">
            <div className="stat-item">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Consultations</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Doctors</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support</div>
            </div>
          </div>
        </div>

        <div className="hero-image">
          <img src="/images/doctor-consultation.jpg" alt="Doctor consultation" />
        </div>
      </div>

      {/* 🩺 Articles Section */}
      <div className="articles-section">
        <h2 className="articles-title">Health Articles for You</h2>
        <div className="articles-grid">
          {[
            {
              title: "How to Treat Ear Pain in Children",
              link: "https://www.apollo247.com/blog/article/how-to-treat-ear-pain-in-children",
              img: "/images/ear-pain.jpg",
              desc: "Learn safe and effective ways to manage ear pain in kids, including home remedies and when to see a doctor.",
            },
            {
              title: "BT & CT Test: Normal Range and Purpose",
              link: "https://www.apollo247.com/blog/article/bt-ct-normal-range",
              img: "/images/bt-ct-test.jpg",
              desc: "Understand the Bleeding Time (BT) and Clotting Time (CT) tests — why they’re done and what results mean.",
            },
            {
              title: "Vitamin B12 Test: Normal Range & Meaning",
              link: "https://www.apollo247.com/blog/article/vitamin-b12-test-normal-range-purpose-procedure-results-interpretation",
              img: "/images/vitamin-b12.jpg",
              desc: "Find out why Vitamin B12 is vital for your health, and how to interpret your lab test results.",
            },
            {
              title: "Home Remedies to Stop Loose Motion",
              link: "https://www.apollo247.com/blog/article/home-remedies-to-stop-loose-motion",
              img: "/images/loose-motion.jpg",
              desc: "Discover quick and natural home remedies to relieve diarrhea and maintain hydration.",
            },
            {
              title: "Does Poor Oral Hygiene Increase Heart Disease Risk?",
              link: "https://www.apollo247.com/blog/article/does-poor-oral-hygiene-increase-risk-heart-disease",
              img: "/images/oral-health.jpg",
              desc: "Explore how dental health and heart disease are connected, and steps to protect your heart.",
            },
            {
              title: "Everything You Need to Know About Nebulizers",
              link: "https://www.apollo247.com/blog/article/everything-you-need-know-about-nebulizers",
              img: "/images/nebulizer.jpg",
              desc: "Learn how nebulizers help in respiratory conditions like asthma and how to use them safely.",
            },
            {
              title: "Different Types of Fever in India",
              link: "https://www.apollo247.com/blog/article/different-types-of-fever-in-india-vc007",
              img: "/images/fever-types.jpg",
              desc: "Know about common fever types in India — from viral to dengue — and their key symptoms.",
            },
            {
              title: "9 Home Remedies Backed by Science",
              link: "https://www.healthline.com/health/home-remedies",
              img: "/images/remedies.jpg",
              desc: "Home remedies that one can refer to in order to avoid hospital bills",
            },
            {
              title: "Home remedies for acid reflux",
              link: "https://www.health.harvard.edu/newsletter_article/9-ways-to-relieve-acid-reflux-without-medication",
              img: "/images/acidity.jpg",
              desc: "Explore Home remedies for acidity",
            },
          ].map((article, index) => (
            <div className="article-card" key={index}>
              <img
                src={article.img}
                alt={article.title}
                className="article-image"
              />
              <div className="article-info">
                <h3>{article.title}</h3>
                <p>{article.desc}</p>
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="read-more"
                >
                  Read More →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ❓ FAQ Section */}
      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-container">
          {faqs.map((faq) => (
            <FAQ
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
              isOpen={openFAQ === faq.id}
              onClick={() => toggleFAQ(faq.id)}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="footer-wrapper">
        <div className="footer-content">
          <div className="footer-section">
            <h3>For Patients</h3>
            <ul>
              <li><Link to="/search-doctors">Search for Doctors</Link></li>
              <li><Link to="/book">Book Appointment</Link></li>
              <li><Link to="/consult">Video Consult</Link></li>
              <li><Link to="/health-plans">Health Plans</Link></li>
              <li><Link to="/medicines">Medicines</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>For Doctors</h3>
            <ul>
              <li><Link to="/doctor-register">Register</Link></li>
              <li><Link to="/doctor-login">Login</Link></li>
              <li><Link to="/doctor-resources">Resources</Link></li>
              <li><Link to="/practice">Digital Practice</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Services</h3>
            <ul>
              <li><Link to="/lab-tests">Lab Tests</Link></li>
              <li><Link to="/surgeries">Surgeries</Link></li>
              <li><Link to="/health-records">Health Records</Link></li>
              <li><Link to="/packages">Health Packages</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>About</h3>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Use</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>More</h3>
            <ul>
              <li><Link to="/help">Help Center</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/corporate">Corporate</Link></li>
              <li><Link to="/partners">Partner With Us</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <Link to="/" className="footer-logo">
            CareConnect
          </Link>
          <div className="footer-social">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
