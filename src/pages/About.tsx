import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="subpage-wrapper" style={{ background: '#000', color: '#fff', minHeight: '100vh', paddingBottom: '80px' }}>
      
      {/* Invisible SEO Structured Data for Google Bots to recognize founders */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Ouantum",
            "founder": [
              {
                "@type": "Person",
                "name": "Balakumaran D",
                "jobTitle": "Founder"
              },
              {
                "@type": "Person",
                "name": "Rahul",
                "jobTitle": "Co-founder"
              }
            ]
          })
        }}
      />

      {/* Subpage Hero Section */}
      <section className="hero" style={{ minHeight: '60vh', paddingTop: '120px' }}>
        <div className="container hero-content">
          <div className="section-split hero-main-layout">
            <motion.div className="sidebar-info hero-left">
              <div className="hero-labels">
                <span className="hero-tech-label">
                  THE ORGANIZATION · ARCHIVE · INFRASTRUCTURE
                </span>
              </div>
              <p className="side-description hero-description">
                ARCHIVING THE MINDS BEHIND THE DETERMINISTIC INTELLIGENCE ENGINE.
              </p>
            </motion.div>

            <motion.div className="hero-right-content hero-right">
              <h1 style={{ fontFamily: 'var(--font-adieu)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.1, marginBottom: '2rem' }}>
                ABOUT<br/>ARCHIVE
              </h1>
              <p className="hero-subtext">
                Ouantum is driven by a core team of civil engineers, AI specialists, and structural auditors committed to bringing deterministic, intelligence-driven quality assurance to critical infrastructure.
              </p>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="hero-image-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          style={{ height: '60vh' }}
        >
          <img
            src="/assets/images/about-hero.jpg"
            alt="Infrastructure Archive"
            className="subpage-hero-image"
          />
          <div className="overlay-gradient"></div>
        </motion.div>
      </section>

      {/* Content Section */}
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', paddingTop: '4rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', lineHeight: '1.8', color: 'rgba(255,255,255,0.7)', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          
          {/* CORE TEAM */}
          <div>
            <h2 style={{ fontFamily: 'var(--font-adieu)', fontSize: '1.5rem', color: '#fff', marginBottom: '2rem', letterSpacing: '0.1em' }}>CORE TEAM</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
              
              <div className="animated-silver-bg" style={{ padding: '2rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                <h3 style={{ color: '#fff', margin: '0 0 0.5rem 0', fontSize: '1.1rem', letterSpacing: '0.1em' }}>BALAKUMARAN D</h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', margin: '0', fontSize: '0.8rem', letterSpacing: '0.1em' }}>AI ENGINEER & CYBERSECURITY</p>
              </div>

              <div className="animated-silver-bg" style={{ padding: '2rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                <h3 style={{ color: '#fff', margin: '0 0 0.5rem 0', fontSize: '1.1rem', letterSpacing: '0.1em' }}>RAHUL</h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', margin: '0', fontSize: '0.8rem', letterSpacing: '0.1em' }}>UI/UX</p>
              </div>

              <div className="animated-silver-bg" style={{ padding: '2rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                <h3 style={{ color: '#fff', margin: '0 0 0.5rem 0', fontSize: '1.1rem', letterSpacing: '0.1em' }}>RAGHU</h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', margin: '0', fontSize: '0.8rem', letterSpacing: '0.1em' }}>LEGAL & JUNIOR AI ENGINEER</p>
              </div>

              <div className="animated-silver-bg" style={{ padding: '2rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                <h3 style={{ color: '#fff', margin: '0 0 0.5rem 0', fontSize: '1.1rem', letterSpacing: '0.1em' }}>SABARI RAJA</h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', margin: '0', fontSize: '0.8rem', letterSpacing: '0.1em' }}>SALES HEAD</p>
              </div>

            </div>
          </div>

          {/* PARTNER ECOSYSTEM */}
          <div>
            <h2 style={{ fontFamily: 'var(--font-adieu)', fontSize: '1.5rem', color: '#fff', marginBottom: '2rem', letterSpacing: '0.1em' }}>PARTNER ECOSYSTEM</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
              
              <a href="https://etherence.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <div className="animated-silver-bg" style={{ padding: '2rem', border: '1px solid rgba(255,255,255,0.1)', height: '100%', transition: 'border-color 0.3s' }}>
                  <h3 style={{ color: '#fff', margin: '0 0 0.5rem 0', fontSize: '1.1rem', letterSpacing: '0.1em' }}>ETHERENCE</h3>
                  <p style={{ color: 'rgba(255,255,255,0.5)', margin: '0 0 1.5rem 0', fontSize: '0.8rem', letterSpacing: '0.1em' }}>TECHNOLOGY & CYBERSECURITY</p>
                  <span style={{ color: '#2563EB', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>etherence.com ↗</span>
                </div>
              </a>

              <a href="https://zapsters.in" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <div className="animated-silver-bg" style={{ padding: '2rem', border: '1px solid rgba(255,255,255,0.1)', height: '100%', transition: 'border-color 0.3s' }}>
                  <h3 style={{ color: '#fff', margin: '0 0 0.5rem 0', fontSize: '1.1rem', letterSpacing: '0.1em' }}>ZAPSTERS</h3>
                  <p style={{ color: 'rgba(255,255,255,0.5)', margin: '0 0 1.5rem 0', fontSize: '0.8rem', letterSpacing: '0.1em' }}>UI/UX & CIVIL INTERFACE</p>
                  <span style={{ color: '#2563EB', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>zapsters.in ↗</span>
                </div>
              </a>

              <a href="https://amith.in.net" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <div className="animated-silver-bg" style={{ padding: '2rem', border: '1px solid rgba(255,255,255,0.1)', height: '100%', transition: 'border-color 0.3s' }}>
                  <h3 style={{ color: '#fff', margin: '0 0 0.5rem 0', fontSize: '1.1rem', letterSpacing: '0.1em' }}>AMITH</h3>
                  <p style={{ color: 'rgba(255,255,255,0.5)', margin: '0 0 1.5rem 0', fontSize: '0.8rem', letterSpacing: '0.1em' }}>CIVIL & ALLIED ENGINEERING</p>
                  <span style={{ color: '#2563EB', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>amith.in.net ↗</span>
                </div>
              </a>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;
