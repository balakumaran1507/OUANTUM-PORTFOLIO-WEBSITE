import React, { useId } from "react";

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

// MAIN AMBIENT GLOW, the light living inside the card panel.
const MAIN_GLOW_LAYERS: GlowLayer[] = [
  {
    name: "highlight-line",
    x: 50,
    y: 93,
    scaleX: 105,
    scaleY: 3.5,
    stops: [
      { color: "rgba(248,156,82,0.62)", at: 0 },
      { color: "rgba(224,126,60,0.36)", at: 40 },
      { color: "rgba(194,100,46,0.15)", at: 65 },
      { color: "rgba(194,100,46,0)", at: 85 },
    ],
  },
  {
    name: "hot-core",
    x: 50,
    y: 96,
    scaleX: 24,
    scaleY: 15,
    stops: [
      { color: "rgba(255,218,164,0.92)", at: 0 },
      { color: "rgba(253,192,120,0.58)", at: 30 },
      { color: "rgba(251,174,100,0.26)", at: 55 },
      { color: "rgba(251,174,100,0)", at: 80 },
    ],
  },
  {
    name: "inner-glow-ring",
    x: 50,
    y: 100,
    scaleX: 46,
    scaleY: 32,
    stops: [
      { color: "rgba(248,156,82,0.66)", at: 0 },
      { color: "rgba(224,126,60,0.4)", at: 28 },
      { color: "rgba(194,100,46,0.18)", at: 52 },
      { color: "rgba(194,100,46,0)", at: 78 },
    ],
  },
  {
    name: "mid-glow",
    x: 50,
    y: 100,
    scaleX: 72,
    scaleY: 55,
    stops: [
      { color: "rgba(188,100,44,0.38)", at: 0 },
      { color: "rgba(162,84,37,0.22)", at: 30 },
      { color: "rgba(132,66,29,0.11)", at: 55 },
      { color: "rgba(132,66,29,0)", at: 80 },
    ],
  },
  {
    name: "wide-haze",
    x: 50,
    y: 100,
    scaleX: 105,
    scaleY: 78,
    stops: [
      { color: "rgba(122,63,27,0.23)", at: 0 },
      { color: "rgba(94,47,21,0.13)", at: 32 },
      { color: "rgba(64,31,15,0.06)", at: 58 },
      { color: "rgba(0,0,0,0)", at: 84 },
    ],
  },
  {
    name: "outer-haze",
    x: 50,
    y: 100,
    scaleX: 150,
    scaleY: 115,
    stops: [
      { color: "rgba(72,35,16,0.13)", at: 0 },
      { color: "rgba(46,21,11,0.06)", at: 40 },
      { color: "rgba(0,0,0,0)", at: 80 },
    ],
  },
  {
    name: "farthest-haze",
    x: 50,
    y: 100,
    scaleX: 190,
    scaleY: 145,
    stops: [
      { color: "rgba(40,19,10,0.065)", at: 0 },
      { color: "rgba(0,0,0,0)", at: 78 },
    ],
  },
];

const MAIN_GLOW_FLOOR_FILL =
  "linear-gradient(to top, rgba(190,98,44,0.6) 0%, rgba(150,78,35,0.4) 3%, rgba(100,52,24,0.2) 8%, rgba(60,30,14,0.09) 16%, rgba(30,15,7,0.03) 32%, rgba(0,0,0,0) 60%)";

// BORDER-MARGIN GLOW BLEED, sits behind border stroke.
const MARGIN_GLOW_LAYERS: GlowLayer[] = [
  {
    name: "margin-tight-glow",
    x: 50,
    y: 100,
    scaleX: 46,
    scaleY: 30,
    stops: [
      { color: "rgba(248,156,82,0.7)", at: 0 },
      { color: "rgba(224,126,60,0.42)", at: 30 },
      { color: "rgba(194,100,46,0.2)", at: 55 },
      { color: "rgba(194,100,46,0)", at: 80 },
    ],
  },
  {
    name: "margin-medium-glow",
    x: 50,
    y: 100,
    scaleX: 100,
    scaleY: 60,
    stops: [
      { color: "rgba(162,84,37,0.36)", at: 0 },
      { color: "rgba(122,62,27,0.2)", at: 40 },
      { color: "rgba(0,0,0,0)", at: 78 },
    ],
  },
  {
    name: "margin-widest-glow",
    x: 50,
    y: 100,
    scaleX: 150,
    scaleY: 90,
    stops: [
      { color: "rgba(92,46,20,0.2)", at: 0 },
      { color: "rgba(0,0,0,0)", at: 75 },
    ],
  },
];

const MARGIN_FLOOR_FILL =
  "linear-gradient(to top, rgba(180,94,42,0.75) 0%, rgba(160,84,37,0.55) 3%, rgba(120,62,28,0.32) 7%, rgba(70,36,17,0.14) 14%, rgba(0,0,0,0) 28%)";

export interface GlowCardProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  borderRadius?: number;
  onMouseEnter?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export default function GlowCard({
  children,
  className = "",
  style = {},
  borderRadius = 24,
  onMouseEnter,
  onMouseLeave,
}: GlowCardProps) {
  const rawId = useId();
  const cleanId = rawId.replace(/:/g, "");
  const borderGradId = `borderGrad-${cleanId}`;
  const grainId = `grain-${cleanId}`;

  return (
    <div
      className={`glow-card-container ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: "relative",
        borderRadius: `${borderRadius}px`,
        overflow: "hidden",
        background: "#050403",
        transition: "transform 0.3s ease, border-color 0.3s ease",
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        ...style,
      }}
    >
      {/* ── LAYER 1: BORDER-MARGIN GLOW BLEED ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: `${borderRadius + 2}px`,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "-40px",
            background: [
              ...MARGIN_GLOW_LAYERS.map(buildRadial),
              MARGIN_FLOOR_FILL,
            ].join(",\n"),
            filter: "blur(14px)",
            mixBlendMode: "screen",
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
        }}
      >
        <defs>
          <linearGradient id={borderGradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c97a3d" />
            <stop offset="18%" stopColor="#8a4f26" />
            <stop offset="45%" stopColor="#5a3418" />
            <stop offset="70%" stopColor="#6e3d1c" />
            <stop offset="88%" stopColor="#c9762f" />
            <stop offset="100%" stopColor="#ffb15c" />
          </linearGradient>
        </defs>
        <rect
          x="1"
          y="1"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          rx={borderRadius}
          ry={borderRadius}
          fill="none"
          stroke={`url(#${borderGradId})`}
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* ── LAYER 3: MAIN AMBIENT GLOW ── */}
      <div
        style={{
          position: "absolute",
          inset: "-50px",
          background: [
            ...MAIN_GLOW_LAYERS.map(buildRadial),
            MAIN_GLOW_FLOOR_FILL,
          ].join(",\n"),
          filter: "blur(13px)",
          mixBlendMode: "screen",
          pointerEvents: "none",
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

      {/* ── LAYER 5: CONTENT WRAPPER ── */}
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
        }}
      >
        {children}
      </div>
    </div>
  );
}
