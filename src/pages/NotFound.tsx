import React from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';

const NotFound: React.FC = () => {
  // Mascot Image Positioning & Scaling Configurations
  const MASCOT_CONFIG = {
    scale: 1.05,
    x: 0,
    y: 0,
  };

  useSEO({
    title: '404 - Page Not Found | Ouantum',
    description: 'The page you are looking for does not exist or has been moved. Return to the OUANTUM homepage.',
    canonicalPath: '/404',
    noIndex: true,
  });

  return (
    <main
      className="subpage-wrapper"
      style={{
        background: '#ffffff',
        color: '#111111',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 1.5rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        border: 'none',
      }}
      aria-label="404 page not found"
    >
      {/* Background 404 watermark */}
      <span
        style={{
          fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          fontSize: 'clamp(6rem, 20vw, 16rem)',
          fontWeight: 900,
          color: 'rgba(0, 0, 0, 0.03)',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          userSelect: 'none',
          letterSpacing: '-0.05em',
          zIndex: 0,
        }}
        aria-hidden="true"
      >
        404
      </span>

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '560px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Centered Mascot Image */}
        <div
          style={{
            marginBottom: '1.75rem',
            display: 'flex',
            justifyContent: 'center',
            transform: `translate(${MASCOT_CONFIG.x}px, ${MASCOT_CONFIG.y}px) scale(${MASCOT_CONFIG.scale})`,
          }}
        >
          <img
            src="/assets/images/ox1_avatar/8.png"
            alt="OUANTUM Avatar Bot 404"
            style={{
              width: 'clamp(180px, 25vw, 250px)',
              height: 'auto',
              objectFit: 'contain',
              display: 'block',
              transform: `translate3d(${MASCOT_CONFIG.x}px, ${MASCOT_CONFIG.y}px, 0) scale(${MASCOT_CONFIG.scale})`,
            }}
          />
        </div>

        {/* Main Heading */}
        <h1
          style={{
            fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            fontWeight: 300,
            fontSize: 'clamp(2rem, 5vw, 2.75rem)',
            color: '#111111',
            margin: '0 0 1rem 0',
            lineHeight: 1.2,
            letterSpacing: '-0.015em',
          }}
        >
          Page Not Found
        </h1>

        {/* Description Wording */}
        <p
          style={{
            fontFamily: 'var(--ic-font-sans)',
            fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
            color: '#4a5565',
            marginBottom: '2rem',
            lineHeight: 1.6,
            maxWidth: '460px',
          }}
        >
          The page you are looking for doesn't exist, has been removed, or the address was typed incorrectly.
        </p>

        {/* Action Navigation */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <Link
            to="/"
            className="ic-btn-primary"
            style={{ padding: '10px 22px', fontSize: '0.9rem' }}
          >
            Back to Home
          </Link>
          <Link
            to="/contact"
            className="ic-btn-secondary"
            style={{ padding: '10px 22px', fontSize: '0.9rem' }}
          >
            Contact Support
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
