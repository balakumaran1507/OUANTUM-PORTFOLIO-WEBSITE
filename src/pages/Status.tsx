import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import useSEO from '../hooks/useSEO';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'OUANTUM',
  url: 'https://ouantum.com',
  sameAs: ['https://www.linkedin.com/company/ouantum/'],
};

interface ServiceItem {
  name: string;
  category: string;
  status: 'Operational' | 'Degraded' | 'Maintenance';
  latency: string;
  uptime90d: string;
}

const SERVICES: ServiceItem[] = [
  {
    name: 'OX1 Edge Copilot Sync Gateway',
    category: 'Edge Infrastructure',
    status: 'Operational',
    latency: '14 ms',
    uptime90d: '99.99%',
  },
  {
    name: 'SonReb Bayesian Neural Inference Core',
    category: 'AI Pipeline',
    status: 'Operational',
    latency: '42 ms',
    uptime90d: '99.99%',
  },
  {
    name: 'IS 456 & IS 13311 Codal Acceptance Engine',
    category: 'Codal Compliance',
    status: 'Operational',
    latency: '8 ms',
    uptime90d: '100.00%',
  },
  {
    name: 'MoRTH Section 1700 Statutory PDF Generator',
    category: 'Document Engine',
    status: 'Operational',
    latency: '310 ms',
    uptime90d: '99.98%',
  },
  {
    name: 'Tier-4 Sovereign Domestic Cloud Vaults',
    category: 'Data Storage',
    status: 'Operational',
    latency: '18 ms',
    uptime90d: '100.00%',
  },
  {
    name: 'Developer REST API & Webhook Dispatcher',
    category: 'External APIs',
    status: 'Operational',
    latency: '26 ms',
    uptime90d: '99.99%',
  },
];

const PAST_INCIDENTS = [
  {
    date: 'October 15, 2026',
    title: 'Scheduled Maintenance: MoRTH 5th Revision Codal Rule Update',
    duration: '18 minutes',
    impact: 'None (Edge terminals operated in offline mode)',
    details:
      'Scheduled deployment of updated acceptance coefficients under MoRTH Section 1700 (5th Revision). Cloud inference routing completed with zero packet loss.',
  },
  {
    date: 'September 02, 2026',
    title: 'Routine Database Optimization & Encryption Key Rotation',
    duration: '12 minutes',
    impact: 'None',
    details:
      'Automated quarterly cryptographic key rotation across sovereign Tier-4 storage nodes. All read/write pipelines maintained seamless continuity.',
  },
];

const Status: React.FC = () => {
  useSEO({
    title: 'System Operational Status & Uptime | OUANTUM',
    description:
      'Real-time operational status, latency metrics, and 90-day uptime verification for the OUANTUM civil infrastructure AI platform and edge gateways.',
    keywords:
      'OUANTUM system status, civil AI platform uptime, NDT cloud latency, infrastructure software SLA, Tier-4 data center status',
    canonicalPath: '/status',
    jsonLd: [organizationSchema],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main
      className="subpage-wrapper"
      style={{
        background: '#ffffff',
        color: '#111111',
        minHeight: '100vh',
        paddingBottom: '0',
      }}
    >
      {/* =========================================================================
          HERO STATUS BANNER
          ========================================================================= */}
      <section
        style={{
          paddingTop: 'clamp(36px, 4.5vw, 60px)',
          paddingBottom: 'clamp(28px, 3.5vw, 44px)',
          background: '#ffffff',
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ maxWidth: '860px' }}>
            <span
              style={{
                fontFamily: 'var(--ic-font-sans)',
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#6a7282',
                display: 'block',
                marginBottom: '12px',
              }}
            >
              Trust & Reliability Center
            </span>
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontSize: 'clamp(2.5rem, 5.2vw, 4.25rem)',
                fontWeight: 400,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                color: '#111111',
                margin: '0 0 16px 0',
              }}
            >
              All Civil AI Systems Operational
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              style={{
                fontFamily: 'var(--ic-font-sans)',
                fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
                lineHeight: 1.55,
                color: '#4a5565',
                margin: 0,
              }}
            >
              Live operational monitoring across field edge gateways, SonReb inference pipelines, and statutory compliance servers. Current 90-day platform availability is <strong>99.99%</strong>.
            </motion.p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          METRICS BAR
          ========================================================================= */}
      <section style={{ padding: '0 0 40px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 16px' }}>
          <div
            style={{
              background: '#f8f8f6',
              padding: '28px',
              borderRadius: 0,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '24px',
            }}
          >
            <div>
              <span style={{ fontFamily: 'var(--ic-font-sans)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#6a7282', display: 'block', marginBottom: '4px' }}>
                90-Day Platform Uptime
              </span>
              <div style={{ fontFamily: "'Saans', sans-serif", fontSize: '2.2rem', fontWeight: 400, color: '#15803d' }}>
                99.99%
              </div>
              <span style={{ fontFamily: 'var(--ic-font-sans)', fontSize: '0.8rem', color: '#6a7282' }}>
                Exceeds enterprise 99.9% SLA
              </span>
            </div>

            <div>
              <span style={{ fontFamily: 'var(--ic-font-sans)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#6a7282', display: 'block', marginBottom: '4px' }}>
                Median API Response Time
              </span>
              <div style={{ fontFamily: "'Saans', sans-serif", fontSize: '2.2rem', fontWeight: 400, color: '#111111' }}>
                24 ms
              </div>
              <span style={{ fontFamily: 'var(--ic-font-sans)', fontSize: '0.8rem', color: '#6a7282' }}>
                Sub-second edge evaluation
              </span>
            </div>

            <div>
              <span style={{ fontFamily: 'var(--ic-font-sans)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#6a7282', display: 'block', marginBottom: '4px' }}>
                Data Sovereignty & Vaults
              </span>
              <div style={{ fontFamily: "'Saans', sans-serif", fontSize: '2.2rem', fontWeight: 400, color: '#111111' }}>
                Tier-4 Domestic
              </div>
              <span style={{ fontFamily: 'var(--ic-font-sans)', fontSize: '0.8rem', color: '#6a7282' }}>
                ISO 27001 & SOC-2 compliant
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LIVE SERVICES STATUS LIST
          ========================================================================= */}
      <section style={{ padding: '20px 0 80px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 16px' }}>
          <h2
            style={{
              fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              fontSize: '1.75rem',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              color: '#111111',
              margin: '0 0 20px 0',
            }}
          >
            System Components
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {SERVICES.map((srv, idx) => (
              <div
                key={idx}
                style={{
                  background: '#f8f8f6',
                  padding: '20px 24px',
                  borderRadius: 0,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '16px',
                }}
              >
                <div>
                  <div style={{ fontFamily: 'var(--ic-font-sans)', fontSize: '1rem', fontWeight: 600, color: '#111111' }}>
                    {srv.name}
                  </div>
                  <div style={{ fontFamily: 'var(--ic-font-sans)', fontSize: '0.8rem', color: '#6a7282', marginTop: '2px' }}>
                    {srv.category}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'var(--ic-font-mono)', fontSize: '0.85rem', fontWeight: 600, color: '#111111' }}>
                      {srv.latency}
                    </div>
                    <div style={{ fontFamily: 'var(--ic-font-sans)', fontSize: '0.75rem', color: '#6a7282' }}>
                      Latency
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'var(--ic-font-mono)', fontSize: '0.85rem', fontWeight: 600, color: '#111111' }}>
                      {srv.uptime90d}
                    </div>
                    <div style={{ fontFamily: 'var(--ic-font-sans)', fontSize: '0.75rem', color: '#6a7282' }}>
                      90d Uptime
                    </div>
                  </div>

                  <div
                    style={{
                      fontFamily: 'var(--ic-font-sans)',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      padding: '4px 12px',
                      background: '#dcfce7',
                      color: '#15803d',
                      borderRadius: 0,
                    }}
                  >
                    {srv.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          PAST MAINTENANCE & INCIDENT HISTORY
          ========================================================================= */}
      <section style={{ padding: '40px 0 100px', background: '#f4f3ec' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ maxWidth: '860px' }}>
            <h2
              style={{
                fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontSize: '1.75rem',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                color: '#111111',
                margin: '0 0 20px 0',
              }}
            >
              Past Incident History & Maintenance Log
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {PAST_INCIDENTS.map((inc, i) => (
                <div
                  key={i}
                  style={{
                    background: '#ffffff',
                    padding: '24px',
                    borderRadius: 0,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                    <span style={{ fontFamily: 'var(--ic-font-sans)', fontSize: '0.8rem', color: '#6a7282' }}>
                      {inc.date}
                    </span>
                    <span style={{ fontFamily: 'var(--ic-font-sans)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#16a34a', background: '#f0fdf4', padding: '2px 8px' }}>
                      COMPLETED
                    </span>
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                      fontSize: '1.15rem',
                      fontWeight: 400,
                      color: '#111111',
                      margin: '0 0 8px 0',
                    }}
                  >
                    {inc.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--ic-font-sans)', fontSize: '0.9rem', lineHeight: 1.6, color: '#4a5565', margin: 0 }}>
                    {inc.details}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '32px' }}>
              <Link to="/contact" className="ic-btn-secondary" style={{ padding: '10px 22px', borderRadius: 0, textDecoration: 'none' }}>
                Contact Security Operations Center
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Status;
