import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ScrollReveal from '@/components/common/ScrollReveal';
import GlowCard from '../GlowCard';

const steps = [
  {
    num: '01',
    title: 'FIELD DATA IN',
    sub: 'MOBILE ENTRY · STRUCTURED INTAKE',
    description: 'Field engineer opens OUANTUM on-site. Selects project, block, and structural element. Enters test readings tied to the exact location. Works on 4G. No paper. No back-office transcription.',
    image: '/assets/images/c55952a9-3cc9-47ba-be6d-62e56e0cee61.png',
    avatar: '/assets/images/ox1_avatar/1.png',
    anim: { x: -45, y: 25, scale: 0.78 },
    route: '/how-it-works/field-data-in',
    // Desktop layout parameters
    desktopScale: 2.0,
    desktopX: 50, // in pixels
    desktopY: 10, // in pixels
    // Mobile layout parameters (adjust scale, x, y axis separately for mobile view users)
    mobileScale: 1.6,
    mobileX: 40, // in pixels
    mobileY: 10, // in pixels
  },
  {
    num: '02',
    title: 'AI ANALYSIS',
    sub: 'IS CODE · MULTI-MODEL CONSENSUS',
    description: 'Deterministic calculations run instantly. Three AI models independently validate against IS codes and structural context. All three must agree. Disagreement triggers expert review.',
    image: '/assets/images/df6e20f2-a007-43fa-8723-8944b53f30b6.png',
    avatar: '/assets/images/ox1_avatar/2.png',
    anim: { x: 0, y: -45, scale: 0.78 },
    route: '/how-it-works/ai-analysis',
    // Desktop layout parameters
    desktopScale: 2.0,
    desktopX: 50, // in pixels
    desktopY: 15, // in pixels
    // Mobile layout parameters (adjust scale, x, y axis separately for mobile view users)
    mobileScale: 1.6,
    mobileX: 45, // in pixels
    mobileY: 15, // in pixels
  },
  {
    num: '03',
    title: 'REPORT OUT',
    sub: 'GOVERNMENT-FORMAT · SAME DAY',
    description: 'Full government-format PDF auto-generated. Ready for senior engineer review and digital sign-off within the hour. Layouts modelled on Amaravati, TNHB and ADB formats, auto-selected.',
    image: '/assets/images/47766f42-6372-4a45-8a66-6043acfde415.png',
    avatar: '/assets/images/ox1_avatar/3.png',
    anim: { x: 45, y: 25, scale: 0.78 },
    route: '/how-it-works/report-out',
    // Desktop layout parameters
    desktopScale: 2.3,
    desktopX: 42, // in pixels
    desktopY: 15, // in pixels
    // Mobile layout parameters (adjust scale, x, y axis separately for mobile view users)
    mobileScale: 1.9,
    mobileX: 32, // in pixels
    mobileY: 15, // in pixels
  },
];

/* ─────────────────────────────────────────────────────────
   The small circle button sits top-right.
   Clicking it triggers a clip-path circle that expands
   from that exact button position to fill the card.
   Clicking the × collapses it back.
───────────────────────────────────────────────────────── */
const StepCard = ({ step }: { step: typeof steps[0] }) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scale = isMobile ? step.mobileScale : step.desktopScale;
  const x = isMobile ? step.mobileX : step.desktopX;
  const y = isMobile ? step.mobileY : step.desktopY;

  return (
    <GlowCard
      style={{
        position: 'relative',
        height: '520px',
        padding: 0,
      }}
    >
      {/* ── Background image ── */}
      <img
        src={step.image}
        alt={step.title}
        loading="lazy"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center top',
          display: 'block',
          transition: 'transform 0.6s ease',
          transform: expanded ? 'scale(1.04)' : 'scale(1)',
        }}
      />

      {/* ── Static bottom gradient ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '65%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.55) 45%, transparent 100%)',
          transition: 'opacity 0.3s ease',
          opacity: expanded ? 0 : 1,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* ── Front content (title) ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '2rem',
          zIndex: 2,
          transition: 'opacity 0.2s ease',
          opacity: expanded ? 0 : 1,
          pointerEvents: 'none',
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-geist)',
            fontWeight: 200,
            fontSize: '1.55rem',
            color: '#fff',
            margin: 0,
            letterSpacing: '0.02em',
            lineHeight: 1.1,
          }}
        >
          {step.title}
        </h3>
      </div>

      {/* ── DARK CIRCLE OVERLAY ──
           Expands from the button position via clip-path */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: '#000000',
          clipPath: expanded
            ? `circle(170% at calc(100% - 1.1rem - 20px) calc(1.1rem + 20px))`
            : `circle(20px at calc(100% - 1.1rem - 20px) calc(1.1rem + 20px))`,
          transition: 'clip-path 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '2rem',
        }}
      >
        {/* CARD AVATAR IMAGE: Adjust scale, translate X (x), and translate Y (y) for desktop & mobile separately */}
        <img
          src={step.avatar}
          alt={step.title}
          style={{
            position: 'absolute',
            top: '2.5rem',
            left: '2.5rem',
            width: '150px',
            height: '150px',
            objectFit: 'contain',
            transform: `scale(${scale}) translate(${x}px, ${y}px)`,
          }}
        />

        {/* Detail content inside the expanded circle */}
        <div
          style={{
            transition: 'opacity 0.3s ease, transform 0.3s ease',
            opacity: expanded ? 1 : 0,
            transform: expanded ? 'translateY(0)' : 'translateY(12px)',
            transitionDelay: expanded ? '0.4s' : '0s',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-geist)',
              fontWeight: 200,
              fontSize: '1.45rem',
              color: '#fff',
              margin: '0 0 1rem 0',
              letterSpacing: '0.02em',
              lineHeight: 1.1,
            }}
          >
            {step.title}
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.82rem',
              color: 'rgba(255,255,255,0.62)',
              lineHeight: 1.7,
              margin: '0 0 1.5rem 0',
            }}
          >
            {step.description}
          </p>
          <span
            onClick={() => navigate(step.route)}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              letterSpacing: '0.14em',
              color: 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
          >
            READ MORE ↗
          </span>
        </div>
      </div>

      {/* ── TRIGGER BUTTON ──
           Small circle in top-right. Highest z-index.
           Toggles ↗ / ✕ and triggers the expand/collapse. */}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          position: 'absolute',
          top: '1.1rem',
          right: '1.1rem',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: '#000000',
          border: 'none',
          color: '#fff',
          fontSize: '0.95rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 10,
        }}
        aria-label={expanded ? 'Collapse card' : 'Expand card'}
      >
        {expanded ? '✕' : '↗'}
      </button>
    </GlowCard>
  );
};

/* ─────────────────────────────────────────────────────────
   Section
───────────────────────────────────────────────────────── */
const HowItWorks = () => {
  return (
    <section id="how-it-works" className="section-padding" style={{ background: '#000000' }}>
      <div className="container">

        {/* Header */}
        <div style={{
          marginBottom: '5rem',
          textAlign: 'left',
        }}>
          <div style={{ position: 'relative', display: 'inline-block', margin: '0' }}>
            <h2 className="section-title" style={{
              fontFamily: 'var(--font-geist)',
              fontWeight: 200,
              position: 'relative',
              zIndex: 1,
            }}>
              How It Works
            </h2>
          </div>

          <ScrollReveal
            baseOpacity={0.15}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(1.2rem, 2.2vw, 1.45rem)',
              color: 'rgba(255,255,255,0.55)',
              letterSpacing: '0.05em',
              marginTop: '1.5rem',
              textAlign: 'left',
            }}
          >
            Three steps. Zero paper.
          </ScrollReveal>
        </div>

        {/* Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem',
        }}>
          {steps.map((step, i) => (
            <StepCard key={i} step={step} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;


