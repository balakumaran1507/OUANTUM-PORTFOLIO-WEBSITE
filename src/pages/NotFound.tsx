import React from 'react';
import { Link } from 'react-router-dom';
import useSEO from '../hooks/useSEO';

const NotFound: React.FC = () => {
  useSEO({
    title: '404 — Page Not Found | Ouantum',
    description: 'The page you are looking for does not exist or has been moved. Return to the Ouantum homepage.',
    canonicalPath: '/404',
    noIndex: true,
  });

  return (
    <main
      style={{
        background: '#000',
        color: '#fff',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        textAlign: 'center',
      }}
      aria-label="404 page not found"
    >
      <div>
        <span
          style={{
            fontFamily: 'var(--font-adieu)',
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            margin: '0',
            color: 'rgba(255,255,255,0.1)',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            userSelect: 'none',
          }}
          aria-hidden="true"
        >
          404 ERROR
        </span>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontFamily: 'var(--font-adieu)', fontSize: '2rem', marginBottom: '1rem' }}>
            NODE UNREACHABLE
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '1rem',
              color: 'rgba(255,255,255,0.7)',
              marginBottom: '2rem',
              maxWidth: '400px',
              margin: '0 auto 2rem',
            }}
          >
            The requested sector does not exist or has been archived. Please verify your coordinates.
          </p>
          <Link
            to="/"
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem',
              color: '#000',
              background: '#fff',
              padding: '12px 24px',
              textDecoration: 'none',
              borderRadius: '4px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
            }}
          >
            RETURN TO DASHBOARD
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
