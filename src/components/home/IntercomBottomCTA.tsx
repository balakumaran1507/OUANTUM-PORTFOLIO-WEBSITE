import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// =========================================================================
// BOTTOM CTA ASCII BACKGROUND PARAMETERS (Tweak position, scale & opacity)
// =========================================================================
export const BOTTOM_CTA_CONFIG = {
  // Source: Pure square dot ASCII cityscape (/cta-ascii-square.png or /cta-ascii-square-fine.png)
  src: '/cta-ascii-square.png',
  // Horizontal offset (X-axis) in pixels (positive moves right, negative moves left)
  x: 0,
  // Vertical offset (Y-axis) in pixels (positive moves down, negative moves up)
  y: 20,
  // Scale multiplier (e.g. 1.0, 0.85, 0.70)
  scale: 0.85,
  // Opacity (0.0 = transparent, 1.0 = fully solid dark ink)
  opacity: 0.28,
  // Rotation angle in degrees
  rotate: 0,
};

const IntercomBottomCTA: React.FC = () => {
  return (
    <section
      className="ic-bottom-cta-section"
      style={{
        padding: '80px 16px',
        backgroundColor: '#ffffff',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        minHeight: '520px',
        border: 'none',
      }}
    >
      <style>{`
        .ic-bottom-cta-heading {
          font-family: 'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
          font-size: clamp(3.2rem, 7vw, 5.8rem) !important;
          font-weight: 300 !important;
          -webkit-text-stroke: 0.4px #ffffff !important;
          -webkit-text-fill-color: #111111 !important;
          color: #111111 !important;
          line-height: 1.05 !important;
          letter-spacing: -0.035em !important;
          margin-left: auto !important;
          margin-right: auto !important;
          margin-top: 0 !important;
          margin-bottom: 2.5rem !important;
          text-align: center !important;
          display: block !important;
          width: 100% !important;
          max-width: 1180px !important;
        }
      `}</style>

      {/* Background Architectural Square-Dot ASCII Construction Site (from image copy.png) */}
      <div
        className="ic-bottom-cta-ascii-bg"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(calc(-50% + ${BOTTOM_CTA_CONFIG.x}px), calc(-50% + ${BOTTOM_CTA_CONFIG.y}px)) scale(${BOTTOM_CTA_CONFIG.scale}) rotate(${BOTTOM_CTA_CONFIG.rotate}deg)`,
          opacity: BOTTOM_CTA_CONFIG.opacity,
          pointerEvents: 'none',
          zIndex: 1,
          width: '100%',
          maxWidth: '1540px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          userSelect: 'none',
          transition: 'opacity 0.25s ease',
        }}
        aria-hidden="true"
      >
        <motion.img
          initial={{ opacity: 0, scale: BOTTOM_CTA_CONFIG.scale * 0.97 }}
          whileInView={{ opacity: 1, scale: BOTTOM_CTA_CONFIG.scale }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          src={BOTTOM_CTA_CONFIG.src}
          alt="OUANTUM Civil Infrastructure Construction Site ASCII Architecture"
          style={{
            width: '100%',
            maxWidth: '1440px',
            height: 'auto',
            objectFit: 'contain',
            display: 'block',
          }}
        />
      </div>

      {/* Central Content (Headline & Action Buttons) positioned cleanly in front */}
      <div
        style={{
          maxWidth: '1180px',
          width: '100%',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <motion.h2
          className="ic-bottom-cta-heading"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Zero-defect civil infrastructure
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '14px',
            flexWrap: 'wrap',
          }}
        >
          <Link to="/contact" className="ic-btn-primary">
            Start audit
          </Link>
          <Link to="/contact" className="ic-btn-secondary">
            Demo
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default IntercomBottomCTA;
