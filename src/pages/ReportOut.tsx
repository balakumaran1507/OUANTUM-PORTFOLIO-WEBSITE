import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import useSEO from '../hooks/useSEO';

const ReportOut: React.FC = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Report Out | Ouantum',
    description: 'Auto-generated government-format reports for civil infrastructure testing and compliance.',
    canonicalPath: '/how-it-works/report-out',
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
            Report Out
          </h1>
          <p style={{
            fontFamily: 'var(--ic-font-sans)', fontSize: '1.1rem',
            color: '#4a5565', lineHeight: 1.65,
            maxWidth: '680px', margin: 0,
          }}>
            Once analysis is complete, OUANTUM auto-generates the full government-format PDF: element findings, IS code compliance status, condition grading, and remediation recommendations. Ready for senior engineer review <span className="ic-text-highlight">within the hour</span>.
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
            src="/assets/images/47766f42-6372-4a45-8a66-6043acfde415.png"
            alt="Report Output"
            style={{ width: '100%', height: '420px', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
          />
        </motion.div>

        {/* Detail blocks */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '3.5rem' }}>
          {[
            {
              label: 'WHAT THE REPORT CONTAINS',
              body: 'Each report includes: element level test findings, calculated concrete strength values with confidence ranges, carbonation depth and chloride penetration status, IS code compliance verdict, condition grading (A to E), and specific remediation recommendations per element.',
            },
            {
              label: 'GOVERNMENT FORMAT OUTPUT',
              body: 'Reports are auto-formatted to match the submission standard required by the relevant authority. Amaravati Capital Region format, TNHB format, and ADB infrastructure assessment format are auto-selected based on the project jurisdiction.',
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
            { stat: '< 1 hr', label: 'Standard report turnaround' },
            { stat: '3 Formats', label: 'Auto-selected by jurisdiction' },
            { stat: 'IS 456', label: 'Compliance grading standard' },
            { stat: 'Digitally signed', label: 'Ready for submission' },
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

export default ReportOut;
