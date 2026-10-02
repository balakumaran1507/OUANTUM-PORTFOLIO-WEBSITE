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

const PrivacyPolicy: React.FC = () => {
  useSEO({
    title: 'Privacy Policy | Ouantum',
    description:
      'OUANTUM\'s privacy policy covering data collection architecture, multi-model processing protocols, data retention and auditability for our deterministic AI platform for civil infrastructure QA.',
    keywords:
      'OUANTUM privacy policy, construction AI data privacy, infrastructure data processing, TPQM data compliance, OUANTUM data retention',
    canonicalPath: '/privacy',
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
      <section className="hero" style={{ minHeight: '60vh', paddingTop: '120px' }} aria-label="Privacy policy hero">
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
              <h1
                className="section-title"
                style={{
                  marginBottom: '2rem',
                }}
              >
                Privacy<br />Policy
              </h1>
            </motion.div>
          </div>
          <p className="hero-subtext" style={{ marginTop: '2rem' }}>
            LAST UPDATED: MAY 2026. Data collection architecture and processing protocols for our deterministic AI platform.
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
            src="/assets/images/privacy_bg.png"
            alt="Data security and compliance visual background for OUANTUM Privacy Policy"
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

          <section aria-label="Data collection architecture">
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
              1. Data Collection Architecture
            </h2>
            <ScrollReveal style={{ color: 'rgba(255, 255, 255, 0.75)' }}>
              OUANTUM operates as a deterministic AI platform for civil infrastructure QA. We collect technical field data, structural readings, and geolocation metadata necessary for generating government-format compliance reports. Personal data is limited to user authentication and audit trails for digital sign-offs.
            </ScrollReveal>
          </section>

          <section aria-label="Processing and multi-model validation">
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
              2. Processing & Multi-Model Validation
            </h2>
            <ScrollReveal style={{ color: 'rgba(255, 255, 255, 0.75)' }}>
              Field data (e.g., rebound hammer readings, UPV transit times) is processed securely through our proprietary SonReb correlation models and evaluated against Indian Standards (IS 456, IS 13311). The AI inference layer does not use project-specific data to train foundational models outside of your organization's isolated tenant space.
            </ScrollReveal>
          </section>

          <section aria-label="Data retention and auditability">
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
              3. Data Retention & Auditability
            </h2>
            <ScrollReveal style={{ color: 'rgba(255, 255, 255, 0.75)' }}>
              To support Third-Party Quality Monitoring (TPQM) mandates, all project data, anomaly detections, and multi-model consensus logs are retained securely on PostgreSQL databases with immutable audit trails. Data is stored within the Republic of India in compliance with domestic data sovereignty regulations.
            </ScrollReveal>
          </section>

          <section aria-label="Contact for compliance">
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
              4. Contact for Compliance
            </h2>
            <p>
              For data inquiries, audit requests, or to review our information security practices, reach out to our compliance node at{' '}
              <a
                href="mailto:contact@ouantum.com"
                style={{ color: '#fff', textDecoration: 'none', opacity: 0.8, transition: 'opacity 0.2s' }}
                onMouseOver={(e) => (e.currentTarget.style.opacity = '1')}
                onMouseOut={(e) => (e.currentTarget.style.opacity = '0.8')}
                aria-label="Send email to contact@ouantum.com for compliance inquiries"
              >
                contact@ouantum.com
              </a>.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
};

export default PrivacyPolicy;


