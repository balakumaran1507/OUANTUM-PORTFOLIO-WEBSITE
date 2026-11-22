import React, { useEffect, useRef, useState, useCallback } from 'react';

// =========================================================================
// DUAL ARCH INFINITY MARQUEE COMPONENT
// Left and Right curved arches moving synchronously in the same upward direction
// =========================================================================

export interface ArchCard {
  id: string;
  src: string;
  title: string;
}

export const DUAL_ARCH_CARDS_LEFT: ArchCard[] = [
  { id: 'left-1', src: '/assets/images/buildings/card_building/image_copy.webp', title: 'Curved Glass Atrium' },
  { id: 'left-2', src: '/assets/images/buildings/card_building/image_copy_2.webp', title: 'Ribbed Facade Tower' },
  { id: 'left-3', src: '/assets/images/buildings/card_building/image_copy_3.webp', title: 'Modern Terraced Complex' },
  { id: 'left-4', src: '/assets/images/buildings/card_building/image_copy_4.webp', title: 'High-Density Structural Grid' },
  { id: 'left-5', src: '/assets/images/buildings/card_building/image_copy_5.webp', title: 'Glass Canopy Pavilion' },
  { id: 'left-6', src: '/assets/images/buildings/card_building/image_copy_6.webp', title: 'Brutalist Monolith' },
  { id: 'left-7', src: '/assets/images/buildings/card_building/image_copy_7.webp', title: 'Parametric Timber Lattice' },
  { id: 'left-8', src: '/assets/images/buildings/card_building/image_copy_8.webp', title: 'Double-Skin Curtain Wall' },
  { id: 'left-9', src: '/assets/images/buildings/card_building/image_copy_9.webp', title: 'Symmetric Civic Center' },
  { id: 'left-10', src: '/assets/images/buildings/card_building/image_copy_10.webp', title: 'Suspension Cable Span' },
];

export const DUAL_ARCH_CARDS_RIGHT: ArchCard[] = [
  { id: 'right-1', src: '/assets/images/buildings/sub-buildings/image_copy_2.webp', title: 'Reinforced Concrete Pier' },
  { id: 'right-2', src: '/assets/images/buildings/sub-buildings/image_copy_3.webp', title: 'Steel Truss Viaduct' },
  { id: 'right-3', src: '/assets/images/buildings/sub-buildings/image_copy_4.webp', title: 'Cantilever Terminal' },
  { id: 'right-4', src: '/assets/images/buildings/sub-buildings/image_copy_5.webp', title: 'Segmental Arch Bridge' },
  { id: 'right-5', src: '/assets/images/buildings/sub-buildings/image_copy_6.webp', title: 'Composite Deck Span' },
  { id: 'right-6', src: '/assets/images/buildings/sub-buildings/image_copy_7.webp', title: 'Prestressed Box Girder' },
  { id: 'right-7', src: '/assets/images/buildings/sub-buildings/image_copy_8.webp', title: 'Geometric Vault Pavilion' },
  { id: 'right-8', src: '/assets/images/buildings/sub-buildings/image_copy_9.webp', title: 'Modular Infrastructure Node' },
  { id: 'right-9', src: '/assets/images/buildings/sub-buildings/image_copy_10.webp', title: 'Tension Cable Tower' },
  { id: 'right-10', src: '/assets/images/buildings/sub-buildings/image_copy_11.webp', title: 'Diagridded High-Rise' },
];

export interface DualArchMarqueeProps {
  /** Speed of upward infinite rotation (default: 0.38) */
  speed?: number;

  /** Base card width on desktop in pixels (default: 92) */
  cardWidth?: number;
  /** Base card height on desktop in pixels (default: 92) */
  cardHeight?: number;

  /** Multiplier to scale the card dimensions (default: 1.0, e.g. 1.25 = 25% larger) */
  cardScale?: number;

  /**
   * Spacing factor multiplier between cards (default: 1.35).
   * Values > 1.0 create a larger, cleaner gap between cards along the arch arc.
   */
  cardSpacing?: number;

  /**
   * Additional angular gap between cards in degrees (default: 0).
   * Directly increases the distance between successive cards.
   */
  cardGap?: number;

  /**
   * Global Horizontal (X-axis) shift for both arches.
   * Positive moves arches inward towards the center content; negative moves them outward towards the edges.
   */
  axisXOffset?: number;

  /**
   * Global Vertical (Y-axis) shift for both arches.
   * Positive moves arches downward; negative moves them upward.
   */
  axisYOffset?: number;

  /** Independent horizontal offset for the left arch in pixels (default: 0) */
  leftArchXOffset?: number;
  /** Independent horizontal offset for the right arch in pixels (default: 0) */
  rightArchXOffset?: number;

  /** Independent vertical offset for the left arch in pixels (default: 0) */
  leftArchYOffset?: number;
  /** Independent vertical offset for the right arch in pixels (default: 0) */
  rightArchYOffset?: number;

  /** Inward reach of the arch apex in pixels from the lateral edge (default: desktop 280) */
  inwardReach?: number;

  /** Optional manual override for circle radius in pixels */
  archRadius?: number;

  /** Completely hide and disable the marquee in mobile view (screen width < 768px). Default is true. */
  hideOnMobile?: boolean;

  className?: string;
  style?: React.CSSProperties;
}

export const DualArchMarquee: React.FC<DualArchMarqueeProps> = ({
  speed = 0.38,
  cardWidth = 92,
  cardHeight = 92,
  cardScale = 1.0,
  cardSpacing = 1.35,
  cardGap = 0,
  axisXOffset = 0,
  axisYOffset = 0,
  leftArchXOffset = 0,
  rightArchXOffset = 0,
  leftArchYOffset = 0,
  rightArchYOffset = 0,
  inwardReach,
  archRadius,
  hideOnMobile = true,
  className = '',
  style = {},
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const leftCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rightCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  const [isDragging, setIsDragging] = useState(false);

  // Sync window resize
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < 768);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Shared progress & drag momentum refs
  const progressRef = useRef<number>(0);
  const flingVelocityRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const lastPointerYRef = useRef<number>(0);
  const lastPointerTimeRef = useRef<number>(0);
  const dragVelocityRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(performance.now());
  const rafIdRef = useRef<number | null>(null);

  const propsRef = useRef({
    speed,
    cardWidth,
    cardHeight,
    cardScale,
    cardSpacing,
    cardGap,
    axisXOffset,
    axisYOffset,
    leftArchXOffset,
    rightArchXOffset,
    leftArchYOffset,
    rightArchYOffset,
    inwardReach,
    archRadius,
    hideOnMobile,
  });

  useEffect(() => {
    propsRef.current = {
      speed,
      cardWidth,
      cardHeight,
      cardScale,
      cardSpacing,
      cardGap,
      axisXOffset,
      axisYOffset,
      leftArchXOffset,
      rightArchXOffset,
      leftArchYOffset,
      rightArchYOffset,
      inwardReach,
      archRadius,
      hideOnMobile,
    };
  }, [
    speed,
    cardWidth,
    cardHeight,
    cardScale,
    cardSpacing,
    cardGap,
    axisXOffset,
    axisYOffset,
    leftArchXOffset,
    rightArchXOffset,
    leftArchYOffset,
    rightArchYOffset,
    inwardReach,
    archRadius,
    hideOnMobile,
  ]);

  // Main 60/120fps Animation & Physics Loop
  useEffect(() => {
    const animate = (now: number) => {
      const currentProps = propsRef.current;

      // Skip rendering and calculation if hidden on mobile
      if (currentProps.hideOnMobile && typeof window !== 'undefined' && window.innerWidth < 768) {
        rafIdRef.current = requestAnimationFrame(animate);
        return;
      }

      const dt = Math.min((now - lastTimeRef.current) / 16.667, 2.5);
      lastTimeRef.current = now;

      const currentSpeed = currentProps.speed ?? 0.38;

      // Card geometry & spacing:
      const leftCardCount = DUAL_ARCH_CARDS_LEFT.length;
      const rightCardCount = DUAL_ARCH_CARDS_RIGHT.length;
      const spacingFactor = Math.max(0.5, currentProps.cardSpacing ?? 1.35);
      const extraGap = currentProps.cardGap ?? 0;
      // Step angle between cards (degrees)
      const angularStep = 13.0 * spacingFactor + extraGap;
      const loopDomain = angularStep * Math.max(leftCardCount, rightCardCount);

      // Physics integration:
      if (isDraggingRef.current) {
        // Driven directly by pointer drag
      } else if (Math.abs(flingVelocityRef.current) > 0.04) {
        progressRef.current = (progressRef.current + flingVelocityRef.current * dt) % loopDomain;
        flingVelocityRef.current *= Math.pow(0.958, dt);
      } else {
        // Continuous upward auto-rotation in same direction
        flingVelocityRef.current = 0;
        progressRef.current = (progressRef.current + currentSpeed * dt * 0.18) % loopDomain;
      }

      const container = containerRef.current;
      if (container) {
        const w = container.clientWidth || window.innerWidth;
        const h = container.clientHeight || 700;

        const baseCardW = currentProps.cardWidth ?? 92;
        const baseCardH = currentProps.cardHeight ?? 92;
        const scale = Math.max(0.2, currentProps.cardScale ?? 1.0);
        const cardW = Math.round(baseCardW * scale);
        const cardH = Math.round(baseCardH * scale);

        // Circular arc geometry:
        // Extended vertical reach so cards physically clear the container bounds at both ends
        const verticalReach = h / 2 + cardH + 70;
        const thetaMaxDeg = 62;
        const thetaMaxRad = (thetaMaxDeg * Math.PI) / 180;
        // Radius of circle (can be overridden via archRadius)
        const radius = currentProps.archRadius ?? (verticalReach / Math.sin(thetaMaxRad));

        // Horizontal positioning:
        const lateralMargin = Math.max(36, w * 0.04);
        const apexReach = currentProps.inwardReach ?? Math.min(w * 0.22, 280);
        
        // Axis Offsets:
        const gAxisX = currentProps.axisXOffset ?? 0;
        const gAxisY = currentProps.axisYOffset ?? 0;

        // Left circle center & apex:
        const leftApexX = lateralMargin + apexReach + gAxisX + (currentProps.leftArchXOffset ?? 0);
        const leftCenterX = leftApexX - radius;
        const leftCenterY = h / 2 + gAxisY + (currentProps.leftArchYOffset ?? 0);

        // Right circle center & apex:
        const rightApexX = w - lateralMargin - apexReach - gAxisX - (currentProps.rightArchXOffset ?? 0);
        const rightCenterX = rightApexX + radius;
        const rightCenterY = h / 2 + gAxisY + (currentProps.rightArchYOffset ?? 0);

        // Cutoff boundary: at 65°, cards are already completely outside the container boundaries
        const cutoffBoundary = 65;

        // Update LEFT Arch Cards (Moving UPWARD: theta increases)
        for (let i = 0; i < leftCardCount; i++) {
          const cardEl = leftCardRefs.current[i];
          if (!cardEl) continue;

          // Normalized angle in [-loopDomain / 2, loopDomain / 2]
          const rawDeg = ((progressRef.current + i * angularStep) % loopDomain + loopDomain) % loopDomain;
          const deg = rawDeg - loopDomain / 2;
          const absDeg = Math.abs(deg);

          // Card is offscreen beyond container boundaries
          if (absDeg > cutoffBoundary) {
            cardEl.style.display = 'none';
            continue;
          }

          cardEl.style.display = 'block';

          // Circle math:
          // theta = 0 at middle (apex).
          // As theta increases: y decreases (moves UPWARD from bottom to top).
          const rad = (deg * Math.PI) / 180;
          const posX = leftCenterX + radius * Math.cos(rad) - cardW / 2;
          const posY = leftCenterY - radius * Math.sin(rad) - cardH / 2;
          // Tangent tilt angle: follows curve naturally
          const tiltDeg = -deg * 0.85;

          cardEl.style.width = `${cardW}px`;
          cardEl.style.height = `${cardH}px`;
          cardEl.style.transform = `translate3d(${posX.toFixed(1)}px, ${posY.toFixed(1)}px, 0px) rotate(${tiltDeg.toFixed(2)}deg)`;
          // Solid opacity throughout - smooth edge disappearance is handled at container boundary
          cardEl.style.opacity = '1';
          cardEl.style.zIndex = `${Math.round(100 - absDeg)}`;
        }

        // Update RIGHT Arch Cards (Moving UPWARD in SAME direction: theta increases)
        for (let i = 0; i < rightCardCount; i++) {
          const cardEl = rightCardRefs.current[i];
          if (!cardEl) continue;

          const rawDeg = ((progressRef.current + i * angularStep) % loopDomain + loopDomain) % loopDomain;
          const deg = rawDeg - loopDomain / 2;
          const absDeg = Math.abs(deg);

          if (absDeg > cutoffBoundary) {
            cardEl.style.display = 'none';
            continue;
          }

          cardEl.style.display = 'block';

          const rad = (deg * Math.PI) / 180;
          const posX = rightCenterX - radius * Math.cos(rad) - cardW / 2;
          const posY = rightCenterY - radius * Math.sin(rad) - cardH / 2;
          const tiltDeg = deg * 0.85;

          cardEl.style.width = `${cardW}px`;
          cardEl.style.height = `${cardH}px`;
          cardEl.style.transform = `translate3d(${posX.toFixed(1)}px, ${posY.toFixed(1)}px, 0px) rotate(${tiltDeg.toFixed(2)}deg)`;
          // Solid opacity throughout - smooth edge disappearance is handled at container boundary
          cardEl.style.opacity = '1';
          cardEl.style.zIndex = `${Math.round(100 - absDeg)}`;
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
  }, []);

  // Pointer drag handlers: dragging UP advances upward motion, dragging DOWN reverses
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;

    isDraggingRef.current = true;
    setIsDragging(true);

    lastPointerYRef.current = e.clientY;
    lastPointerTimeRef.current = performance.now();
    dragVelocityRef.current = 0;
    flingVelocityRef.current = 0;

    document.body.style.userSelect = 'none';

    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // Ignore
    }
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;

    const currentY = e.clientY;
    const now = performance.now();
    const deltaY = currentY - lastPointerYRef.current;
    const dt = Math.max(now - lastPointerTimeRef.current, 5);

    // Dragging UP (deltaY < 0) advances upward
    const sensitivity = 0.16;
    const deltaProgress = -deltaY * sensitivity;
    progressRef.current = progressRef.current + deltaProgress;

    const instantVelocity = (deltaProgress / dt) * 16.667;
    dragVelocityRef.current = dragVelocityRef.current * 0.35 + instantVelocity * 0.65;

    lastPointerYRef.current = currentY;
    lastPointerTimeRef.current = now;
  }, []);

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
    if (elapsedSinceMove > 90) {
      flingVelocityRef.current = 0;
    } else {
      const maxVel = 16.0;
      flingVelocityRef.current = Math.max(-maxVel, Math.min(maxVel, dragVelocityRef.current));
    }
  }, []);

  // Complete removal on mobile view if hideOnMobile is true
  if (hideOnMobile && isMobile) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`dual-arch-marquee-container ${className}`}
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
        zIndex: 2,
        touchAction: 'none',
        cursor: isDragging ? 'grabbing' : 'grab',
        ...style,
      }}
      title="Click and drag to spin arches"
    >
      {/* LEFT ARCH CARDS (Moving Upward) */}
      {DUAL_ARCH_CARDS_LEFT.map((card, i) => (
        <div
          key={`left-${card.id}-${i}`}
          ref={(el) => {
            leftCardRefs.current[i] = el;
          }}
          className="dual-arch-card dual-arch-card-left"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            willChange: 'transform, opacity',
            borderRadius: isMobile ? '8px' : '14px',
            overflow: 'hidden',
            boxShadow: isMobile
              ? '0 6px 16px -2px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.04)'
              : '0 12px 28px -4px rgba(0, 0, 0, 0.14), 0 3px 8px rgba(0, 0, 0, 0.05)',
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
            loading={i < 5 ? 'eager' : 'lazy'}
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

      {/* RIGHT ARCH CARDS (Moving Upward in SAME direction) */}
      {DUAL_ARCH_CARDS_RIGHT.map((card, i) => (
        <div
          key={`right-${card.id}-${i}`}
          ref={(el) => {
            rightCardRefs.current[i] = el;
          }}
          className="dual-arch-card dual-arch-card-right"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            willChange: 'transform, opacity',
            borderRadius: isMobile ? '8px' : '14px',
            overflow: 'hidden',
            boxShadow: isMobile
              ? '0 6px 16px -2px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.04)'
              : '0 12px 28px -4px rgba(0, 0, 0, 0.14), 0 3px 8px rgba(0, 0, 0, 0.05)',
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
            loading={i < 5 ? 'eager' : 'lazy'}
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
  );
};

export default DualArchMarquee;
