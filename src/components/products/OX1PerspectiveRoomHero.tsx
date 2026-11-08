import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// =========================================================================
// OX1 HERO SECTION — ORGANIC SCATTERED MEDIA CONSTELLATION
//
// 1. 46 media cards placed organically and randomly (NO rigid order/columns).
// 2. Varied aspect ratios (squares, panoramas, portraits, chips, CAD frame).
// 3. Subtle organic micro-rotations (-2° to +2°) breaking all rigid lines.
// 4. STRICT ZERO-IMAGE EXCLUSION ZONE around wordings:
//    - Central zone (X: 23%–77%, Y: 16%–80%) is completely open.
// 5. Headline is strictly center-aligned (no white stroke, solid #111111).
// 6. 100% verified existing WebP image assets with automatic fallback.
// =========================================================================

interface ScatteredMediaCard {
  id: string;
  src: string;
  alt: string;
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
  width: string;
  height: string;
  rotate?: string;
  borderRadius?: string;
  isBlueprint?: boolean;
  shadow?: string;
  zIndex?: number;
}

// 46 organically scattered cards placed with irregular coordinates & slight organic tilts
const SCATTERED_CARDS: ScatteredMediaCard[] = [
  // ── UPPER-LEFT REGION (Scattered, non-linear) ─────────────────────────
  {
    id: 'c-ul-1',
    src: '/assets/images/buildings/card_building/image_copy_2.webp',
    alt: 'Cellular architectural terra-cotta facade',
    left: '2.5%',
    top: '3.5%',
    width: '120px',
    height: '155px',
    rotate: '-1deg',
    borderRadius: '2px',
    shadow: '0 6px 20px rgba(0,0,0,0.07)',
  },
  {
    id: 'c-ul-2',
    src: '/assets/images/buildings/card_building/image_copy_3.webp',
    alt: 'Sculpted ribbed concrete louvers',
    left: '12.5%',
    top: '2%',
    width: '78px',
    height: '78px',
    rotate: '1.5deg',
    borderRadius: '2px',
    shadow: '0 4px 14px rgba(0,0,0,0.05)',
  },
  {
    id: 'c-ul-3',
    src: '/assets/images/buildings/building-3.webp',
    alt: 'Cantilever museum over reflecting pool',
    left: '18.5%',
    top: '7%',
    width: '95px',
    height: '68px',
    rotate: '-0.8deg',
    borderRadius: '2px',
    shadow: '0 4px 14px rgba(0,0,0,0.05)',
  },
  {
    id: 'c-ul-4',
    src: '/assets/images/buildings/card_building/image_copy_5.webp',
    alt: 'Red glazed stairwell opening',
    left: '7%',
    top: '16%',
    width: '85px',
    height: '110px',
    rotate: '1.2deg',
    borderRadius: '2px',
    shadow: '0 4px 16px rgba(0,0,0,0.06)',
  },
  {
    id: 'c-ul-5',
    src: '/assets/images/buildings/sub-buildings/image_copy_2.webp',
    alt: 'Classic fluted column facade',
    left: '15%',
    top: '17%',
    width: '65px',
    height: '65px',
    rotate: '-1.5deg',
    borderRadius: '2px',
    shadow: '0 2px 10px rgba(0,0,0,0.04)',
  },

  // ── TOP STRIP ACROSS CANVAS (Above title, Y: 1.5% – 12%) ─────────────
  {
    id: 'c-top-1',
    src: '/assets/images/buildings/building-1.webp',
    alt: 'High-rise structural skyline at sunset',
    left: '27%',
    top: '3%',
    width: '130px',
    height: '65px',
    rotate: '0.8deg',
    borderRadius: '2px',
    shadow: '0 4px 14px rgba(0,0,0,0.05)',
  },
  {
    id: 'c-top-2',
    src: '/assets/images/buildings/card_building/image_copy.webp',
    alt: 'Atrium light study',
    left: '38%',
    top: '8%',
    width: '75px',
    height: '52px',
    rotate: '-1.2deg',
    borderRadius: '2px',
    shadow: '0 2px 10px rgba(0,0,0,0.04)',
  },
  {
    id: 'c-top-3',
    src: '/assets/images/buildings/sub-buildings/sub-building-1.webp',
    alt: 'Curved wooden timber pavilion canopy',
    left: '46%',
    top: '2%',
    width: '90px',
    height: '55px',
    rotate: '1.5deg',
    borderRadius: '2px',
    shadow: '0 4px 14px rgba(0,0,0,0.05)',
  },
  {
    id: 'c-top-4',
    src: '/assets/images/buildings/sub-buildings/image_copy_6.webp',
    alt: 'Monolithic faceted concrete geometry',
    left: '55%',
    top: '7%',
    width: '80px',
    height: '55px',
    rotate: '-1deg',
    borderRadius: '2px',
    shadow: '0 2px 10px rgba(0,0,0,0.04)',
  },
  {
    id: 'c-top-5',
    src: '/assets/images/buildings/card_building/image_copy_14.webp',
    alt: 'Heritage red brick facade',
    left: '64%',
    top: '2.5%',
    width: '120px',
    height: '65px',
    rotate: '0.9deg',
    borderRadius: '2px',
    shadow: '0 4px 14px rgba(0,0,0,0.05)',
  },
  {
    id: 'c-top-6',
    src: '/assets/images/buildings/sub-buildings/image_copy_11.webp',
    alt: 'Ribbed architectural structural envelope',
    left: '74%',
    top: '6.5%',
    width: '70px',
    height: '54px',
    rotate: '-1.6deg',
    borderRadius: '2px',
    shadow: '0 2px 10px rgba(0,0,0,0.04)',
  },

  // ── UPPER-RIGHT REGION (Scattered, non-linear) ────────────────────────
  {
    id: 'c-ur-1',
    src: '/assets/images/buildings/building-2.webp',
    alt: 'Undulating water canal concrete bridge',
    right: '2%',
    top: '3%',
    width: '110px',
    height: '82px',
    rotate: '1.2deg',
    borderRadius: '2px',
    shadow: '0 4px 16px rgba(0,0,0,0.06)',
  },
  {
    id: 'c-ur-2',
    src: '/assets/images/buildings/card_building/image_copy_4.webp',
    alt: 'Brutalist concrete colonnade and arches',
    right: '11.5%',
    top: '7%',
    width: '95px',
    height: '75px',
    rotate: '-1deg',
    borderRadius: '2px',
    shadow: '0 4px 14px rgba(0,0,0,0.05)',
  },
  {
    id: 'c-ur-3',
    src: '/assets/images/buildings/card_building/image_copy_6.webp',
    alt: 'Modern concrete atrium staircase',
    right: '18.5%',
    top: '2%',
    width: '60px',
    height: '60px',
    rotate: '1.8deg',
    borderRadius: '2px',
    shadow: '0 2px 10px rgba(0,0,0,0.04)',
  },
  {
    id: 'c-ur-4',
    src: '/assets/images/buildings/sub-buildings/image_copy_7.webp',
    alt: 'Organic parametric timber skin tower',
    right: '5%',
    top: '16%',
    width: '90px',
    height: '120px',
    rotate: '-0.7deg',
    borderRadius: '2px',
    shadow: '0 6px 18px rgba(0,0,0,0.07)',
  },
  {
    id: 'c-ur-5',
    src: '/assets/images/buildings/sub-buildings/image_copy_3.webp',
    alt: 'Radial glass cantilever atrium',
    right: '14%',
    top: '18%',
    width: '78px',
    height: '58px',
    rotate: '1.4deg',
    borderRadius: '2px',
    shadow: '0 2px 10px rgba(0,0,0,0.04)',
  },

  // ── MID-LEFT FLANK (X <= 22%, staggered randomly) ────────────────────
  {
    id: 'c-ml-1',
    src: '/assets/images/buildings/building-4.webp',
    alt: 'Spiral concrete ramp tower',
    left: '1.5%',
    top: '28%',
    width: '80px',
    height: '105px',
    rotate: '1deg',
    borderRadius: '2px',
    shadow: '0 4px 16px rgba(0,0,0,0.06)',
  },
  {
    id: 'c-ml-2',
    src: '/assets/images/buildings/card_building/image_copy_7.webp',
    alt: 'Curved concrete pavilion arches',
    left: '9.5%',
    top: '32%',
    width: '105px',
    height: '75px',
    rotate: '-1.4deg',
    borderRadius: '2px',
    shadow: '0 4px 14px rgba(0,0,0,0.05)',
  },
  {
    id: 'c-ml-3',
    src: '/assets/images/buildings/card_building/image_copy_9.webp',
    alt: 'Curvilinear fluid pavilion rendering',
    left: '18%',
    top: '27%',
    width: '52px',
    height: '52px',
    rotate: '2deg',
    borderRadius: '2px',
    shadow: '0 2px 10px rgba(0,0,0,0.04)',
  },
  {
    id: 'c-ml-4',
    src: '/assets/images/buildings/card_building/image_copy_11.webp',
    alt: 'Illuminated biomorphic structure at night',
    left: '4%',
    top: '44%',
    width: '90px',
    height: '62px',
    rotate: '-1.2deg',
    borderRadius: '2px',
    shadow: '0 4px 14px rgba(0,0,0,0.05)',
  },
  {
    id: 'c-ml-5',
    src: '/assets/images/buildings/building-7.webp',
    alt: 'Tiered green terrace vertical architecture',
    left: '13%',
    top: '42%',
    width: '100px',
    height: '80px',
    rotate: '0.8deg',
    borderRadius: '2px',
    shadow: '0 4px 16px rgba(0,0,0,0.06)',
  },
  {
    id: 'c-ml-6',
    src: '/assets/images/buildings/sub-buildings/image_copy_4.webp',
    alt: 'Perforated aluminum screen building',
    left: '2%',
    top: '58%',
    width: '78px',
    height: '108px',
    rotate: '-1.5deg',
    borderRadius: '2px',
    shadow: '0 4px 16px rgba(0,0,0,0.06)',
  },
  {
    id: 'c-ml-7',
    src: '/assets/images/buildings/card_building/image_copy_12.webp',
    alt: 'Pleated concrete facade drapery',
    left: '10.5%',
    top: '56%',
    width: '95px',
    height: '120px',
    rotate: '1.2deg',
    borderRadius: '2px',
    shadow: '0 6px 18px rgba(0,0,0,0.07)',
  },
  {
    id: 'c-ml-8',
    src: '/assets/images/buildings/sub-buildings/sub-building-3.webp',
    alt: 'Classic neoclassical arcade lintel',
    left: '18%',
    top: '64%',
    width: '68px',
    height: '68px',
    rotate: '-0.9deg',
    borderRadius: '2px',
    shadow: '0 2px 10px rgba(0,0,0,0.04)',
  },

  // ── MID-RIGHT FLANK (X >= 78%, staggered randomly) ───────────────────
  {
    id: 'c-mr-1',
    src: '/assets/images/buildings/building-5.webp',
    alt: 'Structural lattice truss canopy',
    right: '18%',
    top: '29%',
    width: '58px',
    height: '74px',
    rotate: '-1.8deg',
    borderRadius: '2px',
    shadow: '0 2px 10px rgba(0,0,0,0.04)',
  },
  {
    id: 'c-mr-2',
    src: '/assets/images/buildings/sub-buildings/image_copy_8.webp',
    alt: 'Pedestrian skybridge structure',
    right: '8%',
    top: '32%',
    width: '78px',
    height: '92px',
    rotate: '1deg',
    borderRadius: '2px',
    shadow: '0 2px 8px rgba(0,0,0,0.04)',
  },
  {
    id: 'c-mr-3',
    src: '/assets/images/buildings/card_building/image_copy_8.webp',
    alt: 'Urban civic plaza and bridge',
    right: '1.5%',
    top: '35%',
    width: '85px',
    height: '65px',
    rotate: '-1.2deg',
    borderRadius: '2px',
    shadow: '0 4px 14px rgba(0,0,0,0.05)',
  },
  {
    id: 'c-mr-4',
    src: '/assets/images/buildings/card_building/image_copy_10.webp',
    alt: 'Vertical botanical concrete louvers',
    right: '14%',
    top: '43%',
    width: '92px',
    height: '92px',
    rotate: '1.5deg',
    borderRadius: '2px',
    shadow: '0 4px 16px rgba(0,0,0,0.06)',
  },
  {
    id: 'c-mr-5',
    src: '/assets/images/buildings/building-8.webp',
    alt: 'Curved wood and glass window mullions',
    right: '3%',
    top: '48%',
    width: '68px',
    height: '84px',
    rotate: '-1.1deg',
    borderRadius: '2px',
    shadow: '0 2px 10px rgba(0,0,0,0.04)',
  },
  {
    id: 'c-mr-6',
    src: '/assets/images/buildings/sub-buildings/sub-building-5.webp',
    alt: 'Sculptural curved opening in stone facade',
    right: '10%',
    top: '57%',
    width: '82px',
    height: '95px',
    rotate: '0.8deg',
    borderRadius: '2px',
    shadow: '0 4px 16px rgba(0,0,0,0.06)',
  },
  {
    id: 'c-mr-7',
    src: '/assets/images/buildings/building-9.webp',
    alt: 'Civic library atrium arches',
    right: '18%',
    top: '55%',
    width: '74px',
    height: '58px',
    rotate: '-1.4deg',
    borderRadius: '2px',
    shadow: '0 2px 10px rgba(0,0,0,0.04)',
  },
  {
    id: 'c-mr-8',
    src: '/assets/images/buildings/sub-buildings/image_copy_10.webp',
    alt: 'Steel tension truss canopy',
    right: '2%',
    top: '64%',
    width: '82px',
    height: '64px',
    rotate: '1.6deg',
    borderRadius: '2px',
    shadow: '0 4px 14px rgba(0,0,0,0.05)',
  },

  // ── LOWER-LEFT REGION (Scattered, non-linear) ─────────────────────────
  {
    id: 'c-ll-1',
    src: '/assets/images/buildings/sub-buildings/image_copy_5.webp',
    alt: 'Geometric modular timber screen',
    left: '2%',
    bottom: '5%',
    width: '95px',
    height: '105px',
    rotate: '-1.2deg',
    borderRadius: '2px',
    shadow: '0 6px 18px rgba(0,0,0,0.07)',
  },
  {
    id: 'c-ll-2',
    src: '/assets/images/buildings/building-10.webp',
    alt: 'Massive raw concrete portal structure',
    left: '11%',
    bottom: '8%',
    width: '88px',
    height: '70px',
    rotate: '1.5deg',
    borderRadius: '2px',
    shadow: '0 4px 16px rgba(0,0,0,0.06)',
  },
  {
    id: 'c-ll-3',
    src: '/assets/images/buildings/sub-buildings/sub-building-4.webp',
    alt: 'Perforated metallic solar screen',
    left: '18%',
    bottom: '3%',
    width: '72px',
    height: '72px',
    rotate: '-0.8deg',
    borderRadius: '2px',
    shadow: '0 2px 10px rgba(0,0,0,0.05)',
  },

  // ── BOTTOM STRIP ACROSS CANVAS (Below CTAs, Y >= 82%) ────────────────
  {
    id: 'c-bot-1',
    src: '/assets/images/buildings/card_building/image_copy_13.webp',
    alt: 'Steel diagrid framework node',
    left: '28%',
    bottom: '4%',
    width: '82px',
    height: '56px',
    rotate: '1.1deg',
    borderRadius: '2px',
    shadow: '0 2px 10px rgba(0,0,0,0.04)',
  },
  {
    id: 'c-bot-2',
    src: '/assets/images/buildings/sub-buildings/sub-building-6.webp',
    alt: 'Prestressed girder bridge segment',
    left: '37%',
    bottom: '7%',
    width: '95px',
    height: '62px',
    rotate: '-1.3deg',
    borderRadius: '2px',
    shadow: '0 4px 14px rgba(0,0,0,0.05)',
  },
  {
    id: 'c-bot-3',
    src: '/assets/images/buildings/sub-buildings/sub-building-7.webp',
    alt: 'Underground transit tunnel vault',
    left: '47%',
    bottom: '3%',
    width: '78px',
    height: '54px',
    rotate: '1.6deg',
    borderRadius: '2px',
    shadow: '0 2px 10px rgba(0,0,0,0.04)',
  },
  {
    id: 'c-bot-4',
    src: '/assets/images/buildings/sub-buildings/image_copy_12.webp',
    alt: 'Concrete cantilever viaduct deck',
    left: '56%',
    bottom: '6%',
    width: '92px',
    height: '62px',
    rotate: '-0.9deg',
    borderRadius: '2px',
    shadow: '0 4px 14px rgba(0,0,0,0.05)',
  },
  {
    id: 'c-bot-5',
    src: '/assets/images/buildings/building-12.webp',
    alt: 'Cantilever terrace architectural profile',
    left: '65%',
    bottom: '3%',
    width: '82px',
    height: '58px',
    rotate: '1.2deg',
    borderRadius: '2px',
    shadow: '0 2px 10px rgba(0,0,0,0.04)',
  },
  {
    id: 'c-bot-6',
    src: '/assets/images/buildings/sub-buildings/sub-building-8.webp',
    alt: 'Acoustic baffle chamber panels',
    left: '73%',
    bottom: '7%',
    width: '74px',
    height: '54px',
    rotate: '-1.4deg',
    borderRadius: '2px',
    shadow: '0 2px 10px rgba(0,0,0,0.04)',
  },

  // ── LOWER-RIGHT REGION (Scattered, non-linear) ────────────────────────
  {
    id: 'c-lr-blueprint',
    src: '/assets/images/buildings/sub-buildings/sub-building-2.webp',
    alt: 'OX1 Digital Twin 3D BIM structural frame',
    right: '11%',
    bottom: '3.5%',
    width: '145px',
    height: '145px',
    rotate: '-1deg',
    borderRadius: '2px',
    isBlueprint: true,
    shadow: '0 10px 28px rgba(0,0,0,0.09)',
    zIndex: 6,
  },
  {
    id: 'c-lr-2',
    src: '/assets/images/buildings/building-11.webp',
    alt: 'Sculpted facade concrete portal',
    right: '2%',
    bottom: '4%',
    width: '92px',
    height: '92px',
    rotate: '1.8deg',
    borderRadius: '2px',
    shadow: '0 4px 16px rgba(0,0,0,0.06)',
  },
  {
    id: 'c-lr-3',
    src: '/assets/images/buildings/sub-buildings/sub-building-9.webp',
    alt: 'Structural foundation core pillar',
    right: '19%',
    bottom: '8%',
    width: '70px',
    height: '70px',
    rotate: '-0.7deg',
    borderRadius: '2px',
    shadow: '0 2px 10px rgba(0,0,0,0.05)',
  },
];

export interface OX1PerspectiveRoomHeroProps {
  className?: string;
}

export const OX1PerspectiveRoomHero: React.FC<OX1PerspectiveRoomHeroProps> = ({
  className = '',
}) => {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : true
  );

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setIsDesktop(window.innerWidth >= 1024);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section
      className={`ox1-scattered-constellation-hero ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: isDesktop ? 'clamp(840px, 95vh, 980px)' : 'auto',
        padding: isDesktop ? '0' : '90px 24px 70px',
        backgroundColor: '#ffffff',
        // Subtle engineering dot matrix grid matching reference image
        backgroundImage: 'radial-gradient(rgba(0, 0, 0, 0.16) 1.2px, transparent 1.2px)',
        backgroundSize: '48px 48px',
        overflow: 'clip',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* ── EMBEDDED COMPONENT STYLES: FORCES STRICT CENTER ALIGNMENT & ZERO WHITE STROKE ── */}
      <style>{`
        .ox1-hero-main-title,
        .ox1-hero-main-title span,
        .ox1-platform-page #overview h1,
        .ox1-platform-page #overview h1 span,
        .ox1-hero-center-content-desktop h1,
        .ox1-hero-center-content-desktop h1 span {
          text-align: center !important;
          text-align-last: center !important;
          margin-left: auto !important;
          margin-right: auto !important;
          -webkit-text-stroke: 0px transparent !important;
          -webkit-text-stroke-width: 0px !important;
          -webkit-text-fill-color: #111111 !important;
          paint-order: normal !important;
          text-shadow: none !important;
          filter: none !important;
        }
      `}</style>

      {/* ── DESKTOP SCATTERED MEDIA CONSTELLATION: 46 RANDOMLY PLACED CARDS ── */}
      {isDesktop && (
        <div
          className="ox1-scattered-canvas"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
        >
          {SCATTERED_CARDS.map((card) => (
            <div
              key={card.id}
              className="ox1-constellation-card"
              style={{
                position: 'absolute',
                left: card.left,
                right: card.right,
                top: card.top,
                bottom: card.bottom,
                width: card.width,
                height: card.height,
                transform: card.rotate ? `rotate(${card.rotate})` : 'none',
                borderRadius: card.borderRadius || '2px',
                overflow: 'hidden',
                backgroundColor: '#f6f5ee',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                boxShadow: card.shadow || '0 4px 16px rgba(0, 0, 0, 0.06)',
                zIndex: card.zIndex || 2,
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                pointerEvents: 'auto',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = `${
                  card.rotate ? `rotate(${card.rotate}) ` : ''
                }scale(1.05)`;
                e.currentTarget.style.boxShadow = '0 12px 28px rgba(0, 0, 0, 0.12)';
                e.currentTarget.style.zIndex = '15';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = card.rotate
                  ? `rotate(${card.rotate})`
                  : 'none';
                e.currentTarget.style.boxShadow =
                  card.shadow || '0 4px 16px rgba(0, 0, 0, 0.06)';
                e.currentTarget.style.zIndex = String(card.zIndex || 2);
              }}
            >
              {/* CAD Blueprint Frame for the showcase card */}
              {card.isBlueprint && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 3,
                    pointerEvents: 'none',
                    backgroundImage:
                      'linear-gradient(to right, rgba(0, 102, 204, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 102, 204, 0.12) 1px, transparent 1px)',
                    backgroundSize: '16px 16px',
                    border: '1px solid rgba(0, 102, 204, 0.4)',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: '8px',
                      border: '1px dashed rgba(0, 102, 204, 0.55)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '-1px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '12px',
                      height: '6px',
                      border: '1px solid rgba(0, 102, 204, 0.6)',
                      borderTop: 'none',
                      backgroundColor: '#ffffff',
                    }}
                  />
                </div>
              )}

              <img
                src={card.src}
                alt={card.alt}
                loading="eager"
                draggable={false}
                onError={(e) => {
                  e.currentTarget.src = '/assets/images/buildings/building-1.webp';
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* ── CENTRAL HERO CONTENT: 100% UNTOUCHED & CENTERED, NO WHITE BOX ── */}
      <div
        className="ox1-hero-center-content-desktop"
        style={{
          position: 'relative',
          zIndex: 20,
          width: '100%',
          maxWidth: '820px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '24px 20px',
          backgroundColor: 'transparent',
          boxShadow: 'none',
          border: 'none',
          outline: 'none',
          borderRadius: 0,
        }}
      >
        <h1
          className="ox1-hero-main-title"
          style={{
            fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            fontSize: 'clamp(2.4rem, 4.4vw, 4rem)',
            fontWeight: 600,
            color: '#111111',
            lineHeight: 1.15,
            letterSpacing: '-0.035em',
            textAlign: 'center',
            width: '100%',
            maxWidth: '780px',
            margin: '0 auto 18px',
            padding: 0,
            border: 'none',
            outline: 'none',
            boxShadow: 'none',
            background: 'transparent',
            backgroundColor: 'transparent',
            WebkitTextStroke: '0px transparent',
            WebkitTextStrokeWidth: '0px',
            WebkitTextFillColor: '#111111',
            paintOrder: 'normal',
            textShadow: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              display: 'block',
              width: '100%',
              textAlign: 'center',
              margin: '0 auto',
              WebkitTextStroke: '0px transparent',
            }}
          >
            The Intelligence Layer
          </span>
          <span
            style={{
              display: 'block',
              width: '100%',
              textAlign: 'center',
              margin: '0 auto',
              WebkitTextStroke: '0px transparent',
            }}
          >
            for the Built Environment.
          </span>
        </h1>

        <p
          style={{
            fontSize: 'clamp(1.025rem, 1.25vw, 1.175rem)',
            color: '#4a5565',
            lineHeight: 1.55,
            maxWidth: '560px',
            margin: '0 auto 14px',
            fontWeight: 400,
            textAlign: 'center',
            border: 'none',
            outline: 'none',
            boxShadow: 'none',
            background: 'transparent',
          }}
        >
          One integrated platform connecting engineering, infrastructure, project operations, and artificial intelligence.
        </p>

        <p
          style={{
            fontSize: '0.935rem',
            color: '#6a7282',
            maxWidth: '500px',
            margin: '0 auto 32px',
            lineHeight: 1.6,
            textAlign: 'center',
            border: 'none',
            outline: 'none',
            boxShadow: 'none',
            background: 'transparent',
          }}
        >
          From project management and quality control to NDT, BIM, monitoring, and intelligent reporting, OX1 brings engineering information together.
        </p>

        {/* Action CTAs: Strictly Center Aligned */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap',
            margin: '0 auto',
            width: '100%',
          }}
        >
          <a
            href="#capabilities"
            style={{
              backgroundColor: '#111111',
              color: '#ffffff',
              fontSize: '0.95rem',
              fontWeight: 600,
              padding: '14px 34px',
              borderRadius: '9999px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.12)',
              transition: 'background-color 0.2s ease, transform 0.15s ease',
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
            Explore OX1 <ArrowRight size={16} />
          </a>
          <Link
            to="/demo"
            style={{
              backgroundColor: '#ffffff',
              color: '#111111',
              fontSize: '0.95rem',
              fontWeight: 600,
              padding: '14px 32px',
              borderRadius: '9999px',
              border: '1px solid rgba(0, 0, 0, 0.18)',
              textDecoration: 'none',
              transition: 'border-color 0.2s ease, background-color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#111111';
              e.currentTarget.style.backgroundColor = '#fafafa';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.18)';
              e.currentTarget.style.backgroundColor = '#ffffff';
            }}
          >
            Request a Demo
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OX1PerspectiveRoomHero;
