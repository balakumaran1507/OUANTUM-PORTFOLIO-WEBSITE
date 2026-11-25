import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import useSEO from '../hooks/useSEO';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'OUANTUM',
  url: 'https://ouantum.com',
  sameAs: ['https://www.linkedin.com/company/ouantum/'],
};

interface ConstructionProblemSolution {
  id: string;
  image: string;
  imageAlt: string;
  title: string;
  heroHeadline: string;
  thePain: string;
  theSolution: string;
  impactMetrics: { label: string; value: string }[];
  codalStandard: string;
  deliverables: string[];
}

const CONSTRUCTION_SOLUTIONS: ConstructionProblemSolution[] = [
  {
    id: 'curing-delays',
    image: '/assets/images/buildings/building-3.png',
    imageAlt: 'Modern concrete pavilion with formwork maturity validation',
    title: '28-Day Curing Bottlenecks & Shuttering Lockups',
    heroHeadline: 'Safely Strip Formwork in 3 to 5 Days with In-Situ Maturity Tracking',
    thePain:
      'Standard specifications mandate waiting 14 to 28 days for water-bath laboratory cube crushes before striking formwork or pre-stressing tendons. Precast casting yards sit jammed, launching gantries remain stationary, and shuttering rental fees drain project cash flow.',
    theSolution:
      'OUANTUM combines in-situ concrete maturity tracking with real-time SonReb telemetry to predict the exact hour concrete reaches stripping threshold (15 to 20 MPa) in 3 to 5 days. Engineering teams safely strip shuttering and cycle formwork up to 30% faster without guessing.',
    impactMetrics: [
      { label: 'Cycle Time Reduction', value: '3.5 Days / Pour' },
      { label: 'Formwork Rental Savings', value: '22%' },
      { label: 'Safety Confidence', value: '99.8% Reliability' },
    ],
    codalStandard: 'IS 456:2000 Clause 11.3 & ASTM C1074 Maturity Standard',
    deliverables: [
      'In-situ concrete maturity and temperature-gradient tracking',
      'Early 3-day and 7-day compressive strength forecasting',
      'Automated formwork stripping authorization certificates',
      'Batch-plant aggregate correlation to eliminate over-curing delays',
    ],
  },
  {
    id: 'data-tampering',
    image: '/assets/images/buildings/building-11.png',
    imageAlt: 'High-precision institutional architecture with immutable digital NDT logs',
    title: 'Testing Fraud & Unverified Paper Logs',
    heroHeadline: 'Direct BLE Sensor Sync with Tamper-Evident Cryptographic Audit Trails',
    thePain:
      'On active job sites, manual rebound hammer readings and handwritten test logs are notoriously prone to manipulation, transcription error, or outright fabrication. Disputed test records trigger government vigilance audits, force destructive re-testing, and risk catastrophic safety compromises.',
    theSolution:
      'Zero manual transcription. Raw sensor readings stream directly from digital probes via Bluetooth BLE to the OX1 Edge terminal. Every reading is permanently sealed with GPS spatial coordinates, timestamp, equipment serial number, and an immutable SHA-256 cryptographic seal.',
    impactMetrics: [
      { label: 'Data Authenticity', value: '100% Tamper-Evident' },
      { label: 'Audit Verification Time', value: '< 60 Seconds' },
      { label: 'Manual Transcription Errors', value: '0%' },
    ],
    codalStandard: 'IS 13311 (Part 2) & ISO 9001:2015 Clause 8.5.2',
    deliverables: [
      'Direct Bluetooth BLE ingestion from digital Schmidt hammers and UPV probes',
      'Automated cryptographic SHA-256 hashing for raw reading immutability',
      'GPS and chainage coordinate stamping for every structural test point',
      'Read-only verification portal for NHAI, TPQM, and vigilance officers',
    ],
  },
  {
    id: 'milestone-disputes',
    image: '/assets/images/buildings/building-2.png',
    imageAlt: 'Integrated high-rise complex with automated IS codal milestone consensus',
    title: 'Contractor-Authority Milestone & Escrow Disputes',
    heroHeadline: 'Zero-Dispute Consensus for IS 456, IS 13311 & MoRTH Milestones',
    thePain:
      'Contradictory test results between EPC contractors, Concessionaires, and Independent Engineers stall milestone sign-offs. Billing approvals freeze in escrow, and disputes escalate to protracted arbitration, costing crores in delayed capital and legal fees.',
    theSolution:
      'OUANTUM programmatically codifies IS 456, IS 13311, and MoRTH Section 1700 into deterministic algorithms. Both contractor and Independent Engineer evaluate identical mathematical consensus models calibrated to local quarry aggregates, producing undisputed, reproducible pass/fail verdicts.',
    impactMetrics: [
      { label: 'Milestone Approval Speed', value: '85% Faster' },
      { label: 'Dispute Cost Reduction', value: '₹1.4 Cr / 100km' },
      { label: 'Codal Consensus', value: '100% Deterministic' },
    ],
    codalStandard: 'MoRTH Section 1700 & IRC:SP:51:2025 Guidelines',
    deliverables: [
      'Clause-by-clause automated evaluation under IS 456:2000 Clause 15 & 16',
      'Automated SonReb calibration curve generation for local quarry aggregates',
      'Joint contractor-authority digital sign-off and milestone certificates',
      'Immutable dispute resolution audit trail for DRB proceedings',
    ],
  },
  {
    id: 'subsurface-voids',
    image: '/assets/images/buildings/building-12.png',
    imageAlt: 'High-tech concrete bridge girder undergoing ultrasonic pulse velocity tomography',
    title: 'Hidden Voids & Honeycombing in Post-Tensioned Ducts',
    heroHeadline: 'Acoustic UPV Tomography Resolving Internal Defects and Duct Voids',
    thePain:
      'Unconsolidated concrete, honeycombing behind congested reinforcement cages, and voided prestressing ducts cannot be detected by visual inspection. If left undiscovered before post-tensioning or grouting, they lead to catastrophic structural failures years after handover.',
    theSolution:
      'Synthetic aperture acoustic tomography maps internal concrete cross-sections non-destructively. By measuring ultrasonic pulse velocity variations across a dense grid, OUANTUM identifies low-velocity zones corresponding to honeycombing, delamination, and duct voids down to 15mm resolution.',
    impactMetrics: [
      { label: 'Defect Resolution', value: '15 mm' },
      { label: 'Internal Scanning Depth', value: 'Up to 2.5 m' },
      { label: 'Grout Void Accuracy', value: '99.4%' },
    ],
    codalStandard: 'IS 13311 (Part 1):1992 & ACI 228.2R Non-Destructive Testing',
    deliverables: [
      '3D acoustic tomographic slices showing internal density distribution',
      'Tendon duct grout fill integrity verification reports',
      'Non-destructive honeycombing boundary mapping for targeted repair',
      'Automated velocity grading under IS 13311 acoustic thresholds',
    ],
  },
  {
    id: 'structural-corrosion',
    image: '/assets/images/buildings/building-10.png',
    imageAlt: 'Marine coastal concrete viaduct and port terminal inspected for electrochemical corrosion',
    title: '50-Year Structural Corrosion & Carbonation Risk',
    heroHeadline: 'Fickian Chloride Diffusion & Reinforcement Carbonation Risk Simulation',
    thePain:
      'Reinforced concrete in coastal, marine, and industrial environments degrades silently as airborne chlorides and carbonation depassivate reinforcement steel. By the time rust stains or spalling appear on the surface, internal structural repair costs escalate into crores.',
    theSolution:
      'OUANTUM deploys finite-element Fickian second-order diffusion simulation under IS 456 Annexure B. By modeling cover depth, concrete permeability, and ambient microclimate, the engine predicts carbonation front penetration and chloride corrosion risk over 50 years, allowing targeted preventive protection.',
    impactMetrics: [
      { label: 'Design Life Assurance', value: '50+ Years' },
      { label: 'Lifecycle Maintenance Savings', value: '40%' },
      { label: 'Corrosion Forecast Horizon', value: '1 to 50 Years' },
    ],
    codalStandard: 'IS 456:2000 Annexure B & BS EN 206 Durability Matrix',
    deliverables: [
      'Finite-element chloride ingress modeling across marine exposure zones',
      'Carbonation front depth forecast versus effective reinforcement cover',
      'IS 456 exposure classification compliance (Mild to Extreme)',
      'Cathodic protection and silane coating maintenance scheduling',
    ],
  },
];

const COMPARISONS = [
  {
    aspect: 'Formwork Stripping Decisions',
    traditional: 'Wait 14–28 days arbitrarily or guess based on surface appearance.',
    ouantum: 'In-situ maturity tracking predicts safe stripping strength (15–20 MPa) in 3–5 days.',
  },
  {
    aspect: 'Field Test Data Logging',
    traditional: 'Handwritten paper registers, manually typed into spreadsheets later.',
    ouantum: 'Direct BLE sensor streaming locked with SHA-256 cryptographic hashes and GPS.',
  },
  {
    aspect: 'Quality Dispute Resolution',
    traditional: 'Subjective contractor vs engineer arguments; blocked milestone escrow.',
    ouantum: 'Deterministic IS 456 and MoRTH rules engine producing zero-dispute consensus.',
  },
  {
    aspect: 'Internal Defect Detection',
    traditional: 'Visual inspection + destructive core drilling that weakens sound concrete.',
    ouantum: 'Non-destructive acoustic UPV tomography scanning 100% of internal volume.',
  },
  {
    aspect: 'Durability & Asset Health',
    traditional: 'Reactive repairs after visible rust stains and concrete spalling appear.',
    ouantum: '50-year predictive Fickian diffusion simulation under IS 456 Annexure B.',
  },
];

const Solutions: React.FC = () => {
  useSEO({
    title: 'What We Solve in Construction | Civil AI Solutions | OUANTUM',
    description:
      'See the critical construction problems OUANTUM solves: 28-day curing delays, fraudulent paper logs, contractor-client milestone disputes, and subsurface concrete voids.',
    keywords:
      'construction problems solved, concrete curing delays, formwork stripping software, NDT fraud prevention, MoRTH compliance automation, IS 456 civil AI',
    canonicalPath: '/solutions',
    jsonLd: [organizationSchema],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main
      className="subpage-wrapper"
      style={{
        background: '#ffffff',
        color: '#111111',
        fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        minHeight: '100vh',
        paddingBottom: '0',
      }}
    >
      {/* ── HERO SECTION ── */}
      <section
        style={{
          paddingTop: 'clamp(48px, 6vw, 76px)',
          paddingBottom: 'clamp(32px, 4vw, 48px)',
          background: '#ffffff',
          paddingLeft: '16px',
          paddingRight: '16px',
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto', width: '100%' }}>
          <div style={{ maxWidth: '880px' }}>
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                fontSize: 'clamp(2.4rem, 4.8vw, 3.8rem)',
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                color: '#111111',
                margin: '0 0 16px 0',
              }}
            >
              The critical construction bottlenecks OUANTUM eliminates.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              style={{
                fontSize: 'clamp(1rem, 1.4vw, 1.15rem)',
                lineHeight: 1.6,
                color: '#4b5563',
                margin: 0,
              }}
            >
              Civil infrastructure projects lose billions to 28-day curing delays, fraudulent field testing data, contractor-client disputes, and undetected structural voids. Explore our 5 dedicated solution systems below.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── 5 DEDICATED SOLUTION CARDS (Warm cream #f4f3ec matching other cards) ── */}
      <section
        style={{
          padding: '24px 16px 56px',
          background: '#ffffff',
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto', width: '100%' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '32px',
            }}
          >
            {CONSTRUCTION_SOLUTIONS.map((sol) => (
              <div
                key={sol.id}
                id={sol.id}
                style={{
                  padding: 'clamp(28px, 4vw, 44px)',
                  borderRadius: 0,
                  border: '1px solid rgba(0, 0, 0, 0.07)',
                  background: '#f4f3ec',
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '40px',
                    alignItems: 'center',
                  }}
                >
                  {/* Left Column: Solution Details */}
                  <div>
                    <h2
                      style={{
                        fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
                        fontWeight: 400,
                        lineHeight: 1.2,
                        letterSpacing: '-0.02em',
                        color: '#111111',
                        margin: '0 0 12px 0',
                      }}
                    >
                      {sol.title}
                    </h2>
                    <p
                      style={{
                        fontSize: '1rem',
                        fontWeight: 500,
                        color: '#111111',
                        lineHeight: 1.5,
                        margin: '0 0 16px 0',
                      }}
                    >
                      {sol.heroHeadline}
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
                      <p style={{ fontSize: '0.925rem', color: '#4b5563', lineHeight: 1.6, margin: 0 }}>
                        <strong style={{ color: '#111111' }}>Bottleneck: </strong>
                        {sol.thePain}
                      </p>
                      <p style={{ fontSize: '0.925rem', color: '#4b5563', lineHeight: 1.6, margin: 0 }}>
                        <strong style={{ color: '#111111' }}>OUANTUM Platform: </strong>
                        {sol.theSolution}
                      </p>
                    </div>

                    {/* Impact Metrics Row in Mini-Cards */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                        gap: '16px',
                        marginBottom: '28px',
                      }}
                    >
                      {sol.impactMetrics.map((kpi, idx) => (
                        <div
                          key={idx}
                          style={{
                            padding: '12px 14px',
                            border: '1px solid rgba(0, 0, 0, 0.06)',
                            background: '#ffffff',
                            borderRadius: 0,
                          }}
                        >
                          <div style={{ fontSize: '1.35rem', fontWeight: 500, color: '#111111', letterSpacing: '-0.02em' }}>
                            {kpi.value}
                          </div>
                          <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>{kpi.label}</div>
                        </div>
                      ))}
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                      <Link
                        to={`/solutions/${sol.id}`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '12px 24px',
                          fontSize: '0.925rem',
                          fontWeight: 600,
                          borderRadius: 0,
                          background: '#111111',
                          color: '#ffffff',
                          textDecoration: 'none',
                        }}
                      >
                        <span>Explore Dedicated Page</span>
                        <ArrowUpRight size={15} />
                      </Link>
                      <Link
                        to="/contact"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '12px 20px',
                          fontSize: '0.925rem',
                          fontWeight: 600,
                          borderRadius: 0,
                          background: '#ffffff',
                          color: '#111111',
                          border: '1px solid #111111',
                          textDecoration: 'none',
                        }}
                      >
                        Request Demonstration
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: Visual Preview */}
                  <div
                    style={{
                      width: '100%',
                      aspectRatio: '16 / 10',
                      borderRadius: 0,
                      overflow: 'hidden',
                      background: '#ffffff',
                      border: '1px solid rgba(0, 0, 0, 0.08)',
                    }}
                  >
                    <img
                      src={sol.image}
                      alt={sol.imageAlt}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BEFORE VS AFTER EVALUATION (Structured HTML Table with #f4f3ec container) ── */}
      <section
        style={{
          padding: '40px 16px 64px',
          background: '#ffffff',
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto', width: '100%' }}>
          <div style={{ maxWidth: '780px', marginBottom: '28px' }}>
            <h2
              style={{
                fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                color: '#111111',
                margin: '0 0 10px 0',
              }}
            >
              Traditional Construction vs. The OUANTUM Way
            </h2>
          </div>

          <div style={{ overflowX: 'auto', border: '1px solid rgba(0, 0, 0, 0.08)', borderRadius: 0, background: '#f4f3ec' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#ebeae3', borderBottom: '1px solid rgba(0, 0, 0, 0.08)' }}>
                  <th style={{ padding: '16px 20px', fontSize: '0.825rem', fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Evaluation Aspect
                  </th>
                  <th style={{ padding: '16px 20px', fontSize: '0.825rem', fontWeight: 700, color: '#991b1b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Traditional Construction Practice
                  </th>
                  <th style={{ padding: '16px 20px', fontSize: '0.825rem', fontWeight: 700, color: '#166534', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    The OUANTUM Intelligence Standard
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISONS.map((comp, idx) => (
                  <tr
                    key={idx}
                    style={{
                      borderBottom: idx === COMPARISONS.length - 1 ? 'none' : '1px solid rgba(0, 0, 0, 0.06)',
                      background: idx % 2 === 0 ? '#ffffff' : '#faf9f3',
                    }}
                  >
                    <td style={{ padding: '16px 20px', fontSize: '0.9rem', fontWeight: 600, color: '#111111' }}>
                      {comp.aspect}
                    </td>
                    <td style={{ padding: '16px 20px', fontSize: '0.875rem', color: '#6b7280', lineHeight: 1.55 }}>
                      {comp.traditional}
                    </td>
                    <td style={{ padding: '16px 20px', fontSize: '0.875rem', color: '#15803d', fontWeight: 500, lineHeight: 1.55 }}>
                      {comp.ouantum}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── BOTTOM ENTERPRISE CTA (No filter in card bg, text filled in pure white properly) ── */}
      <section
        className="ic-bottom-cta-section deploy-cta-section"
        style={{
          padding: '24px 16px 80px',
          background: '#ffffff',
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto', width: '100%' }}>
          <div
            className="deploy-cta-card"
            style={{
              position: 'relative',
              overflow: 'hidden',
              backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/assets/images/buildings/card_building/image.webp')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              borderRadius: 0,
              border: '1px solid rgba(0, 0, 0, 0.08)',
              padding: 'clamp(64px, 8vw, 100px) 24px',
              textAlign: 'center',
              color: '#ffffff',
              filter: 'none',
            }}
          >
            <div style={{ maxWidth: '780px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
              <div
                role="heading"
                aria-level={2}
                className="deploy-cta-heading"
                style={{
                  fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                  fontWeight: 600,
                  lineHeight: 1.15,
                  margin: '0 auto 16px',
                  color: '#ffffff',
                  WebkitTextFillColor: '#ffffff',
                  WebkitTextStroke: '0px transparent',
                  WebkitTextStrokeWidth: '0px',
                  textAlign: 'center',
                  letterSpacing: '-0.02em',
                  textShadow: '0 2px 14px rgba(0, 0, 0, 0.95), 0 4px 28px rgba(0, 0, 0, 0.9)',
                }}
              >
                Deploy OUANTUM on Your Next Pour
              </div>
              <p
                className="deploy-cta-paragraph"
                style={{
                  fontSize: 'clamp(0.95rem, 1.25vw, 1.1rem)',
                  color: '#ffffff',
                  WebkitTextFillColor: '#ffffff',
                  lineHeight: 1.6,
                  margin: '0 auto 36px',
                  textAlign: 'center',
                  maxWidth: '680px',
                  textShadow: '0 1px 8px rgba(0, 0, 0, 0.9)',
                }}
              >
                Brief our autonomous civil engineer OX1, connect your digital probes over BLE, and eliminate compliance bottlenecks across every highway, metro, and bridge contract.
              </p>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  gap: '14px',
                }}
              >
                <Link
                  to="/products/ox1"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '14px 28px',
                    borderRadius: 0,
                    background: '#ffffff',
                    color: '#111111',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  Explore OX1 Platform
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/contact"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '14px 28px',
                    borderRadius: 0,
                    background: '#000000',
                    backgroundColor: '#000000',
                    color: '#ffffff',
                    border: '1px solid #ffffff',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  Request Field Demonstration
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Solutions;
