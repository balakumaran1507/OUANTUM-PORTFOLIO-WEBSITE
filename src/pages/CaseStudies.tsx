import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const CaseStudies: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const featuredCaseStudy = {
    author: 'BALAKUMARAN D',
    title: 'How Deterministic AI Overhauls NHAI Bridge Audits',
    description: 'Explore why manual field data collection is evolving into a model of determinism and control, allowing for real-time validation of critical infrastructure against IS 456.',
    image: '/assets/images/bg4.jpg',
    link: '#',
  };

  const gridCaseStudies = [
    {
      author: 'RAHUL',
      title: 'Validating the 30-Year Coastal Expansion',
      description: 'See how the Ouantum engine redefines structural scaling, removing manual bottlenecks with co-packaged AI models to unlock 50x faster reporting.',
      image: '/assets/images/bg1.jpg',
      link: '#',
    },
    {
      author: 'RAGHU',
      title: 'Getting Started with the SonReb Correlation Engine',
      description: 'Run automated NDT analysis on Ouantum. The AI pipeline unifies Rebound Hammer and UPV readings to achieve deterministic consensus on concrete strength.',
      image: '/assets/images/bg2.jpg',
      link: '#',
    },
    {
      author: 'SABARI RAJA',
      title: 'What Does "Code Compliance" Actually Mean?',
      description: 'A deep dive into how Ouantum automatically flags outlier readings and correlates them against Indian Standards without requiring human intervention.',
      image: '/assets/images/bg3.jpg',
      link: '#',
    },
  ];

  return (
    <div className="subpage-wrapper" style={{ background: '#000', color: '#fff', minHeight: '100vh', paddingBottom: '80px' }}>
      
      {/* Header Section */}
      <section style={{ paddingTop: '160px', paddingBottom: '60px', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontFamily: 'var(--font-adieu)', fontSize: 'clamp(3rem, 7vw, 5rem)', fontWeight: 400, color: '#fff' }}>
            The Ouantum <span style={{ color: '#2563EB' }}>Log</span>
          </h1>
        </div>
      </section>

      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Featured Case Study */}
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
            border: '1px solid rgba(255,255,255,0.1)',
            overflow: 'hidden',
            marginBottom: '4rem',
            minHeight: '450px'
          }}
        >
          {/* Left Text Content */}
          <div className="case-study-featured-content">
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '1.5rem', display: 'block' }}>
              AUTHOR: {featuredCaseStudy.author}
            </span>
            <h2 style={{ fontFamily: 'var(--font-adieu)', fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1, color: '#fff', marginBottom: '1.5rem' }}>
              {featuredCaseStudy.title}
            </h2>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.6)', marginBottom: '3rem', maxWidth: '90%' }}>
              {featuredCaseStudy.description}
            </p>
            <a href={featuredCaseStudy.link} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#2563EB', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.1em', textDecoration: 'none', fontWeight: 'bold' }}>
              READ MORE <ArrowUpRight size={16} />
            </a>
          </div>
          
          {/* Right Image */}
          <div className="case-study-featured-image">
            <img src={featuredCaseStudy.image} alt={featuredCaseStudy.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        </motion.div>

        {/* 3-Column Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {gridCaseStudies.map((study, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="animated-silver-bg"
              style={{
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.1)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Card Image */}
              <div style={{ height: '240px', width: '100%', overflow: 'hidden' }}>
                <img src={study.image} alt={study.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              
              {/* Card Content */}
              <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '1rem', display: 'block' }}>
                  AUTHOR: {study.author}
                </span>
                <h3 style={{ fontFamily: 'var(--font-adieu)', fontSize: '1.5rem', lineHeight: 1.2, color: '#fff', marginBottom: '1rem' }}>
                  {study.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.5)', marginBottom: '2.5rem', flex: 1 }}>
                  {study.description}
                </p>
                <a href={study.link} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#2563EB', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.1em', textDecoration: 'none', fontWeight: 'bold', marginTop: 'auto' }}>
                  READ MORE <ArrowUpRight size={16} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default CaseStudies;
