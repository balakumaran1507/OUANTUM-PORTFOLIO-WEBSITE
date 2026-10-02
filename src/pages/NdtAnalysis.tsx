import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, ShieldCheck, CheckCircle2, ChevronRight, MapPin } from 'lucide-react';
import useSEO from '../hooks/useSEO';
import GlowCard from '../components/GlowCard';

const NdtAnalysis: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useSEO({
    title: 'NDT Analysis | Ouantum',
    description: 'Automated rebound hammer and UPV transit time correlation under IS 13311. Processes field readings to calculate concrete strength in southern building zones.',
    canonicalPath: '/capabilities/ndt-analysis-engine',
  });

  return (
    <div className="subpage-wrapper" style={{
      background: '#000000',
      color: '#ffffff',
      minHeight: '100vh',
      fontFamily: 'var(--font-main)',
      paddingTop: '140px',
      paddingBottom: '100px'
    }}>
      <div className="container">
        
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          onClick={() => navigate('/#activities')}
          style={{
            background: 'none',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.5)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            letterSpacing: '0.05em',
            cursor: 'pointer',
            padding: '8px 0',
            marginBottom: '3rem',
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.5)')}
        >
          <ArrowLeft size={16} /> BACK TO CAPABILITIES
        </motion.button>

        {/* Hero Section */}
        <div style={{ paddingBottom: '3rem', marginBottom: '3rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="hero-tech-label" style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: '#999',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '1rem'
            }}>
              CALCULATION · ENGINE NODE 01
            </span>
            <h1 style={{
              fontFamily: 'var(--font-geist)',
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              fontWeight: 200,
              lineHeight: 0.9,
              color: '#ffffff',
              margin: '0 0 1.5rem 0',
            }}>
              Ndt Analysis Engine
            </h1>
            <p style={{
              fontFamily: 'var(--font-main)',
              fontSize: 'clamp(1.2rem, 2.2vw, 1.45rem)',
              color: 'rgba(255, 255, 255, 0.6)',
              margin: 0,
              lineHeight: 1.65,
              maxWidth: '800px',
            }}>
              Automated Sonic Rebound SonReb Strength Ingestion & Quality Grading
            </p>
          </motion.div>
        </div>

        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
          
          {/* Overview */}
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 style={{ fontFamily: 'var(--font-geist)', fontWeight: 200, fontSize: '1.25rem', marginBottom: '1.25rem', paddingBottom: '0.5rem' }}>OVERVIEW SUMMARY</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'rgba(255, 255, 255, 0.75)', margin: 0 }}>
              The Non-Destructive Testing (NDT) Analysis Engine is designed to ingest rebound hammer index numbers and Ultrasonic Pulse Velocity (UPV) values logged directly from the field. By combining surface hardness testing with concrete body velocity readings, the engine runs SonReb correlation curves to calculate concrete compressive strength with a significantly higher degree of confidence than either method can provide on its own.
            </p>
          </motion.section>

          {/* Geographic Context (GEO) */}
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            style={{ paddingLeft: '0', margin: '0.5rem 0' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem', color: '#ffffff' }}>
              <MapPin size={16} />
              <h3 style={{ fontFamily: 'var(--font-adieu)', fontSize: '0.85rem', margin: 0, letterSpacing: '0.05em' }}>REGIONAL & GEOGRAPHIC CONTEXT (INDIA)</h3>
            </div>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'rgba(255, 255, 255, 0.65)', margin: 0 }}>
              Concrete testing in coastal climates like Chennai, Mumbai, and Vishakhapatnam faces high ambient humidity and saline exposure. High humidity accelerates surface carbonation, which artificially inflates rebound hammer index readings while concrete core density remains lower. OUANTUM's NDT Analysis Engine auto-corrects rebound values based on local atmospheric and carbonation conditions in Southern India (Tamil Nadu, Karnataka, Andhra Pradesh), ensuring accurate SonReb correlation curves that align with Bureau of Indian Standards (BIS) parameters.
            </p>
          </motion.section>

          {/* Grid: Standards & Benefits */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <GlowCard borderRadius={16} style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                  <BookOpen size={20} color="#ffffff" />
                  <h3 style={{ fontFamily: 'var(--font-adieu)', fontSize: '0.9rem', margin: 0, letterSpacing: '0.05em' }}>IS CODE STANDARDS</h3>
                </div>
                <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <li style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', lineHeight: 1.5, color: 'rgba(255, 255, 255, 0.65)', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <ChevronRight size={14} style={{ marginTop: '3px', flexShrink: 0 }} />
                    <span>IS 13311 (Part 1): Non Destructive Testing of Concrete Ultrasonic Pulse Velocity.</span>
                  </li>
                  <li style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', lineHeight: 1.5, color: 'rgba(255, 255, 255, 0.65)', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <ChevronRight size={14} style={{ marginTop: '3px', flexShrink: 0 }} />
                    <span>IS 13311 (Part 2): Non Destructive Testing of Concrete Rebound Hammer.</span>
                  </li>
                  <li style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', lineHeight: 1.5, color: 'rgba(255, 255, 255, 0.65)', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <ChevronRight size={14} style={{ marginTop: '3px', flexShrink: 0 }} />
                    <span>IS 456 (Clause 15 & 16): Concrete sampling, testing, and acceptance criteria.</span>
                  </li>
                </ul>
              </GlowCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <GlowCard borderRadius={16} style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                  <ShieldCheck size={20} color="#ffffff" />
                  <h3 style={{ fontFamily: 'var(--font-adieu)', fontSize: '0.9rem', margin: 0, letterSpacing: '0.05em' }}>KEY BENEFITS</h3>
                </div>
                <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <li style={{ fontSize: '0.9rem', lineHeight: 1.5, color: 'rgba(255, 255, 255, 0.75)', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <CheckCircle2 size={16} color="#ffffff" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span>Concrete strength estimation error is reduced from ±25% (single test) to under ±10% (correlated).</span>
                  </li>
                  <li style={{ fontSize: '0.9rem', lineHeight: 1.5, color: 'rgba(255, 255, 255, 0.75)', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <CheckCircle2 size={16} color="#ffffff" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span>Instantaneous quality grading (Excellent, Good, Medium, Doubtful) plotted on structural zone maps.</span>
                  </li>
                  <li style={{ fontSize: '0.9rem', lineHeight: 1.5, color: 'rgba(255, 255, 255, 0.75)', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <CheckCircle2 size={16} color="#ffffff" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span>Prevents manual calibration and curve fitting mistakes in laboratory post processing.</span>
                  </li>
                </ul>
              </GlowCard>
            </motion.div>
          </div>

          {/* Process Flow */}
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 style={{ fontFamily: 'var(--font-geist)', fontWeight: 200, fontSize: '1.25rem', marginBottom: '2rem', paddingBottom: '0.5rem' }}>PIPELINE FLOW</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <GlowCard borderRadius={12} style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '24px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 'bold', color: 'rgba(255, 255, 255, 0.25)', width: '40px', flexShrink: 0 }}>01</div>
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-adieu)', fontSize: '0.95rem', margin: '0 0 0.5rem 0', textTransform: 'uppercase' }}>Raw Field Ingestion</h4>
                    <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', margin: 0 }}>Field engineers enter concrete rebound numbers (minimum 9 points per test location) and UPV transit times on site via our offline first mobile app.</p>
                  </div>
                </div>
              </GlowCard>
              <GlowCard borderRadius={12} style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '24px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 'bold', color: 'rgba(255, 255, 255, 0.25)', width: '40px', flexShrink: 0 }}>02</div>
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-adieu)', fontSize: '0.95rem', margin: '0 0 0.5rem 0', textTransform: 'uppercase' }}>SonReb Regression Analysis</h4>
                    <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', margin: 0 }}>The engine applies custom empirical correlation formulas calibrated for Indian aggregates to compute estimated true compressive strength (MPa) of the element.</p>
                  </div>
                </div>
              </GlowCard>
              <GlowCard borderRadius={12} style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '24px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 'bold', color: 'rgba(255, 255, 255, 0.25)', width: '40px', flexShrink: 0 }}>03</div>
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-adieu)', fontSize: '0.95rem', margin: '0 0 0.5rem 0', textTransform: 'uppercase' }}>Statistical Outlier Filtering</h4>
                    <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', margin: 0 }}>The algorithm checks rebound numbers for high variance (e.g. hitting aggregate or void space) and flags anomalous values according to IS 13311 provisions.</p>
                  </div>
                </div>
              </GlowCard>
            </div>
          </motion.section>

          {/* FAQs */}
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            <h2 style={{ fontFamily: 'var(--font-geist)', fontWeight: 200, fontSize: '1.25rem', marginBottom: '2rem', paddingBottom: '0.5rem', textTransform: 'uppercase' }}>ENGINEERING FAQ LOG</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, lineHeight: 1.4, margin: '0 0 0.5rem 0' }}>How does the SonReb correlation algorithm calculate concrete strength?</h4>
                <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', margin: 0 }}>The SonReb (Sonic-Rebound) method combines the Rebound Index (surface hardness) and Ultrasonic Pulse Velocity (internal density) through multi-variable regression equations. This combination minimizes the individual errors of each test, lowering strength estimation variance to ±10% compared to ±25% for standalone rebound hammer testing under IS 13311.</p>
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, lineHeight: 1.4, margin: '0 0 0.5rem 0' }}>Why is rebound hammer testing alone insufficient for structural audits in India?</h4>
                <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', margin: 0 }}>Standard rebound hammer tests (IS 13311 Part 2) only measure surface hardness. Factors like aggregate type, concrete carbonation (highly prevalent in tropical coastal climates like Chennai and Vizag), moisture content, and surface texture can result in misleadingly high rebound numbers. Correlating it with UPV ensures velocity waves detect internal voids and true core density.</p>
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, lineHeight: 1.4, margin: '0 0 0.5rem 0' }}>How does OUANTUM handle aggregate-specific corrections for Indian concrete mixes?</h4>
                <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', margin: 0 }}>OUANTUM's database contains aggregate-specific correlation curves calibrated for common regional quarries in Tamil Nadu (e.g., black granite aggregate from Pallavaram) and Andhra Pradesh, aligning strength calculations with specific design grades (M25 to M60).</p>
              </div>
            </div>
          </motion.section>

        </div>

      </div>
    </div>
  );
};

export default NdtAnalysis;


