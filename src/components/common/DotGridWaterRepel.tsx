import React, { useRef, useEffect } from 'react';

export interface DotGridWaterRepelProps {
  width?: number;
  height?: number;
  centerX?: number;
  centerY?: number;
  innerRadius?: number;
  outerRadius?: number;
  gap?: number;
  baseDotRadius?: number;
  chargingCycleMs?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * DotGridWaterRepel
 * High-density micro-particle charging aura localized behind the main central circle.
 * - High particle count (~2,800 micro particles at gap=6.5px)
 * - Ultra-fine micro-dot particle size (0.55px - 0.95px)
 * - Authentic electrical charging sensation:
 *    1. Charge accumulation: Inward electrostatic pull and micro-vibration as current enters hub
 *    2. Saturation pulse: Water-repelling radial shockwave rippling outward across the micro-dots
 *    3. Jelly snap-back: Spring physics returning particles with fluid elasticity
 * - Cursor water-repelling interaction (React Bits DotGrid physics)
 */
export const DotGridWaterRepel: React.FC<DotGridWaterRepelProps> = ({
  width = 1260,
  height = 720,
  centerX = 630,
  centerY = 360,
  innerRadius = 94,
  outerRadius = 215,
  gap = 6.5,
  baseDotRadius = 0.55,
  chargingCycleMs = 1500,
  className,
  style,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    interface Dot {
      ox: number;
      oy: number;
      x: number;
      y: number;
      vx: number;
      vy: number;
      distToCenter: number;
      angleToCenter: number;
      radialFade: number;
    }

    const dots: Dot[] = [];

    // Dense grid bounded tightly around the central circle aura [centerX - outerRadius, centerX + outerRadius]
    const minX = centerX - outerRadius;
    const maxX = centerX + outerRadius;
    const minY = centerY - outerRadius;
    const maxY = centerY + outerRadius;

    for (let x = minX; x <= maxX; x += gap) {
      for (let y = minY; y <= maxY; y += gap) {
        const distToCenter = Math.hypot(x - centerX, y - centerY);
        // Only place dots within the annular aura right behind and around the center disc
        if (distToCenter >= innerRadius && distToCenter <= outerRadius) {
          // Soft radial falloff towards outer boundary (feathering from 160px to outerRadius)
          const fadeStart = innerRadius + (outerRadius - innerRadius) * 0.55;
          const radialFade =
            distToCenter <= fadeStart
              ? 1.0
              : Math.max(0, 1.0 - (distToCenter - fadeStart) / (outerRadius - fadeStart));

          const angleToCenter = Math.atan2(y - centerY, x - centerX);

          dots.push({
            ox: x,
            oy: y,
            x,
            y,
            vx: 0,
            vy: 0,
            distToCenter,
            angleToCenter,
            radialFade,
          });
        }
      }
    }

    interface Ripple {
      r: number;
      maxR: number;
      speed: number;
      strength: number;
      alpha: number;
    }

    const ripples: Ripple[] = [];
    const cycleStartTime = performance.now();
    let lastCycleIndex = -1;
    let animId: number;
    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      // Calculate progress in current charging cycle (0.0 -> 1.0)
      const totalElapsed = time - cycleStartTime;
      const currentCycleIndex = Math.floor(totalElapsed / chargingCycleMs);
      const cycleProgress = (totalElapsed % chargingCycleMs) / chargingCycleMs;

      // When charging reaches saturation (at 72% of the cycle, matching wire current arrival):
      // Trigger a water-repelling shockwave release outward from center disc
      if (cycleProgress >= 0.72 && lastCycleIndex !== currentCycleIndex) {
        lastCycleIndex = currentCycleIndex;
        ripples.push({
          r: innerRadius,
          maxR: outerRadius + 12,
          speed: 250, // fast, fluid ripple expansion
          strength: 16,
          alpha: 1.0,
        });
      }

      // Propagate ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rip = ripples[i];
        rip.r += rip.speed * dt;
        rip.alpha = Math.max(0, 1 - (rip.r - innerRadius) / (rip.maxR - innerRadius));
        if (rip.r >= rip.maxR || rip.alpha <= 0.01) {
          ripples.splice(i, 1);
        }
      }

      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      const springK = 0.12;
      const damping = 0.78;

      // Influx charging intensity (builds up as wires stream inward, peaks at 0.72)
      const chargeBuildUp =
        cycleProgress < 0.72
          ? Math.pow(cycleProgress / 0.72, 1.8) // smooth exponential charge accumulation
          : Math.max(0, 1 - (cycleProgress - 0.72) / 0.28); // discharge / cool down

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];

        // 1. Inward Electrostatic Charging Field & Charge Shimmer
        // Particles closer to the center disc feel inward pull as energy gathers
        if (chargeBuildUp > 0.05) {
          const proximityToHub = Math.max(0, 1 - (d.distToCenter - innerRadius) / 90);
          const inwardPull = chargeBuildUp * proximityToHub * 0.95;
          // Inward pull towards center
          d.vx -= Math.cos(d.angleToCenter) * inwardPull * dt * 45;
          d.vy -= Math.sin(d.angleToCenter) * inwardPull * dt * 45;

          // Electrical micro-jitter shimmer when charged
          if (proximityToHub > 0.2) {
            const jitterMag = chargeBuildUp * proximityToHub * 0.45;
            d.vx += (Math.random() - 0.5) * jitterMag;
            d.vy += (Math.random() - 0.5) * jitterMag;
          }
        }

        // 2. Water Ripple Repelling Force from Charging Saturation Shockwave
        if (ripples.length > 0) {
          for (let j = 0; j < ripples.length; j++) {
            const rip = ripples[j];
            const distFromWave = Math.abs(d.distToCenter - rip.r);
            if (distFromWave < 24) {
              const repelFactor = (1 - distFromWave / 24) * rip.alpha;
              // Repel radially outward
              d.vx += Math.cos(d.angleToCenter) * rip.strength * repelFactor * dt * 45;
              d.vy += Math.sin(d.angleToCenter) * rip.strength * repelFactor * dt * 45;
            }
          }
        }

        // 3. Cursor Jelly Repelling Force (React Bits DotGrid interaction)
        if (mouse.active) {
          const dxM = d.x - mouse.x;
          const dyM = d.y - mouse.y;
          const distM = Math.hypot(dxM, dyM);
          if (distM < 60 && distM > 0.5) {
            const mFactor = Math.pow(1 - distM / 60, 2) * 15;
            d.vx += (dxM / distM) * mFactor * dt * 45;
            d.vy += (dyM / distM) * mFactor * dt * 45;
          }
        }

        // 4. Elastic Spring Physics restoring resting position
        const forceX = -springK * (d.x - d.ox);
        const forceY = -springK * (d.y - d.oy);
        d.vx = (d.vx + forceX) * damping;
        d.vy = (d.vy + forceY) * damping;
        d.x += d.vx;
        d.y += d.vy;

        // Visual presentation: ultra-fine micro-dots with charge luminescence
        const disp = Math.hypot(d.x - d.ox, d.y - d.oy);
        const localCharge =
          chargeBuildUp * Math.max(0, 1 - (d.distToCenter - innerRadius) / 75) +
          Math.min(1.0, disp * 0.18);

        const radius = baseDotRadius + Math.min(0.40, localCharge * 0.35);
        const opacity = (0.09 + Math.min(0.48, localCharge * 0.42)) * d.radialFade;

        ctx.fillStyle = `rgba(15, 23, 42, ${opacity.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [width, height, centerX, centerY, innerRadius, outerRadius, gap, baseDotRadius, chargingCycleMs]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * width;
    const y = ((e.clientY - rect.top) / rect.height) * height;
    mouseRef.current = { x, y, active: true };
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: -1000, y: -1000, active: false };
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'auto',
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};
