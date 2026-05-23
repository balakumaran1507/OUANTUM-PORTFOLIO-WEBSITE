import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="subpage-wrapper" style={{ background: '#000', color: '#fff', minHeight: '100vh', paddingBottom: '80px' }}>
      
      {/* Subpage Hero Section */}
      <section className="hero" style={{ minHeight: '60vh', paddingTop: '120px' }}>
        <div className="container hero-content">
          <div className="section-split hero-main-layout">
            <motion.div className="sidebar-info hero-left">
              <div className="hero-labels">
                <span className="hero-tech-label">
                  DATA COMPLIANCE · AUDITABILITY
                </span>
              </div>
              <p className="side-description hero-description">
                TRANSPARENCY IN INFRASTRUCTURE DATA PROCESSING.
              </p>
            </motion.div>

            <motion.div className="hero-right-content hero-right">
              <h1 style={{ fontFamily: 'var(--font-adieu)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.1, marginBottom: '2rem' }}>
                PRIVACY<br/>PROTOCOL
              </h1>
              <p className="hero-subtext">
                LAST UPDATED: MAY 2026. Data collection architecture and processing protocols for our deterministic AI platform.
              </p>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="hero-image-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          style={{ height: '60vh' }}
        >
          <img
            src="/assets/images/privacy-and-security-page-hero.jpg"
            alt="Privacy Background"
            className="subpage-hero-image"
          />
          <div className="overlay-gradient"></div>
        </motion.div>
      </section>

      {/* Content Section */}
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '4rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', lineHeight: '1.8', color: 'rgba(255,255,255,0.7)', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          
          <div>
            <h2 style={{ fontFamily: 'var(--font-adieu)', fontSize: '1.5rem', color: '#fff', marginBottom: '1rem', letterSpacing: '0.1em' }}>1. DATA COLLECTION ARCHITECTURE</h2>
            <p>
              Ouantum operates as a deterministic AI platform for civil infrastructure QA. We collect technical field data, structural readings, and geolocation metadata necessary for generating government-format compliance reports. Personal data is limited to user authentication and audit trails for digital sign-offs.
            </p>
          </div>

          <div>
            <h2 style={{ fontFamily: 'var(--font-adieu)', fontSize: '1.5rem', color: '#fff', marginBottom: '1rem', letterSpacing: '0.1em' }}>2. PROCESSING & MULTI-MODEL VALIDATION</h2>
            <p>
              Field data (e.g., rebound hammer readings, UPV transit times) is processed securely through our proprietary SonReb correlation models and evaluated against Indian Standards (IS 456, IS 13311). The AI inference layer does not use project-specific data to train foundational models outside of your organization's isolated tenant space.
            </p>
          </div>

          <div>
            <h2 style={{ fontFamily: 'var(--font-adieu)', fontSize: '1.5rem', color: '#fff', marginBottom: '1rem', letterSpacing: '0.1em' }}>3. DATA RETENTION & AUDITABILITY</h2>
            <p>
              To support Third-Party Quality Monitoring (TPQM) mandates, all project data, anomaly detections, and multi-model consensus logs are retained securely on PostgreSQL databases with immutable audit trails. Data is stored within the Republic of India in compliance with domestic data sovereignty regulations.
            </p>
          </div>
          
          <div>
            <h2 style={{ fontFamily: 'var(--font-adieu)', fontSize: '1.5rem', color: '#fff', marginBottom: '1rem', letterSpacing: '0.1em' }}>4. CONTACT FOR COMPLIANCE</h2>
            <p>
              For data inquiries, audit requests, or to review our information security practices, reach out to our compliance node at <a href="mailto:contact@ouantum.com" style={{ color: '#2563EB', textDecoration: 'underline' }}>contact@ouantum.com</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
