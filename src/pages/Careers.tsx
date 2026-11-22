import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  MapPin,
  ChevronDown,
  X,
} from 'lucide-react';
import useSEO from '../hooks/useSEO';

const BASE_URL = 'https://ouantum.com';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'OUANTUM',
  url: BASE_URL,
  sameAs: ['https://www.linkedin.com/company/ouantum/'],
};

interface JobRole {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
}

const allRoles: JobRole[] = [
  {
    id: 'ai-lead-upv',
    title: 'Lead AI Research Scientist — Ultrasonic Telemetry & Inversion',
    department: 'Artificial Intelligence',
    location: 'Chennai',
    type: 'Full-Time',
    description:
      'Architect novel acoustic inversion algorithms and multi-model consensus neural architectures fusing UPV propagation vectors with rebound hardness indices for in-situ compressive strength inference.',
    requirements: [
      'Ph.D. or Master’s in Computer Science, Applied Mathematics, or Geophysics',
      'Demonstrated expertise in acoustic wave propagation, signal processing, and PyTorch',
      'Track record of deploying deterministic inference engines to production',
    ],
  },
  {
    id: 'cv-crack-characterization',
    title: 'Senior Computer Vision Engineer — Micro-Crack Characterization',
    department: 'Artificial Intelligence',
    location: 'Chennai',
    type: 'Full-Time',
    description:
      'Engineer optical crack depth and sub-millimeter displacement telemetry pipelines operating under varied construction site illumination on the OX1 edge terminal.',
    requirements: [
      '4+ years developing deep learning computer vision models (segmentation, photogrammetry)',
      'Experience with TensorRT, ONNX runtime, and embedded edge GPUs (Jetson/ARM)',
      'Understanding of structural surface morphology and civil inspection imagery',
    ],
  },
  {
    id: 'principal-structural-audit',
    title: 'Principal Structural Audit Engineer — Highway Corridors',
    department: 'Civil Engineering',
    location: 'Chennai',
    type: 'Full-Time',
    description:
      'Lead corridor verification audits for NHAI expressway packages, cable-stayed bridges, and metro viaduct piers. Validate automated AI telemetry against IS 456, IS 13311, and MoRTH guidelines.',
    requirements: [
      'Degree in Structural / Civil Engineering with 7+ years in TPQM or highway concessionaires',
      'Extensive hands-on experience with SonReb, UPV, core extraction, and load testing',
      'Authority in codal compliance disputes and structural forensic investigations',
    ],
  },
  {
    id: 'embedded-ox1-architect',
    title: 'Embedded Hardware & Sensor Architect — OX1 Edge Terminal',
    department: 'Hardware & Edge',
    location: 'Chennai',
    type: 'Full-Time',
    description:
      'Design ruggedized hardware architectures, analog front-ends for piezo-electric transducers, and real-time firmware running zero-trust cryptographic attestations on active construction sites.',
    requirements: [
      '5+ years embedded firmware development in C/C++ and Rust',
      'Experience with high-speed ADC sampling, FPGA signal preprocessing, and BLE/cellular telemetry',
      'Familiarity with IP67 ruggedized field instrumentation and hardware tamper seals',
    ],
  },
  {
    id: 'bim-spatial-twin',
    title: 'Staff Systems Engineer — 3D BIM Spatial Digital Twin Engine',
    department: 'Product Engineering',
    location: 'Chennai',
    type: 'Full-Time',
    description:
      'Build real-time WebGL and spatial indexing pipelines that anchor 50,000+ monthly non-destructive test coordinates directly onto parametric BIM IFC models with sub-centimeter fidelity.',
    requirements: [
      'Deep fluency with Three.js / WebGPU / OpenGL and spatial tree structures (Octrees, BVH)',
      'Experience handling large-scale IFC, Revit, and point cloud geospatial datasets',
      'Proficiency in TypeScript, WebAssembly, and high-performance client state management',
    ],
  },
  {
    id: 'codal-rules-lead',
    title: 'Codal Verification Lead — IS & IRC Programmatic Standards',
    department: 'Civil Engineering',
    location: 'Chennai',
    type: 'Full-Time',
    description:
      'Translate national structural engineering codes (IS 456, IS 13311, IRC:SP:47, MoRTH 5th Rev) into zero-ambiguity programmatic rulesets that govern our deterministic audit engine.',
    requirements: [
      'M.Tech in Structural Engineering with deep knowledge of Indian Standards drafting',
      'Past association with CRRI, BIS committees, or Tier-1 TPQM institutions',
      'Ability to collaborate with software engineers to formalize codal logic mathematically',
    ],
  },
  {
    id: 'frontend-systems-architect',
    title: 'Full-Stack Frontend Systems Architect — QA Operations Hub',
    department: 'Product Engineering',
    location: 'Chennai',
    type: 'Full-Time',
    description:
      'Architect data-dense, sub-300ms verification workspaces, audit timeline visualizers, and cryptographic report generation interfaces using modern React, TypeScript, and clean vanilla CSS.',
    requirements: [
      '5+ years engineering high-performance SaaS applications with strict typography and design discipline',
      'Obsessive attention to rendering performance, accessibility, and micro-interactions',
      'Strong command of modern CSS architecture, canvas/SVG visualization, and REST/WebSocket APIs',
    ],
  },
  {
    id: 'tpqm-solutions-director',
    title: 'Director of Concessionaire & TPQM Alliances',
    department: 'Operations & Strategy',
    location: 'Chennai',
    type: 'Full-Time',
    description:
      'Drive institutional adoption of OUANTUM and the OX1 system across major infrastructure concessionaires, EPC conglomerates, and state highway development authorities.',
    requirements: [
      '8+ years leadership experience in public infrastructure procurement, EPC sales, or TPQM oversight',
      'Established executive network across NHAI, metro rail corporations, and Tier-1 civil contractors',
      'Proven capability to structure multi-corridor enterprise audit contracts',
    ],
  },
];

const values = [
  {
    title: 'Deterministic Rigor (Success First)',
    desc: 'Our north star is absolute structural safety. We combine physics-based codal formulas (IS 456, IS 13311) with deep learning consensus algorithms. We do not ship probabilistic guesses — every output is grounded in verifiable mathematical truth.',
  },
  {
    title: 'Incredibly High Standards',
    desc: 'We build for bridges, metro viaducts, and tunnels carrying millions of citizens daily. We hold our software, edge hardware, and telemetry to the highest standard in the industry. Sloppy work or unverified assertions are unacceptable.',
  },
  {
    title: 'Direct Execution & Velocity',
    desc: 'Zero corporate bureaucracy. Engineers work directly with founders, deploy to live national highway corridors, and see their algorithms influence civil infrastructure immediately. Decisions happen in hours, not committees.',
  },
  {
    title: 'Open Mindedness & Algorithmic Truth',
    desc: 'Physical reality and sensor data override seniority. The best engineering insight wins regardless of rank or tenure. We maintain intellectual honesty, continuous peer review, and transparent feedback.',
  },
];

const perksList = [
  {
    category: 'Health & wellness',
    items: [
      'Comprehensive medical insurance coverage for employees and direct dependents',
      'Annual executive health screenings and proactive wellness support',
      'Mental well-being stipend and ergonomics consultation for field and lab staff',
    ],
  },
  {
    category: 'Family & time off',
    items: [
      'Up to 26 weeks of fully paid leave for birthing parents',
      '8 weeks of fully paid parental leave for non-birthing parents',
      'Flexible time off policy — take the time you need to recharge and perform at your peak',
      'Relocation assistance to engineering hubs in Chennai and Bengaluru',
    ],
  },
  {
    category: 'Financial future',
    items: [
      'High-conviction equity participation (ESOPs) — your upside scales directly with national corridor adoption',
      'Performance-linked competitive salary reviewed biannually',
      'Modern hardware allowance (MacBook Pro / RTX deep-learning workstations)',
    ],
  },
];

const offices = [
  {
    city: 'Chennai',
    roleCount: allRoles.length,
    title: 'Headquarters & Hardware Labs',
    address: '25, Silambu St, Senthil Nagar, Loganathan Nagar, Padmanabha Nagar, Choolaimedu, Chennai, Tamil Nadu 600094',
    image: '/assets/images/chennai-office.webp',
  },
];

const galleryPhotos = [
  { src: '/assets/images/buildings/building-1.webp', fallback: '/assets/images/buildings/building-1.png', caption: 'Infrastructure Engineering' },
  { src: '/assets/images/buildings/building-2.webp', fallback: '/assets/images/buildings/building-2.png', caption: 'Civil Structural Design' },
  { src: '/assets/images/buildings/building-3.webp', fallback: '/assets/images/buildings/building-3.png', caption: 'High-Rise Architectural Modeling' },
  { src: '/assets/images/buildings/building-4.webp', fallback: '/assets/images/buildings/building-4.png', caption: 'Metro Transit Viaducts' },
  { src: '/assets/images/buildings/building-5.webp', fallback: '/assets/images/buildings/building-5.png', caption: 'Modern Facade Diagnostics' },
  { src: '/assets/images/buildings/building-6.webp', fallback: '/assets/images/buildings/building-6.png', caption: 'Structural Sensor Telemetry' },
  { src: '/assets/images/buildings/building-7.webp', fallback: '/assets/images/buildings/building-7.png', caption: 'Concrete Durability Verification' },
  { src: '/assets/images/buildings/building-8.webp', fallback: '/assets/images/buildings/building-8.png', caption: 'Urban Transit Corridors' },
  { src: '/assets/images/buildings/building-9.webp', fallback: '/assets/images/buildings/building-9.png', caption: 'Subterranean Tunnel Linings' },
  { src: '/assets/images/buildings/building-10.webp', fallback: '/assets/images/buildings/building-10.png', caption: 'Long-Span Bridge Abutments' },
  { src: '/assets/images/buildings/building-11.webp', fallback: '/assets/images/buildings/building-11.png', caption: 'Deep Foundation Engineering' },
  { src: '/assets/images/buildings/building-12.webp', fallback: '/assets/images/buildings/building-12.png', caption: 'Precision Structural Health' },
];

interface ExecutiveLeader {
  name: string;
  role: string;
  tabRole: string;
  image: string;
  bio: string;
  feeds: { label: string; url: string }[];
}

const executiveLeaders: ExecutiveLeader[] = [
  {
    name: 'Balakumaran D',
    role: 'PRESIDENT & CO-FOUNDER',
    tabRole: 'President & co-founder',
    image: '/assets/images/Balakumaran_CEO_Profile_Pic.png',
    bio: 'Balakumaran founded Cybercom and Etherence before conceptualizing OUANTUM as the unified intelligence platform for civil infrastructure. Combining deep expertise in hardware-level signal acquisition, non-destructive testing physics, and deterministic consensus mathematics, he leads the architecture of the OX1 operating system. Under his technical leadership, OUANTUM codified Indian and international civil structural codes into programmatic, zero-trust verification engines that eliminate contractor disputes across major public infrastructure corridors.',
    feeds: [
      { label: 'LinkedIn', url: 'https://www.linkedin.com/company/ouantum/' },
      { label: 'Founders’ Note', url: '/about' },
    ],
  },
  {
    name: 'Rahul',
    role: 'CHIEF EXECUTIVE OFFICER & CO-FOUNDER',
    tabRole: 'Chief Executive Officer & co-founder',
    image: '/assets/images/rahul.jpeg',
    bio: 'Rahul spearheads OUANTUM’s enterprise expansion, go-to-market execution, and strategic alliances with national infrastructure authorities, premier EPC concessionaires, and Third-Party Quality Monitoring (TPQM) agencies. Dedicated to eradicating subjective test logs and fraudulent quality assertions in public works, Rahul has scaled OUANTUM’s field footprint across more than 140 highway and viaduct packages nationwide, guaranteeing deterministic same-day audit turnaround.',
    feeds: [
      { label: 'LinkedIn', url: 'https://www.linkedin.com/company/ouantum/' },
      { label: 'Commercial Strategy', url: '/about' },
    ],
  },
  {
    name: 'Guru Prasanth',
    role: 'CHIEF TECHNOLOGY OFFICER',
    tabRole: 'Chief Technology Officer',
    image: '/assets/images/guru.png',
    bio: 'Guru Prasanth leads the deep-tech engineering and AI research organization at OUANTUM. He architects the multi-model consensus verification pipeline, acoustic wave inversion algorithms, and computer vision crack characterization engines. He oversees the real-time embedded systems operating on the OX1 edge hardware, ensuring sub-second inference latency directly on active construction sites without requiring persistent cloud connectivity.',
    feeds: [
      { label: 'LinkedIn', url: 'https://www.linkedin.com/company/ouantum/' },
      { label: 'Research Papers', url: '/capabilities' },
    ],
  },
  {
    name: 'Sabari Raja',
    role: 'CHIEF FINANCIAL OFFICER',
    tabRole: 'Chief Financial Officer',
    image: '/assets/images/sabari.jpeg',
    bio: 'Sabari Raja brings extensive entrepreneurial experience as the Founder & CEO of Zapsters. At OUANTUM, Sabari directs fiscal architecture, institutional capital allocation, and enterprise underwriting for multi-crore infrastructure audit agreements. His structured financial models and deployment frameworks ensure seamless operational scalability as OUANTUM accelerates nationwide corridor adoption.',
    feeds: [
      { label: 'LinkedIn', url: 'https://www.linkedin.com/company/ouantum/' },
      { label: 'Corporate Updates', url: '/about' },
    ],
  },
  {
    name: 'Raghunandhan',
    role: 'VICE PRESIDENT, OPERATIONAL STRATEGY',
    tabRole: 'VP of Operational Strategy',
    image: '/assets/images/raghu.png',
    bio: 'Raghunandhan directs operational deployment frameworks, government compliance audits, and field engineering protocol compliance across state highway departments, municipal corporations, and national EPC sites. With deep knowledge of public procurement workflows and TPQM audit guidelines, he ensures that every cryptographic audit report generated by OUANTUM stands up to institutional and legal cross-examination.',
    feeds: [
      { label: 'LinkedIn', url: 'https://www.linkedin.com/company/ouantum/' },
      { label: 'Corridor Reports', url: '/capabilities' },
    ],
  },
];

const Careers: React.FC = () => {
  const [activeLeaderIndex, setActiveLeaderIndex] = useState<number>(0);
  const [activeValueIndex, setActiveValueIndex] = useState<number | null>(0);
  const [selectedRole, setSelectedRole] = useState<JobRole | null>(null);

  useSEO({
    title: 'Careers at OUANTUM | Defining the AI era of civil infrastructure quality assurance',
    description:
      'Join the team defining the AI era of civil infrastructure quality assurance. Explore open roles across AI research, structural civil engineering, and embedded edge systems.',
    keywords:
      'OUANTUM careers, civil AI jobs, structural engineering jobs India, NDT engineer Chennai, AI researcher Bengaluru, OX1 systems engineer',
    canonicalPath: '/careers',
    jsonLd: [organizationSchema],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Infinite slideshow: automatically switch leaders every 15 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveLeaderIndex((prev) => (prev + 1) % executiveLeaders.length);
    }, 15000);
    return () => clearInterval(timer);
  }, [activeLeaderIndex]);

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

        @keyframes careersMarquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .careers-marquee-container {
          width: 100%;
          overflow: hidden;
          position: relative;
          user-select: none;
          padding: 8px 0 0;
        }

        .careers-marquee-track {
          display: flex;
          width: max-content;
        }

        .careers-marquee-group {
          display: flex;
          gap: 16px;
          flex-shrink: 0;
          padding-right: 16px;
          animation: careersMarquee 35s linear infinite;
          will-change: transform;
        }

        .careers-marquee-container:hover .careers-marquee-group {
          animation-play-state: paused;
        }

        .careers-marquee-card {
          width: 260px;
          height: 190px;
          background: #f4f3ec;
          border-radius: 0px !important;
          overflow: hidden;
          flex-shrink: 0;
          border: 1px solid rgba(0, 0, 0, 0.08);
          position: relative;
          transition: border-color 0.25s ease, transform 0.25s ease;
        }

        .careers-marquee-card:hover {
          border-color: rgba(0, 0, 0, 0.25);
          transform: translateY(-2px);
        }

        .careers-marquee-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .subpage-wrapper .careers-cta-headline {
          color: #ffffff !important;
          -webkit-text-fill-color: #ffffff !important;
          -webkit-text-stroke: 0px transparent !important;
          font-family: 'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
          font-weight: 400 !important;
          letter-spacing: -0.025em !important;
          line-height: 1.08 !important;
        }
      `}</style>

      {/* =========================================================================
          1. HERO SECTION
          ========================================================================= */}
      <section
        className="ic-hero-section"
        style={{
          position: 'relative',
          padding: 'clamp(64px, 8vw, 96px) 0 40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          background: '#ffffff',
          borderBottom: 'none',
        }}
      >
        {/* Hero Central Content */}
        <div style={{ maxWidth: '960px', margin: '0 auto', position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 16px' }}>
          {/* Main Hero Headline - Matches Home Hero Stroke & Thickness */}
          <motion.h1
            className="ic-hero-headline"
            style={{
              fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              fontWeight: 400,
              color: '#111111',
              textAlign: 'center',
              margin: '0 auto 1.5rem',
              width: '100%',
              fontSize: 'clamp(2.6rem, 5.8vw, 5.2rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
            }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <span style={{ fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", display: 'block', fontWeight: 400, color: '#111111', textAlign: 'center', margin: '0 auto' }}>
              Join the team defining the
            </span>
            <span style={{ fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", display: 'block', fontWeight: 400, color: '#111111', textAlign: 'center', margin: '0 auto' }}>
              AI era of civil infrastructure
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="ic-hero-subtext"
            style={{
              fontFamily: 'var(--ic-font-sans)',
              fontSize: 'clamp(1.05rem, 1.35vw, 1.2rem)',
              lineHeight: 1.6,
              color: 'var(--ic-text-secondary)',
              maxWidth: '820px',
              margin: '0 auto 2.25rem',
              textAlign: 'center',
            }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Build hardware-grade signal acquisition, deterministic consensus algorithms, and spatial BIM engines transforming public megaprojects nationwide.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '12px',
              flexWrap: 'wrap',
              marginBottom: '2.75rem',
            }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <a href="#open-roles" className="ic-btn-primary">
              See {allRoles.length} open roles
            </a>
            <Link to="/about" className="ic-btn-secondary">
              Our mission <ArrowRight size={14} style={{ marginLeft: '4px' }} />
            </Link>
          </motion.div>
        </div>

        {/* Gallery Strip Below Hero Button — Infinite Marquee List */}
        <div className="careers-marquee-container">
          <div className="careers-marquee-track">
            {[0, 1, 2].map((groupIndex) => (
              <div
                key={groupIndex}
                className="careers-marquee-group"
                aria-hidden={groupIndex > 0 ? 'true' : undefined}
              >
                {galleryPhotos.map((photo, i) => (
                  <div key={`${groupIndex}-${i}`} className="careers-marquee-card">
                    <img
                      src={photo.src}
                      alt={photo.caption}
                      loading={groupIndex === 0 ? 'eager' : 'lazy'}
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (photo.fallback && target.src !== photo.fallback) {
                          target.src = photo.fallback;
                        }
                      }}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. WHO WE ARE (fin.ai 2-Column Editorial Success Section)
          ========================================================================= */}
      <section
        style={{
          padding: 'clamp(80px, 10vw, 120px) 0',
          background: '#ffffff',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 16px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '48px 64px',
              alignItems: 'start',
            }}
          >
            <div>
              <h2
                className="subpage-section-title"
                style={{
                  fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                  fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)',
                  fontWeight: 300,
                  lineHeight: 1.05,
                  color: '#111111',
                  letterSpacing: '-0.015em',
                  WebkitTextStroke: '1.2px #ffffff',
                  WebkitTextFillColor: '#111111',
                  margin: 0,
                  maxWidth: '520px',
                }}
              >
                A company built for extraordinary success
              </h2>
            </div>

            <div>
              <h3
                style={{
                  fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                  fontSize: '1.5rem',
                  fontWeight: 400,
                  color: '#111111',
                  margin: '0 0 1.25rem 0',
                  letterSpacing: '-0.015em',
                }}
              >
                Who we are
              </h3>
              <p
                style={{
                  fontFamily: 'var(--ic-font-sans)',
                  fontSize: '1.1rem',
                  lineHeight: 1.7,
                  color: '#4a5565',
                  marginBottom: '1.5rem',
                }}
              >
                OUANTUM is the civil infrastructure quality assurance AI company delivering <span className="ic-text-highlight">deterministic verification</span> —
                from non-destructive field testing to codified compliance to 3D digital twins. Today, founder-led, we are
                pioneering the new category of <span className="ic-text-highlight">civil autonomous QA agents</span> across national infrastructure corridors.
              </p>
              <p
                style={{
                  fontFamily: 'var(--ic-font-sans)',
                  fontSize: '1.1rem',
                  lineHeight: 1.7,
                  color: '#4a5565',
                  margin: 0,
                }}
              >
                OUANTUM aims to create extraordinary value for both engineers and infrastructure partners by tackling
                work worth lakhs of crores across highways, metro viaducts, and capital megaprojects. We want to be a
                defining AI company — one people point to when they tell the story of this era. And we want to build a
                special company culture that shapes careers and stays with people long after they leave. We hold a very high
                bar, but for the particularly ambitious and brilliant, there are few better places to work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. FOUNDER MESSAGE BANNER (fin.ai/careers Quote Style)
          ========================================================================= */}
      <section
        style={{
          padding: 'clamp(70px, 8vw, 100px) 0',
          background: '#ffffff',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 16px' }}>
          <div
            style={{
              background: '#111111',
              color: '#ffffff',
              borderRadius: 0,
              padding: 'clamp(48px, 6vw, 72px) clamp(32px, 5vw, 64px)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Background Image Layer - Clean, no filter */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 0,
                pointerEvents: 'none',
              }}
            >
              <img
                src="/assets/images/founders-quote-card-bg.webp"
                alt="From our founders architectural background"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  display: 'block',
                }}
              />
            </div>

            <div style={{ maxWidth: '820px', position: 'relative', zIndex: 1 }}>
              <div
                style={{
                  fontFamily: 'var(--ic-font-sans)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#ffffff',
                  textShadow: '0 1px 4px rgba(0, 0, 0, 0.85)',
                  marginBottom: '1.5rem',
                }}
              >
                From our founders
              </div>
              <blockquote
                style={{
                  fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                  fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                  fontWeight: 400,
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  margin: '0 0 2rem 0',
                }}
              >
                “For the <span className="ic-text-highlight-light">truly ambitious</span>, there are few better places to be.”
              </blockquote>
              <div style={{ fontFamily: 'var(--ic-font-sans)' }}>
                <div style={{ fontSize: '1.05rem', fontWeight: 600, color: '#ffffff' }}>
                  Balakumaran D & Rahul
                </div>
                <div style={{ fontSize: '0.875rem', color: '#ffffff', marginTop: '2px', opacity: 0.9, textShadow: '0 1px 4px rgba(0, 0, 0, 0.85)' }}>
                  Founders, OUANTUM
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. THE VALUES THAT MAKE GREAT WORK POSSIBLE (Interactive Accordion)
          ========================================================================= */}
      <section
        style={{
          padding: 'clamp(80px, 10vw, 120px) 0',
          background: '#ffffff',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 16px' }}>
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
              The values that make great work possible
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
              Our operating principles define how we resolve engineering disputes, invent deterministic algorithms, and scale national infrastructure safety.
            </p>
          </div>

          {/* Accordion Rows */}
          <div style={{ borderTop: '1px solid rgba(0, 0, 0, 0.1)' }}>
            {values.map((val, idx) => {
              const isOpen = activeValueIndex === idx;
              return (
                <div
                  key={idx}
                  style={{
                    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                    transition: 'background 0.2s',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setActiveValueIndex(isOpen ? null : idx)}
                    style={{
                      width: '100%',
                      background: 'none',
                      border: 'none',
                      padding: '28px 0',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                        fontSize: 'clamp(1.25rem, 2.2vw, 1.75rem)',
                        fontWeight: 400,
                        color: '#111111',
                        letterSpacing: '-0.015em',
                      }}
                    >
                      {val.title}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ color: '#111111', display: 'flex', alignItems: 'center' }}
                    >
                      <ChevronDown size={22} />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <p
                          style={{
                            fontFamily: 'var(--ic-font-sans)',
                            fontSize: '1.05rem',
                            lineHeight: 1.7,
                            color: '#4a5565',
                            margin: '0 0 28px 0',
                            maxWidth: '780px',
                          }}
                        >
                          {val.desc}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. BENEFITS & PERKS (fin.ai 2-Column Category Checklist Style)
          ========================================================================= */}
      <section
        style={{
          padding: 'clamp(80px, 10vw, 120px) 0',
          background: '#ffffff',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 16px' }}>
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
              Benefits & engineering perks
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
              We provide comprehensive resources so you can focus on building world-class technology with peace of mind.
            </p>
          </div>

          <div style={{ borderTop: '1px solid rgba(0, 0, 0, 0.1)' }}>
            {perksList.map((category, idx) => (
              <div
                key={idx}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '24px 60px',
                  padding: '40px 0',
                  borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                  alignItems: 'start',
                }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                      fontSize: '1.5rem',
                      fontWeight: 400,
                      color: '#111111',
                      margin: 0,
                      letterSpacing: '-0.015em',
                    }}
                  >
                    {category.category}
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {category.items.map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <Check size={18} color="#111111" style={{ flexShrink: 0, marginTop: '3px' }} />
                      <span
                        style={{
                          fontFamily: 'var(--ic-font-sans)',
                          fontSize: '1.025rem',
                          lineHeight: 1.6,
                          color: '#4a5565',
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

          {/* Action button below perks */}
          <div style={{ marginTop: '3.5rem', textAlign: 'center' }}>
            <a
              href="#open-roles"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#111111',
                color: '#ffffff',
                fontFamily: 'var(--ic-font-sans)',
                fontSize: '0.95rem',
                fontWeight: 500,
                padding: '12px 28px',
                borderRadius: '9999px',
                textDecoration: 'none',
              }}
            >
              See {allRoles.length} open roles
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. FOUR NATIONAL OFFICES & LABS (fin.ai Location Cards Grid)
          ========================================================================= */}
      <section
        style={{
          padding: 'clamp(80px, 10vw, 120px) 0',
          background: '#ffffff',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 16px' }}>
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
              Our office & hardware labs
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
              Our engineers, AI researchers, and hardware specialists operate from our central engineering headquarters and hardware laboratories in Chennai.
            </p>
          </div>

          <div style={{ width: '100%' }}>
            {offices.map((office, idx) => (
              <div
                key={idx}
                style={{
                  background: '#f4f3ec',
                  border: '1px solid rgba(0, 0, 0, 0.07)',
                  borderRadius: 0,
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  overflow: 'hidden',
                  minHeight: '420px',
                }}
              >
                {/* Left: Image */}
                <div style={{ overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={office.image}
                    alt={office.city}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      display: 'block',
                    }}
                  />
                </div>
                {/* Right: Info */}
                <div style={{ padding: '48px 44px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3
                      className="about-card-title"
                      style={{
                        fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                        fontSize: '2rem',
                        fontWeight: 500,
                        color: '#111111',
                        letterSpacing: '-0.03em',
                        margin: '0 0 8px 0',
                      }}
                    >
                      {office.city}
                    </h3>
                    <div
                      style={{
                        fontFamily: 'var(--ic-font-sans)',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: '#111111',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        marginBottom: '24px',
                        opacity: 0.6,
                      }}
                    >
                      {office.title}
                    </div>
                    <p
                      style={{
                        fontFamily: 'var(--ic-font-sans)',
                        fontSize: '1rem',
                        lineHeight: 1.7,
                        color: '#4a5565',
                        margin: '0 0 16px 0',
                        maxWidth: '360px',
                      }}
                    >
                      {office.address}
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--ic-font-sans)',
                        fontSize: '0.9rem',
                        lineHeight: 1.6,
                        color: '#6b7280',
                        margin: 0,
                      }}
                    >
                      Engineering headquarters · Hardware &amp; NDT laboratories · AI research division
                    </p>
                  </div>

                  <div style={{ marginTop: '2.5rem', paddingTop: '20px', borderTop: '1px solid rgba(0, 0, 0, 0.08)' }}>
                    <a
                      href="#open-roles"
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        fontFamily: 'var(--ic-font-sans)',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: '#111111',
                        textDecoration: 'underline',
                        textUnderlineOffset: '3px',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <span>See all {allRoles.length} open roles</span>
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          6B. WORK WITH INDUSTRY LEADERS REWRITING THE RULES (fin.ai/careers Style)
          Placed directly above Open roles at OUANTUM
          ========================================================================= */}
      <section className="leaders-spotlight-section">
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 16px' }}>
          {/* Main Stage Grid: Title (Left) | Photo (Center) | Bio Card (Right) */}
          <div className="leaders-spotlight-stage">
            {/* Left Column: Heading with normal text (no text-stroke effect) */}
            <div>
              <div
                className="leaders-spotlight-heading"
                role="heading"
                aria-level={2}
                style={{
                  fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                  fontSize: 'clamp(2.5rem, 4.2vw, 3.8rem)',
                  fontWeight: 400,
                  lineHeight: 1.08,
                  letterSpacing: '-0.025em',
                  color: '#ffffff',
                  WebkitTextStroke: '0px transparent',
                  WebkitTextStrokeWidth: '0px',
                  WebkitTextFillColor: '#ffffff',
                  margin: 0,
                  maxWidth: '440px',
                }}
              >
                Work with<br />industry leaders<br />rewriting the rules
              </div>
            </div>

            {/* Center Column: Portrait Photo with smooth cross-fade */}
            <div className="leaders-spotlight-image-container">
              <AnimatePresence mode="wait">
                <motion.div
                  key={executiveLeaders[activeLeaderIndex].name}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  style={{ width: '100%', height: '100%', position: 'relative' }}
                >
                  <img
                    src={executiveLeaders[activeLeaderIndex].image}
                    alt={executiveLeaders[activeLeaderIndex].name}
                    className="leaders-spotlight-image"
                  />
                  <div className="leaders-spotlight-image-fade" />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Column: Floating Dark Bio Card */}
            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={executiveLeaders[activeLeaderIndex].name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="leaders-spotlight-card"
                  style={{
                    borderRadius: 0,
                    WebkitTextStroke: '0px transparent',
                  }}
                >
                  <div
                    className="leaders-spotlight-card-name"
                    role="heading"
                    aria-level={3}
                    style={{
                      fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                      fontSize: 'clamp(1.4rem, 2vw, 1.75rem)',
                      fontWeight: 500,
                      color: '#ffffff',
                      WebkitTextStroke: '0px transparent',
                      WebkitTextFillColor: '#ffffff',
                      margin: '0 0 4px 0',
                    }}
                  >
                    {executiveLeaders[activeLeaderIndex].name}
                  </div>
                  <div
                    className="leaders-spotlight-card-role"
                    style={{
                      fontFamily: 'var(--ic-font-sans)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: '#9ca3af',
                      WebkitTextStroke: '0px transparent',
                      marginBottom: '1.25rem',
                    }}
                  >
                    {executiveLeaders[activeLeaderIndex].role}
                  </div>
                  <p
                    className="leaders-spotlight-card-bio"
                    style={{
                      fontFamily: 'var(--ic-font-sans)',
                      fontSize: '0.95rem',
                      lineHeight: 1.65,
                      color: '#d1d5db',
                      WebkitTextStroke: '0px transparent',
                      margin: '0 0 1.5rem 0',
                    }}
                  >
                    {executiveLeaders[activeLeaderIndex].bio}
                  </p>
                  <div
                    className="leaders-spotlight-card-feeds-label"
                    style={{
                      fontFamily: 'var(--ic-font-sans)',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: '#9ca3af',
                      WebkitTextStroke: '0px transparent',
                      marginBottom: '0.5rem',
                    }}
                  >
                    FEEDS :
                  </div>
                  <div className="leaders-spotlight-card-feeds-links">
                    {executiveLeaders[activeLeaderIndex].feeds.map((feed) => (
                      <a
                        key={feed.label}
                        href={feed.url}
                        target={feed.url.startsWith('http') ? '_blank' : undefined}
                        rel={feed.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="leaders-spotlight-card-link"
                        style={{
                          fontFamily: 'var(--ic-font-sans)',
                          fontSize: '0.925rem',
                          color: '#ffffff',
                          textDecoration: 'underline',
                          textUnderlineOffset: '4px',
                          WebkitTextStroke: '0px transparent',
                        }}
                      >
                        {feed.label}
                      </a>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom Row: Tab Bar for Leaders + Explorer Button */}
          <div className="leaders-tabs-container">
            {executiveLeaders.map((leader, idx) => {
              const isActive = idx === activeLeaderIndex;
              return (
                <button
                  key={leader.name}
                  type="button"
                  onClick={() => setActiveLeaderIndex(idx)}
                  className={`leader-tab-item ${isActive ? 'active' : ''}`}
                >
                  <div className="leader-tab-name" style={{ WebkitTextStroke: '0px transparent' }}>
                    {leader.name}
                  </div>
                  <div className="leader-tab-role" style={{ WebkitTextStroke: '0px transparent' }}>
                    {leader.tabRole}
                  </div>
                </button>
              );
            })}
            <a
              href="#open-roles"
              style={{
                background: '#ffffff',
                color: '#111111',
                borderRadius: '9999px',
                padding: '10px 22px',
                fontSize: '0.85rem',
                fontFamily: 'var(--ic-font-sans)',
                fontWeight: 500,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                alignSelf: 'center',
                marginLeft: 'auto',
                flexShrink: 0,
                WebkitTextStroke: '0px transparent',
              }}
            >
              <span>Explore open roles</span>
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. OPEN ROLES AT OUANTUM (Full Interactive Job Board with Filters)
          ========================================================================= */}
      <section
        id="open-roles"
        style={{
          padding: 'clamp(80px, 10vw, 120px) 0',
          background: '#ffffff',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 16px' }}>
          {/* Section Header */}
          <div style={{ maxWidth: '780px', marginBottom: '2.5rem' }}>
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
                margin: '0 0 1rem 0',
              }}
            >
              Open roles at OUANTUM
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
              Explore our current engineering, AI research, and operational positions.
            </p>
          </div>

          {/* Job List Rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {allRoles.map((role) => (
                <div
                  key={role.id}
                  style={{
                    background: '#f4f3ec',
                    border: '1px solid rgba(0, 0, 0, 0.07)',
                    borderRadius: 0,
                    padding: '32px 28px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '24px',
                  }}
                >
                  <div style={{ maxWidth: '780px' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        flexWrap: 'wrap',
                        marginBottom: '10px',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--ic-font-sans)',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                          color: '#111111',
                        }}
                      >
                        {role.department}
                      </span>
                      <span
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '0.85rem',
                          color: '#4a5565',
                          fontFamily: 'var(--ic-font-sans)',
                          fontWeight: 500,
                        }}
                      >
                        <MapPin size={13} />
                        {role.location}
                      </span>
                      <span style={{ fontSize: '0.85rem', color: '#6a7282', fontFamily: 'var(--ic-font-sans)' }}>
                        • {role.type}
                      </span>
                    </div>

                    <h3
                      className="about-card-title"
                      style={{
                        fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                        fontSize: '1.4rem',
                        fontWeight: 400,
                        color: '#111111',
                        letterSpacing: '-0.015em',
                        marginBottom: '8px',
                        lineHeight: 1.25,
                      }}
                    >
                      {role.title}
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
                      {role.description}
                    </p>
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={() => setSelectedRole(role)}
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: '6px 0',
                        fontFamily: 'var(--ic-font-sans)',
                        fontSize: '0.925rem',
                        fontWeight: 600,
                        color: '#111111',
                        textDecoration: 'underline',
                        textUnderlineOffset: '3px',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <span>View role & apply</span>
                      <ArrowUpRight size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      {/* =========================================================================
          8. CAREER CALL-TO-ACTION BANNER (Above Footer)
          "Now is the time. Take your career to the next level."
          ========================================================================= */}
      <section
        className="ic-bottom-cta-section why-section"
        aria-label="Take your career to the next level"
        style={{
          padding: 'clamp(40px, 6vw, 70px) 0 clamp(60px, 8vw, 90px)',
          background: '#ffffff',
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 16px' }}>
          <div
            className="careers-cta-card why-cta-card"
            style={{
              position: 'relative',
              width: '100%',
              borderRadius: 0,
              padding: 'clamp(56px, 7vw, 96px) clamp(28px, 6vw, 72px)',
              minHeight: '380px',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              backgroundImage: 'url("/assets/images/careers-cta-architecture.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <h2
              className="why-cta-headline careers-cta-headline"
              style={{
                fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontSize: 'clamp(2.2rem, 4.8vw, 4.2rem)',
                fontWeight: 400,
                color: '#ffffff',
                WebkitTextFillColor: '#ffffff',
                WebkitTextStroke: '0px transparent',
                WebkitTextStrokeWidth: '0px',
                lineHeight: 1.08,
                letterSpacing: '-0.025em',
                maxWidth: '880px',
                margin: '0 0 2.25rem 0',
                textShadow: '0 2px 12px rgba(0, 0, 0, 0.75)',
              }}
            >
              <span
                style={{
                  color: '#ffffff',
                  WebkitTextFillColor: '#ffffff',
                  WebkitTextStroke: '0px transparent',
                  WebkitTextStrokeWidth: '0px',
                }}
              >
                Now is the time. Take your career to the next level.
              </span>
            </h2>

            <a
              href="#open-roles"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('open-roles');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#ffffff',
                color: '#111111',
                fontFamily: 'var(--ic-font-sans)',
                fontSize: '0.95rem',
                fontWeight: 600,
                padding: '12px 28px',
                borderRadius: '9999px',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
                transition: 'background-color 0.2s ease, transform 0.2s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f0f0f0';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Find your next role
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          ROLE DETAILS & APPLICATION POPUP MODAL (Clean Sharp Card, No Image Circle)
          ========================================================================= */}
      <AnimatePresence>
        {selectedRole && (
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
              onClick={() => setSelectedRole(null)}
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
                maxWidth: '640px',
                width: '100%',
                maxHeight: '85vh',
                overflowY: 'auto',
                padding: '44px 40px',
                boxShadow: '0 24px 48px rgba(0, 0, 0, 0.12)',
                zIndex: 10,
              }}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedRole(null)}
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
                aria-label="Close modal"
              >
                <X size={22} />
              </button>

              {/* Modal Header */}
              <div style={{ marginBottom: '1.75rem', paddingRight: '36px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '8px',
                    flexWrap: 'wrap',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--ic-font-sans)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      color: '#6a7282',
                    }}
                  >
                    {selectedRole.department}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#6a7282', fontFamily: 'var(--ic-font-sans)' }}>
                    • {selectedRole.location} • {selectedRole.type}
                  </span>
                </div>

                <h3
                  className="about-card-title"
                  style={{
                    fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                    fontSize: '1.75rem',
                    fontWeight: 400,
                    color: '#111111',
                    margin: 0,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                  }}
                >
                  {selectedRole.title}
                </h3>
              </div>

              {/* Role Description */}
              <div style={{ marginBottom: '2rem' }}>
                <h4
                  style={{
                    fontFamily: 'var(--ic-font-sans)',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: '#111111',
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  Overview
                </h4>
                <p
                  style={{
                    fontFamily: 'var(--ic-font-sans)',
                    fontSize: '1rem',
                    lineHeight: 1.7,
                    color: '#4a5565',
                    margin: 0,
                  }}
                >
                  {selectedRole.description}
                </p>
              </div>

              {/* Requirements */}
              <div style={{ marginBottom: '2.5rem' }}>
                <h4
                  style={{
                    fontFamily: 'var(--ic-font-sans)',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: '#111111',
                    marginBottom: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  What we look for
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {selectedRole.requirements.map((req, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <Check size={16} color="#111111" style={{ flexShrink: 0, marginTop: '3px' }} />
                      <span
                        style={{
                          fontFamily: 'var(--ic-font-sans)',
                          fontSize: '0.925rem',
                          lineHeight: 1.6,
                          color: '#4a5565',
                        }}
                      >
                        {req}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', paddingTop: '16px', borderTop: '1px solid rgba(0, 0, 0, 0.08)' }}>
                <a
                  href={`mailto:founders@ouantum.com?subject=Application: ${encodeURIComponent(selectedRole.title)}`}
                  className="ic-btn-primary"
                  style={{ padding: '12px 28px', fontSize: '0.95rem' }}
                >
                  <span>Apply via Email</span>
                  <ArrowUpRight size={14} />
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedRole(null)}
                  className="ic-btn-secondary"
                  style={{ padding: '12px 20px', fontSize: '0.95rem' }}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Careers;
