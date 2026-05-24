import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Problem', href: '/#problem' },
    { name: 'Core', href: '/#activities' },
    { name: 'Flow', href: '/#how-it-works' },
    { name: 'Difference', href: '/#difference' },
    { name: 'Partners', href: '/#partners' },
    { name: 'Nodes', href: '/#geography' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'About', href: '/about' },
    { name: 'Careers', href: '/careers' },
  ];

  return (
    <header className={`main-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        <div className="logo">
          <a href="/" style={{ fontFamily: 'var(--font-adieu)', letterSpacing: '-0.02em' }}>Ouantum</a>
        </div>

        <nav className="desktop-nav">
          <ul>
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} style={{ fontFamily: 'var(--font-adieu)' }}>{link.name}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <Link to="/contact" className="contact-btn" style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            padding: '10px 24px',
            background: '#fff',
            color: '#000',
            borderRadius: '30px',
            textDecoration: 'none',
            display: 'inline-block',
            fontWeight: 600
          }}>
            Contact Us
          </Link>
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
            <nav>
              <ul>
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} onClick={() => setIsMenuOpen(false)} style={{ fontFamily: 'var(--font-adieu)' }}>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
