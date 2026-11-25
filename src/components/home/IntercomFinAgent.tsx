import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// =========================================================================
// OX1 SECTION ASCII IMAGE PARAMETERS (Tweak position, scale & opacity)
// Architectural square-dot ASCII design matching Zero-defect civil infrastructure bg style
// =========================================================================
export const OX1_IMAGE_CONFIG = {
  // Source options:
  // '/ox1-construction-ascii.png' (standard square-dot, matching Zero-defect CTA bg style)
  // '/ox1-construction-ascii-fine.png' (ultra-fine square-dot)
  // '/ox1-construction-ascii.webp' (compressed WebP)
  src: '/ox1-construction-ascii.png',
  // Horizontal offset (X-axis) in pixels (positive moves right, negative moves left)
  x: 0,
  // Vertical offset (Y-axis) in pixels (positive moves down, negative moves up)
  y: 0,
  // Scale multiplier (e.g. 1.0, 1.05, 0.95)
  scale: 1.0,
  // Opacity (0.0 = fully transparent, 1.0 = fully solid dark ink)
  opacity: 1.0,
  // Rotation angle in degrees
  rotate: 0,
};

const IntercomFinAgent: React.FC = () => {
  return (
    <section style={{ padding: '80px 16px', backgroundColor: '#ffffff', border: 'none' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '64px', alignItems: 'center' }}>
          {/* Left Column: Copy & Actions */}
          <div>
            <h2
              style={{
                fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontSize: 'clamp(1.875rem, 3.5vw, 3.375rem)',
                fontWeight: 300,
                color: '#111111',
                lineHeight: 1.05,
                letterSpacing: '-0.015em',
                WebkitTextStroke: '0.4px #ffffff',
                WebkitTextFillColor: '#111111',
                marginBottom: '1.5rem',
              }}
            >
              OX1 is the highest-performing civil infrastructure AI agent
            </h2>

            <p
              style={{
                fontFamily: 'var(--ic-font-sans)',
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: 'var(--ic-text-secondary)',
                marginBottom: '2rem',
              }}
            >
              OX1 delivers deterministic SonReb correlation with same-day TPQM compliance — trusted by structural consultants, EPC concessionaires, and government authorities across India.
            </p>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
              <Link to="/contact" className="ic-btn-primary">
                Start structural audit
              </Link>
              <Link to="/capabilities/ndt-analysis-engine" className="ic-btn-secondary">
                View demo
              </Link>
            </div>

          </div>

          {/* Right Column: ONLY THE ASCII IMAGE (Pure graphic, matching Zero-defect civil infrastructure bg style) */}
          <div
            className="ic-ox1-ascii-container"
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              overflow: 'visible',
            }}
          >
            <div
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: `translate(calc(var(--ox1-ascii-x, 0px) + ${OX1_IMAGE_CONFIG.x}px), calc(var(--ox1-ascii-y, 0px) + ${OX1_IMAGE_CONFIG.y}px)) scale(calc(var(--ox1-ascii-scale, 1) * ${OX1_IMAGE_CONFIG.scale})) rotate(${OX1_IMAGE_CONFIG.rotate}deg)`,
                transformOrigin: 'center center',
                transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                opacity: OX1_IMAGE_CONFIG.opacity,
              }}
            >
              <motion.img
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                src={OX1_IMAGE_CONFIG.src}
                alt="OUANTUM Civil Infrastructure Construction Site ASCII Architecture"
                style={{
                  width: '100%',
                  maxWidth: '720px',
                  height: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntercomFinAgent;
