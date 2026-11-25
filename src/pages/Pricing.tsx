import React from 'react';
import { Link } from 'react-router-dom';
import useSEO from '../hooks/useSEO';

const Pricing: React.FC = () => {
  useSEO({
    title: 'OUANTUM | Platform Pricing',
    description: 'OUANTUM platform pricing is scoped to your infrastructure programme. Contact us for a custom quote.',
    canonicalPath: '/pricing',
  });

  return (
    <main
      style={{
        backgroundColor: 'var(--ic-bg)',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 16px',
      }}
    >
      <div style={{ maxWidth: '600px', width: '100%', textAlign: 'center' }}>
        <p
          style={{
            fontFamily: 'var(--ic-font-sans)',
            fontSize: '0.8rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#6a7282',
            marginBottom: '20px',
          }}
        >
          Platform Pricing
        </p>

        <h1
          style={{
            fontFamily: 'var(--ic-font-sans)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 300,
            color: '#111111',
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            margin: '0 0 20px',
          }}
        >
          Scoped to your programme
        </h1>

        <p
          style={{
            fontFamily: 'var(--ic-font-sans)',
            fontSize: '1rem',
            lineHeight: 1.6,
            color: '#555555',
            margin: '0 0 40px',
          }}
        >
          OUANTUM pricing is structured around your infrastructure programme size,
          project count, and compliance requirements. Contact us and we will prepare
          a scoped quote for your team.
        </p>

        <Link
          to="/contact"
          className="ic-btn-primary"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '14px 32px',
            fontSize: '0.95rem',
            fontWeight: 600,
            borderRadius: 0,
            textDecoration: 'none',
          }}
        >
          Request a Quote
        </Link>
      </div>
    </main>
  );
};

export default Pricing;
