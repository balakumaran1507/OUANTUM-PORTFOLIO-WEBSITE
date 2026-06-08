import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import useSEO from '../hooks/useSEO';

const BASE_URL = 'https://ouantum.com';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Ouantum',
  url: BASE_URL,
  sameAs: ['https://www.linkedin.com/company/ouantum/'],
};

const Careers: React.FC = () => {
  useSEO({
    title: 'Careers at Ouantum | Join the AI Infrastructure Team',
    description:
      'Join Ouantum — we are hiring AI engineers, structural audit specialists, and frontend developers to scale deterministic quality assurance for India\'s construction infrastructure.',
    keywords:
      'Ouantum careers, AI engineer jobs Chennai, structural audit engineer, civil engineering AI jobs, ML researcher construction, frontend developer Chennai',
    canonicalPath: '/careers',
    jsonLd: [organizationSchema],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main
      className="subpage-wrapper"
      style={{ background: '#000', color: '#fff', minHeight: '100vh', paddingBottom: '80px' }}
    >
      {/* Hero */}
      <section className="hero" style={{ minHeight: '60vh', paddingTop: '120px' }} aria-label="Careers hero section">
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
              <h1
                style={{
                  fontFamily: 'var(--font-adieu)',
                  fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                  lineHeight: 1.1,
                  marginBottom: '2rem',
                }}
              >
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
            alt="Team collaborating on AI infrastructure project at Ouantum — careers at Ouantum"
            className="subpage-hero-image"
          />
          <div className="overlay-gradient" aria-hidden="true"></div>
        </motion.div>
      </section>

      {/* Content Section */}
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', paddingTop: '4rem' }}>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.9rem',
            lineHeight: '1.8',
            color: 'rgba(255,255,255,0.7)',
            display: 'flex',
            flexDirection: 'column',
            gap: '4rem',
          }}
        >
          {/* OPEN POSITIONS */}
          <section aria-label="Open job positions">
            <h2
              style={{
                fontFamily: 'var(--font-adieu)',
                fontSize: '1.5rem',
                color: '#fff',
                marginBottom: '2rem',
                letterSpacing: '0.1em',
              }}
            >
              OPEN POSITIONS
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>

              <article
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  padding: '2rem',
                  border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <div>
                  <h3
                    style={{
                      color: '#fff',
                      margin: '0 0 0.5rem 0',
                      fontSize: '1.1rem',
                      letterSpacing: '0.1em',
                    }}
                  >
                    AI ENGINEER / ML RESEARCHER
                  </h3>
                  <p
                    style={{
                      color: 'rgba(255,255,255,0.5)',
                      margin: '0',
                      fontSize: '0.8rem',
                      letterSpacing: '0.1em',
                    }}
                  >
                    CHENNAI, IN (HYBRID) · FULL-TIME
                  </p>
                </div>
                <a
                  href="mailto:contact@ouantum.com?subject=Application: AI Engineer"
                  style={{
                    background: '#000000',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    padding: '0.75rem 1.5rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    letterSpacing: '0.1em',
                    transition: 'all 0.3s',
                  }}
                  aria-label="Apply for AI Engineer / ML Researcher position at Ouantum"
                >
                  APPLY NOW
                </a>
              </article>

              <article
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  padding: '2rem',
                  border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <div>
                  <h3
                    style={{
                      color: '#fff',
                      margin: '0 0 0.5rem 0',
                      fontSize: '1.1rem',
                      letterSpacing: '0.1em',
                    }}
                  >
                    STRUCTURAL AUDIT ENGINEER
                  </h3>
                  <p
                    style={{
                      color: 'rgba(255,255,255,0.5)',
                      margin: '0',
                      fontSize: '0.8rem',
                      letterSpacing: '0.1em',
                    }}
                  >
                    FIELD/REMOTE · FULL-TIME
                  </p>
                </div>
                <a
                  href="mailto:contact@ouantum.com?subject=Application: Structural Audit Engineer"
                  style={{
                    background: '#000000',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    padding: '0.75rem 1.5rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    letterSpacing: '0.1em',
                    transition: 'all 0.3s',
                  }}
                  aria-label="Apply for Structural Audit Engineer position at Ouantum"
                >
                  APPLY NOW
                </a>
              </article>

              <article
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  padding: '2rem',
                  border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <div>
                  <h3
                    style={{
                      color: '#fff',
                      margin: '0 0 0.5rem 0',
                      fontSize: '1.1rem',
                      letterSpacing: '0.1em',
                    }}
                  >
                    FRONTEND / UI DEVELOPER
                  </h3>
                  <p
                    style={{
                      color: 'rgba(255,255,255,0.5)',
                      margin: '0',
                      fontSize: '0.8rem',
                      letterSpacing: '0.1em',
                    }}
                  >
                    CHENNAI, IN (HYBRID) · FULL-TIME
                  </p>
                </div>
                <a
                  href="mailto:contact@ouantum.com?subject=Application: Frontend Developer"
                  style={{
                    background: '#000000',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    padding: '0.75rem 1.5rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    letterSpacing: '0.1em',
                    transition: 'all 0.3s',
                  }}
                  aria-label="Apply for Frontend / UI Developer position at Ouantum"
                >
                  APPLY NOW
                </a>
              </article>

            </div>
          </section>

          {/* OPEN INITIATIVE */}
          <section style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '4rem' }} aria-label="General application">
            <h2
              style={{
                fontFamily: 'var(--font-adieu)',
                fontSize: '1.5rem',
                color: '#fff',
                marginBottom: '1rem',
                letterSpacing: '0.1em',
              }}
            >
              DON'T SEE A FIT?
            </h2>
            <p style={{ maxWidth: '600px', marginBottom: '2rem' }}>
              We are always looking for exceptional talent. If you believe your skills align with our mission to overhaul construction quality assurance, send your resume and a brief introduction.
            </p>
            <a
              href="mailto:contact@ouantum.com?subject=General Application"
              style={{
                display: 'inline-block',
                background: '#000000',
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#FFFFFF',
                textDecoration: 'none',
                padding: '1rem 2rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                letterSpacing: '0.1em',
                transition: 'all 0.3s',
              }}
              aria-label="Submit an open application to Ouantum"
            >
              SUBMIT OPEN APPLICATION
            </a>
          </section>

        </div>
      </div>
    </main>
  );
};

export default Careers;
