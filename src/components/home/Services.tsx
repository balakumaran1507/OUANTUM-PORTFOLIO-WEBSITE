import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import { WordHover } from '@/components/common/WordHover';

const activityItems = [
  {
    id: '01',
    title: 'NON-DESTRUCTIVE TESTING ANALYSIS',
    category: 'NDT Analysis Engine',
    description: 'Automates the processing of rebound hammer index numbers and Ultrasonic Pulse Velocity (UPV) values logged directly from the field. Runs SonReb correlation curves to calculate concrete compressive strength in real-time.',
    route: '/capabilities/ndt-analysis-engine',
    image: '/assets/images/img1.png',
  },
  {
    id: '02',
    title: 'IS CODE COMPLIANCE AUDITING',
    category: 'IS Code Compliance',
    description: 'Automates codal compliance checking for reinforced concrete and aggregate test readings. Instantly evaluates mix proportions (IS 456), reinforcement yield strength (IS 1786), and aggregate grading (IS 383).',
    route: '/capabilities/is-code-compliance',
    image: '/assets/images/img2.png',
  },
  {
    id: '03',
    title: 'MULTI-MODEL AI CONSENSUS',
    category: 'Consensus Engine',
    description: 'Implements a multi-model AI consensus layer where three independent auditing algorithms evaluate structural readings. A compliance verdict is only signed off once all three models reach a unified consensus.',
    route: '/capabilities/multi-model-consensus',
    image: '/assets/images/img3.png',
  },
  {
    id: '04',
    title: 'SERVICE LIFE PREDICTION MODELING',
    category: 'Service Life Prediction',
    description: 'Provides detailed quantitative forecasting of reinforcement corrosion progression rates. Combines chloride profiles and carbonation depth measurements to model concrete service life and estimate remaining lifespan.',
    route: '/capabilities/service-life-prediction',
    image: '/assets/images/img4.png',
  }
];

const Services: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const navigate = useNavigate();

  const prev = () => {
    if (activeIdx === 0) return;
    setDirection(-1);
    setActiveIdx((i) => i - 1);
  };

  const next = () => {
    if (activeIdx === activityItems.length - 1) return;
    setDirection(1);
    setActiveIdx((i) => i + 1);
  };

  const item = activityItems[activeIdx];

  return (
    <section
      id="activities"
      className="section-padding services-section"
      style={{ background: '#f5f5f7', color: '#111111', overflow: 'hidden' }}
    >
      <div className="container">

        {/* Header row: title+subtitle left, arrows right */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="services-header-row"
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '2.5rem',
          }}
        >
          {/* Left */}
          <div>
            <h2
              className="section-title services-main-title"
              style={{ color: '#111111', marginBottom: '0.75rem' }}
            >
              Core<br />Capabilities
            </h2>
            <p
              className="section-subtitle"
              style={{ color: '#000000', margin: 0 }}
            >
              <WordHover
                text="Our domain-specific AI platform automates quality assurance workflows, compressing weeks of manual analysis into a single working day."
                color="#000000"
                hoverColor="#444444"
              />
            </p>
          </div>

          {/* Right: arrows + counter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              color: 'rgba(0,0,0,0.4)',
              letterSpacing: '0.1em',
              marginRight: '0.25rem',
            }}>
              {String(activeIdx + 1).padStart(2, '0')} / {String(activityItems.length).padStart(2, '0')}
            </span>
            <button
              onClick={prev}
              disabled={activeIdx === 0}
              aria-label="Previous"
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                border: '1.5px solid rgba(0,0,0,0.18)',
                background: activeIdx === 0 ? 'rgba(0,0,0,0.04)' : '#111111',
                color: activeIdx === 0 ? 'rgba(0,0,0,0.25)' : '#ffffff',
                cursor: activeIdx === 0 ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
              }}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              disabled={activeIdx === activityItems.length - 1}
              aria-label="Next"
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                border: '1.5px solid rgba(0,0,0,0.18)',
                background: activeIdx === activityItems.length - 1 ? 'rgba(0,0,0,0.04)' : '#111111',
                color: activeIdx === activityItems.length - 1 ? 'rgba(0,0,0,0.25)' : '#ffffff',
                cursor: activeIdx === activityItems.length - 1 ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
              }}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>

        {/* Big single card */}
        <div className="services-card-wrapper" style={{ position: 'relative', width: '100%', height: '520px', borderRadius: '24px', overflow: 'hidden' }}>
          <AnimatePresence mode="popLayout" custom={direction} initial={false}>
            <motion.div
              key={item.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 70, scale: 0.97, filter: 'blur(6px)' }}
              animate={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: direction * -70, scale: 1.02, filter: 'blur(6px)' }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'absolute',
                inset: 0,
                cursor: 'pointer',
              }}
              onClick={() => navigate(item.route)}
            >
              {/* Background image with gentle zoom out */}
              <motion.img
                src={item.image}
                alt={item.title}
                initial={{ scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />

              {/* Gradient overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)',
                }}
              />

              {/* Bottom content */}
              <div
                className="services-card-content"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '2.5rem',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  gap: '2rem',
                }}
              >
                {/* Left: title + description with staggered rise */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="services-card-info"
                  style={{ maxWidth: '65%' }}
                >
                  <h3
                    style={{
                      fontFamily: 'var(--font-adieu)',
                      fontSize: 'clamp(1.25rem, 2.5vw, 1.8rem)',
                      fontWeight: 400,
                      color: '#ffffff',
                      lineHeight: 1.2,
                      marginBottom: '1rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.01em',
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-main)',
                      fontSize: '0.88rem',
                      lineHeight: 1.7,
                      color: 'rgba(255,255,255,0.7)',
                      margin: 0,
                    }}
                  >
                    {item.description}
                  </p>
                </motion.div>

                {/* Right: CTA button with staggered rise & scale */}
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.45, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  style={{ flexShrink: 0 }}
                >
                  <Link
                    to={item.route}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px',
                      background: '#ffffff',
                      color: '#111111',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      letterSpacing: '0.07em',
                      textDecoration: 'none',
                      padding: '0.8rem 1.4rem',
                      borderRadius: '10px',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                      transition: 'background 0.2s ease, transform 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#e5e5e5')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = '#ffffff')}
                  >
                    Explore Engine <ArrowUpRight size={15} />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot indicators */}
        <div style={{ display: 'flex', gap: '6px', marginTop: '1.25rem', justifyContent: 'center' }}>
          {activityItems.map((_, idx) => (
            <button
              key={idx}
              onClick={() => { setDirection(idx > activeIdx ? 1 : -1); setActiveIdx(idx); }}
              aria-label={`Go to card ${idx + 1}`}
              style={{
                width: idx === activeIdx ? '28px' : '8px',
                height: '8px',
                borderRadius: '4px',
                border: 'none',
                background: idx === activeIdx ? '#111111' : 'rgba(0,0,0,0.2)',
                cursor: 'pointer',
                padding: 0,
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;
