import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import GlowCard from '../GlowCard';

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
          <div style={{ position: 'relative', display: 'inline-block', margin: '0' }}>
            <h2 className="section-title" style={{
              fontFamily: 'var(--font-geist)',
              fontWeight: 200,
              position: 'relative',
              zIndex: 1,
            }}>
              Secure Your<br />Infrastructure
            </h2>
          </div>
          <p className="section-subtitle">
            Ready to commence technical consultation or site integrity audit?
          </p>
        </motion.div>

        {/* 3-col info cards */}
        <div className="contact-grid">

          {/* Email */}
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setActiveCard(isActive(0) ? null : 0)}
            style={{ cursor: 'pointer' }}
          >
            <GlowCard style={{ padding: '2.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', minHeight: '160px' }}>
                <a
                  href="mailto:contact@ouantum.com"
                  onClick={e => e.stopPropagation()}
                  className="contact-link"
                >
                  contact@ouantum.com
                </a>
                <p className="contact-label" style={{ marginTop: 'auto' }}>
                  RESPONSE WITHIN 12H
                </p>
              </div>
            </GlowCard>
          </motion.div>

          {/* Phone */}
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setActiveCard(isActive(1) ? null : 1)}
            style={{ cursor: 'pointer' }}
          >
            <GlowCard style={{ padding: '2.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', minHeight: '160px' }}>
                <div>
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
                </div>
                <p className="contact-label" style={{ marginTop: 'auto' }}>
                  OPERATIONAL: 24/7
                </p>
              </div>
            </GlowCard>
          </motion.div>

          {/* Address */}
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setActiveCard(isActive(2) ? null : 2)}
            style={{ cursor: 'pointer' }}
          >
            <GlowCard style={{ padding: '2.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', minHeight: '160px' }}>
                <p className="contact-address" style={{ margin: 0 }}>
                  25, SILAMBU ST,<br />PADMANABHA NAGAR, CHOOLAIMEDU,<br />CHENNAI, TAMIL NADU 600094
                </p>
              </div>
            </GlowCard>
          </motion.div>

        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <motion.a
            href="https://api.whatsapp.com/send/?phone=917695827158&text&type=phone_number&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setCtaActive(v => !v)}
            className={`contact-cta ${ctaActive ? 'active' : ''}`}
            style={{ textDecoration: 'none', display: 'inline-flex' }}
          >
            <span className="contact-cta-text">
              START CONVERSATION
            </span>
            <div className="contact-cta-icon">
              <ArrowRight size={16} />
            </div>
          </motion.a>
        </div>

      </div>
    </section>
  );
};

export default Contact;
