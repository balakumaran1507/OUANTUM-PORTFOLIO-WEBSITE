import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import useSEO from '../hooks/useSEO';
import GlowCard from '../components/GlowCard';
import ScrollReveal from '../components/common/ScrollReveal';

const BASE_URL = 'https://ouantum.com';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'OUANTUM',
  url: BASE_URL,
  sameAs: ['https://www.linkedin.com/company/ouantum/'],
};

const Capabilities: React.FC = () => {
  useSEO({
    title: 'Core Capabilities | AI Civil Infrastructure Quality Assurance | OUANTUM',
    description:
      'Explore OUANTUM\'s core capabilities: deterministic AI non-destructive testing (NDT), IS code-compliance auditing, multi-model AI consensus, and structural service life prediction.',
    keywords:
      'OUANTUM capabilities, deterministic AI QA, NDT analysis engine, IS code compliance, multi-model consensus, structural auditing, service life prediction',
    canonicalPath: '/capabilities',
    jsonLd: [organizationSchema],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const coreModules = [
    {
      title: 'NDT Analysis Engine',
      path: '/capabilities/ndt-analysis-engine',
      subtitle: 'SONREB DETERMINISTIC CALCULATION ENGINE',
      description:
        'Processes raw rebound hammer and ultrasonic pulse velocity (UPV) values. Automatically determines concrete density, homogeneity, dynamic elastic modulus, and estimated compressive strength using the SonReb validation standard.',
    },
    {
      title: 'IS Code Compliance',
      path: '/capabilities/is-code-compliance',
      subtitle: 'IS 13311 IS 516 CODIFIED AUDITS',
      description:
        'Verifies field data against codified Indian Standards. The engine evaluates test results based on concrete grade, age, curing, exposure conditions, and structural elements to ensure strict regulatory conformance.',
    },
    {
      title: 'Multi Model Consensus',
      path: '/capabilities/multi-model-consensus',
      subtitle: '3 MODEL AGREEMENT COMPLIANCE GUARANTEE',
      description:
        'Every reading is cross-referenced across three independent AI validation models. If a discrepancy arises, the system halts auto-reporting and routes the data to our expert civil engineering panel for verification.',
    },
    {
      title: 'Service Life Prediction',
      path: '/capabilities/service-life-prediction',
      subtitle: 'CARBONATION RATE CORROSION HAZARD SERVICEABILITY',
      description:
        'Models concrete degradation over time using environmental exposure factors, cover thickness, carbonation depth, and chloride ingress. Generates serviceability forecasts to schedule preventative rehabilitation.',
    },
  ];

  return (
    <main
      className="subpage-wrapper"
      style={{ background: '#000000', color: '#fff', minHeight: '100vh', paddingBottom: '120px' }}
    >
      {/* Hero Section */}
      <section className="hero" style={{ minHeight: '60vh', paddingTop: '120px' }} aria-label="Capabilities hero">
        <div className="container hero-content">
          <div className="section-split hero-main-layout">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="sidebar-info hero-left"
            >
              <div className="hero-labels">
                <span className="hero-tech-label">
                  CAPABILITIES NODE CORE PLATFORM SYSTEM OVERVIEW
                </span>
              </div>
              <p className="side-description hero-description">
                DETERMINISTIC COMPUTATION ENGINE AND MULTI MODEL CONSENSUS LAYERS FOR STRUCTURAL QUALITY.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="hero-right-content hero-right"
            >
              <h1
                style={{
                  fontFamily: 'var(--font-adieu)',
                  fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                  lineHeight: 1.1,
                  marginBottom: '2rem',
                  color: '#ffffff',
                }}
              >
                Platform<br />Capabilities
              </h1>
            </motion.div>
          </div>
          
          <p className="hero-subtext" style={{ marginTop: '2rem' }}>
            The OUANTUM platform automates the end to end structural quality assurance pipeline. By replacing paper-based manual reporting with deterministic mathematical validation, IS code cross-checking, and multi model AI consensus, we deliver same-day compliant audits that civil authorities, engineers, and developers can trust implicitly.
          </p>
        </div>

        <motion.div
          className="hero-image-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          style={{ height: '50vh' }}
        >
          <img
            src="/assets/images/image.png"
            alt="OUANTUM Platform capabilities hero visual representation"
            className="subpage-hero-image"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div className="overlay-gradient" aria-hidden="true"></div>
        </motion.div>
      </section>

      {/* Main Content Sections */}
      <div className="container" style={{ paddingTop: '5rem' }}>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.9rem',
            lineHeight: '1.8',
            color: 'rgba(255, 255, 255, 0.7)',
            display: 'flex',
            flexDirection: 'column',
            gap: '6rem',
          }}
        >
          {/* WHAT WE DO */}
          <section aria-label="What we do">
            <h2>
              What We Do
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-adieu)', color: '#fff', fontSize: '1.1rem', marginBottom: '1rem' }}>
                  Deterministic Quality Assurance
                </h3>
                <ScrollReveal style={{ color: 'rgba(255,255,255,0.75)' }}>
                  We replace slow, subjective, and error-prone manual structural auditing with real-time, deterministic, and compliance-guaranteed computational checks. The platform digitizes the complete workflow, from the initial raw non-destructive testing (NDT) readings to final government-standard compliance certification.
                </ScrollReveal>
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-adieu)', color: '#fff', fontSize: '1.1rem', marginBottom: '1rem' }}>
                  On-Site Civil Validation
                </h3>
                <ScrollReveal style={{ color: 'rgba(255,255,255,0.75)' }}>
                  OUANTUM demands rigorous input variables including structural age, curing cycles, cement grades, and exposure parameters. We prevent the submission of isolated, meaningless test metrics, ensuring every structural reading has the necessary context to determine true load-bearing strength and safety.
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* THE CAPABILITIES MATRIX */}
          <section aria-label="Capabilities grid">
            <h2>
              Capabilities Matrix
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {coreModules.map((module, i) => (
                <div key={i} style={{ minHeight: '340px' }}>
                  <GlowCard style={{ padding: '2.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                      <div>
                        <span style={{ fontSize: '0.7rem', color: '#b0b0b0', letterSpacing: '0.15em', display: 'block', marginBottom: '0.5rem' }}>
                          {module.subtitle}
                        </span>
                        <h3 style={{ fontFamily: 'var(--font-adieu)', color: '#fff', fontSize: '1.25rem', marginBottom: '1.25rem', marginTop: '0.5rem' }}>
                          {module.title}
                        </h3>
                        <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', lineHeight: '1.6' }}>
                          {module.description}
                        </p>
                      </div>
                      <Link
                        to={module.path}
                        style={{
                          fontFamily: 'var(--font-adieu)',
                          fontSize: '0.75rem',
                          color: '#fff',
                          textDecoration: 'none',
                          marginTop: '2rem',
                          display: 'inline-block',
                        }}
                      >
                        EXPLORE ENGINE →
                      </Link>
                    </div>
                  </GlowCard>
                </div>
              ))}
            </div>
          </section>

          {/* HOW IT WORKS */}
          <section aria-label="How it works workflow">
            <h2>
              How It Works
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontFamily: 'var(--font-adieu)', color: '#fff', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                  Field Data Capture
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.65)' }}>
                  Field testing data (such as Ultrasonic Pulse Velocity and Rebound Hammer numbers) is entered directly into the secure mobile portal. Geolocation, timestamps, and physical structural parameters are verified synchronously on-site.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontFamily: 'var(--font-adieu)', color: '#fff', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                  CONSENSUS & AUDITING
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.65)' }}>
                  Three decoupled AI models evaluate the data against IS 13311 and IS 516 standards. Any calculation, standard deviation variance, or contextual anomaly blocks auto-generation and requests active structural engineer review.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontFamily: 'var(--font-adieu)', color: '#fff', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                  COMPLIANCE REPORT GENERATION
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.65)' }}>
                  A secure, digital audit document is compiled automatically. Instantly ready in standardized layouts recognized by government entities (TNHB, PMAY, ADB), allowing immediate structural compliance sign-off.
                </p>
              </div>
            </div>
          </section>

          {/* WHAT WE CHANGE */}
          <section aria-label="What we change in the world">
            <h2
              style={{
                fontFamily: 'var(--font-adieu)',
                fontSize: '1.8rem',
                color: '#fff',
                marginBottom: '2rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                paddingBottom: '1rem',
              }}
            >
              What We Change In The World
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-adieu)', color: '#fff', fontSize: '1.1rem', marginBottom: '1.1rem' }}>
                  Eliminating Data Tampering & Transcriber Fraud
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.65)', marginBottom: '1.5rem' }}>
                  Traditionally, structural test readings are hand-written, easily manipulated, or incorrectly averaged to meet specifications. OUANTUM seals the audit loop. Data captured on-site is cryptographically secured, validated, and directly submitted.
                </p>
                <h3 style={{ fontFamily: 'var(--font-adieu)', color: '#fff', fontSize: '1.1rem', marginBottom: '1.1rem' }}>
                  Reducing Cycle Times From Weeks To Minutes
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.65)' }}>
                  Instead of waiting 7 to 14 days for a senior structural engineer to compile lab results, verify standard deviations, cross-reference tables, and write reports, civil authorities get same-day certified reports, drastically accelerating project development.
                </p>
              </div>

              <div>
                <h3 style={{ fontFamily: 'var(--font-adieu)', color: '#fff', fontSize: '1.1rem', marginBottom: '1.1rem' }}>
                  Democratizing Deterministic Verification
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.65)', marginBottom: '1.5rem' }}>
                  We empower municipalities, engineering consultants, housing boards, and contractors with access to deterministic structural health metrics. This structural transparency ensures safe infrastructure, preventing catastrophic structural failure and protecting lives.
                </p>
                <h3 style={{ fontFamily: 'var(--font-adieu)', color: '#fff', fontSize: '1.1rem', marginBottom: '1.1rem' }}>
                  Preserving Resources
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.65)' }}>
                  By estimating concrete service life, cover thickness safety, carbonation velocity, and steel corrosion risks early, we allow target rehabilitations instead of costly total structural rebuilds, saving billions in taxpayer funds.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Capabilities;
