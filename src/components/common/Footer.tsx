import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: '#ffffff',
        border: 'none',
        padding: '64px 16px 40px',
        color: '#111111',
      }}
    >
      <div className="ic-footer-inner" style={{ maxWidth: '1440px', margin: '0 auto', width: '100%' }}>
        {/* Centered Big Logo & Statement Section */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            marginBottom: '40px',
            paddingBottom: '24px',
          }}
        >
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              marginBottom: '16px',
            }}
            aria-label="OUANTUM Home"
          >
            <img
              src="/assets/images/logo_horizontal copy.png"
              alt="OUANTUM Logo"
              style={{
                height: 'clamp(70px, 9vw, 130px)',
                width: 'auto',
                maxWidth: 'min(92vw, 700px)',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </Link>
          <p
            style={{
              fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              fontSize: '1.025rem',
              color: '#4a5565',
              maxWidth: '560px',
              lineHeight: 1.55,
              margin: '0',
              textAlign: 'center',
            }}
          >
            The first AI platform built for civil infrastructure quality assurance, monitoring, and structural auditing.
          </p>
        </div>

        {/* Directory Link Columns - 5 Equal Grid Columns with reduced side gap */}
        <div
          className="ic-footer-cols"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '24px 16px',
            marginBottom: '40px',
            border: 'none',
            paddingBottom: '24px',
          }}
        >
          {/* Col 1 */}
          <div>
            <div style={{ fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontSize: '0.8125rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#111111', marginBottom: '14px' }}>
              Product & Pricing
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link to="/products/ox1" style={{ fontSize: '0.875rem', color: '#111111', fontWeight: 600, textDecoration: 'none', fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>OX1 - Omni eXtelligence 1</Link>
              <Link to="/pricing" style={{ fontSize: '0.875rem', color: '#4a5565', textDecoration: 'none', fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>Platform Pricing & Plans</Link>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <div style={{ fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontSize: '0.8125rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#111111', marginBottom: '14px' }}>
              Capabilities
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link to="/capabilities/ndt-analysis-engine" style={{ fontSize: '0.875rem', color: '#4a5565', textDecoration: 'none', fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>NDT Analysis Engine</Link>
              <Link to="/capabilities/is-code-compliance" style={{ fontSize: '0.875rem', color: '#4a5565', textDecoration: 'none', fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>IS Code Compliance</Link>
              <Link to="/capabilities/multi-model-consensus" style={{ fontSize: '0.875rem', color: '#4a5565', textDecoration: 'none', fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>Multi-Model Consensus</Link>
              <Link to="/capabilities/service-life-prediction" style={{ fontSize: '0.875rem', color: '#4a5565', textDecoration: 'none', fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>Service Life Prediction</Link>
              <Link to="/capabilities" style={{ fontSize: '0.875rem', color: '#4a5565', textDecoration: 'none', fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>All Capabilities</Link>
            </div>
          </div>

          {/* Col 3 */}
          <div>
            <div style={{ fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontSize: '0.8125rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#111111', marginBottom: '14px' }}>
              Solutions & Ecosystem
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link to="/solutions" style={{ fontSize: '0.875rem', color: '#4a5565', textDecoration: 'none', fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>Highway & Metro Solutions</Link>
              <Link to="/integrations" style={{ fontSize: '0.875rem', color: '#4a5565', textDecoration: 'none', fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>Hardware & Sensor Integrations</Link>
              <Link to="/changelog" style={{ fontSize: '0.875rem', color: '#4a5565', textDecoration: 'none', fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>Platform Changelog</Link>
            </div>
          </div>

          {/* Col 4 */}
          <div>
            <div style={{ fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontSize: '0.8125rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#111111', marginBottom: '14px' }}>
              Resources
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link to="/demo" style={{ fontSize: '0.875rem', color: '#4a5565', textDecoration: 'none', fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>Interactive Test Simulator</Link>
              <Link to="/blog" style={{ fontSize: '0.875rem', color: '#4a5565', textDecoration: 'none', fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>Engineering Blog</Link>
              <Link to="/case-studies" style={{ fontSize: '0.875rem', color: '#4a5565', textDecoration: 'none', fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>Case Studies</Link>
              <Link to="/faq" style={{ fontSize: '0.875rem', color: '#4a5565', textDecoration: 'none', fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>Knowledge Base & FAQ</Link>
            </div>
          </div>

          {/* Col 5 */}
          <div>
            <div style={{ fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontSize: '0.8125rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#111111', marginBottom: '14px' }}>
              Company & Contact
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link to="/about" style={{ fontSize: '0.875rem', color: '#4a5565', textDecoration: 'none', fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>About</Link>
              <Link to="/why-choose-ouantum" style={{ fontSize: '0.875rem', color: '#4a5565', textDecoration: 'none', fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>Why Choose OUANTUM?</Link>
              <Link to="/careers" style={{ fontSize: '0.875rem', color: '#4a5565', textDecoration: 'none', fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>Careers</Link>
              <Link to="/contact" style={{ fontSize: '0.875rem', color: '#4a5565', textDecoration: 'none', fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>Contact Us</Link>
              <a href="tel:+917695827158" style={{ fontSize: '0.875rem', color: '#4a5565', textDecoration: 'none', fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>+91 76958 27158</a>
              <a href="https://www.linkedin.com/company/ouantum/" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.875rem', color: '#4a5565', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '3px', fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
                LinkedIn <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar with reduced gaps */}
        <div className="ic-footer-bottom-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', fontSize: '0.8125rem', color: '#6a7282', fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
          <div>
            © 2026 OUANTUM Technologies Inc. All rights reserved.
          </div>

          <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap' }}>
            <Link to="/legal?tab=terms" style={{ color: '#6a7282', textDecoration: 'none' }}>Terms of Service</Link>
            <Link to="/privacy" style={{ color: '#6a7282', textDecoration: 'none' }}>Privacy Policy</Link>
            <Link to="/security" style={{ color: '#6a7282', textDecoration: 'none' }}>Security & Architecture</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
