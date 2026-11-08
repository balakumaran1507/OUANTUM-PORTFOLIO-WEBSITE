import React, { useEffect, useRef, useState, useCallback } from 'react';

// =========================================================================
// ARCH INFINITY MARQUEE CONFIGURATION
// Configurable parameters for speed, circular radius, card counts & Y positions
// =========================================================================
export const ARCH_MARQUEE_CONFIG = {
  // Continuous auto-rotation speed (degrees per frame at 60fps)
  speed: 0.45,
  // Drag sensitivity multiplier (degrees per pixel dragged)
  desktopDragSensitivity: 0.18,
  mobileDragSensitivity: 0.32,
  // Inertia momentum friction decay factor (0.90 to 0.98, lower = stops sooner)
  friction: 0.958,
  // Max fling velocity (degrees per frame)
  maxFlingVelocity: 18.0,
  // Base clearance from section top to highest card apex (safely below navbar)
  desktopApexY: 8,
  mobileApexY: 12,
  // Desktop parameters (viewport width >= 768px):
  desktop: {
    cardWidth: 120,
    cardHeight: 128,
    radius: 640,
    totalCards: 24, // 24 cards in circle -> ~12-13 cards visible across the semi-circle!
    cardGap: 48,    // Default gap between cards on desktop in px
    y: -10,         // Y-axis translation offset on desktop (positive = DOWN, negative = UP)
  },
  // Mobile parameters (viewport width < 768px):
  // Clean, static architectural arch of image cards alone (no marquee infinity list) placed above the title
  mobile: {
    cardWidth: 50,  // Increased mobile card width (default: 50px)
    cardHeight: 60, // Increased mobile card height (default: 60px)
    radius: 154,    // Circular radius tailored for larger card dimensions
    totalCards: 7,  // 7 larger cards form a prominent, bold static arch
    cardGap: 10,    // Default gap between cards on mobile in px (adjust to tighten or widen)
    y: 0,           // Y-axis translation offset on mobile (positive = DOWN, negative = UP)
  },
};

// 20 Architectural Landmark & Engineering Imagery for seamless continuous infinite rotation
export const ARCH_MARQUEE_CARDS = [
  { id: 'arc-1', src: '/assets/images/buildings/card_building/image_copy.webp', title: 'Curved Glass Atrium' },
  { id: 'arc-2', src: '/assets/images/buildings/card_building/image_copy_2.webp', title: 'Ribbed Facade Tower' },
  { id: 'arc-3', src: '/assets/images/buildings/card_building/image_copy_3.webp', title: 'Modern Terraced Complex' },
  { id: 'arc-4', src: '/assets/images/buildings/card_building/image_copy_4.webp', title: 'High-Density Structural Grid' },
  { id: 'arc-5', src: '/assets/images/buildings/card_building/image_copy_5.webp', title: 'Glass Canopy Pavilion' },
  { id: 'arc-6', src: '/assets/images/buildings/card_building/image_copy_6.webp', title: 'Brutalist Monolith' },
  { id: 'arc-7', src: '/assets/images/buildings/card_building/image_copy_7.webp', title: 'Parametric Timber Lattice' },
  { id: 'arc-8', src: '/assets/images/buildings/card_building/image_copy_8.webp', title: 'Double-Skin Curtain Wall' },
  { id: 'arc-9', src: '/assets/images/buildings/card_building/image_copy_9.webp', title: 'Symmetric Civic Center' },
  { id: 'arc-10', src: '/assets/images/buildings/card_building/image_copy_10.webp', title: 'Suspension Cable Span' },
  { id: 'arc-11', src: '/assets/images/buildings/sub-buildings/image_copy_2.webp', title: 'Reinforced Concrete Pier' },
  { id: 'arc-12', src: '/assets/images/buildings/sub-buildings/image_copy_3.webp', title: 'Steel Truss Viaduct' },
  { id: 'arc-13', src: '/assets/images/buildings/sub-buildings/image_copy_4.webp', title: 'Cantilever Terminal' },
  { id: 'arc-14', src: '/assets/images/buildings/sub-buildings/image_copy_5.webp', title: 'Segmental Arch Bridge' },
  { id: 'arc-15', src: '/assets/images/buildings/sub-buildings/image_copy_6.webp', title: 'Composite Deck Span' },
  { id: 'arc-16', src: '/assets/images/buildings/sub-buildings/image_copy_7.webp', title: 'Prestressed Box Girder' },
  { id: 'arc-17', src: '/assets/images/buildings/sub-buildings/image_copy_8.webp', title: 'Geometric Vault Pavilion' },
  { id: 'arc-18', src: '/assets/images/buildings/sub-buildings/image_copy_9.webp', title: 'Modular Infrastructure Node' },
  { id: 'arc-19', src: '/assets/images/buildings/sub-buildings/image_copy_10.webp', title: 'Tension Cable Tower' },
  { id: 'arc-20', src: '/assets/images/buildings/sub-buildings/image_copy_11.webp', title: 'Diagridded High-Rise' },
];

// Expanded card sequence to support high card density seamlessly across 360 degrees
const RENDER_CARDS = [...ARCH_MARQUEE_CARDS, ...ARCH_MARQUEE_CARDS];

const parseOffset = (val: number | string | undefined, defaultVal: number): number => {
  if (val === undefined || val === null) return defaultVal;
  if (typeof val === 'number') return val;
  const parsed = parseFloat(val);
  return isNaN(parsed) ? defaultVal : parsed;
};

export interface ArchMarqueeProps {
  /** Y-axis translation for desktop (e.g. 0, -10, 15, "10px"). Positive moves DOWN, negative moves UP */
  y?: number | string;
  /** Y-axis translation for mobile view under 768px */
  mobileY?: number | string;
  /** Total cards in 360° circle on desktop (e.g. 24 = ~12 cards visible across arch) */
  totalCards?: number;
  /** Total cards in static arch on mobile (e.g. 7 or 9 cards) */
  mobileTotalCards?: number;
  /** Card width in pixels on desktop (default: 120) */
  cardWidth?: number;
  /** Card height in pixels on desktop (default: 128) */
  cardHeight?: number;
  /** Card width in pixels on mobile (default: 50) */
  mobileCardWidth?: number;
  /** Card height in pixels on mobile (default: 60) */
  mobileCardHeight?: number;
  /** Overall scale multiplier for cards on mobile (e.g. 1.0, 1.2, 1.3) */
  mobileCardScale?: number;
  /** Overall scale multiplier for cards on desktop (e.g. 1.0, 1.2) */
  cardScale?: number;
  /** Gap between cards in pixels on desktop (default: 48) */
  cardGap?: number;
  /** Gap between cards in pixels on mobile (default: 10) */
  mobileCardGap?: number;
  /** Alias for cardGap */
  gap?: number;
  /** Alias for mobileCardGap */
  mobileGap?: number;
  /** Continuous auto-rotation speed multiplier */
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const ArchMarquee: React.FC<ArchMarqueeProps> = ({
  y,
  mobileY,
  totalCards: propTotalCards,
  mobileTotalCards: propMobileTotalCards,
  cardWidth,
  cardHeight,
  mobileCardWidth,
  mobileCardHeight,
  mobileCardScale,
  cardScale,
  cardGap,
  mobileCardGap,
  gap,
  mobileGap,
  speed = ARCH_MARQUEE_CONFIG.speed,
  className = '',
  style = {},
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  const [windowWidth, setWindowWidth] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : 390
  );
  const [isDragging, setIsDragging] = useState(false);

  // Latest props kept in refs for 60/120fps requestAnimationFrame without re-renders
  const propsRef = useRef({
    y,
    mobileY,
    propTotalCards,
    propMobileTotalCards,
    cardWidth,
    cardHeight,
    cardScale,
    mobileCardWidth,
    mobileCardHeight,
    mobileCardScale,
    cardGap: cardGap ?? gap,
    mobileCardGap: mobileCardGap ?? mobileGap ?? gap,
    speed,
  });
  useEffect(() => {
    propsRef.current = {
      y,
      mobileY,
      propTotalCards,
      propMobileTotalCards,
      cardWidth,
      cardHeight,
      cardScale,
      mobileCardWidth,
      mobileCardHeight,
      mobileCardScale,
      cardGap: cardGap ?? gap,
      mobileCardGap: mobileCardGap ?? mobileGap ?? gap,
      speed,
    };
  }, [
    y,
    mobileY,
    propTotalCards,
    propMobileTotalCards,
    cardWidth,
    cardHeight,
    cardScale,
    mobileCardWidth,
    mobileCardHeight,
    mobileCardScale,
    cardGap,
    mobileCardGap,
    gap,
    mobileGap,
    speed,
  ]);

  // Animation & Physics Tracking (in refs for 60/120fps RAF without React re-renders)
  const angleRef = useRef<number>(0);
  const flingVelocityRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const lastPointerXRef = useRef<number>(0);
  const lastPointerTimeRef = useRef<number>(0);
  const dragVelocityRef = useRef<number>(0);
  const totalMovedDistanceRef = useRef<number>(0);

  const lastTimeRef = useRef<number>(performance.now());
  const rafIdRef = useRef<number | null>(null);

  // Sync resize
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < 768);
        setWindowWidth(window.innerWidth);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Main 60/120fps Animation and Physics Loop (DESKTOP ONLY - Zero motion on mobile)
  useEffect(() => {
    if (isMobile) {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      return;
    }

    const animate = (now: number) => {
      const dt = Math.min((now - lastTimeRef.current) / 16.667, 2.5);
      lastTimeRef.current = now;

      const currentProps = propsRef.current;
      const currentSpeed = currentProps.speed ?? ARCH_MARQUEE_CONFIG.speed;

      // Physics integration (desktop only):
      if (isDraggingRef.current) {
        // While actively dragging, angle is directly driven by pointer
      } else if (Math.abs(flingVelocityRef.current) > 0.04) {
        // High-speed fling momentum with smooth exponential friction decay
        angleRef.current = (angleRef.current + flingVelocityRef.current * dt) % 360;
        flingVelocityRef.current *= Math.pow(ARCH_MARQUEE_CONFIG.friction, dt);
      } else {
        // Idle continuous smooth infinite rotation
        flingVelocityRef.current = 0;
        angleRef.current = (angleRef.current + currentSpeed * dt * 0.14) % 360;
      }

      const container = containerRef.current;
      if (container) {
        const w = container.clientWidth || window.innerWidth;
        const cfg = ARCH_MARQUEE_CONFIG.desktop;
        const rawScale = currentProps.cardScale ?? 1.0;
        const rawW = currentProps.cardWidth ?? cfg.cardWidth;
        const rawH = currentProps.cardHeight ?? cfg.cardHeight;
        const cardW = Math.round(rawW * rawScale);
        const cardH = Math.round(rawH * rawScale);

        // TRUE PERFECT CIRCULAR ARCH:
        const radius = Math.min(Math.max(w * 0.44, 550), cfg.radius);
        const activeY = parseOffset(currentProps.y, cfg.y);
        const apexY = ARCH_MARQUEE_CONFIG.desktopApexY + activeY;
        const cx = w / 2;
        const cy = apexY + radius + cardH / 2;

        // Calculate totalCards taking cardGap into account if customized:
        const activeDesktopGap = currentProps.cardGap ?? cfg.cardGap;
        let totalCards = cfg.totalCards;
        if (currentProps.propTotalCards !== undefined) {
          totalCards = currentProps.propTotalCards;
        } else if (activeDesktopGap !== undefined) {
          totalCards = Math.round((2 * Math.PI * radius) / (cardW + activeDesktopGap));
        }
        totalCards = Math.max(8, Math.min(RENDER_CARDS.length, Math.round(totalCards)));
        const spacingDeg = 360 / totalCards;
        const fadeStart = 96;
        const fadeEnd = 112;

        for (let i = 0; i < RENDER_CARDS.length; i++) {
          const card = cardRefs.current[i];
          if (!card) continue;

          // If index exceeds active card count for desktop, hide card
          if (i >= totalCards) {
            card.style.display = 'none';
            continue;
          }

          // Exact uniform angle calculation in [-180, 180] with robust modulo wrapping:
          const normDeg = (((angleRef.current + i * spacingDeg) % 360) + 360) % 360;
          const deg = normDeg > 180 ? normDeg - 360 : normDeg;
          const absDeg = Math.abs(deg);

          // Card beyond visible horizon: hide immediately
          if (absDeg > fadeEnd) {
            card.style.display = 'none';
            continue;
          }

          // Seamless, continuous flow at the horizon boundaries:
          let opacity = 1;
          let scale = 1;
          if (absDeg > fadeStart) {
            const progress = (absDeg - fadeStart) / (fadeEnd - fadeStart);
            opacity = Math.max(0, 1 - progress * progress);
            scale = 1 - progress * 0.18;
          }

          card.style.display = 'block';

          // Perfect circle parametric formula:
          const rad = (deg * Math.PI) / 180;
          const posX = cx + radius * Math.sin(rad) - cardW / 2;
          const posY = cy - radius * Math.cos(rad) - cardH / 2;

          card.style.width = `${cardW}px`;
          card.style.height = `${cardH}px`;
          card.style.transform = `translate3d(${posX.toFixed(1)}px, ${posY.toFixed(1)}px, 0px) rotate(${deg.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
          card.style.opacity = opacity.toFixed(3);
          card.style.zIndex = `${Math.round(100 - absDeg)}`;
        }
      }

      rafIdRef.current = requestAnimationFrame(animate);
    };

    lastTimeRef.current = performance.now();
    rafIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [isMobile]);

  // Pointer Drag Handlers with Fast Fling Momentum (Desktop only)
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (isMobile) return;
    if (e.button !== 0 && e.pointerType === 'mouse') return;

    isDraggingRef.current = true;
    setIsDragging(true);

    lastPointerXRef.current = e.clientX;
    lastPointerTimeRef.current = performance.now();
    dragVelocityRef.current = 0;
    totalMovedDistanceRef.current = 0;
    flingVelocityRef.current = 0;

    document.body.style.userSelect = 'none';

    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // Ignore
    }
  }, [isMobile]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (isMobile || !isDraggingRef.current) return;

    const currentX = e.clientX;
    const now = performance.now();
    const deltaX = currentX - lastPointerXRef.current;
    const dt = Math.max(now - lastPointerTimeRef.current, 5);

    totalMovedDistanceRef.current += Math.abs(deltaX);

    const sensitivity = isMobile
      ? ARCH_MARQUEE_CONFIG.mobileDragSensitivity
      : ARCH_MARQUEE_CONFIG.desktopDragSensitivity;

    // 1-to-1 tactile drag: dragging right advances clockwise
    const deltaAngle = deltaX * sensitivity;
    angleRef.current = (angleRef.current + deltaAngle) % 360;

    // Exponential moving average for fling velocity
    const instantVelocity = (deltaAngle / dt) * 16.667;
    dragVelocityRef.current = dragVelocityRef.current * 0.35 + instantVelocity * 0.65;

    lastPointerXRef.current = currentX;
    lastPointerTimeRef.current = now;
  }, [isMobile]);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;

    isDraggingRef.current = false;
    setIsDragging(false);
    document.body.style.userSelect = '';

    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore
    }

    const elapsedSinceMove = performance.now() - lastPointerTimeRef.current;
    // If user paused before release, stop fling
    if (elapsedSinceMove > 90) {
      flingVelocityRef.current = 0;
    } else {
      // Release with inertial fling momentum
      const maxVel = ARCH_MARQUEE_CONFIG.maxFlingVelocity;
      flingVelocityRef.current = Math.max(-maxVel, Math.min(maxVel, dragVelocityRef.current));
    }
  }, []);

  // =========================================================================
  // MOBILE STATIC ARCH (Zero motion, zero marquee - static cards list alone)
  // Symmetrically places cards with keystone apex card at 0°
  // =========================================================================
  const mobileCount = Math.max(
    5,
    Math.min(
      ARCH_MARQUEE_CARDS.length,
      Math.round(propMobileTotalCards ?? ARCH_MARQUEE_CONFIG.mobile.totalCards)
    )
  );
  const mobileCards = ARCH_MARQUEE_CARDS.slice(0, mobileCount);

  const mobileW = windowWidth || 390;
  const mobileCfg = ARCH_MARQUEE_CONFIG.mobile;

  // Scaled & custom configurable mobile card sizes:
  const rawMobileScale = (mobileCardScale ?? 1.0) * (cardScale ?? 1.0);
  const rawMobileCardW = mobileCardWidth ?? mobileCfg.cardWidth;
  const rawMobileCardH = mobileCardHeight ?? mobileCfg.cardHeight;
  const mobileCardW = Math.round(rawMobileCardW * rawMobileScale);
  const mobileCardH = Math.round(rawMobileCardH * rawMobileScale);

  const mobileRadius = Math.min(mobileW * 0.40, mobileCfg.radius);
  const mobileActiveY = parseOffset(mobileY, mobileCfg.y);
  const mobileApexY = ARCH_MARQUEE_CONFIG.mobileApexY + mobileActiveY;
  const mobileCx = mobileW / 2;
  const mobileCy = mobileApexY + mobileRadius + mobileCardH / 2;

  // Configurable pixel gap between cards on mobile:
  const activeMobileGap = mobileCardGap ?? mobileGap ?? gap ?? mobileCfg.cardGap;

  // Arc spacing between card centers: card width + physical gap
  const mobileCenterSpacing = mobileCardW + activeMobileGap;
  const mobileStepDeg = (mobileCenterSpacing / mobileRadius) * (180 / Math.PI);
  const mobileCenterIndex = (mobileCount - 1) / 2;

  const mobileStaticCards = mobileCards.map((card, i) => {
    // Symmetrical positioning with keystone apex card exactly at 0°:
    const deg = (i - mobileCenterIndex) * mobileStepDeg;
    const rad = (deg * Math.PI) / 180;
    const posX = mobileCx + mobileRadius * Math.sin(rad) - mobileCardW / 2;
    const posY = mobileCy - mobileRadius * Math.cos(rad) - mobileCardH / 2;
    const zIndex = Math.round(100 - Math.abs(deg));
    return {
      card,
      deg,
      posX,
      posY,
      zIndex,
    };
  });

  return (
    <div
      className={`arch-marquee-root ${className}`}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        ...style,
      }}
    >
      <style>{`
        .arch-mobile-static-view {
          display: block;
        }
        .arch-desktop-marquee-view {
          display: none;
        }
        @media (min-width: 768px) {
          .arch-mobile-static-view {
            display: none !important;
          }
          .arch-desktop-marquee-view {
            display: block !important;
          }
        }
      `}</style>

      {/* MOBILE VIEW: Pure Static Arch of Image Cards Alone (ZERO MOTION) */}
      <div
        className="arch-mobile-static-view"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        {mobileStaticCards.map(({ card, deg, posX, posY, zIndex }) => (
          <div
            key={card.id}
            className="arch-static-card"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: `${mobileCardW}px`,
              height: `${mobileCardH}px`,
              transform: `translate3d(${posX.toFixed(1)}px, ${posY.toFixed(1)}px, 0px) rotate(${deg.toFixed(2)}deg)`,
              borderRadius: '11px',
              overflow: 'hidden',
              boxShadow: '0 6px 16px -2px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.04)',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              background: '#eae6dc',
              zIndex,
              pointerEvents: 'none',
            }}
          >
            <img
              src={card.src}
              alt={card.title}
              loading="eager"
              draggable={false}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            />
          </div>
        ))}
      </div>

      {/* DESKTOP VIEW: Full Interactive Infinite Arch Marquee (Rotates & Draggable) */}
      <div
        ref={containerRef}
        className="arch-desktop-marquee-view"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          zIndex: 1,
          touchAction: 'none',
          pointerEvents: 'auto',
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        title="Click and drag to spin"
      >
        {RENDER_CARDS.map((card, i) => (
          <div
            key={`${card.id}-${i}`}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="arch-marquee-card"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              willChange: 'transform, opacity',
              borderRadius: '18px',
              overflow: 'hidden',
              boxShadow: '0 14px 32px -4px rgba(0, 0, 0, 0.15), 0 3px 8px rgba(0, 0, 0, 0.05)',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              background: '#eae6dc',
              cursor: isDragging ? 'grabbing' : 'grab',
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          >
            <img
              src={card.src}
              alt={card.title}
              loading={i < 8 ? 'eager' : 'lazy'}
              draggable={false}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArchMarquee;
