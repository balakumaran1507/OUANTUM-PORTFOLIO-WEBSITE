import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type ProductKey = 'hub' | 'agent' | 'estimator';

const TAB_ORDER: ProductKey[] = ['hub', 'agent', 'estimator'];
const ROTATION_DURATION = 7000; // 7 seconds per card

interface CapabilityItem {
  title: string;
  desc: string;
}

interface ProductItem {
  id: ProductKey;
  number: string;
  shortLabel: string;
  tabLabel: string;
  eyebrow: string;
  title: string;
  tagline: string;
  description: string;
  capabilities: CapabilityItem[];
  imageSrc: string;
  imageAlt: string;
}

const products: Record<ProductKey, ProductItem> = {
  hub: {
    id: 'hub',
    number: '01',
    shortLabel: 'Quality Hub',
    tabLabel: 'OUANTUM Quality Hub',
    eyebrow: '',
    title: 'OUANTUM Quality Hub',
    tagline: 'Pre-pour quality, NDT registers, and continuous structural health telemetry.',
    description:
      'The canonical single source of truth for major civil infrastructure packages. Quality Hub consolidates digital pour cards, ultrasonic testing registers, and multi-package structural telemetry into an unbroken digital ledger. It enforces codified milestone gating derived directly from IS 456:2000, IRC 112, and MoRTH Section 1700, preventing premature concrete pours before certified compliance.',
    capabilities: [
      {
        title: 'Codified Hold Points',
        desc: 'Enforces mandatory digital ITP witness and hold points across pier caps, girders, and viaduct spans.',
      },
      {
        title: 'Direct Hardware Sync',
        desc: 'Automatic Bluetooth data acquisition from calibrated digital compression testing machines (CTM) and UPV sensors.',
      },
      {
        title: 'Cryptographic SHA-256 Seals',
        desc: 'Multi-stakeholder digital signoffs linking concessionaires, TPQM auditors, and authority engineers.',
      },
    ],
    imageSrc: '/assets/images/showcase-hub-blue.jpg',
    imageAlt: 'OUANTUM Quality Hub digital pour cards, NDT registers, and structural health telemetry',
  },
  agent: {
    id: 'agent',
    number: '02',
    shortLabel: 'OX1 Agent',
    tabLabel: 'OX1 Autonomous AI Agent',
    eyebrow: '',
    title: 'OX1 Autonomous AI Agent',
    tagline: 'Autonomous civil intelligence, acoustic wave inversion & crack characterization.',
    description:
      'A deterministic civil engineering AI agent engineered to run both in the cloud and directly on edge hardware at active construction sites. OX1 analyzes ultrasonic pulse velocities, rebound hammer indices, and surface crack telemetry—cross-verifying SonReb calibration curves with deep neural acoustic inversion to generate certified compliance audit dossiers.',
    capabilities: [
      {
        title: 'Acoustic Wave Inversion',
        desc: 'Correlates non-destructive pulse velocity telemetry with physical core crush benchmarks to eliminate testing ambiguity.',
      },
      {
        title: 'Instant Dossier Synthesis',
        desc: 'Converts raw field sensor readings and geostamped inspection imagery into certified, tamper-evident PDF dossiers.',
      },
      {
        title: 'Offline Field-Edge Inference',
        desc: 'Performs deterministic structural evaluations on remote highway corridors and tunnels without active internet connectivity.',
      },
    ],
    imageSrc: '/assets/images/showcase-agent-gold.jpg',
    imageAlt: 'OX1 Autonomous AI Agent analyzing civil infrastructure telemetry and automated compliance verification',
  },
  estimator: {
    id: 'estimator',
    number: '03',
    shortLabel: 'Estimator',
    tabLabel: 'Estimator',
    eyebrow: '',
    title: 'OUANTUM Estimator',
    tagline: 'Dynamic BOQ management, 3D BIM takeoffs & quality-gated disbursements.',
    description:
      'Connects physical field quality directly to commercial capital disbursements. Estimator maps Bill of Quantities schedule positions to verified structural inspection signoffs. Interim Payment Certificates (IPCs) automatically lock until all mandatory laboratory break tests, pour clearances, and NDT audits pass compliance—completely protecting concessionaires from paying for defective work.',
    capabilities: [
      {
        title: 'Quality-Gated IPC Releases',
        desc: 'Prevents unearned milestone disbursements by locking contractor invoice approvals until all quality gates pass.',
      },
      {
        title: 'Parametric 3D BIM Takeoffs',
        desc: 'Direct IFC/BIM geometry extraction calculating exact concrete volumes, rebar tonnages, and formwork areas.',
      },
      {
        title: 'Defect Rework Expense Isolation',
        desc: 'Automatically isolates and tracks contractor rectification costs to prevent rework overbilling on non-conformances.',
      },
    ],
    imageSrc: '/assets/images/showcase-estimator-green.jpg',
    imageAlt: 'OUANTUM Estimator dashboard displaying Bill of Quantities and quality-gated IPC pipeline',
  },
};

const IntercomShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ProductKey>('hub');
  const [cycleKey, setCycleKey] = useState<number>(0);
  // Auto-advance active tab every 7 seconds with progress indicator
  useEffect(() => {
    const timer = setTimeout(() => {
      const currentIndex = TAB_ORDER.indexOf(activeTab);
      const nextIndex = (currentIndex + 1) % TAB_ORDER.length;
      setActiveTab(TAB_ORDER[nextIndex]);
      setCycleKey((prev) => prev + 1);
    }, ROTATION_DURATION);

    return () => clearTimeout(timer);
  }, [activeTab, cycleKey]);

  const handleSelectTab = (key: ProductKey) => {
    setActiveTab(key);
    setCycleKey((prev) => prev + 1);
  };

  const currentProduct = products[activeTab];

  return (
    <section
      style={{
        padding: '80px 16px',
        backgroundColor: '#ffffff',
        border: 'none',
      }}
      aria-label="OUANTUM Platform Showcase"
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto', width: '100%' }}>
        {/* Section Heading Block - Left-Aligned with standard margins */}
        <div style={{ textAlign: 'left', maxWidth: '820px', marginBottom: '40px' }}>
          <h2
            style={{
              fontSize: 'clamp(2rem, 3.5vw, 3.25rem)',
              fontWeight: 300,
              WebkitTextStroke: '0.4px #ffffff',
              WebkitTextFillColor: '#111111',
              lineHeight: 1.12,
              letterSpacing: '-0.025em',
              color: '#111111',
              margin: '0 0 16px 0',
              fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            }}
          >
            Three products, one seamless experience
          </h2>
          <p
            style={{
              fontSize: 'clamp(1rem, 1.6vw, 1.2rem)',
              lineHeight: 1.55,
              color: '#555555',
              margin: 0,
              maxWidth: '680px',
              fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            }}
          >
            Civil infrastructure quality assurance, autonomous structural AI, and bill of quantities estimation working in unison.
          </p>
        </div>

        {/* Showcase Parallel Row: Left Image Preview + Right Product Wordings */}
        <div
          className="ic-showcase-row"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 1fr)',
            gap: '40px',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {/* Main Showcase Container - Left Side Dashboard Preview */}
          <div
            className="ic-showcase-container"
            style={{
              width: '100%',
              backgroundColor: '#ffffff',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              borderRadius: 0,
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Top Product Tabs - Left Aligned Text */}
            <div
              className="ic-showcase-tabs"
              role="tablist"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                backgroundColor: '#fafafa',
                borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                margin: 0,
                padding: 0,
              }}
            >
              {TAB_ORDER.map((key, index) => {
                const item = products[key];
                const isActive = activeTab === key;
                return (
                  <button
                    key={key}
                    role="tab"
                    aria-selected={isActive}
                    className={`ic-showcase-tab ${isActive ? 'active' : ''}`}
                    onClick={() => handleSelectTab(key)}
                    style={{
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      textAlign: 'left',
                      padding: '14px 18px',
                      fontWeight: isActive ? 600 : 400,
                      fontSize: 'clamp(0.85rem, 1.05vw, 0.95rem)',
                      lineHeight: 1.25,
                      color: isActive ? '#111111' : '#6b7280',
                      border: 'none',
                      borderRight: index < 2 ? '1px solid rgba(0, 0, 0, 0.06)' : 'none',
                      backgroundColor: isActive ? '#ffffff' : '#fafafa',
                      transition: 'all 0.15s ease',
                      borderRadius: 0,
                      cursor: 'pointer',
                      fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                    }}
                  >
                    {/* Active Top Line Indicator with 7-second progressive bar */}
                    {isActive && (
                      <div
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          height: '3px',
                          backgroundColor: 'rgba(0, 82, 204, 0.12)',
                          overflow: 'hidden',
                          zIndex: 3,
                        }}
                      >
                        <motion.div
                          key={`${key}-${cycleKey}`}
                          initial={{ width: '0%' }}
                          animate={{ width: '100%' }}
                          transition={{
                            duration: 7,
                            ease: 'linear',
                          }}
                          style={{
                            height: '100%',
                            backgroundColor: '#0052cc',
                          }}
                        />
                      </div>
                    )}
                    <span style={{ display: 'block', width: '100%' }}>{item.tabLabel}</span>
                  </button>
                );
              })}
            </div>

            {/* Direct Edge-to-Edge Image with Seamless Layered Crossfade */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '1024 / 576',
                overflow: 'hidden',
                lineHeight: 0,
                backgroundColor: '#ffffff',
                flex: 1,
              }}
            >
              {TAB_ORDER.map((key) => {
                const item = products[key];
                const isCurrent = activeTab === key;
                return (
                  <img
                    key={key}
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      borderRadius: 0,
                      opacity: isCurrent ? 1 : 0,
                      zIndex: isCurrent ? 2 : 1,
                      pointerEvents: isCurrent ? 'auto' : 'none',
                      transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                      imageRendering: '-webkit-optimize-contrast',
                      WebkitBackfaceVisibility: 'hidden',
                      backfaceVisibility: 'hidden',
                    }}
                    loading="eager"
                    decoding="async"
                  />
                );
              })}
            </div>
          </div>

          {/* Right Side: Product Wordings for Selected Tab (Seamless typography, no card box) */}
          <div
            className="ic-showcase-right-slot"
            style={{
              width: '100%',
              backgroundColor: 'transparent',
              border: 'none',
              borderRadius: 0,
              boxShadow: 'none',
              padding: '4px 0',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative',
              boxSizing: 'border-box',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
              >
                {/* Eyebrow - rendered only if defined */}
                {currentProduct.eyebrow ? (
                  <div
                    style={{
                      fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: '#666666',
                      marginBottom: '10px',
                    }}
                  >
                    {currentProduct.eyebrow}
                  </div>
                ) : null}

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                    fontSize: 'clamp(1.75rem, 2.5vw, 2.35rem)',
                    fontWeight: 400,
                    color: '#111111',
                    letterSpacing: '-0.025em',
                    margin: '0 0 10px 0',
                    lineHeight: 1.15,
                  }}
                >
                  {currentProduct.title}
                </h3>

                {/* Tagline / Subtitle */}
                <div
                  style={{
                    fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                    fontSize: '1.025rem',
                    fontWeight: 500,
                    color: '#111111',
                    lineHeight: 1.45,
                    marginBottom: '16px',
                  }}
                >
                  {currentProduct.tagline}
                </div>

                {/* Comprehensive Description */}
                <p
                  style={{
                    fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                    fontSize: '0.925rem',
                    lineHeight: 1.65,
                    color: '#555555',
                    margin: '0 0 22px 0',
                  }}
                >
                  {currentProduct.description}
                </p>

                {/* Core Capabilities */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '26px' }}>
                  {currentProduct.capabilities.map((cap, i) => (
                    <div
                      key={i}
                      style={{
                        fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                        fontSize: '0.885rem',
                        lineHeight: 1.55,
                        color: '#555555',
                      }}
                    >
                      <span style={{ color: '#111111', fontWeight: 600 }}>{cap.title}: </span>
                      {cap.desc}
                    </div>
                  ))}
                </div>

              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntercomShowcase;
