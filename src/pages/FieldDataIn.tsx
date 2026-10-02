import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import GlowCard from '../components/GlowCard';
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
            STEP 01 · MOBILE ENTRY · STRUCTURED INTAKE
          </span>
          <h1 style={{
            fontFamily: 'var(--font-geist)',
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 200, lineHeight: 1, color: '#fff',
            margin: '0 0 1.5rem 0', letterSpacing: '0.02em',
          }}>
            FIELD DATA IN
          </h1>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '1rem',
            color: 'rgba(255,255,255,0.55)', lineHeight: 1.75,
            maxWidth: '680px', margin: 0,
          }}>
            Every structural assessment begins in the field. OUANTUM replaces clipboards, spreadsheets, and WhatsApp photos with a structured, location-aware mobile intake built for the pace and conditions of real construction sites.
          </p>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, x: -40, y: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ marginBottom: '4rem', borderRadius: '0px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <img
            src="/assets/images/c55952a9-3cc9-47ba-be6d-62e56e0cee61.png"
            alt="Field Data Entry"
            style={{ width: '100%', height: '420px', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
          />
        </motion.div>

        {/* Detail blocks */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
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
            { stat: '< 3 min', label: 'Per element data entry' },
            { stat: '4G / Offline', label: 'Connectivity requirement' },
            { stat: 'GPS-tagged', label: 'Every reading' },
            { stat: 'Zero paper', label: 'No transcription ever' },
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

export default FieldDataIn;


