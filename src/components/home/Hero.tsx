import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="hero">
      <div className="container hero-content">
        <div className="section-split hero-main-layout">
          <motion.div
            className="sidebar-info hero-left"
          >
            <div className="hero-labels">
              <span className="hero-tech-label">
                AI-POWERED QUALITY ASSURANCE · STRUCTURAL AUDITING · INFRASTRUCTURE INTEGRITY
              </span>
            </div>

            <p className="side-description hero-description">
              EVERY VARIABLE. INSTANT INTELLIGENCE. AI-POWERED QUALITY ASSURANCE FOR INDIA'S CONSTRUCTION INFRASTRUCTURE.
            </p>
          </motion.div>

          <motion.div
            className="hero-right-content hero-right"
          >
            <p className="hero-subtext">
              OUANTUM IS THE AI PLATFORM BUILT FOR CIVIL CONSTRUCTION QUALITY ASSURANCE, MONITORING, AND AUDITING. FIELD DATA IN. GOVERNMENT-GRADE REPORTS OUT. SAME DAY.
            </p>

            <a href="https://api.whatsapp.com/send/?phone=917695827158&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="discuss-button hero-cta" style={{ textDecoration: 'none' }}>
              START CONVERSATION
              <div className="cta-icon-wrapper">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </a>
          </motion.div>
        </div>
      </div>



      <motion.div
        className="hero-image-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <img
          src="/assets/images/cl3.png"
          alt="Diagnostic Intelligence"
          className="hero-main-image"
        />
        <div className="overlay-gradient"></div>
      </motion.div>

      {/* No hero-numbers */}

    </section>
  );
};

export default Hero;
