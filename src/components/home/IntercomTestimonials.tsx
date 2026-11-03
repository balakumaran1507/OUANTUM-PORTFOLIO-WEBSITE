import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IntercomTestimonials: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 900);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const testimonials = [
    {
      company: 'L&T INFRASTRUCTURE',
      logo: 'LARSEN & TOUBRO',
      quote:
        'What really stood out to me was how easy OX1 was to deploy across 14 active highway packages. The SonReb correlation UX was fantastic. It was a very fresh build, easy to understand and use, and ',
      highlight: 'it compressed our 3-week TPQM audit cycles into a single afternoon.',
      quoteEnd: ' It just fit well into our engineering workflow.',
      author: 'R. Natarajan',
      role: 'Chief Quality Engineer, L&T Transportation Infrastructure',
      avatar: '/assets/images/Balakumaran_CEO_Profile_Pic.png',
    },
    {
      company: 'DELHI METRO RAIL',
      logo: 'DELHI METRO RAIL CORP',
      quote:
        'We needed absolute certainty on viaduct pier concrete homogeneity. OUANTUM’s multi-model consensus fused rebound indices with ultrasonic pulse velocity instantly. ',
      highlight: 'We eliminated subjective contractor disputes and received verified IS 13311 certification on day one.',
      quoteEnd: ' An indispensable tool for critical metro corridors.',
      author: 'Dr. K. Sharma',
      role: 'Senior Structural Consultant, DMRC Phase IV',
      avatar: '/assets/images/Guru_CTO_Profile.jpeg',
    },
    {
      company: 'TATA PROJECTS',
      logo: 'TATA PROJECTS LIMITED',
      quote:
        'Before OUANTUM, auditing 400 structural columns required endless manual spreadsheets. ',
      highlight: 'OX1 identified low-velocity micro-anomalies 48 hours before concrete cure,',
      quoteEnd: ' protecting our critical delivery timelines and contractual compliance.',
      author: 'S. Banerjee',
      role: 'Head of Quality Assurance, Tata Projects',
      avatar: '/assets/images/Nabeelah_COO_Profile_Pic.jpeg',
    },
  ];

  const current = testimonials[activeTab];

  return (
    <section className="ic-quote-section" style={{ padding: '80px 16px' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', width: '100%', position: 'relative' }}>
        {/* Tab Buttons */}
        <div className="ic-quote-tabs">
          {testimonials.map((t, idx) => (
            <button
              key={t.company}
              className={`ic-quote-tab-btn ${activeTab === idx ? 'active' : ''}`}
              onClick={() => setActiveTab(idx)}
            >
              {t.company}
            </button>
          ))}
        </div>

        {/* Testimonial Body */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 300px',
              gap: '64px',
              alignItems: 'center',
            }}
            className="ic-testimonial-grid"
          >
            {/* Left: Logo and Big Quote */}
            <div className="ic-testimonial-left" style={{ textAlign: isMobile ? 'center' : 'left' }}>
              <div
                className="ic-testimonial-logo"
                style={{
                  fontFamily: 'var(--ic-font-sans)',
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  color: '#111111',
                  letterSpacing: '0.04em',
                  marginBottom: '28px',
                }}
              >
                {current.logo}
              </div>

              <blockquote
                className="ic-testimonial-quote"
                style={{
                  fontFamily: 'var(--ic-font-sans)',
                  fontSize: 'clamp(1.5rem, 2.6vw, 2.4rem)',
                  lineHeight: 1.25,
                  fontWeight: 500,
                  color: '#111111',
                  margin: 0,
                  letterSpacing: '-0.025em',
                }}
              >
                “{current.quote}
                <span className="ic-quote-highlight">{current.highlight}</span>
                {current.quoteEnd}”
              </blockquote>
            </div>

            {/* Right: Author Profile Card */}
            <div
              className="ic-testimonial-author-card"
              style={{
                backgroundColor: 'var(--ic-bg)',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid var(--ic-border)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  marginBottom: '16px',
                  border: '2px solid #ffffff',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)',
                }}
              >
                <img
                  src={current.avatar}
                  alt={current.author}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111111', marginBottom: '4px' }}>
                {current.author}
              </div>

              <div style={{ fontSize: '0.8125rem', color: '#6a7282', lineHeight: 1.4 }}>
                {current.role}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default IntercomTestimonials;
