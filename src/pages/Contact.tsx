import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Contact: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [ctaActive, setCtaActive] = useState(false);

  const isActive = (idx: number) => activeCard === idx;

  return (
    <div className="subpage-wrapper" style={{ background: '#000', color: '#fff', minHeight: '100vh', paddingBottom: '80px' }}>
      
      {/* Subpage Hero Section */}
      <section className="hero" style={{ minHeight: '60vh', paddingTop: '120px' }}>
        <div className="container hero-content">
          <div className="section-split hero-main-layout">
            <motion.div className="sidebar-info hero-left">
              <div className="hero-labels">
                <span className="hero-tech-label">
                  COMMUNICATION NODE · GLOBAL REACH
                </span>
              </div>
              <p className="side-description hero-description">
                INITIATE SECURE COMMUNICATIONS WITH OUR ENGINEERING TEAM.
              </p>
            </motion.div>

            <motion.div className="hero-right-content hero-right">
              <h1 style={{ fontFamily: 'var(--font-adieu)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.1, marginBottom: '2rem' }}>
                CONTACT<br/>US
              </h1>
              <p className="hero-subtext">
                Reach out to discuss platform integration, structural auditing requirements, or enterprise deployments.
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
            src="/assets/images/contact-us-hero.jpg"
            alt="Contact Background"
            className="subpage-hero-image"
          />
          <div className="overlay-gradient"></div>
        </motion.div>
      </section>

      {/* Content Section */}
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', paddingTop: '4rem' }}>
        <div className="contact-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>

          {/* Email */}
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setActiveCard(isActive(0) ? null : 0)}
            className={`contact-card animated-silver-bg ${isActive(0) ? 'active' : ''}`}
          >
            <a
              href="mailto:contact@ouantum.com"
              onClick={e => e.stopPropagation()}
              className="contact-link"
            >
              contact@ouantum.com
            </a>
            <p className="contact-label">RESPONSE WITHIN 12H</p>
          </motion.div>

          {/* Phone */}
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setActiveCard(isActive(1) ? null : 1)}
            className={`contact-card animated-silver-bg ${isActive(1) ? 'active' : ''}`}
          >
            <a
              href="tel:+917695827158"
              onClick={e => e.stopPropagation()}
              className="contact-link"
              style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}
            >
              +91 7695827158
            </a>
            <a
              href="tel:+918610805559"
              onClick={e => e.stopPropagation()}
              className="contact-link"
              style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}
            >
              +91 8610805559
            </a>
            <p className="contact-label">OPERATIONAL: 24/7</p>
          </motion.div>

          {/* Address */}
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setActiveCard(isActive(2) ? null : 2)}
            className={`contact-card animated-silver-bg ${isActive(2) ? 'active' : ''}`}
          >
            <p className="contact-address">
              25, SILAMBU ST,<br />PADMANABHA NAGAR, CHOOLAIMEDU,<br />CHENNAI, TAMIL NADU 600094
            </p>
          </motion.div>
        </div>

        {/* Action Button */}
        <motion.a
          href="https://api.whatsapp.com/send/?phone=917695827158&text&type=phone_number&app_absent=0"
          target="_blank"
          rel="noopener noreferrer"
          animate={{ opacity: 1, y: 0 }}
          onClick={() => setCtaActive(v => !v)}
          className={`contact-cta animated-silver-bg ${ctaActive ? 'active' : ''}`}
          style={{ textDecoration: 'none', display: 'flex' }}
        >
          <span className="contact-cta-text">
            START CONVERSATION
          </span>
          <div className="contact-cta-icon">
            <ArrowRight size={24} />
          </div>
        </motion.a>
      </div>
    </div>
  );
};

export default Contact;
