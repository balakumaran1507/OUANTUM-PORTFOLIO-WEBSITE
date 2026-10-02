import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import useSEO from '../hooks/useSEO';
import ScrollReveal from '../components/common/ScrollReveal';

const BASE_URL = 'https://ouantum.com';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'OUANTUM',
  url: BASE_URL,
  sameAs: ['https://www.linkedin.com/company/ouantum/'],
};

const SecurityTerms: React.FC = () => {
  useSEO({
    title: 'Security Terms | Ouantum',
    description:
      'OUANTUM security terms covering platform utilization, multi-model liability framework, TLS 1.3 encryption, and 99.9% uptime SLA for civil infrastructure AI quality assurance.',
    keywords:
      'OUANTUM security terms, construction AI security, infrastructure data encryption, TPQM liability, OUANTUM SLA, AES-256 construction platform',
    canonicalPath: '/security',
    jsonLd: [organizationSchema],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main
      className="subpage-wrapper"
      style={{ background: '#000000', color: '#fff', minHeight: '100vh', paddingBottom: '80px' }}
    >
      {/* Hero */}
      <section className="hero" style={{ minHeight: '60vh', paddingTop: '120px' }} aria-label="Security terms hero">
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
              <h1
                className="section-title"
                style={{
                  marginBottom: '2rem',
                }}
              >
                Security<br />Terms
              </h1>
            </motion.div>
          </div>
          <p className="hero-subtext" style={{ marginTop: '2rem' }}>
            EFFECTIVE DATE: MAY 2026. Outlining the operational constraints and multi-model liability frameworks of OUANTUM.
          </p>
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
            alt="Security protocols visual representation for OUANTUM terms page"
            className="subpage-hero-image"
          />
          <div className="overlay-gradient" aria-hidden="true" />
        </motion.div>
      </section>

      {/* Main Content */}
      <div className="container" style={{ paddingTop: '5rem' }}>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.9rem',
            lineHeight: '1.8',
            color: 'rgba(255, 255, 255, 0.7)',
            display: 'flex',
            flexDirection: 'column',
            gap: '3rem',
          }}
        >

          <section aria-label="Platform utilization terms">
            <h2
              style={{
                fontFamily: 'var(--font-adieu)',
                fontSize: '1.5rem',
                color: '#fff',
                marginBottom: '1rem',
                letterSpacing: '0.05em',
                textTransform: 'none',
              }}
            >
              1. Platform Utilization
            </h2>
            <ScrollReveal style={{ color: 'rgba(255, 255, 255, 0.75)' }}>
              Access to the OUANTUM AI platform is restricted to authorized civil engineers, Third-Party Quality Monitors (TPQM), and structural audit consultants. The platform is designed to augment, not replace, professional engineering judgment.
            </ScrollReveal>
          </section>

          <section aria-label="Multi-model liability framework">
            <h2
              style={{
                fontFamily: 'var(--font-adieu)',
                fontSize: '1.5rem',
                color: '#fff',
                marginBottom: '1rem',
                letterSpacing: '0.05em',
                textTransform: 'none',
              }}
            >
              2. Multi-Model Liability Framework
            </h2>
            <ScrollReveal style={{ color: 'rgba(255, 255, 255, 0.75)' }}>
              While OUANTUM utilizes deterministic calculations and multi-model AI consensus for IS code compliance (e.g., IS 456, IS 13311), final sign-off and liability for structural integrity reports rest strictly with the authorizing Senior Engineer. OUANTUM provides the intelligence layer; the human expert provides the structural guarantee.
            </ScrollReveal>
          </section>

          <section aria-label="Encryption and integrity standards">
            <h2
              style={{
                fontFamily: 'var(--font-adieu)',
                fontSize: '1.5rem',
                color: '#fff',
                marginBottom: '1rem',
                letterSpacing: '0.05em',
                textTransform: 'none',
              }}
            >
              3. Encryption & Integrity
            </h2>
            <ScrollReveal style={{ color: 'rgba(255, 255, 255, 0.75)' }}>
              All data in transit is secured via TLS 1.3. Data at rest is encrypted using AES-256 standards. Our architecture prevents manual tampering of timestamped field inputs to maintain absolute integrity for government and ADB-funded project audits.
            </ScrollReveal>
          </section>

          <section aria-label="Service level agreement">
            <h2
              style={{
                fontFamily: 'var(--font-adieu)',
                fontSize: '1.5rem',
                color: '#fff',
                marginBottom: '1rem',
                letterSpacing: '0.05em',
                textTransform: 'none',
              }}
            >
              4. Service Level Agreement (SLA)
            </h2>
            <ScrollReveal style={{ color: 'rgba(255, 255, 255, 0.75)' }}>
              OUANTUM guarantees 99.9% uptime for the field data intake API to ensure continuous operation on remote construction sites. Offline capabilities are built-in, syncing automatically upon network restoration.
            </ScrollReveal>
          </section>

        </div>
      </div>
    </main>
  );
};

export default SecurityTerms;


