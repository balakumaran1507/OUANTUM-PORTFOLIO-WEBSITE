import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useSEO from '../hooks/useSEO';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'OUANTUM',
  url: 'https://ouantum.com',
  sameAs: ['https://www.linkedin.com/company/ouantum/'],
};

type ReleaseType = 'All' | 'AI Inference' | 'Codal Compliance' | 'Edge Firmware' | 'Security & Platform';

interface ReleaseEntry {
  version: string;
  date: string;
  title: string;
  category: ReleaseType;
  badge: string;
  image: string;
  imageAlt: string;
  summary: string;
  changes: {
    section: string;
    items: string[];
  }[];
}

const RELEASES: ReleaseEntry[] = [
  {
    version: 'v2.6.0',
    date: 'October 24, 2026',
    title: 'Multi-Sensor Bayesian Consensus Engine & MoRTH 5th Revision',
    category: 'AI Inference',
    badge: 'Latest Production',
    image: '/assets/images/changelog-v26-sensor-fusion.webp',
    imageAlt: 'Multi-Sensor Bayesian Consensus Engine & MoRTH 5th Revision',
    summary:
      'Major upgrade introducing Bayesian calibration for quarry-specific concrete aggregates, automated MoRTH Section 1700 acceptance testing, and high-resolution GeoTIFF orthomosaic alignment for drone thermal inspections.',
    changes: [
      {
        section: 'AI Models & SonReb Core',
        items: [
          'Weighted Bayesian consensus engine correlating SonReb non-destructive estimates with lab cube crushing telemetry.',
          'Quarry-specific continuous polynomial calibration (f_c = a · R^b · V^c) updating dynamically per batching plant.',
          'Tropical humidity dampness penalty matrix adjusting rebound indices across monsoon testing conditions.',
        ],
      },
      {
        section: 'Codal Compliance Updates',
        items: [
          'Full programmatic codification of MoRTH Section 1700 (5th Revision) bridge girder and pier acceptance limits.',
          'Updated IRC:SP:51:2025 guidelines for non-destructive evaluation of highway bridges.',
          'Automated non-conformance flag generation triggering immediate verification notices for Independent Engineers.',
        ],
      },
      {
        section: 'Reporting & Verification',
        items: [
          'QR-coded statutory PDF inspection sheets with verifiable cryptographic SHA-256 digital seals.',
          'Sub-second batch export of 500+ pier inspection matrices directly to NHAI statutory formats.',
        ],
      },
    ],
  },
  {
    version: 'v2.5.2',
    date: 'September 18, 2026',
    title: 'Offline Tunnel Mode & Zero-Latency BLE Edge Streaming',
    category: 'Edge Firmware',
    badge: 'Firmware Update',
    image: '/assets/images/changelog-v25-tunnel-edge.webp',
    imageAlt: 'Offline Tunnel Mode & Zero-Latency BLE Edge Streaming',
    summary:
      'Comprehensive offline enhancements for OX1 Edge hardware terminals operating in deep subterranean tunnels, remote expressway alignments, and high-moisture subterranean environments.',
    changes: [
      {
        section: 'Edge Firmware & Offline Sync',
        items: [
          'Local embedded SQLite database allowing complete offline data acquisition in deep tunnel excavations.',
          'Zero-latency BLE auto-reconnect logic for Proceq SilverSchmidt and Pundit UPV transducers.',
          'Automatic background sync with conflict resolution when cellular 4G/5G connection resumes.',
        ],
      },
      {
        section: 'Mathematical Adjustments',
        items: [
          'Automated impact angle normalization algorithm (-90° vertical down, 0° horizontal, +90° inverted slab soffits).',
          'Acoustic path length automatic calculation for direct and semi-direct transmission transducer configurations.',
        ],
      },
    ],
  },
  {
    version: 'v2.4.0',
    date: 'August 12, 2026',
    title: '50-Year Service Life & Coastal Carbonation Diffusion Modeling',
    category: 'AI Inference',
    badge: 'New Engine',
    image: '/assets/images/changelog-v24-durability-modeling.webp',
    imageAlt: '50-Year Service Life & Coastal Carbonation Diffusion Modeling',
    summary:
      'Launch of the fourth core AI engine in the OUANTUM suite: 50-year structural service life forecasting, chloride ingress modeling, and carbonation front depth estimation.',
    changes: [
      {
        section: 'Durability Modeling Engine',
        items: [
          'Finite-element implementation of Fickian second-order diffusion for coastal maritime structures.',
          'IS 456:2000 Annexure B statutory durability compliance classification across Mild, Moderate, Severe, and Extreme exposure.',
          'Reinforcement rebar corrosion initiation threshold forecasting based on surface cover depth telemetry.',
        ],
      },
      {
        section: 'Acoustic Wave Physics',
        items: [
          'Derivation of Dynamic Elastic Modulus (E_d) and Poisson’s Ratio directly from high-frequency acoustic transit waves.',
          'Sub-surface honeycombing detection resolving acoustic impedance boundaries behind congested reinforcement.',
        ],
      },
    ],
  },
  {
    version: 'v2.3.1',
    date: 'July 05, 2026',
    title: 'Zero-Trust RBAC & Tamper-Evident SHA-256 Audit Trails',
    category: 'Security & Platform',
    badge: 'Security Release',
    image: '/assets/images/changelog-v23-zero-trust-rbac.webp',
    imageAlt: 'Zero-Trust RBAC & Tamper-Evident SHA-256 Audit Trails',
    summary:
      'Enterprise security upgrade establishing five distinct role tiers, complete audit logging of all field readings, and SOC-2 compliance preparation.',
    changes: [
      {
        section: 'Access Governance & RBAC',
        items: [
          'Five granular role tiers: Admin, Certifying Structural Engineer, Field Technician, Read-Only Auditor, and Concessionaire Executive.',
          'Mandatory MFA authentication on all statutory report sign-offs and bulk data export requests.',
          'Field technicians locked from modifying calibrated readings once cryptographic hash is stamped.',
        ],
      },
      {
        section: 'Audit & Compliance',
        items: [
          'Cryptographically chained SHA-256 hash log guaranteeing 100% tamper evidence for court arbitration and NHAI Vigilance reviews.',
          'Permanent immutable audit trail capturing timestamp, GPS coordinates, device serial number, and operator identity.',
        ],
      },
    ],
  },
  {
    version: 'v2.2.0',
    date: 'June 01, 2026',
    title: 'Automated IS 13311 Ultrasonic Velocity Grading & BIM Connectors',
    category: 'Codal Compliance',
    badge: 'Core Engine',
    image: '/assets/images/changelog-v22-ultrasonic-grading.webp',
    imageAlt: 'Automated IS 13311 Ultrasonic Velocity Grading & BIM Connectors',
    summary:
      'Initial release of programmatic IS 13311 (Part 1 & 2) compliance tables, core crushing correlation under IS 516, and bi-directional Autodesk Revit IFC 4.3 bridge mapping.',
    changes: [
      {
        section: 'Codal Standards',
        items: [
          'Automatic classification of concrete velocity: Excellent (>4.5 km/s), Good (3.5 to 4.5 km/s), Medium (3.0 to 3.5 km/s), and Doubtful (<3.0 km/s).',
          'Automated non-destructive rebound correlation curve fitting with destructive cylinder and cube crushes.',
        ],
      },
      {
        section: 'BIM Integration',
        items: [
          'Direct import and export of IFC 4.3 structural models from Autodesk Revit and Bentley OpenRoads.',
          'Visual 3D heatmap overlays color-coding quality grades across structural pier columns.',
        ],
      },
    ],
  },
];

const CATEGORIES: ReleaseType[] = [
  'All',
  'AI Inference',
  'Codal Compliance',
  'Edge Firmware',
  'Security & Platform',
];

const Changelog: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ReleaseType>('All');
  const [selectedVersion, setSelectedVersion] = useState<string>('v2.6.0');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useSEO({
    title: 'Platform Changelog & Codal Releases | OUANTUM',
    description:
      'Follow continuous platform updates, AI inference model releases, IS-code updates, and edge firmware improvements from the OUANTUM civil structural engineering team.',
    keywords:
      'OUANTUM changelog, civil AI model updates, IS 456 release notes, MoRTH compliance software updates, SonReb software updates',
    canonicalPath: '/changelog',
    jsonLd: [organizationSchema],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredReleases = useMemo(() => {
    if (activeCategory === 'All') return RELEASES;
    return RELEASES.filter((r) => r.category === activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    if (filteredReleases.length > 0) {
      const exists = filteredReleases.some((r) => r.version === selectedVersion);
      if (!exists) {
        setSelectedVersion(filteredReleases[0].version);
      }
    }
  }, [activeCategory, filteredReleases, selectedVersion]);

  const currentRelease = useMemo(() => {
    return RELEASES.find((r) => r.version === selectedVersion) || RELEASES[0];
  }, [selectedVersion]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <main
      className="subpage-wrapper"
      style={{
        background: '#ffffff',
        color: '#111111',
        minHeight: '100vh',
        paddingBottom: '100px',
        fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* =========================================================================
          HERO SECTION (Fills full width cleanly without truncated right gap)
          ========================================================================= */}
      <section
        style={{
          paddingTop: 'clamp(36px, 4.5vw, 60px)',
          paddingBottom: 'clamp(28px, 3.5vw, 40px)',
          background: '#ffffff',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 16px', width: '100%', boxSizing: 'border-box' }}>
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontSize: 'clamp(2.5rem, 5.2vw, 4.25rem)',
                fontWeight: 400,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                color: '#111111',
                margin: '0 0 16px 0',
              }}
            >
              Changelog & Platform Releases
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              style={{
                fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
                lineHeight: 1.55,
                color: '#4a5565',
                margin: 0,
                maxWidth: '1040px',
              }}
            >
              Live record of new AI inference models, codified Indian Standard updates, edge copilot firmware, and platform capabilities.
            </motion.p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE 2-COLUMN LAYOUT (Selected release on right)
          ========================================================================= */}
      <section style={{ paddingTop: '48px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 16px', width: '100%', boxSizing: 'border-box' }}>
          <div className="ic-changelog-grid">
            {/* ── Left Column: Sticky Navigator & Controls ── */}
            <aside className="ic-changelog-sidebar" aria-label="Release selection and filters">
              {/* Release Index Navigation */}
              <div>
                <div
                  style={{
                    fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#6a7282',
                    marginBottom: '12px',
                  }}
                >
                  Release Index ({filteredReleases.length})
                </div>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {filteredReleases.map((rel) => {
                    const isSelected = selectedVersion === rel.version;
                    return (
                      <button
                        key={rel.version}
                        type="button"
                        onClick={() => setSelectedVersion(rel.version)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          width: '100%',
                          padding: '10px 14px',
                          background: isSelected ? '#111111' : '#f8f8f6',
                          color: isSelected ? '#ffffff' : '#111111',
                          border: isSelected ? '1px solid #111111' : '1px solid rgba(0, 0, 0, 0.06)',
                          borderRadius: 0,
                          cursor: 'pointer',
                          fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                          textAlign: 'left',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                          {rel.version}
                        </span>
                        <span
                          style={{
                            fontSize: '0.78rem',
                            color: isSelected ? 'rgba(255, 255, 255, 0.75)' : '#6a7282',
                          }}
                        >
                          {rel.date.split(',')[0]}
                        </span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Filter By Domain */}
              <div>
                <div
                  style={{
                    fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#6a7282',
                    marginBottom: '12px',
                  }}
                >
                  Filter By Domain
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {CATEGORIES.map((cat) => {
                    const isSelected = activeCategory === cat;
                    const count =
                      cat === 'All'
                        ? RELEASES.length
                        : RELEASES.filter((r) => r.category === cat).length;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setActiveCategory(cat)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          width: '100%',
                          padding: '8px 12px',
                          background: isSelected ? '#111111' : 'transparent',
                          color: isSelected ? '#ffffff' : '#4a5565',
                          border: isSelected ? '1px solid #111111' : '1px solid transparent',
                          borderRadius: 0,
                          cursor: 'pointer',
                          fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                          fontSize: '0.825rem',
                          fontWeight: isSelected ? 600 : 400,
                          textAlign: 'left',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <span>{cat}</span>
                        <span
                          style={{
                            fontSize: '0.75rem',
                            color: isSelected ? '#ffffff' : '#6a7282',
                            background: isSelected ? 'rgba(255,255,255,0.2)' : '#f8f8f6',
                            padding: '1px 7px',
                            borderRadius: 0,
                          }}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Subscribe Box */}
              <div
                style={{
                  background: '#f8f8f6',
                  padding: '22px',
                  borderRadius: 0,
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <div
                  style={{
                    fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: '#111111',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}
                >
                  Release Bulletins
                </div>
                <p
                  style={{
                    fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                    fontSize: '0.825rem',
                    lineHeight: 1.5,
                    color: '#4a5565',
                    margin: 0,
                  }}
                >
                  Get immediate email notifications on Indian Standard revisions & firmware drops.
                </p>
                <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {!subscribed ? (
                    <>
                      <input
                        type="email"
                        required
                        placeholder="Work email"
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '9px 12px',
                          background: '#ffffff',
                          border: '1px solid rgba(0,0,0,0.12)',
                          borderRadius: 0,
                          color: '#111111',
                          fontSize: '0.825rem',
                          fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                          outline: 'none',
                          boxSizing: 'border-box',
                        }}
                      />
                      <button
                        type="submit"
                        className="ic-btn-primary"
                        style={{
                          width: '100%',
                          padding: '9px 14px',
                          fontSize: '0.825rem',
                          fontWeight: 600,
                          borderRadius: 0,
                          cursor: 'pointer',
                          border: 'none',
                          fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                        }}
                      >
                        Subscribe
                      </button>
                    </>
                  ) : (
                    <div style={{ color: '#16a34a', fontSize: '0.825rem', fontWeight: 600 }}>
                      Subscribed to bulletins.
                    </div>
                  )}
                </form>
              </div>
            </aside>

            {/* ── Right Column: Selected Release Detail ── */}
            <div style={{ width: '100%', minWidth: 0 }}>
              <AnimatePresence mode="wait">
                <motion.article
                  key={currentRelease.version}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    width: '100%',
                  }}
                >
                  {/* Inline Metadata Header - No separate boxes */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '10px',
                      fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                      fontSize: '0.875rem',
                      color: '#6a7282',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '1.25rem',
                        fontWeight: 600,
                        color: '#111111',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {currentRelease.version}
                    </span>
                    <span style={{ color: '#d1d5db' }}>/</span>
                    <span style={{ fontWeight: 600, color: '#111111', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      {currentRelease.badge}
                    </span>
                    <span style={{ color: '#d1d5db' }}>/</span>
                    <span style={{ color: '#4a5565' }}>{currentRelease.category}</span>
                    <span style={{ color: '#d1d5db' }}>/</span>
                    <time style={{ color: '#6a7282' }}>{currentRelease.date}</time>
                  </div>

                  {/* Feature Showcase Image */}
                  {currentRelease.image && (
                    <div
                      style={{
                        width: '100%',
                        aspectRatio: '2 / 1',
                        overflow: 'hidden',
                        border: '1px solid rgba(0, 0, 0, 0.08)',
                        background: '#f8f8f6',
                        borderRadius: 0,
                      }}
                    >
                      <img
                        src={currentRelease.image}
                        alt={currentRelease.imageAlt || currentRelease.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                        }}
                      />
                    </div>
                  )}

                  {/* Release Title & Summary */}
                  <div>
                    <h2
                      style={{
                        fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                        fontSize: 'clamp(1.6rem, 2.6vw, 2.35rem)',
                        fontWeight: 400,
                        letterSpacing: '-0.02em',
                        lineHeight: 1.15,
                        color: '#111111',
                        margin: '0 0 14px 0',
                      }}
                    >
                      {currentRelease.title}
                    </h2>
                    <p
                      style={{
                        fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                        fontSize: '1.05rem',
                        lineHeight: 1.65,
                        color: '#4a5565',
                        margin: 0,
                      }}
                    >
                      {currentRelease.summary}
                    </p>
                  </div>

                  {/* Sub-changes cards - Responsive Multi-Column Grid to Fill Horizontal Margin Space */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                      gap: '16px',
                      marginTop: '8px',
                      width: '100%',
                    }}
                  >
                    {currentRelease.changes.map((ch, idx) => (
                      <div
                        key={idx}
                        style={{
                          background: '#f8f8f6',
                          border: '1px solid rgba(0, 0, 0, 0.08)',
                          padding: '24px 28px',
                          borderRadius: 0,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '14px',
                        }}
                      >
                        <h3
                          style={{
                            fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.06em',
                            color: '#111111',
                            margin: 0,
                          }}
                        >
                          {ch.section}
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          {ch.items.map((item, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                              <span
                                style={{
                                  fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                                  fontSize: '0.9rem',
                                  color: '#111111',
                                  lineHeight: 1.55,
                                  userSelect: 'none',
                                }}
                              >
                                —
                              </span>
                              <span
                                style={{
                                  fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                                  fontSize: '0.925rem',
                                  lineHeight: 1.6,
                                  color: '#334155',
                                }}
                              >
                                {item}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Changelog;
