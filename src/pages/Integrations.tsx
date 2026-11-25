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

interface PillarCard {
  title: string;
  items: string[];
}

interface CommunityPillar {
  id: string;
  shortLabel: string;
  topic: string;
  title: string;
  tagline: string;
  image: string;
  imageAlt: string;
  description: string;
  members: string;
  cards: PillarCard[];
}

const PILLARS: CommunityPillar[] = [
  {
    id: 'regional-chapters',
    shortLabel: 'Regional Chapters',
    topic: 'Field Collectives',
    title: 'Regional Engineering Chapters & Field Collectives',
    tagline: 'Field Technicians · Chief Bridge Engineers · NDT Specialists',
    image: '/assets/images/community-regional-chapters.webp',
    imageAlt: 'Regional Engineering Chapters & Field Collectives',
    description:
      'Connecting frontline quality teams across national highway packages, metro rail corridors, long-span bridge abutments, and deep tunnel alignments. Local chapters host monthly field calibration workshops, SonReb correlation reviews, and regional peer validations.',
    members: '4,800+ Active Inspectors',
    cards: [
      {
        title: 'Field Testing & Calibration Protocols',
        items: [
          'In-situ digital rebound hammer normalization across inverted slab soffits, pier verticals (-90° to +90°), and curved tunnel arches.',
          'Regional concrete quarry aggregate databases dynamically tuning SonReb polynomial exponents per batching facility.',
          'Monsoon humidity compensation matrices adjusting acoustic velocities and surface rebound indices across marine exposure zones.',
          'Peer-reviewed non-conformance flag validation before formal statutory issuance to Independent Engineers.',
        ],
      },
      {
        title: 'Active Initiatives & Deliverables',
        items: [
          'Quarterly NDT Operator Inter-Laboratory Comparison (ILC) trials across 18 regional civil testing centers.',
          'Standardized field inspection dossiers mapping IS 516 destructive cube crushing to non-destructive regression curves.',
          'Mobile field calibration toolkits and automated outlier detection routines for offline Proceq and Pundit field terminals.',
          'Verified structural defect taxonomy classifying delamination, honeycombing, and acoustic impedance anomalies.',
        ],
      },
      {
        title: 'Meeting Cadence & Participation',
        items: [
          'Monthly technical review sessions on the second Thursday of every month.',
          'Quarterly regional chapter workshops in New Delhi, Mumbai, Bengaluru, and Hyderabad.',
          'Open field observation submissions and peer calibration curve verification.',
        ],
      },
    ],
  },
  {
    id: 'academic-research',
    shortLabel: 'Academic Research',
    topic: 'Academic Consortia',
    title: 'Civil AI Research & Academic Consortia',
    tagline: 'Premier IITs · NITs · CSIR-CRRI · Global Structural Labs',
    image: '/assets/images/community-research-academics.webp',
    imageAlt: 'Civil AI Research & Academic Consortia',
    description:
      'Spearheading fundamental scientific research at the intersection of non-destructive physical testing, acoustic transit wave physics, and probabilistic Bayesian inference. Co-developed with leading structural faculties and national laboratory teams.',
    members: '45+ Research Labs',
    cards: [
      {
        title: 'Scientific Research & Model Architectures',
        items: [
          'Weighted Bayesian sensor fusion combining acoustic transit time, surface restitution, and eddy-current cover depth.',
          'Finite-element implementation of Fickian second-order chloride diffusion for 50-year coastal marine infrastructure.',
          'Multi-transducer acoustic tomography resolving internal duct grouting voids and honeycombing behind congested steel reinforcement.',
          'Real-time calculation of Dynamic Elastic Modulus and Poisson’s Ratio from high-frequency acoustic transit waveforms.',
        ],
      },
      {
        title: 'Open Data Repositories & Fellowships',
        items: [
          'Over 250,000 paired non-destructive test points correlated with certified 28-day and 56-day laboratory core crushing reports.',
          'Sponsored graduate research fellowships in civil infrastructure computer vision and acoustic wave modeling.',
          'Joint peer-reviewed technical publications presented at RILEM, ACI, and Indian Concrete Institute conferences.',
          'Public algorithmic benchmarks comparing empirical SonReb models with laboratory destructive crushing truth.',
        ],
      },
      {
        title: 'Academic Review Council',
        items: [
          'Bi-annual symposium reviewing statistical model accuracy and Bayesian prior calibrations.',
          'Collaborative open-science working sessions on concrete durability mechanics.',
          'Guest lectures and doctoral thesis advisement across structural health monitoring topics.',
        ],
      },
    ],
  },
  {
    id: 'codal-standards',
    shortLabel: 'Codal Standards',
    topic: 'Statutory Alignment',
    title: 'Codal Standards & Technical Working Groups',
    tagline: 'IS 456 · IS 13311 · MoRTH 5th Revision · IRC Guidelines',
    image: '/assets/images/community-codal-standards.webp',
    imageAlt: 'Codal Standards & Technical Working Groups',
    description:
      'Dedicated to the programmatic codification of Indian Standard civil codes and statutory national highway guidelines into deterministic verification logic, digital inspection matrices, and tamper-evident audit trails.',
    members: '1,200+ Codal Engineers',
    cards: [
      {
        title: 'Codified Standards & Statutory Limits',
        items: [
          'MoRTH Section 1700 (5th Revision): Full programmatic codification of bridge girder and pier acceptance limits and rebound velocity minimums.',
          'IS 13311 (Part 1 & 2): Automated velocity grading classifying concrete into Excellent (>4.5 km/s), Good (3.5 to 4.5 km/s), Medium, and Doubtful.',
          'IS 456:2000 Durability Compliance: Automated checks against minimum cementitious content, maximum water-cement ratio, and nominal cover depth.',
          'IRC:SP:51:2025 Bridge Guidelines: Standardized evaluation procedures for highway bridges and non-destructive load rating assessments.',
        ],
      },
      {
        title: 'Auditability & Cryptographic Integrity',
        items: [
          'Cryptographically chained SHA-256 hash logs guaranteeing 100% tamper evidence for court arbitration and NHAI Vigilance reviews.',
          'QR-coded statutory PDF inspection sheets with verifiable digital seals and immutable GPS coordinate proofs.',
          'Independent Engineer digital verification portals enabling rapid statutory review and cryptographic private-key sign-offs.',
          'Zero-dispute audit trails preventing post-pour manipulation of calibrated sensor telemetry.',
        ],
      },
      {
        title: 'Working Group Schedule',
        items: [
          'Bi-weekly technical working group meetings drafting open codified rule sets.',
          'Statutory interpretation briefs published immediately following Bureau of Indian Standards amendments.',
          'Public comment periods on draft automated testing matrices.',
        ],
      },
    ],
  },
  {
    id: 'developer-sdk',
    shortLabel: 'Developer Platform',
    topic: 'Open Platform',
    title: 'Developer Platform & Open Telemetry Protocols',
    tagline: 'Hardware Makers · IoT Developers · BIM Software Engineers',
    image: '/assets/images/community-developer-ecosystem.webp',
    imageAlt: 'Developer Platform & Open Telemetry Protocols',
    description:
      'Building open-source hardware connectors, BIM plugins, and real-time civil data pipelines. Empowering hardware manufacturers, digital rebound hammer vendors, and software developers to build natively on OX1 Edge.',
    members: '850+ Open Contributors',
    cards: [
      {
        title: 'Hardware Transducers & Edge Drivers',
        items: [
          'Open-source BLE auto-reconnect drivers for Proceq SilverSchmidt hammers and Pundit UPV transducers.',
          'Local embedded SQLite database schemas allowing zero-data-loss logging in deep subterranean tunnel excavations.',
          'Bi-directional IFC 4.3 structural models connecting Autodesk Revit and Bentley OpenRoads with non-destructive inspection matrices.',
          'Real-time webhook architectures emitting tamper-evident inspection events directly into Procore and enterprise SAP systems.',
        ],
      },
      {
        title: 'Developer SDKs & Open Tooling',
        items: [
          'TypeScript, Python, and C++ client libraries for edge data acquisition and cloud analytics.',
          'Interactive OpenAPI documentation with pre-built synthetic NDT datasets and sandbox test environments.',
          'Automated regression testing suites validating hardware calibration accuracy against physical test blocks.',
          'Community-contributed connectors for geotechnical IoT loggers and drone photogrammetry orthomosaics.',
        ],
      },
      {
        title: 'Developer Engagement',
        items: [
          'Weekly developer office hours covering edge firmware integration and WebSocket feeds.',
          'Annual Civil Tech Hackathon building autonomous drone crack segmentation models and copilot plugins.',
          'Open GitHub repositories welcoming community contributions and pull requests.',
        ],
      },
    ],
  },
  {
    id: 'infrastructure-forum',
    shortLabel: 'Asset Owners Forum',
    topic: 'Leadership Forum',
    title: 'Asset Owners & Infrastructure Leadership Forum',
    tagline: 'Concessionaires · NHAI Project Directors · State PWD Chiefs',
    image: '/assets/images/community-infrastructure-forum.webp',
    imageAlt: 'Asset Owners & Infrastructure Leadership Forum',
    description:
      'An executive peer exchange for infrastructure concessionaires, highway project directors, metro corporations, and structural auditors sharing empirical 50-year service life telemetry, lifecycle cost metrics, and dispute mitigation strategies.',
    members: '320+ Infrastructure Leaders',
    cards: [
      {
        title: 'Asset Lifecycle & Economic Governance',
        items: [
          '50-year predictive durability forecasting replacing reactive maintenance with deterministic sensor-backed planning.',
          'Demonstrated 35% reduction in lifecycle structural rehabilitation costs across national highway concession packages.',
          'Public-Private Partnership (PPP) handover certification dossiers guaranteeing verifiable asset health at concession expiry.',
          'Multi-corridor executive dashboards monitoring structural condition across hundreds of bridge piers and viaduct spans.',
        ],
      },
      {
        title: 'Benchmark Reports & Case Studies',
        items: [
          'Annual National Concrete Quality Benchmark Report assessing compressive strength consistency across 40+ expressway packages.',
          'Coastal marine durability playbooks evaluating surface sealants and cathodic protection performance in saline zones.',
          'Deep subterranean tunnel health audits analyzing shotcrete lining integrity and groundwater seepage patterns.',
          'Structural risk indexing methodologies mapping high-risk bridge structures for prioritized maintenance funding.',
        ],
      },
      {
        title: 'Executive Council Sessions',
        items: [
          'Invitation-only quarterly roundtables with infrastructure directors and government quality authorities.',
          'Private peer advisory consultations on complex statutory non-conformance disputes.',
          'Executive briefings on upcoming amendments to statutory highway concession agreements.',
        ],
      },
    ],
  },
];

const Integrations: React.FC = () => {
  const [selectedPillarId, setSelectedPillarId] = useState<string>('regional-chapters');
  const [joinEmail, setJoinEmail] = useState('');
  const [joined, setJoined] = useState(false);

  useSEO({
    title: 'Civil Engineering Community & Technical Ecosystem | OUANTUM',
    description:
      'Join thousands of structural engineers, academic researchers, codal committee members, and civil tech developers shaping the future of infrastructure intelligence.',
    keywords:
      'civil engineering community, structural health monitoring collective, IS 456 working group, NDT engineers network, OUANTUM community',
    canonicalPath: '/integrations',
    jsonLd: [organizationSchema],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const currentPillar = useMemo(() => {
    return PILLARS.find((p) => p.id === selectedPillarId) || PILLARS[0];
  }, [selectedPillarId]);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (joinEmail.trim()) {
      setJoined(true);
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
          HERO SECTION (Clean, open presentation with no divided lines)
          ========================================================================= */}
      <section
        style={{
          paddingTop: 'clamp(36px, 4.5vw, 60px)',
          paddingBottom: 'clamp(28px, 3.5vw, 44px)',
          background: '#ffffff',
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
              Civil Engineering Community
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
                margin: '0 0 32px 0',
                maxWidth: '960px',
              }}
            >
              A collective of structural engineers, NDT specialists, academic researchers, and civil software developers building verifiable infrastructure intelligence.
            </motion.p>

            {/* Community Headline Metrics in Clean Cards without dividing lines */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '16px',
                width: '100%',
              }}
            >
              {[
                { label: 'Verified Quality Engineers', val: '12,000+' },
                { label: 'NDT Labs & Testing Firms', val: '450+' },
                { label: 'Academic Consortia Hubs', val: '28+' },
                { label: 'Codified Test Routines', val: '100% MoRTH & IS' },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  style={{
                    background: '#f8f8f6',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    padding: '20px 24px',
                    borderRadius: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                      fontSize: 'clamp(1.5rem, 2.2vw, 2rem)',
                      fontWeight: 500,
                      color: '#111111',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {stat.val}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                      fontSize: '0.8rem',
                      color: '#6a7282',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2-COLUMN COMMUNITY WORKSPACE (Left: Pillar selector | Right: Deep content)
          ========================================================================= */}
      <section style={{ paddingTop: '28px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 16px', width: '100%', boxSizing: 'border-box' }}>
          <div className="ic-changelog-grid">
            {/* ── Left Column: Sticky Pillar Navigation ── */}
            <aside className="ic-changelog-sidebar" aria-label="Community pillars navigation">
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
                  Explore Pillars ({PILLARS.length})
                </div>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {PILLARS.map((p) => {
                    const isSelected = selectedPillarId === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setSelectedPillarId(p.id)}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '3px',
                          width: '100%',
                          padding: '12px 14px',
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
                          {p.shortLabel}
                        </span>
                        <span
                          style={{
                            fontSize: '0.75rem',
                            color: isSelected ? 'rgba(255, 255, 255, 0.75)' : '#6a7282',
                          }}
                        >
                          {p.members}
                        </span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Request Membership Card */}
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
                  Join Working Groups
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
                  Participate in monthly working groups, access research datasets, and collaborate with certified quality engineers.
                </p>
                <form onSubmit={handleJoin} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {!joined ? (
                    <>
                      <input
                        type="email"
                        required
                        placeholder="Work email"
                        value={joinEmail}
                        onChange={(e) => setJoinEmail(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '9px 12px',
                          background: '#ffffff',
                          border: '1px solid rgba(0, 0, 0, 0.12)',
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
                        Request Access
                      </button>
                    </>
                  ) : (
                    <div style={{ color: '#16a34a', fontSize: '0.825rem', fontWeight: 600 }}>
                      Access request submitted.
                    </div>
                  )}
                </form>
              </div>
            </aside>

            {/* ── Right Column: Selected Pillar Deep Content ── */}
            <div style={{ width: '100%', minWidth: 0 }}>
              <AnimatePresence mode="wait">
                <motion.article
                  key={currentPillar.id}
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
                  {/* Metadata Header */}
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
                    <span style={{ fontWeight: 600, color: '#111111', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      {currentPillar.topic}
                    </span>
                    <span style={{ color: '#d1d5db' }}>/</span>
                    <span style={{ color: '#4a5565' }}>{currentPillar.tagline}</span>
                    <span style={{ color: '#d1d5db' }}>/</span>
                    <span style={{ color: '#111111', fontWeight: 600 }}>{currentPillar.members}</span>
                  </div>

                  {/* Showcase Pillar Image */}
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
                      src={currentPillar.image}
                      alt={currentPillar.imageAlt}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                  </div>

                  {/* Title & Description */}
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
                      {currentPillar.title}
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
                      {currentPillar.description}
                    </p>
                  </div>

                  {/* Deep Content Cards - Perfect Responsive Multi-Column Grid */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                      gap: '16px',
                      marginTop: '8px',
                      width: '100%',
                    }}
                  >
                    {currentPillar.cards.map((card, idx) => (
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
                          {card.title}
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          {card.items.map((item, i) => (
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

export default Integrations;
