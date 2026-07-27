import React from 'react';

interface SectionBlurDividerProps {
  type: 'dark-to-light' | 'light-to-dark';
  height?: string;
  style?: React.CSSProperties;
}

export const SectionBlurDivider: React.FC<SectionBlurDividerProps> = ({
  type,
  height = '140px',
  style,
}) => {
  const isDarkToLight = type === 'dark-to-light';
  
  const darkColor = '#000000';
  const lightColor = '#f5f5f7';

  return (
    <div
      className={`section-blur-divider section-blur-divider--${type}`}
      style={{
        position: 'relative',
        width: '100%',
        height,
        marginTop: '-70px',
        marginBottom: '-70px',
        zIndex: 10,
        pointerEvents: 'none',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* Base smooth linear gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: isDarkToLight
            ? `linear-gradient(180deg, ${darkColor} 0%, rgba(0,0,0,0.85) 30%, rgba(245,245,247,0.85) 70%, ${lightColor} 100%)`
            : `linear-gradient(180deg, ${lightColor} 0%, rgba(245,245,247,0.85) 30%, rgba(0,0,0,0.85) 70%, ${darkColor} 100%)`,
        }}
      />

      {/* Multi-layered Gaussian backdrop blur overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backdropFilter: 'blur(36px) saturate(120%)',
          WebkitBackdropFilter: 'blur(36px) saturate(120%)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)',
        }}
      />

      {/* Feathered ambient glow mist for soft edge dissolution */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          bottom: '20%',
          left: '-10%',
          right: '-10%',
          background: isDarkToLight
            ? 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,255,255,0.08), transparent 80%)'
            : 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,0,0,0.18), transparent 80%)',
          filter: 'blur(30px)',
        }}
      />
    </div>
  );
};

export default SectionBlurDivider;
