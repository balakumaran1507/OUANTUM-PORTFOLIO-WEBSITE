import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowRight, X } from 'lucide-react';
import useSEO from '../hooks/useSEO';
import { ArchMarquee } from '../components/about/ArchMarquee';

const BASE_URL = 'https://ouantum.com';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'OUANTUM',
  url: BASE_URL,
  sameAs: ['https://www.linkedin.com/company/ouantum/'],
  founders: [
    {
      '@type': 'Person',
      name: 'Balakumaran D',
      jobTitle: 'President & Co-founder',
      description: 'Architectural backbone of AI systems at OUANTUM, resolving non-destructive testing physics and deterministic consensus algorithms.',
    },
    {
      '@type': 'Person',
      name: 'Rahul',
      jobTitle: 'Chief Executive Officer & Co-founder',
      description: 'Leads commercial strategy and corridor adoption across national highway packages, metro viaducts, and capital megaprojects.',
    },
  ],
};

export interface ImageTransformConfig {
  /** Horizontal shift in pixels or CSS unit (e.g. 0, 10, -5, '10px', '5%') */
  x?: number | string;
  /** Vertical shift in pixels or CSS unit (e.g. 0, 10, -10, '15px') */
  y?: number | string;
  /** Zoom/scale multiplier (e.g. 1.0 = 100%, 1.1 = 110%, 0.95 = 95%) */
  scale?: number | string;
  /** Object-fit mode: 'cover' (fill card, crop overflow) or 'contain' (display 100% full image without cropping) */
  fit?: 'cover' | 'contain';
  /** CSS object-position (e.g. 'top center', 'bottom center', 'center') */
  position?: string;
}

export interface TeamMember {
  role: string;
  name: string;
  image: string;
  bio: string;
  fullBio: string;
  /** Desktop image transform parameters (viewport > 768px) */
  desktop?: ImageTransformConfig;
  /** Mobile image transform parameters (viewport <= 768px) */
  mobile?: ImageTransformConfig;
  /** Flat fallback aliases for quick edits */
  desktopX?: number | string;
  desktopY?: number | string;
  desktopScale?: number | string;
  mobileX?: number | string;
  mobileY?: number | string;
  mobileScale?: number | string;
  fit?: 'cover' | 'contain';
  position?: string;
}

const toCssUnit = (val: number | string | undefined, defaultVal = '0px'): string => {
  if (val === undefined || val === null || val === '') return defaultVal;
  if (typeof val === 'number') return `${val}px`;
  const s = String(val).trim();
  if (!s) return defaultVal;
  if (/^-?\d+(\.\d+)?$/.test(s)) return `${s}px`;
  return s;
};

const toCssScale = (val: number | string | undefined, defaultVal: number | string = 1): number | string => {
  if (val === undefined || val === null || val === '') return defaultVal;
  return val;
};

const team: TeamMember[] = [
  {
    role: 'President & Co-founder',
    name: 'Balakumaran D',
    image: '/assets/images/Balakumaran_CEO_Profile_Pic.png',
    bio: 'Balakumaran stands as the architectural backbone of AI systems at OUANTUM, resolving complex non-destructive testing physics, sensor telemetry, and deterministic consensus algorithms.',
    fullBio:
      'Balakumaran founded Cybercom and Etherence before conceptualizing OUANTUM as the unified intelligence platform for civil infrastructure. Combining deep expertise in hardware-level signal acquisition, non-destructive testing physics, and deterministic consensus mathematics, he leads the architecture of the OX1 operating system. Under his technical leadership, OUANTUM codified Indian and international civil structural codes into programmatic, zero-trust verification engines that eliminate contractor disputes across major public infrastructure corridors.',
    // Leadership card photo framing parameters
    desktop: { x: 0, y: 0, scale: 1.0 },
    mobile: { x: 0, y: 0, scale: 1.0 },
  },
  {
    role: 'Chief Executive Officer & Co-founder',
    name: 'Rahul',
    image: '/assets/images/rahul.jpeg',
    bio: 'Rahul leads the commercial and strategic direction of OUANTUM, pioneering deterministic AI deployment across national highway corridors, metro viaducts, and capital megaprojects with guaranteed same-day delivery.',
    fullBio:
      'Rahul spearheads OUANTUM’s enterprise expansion, go-to-market execution, and strategic alliances with national infrastructure authorities, premier EPC concessionaires, and Third-Party Quality Monitoring (TPQM) agencies. Dedicated to eradicating subjective test logs and fraudulent quality assertions in public works, Rahul has scaled OUANTUM’s field footprint across more than 140 highway and viaduct packages nationwide, guaranteeing deterministic same-day audit turnaround.',
    // Leadership card photo framing parameters
    desktop: { x: 0, y: 0, scale: 1.0 },
    mobile: { x: 0, y: 0, scale: 1.0 },
  },
  {
    role: 'Chief Technology Officer',
    name: 'Guru Prasanth',
    image: '/assets/images/guru.png',
    bio: 'Guru Prasanth architects deep-tech infrastructure, computer vision pipelines, and multi-model consensus verification algorithms, translating IS 456 and IS 13311 into high-throughput deterministic code.',
    fullBio:
      'Guru Prasanth leads the deep-tech engineering and AI research organization at OUANTUM. He architects the multi-model consensus verification pipeline, acoustic wave inversion algorithms, and computer vision crack characterization engines. He oversees the real-time embedded systems operating on the OX1 edge hardware, ensuring sub-second inference latency directly on active construction sites without requiring persistent cloud connectivity.',
    // Leadership card photo framing parameters
    desktop: { x: 0, y: 150, scale: 1.40, fit: 'contain', position: 'bottom center' },
    mobile: { x: 0, y: 160, scale: 1.40, fit: 'contain', position: 'bottom center' },
  },
  {
    role: 'Chief Financial Officer',
    name: 'Sabari Raja',
    image: '/assets/images/sabari.jpeg',
    bio: 'Founder & CEO of Zapsters. Sabari qualifies institutional capital, bridges EPC client requirements with our capability stack, and oversees platform capitalization for rapid national rollout.',
    fullBio:
      'Sabari Raja brings extensive entrepreneurial experience as the Founder & CEO of Zapsters. At OUANTUM, Sabari directs fiscal architecture, institutional capital allocation, and enterprise underwriting for multi-crore infrastructure audit agreements. His structured financial models and deployment frameworks ensure seamless operational scalability as OUANTUM accelerates nationwide corridor adoption.',
    // Leadership card photo framing parameters
    desktop: { x: 0, y: 0, scale: 1.0 },
    mobile: { x: 0, y: 0, scale: 1.0 },
  },
  {
    role: 'Vice President, Operational Strategy',
    name: 'Raghunandhan',
    image: '/assets/images/raghu.jpg',
    bio: 'Raghunandhan oversees operational strategy, government compliance, and municipal enterprise initiatives, ensuring every automated audit stands up to strict scrutiny from government bodies and TPQM agencies.',
    fullBio:
      'Raghunandhan directs operational deployment frameworks, government compliance audits, and field engineering protocol compliance across state highway departments, municipal corporations, and national EPC sites. With deep knowledge of public procurement workflows and TPQM audit guidelines, he ensures that every cryptographic audit report generated by OUANTUM stands up to institutional and legal cross-examination.',
    // Leadership card photo framing parameters
    desktop: { x: 0, y: 90, scale: 1.60, fit: 'contain', position: 'bottom center' },
    mobile: { x: 0, y: 90, scale: 1.70, fit: 'contain', position: 'bottom center' },
  },
  {
    role: 'Sales Head',
    name: 'Saravanan',
    image: '/assets/images/saravanan.jpg',
    bio: 'Saravanan leads enterprise sales, client partnerships, and commercial expansion at OUANTUM, scaling automated QA/QC and structural audit deployment across national infrastructure developers.',
    fullBio:
      'Saravanan spearheads commercial expansion, client acquisition, and institutional sales across public and private infrastructure sectors. Driving the adoption of OUANTUM’s OX1 platform among concessionaires, EPC contractors, and state authorities, he structures enterprise partnerships that deliver automated, tamper-proof quality compliance and significant lifecycle savings across highway, metro, and bridge corridors.',
    // Leadership card photo framing parameters (full image display without cropping)
    desktop: { x: 0, y: 92, scale: 1.20, fit: 'contain', position: 'bottom center' },
    mobile: { x: 0, y: 94, scale: 1.250, fit: 'contain', position: 'bottom center' },
  },
];

const offices = [
  {
    city: 'Chennai',
    title: 'Headquarters',
    address: '25, Silambu St, Padmanabha Nagar, Choolaimedu, Chennai, Tamil Nadu 600094',
    focus: 'Platform Engineering, Hardware Edge Prototyping & Field Operations',
  },
];

const visionPillars = [
  {
    number: '01',
    title: 'Field Telemetry & OX1 Terminal',
    description:
      'Direct hardware integration capturing SonReb, UPV, rebound hardness, and core test telemetry on-site without manual transcription errors or operator bias.',
    metric: 'Zero-Latency Ingestion',
    link: '/products/ox1',
  },
  {
    number: '02',
    title: 'Deterministic Codal Verification',
    description:
      'Programmatic codification of IS 456, IS 13311, IRC, and ASTM standards. If a structure fails tolerances, it is flagged immediately before concrete curing completes.',
    metric: '100% Codified Rules',
    link: '/capabilities/is-code-compliance',
  },
  {
    number: '03',
    title: 'Spatial 3D BIM Digital Twin',
    description:
      'Mapping every physical rebound point, sensor reading, and ultrasonic velocity vector onto an exact 3D BIM coordinate map for permanent structural traceability.',
    metric: 'Sub-Centimeter Accuracy',
    link: '/capabilities',
  },
  {
    number: '04',
    title: '50-Year Service Life Forensics',
    description:
      'Multi-factor degradation algorithms projecting chloride ingress, carbonation depth, and rebar corrosion risks decades in advance with predictive modeling.',
    metric: 'Decadal Forecasting',
    link: '/capabilities/service-life-prediction',
  },
];

const partners = [
  { name: 'ETHERENCE', desc: 'TECHNOLOGY & CYBERSECURITY', url: 'https://etherence.com', label: 'etherence.com' },
  { name: 'ZAPSTERS', desc: 'TRAINING & DEPLOYMENT', url: 'https://zapsters.in', label: 'zapsters.in' },
  { name: 'AMITH', desc: 'CIVIL & ALLIED ENGINEERING', url: 'https://amith.in.net', label: 'amith.in.net' },
  { name: 'CYBERCOM', desc: 'SYSTEMS & INFRASTRUCTURE', url: 'https://www.cybercomctf.com/', label: 'cybercomctf.com' },
];


// =========================================================================
// ABOUT HERO ARCH MARQUEE PARAMETERS
// y: Vertical position offset in px (positive moves DOWN, negative moves UP)
// totalCards: Cards count (desktop: 24, mobile: 7 cards)
// cardWidth / cardHeight: Individual card dimensions in pixels
// cardScale / mobileCardScale: Overall size multiplier to easily scale cards up or down
// cardGap / mobileCardGap: Physical gap between adjacent cards in pixels
// =========================================================================
const ARCH_MARQUEE_HERO_PARAMS = {
  desktop: {
    y: -2,           // Move marquee along Y-axis on desktop (positive moves DOWN, negative moves UP)
    totalCards: 24,  // 24 cards in circle -> ~12-13 cards visible across the semi-circle!
    cardWidth: 120,  // Desktop card width in px
    cardHeight: 128, // Desktop card height in px
    cardScale: 1.0,  // Scale multiplier for desktop cards
    cardGap: 48,     // Gap between cards on desktop in px
  },
  mobile: {
    y: 0,            // Move arch along Y-axis on mobile (positive moves DOWN, negative moves UP)
    totalCards: 7,   // Image cards forming the arch (e.g. 7 or 9 cards)
    cardWidth: 50,   // Mobile card width in px (adjust to resize)
    cardHeight: 60,  // Mobile card height in px (adjust to resize)
    cardScale: 1.20, // Scale multiplier to scale mobile cards (e.g. 1.0, 1.2, 1.3)
    cardGap: 22,     // Gap between cards on mobile in px (increase to widen gap, decrease to tighten)
  },
};

const About: React.FC = () => {
  const [selectedLeader, setSelectedLeader] = useState<TeamMember | null>(null);

  useSEO({
    title: 'About OUANTUM | Defining the AI era of civil infrastructure quality assurance',
    description:
      'OUANTUM is the civil infrastructure quality assurance AI company delivering deterministic, zero-defect verification — from non-destructive testing to automated compliance to digital twins.',
    keywords:
      'About OUANTUM, civil engineering AI, infrastructure QA India, Balakumaran D, Rahul OUANTUM, structural audit AI, OX1 field testing',
    canonicalPath: '/about',
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
        minHeight: '100vh',
        paddingBottom: '0',
      }}
    >
      <style>{`
        .subpage-wrapper .ic-hero-section h1,
        .subpage-wrapper .ic-hero-headline,
        .subpage-wrapper .ic-hero-headline span {
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
        .subpage-wrapper .ic-hero-section p,
        .subpage-wrapper .ic-hero-subtext {
          text-align: center !important;
          margin-left: auto !important;
          margin-right: auto !important;
          display: block !important;
        }
        @media (max-width: 767px) {
          .ic-about-hero-content {
            padding-top: 198px !important;
          }
        }
        @media (min-width: 768px) {
          .ic-about-hero-content {
            padding-top: 175px !important;
          }
        }
      `}</style>

      {/* =========================================================================
          1. HERO SECTION (Identical to Home Page Hero Section)
          ========================================================================= */}
      <section
        className="ic-hero-section"
        style={{
          position: 'relative',
          minHeight: 'clamp(580px, 75vh, 660px)',
          padding: '0 16px 48px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          overflow: 'hidden',
          background: '#ffffff',
          borderBottom: 'none',
        }}
      >
        {/* Arch Marquee encircling the hero content */}
        <ArchMarquee
          y={ARCH_MARQUEE_HERO_PARAMS.desktop.y}
          mobileY={ARCH_MARQUEE_HERO_PARAMS.mobile.y}
          totalCards={ARCH_MARQUEE_HERO_PARAMS.desktop.totalCards}
          mobileTotalCards={ARCH_MARQUEE_HERO_PARAMS.mobile.totalCards}
          cardWidth={ARCH_MARQUEE_HERO_PARAMS.desktop.cardWidth}
          cardHeight={ARCH_MARQUEE_HERO_PARAMS.desktop.cardHeight}
          cardScale={ARCH_MARQUEE_HERO_PARAMS.desktop.cardScale}
          cardGap={ARCH_MARQUEE_HERO_PARAMS.desktop.cardGap}
          mobileCardWidth={ARCH_MARQUEE_HERO_PARAMS.mobile.cardWidth}
          mobileCardHeight={ARCH_MARQUEE_HERO_PARAMS.mobile.cardHeight}
          mobileCardScale={ARCH_MARQUEE_HERO_PARAMS.mobile.cardScale}
          mobileCardGap={ARCH_MARQUEE_HERO_PARAMS.mobile.cardGap}
        />

        {/* Hero Central Content (Headline, Subtitle, Buttons) positioned cleanly in front */}
        <div
          className="ic-about-hero-content"
          style={{
            maxWidth: '680px',
            margin: '0 auto',
            width: '100%',
            position: 'relative',
            zIndex: 10,
            textAlign: 'center',
            pointerEvents: 'auto',
            paddingTop: 'clamp(175px, 22vh, 195px)',
          }}
        >
          {/* Iconic Headline */}
          <motion.h1
            className="ic-hero-headline"
            style={{
              fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              fontWeight: 400,
              color: '#111111',
              textAlign: 'center',
              margin: '0 auto 1.25rem',
              width: '100%',
              fontSize: 'clamp(1.75rem, 3.8vw, 3.4rem)',
              lineHeight: 1.12,
              letterSpacing: '-0.03em',
            }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <span style={{ fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", display: 'block', fontWeight: 400, color: '#111111', textAlign: 'center', margin: '0 auto' }}>
              AI era of
            </span>
            <span style={{ fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", display: 'block', fontWeight: 400, color: '#111111', textAlign: 'center', margin: '0 auto' }}>
              civil infrastructure
            </span>
          </motion.h1>

          {/* Editorial Subtitle */}
          <motion.p
            className="ic-hero-subtext"
            style={{
              fontFamily: 'var(--ic-font-sans)',
              fontSize: 'clamp(0.95rem, 1.2vw, 1.075rem)',
              lineHeight: 1.55,
              color: 'var(--ic-text-secondary)',
              maxWidth: '560px',
              margin: '0 auto 2rem',
              textAlign: 'center',
            }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            OUANTUM is the civil infrastructure quality assurance AI company delivering <span className="ic-text-highlight">deterministic, zero-defect verification</span> — from non-destructive field testing to codified compliance to 3D digital twins.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '12px',
              flexWrap: 'wrap',
              marginBottom: 0,
            }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <Link to="/contact" className="ic-btn-primary">
              Start audit
            </Link>
            <Link to="/capabilities" className="ic-btn-secondary">
              Explore capabilities
            </Link>
            <Link to="/products/ox1" className="ic-btn-secondary">
              Field Copilot <ArrowRight size={14} style={{ marginLeft: '4px' }} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Narrative Story Grid - Preserving 140+ packages and company founding story */}
      <section
        style={{
          padding: '60px 16px 80px',
          background: '#ffffff',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto', width: '100%' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '32px 48px',
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: 'var(--ic-font-sans)',
                  fontSize: 'clamp(1.15rem, 1.8vw, 1.35rem)',
                  lineHeight: 1.55,
                  color: '#111111',
                  fontWeight: 400,
                  margin: 0,
                }}
              >
                Founded to eliminate subjective field audits and delayed test results, we revolutionized civil QA by
                bridging physical sensors directly to deterministic consensus algorithms.
              </p>
            </div>
            <div>
              <p
                style={{
                  fontFamily: 'var(--ic-font-sans)',
                  fontSize: '1.05rem',
                  lineHeight: 1.7,
                  color: '#4a5565',
                  margin: '0 0 1rem 0',
                }}
              >
                140+ highway packages, metro viaducts, and bridge projects use our systems. OUANTUM validates over 50,000
                NDT data points monthly, is doubling coverage year on year, and guarantees <span className="ic-text-highlight">same-day codal compliance reports</span>.
              </p>
              <p
                style={{
                  fontFamily: 'var(--ic-font-sans)',
                  fontSize: '1.05rem',
                  lineHeight: 1.7,
                  color: '#4a5565',
                  margin: 0,
                }}
              >
                When it was clear that manual paperwork caused undetected structural failures and contractor disputes,
                we engineered OUANTUM and the OX1 system — rebuilding field quality assurance, compliance telemetry,
                and engineer workflows around deterministic AI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. OUR VISION SECTION (White Background, Card Background in Cream Shade)
          ========================================================================= */}
      <section
        style={{
          padding: 'clamp(80px, 10vw, 120px) 0',
          background: '#ffffff',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 16px' }}>
          {/* Section Header (No Eyebrow Tag) */}
          <div style={{ maxWidth: '860px', marginBottom: '3.5rem' }}>
            <h2
              className="subpage-section-title"
              style={{
                fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                fontWeight: 300,
                lineHeight: 1.05,
                color: '#111111',
                letterSpacing: '-0.015em',
                WebkitTextStroke: '1.2px #ffffff',
                WebkitTextFillColor: '#111111',
                margin: '0 0 1.25rem 0',
              }}
            >
              Our vision for the future of civil infrastructure
            </h2>
            <p
              style={{
                fontFamily: 'var(--ic-font-sans)',
                fontSize: '1.15rem',
                lineHeight: 1.65,
                color: '#4a5565',
                margin: 0,
              }}
            >
              We believe infrastructure developers, TPQM agencies, and government departments are best served by a single
              unified agent with full context across the entire structural lifecycle, delivering quality assurances that
              were never before possible.
            </p>
          </div>

          {/* 4 Vision Pillar Cards in the Given Warm Cream Shade (Sharp corners, no hover, no icons/tags) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px',
            }}
          >
            {visionPillars.map((pillar, i) => (
              <div
                key={i}
                style={{
                  background: '#f4f3ec',
                  border: '1px solid rgba(0, 0, 0, 0.07)',
                  borderRadius: 0,
                  padding: '36px 30px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '320px',
                }}
              >
                <div>
                  <h3
                    className="about-card-title"
                    style={{
                      fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                      fontSize: '1.3rem',
                      fontWeight: 500,
                      color: '#111111',
                      letterSpacing: '-0.015em',
                      marginBottom: '12px',
                      lineHeight: 1.25,
                    }}
                  >
                    {pillar.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--ic-font-sans)',
                      fontSize: '0.925rem',
                      lineHeight: 1.65,
                      color: '#4a5565',
                      margin: 0,
                    }}
                  >
                    {pillar.description}
                  </p>
                </div>

                <div
                  style={{
                    marginTop: '2rem',
                    paddingTop: '16px',
                    borderTop: '1px solid rgba(0, 0, 0, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--ic-font-sans)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: '#111111',
                    }}
                  >
                    {pillar.metric}
                  </span>
                  <Link
                    to={pillar.link}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: '#111111',
                      textDecoration: 'underline',
                      textUnderlineOffset: '3px',
                    }}
                  >
                    <span>Explore</span>
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. LEADERSHIP SECTION (Exact User Reference Image Style)
          ========================================================================= */}
      <section
        style={{
          padding: 'clamp(80px, 10vw, 120px) 0',
          background: '#ffffff',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 16px' }}>
          {/* Section Header (No Eyebrow Tag) */}
          <div style={{ maxWidth: '780px', marginBottom: '3.5rem' }}>
            <h2
              className="subpage-section-title"
              style={{
                fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                fontWeight: 300,
                lineHeight: 1.05,
                color: '#111111',
                letterSpacing: '-0.015em',
                WebkitTextStroke: '1.2px #ffffff',
                WebkitTextFillColor: '#111111',
                margin: '0 0 1.25rem 0',
              }}
            >
              Leadership
            </h2>
            <p
              style={{
                fontFamily: 'var(--ic-font-sans)',
                fontSize: '1.15rem',
                lineHeight: 1.65,
                color: '#4a5565',
                margin: 0,
              }}
            >
              Engineers, researchers, and builders dedicated to structural safety and algorithmic truth.
            </p>
          </div>

          {/* Leaders Grid (Matching Fin.ai Reference Image Layout) */}
          <style>{`
            .leader-img-wrapper {
              --leader-curr-x: var(--leader-x-desk, 0px);
              --leader-curr-y: var(--leader-y-desk, 0px);
              --leader-curr-scale: var(--leader-scale-desk, 1);
              --leader-curr-fit: var(--leader-fit-desk, cover);
              --leader-curr-pos: var(--leader-pos-desk, top center);
            }
            .leader-card-portrait {
              width: 100%;
              height: 100%;
              object-fit: var(--leader-curr-fit, cover) !important;
              object-position: var(--leader-curr-pos, top center) !important;
              transform: translate(var(--leader-curr-x), var(--leader-curr-y)) scale(var(--leader-curr-scale));
              transform-origin: var(--leader-curr-pos, top center);
              transition: transform 0.25s ease-out;
            }
            @media (max-width: 768px) {
              .leader-img-wrapper {
                --leader-curr-x: var(--leader-x-mob, var(--leader-x-desk, 0px));
                --leader-curr-y: var(--leader-y-mob, var(--leader-y-desk, 0px));
                --leader-curr-scale: var(--leader-scale-mob, var(--leader-scale-desk, 1));
                --leader-curr-fit: var(--leader-fit-mob, var(--leader-fit-desk, cover));
                --leader-curr-pos: var(--leader-pos-mob, var(--leader-pos-desk, top center));
              }
            }
          `}</style>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '36px 28px',
            }}
          >
            {team.map((member, i) => {
              const deskX = toCssUnit(member.desktop?.x ?? member.desktopX, '0px');
              const deskY = toCssUnit(member.desktop?.y ?? member.desktopY, '0px');
              const deskScale = toCssScale(member.desktop?.scale ?? member.desktopScale, 1);
              const deskFit = member.desktop?.fit ?? member.fit ?? 'cover';
              const deskPos = member.desktop?.position ?? member.position ?? 'top center';

              const mobX = toCssUnit(member.mobile?.x ?? member.mobileX ?? member.desktop?.x ?? member.desktopX, deskX);
              const mobY = toCssUnit(member.mobile?.y ?? member.mobileY ?? member.desktop?.y ?? member.desktopY, deskY);
              const mobScale = toCssScale(member.mobile?.scale ?? member.mobileScale ?? member.desktop?.scale ?? member.desktopScale, deskScale);
              const mobFit = member.mobile?.fit ?? member.fit ?? member.desktop?.fit ?? deskFit;
              const mobPos = member.mobile?.position ?? member.position ?? member.desktop?.position ?? deskPos;

              return (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    background: 'transparent',
                  }}
                >
                  {/* Rectangular Image Box in Given Color Shade, Sharp Corners, No Margin Lines Inside */}
                  <div
                    className="leader-img-wrapper"
                    style={{
                      width: '100%',
                      height: '310px',
                      background: '#eae6dc',
                      position: 'relative',
                      overflow: 'hidden',
                      borderRadius: 0,
                      marginBottom: '18px',
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                      ['--leader-x-desk' as string]: deskX,
                      ['--leader-y-desk' as string]: deskY,
                      ['--leader-scale-desk' as string]: String(deskScale),
                      ['--leader-fit-desk' as string]: deskFit,
                      ['--leader-pos-desk' as string]: deskPos,
                      ['--leader-x-mob' as string]: mobX,
                      ['--leader-y-mob' as string]: mobY,
                      ['--leader-scale-mob' as string]: String(mobScale),
                      ['--leader-fit-mob' as string]: mobFit,
                      ['--leader-pos-mob' as string]: mobPos,
                    }}
                  >
                    {/* Portrait photo */}
                    <img
                      src={member.image}
                      alt={member.name}
                      className="leader-card-portrait"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: deskFit as any,
                        objectPosition: deskPos,
                        mixBlendMode: 'multiply',
                        filter: 'grayscale(100%) contrast(105%)',
                        display: 'block',
                      }}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>

                  {/* Content Details Below Image Box (Matching Reference Screenshot) */}
                  <div>
                    <h3
                      className="about-card-title"
                      style={{
                        fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                        fontSize: '1.5rem',
                        fontWeight: 400,
                        color: '#111111',
                        letterSpacing: '-0.02em',
                        margin: '0 0 4px 0',
                        lineHeight: 1.2,
                      }}
                    >
                      {member.name}
                    </h3>
                    <div
                      style={{
                        fontFamily: 'var(--ic-font-sans)',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        color: '#6a7282',
                        marginBottom: '14px',
                      }}
                    >
                      {member.role}
                    </div>

                    <p
                      style={{
                        fontFamily: 'var(--ic-font-sans)',
                        fontSize: '0.9rem',
                        lineHeight: 1.6,
                        color: '#515151',
                        margin: '0 0 16px 0',
                      }}
                    >
                      {member.bio}
                    </p>

                    {/* Underlined 'More' trigger button */}
                    <div>
                      <button
                        id={`leader-more-${i}`}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedLeader(member);
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: '4px 0',
                          fontFamily: 'var(--ic-font-sans)',
                          fontSize: '0.925rem',
                          fontWeight: 500,
                          color: '#111111',
                          textDecoration: 'underline',
                          textUnderlineOffset: '3px',
                          cursor: 'pointer',
                          display: 'inline-block',
                        }}
                      >
                        More
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. OUR OFFICES SECTION (White Section Bg, Sharp Cards in Cream Shade)
          ========================================================================= */}
      <section
        style={{
          padding: 'clamp(80px, 10vw, 120px) 0',
          background: '#ffffff',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 16px' }}>
          {/* Section Header (No Eyebrow Tag) */}
          <div style={{ maxWidth: '780px', marginBottom: '3.5rem' }}>
            <h2
              className="subpage-section-title"
              style={{
                fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                fontWeight: 300,
                lineHeight: 1.05,
                color: '#111111',
                letterSpacing: '-0.015em',
                WebkitTextStroke: '1.2px #ffffff',
                WebkitTextFillColor: '#111111',
                margin: '0 0 1.25rem 0',
              }}
            >
              Our offices
            </h2>
            <p
              style={{
                fontFamily: 'var(--ic-font-sans)',
                fontSize: '1.15rem',
                lineHeight: 1.65,
                color: '#4a5565',
                margin: 0,
              }}
            >
              Based in Chennai, operating across active infrastructure programmes nationwide.
            </p>
          </div>

          {/* Office Cards Grid in Given Color Shade (Sharp corners, no hover, no tags) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px',
            }}
          >
            {offices.map((office, idx) => (
              <div
                key={idx}
                style={{
                  background: '#f4f3ec',
                  border: '1px solid rgba(0, 0, 0, 0.07)',
                  borderRadius: 0,
                  padding: '32px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '260px',
                }}
              >
                <div>
                  <div style={{ marginBottom: '1rem' }}>
                    <h3
                      className="about-card-title"
                      style={{
                        fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                        fontSize: '1.4rem',
                        fontWeight: 500,
                        color: '#111111',
                        letterSpacing: '-0.02em',
                        margin: 0,
                      }}
                    >
                      {office.city}
                    </h3>
                  </div>

                  <div
                    style={{
                      fontFamily: 'var(--ic-font-sans)',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      color: '#111111',
                      marginBottom: '8px',
                    }}
                  >
                    {office.title}
                  </div>

                  <p
                    style={{
                      fontFamily: 'var(--ic-font-sans)',
                      fontSize: '0.88rem',
                      lineHeight: 1.6,
                      color: '#4a5565',
                      margin: '0 0 12px 0',
                    }}
                  >
                    {office.address}
                  </p>

                  <p
                    style={{
                      fontFamily: 'var(--ic-font-sans)',
                      fontSize: '0.825rem',
                      lineHeight: 1.5,
                      color: '#6a7282',
                      margin: 0,
                    }}
                  >
                    {office.focus}
                  </p>
                </div>

                <div style={{ marginTop: '1.75rem', paddingTop: '16px', borderTop: '1px solid rgba(0, 0, 0, 0.08)' }}>
                  <Link
                    to="/contact"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: '#111111',
                      textDecoration: 'underline',
                      textUnderlineOffset: '3px',
                    }}
                  >
                    <span>View roles</span>
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. PARTNER ECOSYSTEM STRIP (White Section Bg, Sharp Cards in Cream Shade)
          ========================================================================= */}
      <section
        style={{
          padding: '70px 0',
          background: '#ffffff',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 16px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '24px',
              marginBottom: '2rem',
            }}
          >
            <div>
              <h3
                className="about-card-title"
                style={{
                  fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                  fontSize: '1.35rem',
                  fontWeight: 500,
                  color: '#111111',
                  margin: 0,
                }}
              >
                Technology and institutional partners
              </h3>
            </div>
            <Link
              to="/contact"
              style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#111111',
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <span>Partner with OUANTUM</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '16px',
            }}
          >
            {partners.map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: 'none',
                  background: '#f4f3ec',
                  border: '1px solid rgba(0, 0, 0, 0.07)',
                  borderRadius: 0,
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '130px',
                }}
              >
                <div>
                  <h4
                    className="partner-card-title"
                    style={{
                      fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                      fontSize: '1.15rem',
                      fontWeight: 600,
                      color: '#111111',
                      letterSpacing: '-0.01em',
                      margin: '0 0 4px 0',
                    }}
                  >
                    {p.name}
                  </h4>
                  <div
                    style={{
                      fontFamily: 'var(--ic-font-sans)',
                      fontSize: '0.72rem',
                      color: '#6a7282',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {p.desc}
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: '#111111',
                    marginTop: '14px',
                    textDecoration: 'underline',
                    textUnderlineOffset: '3px',
                  }}
                >
                  <span>{p.label}</span>
                  <ArrowUpRight size={13} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>



      {/* =========================================================================
          LEADERSHIP EXPANDED BIO POPUP CARD
          (Appears ONLY on clicking 'More'. NO mobile number, NO tags, NO image circle, NO card for X icon)
          ========================================================================= */}
      <AnimatePresence>
        {selectedLeader && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
            }}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLeader(null)}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.45)',
                backdropFilter: 'blur(4px)',
              }}
            />

            {/* Modal Card with Sharp Corners */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              style={{
                position: 'relative',
                background: '#ffffff',
                border: '1px solid rgba(0, 0, 0, 0.15)',
                borderRadius: 0,
                maxWidth: '580px',
                width: '100%',
                maxHeight: '85vh',
                overflowY: 'auto',
                padding: '44px 40px',
                boxShadow: '0 24px 48px rgba(0, 0, 0, 0.12)',
                zIndex: 10,
              }}
            >
              {/* Close Button - Clean backgroundless X icon, NO separate card */}
              <button
                onClick={() => setSelectedLeader(null)}
                style={{
                  position: 'absolute',
                  top: '24px',
                  right: '24px',
                  background: 'none',
                  border: 'none',
                  padding: '4px',
                  cursor: 'pointer',
                  color: '#111111',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                aria-label="Close bio"
              >
                <X size={22} />
              </button>

              {/* Header: Name and Role (NO image circle, NO mobile number, NO tags) */}
              <div style={{ marginBottom: '1.75rem', paddingRight: '36px' }}>
                <h3
                  className="about-card-title"
                  style={{
                    fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                    fontSize: '1.75rem',
                    fontWeight: 400,
                    color: '#111111',
                    margin: '0 0 6px 0',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                  }}
                >
                  {selectedLeader.name}
                </h3>
                <div
                  style={{
                    fontFamily: 'var(--ic-font-sans)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    color: '#6a7282',
                  }}
                >
                  {selectedLeader.role}
                </div>
              </div>

              {/* Bio Content */}
              <div>
                <p
                  style={{
                    fontFamily: 'var(--ic-font-sans)',
                    fontSize: '1rem',
                    lineHeight: 1.75,
                    color: '#364153',
                    margin: 0,
                  }}
                >
                  {selectedLeader.fullBio}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default About;
