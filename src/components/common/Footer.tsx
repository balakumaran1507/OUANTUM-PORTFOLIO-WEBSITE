import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FOUNDING_DATE_LABEL, MSME_CERTIFICATE_URL, UDYAM_NUMBER } from '../../config/company';

const Footer: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Adjust logo scale, X-axis position, and Y-axis position directly here
  const logoScale = isMobile ? 11.5 : 15.0;
  const logoX = 0; // in pixels
  const logoY = isMobile ? 1.0 : 2.0; // in pixels

  return (
    <footer className="footer-industrial">
      <div className="container">

        {/* Large Brand Title */}
        <div className="footer-brand-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{
            height: isMobile ? '56px' : `calc(3.0 * clamp(1.9rem, 4vw, 3rem))`,
            width: '100%',
            overflow: 'hidden',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <img
              src="/assets/images/logo_horizontal.png"
              alt="OUANTUM Logo"
              loading="lazy"
              style={{
                height: isMobile ? '20px' : 'clamp(1.5rem, 4vw, 3rem)',
                width: 'auto',
                transform: `scale(${logoScale}) translate(${logoX}px, ${logoY}px)`,
                transformOrigin: 'center center',
                display: 'block',
                filter: 'invert(1)'
              }}
            />
          </div>
        </div>

        {/* Nav columns */}
        <div className="footer-nav-grid">
          <div className="footer-nav-col">
            <span className="footer-col-label">Navigation</span>
            <Link to="/ox1" className="footer-nav-link">OX1 Product</Link>
            <Link to="/about" className="footer-nav-link">About Archive</Link>
            <Link to="/careers" className="footer-nav-link">Careers</Link>
            <Link to="/capabilities" className="footer-nav-link">Core Capabilities</Link>
            <Link to="/case-studies" className="footer-nav-link">Case Studies</Link>
            <Link to="/blog" className="footer-nav-link">Blog</Link>
          </div>
          <div className="footer-nav-col">
            <span className="footer-col-label">Connect</span>
            <Link to="/contact" className="footer-nav-link">Contact Us</Link>
            <a href="tel:+917695827158" className="footer-nav-link">+91 7695827158</a>
            <a href="tel:+918610805559" className="footer-nav-link">+91 8610805559</a>
            <Link to="/contact" className="footer-nav-link">Start Inspection</Link>
          </div>
          <div className="footer-nav-col">
            <span className="footer-col-label">Research</span>
            <a href="https://www.linkedin.com/company/ouantum/" target="_blank" rel="noopener noreferrer" className="footer-nav-link">LinkedIn</a>
            <a href="https://www.instagram.com/ouantum.tech?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="footer-nav-link">Instagram</a>
          </div>
        </div>

        {/* Address row */}
        <div className="footer-address-row">
          <p>
            25, Silambu St, Padmanabha Nagar, Choolaimedu, Chennai, Tamil Nadu 600094
          </p>
          <p>
            Founded {FOUNDING_DATE_LABEL} · MSME (Udyam) registered: {UDYAM_NUMBER}
          </p>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom-bar">
          <div className="footer-copyright-group">
            <span className="footer-copyright">
              © 2026 OUANTUM
            </span>
            <div className="footer-legal-links">
              <Link to="/privacy" className="footer-nav-link">Privacy Policy</Link>
              <Link to="/security" className="footer-nav-link">Security & Terms</Link>
              <a href={MSME_CERTIFICATE_URL} target="_blank" rel="noopener noreferrer" className="footer-nav-link">MSME Registration (PDF)</a>
            </div>
          </div>
          <span className="iso-badge">
            ISO 9001 Certified
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
