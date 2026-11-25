import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import useSEO from '../hooks/useSEO';

const AiAnalysis: React.FC = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'AI Analysis | Ouantum',
    description: 'Deterministic AI analysis and multi-model consensus for civil engineering data.',
    canonicalPath: '/how-it-works/ai-analysis',
  });

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="subpage-wrapper" style={{
      background: '#ffffff',
      color: '#111111',
      minHeight: '100vh',
      fontFamily: 'var(--ic-font-sans)',
      paddingTop: '100px',
      paddingBottom: '100px',
    }}>
      <div className="container" style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 16px' }}>

        {/* Back */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          onClick={() => navigate('/#how-it-works')}
          style={{
            background: 'none', border: 'none',
            color: '#6a7282',
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            fontFamily: 'var(--ic-font-sans)', fontSize: '0.8125rem',
            fontWeight: 500, cursor: 'pointer',
            padding: '8px 0', marginBottom: '2.5rem',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#111111')}
          onMouseLeave={e => (e.currentTarget.style.color = '#6a7282')}
        >
          <ArrowLeft size={15} /> BACK TO HOW IT WORKS
        </motion.button>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ paddingBottom: '2.5rem', marginBottom: '2rem' }}
        >
          <h1 style={{
            fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 300, lineHeight: 1.1, color: '#111111',
            margin: '0 0 1.25rem 0', letterSpacing: '-0.015em',
          }}>
            AI Analysis
          </h1>
          <p style={{
            fontFamily: 'var(--ic-font-sans)', fontSize: '1.1rem',
            color: '#4a5565', lineHeight: 1.65,
            maxWidth: '680px', margin: 0,
          }}>
            The moment field data is submitted, OUANTUM's analysis engine engages. <span className="ic-text-highlight">Deterministic IS code calculations</span> run first. Then three independent AI models validate the results, and <span className="ic-text-highlight">they must all agree</span> before any finding is finalised.
          </p>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ marginBottom: '3.5rem', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.06)' }}
        >
          <img
            src="/assets/images/df6e20f2-a007-43fa-8723-8944b53f30b6.png"
            alt="AI Analysis"
            style={{ width: '100%', height: '420px', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
          />
        </motion.div>

        {/* Detail blocks */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '3.5rem' }}>
          {[
            {
              label: 'DETERMINISTIC FIRST',
              body: 'Before any AI is involved, OUANTUM runs deterministic calculations: SonReb correlation for combined rebound UPV strength estimation, carbonation service life modelling, and chloride diffusion front prediction, all under IS 13311, IS 456, and IS 516.',
            },
            {
              label: 'THREE-MODEL CONSENSUS',
              body: 'Three independent AI models analyse the processed field data in parallel. Each model draws on different training sets and approaches. All three findings must converge within defined tolerance bands before the result is accepted.',
            },
            {
              label: 'DISAGREEMENT PROTOCOL',
              body: 'When models disagree due to anomalous readings, edge case conditions, or structural ambiguity, the system does not guess. It flags the item for expert review with a full audit trail, so a qualified engineer makes the call.',
            },
            {
              label: 'IS CODE TRACEABILITY',
              body: 'Every calculated value is linked to its IS code clause. The system shows which standard was applied, which formula was used, and how the raw readings translate into the output, fully explainable, fully auditable.',
            },
          ].map(({ label, body }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
            >
              <div style={{
                background: '#ffffff',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                borderRadius: '16px',
                padding: '24px',
                height: '100%',
              }}>
                <span style={{
                  fontFamily: 'var(--ic-font-mono)', fontSize: '0.72rem',
                  letterSpacing: '0.08em', color: '#111111', fontWeight: 700,
                  display: 'block', marginBottom: '10px',
                }}>
                  {label}
                </span>
                <p style={{
                  fontFamily: 'var(--ic-font-sans)', fontSize: '0.9rem',
                  color: '#4a5565', lineHeight: 1.6, margin: 0,
                }}>
                  {body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Key facts strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px',
          }}
        >
          {[
            { stat: '3 Models', label: 'Must reach consensus' },
            { stat: 'IS 13311', label: 'Primary standard applied' },
            { stat: 'Instant', label: 'Deterministic calculation' },
            { stat: '100%', label: 'Findings are explainable' },
          ].map(({ stat, label }, i) => (
            <div key={i} style={{
              background: '#ffffff',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              borderRadius: '16px',
              padding: '24px',
              textAlign: 'center',
            }}>
              <div style={{
                fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontSize: '1.8rem', fontWeight: 400,
                color: '#111111', marginBottom: '4px',
              }}>{stat}</div>
              <div style={{
                fontFamily: 'var(--ic-font-sans)', fontSize: '0.8rem',
                color: '#6a7282',
              }}>{label}</div>
            </div>
          ))}
        </motion.div>

      </div>
    </div>
  );
};

export default AiAnalysis;
