import React from 'react';

interface AsciiImageLayerProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  tag?: string;
  badge?: string;
  style?: React.CSSProperties;
  imgStyle?: React.CSSProperties;
  priority?: boolean;
}

export const AsciiImageLayer: React.FC<AsciiImageLayerProps> = ({
  src,
  alt,
  className = '',
  aspectRatio = '16 / 9',
  style = {},
  imgStyle = {},
}) => {
  return (
    <div
      className={`ascii-image-container ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio,
        overflow: 'hidden',
        borderRadius: 0,
        backgroundColor: '#111111',
        border: 'none',
        ...style,
      }}
    >
      {/* Base Image without hover effects */}
      <img
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          borderRadius: 0,
          ...imgStyle,
        }}
      />

      {/* Static ASCII Scan & Glyph Effect Layer */}
      <div
        className="ascii-effect-mesh"
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 2,
          opacity: 0.22,
          backgroundImage: `
            radial-gradient(circle at center, rgba(255, 255, 255, 0.45) 0.8px, transparent 0.8px),
            linear-gradient(rgba(0, 0, 0, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '5px 5px, 100% 3px',
          mixBlendMode: 'overlay',
        }}
      />
    </div>
  );
};

export default AsciiImageLayer;
