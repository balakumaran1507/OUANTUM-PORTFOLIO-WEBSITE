import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const SecurityTerms: React.FC = () => {
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
                  ENCRYPTION · SLAs · LIABILITY
                </span>
              </div>
              <p className="side-description hero-description">
                GUARANTEEING INFRASTRUCTURE INTEGRITY.
              </p>
            </motion.div>

            <motion.div className="hero-right-content hero-right">
              <h1 style={{ fontFamily: 'var(--font-adieu)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.1, marginBottom: '2rem' }}>
                SECURITY<br/>TERMS
              </h1>
              <p className="hero-subtext">
                EFFECTIVE DATE: MAY 2026. Outlining the operational constraints and multi-model liability frameworks of Ouantum.
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
            alt="Security Background"
            className="subpage-hero-image"
          />
          <div className="overlay-gradient"></div>
        </motion.div>
      </section>

      {/* Content Section */}
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '4rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', lineHeight: '1.8', color: 'rgba(255,255,255,0.7)', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          
          <div>
            <h2 style={{ fontFamily: 'var(--font-adieu)', fontSize: '1.5rem', color: '#fff', marginBottom: '1rem', letterSpacing: '0.1em' }}>1. PLATFORM UTILIZATION</h2>
            <p>
              Access to the Ouantum AI platform is restricted to authorized civil engineers, Third-Party Quality Monitors (TPQM), and structural audit consultants. The platform is designed to augment, not replace, professional engineering judgment.
            </p>
          </div>

          <div>
            <h2 style={{ fontFamily: 'var(--font-adieu)', fontSize: '1.5rem', color: '#fff', marginBottom: '1rem', letterSpacing: '0.1em' }}>2. MULTI-MODEL LIABILITY FRAMEWORK</h2>
            <p>
              While Ouantum utilizes deterministic calculations and multi-model AI consensus for IS code compliance (e.g., IS 456, IS 13311), final sign-off and liability for structural integrity reports rest strictly with the authorizing Senior Engineer. Ouantum provides the intelligence layer; the human expert provides the structural guarantee.
            </p>
          </div>

          <div>
            <h2 style={{ fontFamily: 'var(--font-adieu)', fontSize: '1.5rem', color: '#fff', marginBottom: '1rem', letterSpacing: '0.1em' }}>3. ENCRYPTION & INTEGRITY</h2>
            <p>
              All data in transit is secured via TLS 1.3. Data at rest is encrypted using AES-256 standards. Our architecture prevents manual tampering of timestamped field inputs to maintain absolute integrity for government and ADB-funded project audits.
            </p>
          </div>
          
          <div>
            <h2 style={{ fontFamily: 'var(--font-adieu)', fontSize: '1.5rem', color: '#fff', marginBottom: '1rem', letterSpacing: '0.1em' }}>4. SERVICE LEVEL AGREEMENT (SLA)</h2>
            <p>
              Ouantum guarantees 99.9% uptime for the field data intake API to ensure continuous operation on remote construction sites. Offline capabilities are built-in, syncing automatically upon network restoration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityTerms;
