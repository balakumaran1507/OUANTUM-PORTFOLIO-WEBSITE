import React, { useState } from 'react';
import { Play, X } from 'lucide-react';

const IntercomVideoBanner: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section style={{ padding: '30px 16px 60px', backgroundColor: '#ffffff', border: 'none' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', width: '100%' }}>
        <div
          style={{
            position: 'relative',
            borderRadius: '0px',
            overflow: 'hidden',
            backgroundImage: 'linear-gradient(90deg, rgba(8, 20, 28, 0.72) 0%, rgba(8, 20, 28, 0.28) 100%), url(/assets/images/ox1-banner-bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: '44px 52px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '32px',
            boxShadow: '0 20px 48px rgba(0, 0, 0, 0.12)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
          }}
          className="ic-video-banner-box"
        >
          {/* Left Text */}
          <div style={{ maxWidth: '640px' }}>
            <h3
              style={{
                fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontSize: 'clamp(1.875rem, 3.5vw, 3.375rem)',
                fontWeight: 300,
                color: '#ffffff',
                lineHeight: 1.05,
                letterSpacing: '-0.015em',
                WebkitTextStroke: '0.4px #ffffff',
                WebkitTextFillColor: '#ffffff',
                marginBottom: '12px',
              }}
            >
              Introducing OX1
            </h3>
            <p
              style={{
                fontFamily: 'var(--ic-font-sans)',
                fontSize: '1.125rem',
                color: 'rgba(255, 255, 255, 0.9)',
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              A major step towards the first Omni eXtelligence for civil industry
            </p>
          </div>

          {/* Right Thumbnail with Play Button */}
          <div
            onClick={() => setIsPlaying(true)}
            style={{
              width: '260px',
              height: '146px',
              borderRadius: '0px',
              overflow: 'hidden',
              position: 'relative',
              backgroundColor: '#111111',
              cursor: 'pointer',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
              flexShrink: 0,
            }}
          >
            <img
              src="/assets/images/about-hero.jpg"
              alt="OX1 Launch Keynote"
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  padding: '10px 22px',
                  borderRadius: '9999px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.8125rem',
                  fontWeight: 800,
                  color: '#111111',
                  boxShadow: '0 4px 18px rgba(0, 0, 0, 0.25)',
                  userSelect: 'none',
                }}
              >
                <Play size={14} fill="#111111" color="#111111" />
                <span style={{ color: '#111111', fontWeight: 800, letterSpacing: '0.04em' }}>PLAY</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isPlaying && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
          onClick={() => setIsPlaying(false)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '900px',
              backgroundColor: '#000000',
              borderRadius: '0px',
              overflow: 'hidden',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsPlaying(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(0, 0, 0, 0.6)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10,
              }}
            >
              <X size={20} />
            </button>
            <video
              src="/assets/images/video (1).mp4"
              controls
              autoPlay
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default IntercomVideoBanner;
