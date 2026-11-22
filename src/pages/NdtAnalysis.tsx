import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight } from 'lucide-react';
import useSEO from '../hooks/useSEO';

const NdtAnalysis: React.FC = () => {
  const [selectedBatch, setSelectedBatch] = useState<number>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useSEO({
    title: 'NDT Analysis Engine 2.0 | OUANTUM Capabilities',
    description:
      'Automated Sonic Rebound (SonReb) concrete strength calculations, bivariate polynomial regression, and IS 13311 quality grading for civil infrastructure.',
    canonicalPath: '/capabilities/ndt-analysis-engine',
  });

  const batches = [
    {
      id: 'P-19',
      title: 'Metro Pier P-19',
      rebound: 38.4,
      velocity: 4.25,
      humidity: '78% (Coastal Saline)',
      aggregate: 'Tamil Nadu Black Granite',
      calculatedStrength: '41.2 MPa',
      grade: 'M40 Concrete',
      status: 'Excellent (IS 13311)',
      variance: '±6.8%',
      codeLog:
        '>> INGEST: Rebound Index (n=18, mean=38.4)\n>> INGEST: UPV Direct Path (L=450mm, T=105.8µs, V=4.25 km/s)\n>> CORRECTION: Saline humidity factor applied (α=0.96)\n>> SOLVE: f_c = 1.18 · (38.4)^0.81 · (4.25)^1.14\n>> RESULT: 41.2 MPa -> M40 PASSED (IS 456 Acceptance Validated)',
    },
    {
      id: 'G-14',
      title: 'Viaduct Girder G-14',
      rebound: 42.1,
      velocity: 4.48,
      humidity: '65% (Inland Semi-Arid)',
      aggregate: 'Crushed Deccan Basalt',
      calculatedStrength: '48.6 MPa',
      grade: 'M45 Concrete',
      status: 'Excellent (IS 13311)',
      variance: '±5.4%',
      codeLog:
        '>> INGEST: Rebound Index (n=20, mean=42.1)\n>> INGEST: UPV Direct Path (L=500mm, T=111.6µs, V=4.48 km/s)\n>> CORRECTION: Standard inland calibration curve\n>> SOLVE: f_c = 1.20 · (42.1)^0.80 · (4.48)^1.12\n>> RESULT: 48.6 MPa -> M45 PASSED (Zero Defect Verified)',
    },
    {
      id: 'T-08',
      title: 'Tunnel Lining Arch 08',
      rebound: 34.2,
      velocity: 3.92,
      humidity: '92% (Underground Saturated)',
      aggregate: 'Dolomitic Limestone',
      calculatedStrength: '32.8 MPa',
      grade: 'M35 Concrete',
      status: 'Good (IS 13311)',
      variance: '±8.2%',
      codeLog:
        '>> INGEST: Rebound Index (n=16, mean=34.2)\n>> INGEST: UPV Indirect Transmission (L=300mm, T=76.5µs, V=3.92 km/s)\n>> CORRECTION: High relative humidity moisture penalty applied\n>> SOLVE: f_c = 1.14 · (34.2)^0.82 · (3.92)^1.16\n>> RESULT: 32.8 MPa -> Target M35 (Borderline, Core verification recommended)',
    },
    {
      id: 'A-02',
      title: 'Abutment Wall A-02',
      rebound: 44.6,
      velocity: 4.62,
      humidity: '70% (Riverine Splash)',
      aggregate: 'Hard Quartzite Granite',
      calculatedStrength: '54.1 MPa',
      grade: 'M50 Concrete',
      status: 'Excellent (IS 13311)',
      variance: '±4.9%',
      codeLog:
        '>> INGEST: Rebound Index (n=24, mean=44.6)\n>> INGEST: UPV Direct Path (L=600mm, T=129.8µs, V=4.62 km/s)\n>> CORRECTION: Riverine bridge standard baseline\n>> SOLVE: f_c = 1.22 · (44.6)^0.79 · (4.62)^1.15\n>> RESULT: 54.1 MPa -> M50 PASSED (High durability compliant)',
    },
  ];

  const current = batches[selectedBatch];

  const subModels = [
    {
      index: '[ 1 ]',
      title: 'Bivariate Polynomial Solver',
      badge: 'NEW',
      badgeType: 'new' as const,
      image: '/assets/images/buildings/sub-buildings/sub-building-1.png',
      imageAlt: 'Concrete metro pier structural testing and bivariate polynomial calibration',
      description:
        'Computes in-situ compressive strength by synthesizing surface hardness and internal acoustic velocity through non-linear regression curves calibrated for regional Indian materials.',
      specs: [
        { id: '1.1', text: 'Dual-sensor synthesis formula: f_c = a · (Rebound)^b · (UPV)^c' },
        { id: '1.2', text: 'Reduces single-test testing variance from ±25% down to under ±8%' },
        { id: '1.3', text: 'Automatic Dixon-Q outlier rejection for anomalous impact angles' },
        { id: '1.4', text: 'Full mathematical transparency with direct coefficient traceability' },
      ],
    },
    {
      index: '[ 2 ]',
      title: 'Acoustic Pulse Tomographer',
      badge: 'PRODUCTION',
      badgeType: 'prod' as const,
      image: '/assets/images/buildings/sub-buildings/sub-building-2.png',
      imageAlt: 'Acoustic pulse tomography across post-tensioned viaduct bridge girder',
      description:
        'Ingests microsecond transit times across direct, indirect, and semi-direct transducer configurations. Evaluates wave attenuation to localize honeycombing, voiding, and delamination.',
      specs: [
        { id: '2.1', text: 'Digitizes transit times from 10 µs to 2000 µs at 0.1 µs resolution' },
        { id: '2.2', text: 'Automated path length geometry adjustment (direct vs surface transmission)' },
        { id: '2.3', text: 'Instant concrete quality grading under IS 13311 Part 1 Table 2' },
        { id: '2.4', text: 'Sub-millimeter crack depth estimation via diffracted wave arrival' },
      ],
    },
    {
      index: '[ 3 ]',
      title: 'Environmental & Salinity Calibrator',
      badge: 'PRODUCTION',
      badgeType: 'prod' as const,
      image: '/assets/images/buildings/sub-buildings/sub-building-3.png',
      imageAlt: 'Coastal marine viaduct subjected to environmental salinity calibration',
      description:
        'Compensates for the extreme moisture and temperature differentials characteristic of Indian infrastructure corridors, preventing false passes caused by surface carbonation crusts.',
      specs: [
        { id: '3.1', text: 'Monsoon relative humidity moisture penalty factors (α = 0.90 to 1.05)' },
        { id: '3.2', text: 'Detection and mathematical neutralization of carbonated outer surface crust' },
        { id: '3.3', text: 'Ambient thermal correction for bridge decks exceeding 40°C site conditions' },
        { id: '3.4', text: 'Pre-calibrated profiles for Tamil Nadu granite, Deccan basalt, and dolomites' },
      ],
    },
    {
      index: '[ 4 ]',
      title: 'Dynamic Elastic Modulus (E_d) Engine',
      badge: 'PRODUCTION',
      badgeType: 'prod' as const,
      image: '/assets/images/buildings/sub-buildings/sub-building-4.png',
      imageAlt: 'High-speed rail bridge span undergoing dynamic elasticity analysis',
      description:
        'Calculates structural stiffness and dynamic elasticity for prestressed viaducts and long-span highway bridges in accordance with IRC:112 and BS 1881.',
      specs: [
        { id: '4.1', text: 'Dynamic modulus solution: E_d = ρ · V² · (1+ν)(1-2ν) / (1-ν)' },
        { id: '4.2', text: 'Dynamic Poisson’s ratio verification within codified 0.20 to 0.24 bounds' },
        { id: '4.3', text: 'In-situ concrete density evaluation based on mix design documentation' },
        { id: '4.4', text: 'Structural stiffness classification for post-tensioned flyover spans' },
      ],
    },
  ];

  const benchmarks = [
    { value: '±8%', label: 'SonReb Precision', sub: 'vs ±25% single-test variance' },
    { value: 'IS 13311', label: 'Part 1 & 2 Norms', sub: 'Deterministic codal compliance' },
    { value: '0.02 mm', label: 'Crack Resolution', sub: 'Acoustic wave diffracted path' },
    { value: '0s Manual Lag', label: 'Live Telemetry', sub: 'Instant mobile calculation' },
  ];

  const faqs = [
    {
      q: 'How does the SonReb correlation algorithm calculate concrete strength?',
      a: 'The SonReb (Sonic-Rebound) method combines the Rebound Index (measuring outer surface hardness) and Ultrasonic Pulse Velocity (measuring internal core density) using bivariate polynomial regression formulas. This dual-sensor synthesis reduces single-test errors from ±25% down to under ±8%, fully compliant with IS 13311 and ASTM C597/C805 standards.',
    },
    {
      q: 'Why is rebound hammer testing alone insufficient for structural audits in India?',
      a: 'Standard rebound hammer tests (IS 13311 Part 2) only sample the outer 20-30mm surface layer. In coastal and tropical Indian climates (e.g. Chennai, Mumbai, Visakhapatnam), high humidity accelerates surface carbonation, creating an artificially hard crust that conceals lower internal density. Combining rebound with UPV guarantees internal voids, honeycombing, or weak matrix zones are accurately identified.',
    },
    {
      q: 'How are calibration constants customized for specific regional quarries?',
      a: 'The engine uses site-specific calibration curves derived from destructive core crushing tests under IS 516. When core samples are crushed in the laboratory, their load-deflection values tune polynomial coefficients (a, b, c) specifically for that aggregate quarry source.',
    },
    {
      q: 'What transit time correction is applied for indirect surface testing?',
      a: 'When concrete is accessible from only one face (e.g. retaining walls or tunnel linings), the engine applies indirect transmission path geometry factors, deducting surface wave transit offsets according to IS 13311 Part 1 guidelines.',
    },
  ];

  return (
    <main className="cxm-page" style={{ paddingTop: 0 }} aria-label="NDT Analysis Engine">
      <style>{`
        .cxm-page .ic-hero-section h1,
        .cxm-page .ic-hero-headline,
        .cxm-page .ic-hero-headline span {
          text-align: center !important;
          margin-left: auto !important;
          margin-right: auto !important;
          display: block !important;
          font-family: 'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
          font-weight: 400 !important;
          color: #111111 !important;
          letter-spacing: -0.03em !important;
          line-height: 1.05 !important;
          -webkit-text-fill-color: #111111 !important;
          -webkit-text-stroke: 0px transparent !important;
        }
      `}</style>

      {/* =========================================================================
          1. HERO SECTION (2-Column Layout matching Solution Detail)
          ========================================================================= */}
      <section
        style={{
          padding: 'clamp(48px, 6vw, 76px) 16px 40px',
          background: '#ffffff',
        }}
      >
        <div
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '40px',
            alignItems: 'center',
          }}
        >
          <div>
            <h1
              style={{
                fontSize: 'clamp(2.1rem, 3.8vw, 3.4rem)',
                fontWeight: 400,
                lineHeight: 1.12,
                color: '#111111',
                letterSpacing: '-0.025em',
                margin: '0 0 16px 0',
              }}
            >
              Deterministic SonReb AI for Non-Destructive Concrete Testing
            </h1>

            <p
              style={{
                fontSize: 'clamp(1rem, 1.25vw, 1.15rem)',
                lineHeight: 1.6,
                color: '#4b5563',
                margin: '0 0 28px 0',
              }}
            >
              Fuses ultrasonic pulse velocity (UPV) and rebound hammer telemetry through bivariate polynomial regression to calculate true in-situ compressive strength under IS 13311 &amp; ASTM standards.
            </p>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                alignItems: 'center',
              }}
            >
              <a
                href="#live-simulator"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '13px 26px',
                  borderRadius: 0,
                  background: '#111111',
                  color: '#ffffff',
                  fontSize: '0.925rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Test Live Model
                <ArrowRight size={16} />
              </a>
              <Link
                to="/contact?subject=NDT%20Engine%20Deployment"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '13px 24px',
                  borderRadius: 0,
                  background: '#ffffff',
                  color: '#111111',
                  border: '1px solid #111111',
                  fontSize: '0.925rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Schedule Site Demonstration
              </Link>
            </div>
          </div>

          {/* Hero Visual Card (Matching site card styling) */}
          <div
            style={{
              position: 'relative',
              borderRadius: 0,
              overflow: 'hidden',
              background: '#f4f3ec',
              aspectRatio: '16 / 10',
              border: '1px solid rgba(0, 0, 0, 0.08)',
            }}
          >
            <img
              src="/assets/images/buildings/building-1.png"
              alt="Concrete testing and SonReb non-destructive calibration"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>
        </div>
      </section>

      <div className="cxm-container" style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 16px' }}>
        {/* ── 2. Editorial Manifesto Narrative (Card with #f4f3ec, Sharp Corners) ── */}
        <section
          style={{
            background: '#f4f3ec',
            border: '1px solid rgba(0, 0, 0, 0.07)',
            borderRadius: 0,
            padding: 'clamp(36px, 5vw, 56px)',
            marginBottom: '48px',
          }}
          aria-label="Purpose-Built Statement"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div
              style={{
                fontSize: 'clamp(1.65rem, 3.2vw, 2.75rem)',
                lineHeight: 1.25,
                color: '#111111',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                marginBottom: '1.75rem',
              }}
            >
              Most NDT tools give isolated numbers on a display.{' '}
              <span
                style={{
                  backgroundColor: '#111111',
                  color: '#ffffff',
                  padding: '2px 10px',
                  borderRadius: 0,
                  fontWeight: 600,
                  display: 'inline-block',
                  margin: '0 4px',
                }}
              >
                SonReb AI
              </span>{' '}
              is built to be exceptional at one thing: calculating true compressive strength and internal homogeneity.
            </div>

            <p
              style={{
                fontSize: 'clamp(1.05rem, 1.6vw, 1.3rem)',
                lineHeight: 1.6,
                color: '#374151',
                marginBottom: '1.5rem',
                maxWidth: '1040px',
              }}
            >
              Built by our civil structural AI team and calibrated on millions of ultrasonic waveforms, rebound hammer indices, and core breaks across Indian infrastructure: fusing outer surface hardness with internal core density to eliminate false passes and compliance disputes.
            </p>

            <p
              style={{
                fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
                lineHeight: 1.6,
                color: '#6b7280',
                maxWidth: '1040px',
                margin: 0,
              }}
            >
              <span
                style={{
                  backgroundColor: '#111111',
                  color: '#ffffff',
                  padding: '2px 10px',
                  borderRadius: 0,
                  fontWeight: 600,
                  display: 'inline-block',
                  margin: '0 4px',
                }}
              >
                SonReb 2.0
              </span>{' '}
              reduces single-test variance from <strong style={{ color: '#111111' }}>±25% down to under ±8%</strong>, incorporates regional humidity and carbonation crust penalties, and delivers <strong style={{ color: '#111111' }}>same-day compliant audit dossiers</strong> for NHAI and metro rail authorities.
            </p>
          </motion.div>
        </section>

        {/* ── 3. Model Suite Architecture Breakdown (Cards with #f4f3ec, Sharp Corners, Building Images) ── */}
        <section style={{ marginBottom: '56px' }} aria-label="NDT Engine Architecture">
          <div style={{ marginBottom: '32px' }}>
            <h2
              style={{
                fontSize: 'clamp(2rem, 3.6vw, 2.8rem)',
                fontWeight: 400,
                color: '#111111',
                lineHeight: 1.15,
                margin: 0,
              }}
            >
              Introducing the SonReb 2.0 Sub-Model Suite
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '56px' }}>
            {subModels.map((model) => (
              <motion.div
                key={model.title}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '40px',
                  alignItems: 'center',
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {/* Left Side: Title and Building Image */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h3
                    style={{
                      fontSize: 'clamp(1.4rem, 2.2vw, 1.85rem)',
                      fontWeight: 500,
                      color: '#111111',
                      letterSpacing: '-0.015em',
                      margin: '0 0 16px 0',
                    }}
                  >
                    {model.title}
                  </h3>

                  {/* Building Image with Sharp Corners */}
                  <div
                    style={{
                      width: '100%',
                      height: '240px',
                      borderRadius: 0,
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={model.image}
                      alt={model.imageAlt}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        borderRadius: 0,
                      }}
                    />
                  </div>
                </div>

                {/* Right Side: Description and Specifications without divided lines */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <p
                    style={{
                      fontSize: '1.025rem',
                      lineHeight: 1.65,
                      color: '#374151',
                      margin: '0 0 24px 0',
                    }}
                  >
                    {model.description}
                  </p>

                  <div
                    style={{
                      fontSize: '0.75rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: '#111111',
                      fontWeight: 700,
                      marginBottom: '12px',
                    }}
                  >
                    SPECIFICATION
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {model.specs.map((spec, sIdx) => (
                      <div
                        key={sIdx}
                        style={{
                          display: 'flex',
                          gap: '12px',
                          alignItems: 'baseline',
                          padding: '4px 0',
                          fontSize: '0.925rem',
                          lineHeight: 1.5,
                          color: '#374151',
                        }}
                      >
                        <span
                          style={{
                            width: '5px',
                            height: '5px',
                            borderRadius: '50%',
                            backgroundColor: '#111111',
                            display: 'inline-block',
                            flexShrink: 0,
                            transform: 'translateY(-2px)',
                          }}
                        />
                        <span>{spec.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── 4. Interactive Live Batch Simulation Sandbox (Card with #f4f3ec, Sharp Corners) ── */}
        <section
          id="live-simulator"
          style={{
            background: '#f4f3ec',
            border: '1px solid rgba(0, 0, 0, 0.07)',
            borderRadius: 0,
            padding: 'clamp(32px, 5vw, 48px)',
            marginBottom: '48px',
          }}
          aria-label="Interactive Simulator"
        >
          <div style={{ marginBottom: '2rem' }}>
            <div
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#111111',
                fontWeight: 700,
                marginBottom: '8px',
              }}
            >
              INTERACTIVE MODEL EXECUTION
            </div>
            <h2
              style={{
                fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)',
                fontWeight: 400,
                color: '#111111',
                lineHeight: 1.15,
                margin: 0,
              }}
            >
              Live Telemetry &amp; SonReb Calculation Sandbox
            </h2>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '2rem' }}>
            {batches.map((batch, idx) => (
              <button
                key={batch.id}
                type="button"
                style={{
                  background: selectedBatch === idx ? '#111111' : '#ffffff',
                  color: selectedBatch === idx ? '#ffffff' : '#111111',
                  border: '1px solid rgba(0, 0, 0, 0.12)',
                  borderRadius: 0,
                  padding: '10px 18px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.18s ease',
                }}
                onClick={() => setSelectedBatch(idx)}
              >
                {batch.title}
              </button>
            ))}
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px',
              marginBottom: '2rem',
            }}
          >
            <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: 0, border: '1px solid rgba(0, 0, 0, 0.08)' }}>
              <div style={{ fontSize: '0.75rem', color: '#6a7282', textTransform: 'uppercase', fontWeight: 600 }}>
                Rebound Index (R)
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#111111', marginTop: '4px' }}>
                {current.rebound}
              </div>
            </div>

            <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: 0, border: '1px solid rgba(0, 0, 0, 0.08)' }}>
              <div style={{ fontSize: '0.75rem', color: '#6a7282', textTransform: 'uppercase', fontWeight: 600 }}>
                Pulse Velocity (V)
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#111111', marginTop: '4px' }}>
                {current.velocity} km/s
              </div>
            </div>

            <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: 0, border: '1px solid rgba(0, 0, 0, 0.08)' }}>
              <div style={{ fontSize: '0.75rem', color: '#6a7282', textTransform: 'uppercase', fontWeight: 600 }}>
                Computed Strength (f_c)
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#008138', marginTop: '4px' }}>
                {current.calculatedStrength}
              </div>
            </div>

            <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: 0, border: '1px solid rgba(0, 0, 0, 0.08)' }}>
              <div style={{ fontSize: '0.75rem', color: '#6a7282', textTransform: 'uppercase', fontWeight: 600 }}>
                Target Grade &amp; Status
              </div>
              <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#111111', marginTop: '8px' }}>
                {current.grade} ({current.status})
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: '#111111',
              color: '#d1d5dc',
              borderRadius: 0,
              padding: '1.75rem',
              fontSize: '0.85rem',
              lineHeight: 1.6,
              overflowX: 'auto',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{current.codeLog}</pre>
          </div>
        </section>

        {/* ── 5. Technical Benchmarks Strip (Cards with #f4f3ec, Sharp Corners) ── */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px',
            marginBottom: '48px',
          }}
          aria-label="NDT Benchmarks"
        >
          {benchmarks.map((b, idx) => (
            <motion.div
              key={idx}
              style={{
                background: '#f4f3ec',
                border: '1px solid rgba(0, 0, 0, 0.07)',
                borderRadius: 0,
                padding: '24px 22px',
                display: 'flex',
                flexDirection: 'column',
              }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <div
                style={{
                  fontSize: 'clamp(2rem, 3.2vw, 2.75rem)',
                  fontWeight: 700,
                  color: '#111111',
                  lineHeight: 1.1,
                  marginBottom: '6px',
                }}
              >
                {b.value}
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#111111', marginBottom: '4px' }}>
                {b.label}
              </div>
              <div style={{ fontSize: '0.825rem', color: '#6a7282' }}>{b.sub}</div>
            </motion.div>
          ))}
        </section>

        {/* ── 6. Technical FAQ Accordion (Cards with #f4f3ec, Sharp Corners) ── */}
        <section style={{ marginBottom: '60px' }} aria-label="NDT FAQs">
          <div style={{ marginBottom: '2rem' }}>
            <div
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#111111',
                fontWeight: 700,
                marginBottom: '8px',
              }}
            >
              ENGINEERING SPECIFICATIONS &amp; NDT METHODOLOGY
            </div>
            <h2
              style={{
                fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)',
                fontWeight: 400,
                color: '#111111',
                lineHeight: 1.15,
                margin: 0,
              }}
            >
              Frequently Asked Questions
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                style={{
                  background: '#f4f3ec',
                  border: '1px solid rgba(0, 0, 0, 0.07)',
                  borderRadius: 0,
                  overflow: 'hidden',
                }}
              >
                <button
                  type="button"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    background: '#f4f3ec',
                    border: 'none',
                    borderRadius: 0,
                    textAlign: 'left',
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    color: '#111111',
                    cursor: 'pointer',
                    padding: '20px 24px',
                    gap: '16px',
                  }}
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  aria-expanded={openFaq === idx}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={18}
                    style={{
                      transform: openFaq === idx ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.25s ease',
                      flexShrink: 0,
                    }}
                  />
                </button>
                {openFaq === idx && (
                  <div
                    style={{
                      padding: '0 24px 22px 24px',
                      fontSize: '0.95rem',
                      lineHeight: 1.65,
                      color: '#4a5565',
                    }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default NdtAnalysis;
