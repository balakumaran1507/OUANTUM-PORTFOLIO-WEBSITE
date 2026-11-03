import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';

interface DropdownItem {
  title: string;
  subtitle: string;
  href: string;
}

export interface HeaderProps {
  /** Logo: X-axis translation (e.g. 0, 10, -5, "10px", "0.5rem") */
  x?: number | string;
  /** Logo: Y-axis translation (e.g. 0, 5, -2, "5px", "-0.2rem") */
  y?: number | string;
  /** Logo: Scale multiplier (e.g. 1.0, 1.15, 0.9, "1.1") */
  scale?: number | string;

  /** Alias for x */
  logoX?: number | string;
  /** Alias for y */
  logoY?: number | string;
  /** Alias for scale */
  logoScale?: number | string;

  /** Logo: Mobile X-axis translation under 768px */
  mobileX?: number | string;
  /** Logo: Mobile Y-axis translation under 768px */
  mobileY?: number | string;
  /** Logo: Mobile scale multiplier under 768px */
  mobileScale?: number | string;

  /** Alias for mobileX */
  logoMobileX?: number | string;
  /** Alias for mobileY */
  logoMobileY?: number | string;
  /** Alias for mobileScale */
  logoMobileScale?: number | string;

  /** Navigation Links: X-axis translation */
  navX?: number | string;
  /** Navigation Links: Y-axis translation */
  navY?: number | string;
  /** Navigation Links: Scale multiplier */
  navScale?: number | string;

  /** Alias for navX */
  linksX?: number | string;
  /** Alias for navY */
  linksY?: number | string;
  /** Alias for navScale */
  linksScale?: number | string;

  /** Alias for navX */
  navLinksX?: number | string;
  /** Alias for navY */
  navLinksY?: number | string;
  /** Alias for navScale */
  navLinksScale?: number | string;

  /** Navigation Links: Mobile X-axis translation under 768px */
  navMobileX?: number | string;
  /** Navigation Links: Mobile Y-axis translation under 768px */
  navMobileY?: number | string;
  /** Navigation Links: Mobile scale multiplier under 768px */
  navMobileScale?: number | string;

  /** Alias for navMobileX */
  linksMobileX?: number | string;
  /** Alias for navMobileY */
  linksMobileY?: number | string;
  /** Alias for navMobileScale */
  linksMobileScale?: number | string;

  /** Top Announcement Banner: Height in pixels or CSS units */
  bannerHeight?: number | string;
  /** Top Announcement Banner: Background image X-axis offset */
  bannerBgX?: number | string;
  /** Top Announcement Banner: Background image Y-axis offset */
  bannerBgY?: number | string;
  /** Top Announcement Banner: Background image scale multiplier */
  bannerBgScale?: number | string;
  /** Top Announcement Banner: Wording shadow intensity multiplier */
  bannerWordingShadow?: number;
  /** Alias for bannerWordingShadow */
  wordingShadow?: number;
  /** Top Announcement Banner: X button shadow intensity multiplier */
  bannerXBtnShadow?: number;
  /** Alias for bannerXBtnShadow */
  xBtnShadow?: number;
}

/** Configurable navbar top announcement banner parameters */
export const NAVBAR_BANNER_CONFIG = {
  src: '/assets/images/ox1-banner-pixel-sky.jpg',
  height: 42,
  bgX: -17,
  bgY: 1,
  bgScale: 0.52,
  wordingShadow: 0.35,
  xBtnShadow: 0.25,
};

/** Configurable navbar logo parameters */
export const NAVBAR_LOGO_CONFIG = {
  x: -40,
  y: -1,
  scale: 1.0,
  mobileX: 0,
  mobileY: 0,
  mobileScale: 1.0,
};

/** Configurable navbar navigation links parameters */
export const NAVBAR_NAV_CONFIG = {
  x: -40,
  y: 0,
  scale: 1.0,
  mobileX: 0,
  mobileY: 0,
  mobileScale: 1.0,
};

/** Alias for NAVBAR_NAV_CONFIG */
export const NAVBAR_LINKS_CONFIG = NAVBAR_NAV_CONFIG;

const Header: React.FC<HeaderProps> = ({
  x,
  y,
  scale,
  logoX,
  logoY,
  logoScale,
  mobileX,
  mobileY,
  mobileScale,
  logoMobileX,
  logoMobileY,
  logoMobileScale,
  navX,
  navY,
  navScale,
  linksX,
  linksY,
  linksScale,
  navLinksX,
  navLinksY,
  navLinksScale,
  bannerHeight,
  bannerBgX,
  bannerBgY,
  bannerBgScale,
  bannerWordingShadow,
  wordingShadow,
  bannerXBtnShadow,
  xBtnShadow,
}) => {
  const headerRef = useRef<HTMLElement | null>(null);
  const navBarContainerRef = useRef<HTMLDivElement | null>(null);

  const formatOffset = (val?: number | string): string | undefined => {
    if (val === undefined || val === null) return undefined;
    if (typeof val === 'number') return `${val}px`;
    return String(val);
  };

  const formatScale = (val?: number | string): string | undefined => {
    if (val === undefined || val === null) return undefined;
    return String(val);
  };

  // Logo parameters resolution
  const hasPropOrConfigX = x !== undefined || logoX !== undefined || NAVBAR_LOGO_CONFIG.x !== 0;
  const hasPropOrConfigY = y !== undefined || logoY !== undefined || NAVBAR_LOGO_CONFIG.y !== 0;
  const hasPropOrConfigScale = scale !== undefined || logoScale !== undefined || NAVBAR_LOGO_CONFIG.scale !== 1.0;

  const resolvedX = hasPropOrConfigX
    ? (formatOffset(x ?? logoX ?? NAVBAR_LOGO_CONFIG.x) ?? '0px')
    : 'var(--nav-logo-x, 0px)';

  const resolvedY = hasPropOrConfigY
    ? (formatOffset(y ?? logoY ?? NAVBAR_LOGO_CONFIG.y) ?? '0px')
    : 'var(--nav-logo-y, 0px)';

  const resolvedScale = hasPropOrConfigScale
    ? (formatScale(scale ?? logoScale ?? NAVBAR_LOGO_CONFIG.scale) ?? '1')
    : 'var(--nav-logo-scale, 1)';

  // Separate Mobile Logo parameters resolution under 768px
  const resolvedMobileX = formatOffset(mobileX ?? logoMobileX ?? NAVBAR_LOGO_CONFIG.mobileX) ?? 'var(--nav-logo-mobile-x, 0px)';
  const resolvedMobileY = formatOffset(mobileY ?? logoMobileY ?? NAVBAR_LOGO_CONFIG.mobileY) ?? 'var(--nav-logo-mobile-y, 0px)';
  const resolvedMobileScale = formatScale(mobileScale ?? logoMobileScale ?? NAVBAR_LOGO_CONFIG.mobileScale) ?? 'var(--nav-logo-mobile-scale, 1)';

  // Nav links group parameters resolution
  const hasPropOrConfigNavX = navX !== undefined || linksX !== undefined || navLinksX !== undefined || NAVBAR_NAV_CONFIG.x !== 0;
  const hasPropOrConfigNavY = navY !== undefined || linksY !== undefined || navLinksY !== undefined || NAVBAR_NAV_CONFIG.y !== 0;
  const hasPropOrConfigNavScale = navScale !== undefined || linksScale !== undefined || navLinksScale !== undefined || NAVBAR_NAV_CONFIG.scale !== 1.0;

  const resolvedNavX = hasPropOrConfigNavX
    ? (formatOffset(navX ?? linksX ?? navLinksX ?? NAVBAR_NAV_CONFIG.x) ?? '0px')
    : 'var(--nav-links-x, 0px)';

  const resolvedNavY = hasPropOrConfigNavY
    ? (formatOffset(navY ?? linksY ?? navLinksY ?? NAVBAR_NAV_CONFIG.y) ?? '0px')
    : 'var(--nav-links-y, 0px)';

  const resolvedNavScale = hasPropOrConfigNavScale
    ? (formatScale(navScale ?? linksScale ?? navLinksScale ?? NAVBAR_NAV_CONFIG.scale) ?? '1')
    : 'var(--nav-links-scale, 1)';

  // Announcement Banner configurable resolution
  const resolvedBannerHeight = formatOffset(bannerHeight ?? NAVBAR_BANNER_CONFIG.height) ?? '42px';
  const resolvedBannerBgX = formatOffset(bannerBgX ?? NAVBAR_BANNER_CONFIG.bgX) ?? '0px';
  const resolvedBannerBgY = formatOffset(bannerBgY ?? NAVBAR_BANNER_CONFIG.bgY) ?? '0px';
  const resolvedBannerBgScale = formatScale(bannerBgScale ?? NAVBAR_BANNER_CONFIG.bgScale) ?? '1';
  const resolvedWordingShadow = Number(bannerWordingShadow ?? wordingShadow ?? NAVBAR_BANNER_CONFIG.wordingShadow ?? 0.35);
  const resolvedXBtnShadow = Number(bannerXBtnShadow ?? xBtnShadow ?? NAVBAR_BANNER_CONFIG.xBtnShadow ?? 0.25);

  const wordingDropShadow = resolvedWordingShadow > 0
    ? `drop-shadow(0 2px ${Math.round(8 * resolvedWordingShadow)}px rgba(0, 0, 0, ${(0.75 * resolvedWordingShadow).toFixed(2)}))`
    : 'none';

  const xBtnFilter = resolvedXBtnShadow > 0
    ? `drop-shadow(0 1px ${Math.max(1, Math.round(3 * resolvedXBtnShadow))}px rgba(0, 0, 0, ${(0.6 * resolvedXBtnShadow).toFixed(2)}))`
    : 'none';

  const [showBanner, setShowBanner] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [navbarHeight, setNavbarHeight] = useState(104);
  const location = useLocation();

  // Keep mobile menu accurately positioned right beneath the navbar (measuring only the bar, never the drawer)
  const updateNavbarHeight = () => {
    if (navBarContainerRef.current) {
      const h = navBarContainerRef.current.offsetHeight;
      if (h > 0) {
        setNavbarHeight(h);
      }
    }
  };

  // Reset menu and dropdowns on route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
    setOpenSection(null);
  }, [location.pathname]);

  // Recalculate navbar height when banner toggles
  useEffect(() => {
    updateNavbarHeight();
  }, [showBanner]);

  // Sync navbar height and automatically close mobile menu when switching to desktop view (> 1024px)
  useEffect(() => {
    const handleResize = () => {
      updateNavbarHeight();
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };
    updateNavbarHeight();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent background scrolling when mobile menu is open (matching Intercom & Fin.ai)
  useEffect(() => {
    if (isMenuOpen) {
      updateNavbarHeight();
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isMenuOpen]);

  const toggleSection = (section: string) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  // Navigation Items (Exact 1:1 match with Desktop Navigation)
  const productItems: DropdownItem[] = [
    { title: 'OX1 — Omni eXtelligence 1', subtitle: '', href: '/products/ox1' },
  ];

  const capabilityItems: DropdownItem[] = [
    { title: 'NDT Analysis Engine', subtitle: 'Non-destructive testing calculations & calibration', href: '/capabilities/ndt-analysis-engine' },
    { title: 'IS Code Compliance', subtitle: 'Programmatic validation for IS 456, IS 13311 & MoRTH', href: '/capabilities/is-code-compliance' },
    { title: 'Multi-Model Consensus', subtitle: 'Cross-verifying SonReb, UPV, and Core crushing', href: '/capabilities/multi-model-consensus' },
    { title: 'Service Life Prediction', subtitle: '50-year carbonation & reinforcement corrosion modeling', href: '/capabilities/service-life-prediction' },
    { title: 'All Capabilities →', subtitle: 'Explore full suite of structural AI capabilities', href: '/capabilities' },
  ];

  const solutionItems: DropdownItem[] = [
    { title: '28-Day Curing Bottlenecks', subtitle: 'Predict in-situ maturity to safely strip formwork in 3 to 5 days', href: '/solutions/curing-delays' },
    { title: 'Testing Fraud & Paper Logs', subtitle: 'Direct BLE sensor sync with tamper-evident cryptographic audit trails', href: '/solutions/data-tampering' },
    { title: 'Contractor-Authority Disputes', subtitle: 'Zero-dispute consensus for IS 456, IS 13311 & MoRTH milestones', href: '/solutions/milestone-disputes' },
    { title: 'Hidden Voids & Honeycombing', subtitle: 'Acoustic UPV tomography resolving internal defects and tendon duct voids', href: '/solutions/subsurface-voids' },
    { title: '50-Year Structural Corrosion', subtitle: 'Fickian chloride diffusion & reinforcement carbonation risk simulation', href: '/solutions/structural-corrosion' },
    { title: 'All Solutions →', subtitle: 'View highway, metro, precast & bridge solutions', href: '/solutions' },
  ];

  const resourceItems: DropdownItem[] = [
    { title: 'Why Choose OUANTUM?', subtitle: 'Engineered for zero-defect civil infrastructure', href: '/why-choose-ouantum' },
    { title: 'Platform Pricing', subtitle: 'Tiered editions from pilot testing to enterprise', href: '/pricing' },
    { title: 'Integrations', subtitle: 'Hardware, BLE sensors & lab machines', href: '/integrations' },
    { title: 'Interactive Test Simulator', subtitle: 'Live SonReb & UPV strength calculator', href: '/demo' },
    { title: 'Case Studies', subtitle: 'Field benchmarks from national highway projects', href: '/case-studies' },
    { title: 'Knowledge Base & FAQ', subtitle: 'Frequently asked questions & codal standards', href: '/faq' },
    { title: 'Platform Changelog', subtitle: 'Latest releases, engine updates & codal additions', href: '/changelog' },
    { title: 'Engineering Blog', subtitle: 'Deep dives into non-destructive testing & AI', href: '/blog' },
    { title: 'About', subtitle: 'Our mission, team & engineering principles', href: '/about' },
    { title: 'Careers', subtitle: 'Join the team building infrastructure AI', href: '/careers' },
  ];

  return (
    <header
      ref={headerRef}
      className="ic-header"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: '#ffffff',
        border: 'none',
        boxShadow: 'none',
      }}
    >
      <style>{`
        .ic-header-inner {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 16px;
          height: 78px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: height 0.2s ease;
        }

        .ic-header-logo-img {
          --header-logo-x: ${resolvedX};
          --header-logo-y: ${resolvedY};
          --header-logo-scale: ${resolvedScale};
          transform: translate(var(--header-logo-x), var(--header-logo-y)) scale(var(--header-logo-scale));
          transform-origin: left center;
          transition: transform 0.2s ease, height 0.2s ease;
          height: 54px;
          width: auto;
          display: block;
        }

        .ic-desktop-nav {
          --header-nav-x: ${resolvedNavX};
          --header-nav-y: ${resolvedNavY};
          --header-nav-scale: ${resolvedNavScale};
          transform: translate(var(--header-nav-x), var(--header-nav-y)) scale(var(--header-nav-scale));
          transform-origin: left center;
          transition: transform 0.2s ease;
          display: flex;
          align-items: center;
          gap: 32px;
        }

        .ic-mobile-toggle {
          display: none;
        }

        .ic-announcement-banner {
          image-rendering: -webkit-optimize-contrast;
          image-rendering: -moz-crisp-edges;
          image-rendering: pixelated;
          image-rendering: crisp-edges;
        }
        .ic-announcement-banner a,
        .ic-announcement-banner a:hover,
        .ic-announcement-banner a:focus,
        .ic-announcement-banner a:active,
        .ic-announcement-banner .ic-announcement-link,
        .ic-announcement-banner .ic-announcement-link:hover {
          color: #ffffff !important;
          text-decoration: underline !important;
          opacity: 1 !important;
        }

        .ic-banner-text-desktop {
          display: inline-flex !important;
        }
        .ic-banner-text-mobile {
          display: none !important;
        }

        /* Mobile Drawer: strictly hidden on desktop */
        @media (min-width: 1025px) {
          .ic-mobile-drawer {
            display: none !important;
          }
        }

        /* Responsive Breakpoints matching Intercom & Fin.ai */
        @media (max-width: 1024px) {
          .ic-desktop-nav {
            display: none !important;
          }
          .ic-header-contact-link,
          .ic-header-demo-btn {
            display: none !important;
          }
          .ic-mobile-toggle {
            display: flex !important;
            align-items: center;
            justify-content: center;
            width: 42px;
            height: 42px;
            background: transparent;
            border: none;
            cursor: pointer;
            color: #111111;
            padding: 8px;
            border-radius: 6px;
            transition: background-color 0.15s ease;
          }
          .ic-mobile-toggle:hover {
            background-color: rgba(0, 0, 0, 0.05);
          }
        }

        @media (max-width: 768px) {
          .ic-header-inner {
            height: 62px !important;
            padding: 0 16px !important;
          }
          .ic-header-logo-img {
            height: 38px !important;
            --header-logo-x: ${resolvedMobileX};
            --header-logo-y: ${resolvedMobileY};
            --header-logo-scale: ${resolvedMobileScale};
            transform: translate(var(--header-logo-x), var(--header-logo-y)) scale(var(--header-logo-scale)) !important;
          }
          .ic-header-audit-btn {
            padding: 7px 14px !important;
            font-size: 0.8125rem !important;
            font-weight: 600 !important;
          }

          /* Top Banner: On Mobile strictly show "Introducing OX1  Learn more" */
          .ic-banner-text-desktop {
            display: none !important;
          }
          .ic-banner-text-mobile {
            display: inline-flex !important;
            align-items: center !important;
            gap: 6px !important;
          }
          .ic-announcement-banner {
            padding: 8px 36px 8px 16px !important;
          }
        }
      `}</style>

      <div ref={navBarContainerRef} className="ic-header-bar-wrapper" style={{ width: '100%', position: 'relative' }}>
      {/* Top Iridescent Announcement Banner */}
      {showBanner && (
        <div
          className="ic-announcement-banner"
          style={{
            position: 'relative',
            overflow: 'hidden',
            border: 'none',
            minHeight: resolvedBannerHeight,
            height: 'auto',
            padding: '8px 44px 8px 16px',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxSizing: 'border-box',
            backgroundColor: '#0000d4',
            backgroundImage: `url(${NAVBAR_BANNER_CONFIG.src})`,
            backgroundRepeat: 'repeat-x',
            backgroundPosition: `calc(50% + ${resolvedBannerBgX}) calc(50% + ${resolvedBannerBgY})`,
            backgroundSize: resolvedBannerBgScale === '1' ? 'auto' : `calc(1024px * ${resolvedBannerBgScale}) auto`,
          }}
        >
          {/* Desktop wording: "Introducing OX1 — Omni eXtelligence 1 is now available for enterprise civil infrastructure teams. Explore the Engine ->" */}
          <div
            className="ic-banner-text-desktop ic-announcement-content"
            style={{
              position: 'relative',
              zIndex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              textAlign: 'center',
              flexWrap: 'wrap',
              filter: wordingDropShadow,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--ic-font-sans)',
                fontSize: '0.84rem',
                fontWeight: 500,
                letterSpacing: '-0.01em',
              }}
            >
              Introducing OX1 — Omni eXtelligence 1 is now available for enterprise civil infrastructure teams.
            </span>
            <Link
              to="/products/ox1"
              className="ic-announcement-link"
              style={{
                fontFamily: 'var(--ic-font-sans)',
                fontSize: '0.84rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              Explore the Engine <ArrowRight size={13} />
            </Link>
          </div>

          {/* Mobile wording strictly: "Introducing OX1  Learn more" */}
          <div
            className="ic-banner-text-mobile"
            style={{
              position: 'relative',
              zIndex: 1,
              justifyContent: 'center',
              textAlign: 'center',
              filter: wordingDropShadow,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--ic-font-sans)',
                fontSize: '0.8125rem',
                fontWeight: 500,
                letterSpacing: '-0.01em',
                marginRight: '6px',
              }}
            >
              Introducing OX1
            </span>
            <Link
              to="/products/ox1"
              className="ic-announcement-link"
              style={{
                fontFamily: 'var(--ic-font-sans)',
                fontSize: '0.8125rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '3px',
              }}
            >
              Learn more <ArrowRight size={12} />
            </Link>
          </div>

          <button
            onClick={() => setShowBanner(false)}
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'transparent',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '4px',
              zIndex: 2,
              filter: xBtnFilter,
            }}
            aria-label="Dismiss banner"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* Main Navbar with matching 1440px footer margin */}
      <div className="ic-header-inner">
        {/* Left: Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }} aria-label="OUANTUM Home">
            <img
              src="/assets/images/logo_horizontal copy.png"
              alt="OUANTUM"
              className="ic-header-logo-img"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="ic-desktop-nav" aria-label="Main Navigation">
            {/* Products Dropdown */}
            <div
              style={{ position: 'relative' }}
              onMouseEnter={() => setActiveDropdown('products')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Products <ChevronDown size={14} />
              </button>
              <AnimatePresence>
                {activeDropdown === 'products' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="ic-dropdown-box"
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      width: '340px',
                      padding: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                    }}
                  >
                    {productItems.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        style={{
                          textDecoration: 'none',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          display: 'block',
                        }}
                        className="ic-nav-link"
                      >
                        <div className="ic-dropdown-item-title">{item.title}</div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Capabilities Dropdown */}
            <div
              style={{ position: 'relative' }}
              onMouseEnter={() => setActiveDropdown('capabilities')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Capabilities <ChevronDown size={14} />
              </button>
              <AnimatePresence>
                {activeDropdown === 'capabilities' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="ic-dropdown-box"
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      width: '360px',
                      padding: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}
                  >
                    {capabilityItems.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        style={{
                          textDecoration: 'none',
                          padding: '8px 12px',
                          borderRadius: '8px',
                          display: 'block',
                        }}
                        className="ic-nav-link"
                      >
                        <div className="ic-dropdown-item-title">{item.title}</div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Solutions Dropdown */}
            <div
              style={{ position: 'relative' }}
              onMouseEnter={() => setActiveDropdown('solutions')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Solutions <ChevronDown size={14} />
              </button>
              <AnimatePresence>
                {activeDropdown === 'solutions' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="ic-dropdown-box"
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      width: '380px',
                      padding: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}
                  >
                    {solutionItems.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        style={{
                          textDecoration: 'none',
                          padding: '8px 12px',
                          borderRadius: '8px',
                          display: 'block',
                        }}
                        className="ic-nav-link"
                      >
                        <div className="ic-dropdown-item-title">{item.title}</div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Resources Dropdown */}
            <div
              style={{ position: 'relative' }}
              onMouseEnter={() => setActiveDropdown('resources')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Resources <ChevronDown size={14} />
              </button>
              <AnimatePresence>
                {activeDropdown === 'resources' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                    className="ic-dropdown-box"
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      width: '520px',
                      backgroundColor: '#ffffff',
                      borderRadius: '12px',
                      border: '1px solid rgba(0, 0, 0, 0.08)',
                      boxShadow: '0 16px 48px rgba(0, 0, 0, 0.08)',
                      padding: '24px 28px',
                      zIndex: 100,
                    }}
                  >
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1.2fr 1fr',
                        gap: '32px',
                      }}
                    >
                      {/* Left Column: Learn */}
                      <div>
                        <h3
                          style={{
                            fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                            fontSize: '1.05rem',
                            fontWeight: 600,
                            color: '#111111',
                            margin: '0 0 14px 0',
                          }}
                        >
                          Learn
                        </h3>
                        <div
                          style={{
                            borderLeft: '1px solid #e5e7eb',
                            paddingLeft: '14px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px',
                          }}
                        >
                          <Link to="/why-choose-ouantum" className="ic-mega-link">
                            Why Choose OUANTUM?
                          </Link>
                          <Link to="/pricing" className="ic-mega-link">
                            Platform Pricing
                          </Link>
                          <Link to="/demo" className="ic-mega-link">
                            Interactive Test Simulator
                          </Link>
                          <Link to="/case-studies" className="ic-mega-link">
                            Case Studies
                          </Link>
                          <Link to="/blog" className="ic-mega-link">
                            Engineering Blog
                          </Link>
                        </div>
                      </div>

                      {/* Right Column: Support & Company */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        {/* Support */}
                        <div>
                          <h3
                            style={{
                              fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                              fontSize: '1.05rem',
                              fontWeight: 600,
                              color: '#111111',
                              margin: '0 0 14px 0',
                            }}
                          >
                            Support
                          </h3>
                          <div
                            style={{
                              borderLeft: '1px solid #e5e7eb',
                              paddingLeft: '14px',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '12px',
                            }}
                          >
                            <Link to="/faq" className="ic-mega-link">
                              Knowledge Base & FAQ
                            </Link>
                            <Link to="/changelog" className="ic-mega-link">
                              Platform Changelog
                            </Link>
                            <Link to="/integrations" className="ic-mega-link">
                              Civil Engineering Community
                            </Link>
                          </div>
                        </div>

                        {/* Company */}
                        <div>
                          <h3
                            style={{
                              fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                              fontSize: '1.05rem',
                              fontWeight: 600,
                              color: '#111111',
                              margin: '0 0 14px 0',
                            }}
                          >
                            Company
                          </h3>
                          <div
                            style={{
                              borderLeft: '1px solid #e5e7eb',
                              paddingLeft: '14px',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '12px',
                            }}
                          >
                            <Link to="/about" className="ic-mega-link">
                              About
                            </Link>
                            <Link to="/careers" className="ic-mega-link">
                              Careers
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Direct Pricing Link */}
            <Link
              to="/pricing"
              style={{
                padding: '8px 14px',
                fontSize: '0.9rem',
                fontWeight: 500,
                color: '#111111',
                textDecoration: 'none',
                borderRadius: '6px',
              }}
            >
              Pricing
            </Link>
          </nav>
        </div>

        {/* Right Action CTAs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} className="ic-header-actions">
          <Link
            to="/contact"
            className="ic-header-contact-link"
            style={{
              fontSize: '0.875rem',
              fontWeight: 500,
              color: '#111111',
              textDecoration: 'none',
              padding: '8px 14px',
              borderRadius: '6px',
            }}
          >
            Contact
          </Link>

          <Link
            to="/demo"
            className="ic-btn-secondary ic-header-demo-btn"
            style={{ padding: '8px 18px', fontSize: '0.875rem', fontWeight: 500 }}
          >
            Demo
          </Link>

          <Link
            to="/contact"
            className="ic-btn-primary ic-header-audit-btn"
            style={{ padding: '8px 20px', fontSize: '0.875rem', fontWeight: 500 }}
          >
            Start audit
          </Link>

          {/* Intercom-Style Mobile Hamburger Toggle Button */}
          <button
            onClick={() => {
              updateNavbarHeight();
              setIsMenuOpen((prev) => !prev);
            }}
            className="ic-mobile-toggle"
            aria-label={isMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      </div>

      {/* Mobile Navigation Drawer: ALWAYS Below Navbar with Body Scroll Locking */}
      {isMenuOpen && (
        <div
          className="ic-mobile-drawer"
          style={{
            position: 'fixed',
            top: `${navbarHeight}px`,
            left: 0,
            right: 0,
            bottom: 0,
            height: `calc(100dvh - ${navbarHeight}px)`,
            maxHeight: `calc(100dvh - ${navbarHeight}px)`,
            overscrollBehavior: 'contain',
            backgroundColor: '#ffffff',
            zIndex: 99999,
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
            touchAction: 'pan-y',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '16px 20px 32px',
            borderTop: '1px solid rgba(0, 0, 0, 0.08)',
          }}
        >
          {/* Top Accordion Menu List (Exact items from Desktop, NO Captions) */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* 1. Products Section */}
            <div style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.08)' }}>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleSection('products');
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 4px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--ic-font-sans)',
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  color: '#111111',
                  textAlign: 'left',
                }}
              >
                <span>Products</span>
                <ChevronDown
                  size={20}
                  style={{
                    transform: openSection === 'products' ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease',
                    color: '#111111',
                  }}
                />
              </button>
              {openSection === 'products' && (
                <div style={{ display: 'flex', flexDirection: 'column', padding: '0 4px 12px 8px' }}>
                  {productItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      style={{
                        display: 'block',
                        padding: '10px 4px',
                        fontSize: '0.975rem',
                        fontWeight: 500,
                        color: '#222222',
                        textDecoration: 'none',
                      }}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* 2. Capabilities Section */}
            <div style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.08)' }}>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleSection('capabilities');
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 4px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--ic-font-sans)',
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  color: '#111111',
                  textAlign: 'left',
                }}
              >
                <span>Capabilities</span>
                <ChevronDown
                  size={20}
                  style={{
                    transform: openSection === 'capabilities' ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease',
                    color: '#111111',
                  }}
                />
              </button>
              {openSection === 'capabilities' && (
                <div style={{ display: 'flex', flexDirection: 'column', padding: '0 4px 12px 8px' }}>
                  {capabilityItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      style={{
                        display: 'block',
                        padding: '10px 4px',
                        fontSize: '0.975rem',
                        fontWeight: 500,
                        color: '#222222',
                        textDecoration: 'none',
                      }}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* 3. Solutions Section */}
            <div style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.08)' }}>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleSection('solutions');
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 4px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--ic-font-sans)',
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  color: '#111111',
                  textAlign: 'left',
                }}
              >
                <span>Solutions</span>
                <ChevronDown
                  size={20}
                  style={{
                    transform: openSection === 'solutions' ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease',
                    color: '#111111',
                  }}
                />
              </button>
              {openSection === 'solutions' && (
                <div style={{ display: 'flex', flexDirection: 'column', padding: '0 4px 12px 8px' }}>
                  {solutionItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      style={{
                        display: 'block',
                        padding: '10px 4px',
                        fontSize: '0.975rem',
                        fontWeight: 500,
                        color: '#222222',
                        textDecoration: 'none',
                      }}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* 4. Resources Section */}
            <div style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.08)' }}>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleSection('resources');
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 4px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--ic-font-sans)',
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  color: '#111111',
                  textAlign: 'left',
                }}
              >
                <span>Resources</span>
                <ChevronDown
                  size={20}
                  style={{
                    transform: openSection === 'resources' ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease',
                    color: '#111111',
                  }}
                />
              </button>
              {openSection === 'resources' && (
                <div style={{ display: 'flex', flexDirection: 'column', padding: '0 4px 12px 8px' }}>
                  {resourceItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      style={{
                        display: 'block',
                        padding: '10px 4px',
                        fontSize: '0.975rem',
                        fontWeight: 500,
                        color: '#222222',
                        textDecoration: 'none',
                      }}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Direct Pricing Link from Desktop Nav */}
            <Link
              to="/pricing"
              onClick={() => setIsMenuOpen(false)}
              style={{
                fontFamily: 'var(--ic-font-sans)',
                fontSize: '1.05rem',
                fontWeight: 600,
                color: '#111111',
                textDecoration: 'none',
                padding: '16px 4px',
                borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              Pricing
              <ArrowRight size={16} color="#6a7282" />
            </Link>

            {/* Direct Contact Link from Desktop Nav */}
            <Link
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              style={{
                fontFamily: 'var(--ic-font-sans)',
                fontSize: '1.05rem',
                fontWeight: 600,
                color: '#111111',
                textDecoration: 'none',
                padding: '16px 4px',
                borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              Contact
              <ArrowRight size={16} color="#6a7282" />
            </Link>
          </div>

          {/* Bottom Actions matching Desktop Action CTAs */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              marginTop: '28px',
              paddingTop: '16px',
            }}
          >
            <Link
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="ic-btn-primary"
              style={{
                width: '100%',
                padding: '13px 20px',
                fontSize: '0.925rem',
                fontWeight: 600,
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              Start audit
              <ArrowRight size={15} />
            </Link>
            <Link
              to="/demo"
              onClick={() => setIsMenuOpen(false)}
              className="ic-btn-secondary"
              style={{
                width: '100%',
                padding: '12px 20px',
                fontSize: '0.925rem',
                fontWeight: 600,
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              Demo
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
