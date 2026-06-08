import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import useSEO from '../hooks/useSEO';

const BASE_URL = 'https://ouantum.com';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Ouantum',
  url: BASE_URL,
  sameAs: ['https://www.linkedin.com/company/ouantum/'],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-7695827158',
    contactType: 'customer service',
    email: 'contact@ouantum.com',
    availableLanguage: ['English', 'Tamil'],
  },
};

const Contact: React.FC = () => {
  useSEO({
    title: 'Contact Ouantum | Get in Touch for QA Platform Demos',
    description:
      'Contact Ouantum to discuss platform integration, structural auditing requirements, or enterprise deployments. Reach our engineering team via email, phone, or WhatsApp.',
    keywords:
      'contact Ouantum, Ouantum email, structural audit demo, QA platform inquiry, civil engineering AI contact Chennai, Ouantum phone number',
    canonicalPath: '/contact',
    jsonLd: [organizationSchema],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [ctaActive, setCtaActive] = useState(false);

  const isActive = (idx: number) => activeCard === idx;

  return (
    <main
      className="subpage-wrapper"
      style={{ background: '#000', color: '#fff', minHeight: '100vh', paddingBottom: '80px' }}
    >
      {/* Hero */}
      <section className="hero" style={{ minHeight: '60vh', paddingTop: '120px' }} aria-label="Contact hero section">
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
              <h1
                style={{
                  fontFamily: 'var(--font-adieu)',
                  fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                  lineHeight: 1.1,
                  marginBottom: '2rem',
                }}
              >
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
            alt="Ouantum headquarters in Chennai — contact our civil engineering AI platform team"
            className="subpage-hero-image"
          />
          <div className="overlay-gradient" aria-hidden="true"></div>
        </motion.div>
      </section>

      {/* Content Section */}
      <section
        className="container"
        style={{ maxWidth: '1200px', margin: '0 auto', paddingTop: '4rem' }}
        aria-label="Contact options"
      >
        <div className="contact-grid">

          {/* Email */}
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setActiveCard(isActive(0) ? null : 0)}
            className={`contact-card animated-silver-bg ${isActive(0) ? 'active' : ''}`}
            role="button"
            tabIndex={0}
            aria-label="Email contact card"
            onKeyDown={(e) => e.key === 'Enter' && setActiveCard(isActive(0) ? null : 0)}
          >
            <a
              href="mailto:contact@ouantum.com"
              onClick={e => e.stopPropagation()}
              className="contact-link"
              aria-label="Send email to Ouantum at contact@ouantum.com"
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
            role="button"
            tabIndex={0}
            aria-label="Phone contact card"
            onKeyDown={(e) => e.key === 'Enter' && setActiveCard(isActive(1) ? null : 1)}
          >
            <a
              href="tel:+917695827158"
              onClick={e => e.stopPropagation()}
              className="contact-link"
              style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}
              aria-label="Call Ouantum at +91 7695827158"
            >
              +91 7695827158
            </a>
            <a
              href="tel:+918610805559"
              onClick={e => e.stopPropagation()}
              className="contact-link"
              style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}
              aria-label="Call Ouantum at +91 8610805559"
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
            role="button"
            tabIndex={0}
            aria-label="Office address card"
            onKeyDown={(e) => e.key === 'Enter' && setActiveCard(isActive(2) ? null : 2)}
          >
            <address className="contact-address" style={{ fontStyle: 'normal' }}>
              25, SILAMBU ST,<br />PADMANABHA NAGAR, CHOOLAIMEDU,<br />CHENNAI, TAMIL NADU 600094
            </address>
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
          aria-label="Start a WhatsApp conversation with Ouantum"
        >
          <span className="contact-cta-text">
            START CONVERSATION
          </span>
          <div className="contact-cta-icon" aria-hidden="true">
            <ArrowRight size={24} />
          </div>
        </motion.a>
      </section>
    </main>
  );
};

export default Contact;
