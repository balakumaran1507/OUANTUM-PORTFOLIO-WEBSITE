import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="footer-industrial">
      <div className="container">

        {/* Large Brand Title */}
        <div className="footer-brand-title">
          <h2>OUANTUM</h2>
        </div>

        {/* Nav columns */}
        <div className="footer-nav-grid">
          <div className="footer-nav-col">
            <span className="footer-col-label">NAVIGATION</span>
            <Link to="/about" className="footer-nav-link">ABOUT_ARCHIVE</Link>
            <Link to="/careers" className="footer-nav-link">CAREERS_NODE</Link>
            <a href="/#activities" className="footer-nav-link">CORE_CAPABILITIES</a>
            <a href="/#geography" className="footer-nav-link">INFRASTRUCTURE_NODES</a>
            <Link to="/case-studies" className="footer-nav-link">CASE_STUDIES</Link>
          </div>
          <div className="footer-nav-col">
            <span className="footer-col-label">CONNECT</span>
            <Link to="/contact" className="footer-nav-link">CONTACT_US</Link>
            <a href="tel:+917695827158" className="footer-nav-link">+91 7695827158</a>
            <a href="tel:+918610805559" className="footer-nav-link">+91 8610805559</a>
            <Link to="/contact" className="footer-nav-link">START_INSPECTION</Link>
          </div>
          <div className="footer-nav-col">
            <span className="footer-col-label">RESEARCH</span>
            <a href="https://www.linkedin.com/company/ouantum/" target="_blank" rel="noopener noreferrer" className="footer-nav-link">LINKEDIN_ID</a>
          </div>
        </div>

        {/* Address row */}
        <div className="footer-address-row">
          <p>
            25, SILAMBU ST, PADMANABHA NAGAR, CHOOLAIMEDU, CHENNAI, TAMIL NADU 600094
          </p>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom-bar">
          <div className="footer-copyright-group">
            <span className="footer-copyright">
              © 2026 OUANTUM
            </span>
            <div className="footer-separator"></div>
            <div className="footer-legal-links">
              <Link to="/privacy" className="footer-nav-link">/PRIVACY</Link>
              <Link to="/security" className="footer-nav-link">/SECURITY</Link>
            </div>
          </div>
          <span className="iso-badge">
            ISO_9001:CERTIFIED
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
