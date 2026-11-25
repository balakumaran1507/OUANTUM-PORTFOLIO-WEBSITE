import React, { useState } from 'react';
import { motion } from 'framer-motion';

const IntercomTestimonials: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 900);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const testimonial = {
    logo: ‘AMITH CIVIL & ALLIED ENGINEERING SERVICES PVT LTD’,
    quote: ‘In 38 years of structural audit work, report compilation has always been the bottleneck — correlating UPV data, rebound hammer readings, and IS 456 checks manually consumed close to 60 hours per structure. With OX1, ‘,
    highlight: ‘that same report is ready in under 30 minutes on-site.’,
    quoteEnd: ‘ The SonReb engine handles the correlation; our team focuses on engineering judgment, not data entry.’,
    author: ‘Er. Kalaimony R’,
    role: ‘Director & Quality Auditor, AMITH Civil & Allied Engineering Services Pvt Ltd · Senior Consultant, CUBE – IIT Madras’,
    initials: ‘KR’,
  };

  return (
    <section className=”ic-quote-section” style={{ padding: ‘80px 16px’ }}>
      <div style={{ maxWidth: ‘1440px’, margin: ‘0 auto’, width: ‘100%’, position: ‘relative’ }}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            display: ‘grid’,
            gridTemplateColumns: ‘1fr 300px’,
            gap: ‘64px’,
            alignItems: ‘center’,
          }}
          className=”ic-testimonial-grid”
        >
          {/* Left: Logo and Big Quote */}
          <div className=”ic-testimonial-left” style={{ textAlign: isMobile ? ‘center’ : ‘left’ }}>
            <div
              className=”ic-testimonial-logo”
              style={{
                fontFamily: ‘var(--ic-font-sans)’,
                fontSize: ‘1.25rem’,
                fontWeight: 800,
                color: ‘#111111’,
                letterSpacing: ‘0.04em’,
                marginBottom: ‘28px’,
              }}
            >
              {testimonial.logo}
            </div>

            <blockquote
              className=”ic-testimonial-quote”
              style={{
                fontFamily: ‘var(--ic-font-sans)’,
                fontSize: ‘clamp(1.5rem, 2.6vw, 2.4rem)’,
                lineHeight: 1.25,
                fontWeight: 500,
                color: ‘#111111’,
                margin: 0,
                letterSpacing: ‘-0.025em’,
              }}
            >
              “{testimonial.quote}
              <span className=”ic-quote-highlight”>{testimonial.highlight}</span>
              {testimonial.quoteEnd}”
            </blockquote>
          </div>

          {/* Right: Author Profile Card */}
          <div
            className=”ic-testimonial-author-card”
            style={{
              backgroundColor: ‘var(--ic-bg)’,
              borderRadius: ‘16px’,
              padding: ‘24px’,
              border: ‘1px solid var(--ic-border)’,
              display: ‘flex’,
              flexDirection: ‘column’,
              alignItems: ‘center’,
              textAlign: ‘center’,
            }}
          >
            <div
              style={{
                width: ‘90px’,
                height: ‘90px’,
                borderRadius: ‘50%’,
                overflow: ‘hidden’,
                marginBottom: ‘16px’,
                border: ‘2px solid #e5e7eb’,
                background: ‘#f3f4f6’,
                display: ‘flex’,
                alignItems: ‘center’,
                justifyContent: ‘center’,
                fontSize: ‘1.5rem’,
                fontWeight: 700,
                color: ‘#6a7282’,
                fontFamily: ‘var(--ic-font-sans)’,
              }}
            >
              {testimonial.initials}
            </div>

            <div style={{ fontSize: ‘1.1rem’, fontWeight: 700, color: ‘#111111’, marginBottom: ‘4px’ }}>
              {testimonial.author}
            </div>

            <div style={{ fontSize: ‘0.8125rem’, color: ‘#6a7282’, lineHeight: 1.4 }}>
              {testimonial.role}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default IntercomTestimonials;
