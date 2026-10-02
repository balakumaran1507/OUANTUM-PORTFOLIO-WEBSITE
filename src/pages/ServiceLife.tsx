import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, ShieldCheck, CheckCircle2, ChevronRight, MapPin } from 'lucide-react';
import useSEO from '../hooks/useSEO';
import GlowCard from '../components/GlowCard';

const ServiceLife: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useSEO({
    title: 'Service Life Prediction | Ouantum',
    description: 'Fickian chloride diffusion and carbonation front rate modeling. Predicts residual life (years) for reinforced concrete in coastal Indian zones.',
    canonicalPath: '/capabilities/service-life-prediction',
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
              PREDICTION · ENGINE NODE 04
            </span>
            <h1 style={{
              fontFamily: 'var(--font-geist)',
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              fontWeight: 200,
              lineHeight: 0.9,
              color: '#ffffff',
              margin: '0 0 1.5rem 0',
            }}>
              Service Life Prediction
            </h1>
            <p style={{
              fontFamily: 'var(--font-main)',
              fontSize: 'clamp(1.2rem, 2.2vw, 1.45rem)',
              color: 'rgba(255, 255, 255, 0.6)',
              margin: 0,
              lineHeight: 1.65,
              maxWidth: '800px',
            }}>
              Fickian Diffusion & Carbonation Front Degradation Modeling for Concrete Asset Longevity
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
              The Service Life Prediction Engine projects structural degradation over 10, 25, and 50 year horizons. Utilizing Fickian chloride diffusion mathematics and square root time carbonation kinetics, the engine determines when environmental degradation fronts will reach rebar depth, triggering active corrosion.
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
              Structures in Indian coastal belts (such as marine bridges in Ennore, port jetties in Tuticorin, and high rise towers along ECR Chennai) experience severe chloride ingress and high temperature carbonation. OUANTUM's engine factors in local humidity, marine splash zones, and regional fly ash slag concrete mix coefficients to predict remaining service life (years to rebar depassivation) under Indian exposure classes (Severe, Very Severe, Extreme under IS 456).
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
                    <span>IS 456 (Table 3, 4, & 5): Exposure conditions, nominal cover, and cement content.</span>
                  </li>
                  <li style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', lineHeight: 1.5, color: 'rgba(255, 255, 255, 0.65)', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <ChevronRight size={14} style={{ marginTop: '3px', flexShrink: 0 }} />
                    <span>IS 516 (Part 8): Determination of carbonation depth in hardened concrete.</span>
                  </li>
                  <li style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', lineHeight: 1.5, color: 'rgba(255, 255, 255, 0.65)', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <ChevronRight size={14} style={{ marginTop: '3px', flexShrink: 0 }} />
                    <span>fib Model Code 2010: Service life design models for chloride diffusion.</span>
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
                    <span>Quantifies remaining years before major structural repair or cathodic protection is required.</span>
                  </li>
                  <li style={{ fontSize: '0.9rem', lineHeight: 1.5, color: 'rgba(255, 255, 255, 0.75)', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <CheckCircle2 size={16} color="#ffffff" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span>Optimizes preventive maintenance scheduling, saving up to 40% in long term life cycle costs.</span>
                  </li>
                  <li style={{ fontSize: '0.9rem', lineHeight: 1.5, color: 'rgba(255, 255, 255, 0.75)', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <CheckCircle2 size={16} color="#ffffff" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span>Enables proactive asset management for government infrastructure agencies and private developers.</span>
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
                    <h4 style={{ fontFamily: 'var(--font-adieu)', fontSize: '0.95rem', margin: '0 0 0.5rem 0', textTransform: 'uppercase' }}>Environmental Parameter Mapping</h4>
                    <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', margin: 0 }}>Calculates surface chloride concentration, atmospheric CO2 levels, and relative humidity history for the specific site location.</p>
                  </div>
                </div>
              </GlowCard>
              <GlowCard borderRadius={12} style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '24px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 'bold', color: 'rgba(255, 255, 255, 0.25)', width: '40px', flexShrink: 0 }}>02</div>
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-adieu)', fontSize: '0.95rem', margin: '0 0 0.5rem 0', textTransform: 'uppercase' }}>Diffusion & Front Rate Calculation</h4>
                    <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', margin: 0 }}>Runs Fickian second law equations to compute the time required for critical chloride threshold concentrations to reach internal rebar depth.</p>
                  </div>
                </div>
              </GlowCard>
              <GlowCard borderRadius={12} style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '24px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 'bold', color: 'rgba(255, 255, 255, 0.25)', width: '40px', flexShrink: 0 }}>03</div>
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-adieu)', fontSize: '0.95rem', margin: '0 0 0.5rem 0', textTransform: 'uppercase' }}>Residual Life & Repair Curve Generation</h4>
                    <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', margin: 0 }}>Plots remaining service life curves, pinpointing expected corrosion initiation year and recommended preventative maintenance windows.</p>
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
                <h4 style={{ fontSize: '1rem', fontWeight: 700, lineHeight: 1.4, margin: '0 0 0.5rem 0' }}>How does the system predict concrete service life under marine exposure?</h4>
                <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', margin: 0 }}>The engine utilizes Fick's Second Law of Diffusion to model chloride ion penetration depth over time based on concrete cover thickness and local exposure coefficients. When chloride levels at the steel depth exceed the critical threshold (typically 0.4% by weight of cement under IS 456), reinforcement corrosion is predicted to initiate.</p>
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, lineHeight: 1.4, margin: '0 0 0.5rem 0' }}>What is carbonation-induced corrosion, and how is it modeled?</h4>
                <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', margin: 0 }}>Carbonation occurs when atmospheric CO2 reacts with cement hydrates, lowering concrete pH from 12.6 to below 9, which de-passivates reinforcing steel. The system models the carbonation depth progression over time using the square-root of time relation (x = k * sqrt(t)) calibrated for atmospheric carbon dioxide levels in Indian metropolitan cities.</p>
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, lineHeight: 1.4, margin: '0 0 0.5rem 0' }}>How is half-cell potential mapping (ASTM C876) used to predict lifespan?</h4>
                <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', margin: 0 }}>Half-cell potential readings measure the electrochemical potential of steel reinforcement grids. The system imports these voltage maps to calculate the spatial probability of active corrosion. Combined with carbonation depth logs, it outputs concrete durability alerts and priority rankings for retrofitting.</p>
              </div>
            </div>
          </motion.section>

        </div>

      </div>
    </div>
  );
};

export default ServiceLife;


