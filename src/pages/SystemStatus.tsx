import React, { useEffect } from 'react';
import LoadingScreen from '../components/common/states/LoadingScreen';
import SuccessScreen from '../components/common/states/SuccessScreen';
import ErrorScreen from '../components/common/states/ErrorScreen';
import EmptyScreen from '../components/common/states/EmptyScreen';
import useSEO from '../hooks/useSEO';

const SystemStatus: React.FC = () => {
  useSEO({
    title: 'System Status | Ouantum',
    description:
      'Preview of deterministic UI feedback states used across the OUANTUM platform, loading, success, error, and empty states for field data ingestion and processing.',
    keywords: 'OUANTUM system status, UI states, loading screen, error screen, field data ingestion',
    canonicalPath: '/system-status',
    noIndex: true, // Internal dev page, do not index
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main
      className="subpage-wrapper"
      style={{ background: 'var(--ic-bg)', color: 'var(--ic-text)', minHeight: '100vh', paddingBottom: '80px', paddingTop: '120px' }}
    >
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>

        <header style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <h1 style={{ fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontWeight: 300, fontSize: 'clamp(2rem, 5vw, 3.2rem)', lineHeight: 1.15, color: '#111111', letterSpacing: '-0.015em' }}>
            System Feedback States
          </h1>
          <p
            style={{
              fontFamily: 'var(--ic-font-sans)',
              fontSize: '1rem',
              color: '#4a5565',
              marginTop: '1.25rem',
              lineHeight: 1.6,
            }}
          >
            Preview of <span className="ic-text-highlight">deterministic UI states</span> used across the OUANTUM platform for field data ingestion and processing feedback.
          </p>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>

          <section aria-label="Loading state preview">
            <h2
              style={{
                fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontWeight: 400,
                fontSize: '1.1rem',
                color: '#111111',
                marginBottom: '1.5rem',
                paddingBottom: '0.5rem',
                borderBottom: '1px solid var(--ic-border)',
              }}
            >
              1. PROCESSING / LOADING STATE
            </h2>
            <LoadingScreen />
          </section>

          <section aria-label="Success state preview">
            <h2
              style={{
                fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontWeight: 400,
                fontSize: '1.1rem',
                color: '#111111',
                marginBottom: '1.5rem',
                paddingBottom: '0.5rem',
                borderBottom: '1px solid var(--ic-border)',
              }}
            >
              2. SUCCESS / VALIDATION STATE
            </h2>
            <SuccessScreen onAction={() => console.log('Action clicked')} />
          </section>

          <section aria-label="Error state preview">
            <h2
              style={{
                fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontWeight: 400,
                fontSize: '1.1rem',
                color: '#111111',
                marginBottom: '1.5rem',
                paddingBottom: '0.5rem',
                borderBottom: '1px solid var(--ic-border)',
              }}
            >
              3. ERROR / CRITICAL FAILURE STATE
            </h2>
            <ErrorScreen onAction={() => console.log('Retry clicked')} />
          </section>

          <section aria-label="Empty state preview">
            <h2
              style={{
                fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontWeight: 400,
                fontSize: '1.1rem',
                color: '#111111',
                marginBottom: '1.5rem',
                paddingBottom: '0.5rem',
                borderBottom: '1px solid var(--ic-border)',
              }}
            >
              4. EMPTY / NULL STATE
            </h2>
            <EmptyScreen onAction={() => console.log('Init clicked')} />
          </section>

        </div>
      </div>
    </main>
  );
};

export default SystemStatus;


