import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight } from 'lucide-react';
import useSEO from '../hooks/useSEO';
import DualArchMarquee from '../components/why-choose/DualArchMarquee';

// =========================================================================
// HERO SECTION DUAL ARCH MARQUEE CONFIGURATION (DESKTOP)
// Tune card scale, spacing/gap between cards, axis positions, and speed here:
// =========================================================================
export const DUAL_ARCH_HERO_PARAMS = {
  /** Card Scale Multiplier: easily increase or decrease image card dimensions (1.0 = normal, 1.15 = +15%, 1.35 = +35%) */
  cardScale: 1.15,
  /** Base Card Width on Desktop (pixels) */
  cardWidth: 92,
  /** Base Card Height on Desktop (pixels) */
  cardHeight: 92,

  /** Card Spacing Multiplier: increase to widen the gap between cards along the arch (e.g. 1.35 = wide gap, 1.7 = extra wide gap) */
  cardSpacing: 1.2,
  /** Additional angular gap between cards in degrees (default: 0) */
  cardGap: 1,

  /** Horizontal (X-Axis) Offset: positive moves arches inward toward center, negative moves outward */
  axisXOffset: -60,
  /** Vertical (Y-Axis) Offset: positive shifts arches downward, negative shifts upward */
  axisYOffset: 0,

  /** Independent Left Arch horizontal offset (pixels) */
  leftArchXOffset: 0,
  /** Independent Right Arch horizontal offset (pixels) */
  rightArchXOffset: 0,
  /** Independent Left Arch vertical offset (pixels) */
  leftArchYOffset: 0,
  /** Independent Right Arch vertical offset (pixels) */
  rightArchYOffset: 0,

  /** Inward reach / bow depth of arch apex from screen edge in pixels (default: 285) */
  inwardReach: 285,
  /** Speed of upward infinite marquee motion */
  speed: 0.38,
  /** Completely hide and disable the marquee in mobile view (< 768px) */
  hideOnMobile: true,
};

const BASE_URL = 'https://ouantum.com';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'OUANTUM',
  url: BASE_URL,
  sameAs: ['https://www.linkedin.com/company/ouantum/'],
};

interface DifferenceItem {
  id: string;
  image?: string;
  badge: string;
  title: string;
  tagline: string;
  description: string;
  structuralPhysics: string;
  codalRef: string;
  deliverables: string[];
}

const PARADIGM_ITEMS: DifferenceItem[] = [
  {
    id: 'context',
    image: '/assets/images/buildings/building-5.png',
    badge: 'STRUCTURAL CONTEXT',
    title: 'CONTEXT IS EVERYTHING',
    tagline: 'A reading of 32 means something completely different across environments.',
    description:
      'Most software packages treat non-destructive testing as a simple lookup table. In real civil engineering, a rebound index of 32 on a 30-year-old coastal pier undergoing marine chloride attack indicates severe surface carbonation over degraded core concrete. The same 32 on an inland M25 column cast 5 days ago indicates an exceptional early-strength pour.',
    structuralPhysics:
      'OUANTUM requires and contextualizes concrete age, surface carbonation depth, moisture saturation index, aggregate geology, and exposure category (Mild to Extreme as per IS 456 Table 3) before any compressive strength is computed.',
    codalRef: 'IS 13311 (Part 2): Clause 4.3 & IS 456:2000 Table 3 (Environmental Exposure)',
    deliverables: [
      'Automatic correction for moisture conditions and carbonation depth',
      'Plunger angle orientation calibration (+90° down, 0° horizontal, -90° overhead)',
      'Specific aggregate geology calibration (basalt, granite, quartzite, limestone)',
    ],
  },
  {
    id: 'variables',
    image: '/assets/images/buildings/building-11.png',
    badge: 'STRICT GOVERNANCE',
    title: 'VARIABLES ARE MANDATORY',
    tagline: 'The system strictly refuses to output a result without full structural context.',
    description:
      'Spreadsheets and generic forms permit engineers to skip input fields, producing vanity numbers with zero legal or technical validity. OUANTUM enforces strict programmatic field governance: if moisture state, probe angle, structural component geometry, or concrete grade are missing, inference execution halts.',
    structuralPhysics:
      'Eliminating garbage-in, garbage-out. By enforcing required structural parameters directly at the Bluetooth BLE ingestion layer, every calculated Megapascal (MPa) is legally and mathematically auditable under cross-examination.',
    codalRef: 'ISO 9001:2015 Clause 8.5.2 (Traceability) & IS 456:2000 Clause 15.2',
    deliverables: [
      'Zero-tolerance data validation on job-site edge terminals',
      'Mandatory geofenced GPS spatial tags and automated timestamp locks',
      'Digital sensor serial number verification preventing counterfeit hardware use',
    ],
  },
  {
    id: 'physics',
    badge: 'EMBEDDED ENGINEERING',
    title: 'EMBEDDED CIVIL PHYSICS',
    tagline: '30-year structural engineering decision trees codified directly into software.',
    description:
      'Generic AI models generate hallucinated answers based on text probability. OUANTUM does not guess. Our engine codifies exact deterministic mathematical algorithms, acoustic wave inversion physics, in-situ concrete maturity curves, and full codal compliance clauses into runtime logic.',
    structuralPhysics:
      'Translating IS 456:2000, IS 13311 (Parts 1 & 2), MoRTH 5th Revision Section 1700, and IRC:SP:47 into automated deterministic validation pipelines that execute without human bias or transcription tampering.',
    codalRef: 'MoRTH 5th Revision Section 1700 & IRC:SP:47 (Quality Systems for Highways)',
    deliverables: [
      'Deterministic calculations matching manual consultant audits to 0.01 MPa',
      'Automatic flagging of suspect zones requiring localized core extraction',
      'Complete mathematical derivation traces provided in every PDF report',
    ],
  },
  {
    id: 'consensus',
    image: '/assets/images/buildings/building-2.png',
    badge: 'MULTI-MODEL CONSENSUS',
    title: 'NEVER RELY ON A SINGLE PROBE',
    tagline: 'Cross-verifying SonReb, UPV acoustic waves, and physical core crushing.',
    description:
      'A rebound hammer only probes the top 25mm carbonated skin. Ultrasonic Pulse Velocity (UPV) transmits through the bulk cross-section but is sensitive to internal steel rebar paths. Relying on either one alone yields up to 35% error. OUANTUM correlates both concurrently using tripartite SonReb consensus matrices.',
    structuralPhysics:
      'When SonReb cross-checks correlate with historical laboratory core crushing curves, prediction variance drops below 0.6%, providing absolute certainty before formwork is stripped or spans are pre-stressed.',
    codalRef: 'ASTM C805 / C597 & RILEM TC 43-CND Tripartite Consensus Standards',
    deliverables: [
      'Combined Ultrasonic Pulse Velocity and Rebound Index correlation (SonReb)',
      'Correction for rebar velocity influence based on 3D covermeter telemetry',
      'Statistical standard deviation and characteristic strength (fck) validation',
    ],
  },
];

interface ComparisonRow {
  dimension: string;
  traditional: string;
  genericApps: string;
  ouantum: string;
}

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    dimension: 'Field Data Ingestion',
    traditional: 'Handwritten paper notebooks, prone to rain damage & illegible logs',
    genericApps: 'Manual typing into generic forms, prone to transcription typos',
    ouantum: 'Direct wireless Bluetooth BLE streaming from digital Schmidt hammers & UPV probes',
  },
  {
    dimension: 'Data Integrity & Fraud Prevention',
    traditional: 'None. Test results can be forged or fabricated post-hoc',
    genericApps: 'Standard user login only. Timestamps and values can be edited',
    ouantum: '100% Tamper-Evident SHA-256 cryptographic hashes with GPS geofence locking',
  },
  {
    dimension: 'Codal Validation Engine',
    traditional: 'Manual lookup tables in paper IS code booklets weeks later',
    genericApps: 'Basic spreadsheet formulas with no contextual rule validation',
    ouantum: 'Programmatic validation engine for IS 456, IS 13311, MoRTH 1700, & IRC:SP:47',
  },
  {
    dimension: 'Audit Package Turnaround',
    traditional: '14 to 28 days waiting for water-cured laboratory core crush tests',
    genericApps: '3 to 7 days for consultants to compile and format Excel sheets',
    ouantum: 'Sub-4-Hour Same-Day Turnaround with authoritative TPQM-ready digital reports',
  },
  {
    dimension: 'Sensor Correlation Methodology',
    traditional: 'Single-sensor guesswork (rebound hammer only or visual survey)',
    genericApps: 'Arithmetic averaging ignoring carbonation and rebar influence',
    ouantum: 'Deterministic Multi-Model Consensus (SonReb + UPV acoustic waves + Core calibration)',
  },
  {
    dimension: 'Job-Site Offline Execution',
    traditional: 'Paper works offline but creates an unbearable transcription backlog',
    genericApps: 'Breaks or fails completely in deep basements, tunnels, & remote piers',
    ouantum: 'Full Edge-First architecture; neural models run offline on-device with zero lag',
  },
  {
    dimension: 'Formwork Stripping Authorization',
    traditional: 'Conservative 14 to 28 days lockup, wasting shuttering rental capital',
    genericApps: 'Unverified estimates risking catastrophic structural collapse',
    ouantum: 'In-situ maturity curve + early SonReb authorizes safe stripping in 3 to 5 days',
  },
  {
    dimension: 'Dispute Resolution & Legal Defense',
    traditional: 'Subjective contractor-authority blame games and vigilance inquiries',
    genericApps: 'Unauthenticated spreadsheets rejected by national vigilance auditors',
    ouantum: 'Indisputable mathematical audit trails with verified cryptographic signatures',
  },
];

interface RoleBenefit {
  role: string;
  headline: string;
  summary: string;
  points: string[];
}

const ROLE_BENEFITS: RoleBenefit[] = [
  {
    role: 'EPC Concessionaires & Project Directors',
    headline: 'Accelerate Cash Flow & Strip Formwork 30% Faster',
    summary:
      'Avoid costly liquidated damages, unlock project milestone payments early, and optimize expensive shuttering rental inventories across capital packages.',
    points: [
      'Safely strip pier and slab shuttering in 3 to 5 days instead of waiting 28 days',
      'Eliminate contractor-authority payment disputes on IS code compliance',
      'Real-time executive oversight across multi-package highway and metro corridors',
    ],
  },
  {
    role: 'TPQM Agencies & Quality Managers',
    headline: '100% Tamper-Evident Audits Defendable Under Vigilance',
    summary:
      'Transform manual inspection into an impenetrable, automated quality assurance workflow that withstands government and institutional cross-examination.',
    points: [
      'Direct Bluetooth BLE ingestion prevents rogue field technicians from faking logs',
      'Standardized automated PDF packages generated same-day with complete derivations',
      'Zero vigilance inquiries or audit citations across 140+ verified public packages',
    ],
  },
  {
    role: 'Structural Consultants & Forensic Engineers',
    headline: 'Full Mathematical Transparency & Acoustic Tomography',
    summary:
      'Access raw acoustic wave traces, SonReb correlation matrices, and spatial defect mapping without relying on black-box software assumptions.',
    points: [
      'Comprehensive acoustic velocity tomography pinpointing tendon duct voids & honeycombing',
      'Peer-reviewed algorithms aligned with RILEM, IS, and ASTM scientific benchmarks',
      'Full exportability into 3D BIM/IFC models and structural simulation software',
    ],
  },
  {
    role: 'National & State Highway Authorities (NHAI, Metros)',
    headline: 'Real-Time Corridor Health & Public Asset Protection',
    summary:
      'Maintain an unbroken digital thread of quality records across the entire construction lifecycle, ensuring 50-year structural resilience for public assets.',
    points: [
      'Corridor-wide quality dashboards tracking concrete performance across contractors',
      'Predictive 50-year service life modeling for chloride diffusion and corrosion risk',
      'Permanent cryptographic digital twin preserved for post-handover asset management',
    ],
  },
];

interface FAQItem {
  q: string;
  a: string;
}

const FAQS: FAQItem[] = [
  {
    q: 'How does OUANTUM differ from an internal Python script or Excel spreadsheet?',
    a: 'Excel sheets and Python scripts are static calculators with zero governance: they cannot ingest raw sensor telemetry directly from hardware, cannot prevent unauthorized post-hoc editing, and lack geofenced cryptographic locking. OUANTUM is a full enterprise operating system: it pairs directly via Bluetooth BLE with digital test hammers and UPV transducers, enforces mandatory structural parameters at ingestion, and signs every reading with SHA-256 cryptographic hashes that satisfy national vigilance audit standards.',
  },
  {
    q: 'How does OUANTUM calibrate against regional aggregate variations across India?',
    a: 'Indian concrete uses highly diverse coarse aggregates—from basalt in Maharashtra to granite in Karnataka, quartzite in Northern India, and limestone in Andhra Pradesh. Aggregate hardness significantly shifts both rebound hammer indices and acoustic ultrasonic pulse velocities. OUANTUM maintains regional petrographic calibration libraries and cross-correlates field data against physical core crushing curves to establish site-specific SonReb conversion factors as recommended in IS 13311 (Part 2).',
  },
  {
    q: 'Are OUANTUM compliance packages accepted by NHAI, Metro Rail Corporations, and State PWDs?',
    a: 'Yes. OUANTUM test packages are explicitly drafted around Indian Standard specifications (IS 456:2000, IS 13311 Parts 1 & 2, MoRTH 5th Revision Section 1700, and IRC:SP:47). Every report includes the mathematical equations, raw sensor telemetry traces, calibration coefficients, and cryptographic timestamps that Chief Quality Managers and TPQM authorities require for unconditional milestone acceptance.',
  },
  {
    q: 'Does OUANTUM require cellular internet connectivity on active job sites?',
    a: 'No. The OX1 Edge terminal and mobile applications operate with a 100% Edge-First architecture. All deterministic AI models, SonReb consensus algorithms, and codal rule engines execute locally on the device in offline mode. Field engineers can perform tests in deep tunnel shafts, river gorge viaducts, and remote highway stretches without connectivity. Telemetry queues locally and synchronizes automatically to the cloud once an internet connection is detected.',
  },
  {
    q: 'Does OUANTUM replace certified NDT technicians and structural engineers?',
    a: 'No. OUANTUM is an intelligence amplifier (Copilot), not a replacement for certified engineering judgment. It automates tedious calculations, eliminates manual transcription errors, enforces strict codal governance, and generates standardized reports so that senior structural engineers can focus on critical engineering decisions rather than sorting through paper notebooks.',
  },
];

const WhyChooseOuantum: React.FC = () => {
  useSEO({
    title: 'Why Choose OUANTUM | The Civil Structural AI & NDT Quality Assurance Platform',
    description:
      'Discover why premier EPC concessionaires, structural consultants, and TPQM authorities choose OUANTUM for deterministic civil infrastructure intelligence, same-day codal compliance, and zero-trust verification.',
    keywords:
      'why choose ouantum, civil structural AI, deterministic NDT quality assurance, SonReb consensus, IS 456 compliance automation, TPQM India, tamper-proof civil telemetry, EPC concrete quality',
    canonicalPath: '/why-choose-ouantum',
    jsonLd: [organizationSchema],
  });

  const [activeParadigm, setActiveParadigm] = useState<string>('context');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="why-ouantum-page" style={{ backgroundColor: '#ffffff', color: '#111111', minHeight: '100vh', fontFamily: 'var(--ic-font-sans)' }}>
      {/* Explicit style block ensuring absolute center alignment across all screen sizes */}
      <style>{`
        .why-ouantum-page,
        .why-ouantum-page .why-section {
          text-align: center;
        }
        .why-ouantum-page .why-section-header,
        .why-ouantum-page .why-section-header * {
          text-align: center !important;
          margin-left: auto !important;
          margin-right: auto !important;
        }
        html body .why-ouantum-page .why-hero-section .why-hero-title,
        html body .why-hero-title,
        .why-ouantum-page h1,
        .why-ouantum-page h2,
        .why-ouantum-page .why-hero-title,
        .why-ouantum-page .why-section-title {
          text-align: center !important;
          margin-left: auto !important;
          margin-right: auto !important;
          display: block !important;
          width: 100% !important;
        }
        .why-ouantum-page .why-section-subtext {
          text-align: center !important;
          margin-left: auto !important;
          margin-right: auto !important;
          display: block !important;
        }
        .why-ouantum-page .why-eyebrow {
          text-align: center !important;
          margin-left: auto !important;
          margin-right: auto !important;
          display: block !important;
        }
        .why-ouantum-page .why-cta-headline {
          color: #ffffff !important;
          -webkit-text-fill-color: #ffffff !important;
          -webkit-text-stroke: 0px transparent !important;
          -webkit-text-stroke-width: 0px !important;
          font-weight: 500 !important;
          text-shadow: 0 2px 14px rgba(0, 0, 0, 0.6) !important;
        }
        @media (max-width: 767px) {
          .dual-arch-marquee-container {
            display: none !important;
          }
          .why-hero-center-content {
            margin: 0 auto !important;
            text-align: center !important;
            align-items: center !important;
            width: 100% !important;
          }
          html body .why-hero-title,
          .why-hero-title {
            text-align: center !important;
            margin-left: auto !important;
            margin-right: auto !important;
            width: 100% !important;
            display: block !important;
          }
        }
      `}</style>

      {/* ── 1. Hero Section (Framed by Left and Right Upward Moving Arch Marquees) ── */}
      <section
        className="why-section why-hero-section"
        style={{
          position: 'relative',
          minHeight: 'clamp(580px, 82vh, 760px)',
          padding: 'clamp(64px, 8vw, 96px) 24px 64px',
          background: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          borderBottom: 'none',
        }}
      >
        {/* Left and Right Arch Marquees with customizable gap, scale, axis positions, and mobile hiding */}
        <DualArchMarquee {...DUAL_ARCH_HERO_PARAMS} />

        {/* Central Content Cleanly Nestled Between the Two Arches */}
        <div
          className="why-hero-center-content"
          style={{
            maxWidth: '740px',
            margin: '0 auto',
            width: '100%',
            position: 'relative',
            zIndex: 10,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pointerEvents: 'auto',
          }}
        >
          <span
            className="why-eyebrow"
            style={{
              fontSize: '0.8125rem',
              fontFamily: 'var(--ic-font-mono)',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#6a7282',
              display: 'inline-block',
              margin: '0 auto 16px',
            }}
          >
            Deterministic Quality Assurance Platform
          </span>

          <h1
            className="why-hero-title"
            style={{
              fontSize: 'clamp(2.1rem, 4.2vw, 3.5rem)',
              fontWeight: 400,
              lineHeight: 1.12,
              color: '#111111',
              letterSpacing: '-0.025em',
              margin: '0 auto 18px',
              textAlign: 'center',
              width: '100%',
              display: 'block',
              fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            }}
          >
            Why Premier Infrastructure Teams Choose OUANTUM
          </h1>

          <p
            className="why-hero-subtext"
            style={{
              fontSize: 'clamp(1rem, 1.25vw, 1.125rem)',
              lineHeight: 1.65,
              color: '#4b5563',
              margin: '0 auto 32px',
              textAlign: 'center',
              maxWidth: '660px',
            }}
          >
            Civil infrastructure quality assurance is not a spreadsheet problem — it is a multi-variable contextual physics challenge. Premier EPC concessionaires, consultants, and TPQM authorities trust OUANTUM to eliminate test tampering, payment disputes, and 28-day curing delays.
          </p>

          {/* Action CTAs */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '28px',
            }}
          >
            <Link
              to="/contact?subject=Technical%20Audit%20Request"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 28px',
                borderRadius: '0px',
                background: '#111111',
                color: '#ffffff',
                fontSize: '0.925rem',
                fontWeight: 600,
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.12)',
              }}
            >
              Schedule Technical Audit
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/products/ox1"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 26px',
                borderRadius: '0px',
                background: '#ffffff',
                color: '#111111',
                border: '1px solid #111111',
                fontSize: '0.925rem',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Meet OX1 Platform
            </Link>
          </div>

          {/* Key Assurance Tags */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px 20px',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.8125rem',
              color: '#6a7282',
              fontFamily: 'var(--ic-font-mono)',
            }}
          >
            <span>• 100% Codified IS Standards</span>
            <span>• Sub-4-Hour Same-Day Verification</span>
            <span>• Cryptographic Audit Defense</span>
          </div>
        </div>
      </section>

      {/* 4 Proof Metric Cards Strip */}
      <section style={{ padding: '0 16px 56px', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', width: '100%' }}>
          {/* 4 Proof Metric Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '20px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                backgroundColor: '#faf9f6',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                borderRadius: '0px',
                padding: '28px 24px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '2.5rem', fontWeight: 600, color: '#111111', fontFamily: "'Saans', sans-serif", letterSpacing: '-0.02em', lineHeight: 1.1, textAlign: 'center' }}>
                99.4%
              </div>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#111111', marginTop: '8px', textTransform: 'uppercase', letterSpacing: '0.04em', textAlign: 'center' }}>
                Correlation Accuracy
              </div>
              <p style={{ fontSize: '0.85rem', color: '#6a7282', marginTop: '6px', lineHeight: 1.5, margin: 0, textAlign: 'center' }}>
                Across 15,000+ validated concrete test batches verified against physical core crushes.
              </p>
            </div>

            <div
              style={{
                backgroundColor: '#faf9f6',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                borderRadius: '0px',
                padding: '28px 24px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '2.5rem', fontWeight: 600, color: '#111111', fontFamily: "'Saans', sans-serif", letterSpacing: '-0.02em', lineHeight: 1.1, textAlign: 'center' }}>
                &lt; 4 Hours
              </div>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#111111', marginTop: '8px', textTransform: 'uppercase', letterSpacing: '0.04em', textAlign: 'center' }}>
                Same-Day Turnaround
              </div>
              <p style={{ fontSize: '0.85rem', color: '#6a7282', marginTop: '6px', lineHeight: 1.5, margin: 0, textAlign: 'center' }}>
                Instant automated TPQM compliance certificates replacing 14 to 28 days of lab waiting.
              </p>
            </div>

            <div
              style={{
                backgroundColor: '#faf9f6',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                borderRadius: '0px',
                padding: '28px 24px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '2.5rem', fontWeight: 600, color: '#111111', fontFamily: "'Saans', sans-serif", letterSpacing: '-0.02em', lineHeight: 1.1, textAlign: 'center' }}>
                140+
              </div>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#111111', marginTop: '8px', textTransform: 'uppercase', letterSpacing: '0.04em', textAlign: 'center' }}>
                Corridor Packages
              </div>
              <p style={{ fontSize: '0.85rem', color: '#6a7282', marginTop: '6px', lineHeight: 1.5, margin: 0, textAlign: 'center' }}>
                Deployed across national highway packages, metro viaducts, and capital megaprojects.
              </p>
            </div>

            <div
              style={{
                backgroundColor: '#faf9f6',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                borderRadius: '0px',
                padding: '28px 24px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '2.5rem', fontWeight: 600, color: '#111111', fontFamily: "'Saans', sans-serif", letterSpacing: '-0.02em', lineHeight: 1.1, textAlign: 'center' }}>
                100%
              </div>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#111111', marginTop: '8px', textTransform: 'uppercase', letterSpacing: '0.04em', textAlign: 'center' }}>
                Cryptographic Integrity
              </div>
              <p style={{ fontSize: '0.85rem', color: '#6a7282', marginTop: '6px', lineHeight: 1.5, margin: 0, textAlign: 'center' }}>
                SHA-256 immutable geostamped records eliminating manual testing fraud and paper logs.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. The Core Paradigm Shift (Interactive Deep Dive) ── */}
      <section className="why-section" style={{ padding: '80px 24px', backgroundColor: '#ffffff', border: 'none', textAlign: 'center' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', textAlign: 'center' }}>
          <div className="why-section-header" style={{ textAlign: 'center', maxWidth: '880px', margin: '0 auto 50px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span
              className="why-eyebrow"
              style={{
                fontSize: '0.78125rem',
                fontFamily: 'var(--ic-font-mono)',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#6a7282',
                textAlign: 'center',
                display: 'block',
                margin: '0 auto 12px',
              }}
            >
              First Principles of Civil AI
            </span>
            <h2
              className="why-section-title"
              style={{
                fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontSize: 'clamp(2rem, 3.6vw, 3.25rem)',
                fontWeight: 400,
                color: '#111111',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                margin: '0 auto 18px',
                textAlign: 'center',
                display: 'block',
                width: '100%',
              }}
            >
              Not a Data Problem. A Structural Judgment Problem.
            </h2>
            <p
              className="why-section-subtext"
              style={{
                fontSize: '1.0625rem',
                color: '#4a5565',
                lineHeight: 1.6,
                margin: '0 auto',
                textAlign: 'center',
                display: 'block',
                maxWidth: '780px',
              }}
            >
              Generic AI models and standard software treat concrete testing like generic database rows. Real civil engineering requires multi-variable validation, environmental exposure checks, and codified physics.
            </p>
          </div>

          {/* Interactive Navigation Pills */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '36px' }}>
            {PARADIGM_ITEMS.map((item) => {
              const isSelected = activeParadigm === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveParadigm(item.id)}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '9999px',
                    border: isSelected ? '1px solid #111111' : '1px solid rgba(0, 0, 0, 0.1)',
                    backgroundColor: isSelected ? '#111111' : '#ffffff',
                    color: isSelected ? '#ffffff' : '#111111',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {item.title}
                </button>
              );
            })}
          </div>

          {/* Active Paradigm Card - no one-side stroke effect */}
          {(() => {
            const current = PARADIGM_ITEMS.find((p) => p.id === activeParadigm) || PARADIGM_ITEMS[0];
            return (
              <div
                style={{
                  backgroundColor: '#faf9f6',
                  borderRadius: '0px',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  padding: '44px 48px',
                  boxShadow: '0 12px 32px rgba(0, 0, 0, 0.04)',
                  textAlign: 'left',
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'center' }}>
                  <div>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: '#6a7282',
                        letterSpacing: '0.08em',
                        fontFamily: 'var(--ic-font-mono)',
                        textTransform: 'uppercase',
                      }}
                    >
                      {current.badge}
                    </span>
                    <h3
                      style={{
                        fontFamily: "'Saans', sans-serif",
                        fontSize: 'clamp(1.75rem, 2.5vw, 2.25rem)',
                        fontWeight: 500,
                        color: '#111111',
                        margin: '8px 0 16px',
                        lineHeight: 1.2,
                        letterSpacing: '-0.015em',
                      }}
                    >
                      {current.tagline}
                    </h3>
                    <p style={{ fontSize: '1rem', color: '#4a5565', lineHeight: 1.7, marginBottom: '20px' }}>
                      {current.description}
                    </p>
                    {/* Codal Standard Box - clean border, no one-sided stroke */}
                    <div
                      style={{
                        backgroundColor: '#ffffff',
                        borderRadius: '0px',
                        padding: '16px 20px',
                        border: '1px solid rgba(0, 0, 0, 0.08)',
                        marginBottom: '24px',
                      }}
                    >
                      <div style={{ fontSize: '0.78125rem', fontWeight: 700, color: '#111111', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px' }}>
                        Codal Standard Enforcement
                      </div>
                      <div style={{ fontSize: '0.9rem', color: '#4a5565' }}>
                        {current.codalRef}
                      </div>
                    </div>
                  </div>

                  <div>
                    {current.image && (
                      <div
                        style={{
                          width: '100%',
                          aspectRatio: '16 / 9',
                          borderRadius: '0px',
                          overflow: 'hidden',
                          marginBottom: '20px',
                          border: '1px solid rgba(0, 0, 0, 0.08)',
                          background: '#eae6dc',
                        }}
                      >
                        <img
                          src={current.image}
                          alt={current.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                          }}
                        />
                      </div>
                    )}
                    <div
                      style={{
                        backgroundColor: '#ffffff',
                        borderRadius: '0px',
                        padding: '32px',
                        border: '1px solid rgba(0, 0, 0, 0.06)',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.03)',
                      }}
                    >
                      <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#111111', marginBottom: '16px' }}>
                        Structural Physics Guarantees
                      </div>
                      <p style={{ fontSize: '0.925rem', color: '#4a5565', lineHeight: 1.6, marginBottom: '24px' }}>
                        {current.structuralPhysics}
                      </p>
                      <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#6a7282', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
                        Automated Deliverables:
                      </div>
                      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {current.deliverables.map((item, idx) => (
                          <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.875rem', color: '#111111' }}>
                            <span style={{ color: '#6a7282', fontWeight: 600 }}>•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* ── 3. Six Uncompromising Enterprise Advantages - center aligned headers ── */}
      <section className="why-section" style={{ padding: '80px 24px', backgroundColor: '#faf9f6', border: 'none', textAlign: 'center' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', textAlign: 'center' }}>
          <div className="why-section-header" style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 60px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span
              className="why-eyebrow"
              style={{
                fontSize: '0.78125rem',
                fontFamily: 'var(--ic-font-mono)',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#6a7282',
                textAlign: 'center',
                display: 'block',
                margin: '0 auto 12px',
              }}
            >
              The OUANTUM Architecture
            </span>
            <h2
              className="why-section-title"
              style={{
                fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontSize: 'clamp(2rem, 3.6vw, 3.25rem)',
                fontWeight: 400,
                color: '#111111',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                margin: '0 auto 18px',
                textAlign: 'center',
                display: 'block',
                width: '100%',
              }}
            >
              Six Uncompromising Enterprise Advantages
            </h2>
            <p
              className="why-section-subtext"
              style={{
                fontSize: '1.0625rem',
                color: '#4a5565',
                lineHeight: 1.6,
                margin: '0 auto',
                textAlign: 'center',
                display: 'block',
                maxWidth: '740px',
              }}
            >
              Engineered from the ground up for high-throughput Indian and international civil structural infrastructure.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              gap: '28px',
              textAlign: 'left',
            }}
          >
            {/* Card 1 */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '0px',
                padding: '36px 32px',
                border: '1px solid rgba(0, 0, 0, 0.07)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ fontSize: '0.78125rem', fontWeight: 700, color: '#6a7282', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                  Speed & Capital Velocity
                </div>
                <h3 style={{ fontFamily: "'Saans', sans-serif", fontSize: '1.35rem', fontWeight: 600, color: '#111111', margin: '0 0 14px' }}>
                  Sub-4-Hour Same-Day Codal Compliance
                </h3>
                <p style={{ fontSize: '0.9375rem', color: '#4a5565', lineHeight: 1.65, margin: 0 }}>
                  Strip shuttering and release pre-stressing tendons in 3 to 5 days using maturity curves and SonReb telemetry instead of sitting idle for 28-day water bath crushing. Cycle formwork 30% faster across casting yards.
                </p>
              </div>
              <div style={{ marginTop: '24px', fontSize: '0.8125rem', fontWeight: 600, color: '#111111' }}>
                Impact: 3.5 Days saved per casting cycle
              </div>
            </div>

            {/* Card 2 */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '0px',
                padding: '36px 32px',
                border: '1px solid rgba(0, 0, 0, 0.07)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ fontSize: '0.78125rem', fontWeight: 700, color: '#6a7282', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                  Fraud Elimination
                </div>
                <h3 style={{ fontFamily: "'Saans', sans-serif", fontSize: '1.35rem', fontWeight: 600, color: '#111111', margin: '0 0 14px' }}>
                  100% Cryptographic SHA-256 Immutability
                </h3>
                <p style={{ fontSize: '0.9375rem', color: '#4a5565', lineHeight: 1.65, margin: 0 }}>
                  Direct Bluetooth BLE sensor pairing eliminates handwritten notebooks and unverified logbooks. Every reading is stamped with GPS spatial coordinates, timestamp locks, and an immutable cryptographic seal that satisfies vigilance audits.
                </p>
              </div>
              <div style={{ marginTop: '24px', fontSize: '0.8125rem', fontWeight: 600, color: '#111111' }}>
                Impact: Zero manual transcription errors or fraud
              </div>
            </div>

            {/* Card 3 */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '0px',
                padding: '36px 32px',
                border: '1px solid rgba(0, 0, 0, 0.07)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ fontSize: '0.78125rem', fontWeight: 700, color: '#6a7282', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                  Physics-Based Consensus
                </div>
                <h3 style={{ fontFamily: "'Saans', sans-serif", fontSize: '1.35rem', fontWeight: 600, color: '#111111', margin: '0 0 14px' }}>
                  Deterministic Multi-Model Consensus
                </h3>
                <p style={{ fontSize: '0.9375rem', color: '#4a5565', lineHeight: 1.65, margin: 0 }}>
                  Never rely on a single fallible hammer strike. OUANTUM harmonizes ultrasonic pulse velocity, rebound hammer indices, surface carbonation, and physical core crushing curves to eliminate contractor-authority disputes.
                </p>
              </div>
              <div style={{ marginTop: '24px', fontSize: '0.8125rem', fontWeight: 600, color: '#111111' }}>
                Impact: 99.4% correlation accuracy with laboratory cores
              </div>
            </div>

            {/* Card 4 */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '0px',
                padding: '36px 32px',
                border: '1px solid rgba(0, 0, 0, 0.07)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ fontSize: '0.78125rem', fontWeight: 700, color: '#6a7282', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                  Field Reliability
                </div>
                <h3 style={{ fontFamily: "'Saans', sans-serif", fontSize: '1.35rem', fontWeight: 600, color: '#111111', margin: '0 0 14px' }}>
                  True Edge-First Offline Autonomy
                </h3>
                <p style={{ fontSize: '0.9375rem', color: '#4a5565', lineHeight: 1.65, margin: 0 }}>
                  Works flawlessly in deep basement pours, sub-sea tunnel segments, river piers, and remote mountain highways without cellular reception. Neural inference runs locally on the OX1 edge hardware with sub-second feedback.
                </p>
              </div>
              <div style={{ marginTop: '24px', fontSize: '0.8125rem', fontWeight: 600, color: '#111111' }}>
                Impact: Zero job-site delays from dead zones
              </div>
            </div>

            {/* Card 5 */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '0px',
                padding: '36px 32px',
                border: '1px solid rgba(0, 0, 0, 0.07)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ fontSize: '0.78125rem', fontWeight: 700, color: '#6a7282', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                  Spatial Intelligence
                </div>
                <h3 style={{ fontFamily: "'Saans', sans-serif", fontSize: '1.35rem', fontWeight: 600, color: '#111111', margin: '0 0 14px' }}>
                  3D BIM & Digital Twin Defect Mapping
                </h3>
                <p style={{ fontSize: '0.9375rem', color: '#4a5565', lineHeight: 1.65, margin: 0 }}>
                  Transform isolated test reports into full 3D spatial twins. Map internal acoustic velocity slices, honeycombing voids, and surface micro-cracks directly onto structural IFC/BIM pier and girder geometries.
                </p>
              </div>
              <div style={{ marginTop: '24px', fontSize: '0.8125rem', fontWeight: 600, color: '#111111' }}>
                Impact: Continuous digital thread from pour to handover
              </div>
            </div>

            {/* Card 6 */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '0px',
                padding: '36px 32px',
                border: '1px solid rgba(0, 0, 0, 0.07)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ fontSize: '0.78125rem', fontWeight: 700, color: '#6a7282', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                  Lifecycle Asset Protection
                </div>
                <h3 style={{ fontFamily: "'Saans', sans-serif", fontSize: '1.35rem', fontWeight: 600, color: '#111111', margin: '0 0 14px' }}>
                  50-Year Predictive Durability Modeling
                </h3>
                <p style={{ fontSize: '0.9375rem', color: '#4a5565', lineHeight: 1.65, margin: 0 }}>
                  Prevent premature structural corrosion before it begins. OUANTUM simulates Fickian chloride diffusion, carbonation front progression, and reinforcement depassivation risk over 50 years to guide preventative maintenance.
                </p>
              </div>
              <div style={{ marginTop: '24px', fontSize: '0.8125rem', fontWeight: 600, color: '#111111' }}>
                Impact: Avoid multi-crore rehabilitation retrofits
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Head-to-Head Comparative Breakdown Table - center aligned headers ── */}
      <section className="why-section" style={{ padding: '80px 24px', backgroundColor: '#ffffff', border: 'none', textAlign: 'center' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', textAlign: 'center' }}>
          <div className="why-section-header" style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 50px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span
              className="why-eyebrow"
              style={{
                fontSize: '0.78125rem',
                fontFamily: 'var(--ic-font-mono)',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#6a7282',
                textAlign: 'center',
                display: 'block',
                margin: '0 auto 12px',
              }}
            >
              Direct Comparison
            </span>
            <h2
              className="why-section-title"
              style={{
                fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontSize: 'clamp(2rem, 3.6vw, 3.25rem)',
                fontWeight: 400,
                color: '#111111',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                margin: '0 auto 18px',
                textAlign: 'center',
                display: 'block',
                width: '100%',
              }}
            >
              How OUANTUM Compares
            </h2>
            <p
              className="why-section-subtext"
              style={{
                fontSize: '1.0625rem',
                color: '#4a5565',
                lineHeight: 1.6,
                margin: '0 auto',
                textAlign: 'center',
                display: 'block',
                maxWidth: '740px',
              }}
            >
              See why leading engineering enterprises replace legacy paper workflows and generic form apps with our purpose-built platform.
            </p>
          </div>

          <div
            style={{
              overflowX: 'auto',
              borderRadius: '0px',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.03)',
            }}
          >
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '780px' }}>
              <thead>
                <tr style={{ backgroundColor: '#faf9f6' }}>
                  <th style={{ padding: '20px 24px', fontSize: '0.875rem', fontWeight: 700, color: '#111111', textTransform: 'uppercase', letterSpacing: '0.05em', width: '22%' }}>
                    Capability Dimension
                  </th>
                  <th style={{ padding: '20px 24px', fontSize: '0.875rem', fontWeight: 600, color: '#6a7282', width: '26%' }}>
                    Traditional Paper Testing
                  </th>
                  <th style={{ padding: '20px 24px', fontSize: '0.875rem', fontWeight: 600, color: '#6a7282', width: '26%' }}>
                    Generic Forms & BI Tools
                  </th>
                  <th style={{ padding: '20px 24px', fontSize: '0.875rem', fontWeight: 700, color: '#111111', backgroundColor: '#f6f5ef', width: '26%' }}>
                    OUANTUM Civil AI Platform
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, idx) => (
                  <tr
                    key={idx}
                    style={{
                      backgroundColor: idx % 2 === 0 ? '#ffffff' : '#faf9f6',
                    }}
                  >
                    <td style={{ padding: '20px 24px', fontSize: '0.875rem', fontWeight: 600, color: '#111111' }}>
                      {row.dimension}
                    </td>
                    <td style={{ padding: '20px 24px', fontSize: '0.85rem', color: '#6a7282', lineHeight: 1.5 }}>
                      {row.traditional}
                    </td>
                    <td style={{ padding: '20px 24px', fontSize: '0.85rem', color: '#6a7282', lineHeight: 1.5 }}>
                      {row.genericApps}
                    </td>
                    <td style={{ padding: '20px 24px', fontSize: '0.875rem', color: '#111111', fontWeight: 600, backgroundColor: '#f6f5ef', lineHeight: 1.5 }}>
                      {row.ouantum}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── 5. Value by Stakeholder Role - center aligned headers ── */}
      <section className="why-section" style={{ padding: '80px 24px', backgroundColor: '#faf9f6', border: 'none', textAlign: 'center' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', textAlign: 'center' }}>
          <div className="why-section-header" style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 50px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span
              className="why-eyebrow"
              style={{
                fontSize: '0.78125rem',
                fontFamily: 'var(--ic-font-mono)',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#6a7282',
                textAlign: 'center',
                display: 'block',
                margin: '0 auto 12px',
              }}
            >
              Engineered For The Ecosystem
            </span>
            <h2
              className="why-section-title"
              style={{
                fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontSize: 'clamp(2rem, 3.6vw, 3.25rem)',
                fontWeight: 400,
                color: '#111111',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                margin: '0 auto 18px',
                textAlign: 'center',
                display: 'block',
                width: '100%',
              }}
            >
              Tailored Value For Every Stakeholder
            </h2>
            <p
              className="why-section-subtext"
              style={{
                fontSize: '1.0625rem',
                color: '#4a5565',
                lineHeight: 1.6,
                margin: '0 auto',
                textAlign: 'center',
                display: 'block',
                maxWidth: '740px',
              }}
            >
              From on-site concessionaires to central authorities, OUANTUM delivers tangible, quantified operational advantages.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
              textAlign: 'left',
            }}
          >
            {ROLE_BENEFITS.map((item, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '0px',
                  padding: '36px 32px',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.03)',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#6a7282', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
                    {item.role}
                  </div>
                  <h3 style={{ fontFamily: "'Saans', sans-serif", fontSize: '1.25rem', fontWeight: 600, color: '#111111', margin: '0 0 12px', lineHeight: 1.3 }}>
                    {item.headline}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: '#4a5565', lineHeight: 1.6, marginBottom: '20px' }}>
                    {item.summary}
                  </p>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {item.points.map((pt, pIdx) => (
                      <li key={pIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.85rem', color: '#111111' }}>
                        <span style={{ color: '#6a7282', fontWeight: 600 }}>•</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ marginTop: '28px' }}>
                  <Link
                    to="/contact"
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: '#111111',
                      textDecoration: 'none',
                    }}
                  >
                    Learn how this applies to your site
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Evaluator Technical FAQ - center aligned headers ── */}
      <section className="why-section" style={{ padding: '80px 16px', backgroundColor: '#ffffff', border: 'none', textAlign: 'center' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', width: '100%', textAlign: 'center' }}>
          <div className="why-section-header" style={{ textAlign: 'center', marginBottom: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span
              className="why-eyebrow"
              style={{
                fontSize: '0.78125rem',
                fontFamily: 'var(--ic-font-mono)',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#6a7282',
                textAlign: 'center',
                display: 'block',
                margin: '0 auto 12px',
              }}
            >
              Common Inquiries
            </span>
            <h2
              className="why-section-title"
              style={{
                fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontSize: 'clamp(2rem, 3.6vw, 3.25rem)',
                fontWeight: 400,
                color: '#111111',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                margin: '0 auto 16px',
                textAlign: 'center',
                display: 'block',
                width: '100%',
              }}
            >
              Frequently Asked Questions
            </h2>
            <p
              className="why-section-subtext"
              style={{
                fontSize: '1.0625rem',
                color: '#4a5565',
                lineHeight: 1.6,
                margin: '0 auto',
                textAlign: 'center',
                display: 'block',
                maxWidth: '740px',
              }}
            >
              Technical, legal, and operational questions answered for engineering leaders evaluating OUANTUM.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', textAlign: 'left' }}>
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#faf9f6',
                    borderRadius: '0px',
                    border: '1px solid rgba(0, 0, 0, 0.07)',
                    overflow: 'hidden',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    style={{
                      width: '100%',
                      padding: '24px 28px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <span style={{ fontFamily: "'Saans', sans-serif", fontSize: '1.0625rem', fontWeight: 600, color: '#111111', paddingRight: '16px' }}>
                      {faq.q}
                    </span>
                    <ChevronDown
                      size={20}
                      style={{
                        color: '#111111',
                        flexShrink: 0,
                        transform: isOpen ? 'rotate(180deg)' : 'none',
                        transition: 'transform 0.2s ease',
                      }}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div style={{ padding: '0 28px 24px', fontSize: '0.9375rem', color: '#4a5565', lineHeight: 1.7 }}>
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 7. Bottom Conversion Banner ── */}
      <section className="why-section" style={{ padding: '60px 24px 90px', backgroundColor: '#ffffff', border: 'none', textAlign: 'center' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', textAlign: 'center' }}>
          <div
            className="why-cta-card"
            style={{
              position: 'relative',
              borderRadius: '0px',
              overflow: 'hidden',
              backgroundImage: 'url(/assets/images/why-choose-cta-bg.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'none',
              WebkitFilter: 'none',
              backdropFilter: 'none',
              padding: '72px 40px',
              textAlign: 'center',
              boxShadow: '0 24px 64px rgba(0, 0, 0, 0.25)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#ffffff',
            }}
          >
            <h2
              className="why-section-title why-cta-headline"
              style={{
                fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontSize: 'clamp(2.1rem, 4vw, 3.4rem)',
                fontWeight: 600,
                color: '#ffffff',
                WebkitTextFillColor: '#ffffff',
                WebkitTextStroke: '0px transparent',
                WebkitTextStrokeWidth: '0px',
                lineHeight: 1.15,
                letterSpacing: '-0.025em',
                maxWidth: '920px',
                margin: '0 auto 20px',
                textAlign: 'center',
                display: 'block',
                width: '100%',
                textShadow: '0 2px 20px rgba(0, 0, 0, 0.9), 0 4px 35px rgba(0, 0, 0, 0.85)',
              }}
            >
              <span style={{ color: '#ffffff', WebkitTextFillColor: '#ffffff', WebkitTextStroke: '0px transparent', WebkitTextStrokeWidth: '0px' }}>
                Ready to eliminate testing fraud, contractor disputes, and 28-day delays?
              </span>
            </h2>

            <p
              className="why-section-subtext"
              style={{
                fontSize: 'clamp(1rem, 1.35vw, 1.18rem)',
                color: '#ffffff',
                WebkitTextFillColor: '#ffffff',
                maxWidth: '700px',
                margin: '0 auto 36px',
                lineHeight: 1.6,
                fontWeight: 400,
                textAlign: 'center',
                display: 'block',
                textShadow: '0 2px 14px rgba(0, 0, 0, 0.9)',
              }}
            >
              <span style={{ color: '#ffffff', WebkitTextFillColor: '#ffffff' }}>
                Deploy the OUANTUM civil structural copilot across your active highway packages, bridge audits, or metro spans.
              </span>
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <Link
                to="/contact"
                style={{
                  backgroundColor: '#ffffff',
                  color: '#111111',
                  fontWeight: 600,
                  fontSize: '0.9375rem',
                  padding: '14px 32px',
                  borderRadius: '9999px',
                  textDecoration: 'none',
                  transition: 'opacity 0.2s ease',
                }}
              >
                Schedule Technical Audit
              </Link>
              <Link
                to="/demo"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: '0.9375rem',
                  padding: '14px 28px',
                  borderRadius: '9999px',
                  textDecoration: 'none',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  transition: 'background 0.2s ease',
                }}
              >
                Launch Test Simulator
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyChooseOuantum;
