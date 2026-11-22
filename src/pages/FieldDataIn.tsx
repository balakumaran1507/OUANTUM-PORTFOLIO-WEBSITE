import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import useSEO from '../hooks/useSEO';

const FieldDataIn: React.FC = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Field Data In | Ouantum',
    description: 'Instant field data ingestion for non-destructive civil infrastructure testing.',
    canonicalPath: '/how-it-works/field-data-in',
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
            Field Data In
          </h1>
          <p style={{
            fontFamily: 'var(--ic-font-sans)', fontSize: '1.1rem',
            color: '#4a5565', lineHeight: 1.65,
            maxWidth: '680px', margin: 0,
          }}>
            Every structural assessment begins in the field. OUANTUM replaces clipboards, spreadsheets, and WhatsApp photos with a <span className="ic-text-highlight">structured, location-aware mobile intake</span> built for the pace and conditions of real construction sites.
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
            src="/assets/images/c55952a9-3cc9-47ba-be6d-62e56e0cee61.png"
            alt="Field Data Entry"
            style={{ width: '100%', height: '420px', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
          />
        </motion.div>

        {/* Detail blocks */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '3.5rem' }}>
          {[
            {
              label: 'HOW IT STARTS',
              body: 'The field engineer opens the OUANTUM app on-site with zero loading delay. The project hierarchy is pre-loaded: project, block, floor, structural element. No free-text. Every entry is a structured selection.',
            },
            {
              label: 'WHAT GETS ENTERED',
              body: 'Rebound hammer readings (up to 12 per element), UPV transit times, carbonation depths from phenolphthalein test, and visual condition notes. Each reading is time-stamped and GPS-tagged to the exact test point.',
            },
            {
              label: 'OFFLINE FIRST',
              body: 'Works fully offline on 4G or below. Data is queued locally and syncs the moment connectivity is restored. No data is lost between readings. No re-entry required when back at the office.',
            },
            {
              label: 'ZERO TRANSCRIPTION',
              body: 'There is no paper form to retype. No WhatsApp photo to decode. No spreadsheet to update. The data entered in the field is the data used in analysis: unmodified, auditable, traceable.',
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
            { stat: '< 3 min', label: 'Per element data entry' },
            { stat: '4G / Offline', label: 'Connectivity requirement' },
            { stat: 'GPS-tagged', label: 'Every reading' },
            { stat: 'Zero paper', label: 'No transcription ever' },
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

export default FieldDataIn;
