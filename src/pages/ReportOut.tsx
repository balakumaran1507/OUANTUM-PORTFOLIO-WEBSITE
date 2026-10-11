import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import GlowCard from '../components/GlowCard';
import useSEO from '../hooks/useSEO';

const ReportOut: React.FC = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Report Out | Ouantum',
    description: 'Government-grade compliance reporting generated same day from civil inspection data.',
    canonicalPath: '/how-it-works/report-out',
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
            STEP 03 · GOVERNMENT FORMAT · SAME DAY
          </span>
          <h1 style={{
            fontFamily: 'var(--font-geist)',
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 200, lineHeight: 1, color: '#fff',
            margin: '0 0 1.5rem 0', letterSpacing: '0.02em',
          }}>
            REPORT OUT
          </h1>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '1rem',
            color: 'rgba(255,255,255,0.55)', lineHeight: 1.75,
            maxWidth: '680px', margin: 0,
          }}>
            Once analysis is complete, OUANTUM auto-generates the full government-format PDF: element findings, IS code compliance status, condition grading, and remediation recommendations. Ready for senior engineer review within the hour.
          </p>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, x: -40, y: 240 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ marginBottom: '4rem', borderRadius: '0px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <img
            src="/assets/images/47766f42-6372-4a45-8a66-6043acfde415.png"
            alt="Report Output"
            style={{ width: '100%', height: '420px', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
          />
        </motion.div>

        {/* Detail blocks */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
          {[
            {
              label: 'WHAT THE REPORT CONTAINS',
              body: 'Each report includes: element level test findings, calculated concrete strength values with confidence ranges, carbonation depth and chloride penetration status, IS code compliance verdict, condition grading (A to E), and specific remediation recommendations per element.',
            },
            {
              label: 'GOVERNMENT FORMAT OUTPUT',
              body: 'Reports are auto-formatted to follow the submission standard of the relevant authority. Layouts modelled on the Amaravati Capital Region, TNHB and ADB infrastructure assessment formats are auto-selected based on the project jurisdiction.',
            },
            {
              label: 'DIGITAL SIGN OFF',
              body: 'The senior engineer receives the report in their OUANTUM dashboard for review. They can annotate, adjust recommendations, and apply their digital signature, all within the platform. The signed PDF is then ready for submission.',
            },
            {
              label: 'SAME DAY DELIVERY',
              body: 'From field data submission to signed report: typically under one hour for standard elements, under four hours for complex multi-block assessments. No waiting for the back office. No overnight processing. No chasing up.',
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
            { stat: '< 1 hr', label: 'Standard report turnaround' },
            { stat: '3 Formats', label: 'Auto-selected by jurisdiction' },
            { stat: 'IS 456', label: 'Compliance grading standard' },
            { stat: 'Digitally signed', label: 'Ready for submission' },
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

export default ReportOut;


