import React, { useEffect } from 'react';
import LoadingScreen from '../components/common/states/LoadingScreen';
import SuccessScreen from '../components/common/states/SuccessScreen';
import ErrorScreen from '../components/common/states/ErrorScreen';
import EmptyScreen from '../components/common/states/EmptyScreen';

const SystemStatus: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="subpage-wrapper" style={{ background: '#000', color: '#fff', minHeight: '100vh', paddingBottom: '80px', paddingTop: '120px' }}>
      
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '1rem', display: 'block' }}>
            UI COMPONENTS
          </span>
          <h1 style={{ fontFamily: 'var(--font-adieu)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1, color: '#fff' }}>
            SYSTEM FEEDBACK STATES
          </h1>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', marginTop: '1.5rem', lineHeight: 1.6 }}>
            Preview of deterministic UI states used across the Ouantum platform for field data ingestion and processing feedback.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          
          <section>
            <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: '#fff', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
              1. PROCESSING / LOADING STATE
            </h2>
            <LoadingScreen />
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: '#fff', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
              2. SUCCESS / VALIDATION STATE
            </h2>
            <SuccessScreen onAction={() => console.log('Action clicked')} />
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: '#fff', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
              3. ERROR / CRITICAL FAILURE STATE
            </h2>
            <ErrorScreen onAction={() => console.log('Retry clicked')} />
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: '#fff', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
              4. EMPTY / NULL STATE
            </h2>
            <EmptyScreen onAction={() => console.log('Init clicked')} />
          </section>

        </div>
      </div>
    </div>
  );
};

export default SystemStatus;
