import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import useSEO from '../hooks/useSEO';

const BASE_URL = 'https://ouantum.com';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'OUANTUM',
  url: BASE_URL,
  sameAs: ['https://www.linkedin.com/company/ouantum/'],
};

const CaseStudies: React.FC = () => {
  useSEO({
    title: 'Case Studies | Ouantum',
    description:
      'Explore how OUANTUM has transformed quality assurance for NHAI bridge audits, Amaravati Capital City, coastal infrastructure, and Indian Standard code compliance at scale.',
    keywords:
      'OUANTUM case studies, NHAI bridge audit AI, Amaravati capital city QA, SonReb NDT case study, IS 456 compliance automation, TPQM India, structural audit case study',
    canonicalPath: '/case-studies',
    jsonLd: [organizationSchema],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const featuredCaseStudy = {
    author: 'Balakumaran D',
    date: '15 October 2026',
    title: 'How Deterministic AI Overhauls NHAI Bridge Audits & Marine Viaducts',
    description:
      'Explore how manual field data collection evolved into a deterministic pipeline, enabling real-time validation of prestressed bridge girders, pier caps, and marine pile caps against IS 456, IRC:SP:51, and IRC:112.',
    image: '/assets/images/buildings/building-5.png',
    imageAlt: 'NHAI bridge structural audit and coastal marine viaduct, AI-powered quality assurance using NDT methods and IS 456 compliance',
    link: '/contact',
  };

  const gridCaseStudies = [
    {
      tag: 'COASTAL DURABILITY',
      author: 'RAHUL',
      date: 'May 28, 2026',
      title: 'Validating the 30-Year Coastal Expansion',
      description:
        'See how the OUANTUM engine redefines structural scaling, removing manual bottlenecks with co-packaged AI models to forecast chloride ingress and carbonation depth.',
      image: '/assets/images/buildings/building-6.png',
      imageAlt: 'Coastal infrastructure expansion project, structural validation using OUANTUM AI platform',
      link: '/contact',
    },
    {
      tag: 'NDT CONSENSUS',
      author: 'RAGHU',
      date: 'April 28, 2026',
      title: 'SonReb Multi-Model Correlation Engine',
      description:
        'Run automated NDT analysis on OUANTUM. The AI pipeline unifies Rebound Hammer and UPV readings to achieve deterministic consensus on concrete strength.',
      image: '/assets/images/buildings/building-3.png',
      imageAlt: 'SonReb correlation NDT analysis, rebound hammer and UPV combined concrete strength testing',
      link: '/contact',
    },
    {
      tag: 'CODAL GOVERNANCE',
      author: 'SABARI RAJA',
      date: 'April 20, 2026',
      title: 'Zero-Dispute Codal Validation for State PWD',
      description:
        'A deep dive into how OUANTUM automatically flags outlier readings and correlates them against Indian Standards without requiring manual contractor reconciliations.',
      image: '/assets/images/buildings/building-11.png',
      imageAlt: 'IS code compliance automation, OUANTUM flagging concrete test outliers against IS 456 and IS 13311',
      link: '/contact',
    },
    {
      tag: 'CAPITAL MEGAPROJECT',
      author: 'ER. KALAIMONY',
      date: 'March 14, 2026',
      title: 'Amaravati 45-Storey Secretariat & High Court Complex',
      description:
        'TPQM multi-stage quality monitoring across integrated towers. Validated 4,000 residential units and 45-storey core against IS 1893 seismic standards and IS 456.',
      image: '/assets/images/buildings/building-2.png',
      imageAlt: 'Amaravati high court and 45-storey integrated secretariat third-party quality monitoring',
      link: '/contact',
    },
    {
      tag: 'STRUCTURAL DYNAMICS',
      author: 'GURU PRASANTH',
      date: 'February 22, 2026',
      title: 'Continuous Cantilevered Helical Ramp & Core Deflection Twin',
      description:
        'Finite-element modal vibration and deflection monitoring for continuous cantilevered helical ramps under dynamic cyclic wind and pedestrian excitation.',
      image: '/assets/images/buildings/building-4.png',
      imageAlt: 'Helical ramp observation headquarters dynamic deflection and modal vibration analysis',
      link: '/contact',
    },
    {
      tag: 'SUSTAINABLE INFRASTRUCTURE',
      author: 'BALAKUMARAN D',
      date: 'January 18, 2026',
      title: 'Biophilic Vertical Forest & Thermal Gradient Durability Twin',
      description:
        'Longitudinal thermal expansion analysis and root-barrier concrete durability modeling across stepped terraced cantilevers and deep planter slabs.',
      image: '/assets/images/buildings/building-8.png',
      imageAlt: 'Vertical forest terraced concrete durability twin and thermal gradient monitoring',
      link: '/contact',
    },
    {
      tag: 'FACADE ENGINEERING',
      author: 'RAHUL',
      date: 'December 12, 2025',
      title: 'Kinetic Brise-Soleil Structural Shading & Wind Tunnel Validation',
      description:
        'Wind tunnel aeroelasticity validation and structural anchor pull-out verification for geometric perforated aluminum sunscreens in cyclone zones.',
      image: '/assets/images/buildings/building-9.png',
      imageAlt: 'Geometric folded perforated brise-soleil sunscreen structural anchor validation',
      link: '/contact',
    },
    {
      tag: 'FREEFORM ARCHITECTURE',
      author: 'SABARI RAJA',
      date: 'November 29, 2025',
      title: 'Aerodynamic Wave Canopy In-Situ Maturity Tracking',
      description:
        'Automated stripping time optimization for double-curved parametric bronze shell canopies, cutting formwork cycle times by 40% with zero microcracking.',
      image: '/assets/images/buildings/building-1.png',
      imageAlt: 'Parametric bronze helical wave canopy in-situ concrete maturity and stripping validation',
      link: '/contact',
    },
    {
      tag: 'RETROFIT & REHABILITATION',
      author: 'RAGHU',
      date: 'October 15, 2025',
      title: 'Historic Arched Vaults & High-Performance Concrete Inversion',
      description:
        'Acoustic tomography characterization and UPV velocity profiling for complex arched vault restorations under IS 13311 acoustic testing protocols.',
      image: '/assets/images/buildings/building-7.png',
      imageAlt: 'Arched vault acoustic tomography non-destructive testing and rehabilitation',
      link: '/contact',
    },
    {
      tag: 'CORROSION FORENSICS',
      author: 'GURU PRASANTH',
      date: 'September 24, 2025',
      title: 'Pre-Patinated Copper Cladding & Marine Salt Aerosol Twin',
      description:
        '50-year Fickian diffusion simulation assessing atmospheric salt aerosol deposition and backing rebar corrosion risk in extreme coastal saline zones.',
      image: '/assets/images/buildings/building-12.png',
      imageAlt: 'Curved pre-patinated copper facade coastal chloride ingress 50-year durability simulation',
      link: '/contact',
    },
    {
      tag: 'PRECAST QUALITY',
      author: 'BALAKUMARAN D',
      date: 'August 10, 2025',
      title: 'Modular Cantilevered Pavilions & Precast Joint Tolerances',
      description:
        'Computer vision automated photogrammetry detecting sub-millimeter precast shear key alignments and tendon duct grouting completeness.',
      image: '/assets/images/buildings/building-10.png',
      imageAlt: 'Modular cantilevered architectural pavilions precast joint tolerance verification',
      link: '/contact',
    },
  ];

  return (
    <main
      className="subpage-wrapper"
      style={{ background: '#ffffff', color: '#111111', minHeight: '100vh', paddingBottom: '0' }}
    >
      {/* Main Container */}
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: 'clamp(24px, 3vw, 36px) 16px 80px',
        }}
      >
        {/* Page Title (Fin.ai Header style matching reference) */}
        <div style={{ marginBottom: '24px' }}>
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: '-0.035em',
              color: '#111111',
              margin: 0,
            }}
          >
            Case Studies
          </motion.h1>
        </div>

        {/* =======================================================================
            FEATURED CASE STUDY HERO (Sharp corners, no tag, author/date next to button)
            ======================================================================= */}
        <section
          aria-label={`Featured case study: ${featuredCaseStudy.title}`}
          style={{
            marginBottom: '64px',
            paddingBottom: '56px',
            borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          }}
        >
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: 'clamp(28px, 4.5vw, 56px)',
                alignItems: 'center',
              }}
            >
              {/* Featured Image (Sharp Corners) */}
              <Link
                to={featuredCaseStudy.link}
                style={{
                  borderRadius: '0px',
                  overflow: 'hidden',
                  background: '#f4f3ec',
                  aspectRatio: '16 / 10',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.06)',
                  border: '1px solid rgba(0, 0, 0, 0.06)',
                  display: 'block',
                  textDecoration: 'none',
                }}
              >
                <img
                  src={featuredCaseStudy.image}
                  alt={featuredCaseStudy.imageAlt}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    borderRadius: '0px',
                    transition: 'transform 0.4s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.03)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                />
              </Link>

              {/* Featured Content Details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
                <Link
                  to={featuredCaseStudy.link}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <h2
                    style={{
                      fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                      fontSize: 'clamp(1.9rem, 3.4vw, 2.75rem)',
                      fontWeight: 400,
                      lineHeight: 1.15,
                      letterSpacing: '-0.025em',
                      color: '#111111',
                      margin: 0,
                    }}
                  >
                    {featuredCaseStudy.title}
                  </h2>
                </Link>

                <p
                  style={{
                    fontFamily: 'var(--ic-font-sans)',
                    fontSize: '1rem',
                    lineHeight: 1.65,
                    color: '#4a5565',
                    margin: 0,
                    maxWidth: '560px',
                  }}
                >
                  {featuredCaseStudy.description}
                </p>

                {/* Button & Author / Date row */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '18px',
                    flexWrap: 'wrap',
                    marginTop: '8px',
                  }}
                >
                  <Link
                    to={featuredCaseStudy.link}
                    style={{
                      backgroundColor: '#111111',
                      color: '#ffffff',
                      padding: '10px 22px',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      borderRadius: '0px',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'background-color 0.2s ease, transform 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#262626';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#111111';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <span>Read more</span>
                  </Link>

                  <span
                    style={{
                      fontFamily: 'var(--ic-font-sans)',
                      fontSize: '0.875rem',
                      color: '#6a7282',
                    }}
                  >
                    {featuredCaseStudy.author} · {featuredCaseStudy.date}
                  </span>
                </div>
              </div>
            </div>
          </motion.article>
        </section>

        {/* =======================================================================
            CASE STUDY CARDS GRID (Vertical layout like reference image with sharp corners)
            ======================================================================= */}
        <section aria-label="More case studies">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '40px 32px',
            }}
          >
            {gridCaseStudies.map((study, idx) => (
              <motion.article
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                <Link
                  to={study.link}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  {/* Thumbnail Image Container (Sharp Corners) */}
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '16 / 10',
                      borderRadius: '0px',
                      overflow: 'hidden',
                      background: '#f4f3ec',
                      marginBottom: '18px',
                      border: '1px solid rgba(0, 0, 0, 0.06)',
                    }}
                  >
                    <img
                      src={study.image}
                      alt={study.imageAlt}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        borderRadius: '0px',
                        transition: 'transform 0.35s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.04)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    />
                  </div>

                  {/* Metadata: Category • Author · Date */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '10px',
                      flexWrap: 'wrap',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--ic-font-sans)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        color: '#111111',
                      }}
                    >
                      {study.tag}
                    </span>
                    <span style={{ color: '#9ca3af', fontSize: '0.75rem' }}>•</span>
                    <span
                      style={{
                        fontFamily: 'var(--ic-font-sans)',
                        fontSize: '0.8125rem',
                        color: '#6a7282',
                      }}
                    >
                      {study.author} · {study.date}
                    </span>
                  </div>

                  {/* Headline */}
                  <h3
                    style={{
                      fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                      fontSize: '1.35rem',
                      fontWeight: 400,
                      lineHeight: 1.25,
                      letterSpacing: '-0.015em',
                      color: '#111111',
                      margin: '0 0 10px 0',
                      transition: 'color 0.2s ease',
                    }}
                  >
                    {study.title}
                  </h3>

                  {/* Excerpt */}
                  <p
                    style={{
                      fontFamily: 'var(--ic-font-sans)',
                      fontSize: '0.925rem',
                      lineHeight: 1.6,
                      color: '#4a5565',
                      margin: '0 0 18px 0',
                      flex: 1,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {study.description}
                  </p>

                  {/* Read More Link */}
                  <div
                    style={{
                      fontFamily: 'var(--ic-font-sans)',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: '#111111',
                      marginTop: 'auto',
                    }}
                  >
                    <span>Read more</span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default CaseStudies;
