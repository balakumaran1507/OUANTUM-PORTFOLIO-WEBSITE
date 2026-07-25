import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export interface LoaderOverlayProps {
  forceShow?: boolean;
  scale?: number | string;
  x?: number | string;
  y?: number | string;
  mobileScale?: number | string;
  mobileX?: number | string;
  mobileY?: number | string;
  videoSrc?: string;
}

const LoaderOverlay: React.FC<LoaderOverlayProps> = ({
  forceShow = false,
  scale = 1.25,
  x = 0,
  y = 0,
  mobileScale = 2,
  mobileX = 0,
  mobileY = 0,
  videoSrc = '/assets/images/logo/Untitled%20design.mp4',
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const hasFinishedRef = useRef(false);

  // 1. Client-side mount and session guard check
  useEffect(() => {
    setIsMounted(true);

    const urlParams = new URLSearchParams(window.location.search);
    const forceShowParam = urlParams.get('forceShow') === 'true';

    const isReload = (() => {
      try {
        const navs = performance.getEntriesByType('navigation');
        if (navs.length > 0) {
          return (navs[0] as PerformanceNavigationTiming).type === 'reload';
        }
        return performance.navigation.type === 1; // Fallback: TYPE_RELOAD
      } catch (e) {
        return false;
      }
    })();

    const hasPlayed = sessionStorage.getItem('quantum_loader_played') === 'true';
    if (hasPlayed && !forceShow && !forceShowParam && !isReload) {
      setShouldPlay(false);
    } else {
      setShouldPlay(true);
    }
  }, [forceShow]);

  // Handle curtain exit transition
  const finishLoading = () => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;

    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: 'power3.inOut',
        force3D: true,
        onComplete: () => {
          sessionStorage.setItem('quantum_loader_played', 'true');
          document.body.style.overflow = 'unset';
          document.documentElement.style.overflow = 'unset';
        },
      });
    }
  };

  // 2. Setup locking and video play execution
  useEffect(() => {
    if (!shouldPlay) return;

    // Save original overflow styles
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    // Block scrolling while loader is active
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    // Try playing video programmatically
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
      });
    }

    // Safety fallback timeout (6 seconds max duration)
    const fallbackTimer = setTimeout(() => {
      finishLoading();
    }, 6000);

    return () => {
      clearTimeout(fallbackTimer);
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      document.body.style.overflow = originalBodyOverflow || 'unset';
      document.documentElement.style.overflow = originalHtmlOverflow || 'unset';
    };
  }, [shouldPlay]);

  if (!isMounted || !shouldPlay) {
    return null;
  }

  const formatOffset = (val?: number | string) => {
    if (val === undefined) return undefined;
    if (typeof val === 'number') return `${val}px`;
    return val;
  };

  const xDesktop = formatOffset(x) ?? '0px';
  const yDesktop = formatOffset(y) ?? '0px';
  const scaleDesktop = scale ?? 1;

  const xMobile = formatOffset(mobileX ?? x) ?? '0px';
  const yMobile = formatOffset(mobileY ?? y) ?? '0px';
  const scaleMobile = mobileScale ?? scale ?? 1;

  return (
    <>
      <style>{`
        .loader-video-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          overflow: hidden;
          --loader-x: ${xDesktop};
          --loader-y: ${yDesktop};
          --loader-scale: ${scaleDesktop};
        }
        .loader-video-card-wrapper {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transform: translate(var(--loader-x), var(--loader-y)) scale(var(--loader-scale));
          transition: transform 0.2s ease-out;
        }
        .loader-video-element {
          max-width: 90vw;
          max-height: 80vh;
          object-fit: contain;
        }
        .loader-video-card-border-blur {
          display: none;
        }
        @media (max-width: 768px) {
          .loader-video-container {
            --loader-x: ${xMobile};
            --loader-y: ${yMobile};
            --loader-scale: ${scaleMobile};
          }
          .loader-video-element {
            max-width: 100vw;
            max-height: 85vh;
            mask-image: radial-gradient(ellipse 85% 85% at 50% 50%, #000 70%, transparent 100%);
            -webkit-mask-image: radial-gradient(ellipse 85% 85% at 50% 50%, #000 70%, transparent 100%);
          }
          .loader-video-card-border-blur {
            display: block;
            position: absolute;
            inset: -12px;
            pointer-events: none;
            z-index: 10;
            box-shadow: inset 0 0 35px 20px #000000, 0 0 20px 10px #000000;
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            mask-image: radial-gradient(ellipse 75% 75% at 50% 50%, transparent 45%, #000000 80%);
            -webkit-mask-image: radial-gradient(ellipse 75% 75% at 50% 50%, transparent 45%, #000000 80%);
          }
        }
      `}</style>

      <div
        ref={overlayRef}
        className="quantum-loader-overlay"
        data-scale={scale}
        data-x={x}
        data-y={y}
        data-mobile-scale={mobileScale ?? scale}
        data-mobile-x={mobileX ?? x}
        data-mobile-y={mobileY ?? y}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99999,
          backgroundColor: '#000000',
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          willChange: 'transform',
          transform: 'translate3d(0, 0, 0)',
        }}
      >
        <div className="loader-video-container">
          <div className="loader-video-card-wrapper">
            <video
              ref={videoRef}
              src={videoSrc}
              autoPlay
              muted
              playsInline
              preload="auto"
              onEnded={finishLoading}
              className="loader-video-element"
              style={{
                willChange: 'transform',
              }}
            />
            <div className="loader-video-card-border-blur" />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoaderOverlay;



