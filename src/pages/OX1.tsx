import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import useSEO from '../hooks/useSEO';
import GlowCard from '../components/GlowCard';



const TECHNICAL_SPECIFICATIONS = [
  {
    category: 'NDT & SENSOR INGESTION MODALITIES',
    specs: [
      { key: 'Acoustic & Impact Testing', value: 'Ultrasonic Pulse Velocity (UPV) · Impact-Echo · Acoustic Emission' },
      { key: 'Electromagnetic & Radar', value: 'Ground Penetrating Radar (GPR) · Electrical / Surface Resistivity' },
      { key: 'Corrosion & Surface Evaluation', value: 'Half-Cell Potential · Rebound Hammer · Infrared Thermography' },
      { key: 'Spatial & Remote Sensing', value: 'High-Density LiDAR · Drone Photogrammetry · Visual Inspection' },
    ],
  },
  {
    category: 'BIM & SPATIAL DIGITAL TWIN',
    specs: [
      { key: 'Model Interoperability', value: 'OpenBIM IFC (2x3, 4) · Autodesk Revit (RVT) · 2D DWG / DXF' },
      { key: 'Spatial Contextualization', value: 'Element-level test point alignment on structural 3D geometry' },
      { key: 'Digital Thread Continuity', value: 'Physical Asset → Digital Model → Engineering Data → Intelligence' },
      { key: 'Inspection History', value: 'Time-series telemetry linked directly to BIM building elements' },
    ],
  },
  {
    category: 'QA/QC & COMPLIANCE MATRIX',
    specs: [
      { key: 'Non-Destructive Norms', value: 'IS 13311 (Part 1 & 2) · ASTM C597 / C805 · BS EN 12504' },
      { key: 'Structural Baselines', value: 'IS 456:2000 Plain and Reinforced Concrete Guidelines' },
      { key: 'Durability Specifications', value: 'SP 34 Detailing · IRC:112 Concrete Road & Bridge Codes' },
      { key: 'Quality Workflows', value: 'Non-conformity tracking · Photo evidence logs · Verified signoffs' },
    ],
  },
  {
    category: 'AI & PLATFORM ECOSYSTEM',
    specs: [
      { key: 'Intelligence Engine', value: 'Cross-source reasoning · Pattern detection · Anomaly identification' },
      { key: 'Document Intelligence', value: 'Automated test extraction · Standards mapping · Structured reports' },
      { key: 'Two-Tier Architecture', value: 'Platform Foundation (Orgs/Users/Devices) + Project Execution Layer' },
      { key: 'Field Operations', value: 'Full offline telemetry buffer with zero-knowledge cloud synchronization' },
    ],
  },
];

const OX1: React.FC = () => {
  const [hoveredModuleIdx, setHoveredModuleIdx] = useState<number | null>(null);

  // ── ARCHITECTURE MODULES CONFIGURATION (Scale, X-axis, Y-axis for Laptop & Mascot) ──
  const architectureModules = [
    {
      id: '01',
      title: 'Infrastructure Telemetry',
      category: 'EDGE SENSING & IOT',
      description: 'Continuous ingestion of UPV, rebound index, and structural telemetry directly from field hardware.',
      laptop: '/assets/images/logo/ouantum-arch-2.png',
      // Desktop Laptop image scale, x-axis, y-axis (fixed position - no hover movement)
      laptopScale: 1.40,
      laptopX: 0, // in pixels
      laptopY: 0, // in pixels

      // Mobile Laptop image scale, x-axis, y-axis
      laptopScaleMobile: 1.10,
      laptopXMobile: 0, // in pixels
      laptopYMobile: 0, // in pixels

      // Desktop Mascot image scale, x-axis, y-axis & rotation (active hover effect)
      mascot: '/assets/images/logo/ouantum-mascot.png',
      mascotScale: 2.20,
      mascotX: -100, // in pixels
      mascotY: 120, // in pixels
      mascotRotate: -30, // in degrees
      mascotHoverScale: 2.30,
      mascotHoverX: -145, // in pixels
      mascotHoverY: 120, // in pixels
      mascotHoverRotate: -30, // in degrees

      // Mobile Mascot image scale, x-axis, y-axis & rotation
      mascotScaleMobile: 1.70,
      mascotXMobile: -60, // in pixels
      mascotYMobile: 100, // in pixels
      mascotRotateMobile: -30, // in degrees
      mascotHoverScaleMobile: 1.70,
      mascotHoverXMobile: -100, // in pixels
      mascotHoverYMobile: 100, // in pixels
      mascotHoverRotateMobile: -30, // in degrees
    },
    {
      id: '02',
      title: 'Integrated Architecture',
      category: 'DIGITAL TWIN & BIM',
      description: 'Spatial 3D digital twin reconciling physical sensor coordinates with structural design geometry.',
      laptop: '/assets/images/logo/ouantum-arch-1.png',
      // Desktop Laptop image scale, x-axis, y-axis (fixed position - no hover movement)
      laptopScale: 1.40,
      laptopX: 0, // in pixels
      laptopY: 3, // in pixels

      // Mobile Laptop image scale, x-axis, y-axis
      laptopScaleMobile: 1.10,
      laptopXMobile: 0, // in pixels
      laptopYMobile: 3, // in pixels

      // Desktop Mascot image scale, x-axis, y-axis & rotation (active hover effect)
      mascot: '/assets/images/logo/ouantum-mascot-3.png',
      mascotScale: 2.20,
      mascotX: 0, // in pixels
      mascotY: 100, // in pixels
      mascotRotate: 0, // in degrees
      mascotHoverScale: 2.20,
      mascotHoverX: 0, // in pixels
      mascotHoverY: 10, // in pixels
      mascotHoverRotate: 0, // in degrees

      // Mobile Mascot image scale, x-axis, y-axis & rotation
      mascotScaleMobile: 1.70,
      mascotXMobile: 0, // in pixels
      mascotYMobile: 90, // in pixels
      mascotRotateMobile: 0, // in degrees
      mascotHoverScaleMobile: 1.70,
      mascotHoverXMobile: 0, // in pixels
      mascotHoverYMobile: 40, // in pixels
      mascotHoverRotateMobile: 0, // in degrees
    },
    {
      id: '03',
      title: 'Operations & Analytics',
      category: 'QA/QC & COMPLIANCE',
      description: 'Deterministic IS 13311 & ASTM SonReb rule verification with tamper-proof cryptographic audit seals.',
      laptop: '/assets/images/logo/ouantum-arch-3.png',
      // Desktop Laptop image scale, x-axis, y-axis (fixed position - no hover movement)
      laptopScale: 1.35,
      laptopX: 0, // in pixels
      laptopY: 0, // in pixels

      // Mobile Laptop image scale, x-axis, y-axis
      laptopScaleMobile: 1.10,
      laptopXMobile: 0, // in pixels
      laptopYMobile: 0, // in pixels

      // Desktop Mascot image scale, x-axis, y-axis & rotation (active hover effect)
      mascot: '/assets/images/logo/ouantum-mascot-2.png',
      mascotScale: 2.20,
      mascotX: 80, // in pixels
      mascotY: 120, // in pixels
      mascotRotate: 30, // in degrees
      mascotHoverScale: 2.20,
      mascotHoverX: 140, // in pixels
      mascotHoverY: 120, // in pixels
      mascotHoverRotate: 30, // in degrees

      // Mobile Mascot image scale, x-axis, y-axis & rotation
      mascotScaleMobile: 1.65,
      mascotXMobile: 60, // in pixels
      mascotYMobile: 100, // in pixels
      mascotRotateMobile: 30, // in degrees
      mascotHoverScaleMobile: 1.65,
      mascotHoverXMobile: 95, // in pixels
      mascotHoverYMobile: 100, // in pixels
      mascotHoverRotateMobile: 40, // in degrees
    },
  ];

  // Hero Background Image configuration (Scale, X-axis, and Y-axis positioning)
  const heroImageScaleDesktop = 1.0;
  const heroImageXDesktop = 0; // in pixels
  const heroImageYDesktop = 0; // in pixels

  const heroImageScaleMobile = 1.0;
  const heroImageXMobile = 0; // in pixels
  const heroImageYMobile = 0; // in pixels

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  // Preload all images for instant 0ms rendering
  useEffect(() => {
    [
      '/assets/images/logo/Pitch Deck (1) (1).pptx (7).png',
      '/assets/images/logo/ouantum-mascot.png',
      '/assets/images/logo/ouantum-mascot-2.png',
      '/assets/images/logo/ouantum-mascot-3.png',
      '/assets/images/logo/ouantum-arch-1.png',
      '/assets/images/logo/ouantum-arch-2.png',
      '/assets/images/logo/ouantum-arch-3.png',
    ].forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useSEO({
    title: 'OX1 | Ouantum',
    description:
      'OX1 is OUANTUM’s flagship autonomous hardware & AI intelligence unit for deterministic civil infrastructure non-destructive testing and instant certified compliance.',
    canonicalPath: '/ox1',
  });

  return (
    <main
      className="subpage-wrapper"
      style={{
        background: '#000000',
        color: '#ffffff',
        minHeight: '100vh',
        fontFamily: 'var(--font-main)',
        paddingBottom: '120px',
        overflowX: 'hidden',
      }}
    >
      {/* ── HERO SECTION ── */}
      <section
        className="hero"
        aria-label="OX1 Overview"
        style={{
          minHeight: isMobile ? 'auto' : '75vh',
          paddingTop: isMobile ? '80px' : '130px',
          paddingBottom: isMobile ? '2.5rem' : '4rem',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'stretch' : 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* On Mobile: Hero Visual displayed on top, fully visible (no blur needed) */}
        {isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            style={{
              position: 'relative',
              width: '100%',
              height: '50vh',
              minHeight: '320px',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <motion.img
              src="/assets/images/logo/Pitch Deck (1) (1).pptx (7).png"
              alt="OX1 Infrastructure Intelligence Platform Hero"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'center center',
                transform: `scale(${heroImageScaleMobile}) translate(${heroImageXMobile}px, ${heroImageYMobile}px)`,
                transformOrigin: 'center center',
                display: 'block',
              }}
            />
          </motion.div>
        )}

        {/* Wordings Content (Placed below hero visual in mobile view, on the left in desktop view) */}
        <div
          className="container hero-content"
          style={{
            position: 'relative',
            zIndex: 10,
            paddingTop: isMobile ? '1rem' : undefined,
          }}
        >
          <div
            style={{
              maxWidth: '820px',
            }}
          >
            {/* Left Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1
                style={{
                  fontFamily: 'var(--font-geist)',
                  fontWeight: 200,
                  fontSize: 'clamp(3.5rem, 9vw, 8rem)',
                  lineHeight: 0.9,
                  letterSpacing: '-0.02em',
                  color: '#ffffff',
                  margin: '0 0 1rem 0',
                }}
              >
                OX1
              </h1>

              <div
                style={{
                  fontFamily: 'var(--font-adieu)',
                  fontSize: '0.85rem',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: '#ffffff',
                  marginBottom: '1rem',
                  opacity: 0.9,
                }}
              >
                From raw engineering data to decision-ready intelligence.
              </div>

              <p
                style={{
                  fontFamily: 'var(--font-main)',
                  fontSize: '0.96rem',
                  lineHeight: 1.7,
                  color: 'rgba(255, 255, 255, 0.55)',
                  maxWidth: '520px',
                  marginBottom: '2.5rem',
                }}
              >
                Unifying NDT testing, inspection data, structured QA/QC workflows, and 3D BIM into one continuous digital thread.
              </p>

              {/* CTAs */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  alignItems: 'center',
                }}
              >
                <Link
                  to="/contact?subject=OX1%20Pilot%20Deployment"
                  style={{
                    fontFamily: 'var(--font-adieu)',
                    fontSize: '0.78rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    backgroundColor: '#ffffff',
                    color: '#000000',
                    padding: '14px 28px',
                    borderRadius: '30px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.85)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#ffffff';
                  }}
                >
                  REQUEST FIELD DEMO
                </Link>

                <a
                  href="#specifications"
                  style={{
                    fontFamily: 'var(--font-adieu)',
                    fontSize: '0.78rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    backgroundColor: 'transparent',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    padding: '14px 26px',
                    borderRadius: '30px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = '#ffffff';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  VIEW FULL SPECS
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Desktop Hero Background Image (no blur needed) */}
        {!isMobile && (
          <motion.div
            className="hero-image-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              width: '100%',
              height: '100%',
              minHeight: '75vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              pointerEvents: 'none',
              zIndex: 5,
              overflow: 'hidden',
            }}
          >
            <motion.img
              src="/assets/images/logo/Pitch Deck (1) (1).pptx (7).png"
              alt="OX1 Infrastructure Intelligence Platform Hero"
              style={{
                width: '58%',
                maxWidth: '920px',
                height: 'auto',
                maxHeight: '92%',
                objectFit: 'contain',
                objectPosition: 'center center',
                transform: `scale(${heroImageScaleDesktop}) translate(${heroImageXDesktop}px, ${heroImageYDesktop}px)`,
                transformOrigin: 'center center',
                display: 'block',
                marginRight: '3%',
              }}
            />
          </motion.div>
        )}
      </section>

      {/* Main Content Sections */}
      <div className="container" style={{ paddingTop: '5rem' }}>

        {/* ── KEY PERFORMANCE METRICS ── */}
        <section
          aria-label="OX1 Performance Metrics"
          style={{
            paddingBottom: '6rem',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {[
              {
                stat: '100%',
                label: 'Deterministic Compliance',
                desc: 'Zero black-box approximations. Pure codified standards.',
              },
              {
                stat: '0.02 mm',
                label: 'Surface Optical Precision',
                desc: 'Sub-millimeter crack depth and boundary resolution.',
              },
              {
                stat: '< 2.4 s',
                label: 'Certified Dispatch',
                desc: 'Instant verified PDF audit delivery to stakeholders.',
              },
              {
                stat: '0%',
                label: 'Transcription Fraud',
                desc: 'Cryptographic SHA-256 seal prevents field tampering.',
              },
            ].map((metric, i) => (
              <GlowCard
                key={i}
                style={{
                  padding: '2.25rem 1.75rem',
                }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-geist)',
                      fontWeight: 200,
                      fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                      lineHeight: 1,
                      color: '#ffffff',
                      marginBottom: '0.75rem',
                    }}
                  >
                    {metric.stat}
                  </h3>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'rgba(255, 255, 255, 0.75)',
                      display: 'block',
                      marginBottom: '0.75rem',
                    }}
                  >
                    {metric.label}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-main)',
                    fontSize: '0.85rem',
                    lineHeight: 1.6,
                    color: 'rgba(255, 255, 255, 0.45)',
                    margin: 0,
                  }}
                >
                  {metric.desc}
                </p>
              </GlowCard>
            ))}
          </div>
        </section>

        {/* ── THE DIGITAL THREAD ── */}
        <section
          aria-label="The Continuous Digital Thread"
          style={{
            paddingBottom: '7rem',
          }}
        >
          <div style={{ marginBottom: '3.5rem' }}>
            <h2
              className="section-title"
              style={{
                fontFamily: 'var(--font-geist)',
                fontWeight: 200,
                color: '#ffffff',
                marginBottom: '1rem',
              }}
            >
              The OX1 Approach
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-main)',
                fontSize: '1rem',
                lineHeight: 1.7,
                color: 'rgba(255, 255, 255, 0.55)',
                maxWidth: '720px',
                margin: 0,
              }}
            >
              A unified digital thread replacing fragmented engineering silos:{' '}
              <strong style={{ color: '#ffffff', fontWeight: 500 }}>
                Collect → Connect → Contextualize → Understand → Act.
              </strong>
            </p>
          </div>

          {/* Stepper Pipeline Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {[
              {
                step: '01',
                title: 'Collect',
                desc: 'Multi-sensor ingestion from UPV, Rebound Hammer, GPR, and resistivity on-site.',
              },
              {
                step: '02',
                title: 'Connect',
                desc: 'Unifies field data into a verified project record with operator, device, and timestamp IDs.',
              },
              {
                step: '03',
                title: 'Contextualize',
                desc: 'Anchors test coordinates directly onto 2D drawings and 3D BIM structural elements.',
              },
              {
                step: '04',
                title: 'Understand',
                desc: 'Deterministic SonReb correlation and AI pattern analysis for structural degradation.',
              },
              {
                step: '05',
                title: 'Act',
                desc: 'Instant certified audit generation and automated non-conformity dispatch.',
              },
            ].map((item, idx) => (
              <GlowCard
                key={idx}
                style={{
                  padding: '2rem 1.5rem',
                }}
              >
                <div>
                  <div
                    style={{
                      marginBottom: '1.5rem',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        letterSpacing: '0.12em',
                        color: 'rgba(255, 255, 255, 0.4)',
                      }}
                    >
                      PHASE {item.step}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-geist)',
                      fontWeight: 300,
                      fontSize: '1.45rem',
                      color: '#ffffff',
                      marginBottom: '0.75rem',
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-main)',
                      fontSize: '0.85rem',
                      lineHeight: 1.6,
                      color: 'rgba(255, 255, 255, 0.45)',
                      margin: 0,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              </GlowCard>
            ))}
          </div>
        </section>

        {/* ── INTERACTIVE MODULE EXPLORER ── */}
        <section
          aria-label="OX1 System Modules"
          style={{
            paddingBottom: '7rem',
          }}
        >
          <div style={{ marginBottom: '3.5rem' }}>
            <h2
              className="section-title"
              style={{
                fontFamily: 'var(--font-geist)',
                fontWeight: 200,
                color: '#ffffff',
                marginBottom: '0',
              }}
            >
              Integrated Architecture
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem',
            }}
          >
            {architectureModules.map((mod, idx) => {
              const isHovered = hoveredModuleIdx === idx;
              return (
                <GlowCard
                  key={mod.id}
                  disableHoverMotion={true}
                  style={{
                    padding: '2.5rem 2rem 2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '520px',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={() => setHoveredModuleIdx(idx)}
                  onMouseLeave={() => setHoveredModuleIdx(null)}
                >
                  {/* Top Header & Content */}
                  <div style={{ position: 'relative', zIndex: 3 }}>



                    <h3
                      style={{
                        fontFamily: 'var(--font-geist)',
                        fontWeight: 300,
                        fontSize: '1.65rem',
                        color: '#ffffff',
                        marginBottom: '0.75rem',
                        lineHeight: 1.2,
                      }}
                    >
                      {mod.title}
                    </h3>

                    <p
                      style={{
                        fontFamily: 'var(--font-main)',
                        fontSize: '0.86rem',
                        lineHeight: 1.6,
                        color: 'rgba(255, 255, 255, 0.45)',
                        margin: 0,
                      }}
                    >
                      {mod.description}
                    </p>
                  </div>

                  {/* Visual Stage: Mascot Behind + Laptop in Front */}
                  <div
                    style={{
                      position: 'relative',
                      height: '240px',
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: '2rem',
                      overflow: 'visible',
                    }}
                  >
                    {/* Mascot & Laptop Visual Stage with Mobile/Desktop responsiveness */}
                    {(() => {
                      const curLaptopScale = isMobile ? mod.laptopScaleMobile : mod.laptopScale;
                      const curLaptopX = isMobile ? mod.laptopXMobile : mod.laptopX;
                      const curLaptopY = isMobile ? mod.laptopYMobile : mod.laptopY;

                      const curMascotScale = isMobile ? mod.mascotScaleMobile : mod.mascotScale;
                      const curMascotX = isMobile ? mod.mascotXMobile : mod.mascotX;
                      const curMascotY = isMobile ? mod.mascotYMobile : mod.mascotY;
                      const curMascotRotate = isMobile ? mod.mascotRotateMobile : mod.mascotRotate;

                      const curMascotHoverScale = isMobile ? mod.mascotHoverScaleMobile : mod.mascotHoverScale;
                      const curMascotHoverX = isMobile ? mod.mascotHoverXMobile : mod.mascotHoverX;
                      const curMascotHoverY = isMobile ? mod.mascotHoverYMobile : mod.mascotHoverY;
                      const curMascotHoverRotate = isMobile ? mod.mascotHoverRotateMobile : mod.mascotHoverRotate;

                      return (
                        <>
                          {/* Mascot */}
                          <img
                            src={mod.mascot}
                            alt={`${mod.title} Mascot`}
                            loading="eager"
                            style={{
                              position: 'absolute',
                              top: '-15px',
                              width: '130px',
                              height: 'auto',
                              objectFit: 'contain',
                              transform: isHovered
                                ? `translate(${curMascotHoverX}px, ${curMascotHoverY}px) scale(${curMascotHoverScale}) rotate(${curMascotHoverRotate}deg)`
                                : `translate(${curMascotX}px, ${curMascotY}px) scale(${curMascotScale}) rotate(${curMascotRotate}deg)`,
                              transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                              zIndex: 1,
                              pointerEvents: 'none',
                            }}
                          />

                          {/* Laptop Screen */}
                          <img
                            src={mod.laptop}
                            alt={mod.title}
                            loading="eager"
                            style={{
                              position: 'relative',
                              zIndex: 2,
                              width: '100%',
                              maxWidth: '300px',
                              height: 'auto',
                              objectFit: 'contain',
                              transform: `translate(${curLaptopX}px, ${curLaptopY}px) scale(${curLaptopScale})`,
                              pointerEvents: 'none',
                            }}
                          />
                        </>
                      );
                    })()}
                  </div>
                </GlowCard>
              );
            })}
          </div>

          {/* Two-Tier Architecture Ecosystem (Platform vs Project Layer) */}
          <div
            style={{
              marginTop: '3.5rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem',
            }}
          >
            {/* Platform Layer */}
            <GlowCard
              style={{
                padding: '2.5rem 2rem',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-geist)',
                    fontWeight: 300,
                    fontSize: '1.75rem',
                    color: '#ffffff',
                    margin: 0,
                  }}
                >
                  Platform Ecosystem
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-main)',
                    fontSize: '0.9rem',
                    lineHeight: 1.6,
                    color: 'rgba(255, 255, 255, 0.5)',
                    margin: 0,
                  }}
                >
                  Enterprise administration, zero-trust governance, and cross-project fleet oversight.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {[
                    'Multi-tenant organization & workspace hierarchy',
                    'Granular RBAC (Admin, Engineer, Auditor, Client)',
                    'Hardware edge fleet provisioning & telemetry',
                    'Cryptographic SHA-256 tamper-proof audit trail',
                    'Enterprise compliance archives & analytics',
                  ].map((feature, fIdx) => (
                    <div key={fIdx} style={{ display: 'flex', alignItems: 'center' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-main)',
                          fontSize: '0.86rem',
                          color: 'rgba(255, 255, 255, 0.8)',
                        }}
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </GlowCard>

            {/* Project Layer */}
            <GlowCard
              style={{
                padding: '2.5rem 2rem',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-geist)',
                    fontWeight: 300,
                    fontSize: '1.75rem',
                    color: '#ffffff',
                    margin: 0,
                  }}
                >
                  Project Execution Hub
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-main)',
                    fontSize: '0.9rem',
                    lineHeight: 1.6,
                    color: 'rgba(255, 255, 255, 0.5)',
                    margin: 0,
                  }}
                >
                  Live field cockpit fusing inspection data, BIM coordinates, and QA/QC workflows.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {[
                    'Live NDT ingestion (Rebound Hammer, UPV, GPR)',
                    '2D blueprint & 3D BIM spatial alignment',
                    'Structured QA/QC observation & punchlist loops',
                    'Deterministic IS 13311 & ASTM SonReb engine',
                    'Instant certified PDF dispatch & client portal sync',
                  ].map((feature, fIdx) => (
                    <div key={fIdx} style={{ display: 'flex', alignItems: 'center' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-main)',
                          fontSize: '0.86rem',
                          color: 'rgba(255, 255, 255, 0.8)',
                        }}
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </GlowCard>
          </div>
        </section>

        {/* ── BUILT FOR INFRASTRUCTURE ── */}
        <section
          aria-label="Connected Engineering Disciplines"
          style={{
            paddingBottom: '7rem',
          }}
        >
          <div style={{ marginBottom: '3.5rem' }}>
            <h2
              className="section-title"
              style={{
                fontFamily: 'var(--font-geist)',
                fontWeight: 200,
                color: '#ffffff',
                marginBottom: '1rem',
              }}
            >
              Built for Infrastructure
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-main)',
                fontSize: '1rem',
                lineHeight: 1.7,
                color: 'rgba(255, 255, 255, 0.55)',
                maxWidth: '740px',
                margin: 0,
              }}
            >
              Unifying multi-method testing, 3D spatial models, and quality records into one interoperable environment.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
            }}
          >
            {[
              {
                title: 'NDT & Sensor Ingestion',
                desc: 'Direct multi-sensor ingestion across UPV, Rebound Hammer, GPR, Impact-Echo, Half-Cell, and Resistivity.',
                points: ['Calibrated SonReb correlation', 'Deterministic IS/ASTM standard mapping', 'Offline edge buffer (20,000+ readings)'],
              },
              {
                title: 'BIM as Project Context',
                desc: 'Anchors test coordinates, sensor arrays, and inspection photos directly onto 2D CAD and 3D BIM elements.',
                points: ['Physical to digital twin alignment', 'Element-level inspection history', 'Sub-millimeter spatial coordinate precision'],
              },
              {
                title: 'Structured QA/QC Workflows',
                desc: 'Replaces paper checklists with structured, evidence-backed digital observation and signoff workflows.',
                points: ['Geotagged photographic evidence', 'Closed-loop corrective action tracking', 'Automated compliance exports'],
              },
              {
                title: 'AI Intelligence Layer',
                desc: 'Ambient intelligence for cross-source reasoning, defect pattern detection, and document extraction.',
                points: ['Deterministic standards validation', 'Cross-source historical comparison', 'Predictive degradation models'],
              },
            ].map((card, cIdx) => (
              <GlowCard
                key={cIdx}
                style={{
                  padding: '2.5rem 2rem',
                }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-geist)',
                      fontWeight: 300,
                      fontSize: '1.5rem',
                      color: '#ffffff',
                      marginBottom: '1rem',
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-main)',
                      fontSize: '0.88rem',
                      lineHeight: 1.65,
                      color: 'rgba(255, 255, 255, 0.5)',
                      marginBottom: '1.75rem',
                    }}
                  >
                    {card.desc}
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '1.25rem' }}>
                  {card.points.map((pt, pIdx) => (
                    <div key={pIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.6)' }} />
                      <span
                        style={{
                          fontFamily: 'var(--font-main)',
                          fontSize: '0.8rem',
                          color: 'rgba(255, 255, 255, 0.75)',
                        }}
                      >
                        {pt}
                      </span>
                    </div>
                  ))}
                </div>
              </GlowCard>
            ))}
          </div>
        </section>

        {/* ── STAKEHOLDER ECOSYSTEM ── */}
        <section
          aria-label="Stakeholder Ecosystem"
          style={{
            paddingBottom: '7rem',
          }}
        >
          <div style={{ marginBottom: '3.5rem' }}>
            <h2
              className="section-title"
              style={{
                fontFamily: 'var(--font-geist)',
                fontWeight: 200,
                color: '#ffffff',
                marginBottom: '1rem',
              }}
            >
              Designed for Every Stakeholder
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-main)',
                fontSize: '1rem',
                lineHeight: 1.7,
                color: 'rgba(255, 255, 255, 0.55)',
                maxWidth: '720px',
                margin: 0,
              }}
            >
              Role-tailored intelligence for every key discipline across the infrastructure lifecycle.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {[
              {
                role: 'Civil & Structural Engineers',
                benefit: 'Deterministic Standards Verification',
                desc: 'Instant SonReb correlation, crack profiling, and automated IS 456 / ASTM compliance checking.',
              },
              {
                role: 'QA/QC & Inspection Teams',
                benefit: 'Paperless Audit Trails',
                desc: 'Standardized checklists, geotagged evidence logs, and real-time non-conformity tracking.',
              },
              {
                role: 'NDT Testing Specialists',
                benefit: 'Direct Hardware Sync',
                desc: 'Direct sensor streaming into the certified edge buffer, eliminating clipboard errors.',
              },
              {
                role: 'Project Managers & EPCs',
                benefit: 'Project Velocity & Punchlists',
                desc: 'Structural heatmaps, bottleneck alerts, and same-day certified report dispatch.',
              },
              {
                role: 'Infrastructure Asset Owners',
                benefit: 'Permanent Digital Twin',
                desc: 'Lifecycle health indices, deterioration models, and cryptographic audit records.',
              },
            ].map((item, sIdx) => (
              <GlowCard
                key={sIdx}
                style={{
                  padding: '2rem 1.75rem',
                }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-geist)',
                      fontWeight: 300,
                      fontSize: '1.35rem',
                      color: '#ffffff',
                      marginBottom: '0.4rem',
                    }}
                  >
                    {item.role}
                  </h3>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'rgba(255, 255, 255, 0.75)',
                      display: 'block',
                      marginBottom: '1rem',
                    }}
                  >
                    {item.benefit}
                  </span>
                  <p
                    style={{
                      fontFamily: 'var(--font-main)',
                      fontSize: '0.86rem',
                      lineHeight: 1.6,
                      color: 'rgba(255, 255, 255, 0.45)',
                      margin: 0,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              </GlowCard>
            ))}
          </div>
        </section>

        {/* ── TECHNICAL SPECIFICATIONS MATRIX ── */}
        <section
          id="specifications"
          aria-label="Full Technical Specifications"
          style={{
            paddingBottom: '7rem',
          }}
        >
          <div style={{ marginBottom: '3.5rem' }}>
            <h2
              className="section-title"
              style={{
                fontFamily: 'var(--font-geist)',
                fontWeight: 200,
                color: '#ffffff',
                marginBottom: '0',
              }}
            >
              Technical Specifications
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem',
            }}
          >
            {TECHNICAL_SPECIFICATIONS.map((group, idx) => (
              <GlowCard
                key={idx}
                style={{
                  padding: '2.5rem 2rem',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: '#ffffff',
                      margin: 0,
                    }}
                  >
                    {group.category}
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {group.specs.map((item, sIdx) => (
                      <div
                        key={sIdx}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.35rem',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.7rem',
                            letterSpacing: '0.05em',
                            color: 'rgba(255, 255, 255, 0.4)',
                          }}
                        >
                          {item.key}
                        </span>
                        <span
                          style={{
                            fontFamily: 'var(--font-main)',
                            fontSize: '0.92rem',
                            color: 'rgba(255, 255, 255, 0.9)',
                            lineHeight: 1.45,
                          }}
                        >
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </GlowCard>
            ))}
          </div>
        </section>

        {/* ── CALL TO ACTION ── */}
        <section
          aria-label="Request OX1 Deployment"
          style={{
            paddingBottom: '4rem',
          }}
        >
          <GlowCard
            style={{
              padding: 'clamp(2.5rem, 6vw, 5rem)',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-geist)',
                fontWeight: 200,
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                lineHeight: 1,
                color: '#ffffff',
                marginBottom: '2.5rem',
                maxWidth: '800px',
              }}
            >
              Deploy OX1 On Your Project
            </h2>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1.25rem',
                justifyContent: 'center',
              }}
            >
              <Link
                to="/contact?subject=Schedule%20OX1%20Pilot"
                style={{
                  fontFamily: 'var(--font-adieu)',
                  fontSize: '0.8rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  backgroundColor: '#ffffff',
                  color: '#000000',
                  padding: '16px 36px',
                  borderRadius: '30px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'opacity 0.25s ease',
                }}
                onMouseOver={(e) => (e.currentTarget.style.opacity = '0.9')}
                onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
              >
                SCHEDULE AN ON-SITE PILOT
              </Link>

              <Link
                to="/contact"
                style={{
                  fontFamily: 'var(--font-adieu)',
                  fontSize: '0.8rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  backgroundColor: 'transparent',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  padding: '16px 32px',
                  borderRadius: '30px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'border-color 0.25s ease',
                }}
                onMouseOver={(e) => (e.currentTarget.style.borderColor = '#ffffff')}
                onMouseOut={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)')}
              >
                SPEAK WITH STRUCTURAL TEAM
              </Link>
            </div>
          </GlowCard>
        </section>

      </div>
    </main>
  );
};

export default OX1;
