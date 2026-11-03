import React from 'react';

interface CxThermalVisualProps {
  variant?: 'hero' | 'cta' | 'node' | 'waveform' | 'compliance' | 'diffusion';
  title?: string;
}

export const CxThermalVisual: React.FC<CxThermalVisualProps> = ({ variant = 'hero' }) => {
  if (variant === 'hero') {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: 'transparent',
        }}
      >
        {/* Organic Iridescent Blobs with Blurs */}
        <div
          style={{
            position: 'absolute',
            width: '800px',
            height: '480px',
            borderRadius: '50%',
            top: '-60px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'radial-gradient(circle at 35% 45%, #111111 0%, #333333 30%, #ffd166 50%, #06d6a0 70%, transparent 85%)',
            filter: 'blur(65px)',
            opacity: 0.55,
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '600px',
            height: '400px',
            borderRadius: '50%',
            top: '40px',
            left: '20%',
            background: 'radial-gradient(circle, #ff6b6b 0%, #f72585 30%, #7209b7 60%, transparent 80%)',
            filter: 'blur(75px)',
            opacity: 0.35,
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '650px',
            height: '420px',
            borderRadius: '50%',
            top: '20px',
            right: '15%',
            background: 'radial-gradient(circle, #4cc9f0 0%, #00f5d4 35%, #70e000 65%, transparent 80%)',
            filter: 'blur(70px)',
            opacity: 0.4,
          }}
        />
        {/* Subtle SVG Contours Overlay */}
        <svg
          viewBox="0 0 1200 600"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            opacity: 0.15,
            pointerEvents: 'none',
          }}
        >
          <path
            d="M 100 300 Q 300 150 600 300 T 1100 280"
            fill="none"
            stroke="#111111"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />
          <path
            d="M 50 420 Q 350 220 700 380 T 1150 350"
            fill="none"
            stroke="#111111"
            strokeWidth="1.2"
          />
          <path
            d="M 150 180 Q 450 380 850 180 T 1100 220"
            fill="none"
            stroke="#111111"
            strokeWidth="1"
            strokeDasharray="3 5"
          />
        </svg>
      </div>
    );
  }

  if (variant === 'cta') {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: 'transparent',
        }}
      >
        {/* Arch / Thermal Dome rising from bottom */}
        <div
          style={{
            position: 'absolute',
            width: '900px',
            height: '520px',
            borderRadius: '50% 50% 0 0',
            bottom: '-120px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'radial-gradient(circle at 50% 70%, #111111 0%, #333333 25%, #05df72 50%, #00b4d8 75%, transparent 90%)',
            filter: 'blur(70px)',
            opacity: 0.55,
          }}
        />
        {/* Arched Contour Lines */}
        <svg
          viewBox="0 0 1000 500"
          style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            maxWidth: '1000px',
            height: 'auto',
            opacity: 0.2,
            pointerEvents: 'none',
          }}
        >
          <ellipse cx="500" cy="480" rx="420" ry="260" fill="none" stroke="#111111" strokeWidth="1.5" strokeDasharray="6 6" />
          <ellipse cx="500" cy="480" rx="340" ry="200" fill="none" stroke="#111111" strokeWidth="1.2" />
          <ellipse cx="500" cy="480" rx="260" ry="140" fill="none" stroke="#111111" strokeWidth="1" strokeDasharray="4 4" />
        </svg>
      </div>
    );
  }

  if (variant === 'node') {
    return (
      <svg viewBox="0 0 400 240" style={{ width: '100%', height: '100%', maxHeight: '200px' }}>
        <defs>
          <linearGradient id="nodeGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#111111" />
            <stop offset="100%" stopColor="#444444" />
          </linearGradient>
          <linearGradient id="nodeGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00d294" />
            <stop offset="100%" stopColor="#54a2ff" />
          </linearGradient>
        </defs>
        {/* Connecting Lines */}
        <line x1="80" y1="120" x2="160" y2="70" stroke="#111111" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.3" />
        <line x1="80" y1="120" x2="160" y2="170" stroke="#111111" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.3" />
        <line x1="160" y1="70" x2="240" y2="70" stroke="#111111" strokeWidth="1.5" opacity="0.4" />
        <line x1="160" y1="170" x2="240" y2="170" stroke="#111111" strokeWidth="1.5" opacity="0.4" />
        <line x1="160" y1="70" x2="240" y2="170" stroke="#111111" strokeWidth="1.2" opacity="0.5" />
        <line x1="160" y1="170" x2="240" y2="70" stroke="#00d294" strokeWidth="1.2" opacity="0.5" />
        <line x1="240" y1="70" x2="320" y2="120" stroke="#111111" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.3" />
        <line x1="240" y1="170" x2="320" y2="120" stroke="#111111" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.3" />

        {/* Nodes with Organic Fill */}
        <circle cx="80" cy="120" r="22" fill="url(#nodeGrad1)" opacity="0.9" />
        <circle cx="160" cy="70" r="26" fill="url(#nodeGrad2)" opacity="0.9" />
        <circle cx="160" cy="170" r="24" fill="url(#nodeGrad1)" opacity="0.85" />
        <circle cx="240" cy="70" r="24" fill="url(#nodeGrad1)" opacity="0.85" />
        <circle cx="240" cy="170" r="26" fill="url(#nodeGrad2)" opacity="0.9" />
        <circle cx="320" cy="120" r="28" fill="url(#nodeGrad2)" opacity="0.95" />

        {/* Labels in Mono */}
        <text x="80" y="124" textAnchor="middle" fill="#ffffff" fontSize="10" fontFamily="'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" fontWeight="700">IN</text>
        <text x="160" y="74" textAnchor="middle" fill="#ffffff" fontSize="10" fontFamily="'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" fontWeight="700">UPV</text>
        <text x="160" y="174" textAnchor="middle" fill="#ffffff" fontSize="10" fontFamily="'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" fontWeight="700">REB</text>
        <text x="240" y="74" textAnchor="middle" fill="#ffffff" fontSize="10" fontFamily="'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" fontWeight="700">CAL</text>
        <text x="240" y="174" textAnchor="middle" fill="#ffffff" fontSize="10" fontFamily="'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" fontWeight="700">R2</text>
        <text x="320" y="124" textAnchor="middle" fill="#ffffff" fontSize="11" fontFamily="'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" fontWeight="700">f_c</text>
      </svg>
    );
  }

  if (variant === 'waveform') {
    return (
      <svg viewBox="0 0 400 240" style={{ width: '100%', height: '100%', maxHeight: '200px' }}>
        {/* Background Grid */}
        <defs>
          <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="400" height="240" fill="url(#smallGrid)" rx="12" />

        {/* Center baseline */}
        <line x1="20" y1="120" x2="380" y2="120" stroke="rgba(0,0,0,0.2)" strokeWidth="1" strokeDasharray="4 4" />

        {/* Waveform Pulse */}
        <path
          d="M 30 120 L 90 120 Q 110 120 125 70 T 145 165 T 165 95 T 185 140 T 205 110 T 225 125 L 370 120"
          fill="none"
          stroke="#111111"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Echo / Attenuation Envelope */}
        <path
          d="M 115 55 Q 165 75 240 115 L 240 125 Q 165 175 115 175"
          fill="rgba(17, 17, 17, 0.06)"
          stroke="#111111"
          strokeWidth="1"
          strokeDasharray="2 3"
        />

        {/* Transit Time Callout */}
        <line x1="125" y1="50" x2="125" y2="190" stroke="#000ce1" strokeWidth="1.2" strokeDasharray="3 3" />
        <text x="135" y="45" fill="#000ce1" fontSize="10" fontFamily="'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" fontWeight="700">T_0 = 88.5 µs (Direct Path)</text>
        <text x="260" y="195" fill="#111111" fontSize="10" fontFamily="'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif">V = 4.52 km/s [EXCELLENT]</text>
      </svg>
    );
  }

  if (variant === 'compliance') {
    return (
      <svg viewBox="0 0 400 240" style={{ width: '100%', height: '100%', maxHeight: '200px' }}>
        {/* Radar / Matrix for Codal Tolerances */}
        <circle cx="200" cy="120" r="90" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="1" />
        <circle cx="200" cy="120" r="65" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
        <circle cx="200" cy="120" r="40" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="1" />

        {/* Axis Crossings */}
        <line x1="200" y1="20" x2="200" y2="220" stroke="rgba(0,0,0,0.15)" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="100" y1="120" x2="300" y2="120" stroke="rgba(0,0,0,0.15)" strokeWidth="1" strokeDasharray="2 2" />

        {/* Compliant Polygon */}
        <polygon
          points="200,45 275,100 250,175 150,180 120,95"
          fill="rgba(0, 210, 148, 0.2)"
          stroke="#00a544"
          strokeWidth="2"
        />

        {/* Labels */}
        <text x="200" y="16" textAnchor="middle" fill="#111111" fontSize="9" fontFamily="'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" fontWeight="700">IS 456 f_ck</text>
        <text x="315" y="124" fill="#111111" fontSize="9" fontFamily="'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" fontWeight="700">IS 13311 UPV</text>
        <text x="200" y="235" textAnchor="middle" fill="#111111" fontSize="9" fontFamily="'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" fontWeight="700">MoRTH 1700</text>
        <text x="85" y="124" textAnchor="end" fill="#111111" fontSize="9" fontFamily="'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" fontWeight="700">IS 383 Sieve</text>
        <text x="200" y="124" textAnchor="middle" fill="#008138" fontSize="10" fontFamily="'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" fontWeight="700">PASSED</text>
      </svg>
    );
  }

  // variant === 'diffusion'
  return (
    <svg viewBox="0 0 400 240" style={{ width: '100%', height: '100%', maxHeight: '200px' }}>
      <defs>
        <linearGradient id="diffGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#111111" stopOpacity="0.25" />
          <stop offset="45%" stopColor="#444444" stopOpacity="0.15" />
          <stop offset="75%" stopColor="#06d6a0" stopOpacity="0.08" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Surface Bar */}
      <rect x="30" y="30" width="340" height="180" rx="10" fill="url(#diffGrad)" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />

      {/* Rebar Cross Section */}
      <circle cx="290" cy="90" r="14" fill="#364153" stroke="#111111" strokeWidth="2" />
      <circle cx="290" cy="150" r="14" fill="#364153" stroke="#111111" strokeWidth="2" />

      {/* Rebar Passive Layer */}
      <circle cx="290" cy="90" r="17" fill="none" stroke="#05df72" strokeWidth="1.5" strokeDasharray="3 2" />
      <circle cx="290" cy="150" r="17" fill="none" stroke="#05df72" strokeWidth="1.5" strokeDasharray="3 2" />

      {/* Penetration Depth Line */}
      <line x1="160" y1="30" x2="160" y2="210" stroke="#111111" strokeWidth="1.5" strokeDasharray="4 4" />
      <text x="165" y="50" fill="#111111" fontSize="9" fontFamily="'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" fontWeight="700">Carbonation Front @ Year 20 (14.2 mm)</text>
      <text x="290" y="195" textAnchor="middle" fill="#111111" fontSize="9" fontFamily="'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" fontWeight="700">Cover: 50mm (Safe)</text>
    </svg>
  );
};

export default CxThermalVisual;
