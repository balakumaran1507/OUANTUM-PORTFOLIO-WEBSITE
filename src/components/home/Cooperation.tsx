import { useRef } from 'react'
import { MotionValue, motion, useScroll, useTransform } from 'framer-motion'

interface CooperationPoint {
  id: string;
  title: string;
  subtitle: string;
  img1: string;
  img2: string;
  img3: string;
}

const CooperationCard = ({ point, i, pointsLength, progress }: { point: CooperationPoint, i: number, pointsLength: number, progress: MotionValue<number> }) => {
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
      className="cooperation-card-wrapper"
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
          boxShadow: '0 -20px 40px rgba(0, 0, 0, 0.12)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '0px',
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
            background: '#000000', 
            opacity: overlayOpacity,
            zIndex: 10,
            pointerEvents: 'none'
          }} 
        />
        
        {/* Noise Overlay */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none', backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")', mixBlendMode: 'overlay', zIndex: 1, borderRadius: '0px' }}></div>
        
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', gap: 'clamp(10px, 2vw, 20px)', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-adieu)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 0.9 }}>
              {point.id}
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontFamily: 'var(--font-geist)', fontWeight: 200, fontSize: 'clamp(1.1rem, 1.6vw, 1.35rem)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {point.title}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.7rem, 1vw, 0.85rem)', opacity: 0.6 }}>
                {point.subtitle}
              </span>
            </div>
          </div>
          <div style={{ padding: '8px 20px', border: '1px solid rgba(0, 0, 0, 0.3)', borderRadius: '30px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            ADVISORY
          </div>
        </div>

        <div className="grid-2col" style={{ position: 'relative', zIndex: 2, display: 'grid', gridTemplateColumns: '65% 1fr', gap: '16px', height: 'clamp(280px, 45vh, 400px)', minHeight: 0 }}>
          <div style={{ borderRadius: '0px', overflow: 'hidden', height: '100%', width: '100%' }}>
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%' }}>
            <div style={{ borderRadius: '0px', overflow: 'hidden', flex: 1, width: '100%' }}>
              <motion.img src={point.img2} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', scale: innerScale }} />
            </div>
            <div style={{ borderRadius: '0px', overflow: 'hidden', flex: 1, width: '100%' }}>
              <motion.img src={point.img3} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', scale: innerScale }} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

const Cooperation = () => {
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
      title: 'PROF. DR. DEVADAS MANOHARAN', 
      subtitle: 'FORMER VC, ANNA UNIVERSITY · IIT MADRAS',
      img1: '/assets/images/bg1.jpg',
      img2: 'https://images.unsplash.com/photo-1545143333-6382f1d020e2?q=80&w=1000&auto=format&fit=crop',
      img3: 'https://images.unsplash.com/photo-1544991180-2a138096f920?q=80&w=1000&auto=format&fit=crop',
    },
    { 
      id: '02',
      title: 'COL. DR. P. NALLATHAMBI', 
      subtitle: 'PRINCIPAL STRUCTURAL CONSULTANT',
      img1: '/assets/images/bg2.jpg',
      img2: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?q=80&w=1000&auto=format&fit=crop',
      img3: 'https://images.unsplash.com/photo-1516937622178-745583720b22?q=80&w=1000&auto=format&fit=crop',
    },
    { 
      id: '03',
      title: 'ER. N. KALAIMONY', 
      subtitle: 'FORMER SE, PWD · EXPERT CONSULTANT',
      img1: '/assets/images/bg3.jpg',
      img2: 'https://images.unsplash.com/photo-1582967702041-0f7300c87f9e?q=80&w=1000&auto=format&fit=crop',
      img3: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=1000&auto=format&fit=crop',
    },
    { 
      id: '04',
      title: '30+ YEAR VETERANS', 
      subtitle: 'BUILT IN COLLABORATION WITH INDUSTRY LEADERS',
      img1: '/assets/images/bg4.jpg',
      img2: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=1000&auto=format&fit=crop',
      img3: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1000&auto=format&fit=crop',
    }
  ]

  return (
    <section ref={sectionRef} id="cooperation" className="cooperation" style={{ padding: '120px 0 50px', background: '#000000', position: 'relative' }}>
      <div style={{ position: 'relative', zIndex: 2, width: '100%', padding: '0 4vw' }}>
        <motion.div
          style={{ marginBottom: '80px', textAlign: 'left', y: titleY }}
        >
          <h2 className="section-title">
            Advisory<br />Board
          </h2>
        </motion.div>

        <div ref={cardsContainerRef} style={{ position: 'relative' }}>
          {points.map((point, i) => {
            return (
              <CooperationCard 
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

export default Cooperation



