import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import GlowCard from '../components/GlowCard';
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
      background: '#000000',
      color: '#fff',
      minHeight: '100vh',
      fontFamily: 'var(--font-main)',
      paddingTop: '140px',
      paddingBottom: '100px',
    }}>
      <div className="container">

        {/* Back */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          onClick={() => navigate('/#how-it-works')}
          style={{
            background: 'none', border: 'none',
            color: 'rgba(255,255,255,0.45)',
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            fontFamily: 'var(--font-mono)', fontSize: '0.8rem',
            letterSpacing: '0.08em', cursor: 'pointer',
            padding: '8px 0', marginBottom: '3rem',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
        >
          <ArrowLeft size={16} /> BACK TO HOW IT WORKS
        </motion.button>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ paddingBottom: '3rem', marginBottom: '3rem' }}
        >
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
            letterSpacing: '0.25em', color: 'rgba(255,255,255,0.3)',
            display: 'block', marginBottom: '1rem',
          }}>
            STEP 02 · IS CODE · MULTI MODEL CONSENSUS
          </span>
          <h1 style={{
            fontFamily: 'var(--font-geist)',
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 200, lineHeight: 1, color: '#fff',
            margin: '0 0 1.5rem 0', letterSpacing: '0.02em',
          }}>
            AI ANALYSIS
          </h1>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '1rem',
            color: 'rgba(255,255,255,0.55)', lineHeight: 1.75,
            maxWidth: '680px', margin: 0,
          }}>
            The moment field data is submitted, OUANTUM's analysis engine engages. Deterministic IS code calculations run first. Then three independent AI models validate the results, and they must all agree before any finding is finalised.
          </p>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, x: 40, y: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ marginBottom: '4rem', borderRadius: '0px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <img
            src="/assets/images/df6e20f2-a007-43fa-8723-8944b53f30b6.png"
            alt="AI Analysis"
            style={{ width: '100%', height: '420px', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
          />
        </motion.div>

        {/* Detail blocks */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
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
              transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
            >
              <GlowCard borderRadius={12} style={{ padding: '2rem', height: '100%' }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                  letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)',
                  display: 'block', marginBottom: '1rem',
                }}>
                  {label}
                </span>
                <p style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.88rem',
                  color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, margin: 0,
                }}>
                  {body}
                </p>
              </GlowCard>
            </motion.div>
          ))}
        </div>

        {/* Key facts strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem',
          }}
        >
          {[
            { stat: '3 Models', label: 'Must reach consensus' },
            { stat: 'IS 13311', label: 'Primary standard applied' },
            { stat: 'Instant', label: 'Deterministic calculation' },
            { stat: '100%', label: 'Findings are explainable' },
          ].map(({ stat, label }, i) => (
            <GlowCard key={i} borderRadius={12} style={{ padding: '2rem', textAlign: 'center' }}>
              <div style={{
                fontFamily: 'var(--font-adieu)', fontSize: '1.8rem',
                color: '#fff', marginBottom: '0.4rem',
              }}>{stat}</div>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em',
              }}>{label}</div>
            </GlowCard>
          ))}
        </motion.div>

      </div>
    </div>
  );
};

export default AiAnalysis;


