import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
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
    title: 'Case Studies | OUANTUM, AI QA in Action at Scale',
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
    author: 'BALAKUMARAN D',
    title: 'How Deterministic AI Overhauls NHAI Bridge Audits',
    description:
      'Explore why manual field data collection is evolving into a model of determinism and control, allowing for real-time validation of critical infrastructure against IS 456.',
    image: '/assets/images/bg4.jpg',
    imageAlt: 'NHAI bridge structural audit, AI-powered quality assurance using NDT methods and IS 456 compliance',
    link: '#',
  };

  const gridCaseStudies = [
    {
      author: 'RAHUL',
      title: 'Validating the 30-Year Coastal Expansion',
      description:
        'See how the OUANTUM engine redefines structural scaling, removing manual bottlenecks with co-packaged AI models to unlock 50x faster reporting.',
      image: '/assets/images/bg1.jpg',
      imageAlt: 'Coastal infrastructure expansion project, structural validation using OUANTUM AI platform',
      link: '#',
    },
    {
      author: 'RAGHU',
      title: 'Getting Started with the SonReb Correlation Engine',
      description:
        'Run automated NDT analysis on OUANTUM. The AI pipeline unifies Rebound Hammer and UPV readings to achieve deterministic consensus on concrete strength.',
      image: '/assets/images/bg2.jpg',
      imageAlt: 'SonReb correlation NDT analysis, rebound hammer and UPV combined concrete strength testing',
      link: '#',
    },
    {
      author: 'SABARI RAJA',
      title: 'What Does "Code Compliance" Actually Mean?',
      description:
        'A deep dive into how OUANTUM automatically flags outlier readings and correlates them against Indian Standards without requiring human intervention.',
      image: '/assets/images/bg3.jpg',
      imageAlt: 'IS code compliance automation, OUANTUM flagging concrete test outliers against IS 456 and IS 13311',
      link: '#',
    },
  ];

  return (
    <main
      className="subpage-wrapper"
      style={{ background: '#000000', color: '#fff', minHeight: '100vh', paddingBottom: '80px' }}
    >
      {/* Header Section */}
      <section style={{ paddingTop: '160px', paddingBottom: '60px', textAlign: 'center' }} aria-label="Case studies header">
        <div className="container">
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              color: 'rgba(255, 255, 255, 0.4)',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '1.5rem',
            }}
          >
            KNOWLEDGE BASE · FIELD DEPLOYMENTS · AUDIT INTELLIGENCE
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-adieu)',
              fontSize: 'clamp(3rem, 7vw, 5rem)',
              fontWeight: 400,
              color: '#fff',
            }}
          >
            The OUANTUM Log
          </h1>
        </div>
      </section>

      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Featured Case Study */}
        <article aria-label={`Featured case study: ${featuredCaseStudy.title}`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="animated-silver-bg"
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              borderRadius: '24px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              overflow: 'hidden',
              marginBottom: '4rem',
              minHeight: '450px',
            }}
          >
            {/* Left Text Content */}
            <div className="case-study-featured-content">
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.15em',
                  color: 'rgba(255, 255, 255, 0.4)',
                  textTransform: 'uppercase',
                  marginBottom: '1.5rem',
                  display: 'block',
                }}
              >
                AUTHOR: {featuredCaseStudy.author}
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-adieu)',
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  lineHeight: 1.1,
                  color: '#fff',
                  marginBottom: '1.5rem',
                }}
              >
                {featuredCaseStudy.title}
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9rem',
                  lineHeight: 1.8,
                  color: 'rgba(255, 255, 255, 0.6)',
                  marginBottom: '3rem',
                  maxWidth: '90%',
                }}
              >
                {featuredCaseStudy.description}
              </p>
              <a
                href={featuredCaseStudy.link}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#fff',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  letterSpacing: '0.1em',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  opacity: 0.8,
                  transition: 'opacity 0.2s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.opacity = '1')}
                onMouseOut={(e) => (e.currentTarget.style.opacity = '0.8')}
                aria-label={`Read more about: ${featuredCaseStudy.title}`}
              >
                READ MORE <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>

            {/* Right Image */}
            <div className="case-study-featured-image">
              <img
                src={featuredCaseStudy.image}
                alt={featuredCaseStudy.imageAlt}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </motion.div>
        </article>

        {/* 3-Column Grid */}
        <section aria-label="More case studies">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
            }}
          >
            {gridCaseStudies.map((study, idx) => (
              <article key={idx} aria-label={study.title}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="animated-silver-bg"
                  style={{
                    borderRadius: '20px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                  }}
                >
                  {/* Card Image */}
                  <div style={{ height: '240px', width: '100%', overflow: 'hidden' }}>
                    <img
                      src={study.image}
                      alt={study.imageAlt}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  {/* Card Content */}
                  <div
                    style={{
                      padding: '2.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 1,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        letterSpacing: '0.15em',
                        color: 'rgba(255, 255, 255, 0.4)',
                        textTransform: 'uppercase',
                        marginBottom: '1rem',
                        display: 'block',
                      }}
                    >
                      AUTHOR: {study.author}
                    </span>
                    <h3
                      style={{
                        fontFamily: 'var(--font-adieu)',
                        fontSize: '1.5rem',
                        lineHeight: 1.2,
                        color: '#fff',
                        marginBottom: '1rem',
                      }}
                    >
                      {study.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.85rem',
                        lineHeight: 1.7,
                        color: 'rgba(255, 255, 255, 0.5)',
                        marginBottom: '2.5rem',
                        flex: 1,
                      }}
                    >
                      {study.description}
                    </p>
                    <a
                      href={study.link}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: '#fff',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.8rem',
                        letterSpacing: '0.1em',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        marginTop: 'auto',
                        opacity: 0.8,
                        transition: 'opacity 0.2s',
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.opacity = '1')}
                      onMouseOut={(e) => (e.currentTarget.style.opacity = '0.8')}
                      aria-label={`Read more about: ${study.title}`}
                    >
                      READ MORE <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  </div>
                </motion.div>
              </article>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
};

export default CaseStudies;


