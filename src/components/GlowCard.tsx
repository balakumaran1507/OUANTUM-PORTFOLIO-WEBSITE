import React, { useId, useMemo } from "react";

// ============================================================================
// GLOBAL GLOW CARD SETTINGS
// ============================================================================
// 1. Color Theme:
//    - 'bw' | 'black-and-white' | 'white' | 'silver' (Black & White theme)
//    - Hex codes: '#ffffff', '#00f0ff', '#3b82f6', '#10b981', '#f89c52'
//    - Presets:   'amber' | 'cyan' | 'blue' | 'emerald' | 'purple' | 'crimson'
export const GLOBAL_GLOW_COLOR = "bw";

// 2. Inner Core Brightness:
//    Adjust this (0.0 to 1.0) to control the glow brightness in the inner core.
//    - 0.20 to 0.35 = subtle, calm, non-blinding (recommended)
//    - 0.50 to 0.70 = moderate glow
//    - 1.00         = full maximum intensity
export const GLOW_CORE_BRIGHTNESS = 0.35;
// ============================================================================

type GlowLayer = {
  name: string;
  x: number; // x-axis position (%)
  y: number; // y-axis position (%)
  scaleX: number; // horizontal scale (%)
  scaleY: number; // vertical scale (%)
  stops: { color: string; at: number }[];
};

// Builds a CSS radial-gradient string from a GlowLayer config.
function buildRadial(layer: GlowLayer): string {
  const stopStr = layer.stops.map((s) => `${s.color} ${s.at}%`).join(", ");
  return `radial-gradient(ellipse ${layer.scaleX}% ${layer.scaleY}% at ${layer.x}% ${layer.y}%, ${stopStr})`;
}

// Built-in color preset map
const COLOR_PRESETS: Record<string, { r: number; g: number; b: number }> = {
  bw: { r: 255, g: 255, b: 255 },
  "black-and-white": { r: 255, g: 255, b: 255 },
  monochrome: { r: 255, g: 255, b: 255 },
  white: { r: 255, g: 255, b: 255 },
  silver: { r: 235, g: 235, b: 240 },
  amber: { r: 248, g: 156, b: 82 },
  orange: { r: 248, g: 156, b: 82 },
  cyan: { r: 0, g: 240, b: 255 },
  blue: { r: 59, g: 130, b: 246 },
  emerald: { r: 16, g: 185, b: 129 },
  green: { r: 16, g: 185, b: 129 },
  purple: { r: 168, g: 85, b: 247 },
  violet: { r: 139, g: 92, b: 246 },
  red: { r: 239, g: 68, b: 68 },
  crimson: { r: 255, g: 51, b: 102 },
  rose: { r: 244, g: 63, b: 94 },
  yellow: { r: 234, g: 179, b: 8 },
  gold: { r: 251, g: 191, b: 36 },
};

function parseColorToRgb(color: string): { r: number; g: number; b: number; isMonochrome: boolean } {
  const trimmed = color.trim().toLowerCase();

  // Explicit Black & White presets
  if (["bw", "black-and-white", "monochrome", "white", "silver"].includes(trimmed)) {
    return { ...COLOR_PRESETS[trimmed], isMonochrome: true };
  }

  if (COLOR_PRESETS[trimmed]) {
    const p = COLOR_PRESETS[trimmed];
    return { ...p, isMonochrome: p.r === p.g && p.g === p.b };
  }

  // Hex parse
  if (trimmed.startsWith("#")) {
    const clean = trimmed.replace("#", "");
    if (clean.length === 3) {
      const r = parseInt(clean[0] + clean[0], 16);
      const g = parseInt(clean[1] + clean[1], 16);
      const b = parseInt(clean[2] + clean[2], 16);
      if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
        return { r, g, b, isMonochrome: Math.abs(r - g) < 15 && Math.abs(g - b) < 15 };
      }
    } else if (clean.length >= 6) {
      const r = parseInt(clean.substring(0, 2), 16);
      const g = parseInt(clean.substring(2, 4), 16);
      const b = parseInt(clean.substring(4, 6), 16);
      if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
        return { r, g, b, isMonochrome: Math.abs(r - g) < 15 && Math.abs(g - b) < 15 };
      }
    }
  }

  // RGB / RGBA parse
  const rgbMatch = trimmed.match(/rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (rgbMatch) {
    const r = Math.min(255, Math.max(0, parseInt(rgbMatch[1], 10)));
    const g = Math.min(255, Math.max(0, parseInt(rgbMatch[2], 10)));
    const b = Math.min(255, Math.max(0, parseInt(rgbMatch[3], 10)));
    return { r, g, b, isMonochrome: Math.abs(r - g) < 15 && Math.abs(g - b) < 15 };
  }

  // Fallback default: Black & White
  return { r: 255, g: 255, b: 255, isMonochrome: true };
}

// Dedicated Black & White / Monochrome lighting model with reduced core brightness
function computeBlackAndWhitePalette(brightness: number = GLOW_CORE_BRIGHTNESS) {
  const b = Math.max(0.05, Math.min(1.5, brightness));

  const mainGlowLayers: GlowLayer[] = [
    {
      name: "highlight-line",
      x: 50,
      y: 93,
      scaleX: 105,
      scaleY: 3.5,
      stops: [
        { color: `rgba(255, 255, 255, ${(0.32 * b).toFixed(3)})`, at: 0 },
        { color: `rgba(200, 200, 210, ${(0.18 * b).toFixed(3)})`, at: 40 },
        { color: `rgba(150, 150, 160, ${(0.08 * b).toFixed(3)})`, at: 65 },
        { color: "rgba(0, 0, 0, 0)", at: 85 },
      ],
    },
    {
      name: "hot-core",
      x: 50,
      y: 96,
      scaleX: 24,
      scaleY: 15,
      stops: [
        { color: `rgba(240, 240, 245, ${(0.75 * b).toFixed(3)})`, at: 0 },
        { color: `rgba(200, 200, 210, ${(0.38 * b).toFixed(3)})`, at: 30 },
        { color: `rgba(150, 150, 160, ${(0.15 * b).toFixed(3)})`, at: 55 },
        { color: "rgba(0, 0, 0, 0)", at: 80 },
      ],
    },
    {
      name: "inner-glow-ring",
      x: 50,
      y: 100,
      scaleX: 46,
      scaleY: 32,
      stops: [
        { color: `rgba(220, 220, 230, ${(0.50 * b).toFixed(3)})`, at: 0 },
        { color: `rgba(180, 180, 195, ${(0.26 * b).toFixed(3)})`, at: 28 },
        { color: `rgba(130, 130, 145, ${(0.12 * b).toFixed(3)})`, at: 52 },
        { color: "rgba(0, 0, 0, 0)", at: 78 },
      ],
    },
    {
      name: "mid-glow",
      x: 50,
      y: 100,
      scaleX: 72,
      scaleY: 55,
      stops: [
        { color: `rgba(180, 180, 195, ${(0.25 * b).toFixed(3)})`, at: 0 },
        { color: `rgba(130, 130, 145, ${(0.14 * b).toFixed(3)})`, at: 30 },
        { color: `rgba(80, 80, 95, ${(0.06 * b).toFixed(3)})`, at: 55 },
        { color: "rgba(0, 0, 0, 0)", at: 80 },
      ],
    },
    {
      name: "wide-haze",
      x: 50,
      y: 100,
      scaleX: 105,
      scaleY: 78,
      stops: [
        { color: `rgba(140, 140, 155, ${(0.14 * b).toFixed(3)})`, at: 0 },
        { color: `rgba(90, 90, 105, ${(0.07 * b).toFixed(3)})`, at: 32 },
        { color: `rgba(50, 50, 60, ${(0.03 * b).toFixed(3)})`, at: 58 },
        { color: "rgba(0, 0, 0, 0)", at: 84 },
      ],
    },
    {
      name: "outer-haze",
      x: 50,
      y: 100,
      scaleX: 150,
      scaleY: 115,
      stops: [
        { color: `rgba(100, 100, 115, ${(0.08 * b).toFixed(3)})`, at: 0 },
        { color: `rgba(50, 50, 60, ${(0.03 * b).toFixed(3)})`, at: 40 },
        { color: "rgba(0, 0, 0, 0)", at: 80 },
      ],
    },
    {
      name: "farthest-haze",
      x: 50,
      y: 100,
      scaleX: 190,
      scaleY: 145,
      stops: [
        { color: `rgba(60, 60, 70, ${(0.04 * b).toFixed(3)})`, at: 0 },
        { color: "rgba(0, 0, 0, 0)", at: 78 },
      ],
    },
  ];

  const mainGlowFloorFill = `linear-gradient(to top, rgba(240, 240, 245, ${(0.32 * b).toFixed(3)}) 0%, rgba(180, 180, 195, ${(0.18 * b).toFixed(3)}) 3%, rgba(130, 130, 145, ${(0.09 * b).toFixed(3)}) 8%, rgba(70, 70, 85, ${(0.04 * b).toFixed(3)}) 16%, rgba(0, 0, 0, 0) 55%)`;

  const marginGlowLayers: GlowLayer[] = [
    {
      name: "margin-tight-glow",
      x: 50,
      y: 100,
      scaleX: 46,
      scaleY: 30,
      stops: [
        { color: `rgba(240, 240, 245, ${(0.55 * b).toFixed(3)})`, at: 0 },
        { color: `rgba(190, 190, 205, ${(0.28 * b).toFixed(3)})`, at: 30 },
        { color: `rgba(130, 130, 145, ${(0.12 * b).toFixed(3)})`, at: 55 },
        { color: "rgba(0, 0, 0, 0)", at: 80 },
      ],
    },
    {
      name: "margin-medium-glow",
      x: 50,
      y: 100,
      scaleX: 100,
      scaleY: 60,
      stops: [
        { color: `rgba(170, 170, 185, ${(0.25 * b).toFixed(3)})`, at: 0 },
        { color: `rgba(110, 110, 125, ${(0.12 * b).toFixed(3)})`, at: 40 },
        { color: "rgba(0, 0, 0, 0)", at: 78 },
      ],
    },
    {
      name: "margin-widest-glow",
      x: 50,
      y: 100,
      scaleX: 150,
      scaleY: 90,
      stops: [
        { color: `rgba(100, 100, 115, ${(0.12 * b).toFixed(3)})`, at: 0 },
        { color: "rgba(0, 0, 0, 0)", at: 75 },
      ],
    },
  ];

  const marginFloorFill = `linear-gradient(to top, rgba(240, 240, 245, ${(0.48 * b).toFixed(3)}) 0%, rgba(180, 180, 195, ${(0.28 * b).toFixed(3)}) 3%, rgba(130, 130, 145, ${(0.15 * b).toFixed(3)}) 7%, rgba(70, 70, 85, ${(0.07 * b).toFixed(3)}) 14%, rgba(0, 0, 0, 0) 28%)`;

  const strokeStops = {
    stop0: `rgba(255, 255, 255, ${(0.32 * Math.min(1.2, b + 0.3)).toFixed(3)})`,
    stop18: `rgba(255, 255, 255, ${(0.15 * Math.min(1.2, b + 0.3)).toFixed(3)})`,
    stop45: `rgba(255, 255, 255, ${(0.07 * Math.min(1.2, b + 0.3)).toFixed(3)})`,
    stop70: `rgba(255, 255, 255, ${(0.15 * Math.min(1.2, b + 0.3)).toFixed(3)})`,
    stop88: `rgba(255, 255, 255, ${(0.45 * Math.min(1.2, b + 0.3)).toFixed(3)})`,
    stop100: `rgba(255, 255, 255, ${(0.75 * Math.min(1.2, b + 0.3)).toFixed(3)})`,
  };

  return {
    mainGlowLayers,
    mainGlowFloorFill,
    marginGlowLayers,
    marginFloorFill,
    strokeStops,
  };
}

function computeGlowPalette(colorStr: string, brightness: number = GLOW_CORE_BRIGHTNESS) {
  const { r, g, b, isMonochrome } = parseColorToRgb(colorStr);

  if (isMonochrome) {
    return computeBlackAndWhitePalette(brightness);
  }

  const factor = Math.max(0.1, Math.min(1.5, brightness));

  const cPrimary = `rgba(${r}, ${g}, ${b}, `;
  const cHot = `rgba(${Math.min(255, Math.round(r + (255 - r) * 0.7))}, ${Math.min(255, Math.round(g + (255 - g) * 0.7))}, ${Math.min(255, Math.round(b + (255 - b) * 0.7))}, `;
  const cCoreMid = `rgba(${Math.min(255, Math.round(r + (255 - r) * 0.35))}, ${Math.min(255, Math.round(g + (255 - g) * 0.35))}, ${Math.min(255, Math.round(b + (255 - b) * 0.35))}, `;
  const cDark1 = `rgba(${Math.round(r * 0.9)}, ${Math.round(g * 0.8)}, ${Math.round(b * 0.75)}, `;
  const cDark2 = `rgba(${Math.round(r * 0.78)}, ${Math.round(g * 0.65)}, ${Math.round(b * 0.55)}, `;
  const cDark3 = `rgba(${Math.round(r * 0.65)}, ${Math.round(g * 0.52)}, ${Math.round(b * 0.4)}, `;
  const cDark4 = `rgba(${Math.round(r * 0.5)}, ${Math.round(g * 0.38)}, ${Math.round(b * 0.28)}, `;
  const cDark5 = `rgba(${Math.round(r * 0.35)}, ${Math.round(g * 0.25)}, ${Math.round(b * 0.18)}, `;

  const mainGlowLayers: GlowLayer[] = [
    {
      name: "highlight-line",
      x: 50,
      y: 93,
      scaleX: 105,
      scaleY: 3.5,
      stops: [
        { color: `${cPrimary}${(0.62 * factor).toFixed(3)})`, at: 0 },
        { color: `${cDark1}${(0.36 * factor).toFixed(3)})`, at: 40 },
        { color: `${cDark2}${(0.15 * factor).toFixed(3)})`, at: 65 },
        { color: `${cDark2}0)`, at: 85 },
      ],
    },
    {
      name: "hot-core",
      x: 50,
      y: 96,
      scaleX: 24,
      scaleY: 15,
      stops: [
        { color: `${cHot}${(0.85 * factor).toFixed(3)})`, at: 0 },
        { color: `${cCoreMid}${(0.50 * factor).toFixed(3)})`, at: 30 },
        { color: `${cPrimary}${(0.22 * factor).toFixed(3)})`, at: 55 },
        { color: `${cPrimary}0)`, at: 80 },
      ],
    },
    {
      name: "inner-glow-ring",
      x: 50,
      y: 100,
      scaleX: 46,
      scaleY: 32,
      stops: [
        { color: `${cPrimary}${(0.60 * factor).toFixed(3)})`, at: 0 },
        { color: `${cDark1}${(0.35 * factor).toFixed(3)})`, at: 28 },
        { color: `${cDark2}${(0.15 * factor).toFixed(3)})`, at: 52 },
        { color: `${cDark2}0)`, at: 78 },
      ],
    },
    {
      name: "mid-glow",
      x: 50,
      y: 100,
      scaleX: 72,
      scaleY: 55,
      stops: [
        { color: `${cDark1}${(0.32 * factor).toFixed(3)})`, at: 0 },
        { color: `${cDark2}${(0.18 * factor).toFixed(3)})`, at: 30 },
        { color: `${cDark3}${(0.09 * factor).toFixed(3)})`, at: 55 },
        { color: `${cDark3}0)`, at: 80 },
      ],
    },
    {
      name: "wide-haze",
      x: 50,
      y: 100,
      scaleX: 105,
      scaleY: 78,
      stops: [
        { color: `${cDark2}${(0.18 * factor).toFixed(3)})`, at: 0 },
        { color: `${cDark3}${(0.10 * factor).toFixed(3)})`, at: 32 },
        { color: `${cDark4}${(0.05 * factor).toFixed(3)})`, at: 58 },
        { color: `rgba(0,0,0,0)`, at: 84 },
      ],
    },
    {
      name: "outer-haze",
      x: 50,
      y: 100,
      scaleX: 150,
      scaleY: 115,
      stops: [
        { color: `${cDark3}${(0.10 * factor).toFixed(3)})`, at: 0 },
        { color: `${cDark4}${(0.04 * factor).toFixed(3)})`, at: 40 },
        { color: `rgba(0,0,0,0)`, at: 80 },
      ],
    },
    {
      name: "farthest-haze",
      x: 50,
      y: 100,
      scaleX: 190,
      scaleY: 145,
      stops: [
        { color: `${cDark4}${(0.05 * factor).toFixed(3)})`, at: 0 },
        { color: `rgba(0,0,0,0)`, at: 78 },
      ],
    },
  ];

  const mainGlowFloorFill = `linear-gradient(to top, ${cDark2}${(0.5 * factor).toFixed(3)}) 0%, ${cDark3}${(0.3 * factor).toFixed(3)}) 3%, ${cDark4}${(0.15 * factor).toFixed(3)}) 8%, ${cDark5}${(0.06 * factor).toFixed(3)}) 16%, rgba(0,0,0,0) 60%)`;

  const marginGlowLayers: GlowLayer[] = [
    {
      name: "margin-tight-glow",
      x: 50,
      y: 100,
      scaleX: 46,
      scaleY: 30,
      stops: [
        { color: `${cPrimary}${(0.6 * factor).toFixed(3)})`, at: 0 },
        { color: `${cDark1}${(0.35 * factor).toFixed(3)})`, at: 30 },
        { color: `${cDark2}${(0.15 * factor).toFixed(3)})`, at: 55 },
        { color: `${cDark2}0)`, at: 80 },
      ],
    },
    {
      name: "margin-medium-glow",
      x: 50,
      y: 100,
      scaleX: 100,
      scaleY: 60,
      stops: [
        { color: `${cDark1}${(0.3 * factor).toFixed(3)})`, at: 0 },
        { color: `${cDark2}${(0.16 * factor).toFixed(3)})`, at: 40 },
        { color: `rgba(0,0,0,0)`, at: 78 },
      ],
    },
    {
      name: "margin-widest-glow",
      x: 50,
      y: 100,
      scaleX: 150,
      scaleY: 90,
      stops: [
        { color: `${cDark2}${(0.16 * factor).toFixed(3)})`, at: 0 },
        { color: `rgba(0,0,0,0)`, at: 75 },
      ],
    },
  ];

  const marginFloorFill = `linear-gradient(to top, ${cDark2}${(0.65 * factor).toFixed(3)}) 0%, ${cDark3}${(0.45 * factor).toFixed(3)}) 3%, ${cDark4}${(0.25 * factor).toFixed(3)}) 7%, ${cDark5}${(0.10 * factor).toFixed(3)}) 14%, rgba(0,0,0,0) 28%)`;

  // SVG stroke gradient colors
  const strokeStops = {
    stop0: `rgb(${Math.round(r * 0.8)}, ${Math.round(g * 0.6)}, ${Math.round(b * 0.45)})`,
    stop18: `rgb(${Math.round(r * 0.55)}, ${Math.round(g * 0.4)}, ${Math.round(b * 0.3)})`,
    stop45: `rgb(${Math.round(r * 0.35)}, ${Math.round(g * 0.25)}, ${Math.round(b * 0.18)})`,
    stop70: `rgb(${Math.round(r * 0.44)}, ${Math.round(g * 0.3)}, ${Math.round(b * 0.22)})`,
    stop88: `rgb(${Math.round(r * 0.8)}, ${Math.round(g * 0.58)}, ${Math.round(b * 0.42)})`,
    stop100: `rgb(${Math.min(255, Math.round(r + (255 - r) * 0.4))}, ${Math.min(255, Math.round(g + (255 - g) * 0.4))}, ${Math.min(255, Math.round(b + (255 - b) * 0.4))})`,
  };

  return {
    mainGlowLayers,
    mainGlowFloorFill,
    marginGlowLayers,
    marginFloorFill,
    strokeStops,
  };
}

export interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  borderRadius?: number;
  glowColor?: string; // Optional: overrides GLOBAL_GLOW_COLOR for this specific card
  coreBrightness?: number; // Optional: overrides GLOW_CORE_BRIGHTNESS (0.0 to 1.0)
  disableHoverMotion?: boolean; // When true, disables outer card elevation & content translation on hover
  onMouseEnter?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export default function GlowCard({
  children,
  className = "",
  style = {},
  borderRadius: _borderRadius = 0,
  glowColor,
  coreBrightness,
  disableHoverMotion = false,
  onMouseEnter,
  onMouseLeave,
  ...restProps
}: GlowCardProps) {
  const [isHovered, setIsHovered] = React.useState(false);
  const effectiveRadius = _borderRadius ?? 0; // 0 = sharp corners by default; chatbot passes 20/24
  const rawId = useId();
  const cleanId = rawId.replace(/:/g, "");
  const borderGradId = `borderGrad-${cleanId}`;
  const grainId = `grain-${cleanId}`;

  const activeColor = glowColor || GLOBAL_GLOW_COLOR;
  const activeBrightness = coreBrightness !== undefined ? coreBrightness : GLOW_CORE_BRIGHTNESS;

  const palette = useMemo(
    () => computeGlowPalette(activeColor, activeBrightness),
    [activeColor, activeBrightness]
  );

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(true);
    onMouseEnter?.(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(false);
    onMouseLeave?.(e);
  };

  return (
    <div
      className={`glow-card-container ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...restProps}
      style={{
        position: "relative",
        borderRadius: `${effectiveRadius}px`,
        overflow: "hidden",
        background: "#000000",
        transform: "translateY(0px)",
        transition: "border-color 0.3s ease",
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        ...style,
      }}
    >
      {/* ── LAYER 1: BORDER-MARGIN GLOW BLEED (Inner Motion) ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: `${effectiveRadius}px`,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "-40px",
            background: [
              ...palette.marginGlowLayers.map(buildRadial),
              palette.marginFloorFill,
            ].join(",\n"),
            filter: "blur(14px)",
            mixBlendMode: "screen",
            transform: isHovered ? "scale(1.05) translateY(-6px)" : "scale(1) translateY(0px)",
            opacity: isHovered ? 1.15 : 0.85,
            transition: "transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.65s ease",
          }}
        />
      </div>

      {/* ── LAYER 2: BORDER STROKE (SVG) ── */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 10,
          opacity: isHovered ? 1.0 : 0.8,
          transition: "opacity 0.45s ease",
        }}
      >
        <defs>
          <linearGradient id={borderGradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={palette.strokeStops.stop0} />
            <stop offset="18%" stopColor={palette.strokeStops.stop18} />
            <stop offset="45%" stopColor={palette.strokeStops.stop45} />
            <stop offset="70%" stopColor={palette.strokeStops.stop70} />
            <stop offset="88%" stopColor={palette.strokeStops.stop88} />
            <stop offset="100%" stopColor={palette.strokeStops.stop100} />
          </linearGradient>
        </defs>
        <rect
          x="1"
          y="1"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          rx={effectiveRadius}
          ry={effectiveRadius}
          fill="none"
          stroke={`url(#${borderGradId})`}
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* ── LAYER 3: MAIN AMBIENT GLOW (Inner Motion: rises and expands) ── */}
      <div
        style={{
          position: "absolute",
          inset: "-50px",
          background: [
            ...palette.mainGlowLayers.map(buildRadial),
            palette.mainGlowFloorFill,
          ].join(",\n"),
          filter: "blur(13px)",
          mixBlendMode: "screen",
          pointerEvents: "none",
          transform: isHovered ? "scale(1.08) translateY(-10px)" : "scale(1) translateY(0px)",
          opacity: isHovered ? 1.2 : 0.85,
          transition: "transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.65s ease",
        }}
      />

      {/* ── LAYER 4: FILM GRAIN OVERLAY ── */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.05,
          mixBlendMode: "overlay",
          pointerEvents: "none",
        }}
      >
        <filter id={grainId}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#${grainId})`} />
      </svg>

      {/* ── LAYER 5: CONTENT WRAPPER (Inner Motion: subtle float) ── */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
          transform: "translateY(0px)",
          transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
