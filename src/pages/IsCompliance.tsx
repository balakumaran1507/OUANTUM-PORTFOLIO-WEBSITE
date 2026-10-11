import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, ShieldCheck, CheckCircle2, ChevronRight, MapPin } from 'lucide-react';
import useSEO from '../hooks/useSEO';
import GlowCard from '../components/GlowCard';

const IsCompliance: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useSEO({
    title: 'IS Code Compliance | Ouantum',
    description: 'Automated codal checking under IS 456, IS 383, IS 1786, and IS 2386. Verifies concrete mix, rebar yield, and aggregate grading against BIS standards.',
    canonicalPath: '/capabilities/is-code-compliance',
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
              VERIFICATION · ENGINE NODE 02
            </span>
            <h1 style={{
              fontFamily: 'var(--font-geist)',
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              fontWeight: 200,
              lineHeight: 0.9,
              color: '#ffffff',
              margin: '0 0 1.5rem 0',
            }}>
              Is Code Compliance
            </h1>
            <p style={{
              fontFamily: 'var(--font-main)',
              fontSize: 'clamp(1.2rem, 2.2vw, 1.45rem)',
              color: 'rgba(255, 255, 255, 0.6)',
              margin: 0,
              lineHeight: 1.65,
              maxWidth: '800px',
            }}>
              Automated Codal Verification Engine for Bureau of Indian Standards (BIS) Construction Norms
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
              The IS Code Compliance Engine digitizes Indian Standard civil engineering codes into deterministic rule sets. Every material test result, concrete mix proportion, rebar grade, and structural dimension logged in OUANTUM is automatically evaluated against the exact formulas and threshold tables published by the Bureau of Indian Standards (BIS).
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
              Quality control (QC) compliance in civil infrastructure projects across India, such as public housing schemes and capital-region developments, must adhere to regional Public Works Department (PWD) specifications and National Building Code (NBC) guidelines. The engine automates auditing for concrete mix proportions (IS 456), reinforcement yield strength (IS 1786), and aggregate grading (IS 383) across Indian building zones.
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
                    <span>IS 456: Code of practice for plain and reinforced concrete (Durability and cover limits).</span>
                  </li>
                  <li style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', lineHeight: 1.5, color: 'rgba(255, 255, 255, 0.65)', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <ChevronRight size={14} style={{ marginTop: '3px', flexShrink: 0 }} />
                    <span>IS 383: Coarse and fine aggregate grading zones and physical specifications.</span>
                  </li>
                  <li style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', lineHeight: 1.5, color: 'rgba(255, 255, 255, 0.65)', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <ChevronRight size={14} style={{ marginTop: '3px', flexShrink: 0 }} />
                    <span>IS 1786: High strength deformed steel bars for concrete reinforcement validation.</span>
                  </li>
                  <li style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', lineHeight: 1.5, color: 'rgba(255, 255, 255, 0.65)', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <ChevronRight size={14} style={{ marginTop: '3px', flexShrink: 0 }} />
                    <span>IS 2386 (Parts I-VIII): Test methods for aggregate properties and compliance criteria.</span>
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
                    <span>Guarantees 100% regulatory auditing across all structural and material testing logs.</span>
                  </li>
                  <li style={{ fontSize: '0.9rem', lineHeight: 1.5, color: 'rgba(255, 255, 255, 0.75)', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <CheckCircle2 size={16} color="#ffffff" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span>Accelerates TPQM (Third Party Quality Monitoring) audits, compressing days of code lookup into seconds.</span>
                  </li>
                  <li style={{ fontSize: '0.9rem', lineHeight: 1.5, color: 'rgba(255, 255, 255, 0.75)', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <CheckCircle2 size={16} color="#ffffff" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span>Prevents project delays and structural audit disputes through clear, standardized compliance reports.</span>
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
                    <h4 style={{ fontFamily: 'var(--font-adieu)', fontSize: '0.95rem', margin: '0 0 0.5rem 0', textTransform: 'uppercase' }}>Data Parsing & Extraction</h4>
                    <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', margin: 0 }}>Testing data (slump, sieve analysis, cube compressive strength, steel elongation) is extracted and mapped to design criteria.</p>
                  </div>
                </div>
              </GlowCard>
              <GlowCard borderRadius={12} style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '24px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 'bold', color: 'rgba(255, 255, 255, 0.25)', width: '40px', flexShrink: 0 }}>02</div>
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-adieu)', fontSize: '0.95rem', margin: '0 0 0.5rem 0', textTransform: 'uppercase' }}>Codal Constraint Auditing</h4>
                    <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', margin: 0 }}>Every parameter is cross-referenced with relevant IS code threshold equations (e.g., target strength variables, exposure durability, maximum limits).</p>
                  </div>
                </div>
              </GlowCard>
              <GlowCard borderRadius={12} style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '24px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 'bold', color: 'rgba(255, 255, 255, 0.25)', width: '40px', flexShrink: 0 }}>03</div>
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-adieu)', fontSize: '0.95rem', margin: '0 0 0.5rem 0', textTransform: 'uppercase' }}>Compliance Verdict Mapping</h4>
                    <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', margin: 0 }}>Generates a strict compliance classification: PASS (complying), CONCERN (borderline or non-compliant under specific tolerances), or FAIL (violating limits).</p>
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
                <h4 style={{ fontSize: '1rem', fontWeight: 700, lineHeight: 1.4, margin: '0 0 0.5rem 0' }}>What Indian Standards (IS Codes) are supported by OUANTUM's validation engine?</h4>
                <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', margin: 0 }}>OUANTUM supports IS 456 (Plain and reinforced concrete), IS 13311 (Ultrasonic pulse velocity and rebound index), IS 1786 (High-strength deformed steel bars for concrete reinforcement), IS 383 (Coarse and fine aggregates specification), IS 2386 (Methods of test for aggregate), and IS 3025 (Water quality for concrete mixing).</p>
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, lineHeight: 1.4, margin: '0 0 0.5rem 0' }}>How does OUANTUM flag non-compliance under IS 456 durability requirements?</h4>
                <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', margin: 0 }}>The compliance engine evaluates minimum cement content, maximum water-cement ratio, and concrete grade limits based on exposure conditions (Mild, Moderate, Severe, Very Severe, Extreme) specified in Table 5 of IS 456. Any violation automatically triggers a 'FAIL' status with the specific clause reference.</p>
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, lineHeight: 1.4, margin: '0 0 0.5rem 0' }}>How does the engine process fine aggregate zone grading?</h4>
                <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', margin: 0 }}>The sieve analysis readings are parsed against IS 383 fine aggregate grading limits (Zone I, Zone II, Zone III, Zone IV). If sand gradation shifts outside the zone tolerance, the engine flags a 'CONCERN' for segregation risk, crucial for modern self-compacting concrete mixes used in metropolitan high-rises.</p>
              </div>
            </div>
          </motion.section>

        </div>

      </div>
    </div>
  );
};

export default IsCompliance;


