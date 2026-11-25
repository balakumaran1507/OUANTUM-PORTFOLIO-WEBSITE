import React, { useState, useEffect } from 'react';
import useSEO from '../hooks/useSEO';

// Target: October 10, 2026 at 6:00 PM IST
const TARGET_TIMESTAMP = new Date('2026-10-10T18:00:00+05:30').getTime();

// Countdown scale, X-axis offset, Y-axis offset, image brightness, sunlight intensity, and blur
export const COUNTDOWN_CONFIG = {
  scale: 1.02, // Scale factor: 1.0 = 100%, 1.25 = 125%, 0.9 = 90%
  x: 0,       // X-axis position offset in pixels (e.g. 0, 10, -10)
  y: 60,       // Y-axis position offset in pixels (e.g. 0, 10, -10)
  imageBrightness: 1.0, // Background image brightness filter: 1.0 = 100%, 0.8 = 80%, 1.2 = 120%
  sunlightIntensity: 1.0, // Sunlight ray strength: 1.0 = normal, 1.5 = stronger, 0.5 = subtle
  sunlightBlur: 40, // Ray light blur in pixels: higher = softer/blurrier, lower = sharper
};

const countdownScale = COUNTDOWN_CONFIG.scale;
const countdownX = COUNTDOWN_CONFIG.x; // in pixels
const countdownY = COUNTDOWN_CONFIG.y; // in pixels
const imageBrightness = COUNTDOWN_CONFIG.imageBrightness;
const sunlightIntensity = COUNTDOWN_CONFIG.sunlightIntensity;
const sunlightBlur = COUNTDOWN_CONFIG.sunlightBlur ?? 40;

const OX1Countdown: React.FC = () => {
  useSEO({
    title: 'OX1 Countdown | Ouantum',
    description: 'Live countdown to OX1 launch on October 10th at 6:00 PM.',
    canonicalPath: '/ox1-countdown',
  });

  const [timeLeft, setTimeLeft] = useState(() => Math.max(0, TARGET_TIMESTAMP - Date.now()));

  useEffect(() => {
    const updateTime = () => setTimeLeft(Math.max(0, TARGET_TIMESTAMP - Date.now()));
    updateTime();
    const interval = setInterval(updateTime, 500);
    return () => clearInterval(interval);
  }, []);

  const total = Math.max(0, timeLeft);
  const s = Math.floor((total / 1000) % 60);
  const m = Math.floor((total / (1000 * 60)) % 60);
  const h = Math.floor((total / (1000 * 60 * 60)) % 24);
  const d = Math.floor(total / (1000 * 60 * 60 * 24));

  const pad = (num: number, len = 2) => String(num).padStart(len, '0');

  return (
    <main
      style={{
        backgroundColor: '#000000',
        color: '#ffffff',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem',
        overflow: 'hidden',
        position: 'relative',
        userSelect: 'none',
        width: '100%',
        boxSizing: 'border-box',
      }}
      aria-label="OX1 Launch Countdown"
    >
      {/* Background Architectural Image with Brightness Filter */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('/assets/images/logo/image.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          filter: `brightness(${imageBrightness})`,
          transition: 'filter 0.3s ease',
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      {/* Atmospheric Contrast Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.30) 50%, rgba(0, 0, 0, 0.58) 100%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />

      {/* Volumetric Sunlight Ray Effect */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 1,
          opacity: sunlightIntensity,
          mixBlendMode: 'screen',
          overflow: 'hidden',
        }}
        aria-hidden="true"
      >
        {/* Sun source bloom glow */}
        <div
          style={{
            position: 'absolute',
            top: '-12%',
            left: '36%',
            width: '60vw',
            height: '60vw',
            maxWidth: '900px',
            maxHeight: '900px',
            background: 'radial-gradient(circle, rgba(255, 240, 195, 0.55) 0%, rgba(255, 215, 140, 0.28) 32%, rgba(255, 195, 95, 0.1) 58%, transparent 75%)',
            filter: `blur(${Math.round(sunlightBlur * 2.2)}px)`,
            transformOrigin: '55% 15%',
            animation: 'sunGlowPulse 6s ease-in-out infinite alternate',
          }}
        />

        {/* Primary Diagonal Volumetric God Rays (Active Sweeping Movement) */}
        <div
          style={{
            position: 'absolute',
            top: '-35%',
            left: '0%',
            width: '150vw',
            height: '160vh',
            transformOrigin: '55% 15%',
            background: `repeating-linear-gradient(
              128deg,
              rgba(255, 248, 220, 0.22) 0px,
              rgba(255, 248, 220, 0.22) 50px,
              transparent 50px,
              transparent 105px,
              rgba(255, 235, 180, 0.16) 105px,
              rgba(255, 235, 180, 0.16) 175px,
              transparent 175px,
              transparent 250px,
              rgba(255, 244, 200, 0.24) 250px,
              rgba(255, 244, 200, 0.24) 315px,
              transparent 315px,
              transparent 410px
            )`,
            WebkitMaskImage: 'radial-gradient(ellipse 100% 90% at 55% 15%, black 20%, transparent 80%)',
            maskImage: 'radial-gradient(ellipse 100% 90% at 55% 15%, black 20%, transparent 80%)',
            filter: `blur(${sunlightBlur}px)`,
            animation: 'sunBeamShimmer 8s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite alternate',
          }}
        />

        {/* Secondary Shimmering Light Shafts (Counter-angle Drifting) */}
        <div
          style={{
            position: 'absolute',
            top: '-30%',
            left: '10%',
            width: '140vw',
            height: '150vh',
            transformOrigin: '54% 16%',
            background: `repeating-linear-gradient(
              125deg,
              rgba(255, 252, 235, 0.18) 0px,
              rgba(255, 252, 235, 0.18) 26px,
              transparent 26px,
              transparent 75px,
              rgba(255, 242, 205, 0.14) 75px,
              rgba(255, 242, 205, 0.14) 130px,
              transparent 130px,
              transparent 195px
            )`,
            WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 55% 18%, black 25%, transparent 78%)',
            maskImage: 'radial-gradient(ellipse 90% 80% at 55% 18%, black 25%, transparent 78%)',
            filter: `blur(${Math.round(sunlightBlur * 0.8)}px)`,
            animation: 'sunBeamSweep 11s cubic-bezier(0.42, 0, 0.58, 1) infinite alternate',
          }}
        />

        {/* Water Surface Sunlight Glint & Reflections */}
        <div
          style={{
            position: 'absolute',
            bottom: '0%',
            left: '10%',
            width: '90vw',
            height: '35vh',
            background: 'radial-gradient(ellipse 70% 35% at 55% 85%, rgba(255, 235, 180, 0.30) 0%, rgba(255, 210, 130, 0.12) 40%, transparent 75%)',
            filter: `blur(${Math.round(sunlightBlur * 1.5)}px)`,
            animation: 'waterGlintMove 5s ease-in-out infinite alternate',
          }}
        />
      </div>

      <style>{`
        @keyframes sunGlowPulse {
          0% {
            opacity: 0.7;
            transform: scale(0.96);
          }
          100% {
            opacity: 1;
            transform: scale(1.08);
          }
        }
        @keyframes sunBeamShimmer {
          0% {
            opacity: 0.65;
            transform: rotate(-3.5deg) scale(0.98) translate(-15px, 0);
          }
          50% {
            opacity: 0.95;
            transform: rotate(0.5deg) scale(1.04) translate(10px, 8px);
          }
          100% {
            opacity: 0.8;
            transform: rotate(4deg) scale(1.02) translate(25px, -6px);
          }
        }
        @keyframes sunBeamSweep {
          0% {
            opacity: 0.55;
            transform: rotate(3.5deg) scale(1.03) translate(18px, -10px);
          }
          50% {
            opacity: 0.92;
            transform: rotate(-1deg) scale(0.99) translate(-8px, 10px);
          }
          100% {
            opacity: 0.65;
            transform: rotate(-4deg) scale(1.05) translate(-22px, 4px);
          }
        }
        @keyframes waterGlintMove {
          0% {
            opacity: 0.45;
            transform: translateX(-30px) scaleY(0.95);
          }
          100% {
            opacity: 0.85;
            transform: translateX(35px) scaleY(1.15);
          }
        }
        .countdown-digits {
          font-size: clamp(2.5rem, 10.5vw, 15.5rem);
          font-weight: 200;
          line-height: 1;
          font-variant-numeric: tabular-nums;
          font-family: var(--font-geist);
          color: #ffffff;
        }
        .countdown-colon {
          font-size: clamp(2rem, 8.5vw, 12.5rem);
          font-weight: 200;
          line-height: 1;
          font-family: var(--font-geist);
          color: rgba(255, 255, 255, 0.65);
          user-select: none;
        }
        .countdown-label {
          font-size: clamp(0.75rem, 1.5vw, 1.6rem);
          font-weight: 200;
          color: rgba(255, 255, 255, 0.8);
          margin-top: clamp(0.8rem, 2vw, 2.4rem);
          letter-spacing: 0.05em;
          font-family: var(--font-geist);
          line-height: 1.2;
        }
        .countdown-spacer {
          font-size: clamp(0.75rem, 1.5vw, 1.6rem);
          margin-top: clamp(0.8rem, 2vw, 2.4rem);
          visibility: hidden;
          pointer-events: none;
          line-height: 1.2;
        }
        @media (max-width: 640px) {
          .countdown-digits {
            font-size: clamp(2.2rem, 11vw, 3.8rem) !important;
          }
          .countdown-colon {
            font-size: clamp(1.8rem, 9vw, 3rem) !important;
          }
          .countdown-label {
            font-size: 0.62rem !important;
            margin-top: 0.5rem !important;
            letter-spacing: 0.02em !important;
          }
          .countdown-spacer {
            font-size: 0.62rem !important;
            margin-top: 0.5rem !important;
          }
        }
      `}</style>

      <div
        style={{
          position: 'relative',
          zIndex: 3,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          flexWrap: 'nowrap',
          gap: 'clamp(0.2rem, 1.4vw, 2.5rem)',
          width: '100%',
          maxWidth: '100vw',
          transform: `translate(${countdownX}px, ${countdownY}px) scale(${countdownScale})`,
          transformOrigin: 'center center',
          transition: 'transform 0.15s ease-out',
        }}
      >
        {/* Days */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span className="countdown-digits">
            {pad(d, 2)}
          </span>
          <span className="countdown-label">
            days
          </span>
        </div>

        {/* Separator */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
          aria-hidden="true"
        >
          <span className="countdown-colon">
            :
          </span>
          <span className="countdown-spacer">
            &nbsp;
          </span>
        </div>

        {/* Hours */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span className="countdown-digits">
            {pad(h, 2)}
          </span>
          <span className="countdown-label">
            hours
          </span>
        </div>

        {/* Separator */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
          aria-hidden="true"
        >
          <span className="countdown-colon">
            :
          </span>
          <span className="countdown-spacer">
            &nbsp;
          </span>
        </div>

        {/* Minutes */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span className="countdown-digits">
            {pad(m, 2)}
          </span>
          <span className="countdown-label">
            minutes
          </span>
        </div>

        {/* Separator */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
          aria-hidden="true"
        >
          <span className="countdown-colon">
            :
          </span>
          <span className="countdown-spacer">
            &nbsp;
          </span>
        </div>

        {/* Seconds */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span className="countdown-digits">
            {pad(s, 2)}
          </span>
          <span className="countdown-label">
            seconds
          </span>
        </div>
      </div>
    </main>
  );
};

export default OX1Countdown;
