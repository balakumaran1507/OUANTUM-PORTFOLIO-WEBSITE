import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Infinity as InfinityIcon, Plus } from 'lucide-react';

// 15 Architectural Landmark images from card_building (strictly for Left Stream)
const CARD_BUILDINGS = [
  { id: 'cb-1', src: '/assets/images/buildings/card_building/image.webp', title: 'OUANTUM Landmark 01' },
  { id: 'cb-2', src: '/assets/images/buildings/card_building/image_copy.webp', title: 'OUANTUM Landmark 02' },
  { id: 'cb-3', src: '/assets/images/buildings/card_building/image_copy_2.webp', title: 'OUANTUM Landmark 03' },
  { id: 'cb-4', src: '/assets/images/buildings/card_building/image_copy_3.webp', title: 'OUANTUM Landmark 04' },
  { id: 'cb-5', src: '/assets/images/buildings/card_building/image_copy_4.webp', title: 'OUANTUM Landmark 05' },
  { id: 'cb-6', src: '/assets/images/buildings/card_building/image_copy_5.webp', title: 'OUANTUM Landmark 06' },
  { id: 'cb-7', src: '/assets/images/buildings/card_building/image_copy_6.webp', title: 'OUANTUM Landmark 07' },
  { id: 'cb-8', src: '/assets/images/buildings/card_building/image_copy_7.webp', title: 'OUANTUM Landmark 08' },
  { id: 'cb-9', src: '/assets/images/buildings/card_building/image_copy_8.webp', title: 'OUANTUM Landmark 09' },
  { id: 'cb-10', src: '/assets/images/buildings/card_building/image_copy_9.webp', title: 'OUANTUM Landmark 10' },
  { id: 'cb-11', src: '/assets/images/buildings/card_building/image_copy_10.webp', title: 'OUANTUM Landmark 11' },
  { id: 'cb-12', src: '/assets/images/buildings/card_building/image_copy_11.webp', title: 'OUANTUM Landmark 12' },
  { id: 'cb-13', src: '/assets/images/buildings/card_building/image_copy_12.webp', title: 'OUANTUM Landmark 13' },
  { id: 'cb-14', src: '/assets/images/buildings/card_building/image_copy_13.webp', title: 'OUANTUM Landmark 14' },
  { id: 'cb-15', src: '/assets/images/buildings/card_building/image_copy_14.webp', title: 'OUANTUM Landmark 15' },
];

// 15 Architectural Landmark images from sub-buildings (strictly for Right Stream)
// Featuring image copy 2 through image copy 12 as requested, plus structural landmarks 1-4
const SUB_BUILDINGS = [
  { id: 'sb-c2', src: '/assets/images/buildings/sub-buildings/image_copy_2.webp', title: 'OUANTUM Structural Copy 02' },
  { id: 'sb-c3', src: '/assets/images/buildings/sub-buildings/image_copy_3.webp', title: 'OUANTUM Structural Copy 03' },
  { id: 'sb-c4', src: '/assets/images/buildings/sub-buildings/image_copy_4.webp', title: 'OUANTUM Structural Copy 04' },
  { id: 'sb-c5', src: '/assets/images/buildings/sub-buildings/image_copy_5.webp', title: 'OUANTUM Structural Copy 05' },
  { id: 'sb-c6', src: '/assets/images/buildings/sub-buildings/image_copy_6.webp', title: 'OUANTUM Structural Copy 06' },
  { id: 'sb-c7', src: '/assets/images/buildings/sub-buildings/image_copy_7.webp', title: 'OUANTUM Structural Copy 07' },
  { id: 'sb-c8', src: '/assets/images/buildings/sub-buildings/image_copy_8.webp', title: 'OUANTUM Structural Copy 08' },
  { id: 'sb-c9', src: '/assets/images/buildings/sub-buildings/image_copy_9.webp', title: 'OUANTUM Structural Copy 09' },
  { id: 'sb-c10', src: '/assets/images/buildings/sub-buildings/image_copy_10.webp', title: 'OUANTUM Structural Copy 10' },
  { id: 'sb-c11', src: '/assets/images/buildings/sub-buildings/image_copy_11.webp', title: 'OUANTUM Structural Copy 11' },
  { id: 'sb-c12', src: '/assets/images/buildings/sub-buildings/image_copy_12.webp', title: 'OUANTUM Structural Copy 12' },
  { id: 'sb-1', src: '/assets/images/buildings/sub-buildings/sub-building-1.webp', title: 'OUANTUM Structural 01' },
  { id: 'sb-2', src: '/assets/images/buildings/sub-buildings/sub-building-2.webp', title: 'OUANTUM Structural 02' },
  { id: 'sb-3', src: '/assets/images/buildings/sub-buildings/sub-building-3.webp', title: 'OUANTUM Structural 03' },
  { id: 'sb-4', src: '/assets/images/buildings/sub-buildings/sub-building-4.webp', title: 'OUANTUM Structural 04' },
];

// 15 unique images strictly for Left Stream (repeated to 30 items for seamless continuous infinite loop)
const LEFT_BASE = CARD_BUILDINGS;
const LEFT_STREAM_CARDS = [...LEFT_BASE, ...LEFT_BASE];

// 15 completely different unique images for Right Stream (zero duplicate images across left and right)
const RIGHT_BASE = SUB_BUILDINGS;
const RIGHT_STREAM_CARDS = [...RIGHT_BASE, ...RIGHT_BASE];

// Configurable Speed Parameter: Increase this number to speed up the entire marquee
export const DEFAULT_MARQUEE_SPEED = 1.8;

export interface IntercomHeroProps {
  /**
   * Speed multiplier for the entire marquee.
   * Default: 1.8. Increase (e.g. 2.5, 3.0, 4.0) to speed up the marquee,
   * or decrease for slower movement.
   */
  speed?: number;
}

// Helper to detect if user is on a low/slow network connection
const checkIsLowNetwork = (): boolean => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  // Strictly offline
  if ('onLine' in navigator && !navigator.onLine) return true;
  const nav = navigator as any;
  const conn = nav.connection || nav.mozConnection || nav.webkitConnection;
  if (conn) {
    // User explicitly enabled Data Saver on mobile
    if (conn.saveData === true) return true;
    // Explicit slow-2g cellular network only
    if (conn.effectiveType === 'slow-2g') return true;
  }
  return false;
};

const IntercomHero: React.FC<IntercomHeroProps> = ({ speed = DEFAULT_MARQUEE_SPEED }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const leftCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rightCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const animFrameRef = useRef<number>(0);
  const offsetRef = useRef<number>(0);
  const speedRef = useRef<number>(speed);
  speedRef.current = speed;
  const isDraggingRef = useRef<boolean>(false);
  const dragStartXRef = useRef<number>(0);
  const dragStartOffsetRef = useRef<number>(0);
  const velocityRef = useRef<number>(0);
  const lastDragTimeRef = useRef<number>(0);
  const lastDragXRef = useRef<number>(0);
  const isHoveredRef = useRef<boolean>(false);
  const isLowNetworkRef = useRef<boolean>(false);

  const [promptValue, setPromptValue] = useState('');

  // 60fps render loop: Center-origin split divergence marquee
  // Left cards move outward to the LEFT; Right cards move outward to the RIGHT
  const updateCardTransforms = useCallback(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const containerWidth = container.clientWidth || window.innerWidth;
    const isMobile = containerWidth < 768;

    // Card dimensions proportionally calibrated for mobile while preserving the exact desktop look and center alignment
    const cardWidth = isMobile ? 150 : 220;
    const cardHeight = isMobile ? 210 : 310;

    // Pitch: tightly overlapping cards (shingled stack) ensuring zero gaps and solid physical emergence
    // On mobile, pitch = 28 maintains dense shingling so center cards overlap continuously (>= 52px overlap) without any gap opening
    const pitch = isMobile ? 28 : 68;
    const totalLength = LEFT_STREAM_CARDS.length * pitch;
    const centerX = containerWidth / 2;
    // halfW controls the curvature radius: on mobile it scales proportionally to mobile viewport half-width
    const halfW = isMobile ? Math.max(containerWidth / 2, 175) : Math.max(containerWidth / 2, 400);

    // Inertia & Auto-scroll update: when network is low, do not advance motion (display statically)
    if (!isDraggingRef.current) {
      if (Math.abs(velocityRef.current) > 0.05) {
        offsetRef.current += velocityRef.current;
        velocityRef.current *= 0.95; // Friction decay
      } else if (!isLowNetworkRef.current) {
        // Continuous outward marquee flow powered by speed parameter
        const currentSpeed = speedRef.current;
        const baseSpeed = (isHoveredRef.current ? 0.45 : 1.1) * currentSpeed;
        offsetRef.current += baseSpeed;
      }
    }

    const currentOffset = ((offsetRef.current % totalLength) + totalLength) % totalLength;

    // ── 1. UPDATE LEFT STREAM (Cards emerge at center and move LEFT) ──
    for (let i = 0; i < LEFT_STREAM_CARDS.length; i++) {
      const card = leftCardRefs.current[i];
      if (!card) continue;

      // Distance from center along the left track (starts at 0 so card is in center before split)
      const dist = (i * pitch + currentOffset) % totalLength;
      // Position to the left of center (negative X)
      const x = -dist;

      const u = x / halfW; // negative value (0 at center, -1.0 at left screen edge)
      const absU = Math.min(Math.abs(u), 1.8);

      // Culling cards only when far off screen so full card is always seen at edges
      if (absU > 1.65) {
        card.style.display = 'none';
        continue;
      }
      card.style.display = 'block';

      // 3D Concave Cylinder Arc Math:
      // Center cards recede (-200px), side cards come forward (+60px)
      const z = -200 * (1 - Math.pow(Math.min(absU, 1.4), 1.3));

      // Center cards scale smoothly
      const scale = (isMobile ? 0.72 : 0.64) + (isMobile ? 0.40 : 0.48) * Math.pow(Math.min(absU, 1.4), 1.4);

      // Rotation around Y-axis (facing inwards towards center: positive for left side)
      const clampedU = Math.max(-1.3, Math.min(1.3, u));
      const rotateY = -clampedU * (isMobile ? 32 : 34);

      // Parabolic vertical dip in center
      const y = -Math.pow(Math.min(absU, 1.4), 1.8) * (isMobile ? 8 : 12);

      // Layering: outer foreground cards layer on top of center recessed cards (zIndex >= 2)
      const zIndex = Math.round(absU * 100) + 2;

      // 100% SOLID at center: instant, solid, zero transparent-to-solid fading
      // Fade out only at the far outer horizon when exiting the viewport
      const opacity = Math.max(0, Math.min(1, 1 - (absU - 1.45) * 4));

      const screenX = centerX + x - cardWidth / 2;

      card.style.width = `${cardWidth}px`;
      card.style.height = `${cardHeight}px`;
      card.style.transform = `translate3d(${screenX}px, calc(-50% + ${y}px), ${z}px) rotateY(${rotateY}deg) scale(${scale})`;
      card.style.zIndex = `${zIndex}`;
      card.style.opacity = `${opacity}`;
    }

    // ── 2. UPDATE RIGHT STREAM (Cards emerge at center and move RIGHT) ──
    for (let j = 0; j < RIGHT_STREAM_CARDS.length; j++) {
      const card = rightCardRefs.current[j];
      if (!card) continue;

      // Distance from center along the right track (starts at 0 so card is in center before split)
      const dist = (j * pitch + currentOffset) % totalLength;
      // Position to the right of center (positive X)
      const x = dist;

      const u = x / halfW; // positive value (0 at center, +1.0 at right screen edge)
      const absU = Math.min(Math.abs(u), 1.8);

      if (absU > 1.65) {
        card.style.display = 'none';
        continue;
      }
      card.style.display = 'block';

      // 3D Concave Cylinder Arc Math:
      const z = -200 * (1 - Math.pow(Math.min(absU, 1.4), 1.3));
      const scale = (isMobile ? 0.72 : 0.64) + (isMobile ? 0.40 : 0.48) * Math.pow(Math.min(absU, 1.4), 1.4);

      // Rotation around Y-axis (facing inwards towards center: negative for right side)
      const clampedU = Math.max(-1.3, Math.min(1.3, u));
      const rotateY = -clampedU * (isMobile ? 32 : 34);

      const y = -Math.pow(Math.min(absU, 1.4), 1.8) * (isMobile ? 8 : 12);
      // zIndex + 1 on right stream eliminates 3D z-fighting when center cards overlap
      const zIndex = Math.round(absU * 100) + 3;

      // 100% SOLID at center: instant, solid, zero transparent-to-solid fading
      // Fade out only at the far outer horizon when exiting the viewport
      const opacity = Math.max(0, Math.min(1, 1 - (absU - 1.45) * 4));

      const screenX = centerX + x - cardWidth / 2;

      card.style.width = `${cardWidth}px`;
      card.style.height = `${cardHeight}px`;
      card.style.transform = `translate3d(${screenX}px, calc(-50% + ${y}px), ${z}px) rotateY(${rotateY}deg) scale(${scale})`;
      card.style.zIndex = `${zIndex}`;
      card.style.opacity = `${opacity}`;
    }

    // Keep animation loop running smoothly at the exact original motion speed
    animFrameRef.current = requestAnimationFrame(updateCardTransforms);
  }, []);

  useEffect(() => {
    isLowNetworkRef.current = checkIsLowNetwork();
    animFrameRef.current = requestAnimationFrame(updateCardTransforms);

    const updateNetworkStatus = () => {
      const wasLow = isLowNetworkRef.current;
      const isLow = checkIsLowNetwork();
      isLowNetworkRef.current = isLow;

      // Resume motion if network condition improves from low to normal
      if (wasLow && !isLow) {
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = requestAnimationFrame(updateCardTransforms);
      }
    };

    const handleResize = () => {
      updateCardTransforms();
    };

    const nav = typeof navigator !== 'undefined' ? (navigator as any) : null;
    const conn = nav ? nav.connection || nav.mozConnection || nav.webkitConnection : null;

    if (conn && typeof conn.addEventListener === 'function') {
      conn.addEventListener('change', updateNetworkStatus);
    }
    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);
    window.addEventListener('resize', handleResize);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (conn && typeof conn.removeEventListener === 'function') {
        conn.removeEventListener('change', updateNetworkStatus);
      }
      window.removeEventListener('online', updateNetworkStatus);
      window.removeEventListener('offline', updateNetworkStatus);
      window.removeEventListener('resize', handleResize);
    };
  }, [updateCardTransforms]);

  // Pointer drag event handlers for interactive ribbon spinning
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartOffsetRef.current = offsetRef.current;
    lastDragXRef.current = e.clientX;
    lastDragTimeRef.current = performance.now();
    velocityRef.current = 0;
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grabbing';
    }
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(updateCardTransforms);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const now = performance.now();
    const dt = now - lastDragTimeRef.current;
    const dx = e.clientX - lastDragXRef.current;

    if (dt > 0) {
      velocityRef.current = dx * 0.6;
    }

    lastDragXRef.current = e.clientX;
    lastDragTimeRef.current = now;

    const totalDx = e.clientX - dragStartXRef.current;
    offsetRef.current = dragStartOffsetRef.current + totalDx;
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
    }
  };

  return (
    <section
      className="ic-hero-section"
      style={{
        position: 'relative',
        minHeight: 'unset',
        padding: '10px 0 18px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: '#ffffff', // Pure white per instruction
        backgroundImage: 'none',     // No background color change
      }}
    >
      {/* ── TOP HEADLINE (Exact 2-Line Hero Title from Reference) ── */}
      <div
        className="ic-hero-headline-wrap"
        style={{
          maxWidth: '960px',
          margin: '0 auto -16px',
          textAlign: 'center',
          padding: '0 20px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <h1
          style={{
            fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            fontSize: 'clamp(2.4rem, 5.2vw, 4.25rem)',
            fontWeight: 400,
            color: '#111111',
            lineHeight: 1.08,
            letterSpacing: '-0.025em',
            margin: 0,
            textAlign: 'center',
          }}
        >
          One platform.
          <br />
          Every infrastructure outcome.
        </h1>
      </div>

      {/* ── 3D SPLIT CONCAVE CYLINDER MARQUEE (Center outward divergence) ── */}
      {/* Ample 385px height so end cards are never clipped at top/bottom */}
      <div
        ref={containerRef}
        className="ic-hero-marquee-container"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onMouseEnter={() => {
          isHoveredRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
        }}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '100vw',
          height: '385px',
          perspective: '1200px',
          perspectiveOrigin: '50% 50%',
          transformStyle: 'preserve-3d',
          overflow: 'visible', // Never cut off full card view at top/bottom
          cursor: 'grab',
          userSelect: 'none',
          touchAction: 'pan-y',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Left Stream Cards (Flowing from Center to LEFT) */}
        {LEFT_STREAM_CARDS.map((item, idx) => (
          <div
            key={`left-${item.id}-${idx}`}
            className="ic-hero-card-item"
            ref={(el) => {
              leftCardRefs.current[idx] = el;
            }}
            style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              width: '220px',
              height: '310px',
              borderRadius: 0, // Sharp corners per instruction
              overflow: 'hidden',
              backgroundColor: '#ffffff',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.12)',
              border: 'none', // Strictly no border/stroke per instruction
              outline: 'none',
              willChange: 'transform, opacity',
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
              pointerEvents: 'none',
            }}
          >
            <img
              src={item.src}
              alt={item.title}
              loading={idx < 6 ? 'eager' : 'lazy'}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block',
                border: 'none',
                outline: 'none',
              }}
            />
          </div>
        ))}

        {/* Right Stream Cards (Flowing from Center to RIGHT) */}
        {RIGHT_STREAM_CARDS.map((item, idx) => (
          <div
            key={`right-${item.id}-${idx}`}
            className="ic-hero-card-item"
            ref={(el) => {
              rightCardRefs.current[idx] = el;
            }}
            style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              width: '220px',
              height: '310px',
              borderRadius: 0, // Sharp corners per instruction
              overflow: 'hidden',
              backgroundColor: '#ffffff',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.12)',
              border: 'none', // Strictly no border/stroke per instruction
              outline: 'none',
              willChange: 'transform, opacity',
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
              pointerEvents: 'none',
            }}
          >
            <img
              src={item.src}
              alt={item.title}
              loading={idx < 6 ? 'eager' : 'lazy'}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block',
                border: 'none',
                outline: 'none',
              }}
            />
          </div>
        ))}
      </div>

      {/* ── EDITORIAL SUBTITLE (Tucked tightly beneath the 3D Marquee) ── */}
      <div
        className="ic-hero-subtitle-wrap"
        style={{
          maxWidth: '680px',
          margin: '-38px auto 14px', // Pulls subtitle up to eliminate bottom marquee gap
          textAlign: 'center',
          padding: '0 24px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <p
          style={{
            fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            fontSize: 'clamp(0.95rem, 1.2vw, 1.075rem)',
            fontWeight: 400,
            color: '#4a5565',
            lineHeight: 1.55,
            margin: 0,
            textAlign: 'center',
          }}
        >
          Be the chief engineer. Let AI agents empower your site. Brief our autonomous copilot OX1,
          inspect live structural telemetry, and verify codal compliance until every bridge and tunnel
          meets zero-compromise precision.
        </p>
      </div>

      {/* ── INTERACTIVE PROMPT PILL (The Floating Capsule from Reference) ── */}
      <div
        className="ic-hero-prompt-wrap"
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '430px',
          padding: '0 16px',
          marginBottom: '18px',
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (promptValue.trim()) {
              window.location.href = `/products/ox1?prompt=${encodeURIComponent(promptValue.trim())}`;
            }
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#1b1b1d', // Dark floating pill
            borderRadius: '9999px',
            padding: '7px 8px 7px 18px',
            boxShadow: '0 18px 40px rgba(0, 0, 0, 0.28), 0 4px 12px rgba(0, 0, 0, 0.15)',
            transition: 'box-shadow 0.2s ease, transform 0.2s ease',
          }}
        >
          {/* Infinity Symbol on Left */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#8e8e93',
              marginRight: '12px',
              flexShrink: 0,
            }}
            aria-hidden="true"
          >
            <InfinityIcon size={18} strokeWidth={2.2} />
          </div>

          {/* Prompt Input Box */}
          <input
            type="text"
            value={promptValue}
            onChange={(e) => setPromptValue(e.target.value)}
            placeholder="Brief OX1 on structural testing, ITP, or codal verification..."
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#f5f5f7',
              fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              fontSize: '0.875rem',
              fontWeight: 400,
              padding: '6px 4px',
              minWidth: 0,
            }}
          />

          {/* Plus Action Button on Right */}
          <button
            type="submit"
            aria-label="Submit prompt to OX1"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#2c2c2e',
              border: 'none',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
              marginLeft: '8px',
              transition: 'background-color 0.18s ease, transform 0.18s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#3a3a3c';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#2c2c2e';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <Plus size={16} strokeWidth={2.4} />
          </button>
        </form>
      </div>

      {/* ── CALL TO ACTION BUTTONS ── */}
      <div
        className="ic-hero-btn-wrap"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          flexWrap: 'wrap',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <Link
          to="/contact"
          className="ic-btn ic-btn-primary"
          style={{
            fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            fontWeight: 500,
            fontSize: '0.925rem',
            padding: '11px 22px',
            borderRadius: '9999px',
            backgroundColor: '#111111',
            color: '#ffffff',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'background-color 0.18s ease, transform 0.18s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#222222';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#111111';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          Deploy OX1 Intelligence
          <ArrowRight size={15} />
        </Link>
        <Link
          to="/products/estimator"
          className="ic-btn ic-btn-secondary"
          style={{
            fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            fontWeight: 500,
            fontSize: '0.925rem',
            padding: '11px 22px',
            borderRadius: '9999px',
            backgroundColor: '#f3f4f6',
            color: '#111111',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            transition: 'background-color 0.18s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#e5e7eb';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#f3f4f6';
          }}
        >
          View Live Demo
        </Link>
      </div>
    </section>
  );
};

export default IntercomHero;
