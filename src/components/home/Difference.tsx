import { useRef } from 'react'
import { MotionValue, motion, useScroll, useTransform } from 'framer-motion'

interface DifferencePoint {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  img1: string;
  img2: string;
  img3: string;
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

  // Inner Image Parallax
  const { scrollYProgress: innerProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"]
  })
  
  const innerScale = useTransform(innerProgress, [0, 1], [1.3, 1])

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
          background: '#111111',
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
        
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', gap: 'clamp(10px, 2vw, 20px)', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-adieu)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 0.9 }}>
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

        <div className="grid-2col" style={{ position: 'relative', zIndex: 2, display: 'grid', gridTemplateColumns: '65% 1fr', gap: '16px', height: 'clamp(280px, 45vh, 400px)', minHeight: 0, marginTop: 'auto' }}>
          <div style={{ borderRadius: '24px', overflow: 'hidden', height: '100%', width: '100%', minHeight: 0 }}>
            <motion.img 
              src={point.img1} 
              alt="" 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                scale: innerScale
              }} 
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%', minHeight: 0 }}>
            <div style={{ borderRadius: '24px', overflow: 'hidden', flex: 1, width: '100%', minHeight: 0, position: 'relative' }}>
              <motion.img src={point.img2} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', scale: innerScale, position: 'absolute', inset: 0 }} />
            </div>
            <div style={{ borderRadius: '24px', overflow: 'hidden', flex: 1, width: '100%', minHeight: 0, position: 'relative' }}>
              <motion.img src={point.img3} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', scale: innerScale, position: 'absolute', inset: 0 }} />
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

  const points = [
    { 
      id: '01',
      title: 'NOT A DATA PROBLEM', 
      subtitle: "IT'S A CONTEXTUAL JUDGMENT PROBLEM",
      description: "Most AI tools treat construction testing as a data problem. It isn't.",
      img1: '/assets/images/bg1.jpg',
      img2: '/assets/images/bg3.jpg',
      img3: '/assets/images/bg4.jpg',
    },
    { 
      id: '02',
      title: 'CONTEXT IS EVERYTHING', 
      subtitle: 'AGE, EXPOSURE, CEMENT TYPE, CURING',
      description: "A reading of 32 means something completely different on a 30-year-old coastal building versus a freshly cast M25 column inland.",
      img1: '/assets/images/bg2.jpg',
      img2: '/assets/images/cl3.png',
      img3: '/assets/images/cl4.png',
    },
    { 
      id: '03',
      title: 'VARIABLES REQUIRED', 
      subtitle: 'SYSTEM DEMANDS CONTEXT TO RUN',
      description: "Every variable is a required input. The system refuses to give you a result without the context that makes the result meaningful.",
      img1: '/assets/images/bg3.jpg',
      img2: '/assets/images/bg1.jpg',
      img3: '/assets/images/bg2.jpg',
    },
    { 
      id: '04',
      title: 'EMBEDDED EXPERTISE', 
      subtitle: 'A 30-YEAR ENGINEERING DECISION',
      description: "That's not a software decision. That's a 30-year-structural-engineer decision, embedded.",
      img1: '/assets/images/bg4.jpg',
      img2: '/assets/images/philosophy.png',
      img3: '/assets/images/project-pipeline.png',
    }
  ]

  return (
    <section ref={sectionRef} id="difference" className="difference" style={{ padding: '120px 0 50px', background: '#000', position: 'relative' }}>
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
          <div style={{ height: '50vh' }} />
        </div>
      </div>
    </section>
  )
}

export default Difference
