import { useRef } from 'react'
import { MotionValue, motion, useScroll, useTransform } from 'framer-motion'

interface DifferencePoint {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  accent: string;
  metric: string;
  metricLabel: string;
  stat1: string;
  stat1Label: string;
  stat2: string;
  stat2Label: string;
  tags: string[];
}

const DifferenceCard = ({ point, i, pointsLength, progress }: { point: DifferencePoint, i: number, pointsLength: number, progress: MotionValue<number> }) => {
  const container = useRef(null);
  
  // Outer Card Scale & Darkening
  const start = i / pointsLength;
  const targetScale = 1 - ((pointsLength - 1 - i) * 0.04);
  const targetOpacity = (pointsLength - 1 - i) * 0.3;
  
  const safeRange = [start, 1];
  const safeScale = [1, targetScale];
  const safeOpacity = [0, targetOpacity];

  const scale = useTransform(progress, safeRange, safeScale);
  const overlayOpacity = useTransform(progress, safeRange, safeOpacity);

  return (
    <div 
      ref={container}
      className="difference-card-wrapper"
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'sticky',
        top: 0
      }}
    >
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
          position: 'relative',
          width: '100%',
          height: 'auto',
          minHeight: 'clamp(400px, 70vh, 650px)',
          transformOrigin: 'top center',
          willChange: 'transform',
          boxShadow: '0 -20px 40px rgba(0,0,0,0.6)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '32px',
          padding: 'clamp(24px, 4vw, 40px)',
          background: '#000000',
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(16px, 2vh, 24px)',
          overflow: 'hidden'
        }}
      >
        {/* Darkening overlay for stacking depth */}
        <motion.div 
          style={{ 
            position: 'absolute', 
            inset: 0, 
            background: '#000', 
            opacity: overlayOpacity,
            zIndex: 10,
            pointerEvents: 'none'
          }} 
        />
        
        {/* Noise Overlay */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none', backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")', mixBlendMode: 'overlay', zIndex: 1, borderRadius: '24px' }}></div>

        {/* Subtle accent line at top */}
        <div style={{ position: 'absolute', top: 0, left: '40px', right: '40px', height: '1px', background: `linear-gradient(90deg, transparent, ${point.accent}, transparent)`, zIndex: 3 }} />
        
        {/* Header row */}
        <div className="difference-card-header" style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div className="difference-card-title" style={{ display: 'flex', gap: 'clamp(10px, 2vw, 20px)', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-adieu)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 0.9, color: point.accent, opacity: 0.6 }}>
              {point.id}
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontFamily: 'var(--font-adieu)', fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {point.title}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.9rem, 1.2vw, 1rem)', opacity: 0.6 }}>
                {point.subtitle}
              </span>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', color: 'rgba(255,255,255,0.7)', marginTop: '8px', maxWidth: '600px', lineHeight: 1.6, textTransform: 'uppercase' }}>
                {point.description}
              </p>
            </div>
          </div>
          <div style={{ padding: '8px 20px', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '30px', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', whiteSpace: 'nowrap' }}>
            THE DIFFERENCE
          </div>
        </div>

        {/* Content grid — no images, all data */}
        <div className="grid-2col" style={{ position: 'relative', zIndex: 2, display: 'grid', gridTemplateColumns: '65% 1fr', gap: '16px', height: 'clamp(280px, 45vh, 400px)', minHeight: 0, marginTop: 'auto' }}>
          
          {/* LEFT — large metric panel */}
          <div style={{
            borderRadius: '24px',
            overflow: 'hidden',
            height: '100%',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 'clamp(20px, 3vw, 36px)',
            position: 'relative',
          }}>
            {/* Background grid pattern */}
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: `linear-gradient(${point.accent}08 1px, transparent 1px), linear-gradient(90deg, ${point.accent}08 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
              borderRadius: '24px',
            }} />

            {/* Top tag row */}
            <div style={{ position: 'relative', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {point.tags.map(tag => (
                <span key={tag} style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  padding: '4px 10px',
                  border: `1px solid ${point.accent}40`,
                  borderRadius: '20px',
                  color: point.accent,
                }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Main metric */}
            <div style={{ position: 'relative' }}>
              <div style={{
                fontFamily: 'var(--font-adieu)',
                fontSize: 'clamp(4rem, 8vw, 7rem)',
                lineHeight: 0.85,
                color: '#fff',
                letterSpacing: '-0.04em',
                marginBottom: '12px',
              }}>
                {point.metric}
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.65rem, 1vw, 0.8rem)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.4)',
              }}>
                {point.metricLabel}
              </div>
            </div>

            {/* Bottom accent bar */}
            <div style={{ position: 'relative', height: '2px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '72%', background: `linear-gradient(90deg, ${point.accent}, ${point.accent}40)`, borderRadius: '2px' }} />
            </div>
          </div>

          {/* RIGHT — two stat blocks */}
          <div className="difference-secondary-images" style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%', minHeight: 0 }}>
            <div style={{
              borderRadius: '24px',
              flex: 1,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '20px',
              gap: '8px',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at center, ${point.accent}10 0%, transparent 70%)` }} />
              <span style={{ fontFamily: 'var(--font-adieu)', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', color: '#fff', lineHeight: 1, position: 'relative' }}>
                {point.stat1}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', textAlign: 'center', position: 'relative' }}>
                {point.stat1Label}
              </span>
            </div>
            <div style={{
              borderRadius: '24px',
              flex: 1,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '20px',
              gap: '8px',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at center, ${point.accent}10 0%, transparent 70%)` }} />
              <span style={{ fontFamily: 'var(--font-adieu)', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', color: '#fff', lineHeight: 1, position: 'relative' }}>
                {point.stat2}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', textAlign: 'center', position: 'relative' }}>
                {point.stat2Label}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

const Difference = () => {
  const sectionRef = useRef(null)
  const cardsContainerRef = useRef(null)
  
  // Track scroll progress exclusively for the cards container
  const { scrollYProgress } = useScroll({
    target: cardsContainerRef,
    offset: ["start start", "end end"]
  })

  // Title parallax
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  const titleY = useTransform(sectionProgress, [0, 1], [-150, 150])

  const points: DifferencePoint[] = [
    { 
      id: '01',
      title: 'NOT A DATA PROBLEM', 
      subtitle: "IT'S A CONTEXTUAL JUDGMENT PROBLEM",
      description: "Most AI tools treat construction testing as a data problem. It isn't.",
      accent: '#4ade80',
      metric: '<4 hrs',
      metricLabel: 'Average report turnaround — down from 5–14 days',
      stat1: '99.9%',
      stat1Label: 'Rebound hammer validation accuracy',
      stat2: 'IS:13311',
      stat2Label: 'Code compliance — auto-checked every field',
      tags: ['NDT', 'SonReb', 'IS Code'],
    },
    { 
      id: '02',
      title: 'CONTEXT IS EVERYTHING', 
      subtitle: 'AGE, EXPOSURE, CEMENT TYPE, CURING',
      description: "A reading of 32 means something completely different on a 30-year-old coastal building versus a freshly cast M25 column inland.",
      accent: '#f87171',
      metric: '12+',
      metricLabel: 'Context variables required before a single result is generated',
      stat1: '30 yrs',
      stat1Label: 'Structural engineering expertise embedded',
      stat2: '4000+',
      stat2Label: 'Housing units audited across programmes',
      tags: ['Exposure', 'Cement Grade', 'Carbonation'],
    },
    { 
      id: '03',
      title: 'VARIABLES REQUIRED', 
      subtitle: 'SYSTEM DEMANDS CONTEXT TO RUN',
      description: "Every variable is a required input. The system refuses to give you a result without the context that makes the result meaningful.",
      accent: '#fbbf24',
      metric: '0',
      metricLabel: 'Results generated without full contextual input',
      stat1: '40–60h',
      stat1Label: 'Senior engineer time saved per project',
      stat2: 'Same day',
      stat2Label: 'Government-grade report delivery',
      tags: ['UPV', 'Chloride', 'Half-Cell', 'RH'],
    },
    { 
      id: '04',
      title: 'EMBEDDED EXPERTISE', 
      subtitle: 'A 30-YEAR ENGINEERING DECISION',
      description: "That's not a software decision. That's a 30-year-structural-engineer decision, embedded.",
      accent: '#a78bfa',
      metric: '₹0',
      metricLabel: 'Manual cross-referencing cost — fully automated',
      stat1: 'ADB',
      stat1Label: 'PMAY & government infrastructure deployed',
      stat2: 'TNHB',
      stat2Label: 'Tamil Nadu Housing Board — active deployment',
      tags: ['Expertise', 'IS Code', 'Deterministic'],
    }
  ]

  return (
    <section ref={sectionRef} id="difference" className="difference" style={{ paddingTop: '200px', paddingBottom: '50px', background: '#000', position: 'relative' }}>
      <div style={{ position: 'relative', zIndex: 2, width: '100%', padding: '0 4vw' }}>
        <motion.div
          style={{ marginBottom: '80px', textAlign: 'center', y: titleY }}
        >
          <h2 style={{ fontFamily: 'var(--font-adieu)', fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 400, lineHeight: 0.9 }}>
            WHAT MAKES US<br />DIFFERENT
          </h2>
        </motion.div>

        <div ref={cardsContainerRef} style={{ position: 'relative' }}>
          {points.map((point, i) => {
            return (
              <DifferenceCard 
                key={i} 
                point={point} 
                i={i} 
                pointsLength={points.length}
                progress={scrollYProgress} 
              />
            )
          })}
          {/* Spacer to allow the last card to remain sticky and visible while reading */}
          <div className="difference-spacer" style={{ height: '50vh' }} />
        </div>
      </div>
    </section>
  )
}

export default Difference
