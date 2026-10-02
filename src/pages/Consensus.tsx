import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, ShieldCheck, CheckCircle2, ChevronRight, MapPin } from 'lucide-react';
import useSEO from '../hooks/useSEO';
import GlowCard from '../components/GlowCard';

const Consensus: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useSEO({
    title: 'Consensus Engine | Ouantum',
    description: 'Triple-model safety verification for concrete QA. Code Specialist, Safety Analyst, and Pattern Intelligence models reach consensus on civil integrity.',
    canonicalPath: '/capabilities/multi-model-consensus',
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
              AI ENGINE · ENGINE NODE 03
            </span>
            <h1 style={{
              fontFamily: 'var(--font-geist)',
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              fontWeight: 200,
              lineHeight: 0.9,
              color: '#ffffff',
              margin: '0 0 1.5rem 0',
            }}>
              Multi-Model Consensus
            </h1>
            <p style={{
              fontFamily: 'var(--font-main)',
              fontSize: 'clamp(1.2rem, 2.2vw, 1.45rem)',
              color: 'rgba(255, 255, 255, 0.6)',
              margin: 0,
              lineHeight: 1.65,
              maxWidth: '800px',
            }}>
              Triple Validation AI Consensus Engine for Structural Integrity Decisions
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
              To ensure maximum safety and credibility, OUANTUM employs a Multi-Model Consensus Validation Engine. No verdict is confirmed on a structural element by a single algorithm; instead, three specialized, independent AI models evaluate the data. Only when they reach a unified consensus is the element signed off, minimizing false alarms and critical misses.
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
              Large-scale urban infrastructure works, such as the Chennai Metro Rail (CMRL), Bangalore Metro (Namma Metro), and capital infrastructure developments in Amaravati, require rigid third-party quality monitoring (TPQM). The Multi-Model Consensus Engine ensures that engineering audits are backed by AI consensus validation, satisfying independent consultant requirements and government safety standards in India.
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
                    <span>IS 456 (Section 4): Structural design and durability safety factors.</span>
                  </li>
                  <li style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', lineHeight: 1.5, color: 'rgba(255, 255, 255, 0.65)', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <ChevronRight size={14} style={{ marginTop: '3px', flexShrink: 0 }} />
                    <span>IS 13311: Correlation of NDT values and structural loading safety margins.</span>
                  </li>
                  <li style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', lineHeight: 1.5, color: 'rgba(255, 255, 255, 0.65)', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <ChevronRight size={14} style={{ marginTop: '3px', flexShrink: 0 }} />
                    <span>ISO 9001 (Section 8.2.4): Monitoring and measurement of product compliance.</span>
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
                    <span>Virtually eliminates false-positive failures due to minor sensor noise or calibration drift.</span>
                  </li>
                  <li style={{ fontSize: '0.9rem', lineHeight: 1.5, color: 'rgba(255, 255, 255, 0.75)', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <CheckCircle2 size={16} color="#ffffff" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span>Ensures senior engineers only review critical discrepancies where models disagree.</span>
                  </li>
                  <li style={{ fontSize: '0.9rem', lineHeight: 1.5, color: 'rgba(255, 255, 255, 0.75)', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <CheckCircle2 size={16} color="#ffffff" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span>Provides clear explainability logs for every decision, citing code references and safety margins.</span>
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
                    <h4 style={{ fontFamily: 'var(--font-adieu)', fontSize: '0.95rem', margin: '0 0 0.5rem 0', textTransform: 'uppercase' }}>Model A Analysis: IS Code Specialist</h4>
                    <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', margin: 0 }}>Reviews data strictly against deterministic code requirements and physical threshold values defined by Bureau of Indian Standards.</p>
                  </div>
                </div>
              </GlowCard>
              <GlowCard borderRadius={12} style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '24px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 'bold', color: 'rgba(255, 255, 255, 0.25)', width: '40px', flexShrink: 0 }}>02</div>
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-adieu)', fontSize: '0.95rem', margin: '0 0 0.5rem 0', textTransform: 'uppercase' }}>Model B Analysis: Structural Safety Analyst</h4>
                    <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', margin: 0 }}>Evaluates the reading relative to structural safety margins, surrounding load bearing concrete zones, and failure mode risks.</p>
                  </div>
                </div>
              </GlowCard>
              <GlowCard borderRadius={12} style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '24px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 'bold', color: 'rgba(255, 255, 255, 0.25)', width: '40px', flexShrink: 0 }}>03</div>
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-adieu)', fontSize: '0.95rem', margin: '0 0 0.5rem 0', textTransform: 'uppercase' }}>Model C Analysis: Pattern Intelligence</h4>
                    <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', margin: 0 }}>Cross references current test readings with historical trends from the same material supplier, contractor team, and batch history.</p>
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
                <h4 style={{ fontSize: '1rem', fontWeight: 700, lineHeight: 1.4, margin: '0 0 0.5rem 0' }}>What is the benefit of a three-model consensus for civil engineering audits?</h4>
                <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', margin: 0 }}>Instead of relying on a single AI model, OUANTUM runs three specialized neural networks (IS Code Specialist, Structural Safety Analyst, and Pattern Intelligence). If one model detects an anomaly (e.g. concrete strength drops near column-beam junctions) while others report pass, the verdict is flagged for senior engineer sign-off. This prevents false passes and ensures regulatory compliance.</p>
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, lineHeight: 1.4, margin: '0 0 0.5rem 0' }}>How does the Pattern Intelligence model cross-reference contractor history?</h4>
                <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', margin: 0 }}>Model C tracks performance patterns of specific batching plants, sand quarries, and subcontracting agencies across India. If a particular contractor consistently yields borderline results on concrete cube tests (IS 516), the system increases audit sensitivity for their next concrete pours.</p>
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, lineHeight: 1.4, margin: '0 0 0.5rem 0' }}>Does the AI system make the final design decision?</h4>
                <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', margin: 0 }}>No. In accordance with strict engineering compliance, the AI operates as an intelligent advisor. It flags anomalies, computes compliance percentages, and generates draft government-grade reports, but the final certification and sign-off remain with the registered senior structural engineer.</p>
              </div>
            </div>
          </motion.section>

        </div>

      </div>
    </div>
  );
};

export default Consensus;


