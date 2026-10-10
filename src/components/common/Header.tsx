import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface DropdownItem {
  title: string;
  subtitle: string;
  href: string;
}

interface NavLinkItem {
  name: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: DropdownItem[];
}

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpandedNav, setMobileExpandedNav] = useState<string | null>(null);
  const location = useLocation();

  // Close mobile menu and dropdowns when location changes
  useEffect(() => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
    setMobileExpandedNav(null);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (isMenuOpen) {
        setIsVisible(true);
        return;
      }

      const currentScrollY = window.scrollY;
      const scrolledDown = currentScrollY > lastScrollY;
      const pastThreshold = currentScrollY > 60;

      setIsScrolled(pastThreshold);

      // Always show navbar when near top
      if (currentScrollY < 60) {
        setIsVisible(true);
      } else if (scrolledDown) {
        // Scrolling down → hide
        setIsVisible(false);
        setOpenDropdown(null);
      } else {
        // Scrolling up → show
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (window.innerWidth > 1400) {
        setIsMenuOpen(false);
      }
    };

    handleScroll();
    handleResize();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMenuOpen]);

  const navLinks: NavLinkItem[] = [
    { name: 'Capabilities', href: '/capabilities' },
    { name: 'Blog', href: '/blog' },
    {
      name: 'FAQ',
      href: '/faq',
      hasDropdown: true,
      dropdownItems: [
        {
          title: 'FAQ',
          subtitle: 'Technical Questions & Answers',
          href: '/faq',
        },
        {
          title: 'Career',
          subtitle: 'Join The Engineering Team',
          href: '/careers',
        },
      ],
    },
    { name: 'About', href: '/about' },
    {
      name: 'Product',
      href: '/ox1',
      hasDropdown: true,
      dropdownItems: [
        {
          title: 'OX1',
          subtitle: 'Autonomous QA Station',
          href: '/ox1',
        },
      ],
    },
    { name: 'Contact Us', href: '/contact' },
  ];

  // Adjust logo scale, X-axis position, and Y-axis position directly here
  const logoScale = 15.0;
  const logoX = -1.3; // in pixels
  const logoY = 1.3; // in pixels

  return (
    <header
      className={`main-header ${isScrolled ? 'scrolled' : ''}`}
      style={{
        transform: isMenuOpen ? 'translateY(0)' : (isVisible ? 'translateY(0)' : 'translateY(-100%)'),
        transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        ...(isMenuOpen ? {
          backgroundColor: '#000000',
          backdropFilter: 'none',
          WebkitBackdropFilter: 'none',
        } : {}),
      }}
    >

      <div className="container header-container">
        <div className="logo">
          <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="/assets/images/logo_horizontal.png"
              alt="OUANTUM Logo"
              style={{
                height: '24px',
                width: 'auto',
                transform: `scale(${logoScale}) translate(${logoX}px, ${logoY}px)`,
                transformOrigin: 'left center',
                display: 'block',
                filter: 'invert(1)'
              }}
            />
          </Link>
        </div>

        <nav className="desktop-nav">
          <ul>
            {navLinks.map((link) => {
              const isCurrentOrChild =
                location.pathname === link.href ||
                (link.href !== '/' && location.pathname.startsWith(link.href));

              if (link.hasDropdown) {
                const isOpen = openDropdown === link.name;
                return (
                  <li
                    key={link.name}
                    style={{ position: 'relative' }}
                    onMouseEnter={() => setOpenDropdown(link.name)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <Link
                      to={link.href}
                      style={{
                        fontFamily: 'var(--font-adieu)',
                        color: isCurrentOrChild ? '#ffffff' : undefined,
                        transition: 'all 0.2s ease',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      {link.name}
                      <ChevronDown
                        size={12}
                        style={{
                          transition: 'transform 0.25s ease',
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          opacity: 0.7,
                        }}
                      />
                    </Link>

                    {/* Dropdown Menu Box */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.98 }}
                          transition={{ duration: 0.18, ease: 'easeOut' }}
                          style={{
                            position: 'absolute',
                            top: '100%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            paddingTop: '12px',
                            zIndex: 1000,
                          }}
                        >
                          <div
                            style={{
                              width: '240px',
                              backgroundColor: '#0a0a0a',
                              border: '1px solid rgba(255, 255, 255, 0.15)',
                              borderRadius: '14px',
                              padding: '6px',
                              boxShadow: '0 20px 45px rgba(0, 0, 0, 0.85)',
                              backdropFilter: 'blur(20px)',
                              WebkitBackdropFilter: 'blur(20px)',
                            }}
                          >
                            {link.dropdownItems?.map((item) => {
                              const isSubActive = location.pathname === item.href;
                              return (
                                <Link
                                  key={item.title}
                                  to={item.href}
                                  onClick={() => setOpenDropdown(null)}
                                  style={{
                                    display: 'block',
                                    padding: '10px 12px',
                                    borderRadius: '8px',
                                    textDecoration: 'none',
                                    backgroundColor: isSubActive ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                                    transition: 'all 0.15s ease',
                                  }}
                                  onMouseOver={(e) => {
                                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                                  }}
                                  onMouseOut={(e) => {
                                    if (!isSubActive) {
                                      e.currentTarget.style.backgroundColor = 'transparent';
                                    }
                                  }}
                                >
                                  <div
                                    style={{
                                      fontFamily: 'var(--font-adieu)',
                                      fontSize: '0.82rem',
                                      color: '#ffffff',
                                      letterSpacing: '0.08em',
                                      textTransform: 'uppercase',
                                      lineHeight: 1.2,
                                    }}
                                  >
                                    {item.title}
                                  </div>
                                  <div
                                    style={{
                                      fontFamily: 'var(--font-mono)',
                                      fontSize: '0.64rem',
                                      color: 'rgba(255, 255, 255, 0.45)',
                                      letterSpacing: '0.03em',
                                      marginTop: '3px',
                                      lineHeight: 1.3,
                                    }}
                                  >
                                    {item.subtitle}
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              }

              return (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    style={{
                      fontFamily: 'var(--font-adieu)',
                      color: isCurrentOrChild ? '#ffffff' : undefined,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="header-actions">
          {!isMobile && (
            <a
              href="tel:+918610805559"
              style={{
                fontFamily: 'var(--font-adieu)',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                padding: '10px 24px',
                fontWeight: 600,
                backgroundColor: '#ffffff',
                color: '#000000',
                border: 'none',
                borderRadius: '30px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
              }}
            >
              CALL US
            </a>
          )}
          <button
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <nav style={{ width: '100%' }}>
              <ul>
                {navLinks.map((link) => {
                  const isActive =
                    location.pathname === link.href ||
                    (link.href !== '/' && location.pathname.startsWith(link.href));

                  if (link.hasDropdown) {
                    const isMobileOpen = mobileExpandedNav === link.name;
                    return (
                      <li key={link.name}>
                        <div
                          className="mobile-dropdown-trigger"
                          onClick={() => setMobileExpandedNav(isMobileOpen ? null : link.name)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%',
                            cursor: 'pointer',
                            fontFamily: 'var(--font-adieu)',
                            color: isActive ? '#ffffff' : undefined,
                            fontSize: '0.88rem',
                            letterSpacing: '0.06em',
                            textTransform: 'uppercase',
                            paddingTop: '0.35rem',
                            paddingBottom: '0.35rem',
                            borderBottom: 'none',
                            marginBottom: '0.35rem',
                          }}
                        >
                          <span>{link.name}</span>
                          <ChevronDown
                            size={14}
                            style={{
                              transition: 'transform 0.25s ease',
                              transform: isMobileOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                              opacity: 0.6,
                              flexShrink: 0,
                            }}
                          />
                        </div>
                        <AnimatePresence>
                          {isMobileOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25 }}
                              style={{ paddingLeft: '0.75rem', paddingTop: '0.15rem', paddingBottom: '0.35rem', overflow: 'hidden' }}
                            >
                              {link.dropdownItems?.map((item) => (
                                <Link
                                  key={item.title}
                                  to={item.href}
                                  onClick={() => setIsMenuOpen(false)}
                                  className="mobile-submenu-link"
                                  style={{
                                    display: 'block',
                                    padding: '5px 0',
                                    textDecoration: 'none',
                                    borderBottom: 'none',
                                    marginBottom: 0,
                                  }}
                                >
                                  <div
                                    style={{
                                      fontFamily: 'var(--font-adieu)',
                                      fontSize: '0.76rem',
                                      color: location.pathname === item.href ? '#ffffff' : 'rgba(255, 255, 255, 0.75)',
                                      textTransform: 'uppercase',
                                      lineHeight: 1.2,
                                      letterSpacing: '0.05em',
                                    }}
                                  >
                                    {item.title}
                                  </div>
                                  <div
                                    style={{
                                      fontFamily: 'var(--font-mono)',
                                      fontSize: '0.60rem',
                                      color: 'rgba(255, 255, 255, 0.4)',
                                      letterSpacing: '0.03em',
                                      marginTop: '2px',
                                    }}
                                  >
                                    {item.subtitle}
                                  </div>
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </li>
                    );
                  }

                  return (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        style={{
                          fontFamily: 'var(--font-adieu)',
                          color: isActive ? '#ffffff' : undefined,
                          fontSize: '0.88rem',
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                          paddingTop: '0.35rem',
                          paddingBottom: '0.35rem',
                          display: 'block',
                          borderBottom: 'none',
                          marginBottom: '0.35rem',
                        }}
                      >
                        {link.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div style={{ marginTop: 'auto', width: '100%', paddingTop: '2rem' }}>
              <a
                href="tel:+918610805559"
                onClick={() => setIsMenuOpen(false)}
                style={{
                  fontFamily: 'var(--font-adieu)',
                  fontSize: '0.9rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  padding: '16px 32px',
                  fontWeight: 600,
                  backgroundColor: '#ffffff',
                  color: '#000000',
                  border: 'none',
                  borderRadius: '30px',
                  cursor: 'pointer',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.6rem',
                  transition: 'opacity 0.25s ease',
                  textDecoration: 'none',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.opacity = '0.9';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.opacity = '1';
                }}
              >
                <Phone size={18} />
                CALL US
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
