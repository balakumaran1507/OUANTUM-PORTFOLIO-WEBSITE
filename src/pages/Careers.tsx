import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const Careers: React.FC = () => {
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
                  CAREERS NODE · TALENT POOL · OPEN POSITIONS
                </span>
              </div>
              <p className="side-description hero-description">
                JOIN THE TEAM ENGINEERING DETERMINISTIC QUALITY ASSURANCE FOR GLOBAL INFRASTRUCTURE.
              </p>
            </motion.div>

            <motion.div className="hero-right-content hero-right">
              <h1 style={{ fontFamily: 'var(--font-adieu)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.1, marginBottom: '2rem' }}>
                CAREERS<br/>NODE
              </h1>
              <p className="hero-subtext">
                We are actively looking for uncompromising civil engineers, AI researchers, and full-stack developers to scale the future of structural auditing.
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
            src="/assets/images/careers-about.jpg"
            alt="Careers Background"
            className="subpage-hero-image"
          />
          <div className="overlay-gradient"></div>
        </motion.div>
      </section>

      {/* Content Section */}
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', paddingTop: '4rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', lineHeight: '1.8', color: 'rgba(255,255,255,0.7)', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          
          {/* OPEN POSITIONS */}
          <div>
            <h2 style={{ fontFamily: 'var(--font-adieu)', fontSize: '1.5rem', color: '#fff', marginBottom: '2rem', letterSpacing: '0.1em' }}>OPEN POSITIONS</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
              
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                <div>
                  <h3 style={{ color: '#fff', margin: '0 0 0.5rem 0', fontSize: '1.1rem', letterSpacing: '0.1em' }}>AI ENGINEER / ML RESEARCHER</h3>
                  <p style={{ color: 'rgba(255,255,255,0.5)', margin: '0', fontSize: '0.8rem', letterSpacing: '0.1em' }}>CHENNAI, IN (HYBRID) · FULL-TIME</p>
                </div>
                <a href="mailto:contact@ouantum.com?subject=Application: AI Engineer" style={{ background: '#2563EB', color: '#fff', textDecoration: 'none', padding: '0.75rem 1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.1em', transition: 'background 0.3s' }}>
                  APPLY NOW
                </a>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                <div>
                  <h3 style={{ color: '#fff', margin: '0 0 0.5rem 0', fontSize: '1.1rem', letterSpacing: '0.1em' }}>STRUCTURAL AUDIT ENGINEER</h3>
                  <p style={{ color: 'rgba(255,255,255,0.5)', margin: '0', fontSize: '0.8rem', letterSpacing: '0.1em' }}>FIELD/REMOTE · FULL-TIME</p>
                </div>
                <a href="mailto:contact@ouantum.com?subject=Application: Structural Audit Engineer" style={{ background: '#2563EB', color: '#fff', textDecoration: 'none', padding: '0.75rem 1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.1em', transition: 'background 0.3s' }}>
                  APPLY NOW
                </a>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                <div>
                  <h3 style={{ color: '#fff', margin: '0 0 0.5rem 0', fontSize: '1.1rem', letterSpacing: '0.1em' }}>FRONTEND/UI DEVELOPER</h3>
                  <p style={{ color: 'rgba(255,255,255,0.5)', margin: '0', fontSize: '0.8rem', letterSpacing: '0.1em' }}>CHENNAI, IN (HYBRID) · FULL-TIME</p>
                </div>
                <a href="mailto:contact@ouantum.com?subject=Application: Frontend Developer" style={{ background: '#2563EB', color: '#fff', textDecoration: 'none', padding: '0.75rem 1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.1em', transition: 'background 0.3s' }}>
                  APPLY NOW
                </a>
              </div>

            </div>
          </div>

          {/* OPEN INITIATIVE */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '4rem' }}>
            <h2 style={{ fontFamily: 'var(--font-adieu)', fontSize: '1.5rem', color: '#fff', marginBottom: '1rem', letterSpacing: '0.1em' }}>DON'T SEE A FIT?</h2>
            <p style={{ maxWidth: '600px', marginBottom: '2rem' }}>
              We are always looking for exceptional talent. If you believe your skills align with our mission to overhaul construction quality assurance, send your resume and a brief introduction.
            </p>
            <a href="mailto:contact@ouantum.com?subject=General Application" style={{ display: 'inline-block', border: '1px solid #2563EB', color: '#2563EB', textDecoration: 'none', padding: '1rem 2rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.1em', transition: 'all 0.3s' }}>
              SUBMIT OPEN APPLICATION
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Careers;
