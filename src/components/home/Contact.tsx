import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Contact: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [ctaActive, setCtaActive] = useState(false);

  const isActive = (idx: number) => activeCard === idx;

  return (
    <section id="contact" className="contact-section">
      <div className="container">

        {/* Centered Header */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="contact-header"
        >
          <h2 className="section-title">
            SECURE YOUR<br />INFRASTRUCTURE
          </h2>
          <p className="section-subtitle">
            READY TO COMMENCE TECHNICAL CONSULTATION OR SITE INTEGRITY AUDIT?
          </p>
        </motion.div>

        {/* 3-col info cards */}
        <div className="contact-grid">

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
            <p className="contact-label">
              RESPONSE WITHIN 12H
            </p>
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
              style={{ fontSize: '1rem', marginBottom: '8px', display: 'block' }}
            >
              +91 7695827158
            </a>
            <a
              href="tel:+918610805559"
              onClick={e => e.stopPropagation()}
              className="contact-link"
              style={{ fontSize: '1rem', display: 'block' }}
            >
              +91 8610805559
            </a>
            <p className="contact-label">
              OPERATIONAL: 24/7
            </p>
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

        {/* START CONVERSATION */}
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
            <ArrowRight size={22} />
          </div>
        </motion.a>

      </div>
    </section>
  );
};

export default Contact;
