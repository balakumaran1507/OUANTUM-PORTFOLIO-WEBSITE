import React from 'react';
import { Link } from 'react-router-dom';
import useSEO from '../hooks/useSEO';

// Mascot image positioning parameters (scale, x-axis offset, y-axis offset)
const MASCOT_CONFIG = {
  scale: 1.10, // Scale factor: 1.0 = 100%, 1.2 = 120%, 0.8 = 80%
  x: 0,       // X-axis position offset in pixels (e.g. 0, 10, -10)
  y: 25,       // Y-axis position offset in pixels (e.g. 0, -10, 10)
};

const NotFound: React.FC = () => {
  useSEO({
    title: '404, Page Not Found | OUANTUM',
    description: 'The page you are looking for does not exist or has been moved. Return to the OUANTUM homepage.',
    canonicalPath: '/404',
    noIndex: true,
  });

  return (
    <main
      style={{
        background: '#000000',
        color: '#ffffff',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 1.5rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-label="404 page not found"
    >
      {/* Background 404 watermark */}
      <span
        style={{
          fontFamily: 'var(--font-adieu)',
          fontSize: 'clamp(6rem, 20vw, 16rem)',
          fontWeight: 900,
          color: 'rgba(255, 255, 255, 0.03)',
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
        {/* Centered Mascot Image with scale, x-axis, and y-axis position attributes */}
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
            fontFamily: 'var(--font-adieu)',
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            color: '#ffffff',
            margin: '0 0 1rem 0',
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
          }}
        >
          Page Not Found
        </h1>

        {/* Description Wording */}
        <p
          style={{
            fontFamily: 'var(--font-main)',
            fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
            color: 'rgba(255, 255, 255, 0.65)',
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
            gap: '1rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              color: '#000000',
              background: '#ffffff',
              padding: '0.85rem 1.75rem',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            BACK TO HOME
          </Link>
          <Link
            to="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              color: '#ffffff',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              padding: '0.85rem 1.75rem',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            CONTACT SUPPORT
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
