import React, { useState, useEffect } from 'react';
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

interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  annualPrice: number;
  period: string;
  badge?: string;
  popular?: boolean;
  targetAudience: string;
  deliverables: string[];
  specs: { label: string; value: string }[];
  ctaText: string;
  ctaLink: string;
}

const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'project',
    name: 'Project Edition',
    tagline: 'Standardized NDT interpretation and automated compliance for single infrastructure packages.',
    monthlyPrice: 55000,
    annualPrice: 45000,
    period: 'per month',
    targetAudience: 'Single EPC packages, district bridge maintenance, regional structural consulting firms.',
    deliverables: [
      'Up to 3 active infrastructure project sites',
      '750 automated NDT test-point inferences / mo',
      'Automated IS 456:2000 & IS 13311 (Part 1 & 2) compliance engine',
      'Dual-parameter SonReb regression (Rebound Hammer + UPV)',
      'Statutory PDF & Excel inspection sheets with QR verification',
      'Standard email & portal support (48-hr SLA)',
    ],
    specs: [
      { label: 'Active Sites', value: '3 Projects' },
      { label: 'NDT Inferences', value: '750 / mo' },
      { label: 'IS Codal Engine', value: 'Standard IS 456 & 13311' },
      { label: 'Data Retention', value: '3 Years Cloud' },
      { label: 'Audit Trail', value: 'Standard Cryptographic' },
    ],
    ctaText: 'Start with Project Edition',
    ctaLink: '/contact?plan=project',
  },
  {
    id: 'concessionaire',
    name: 'Concessionaire Edition',
    tagline: 'Complete civil quality control, real-time edge sync, and MoRTH compliance for multi-package corridors.',
    monthlyPrice: 155000,
    annualPrice: 125000,
    period: 'per month',
    badge: 'MOST POPULAR',
    popular: true,
    targetAudience: 'National highway concessionaires (BOT/HAM), metro rail packages, multi-span viaduct assets.',
    deliverables: [
      'Up to 15 concurrent project packages (up to 250 km / 25 viaduct spans)',
      '5,000 automated NDT test-point inferences / mo',
      'MoRTH Section 1700 & IRC:SP:51 automated codal rules engine',
      'Real-time offline edge sync with OX1 mobile terminal firmware',
      'Multi-model consensus cross-checking (SonReb vs Destructive Core)',
      'Autodesk Revit BIM & GIS alignment export overlay',
      'Dedicated structural technical account engineer (4-hr SLA)',
      'Quarterly quarry aggregate calibration coefficient fine-tuning',
    ],
    specs: [
      { label: 'Active Sites', value: '15 Packages / 250 km' },
      { label: 'NDT Inferences', value: '5,000 / mo' },
      { label: 'IS Codal Engine', value: 'IS 456, IS 13311, MoRTH 1700, IRC' },
      { label: 'Data Retention', value: '10 Years Statutory' },
      { label: 'Audit Trail', value: 'Zero-Trust SHA-256' },
    ],
    ctaText: 'Choose Concessionaire Edition',
    ctaLink: '/contact?plan=concessionaire',
  },
  {
    id: 'authority',
    name: 'Authority & Enterprise',
    tagline: 'Sovereign cloud or air-gapped on-premise civil AI platform with unlimited state or national corridor coverage.',
    monthlyPrice: 0,
    annualPrice: 0,
    period: 'custom enterprise quote',
    badge: 'TIER-4 ENTERPRISE',
    targetAudience: 'National Highways Authority of India (NHAI), Metro Rail Corporations, TPQM Agencies, State PWDs.',
    deliverables: [
      'Unlimited project corridors, state-wide bridge asset management',
      'Unlimited high-throughput NDT AI inferences & Bayesian consensus',
      '50-year Service Life & Carbonation / Chloride diffusion modeling',
      'Air-gapped on-premise edge server or Tier-4 sovereign cloud deployment',
      'Quarry-specific continuous aggregate polynomial training pipeline',
      'Custom statutory NHAI/TPQM report formats with automated digital seal',
      '24/7 dedicated mission-critical SLA with 1-hr emergency field response',
      'Full Zero-Trust RBAC with tamper-evident audit ledger',
    ],
    specs: [
      { label: 'Active Sites', value: 'Unlimited Corridors' },
      { label: 'NDT Inferences', value: 'Unlimited Dedicated' },
      { label: 'IS Codal Engine', value: 'All Codal Suites + Custom Rules' },
      { label: 'Data Retention', value: 'Permanent Asset Lifecycle' },
      { label: 'Audit Trail', value: 'Immutable Cryptographic Ledger' },
    ],
    ctaText: 'Contact Enterprise Sales',
    ctaLink: '/contact?plan=enterprise',
  },
];

interface AddonModule {
  name: string;
  description: string;
  pricing: string;
}

const ADDON_MODULES: AddonModule[] = [
  {
    name: 'OX1 Edge Hardware Terminal Lease',
    description: 'Ruggedized IP67 field tablet pre-configured with Bluetooth BLE sensor receivers and offline inference runtime.',
    pricing: '₹18,000 / terminal / month',
  },
  {
    name: '50-Year Service Life & Durability Engine',
    description: 'Fickian chloride diffusion modeling and reinforcement carbonation corrosion risk forecasts under IS 456 Annexure B.',
    pricing: '₹35,000 / month / project',
  },
  {
    name: 'Quarry Aggregate Curve Calibration',
    description: 'Dedicated laboratory core crushing regression service to generate quarry-specific polynomial coefficients a, b, c.',
    pricing: '₹60,000 / quarry batch',
  },
  {
    name: 'Statutory Independent Engineer Audit Portal',
    description: 'Read-only secure verification portal for third-party auditing authorities and NHAI vigilance representatives.',
    pricing: 'Included in Concessionaire & Authority',
  },
];

const FAQS = [
  {
    q: 'How does OUANTUM calculate billing units?',
    a: 'Subscriptions are billed based on active project packages and monthly NDT test inferences. An inference consists of a paired non-destructive reading (such as Rebound Hammer index and Ultrasonic Pulse Velocity transit time) evaluated across our deterministic IS code algorithms.',
  },
  {
    q: 'Can we transition our plan as project phases progress?',
    a: 'Yes. Engineering teams typically begin with the Project Edition during pre-pour mix calibration and upgrade to the Concessionaire Edition during active highway launching or pier casting. Plan upgrades are seamless and non-disruptive.',
  },
  {
    q: 'Is OUANTUM compliant with statutory government procurement?',
    a: 'Yes. OUANTUM is registered and eligible for public and semi-governmental procurement via the Government e-Marketplace (GeM) and state infrastructure tenders. Custom RFP support is available for authorities.',
  },
  {
    q: 'Where is our infrastructure and sensor data stored?',
    a: 'All Customer Data is stored within certified Tier-4 sovereign domestic data centers located in India, fully compliant with national data sovereignty regulations, ISO 27001, and SOC-2 Type II standards.',
  },
  {
    q: 'What occurs if field personnel work in remote locations without internet connectivity?',
    a: 'The OX1 Edge architecture operates fully offline. Field teams can collect, calibrate, and execute local IS code evaluations without any cellular network. When connection is re-established, records securely sync to the cloud repository.',
  },
];

const Pricing: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: 'Platform Pricing & Enterprise Plans | OUANTUM',
    description:
      'Transparent, outcome-based pricing for civil infrastructure quality assurance, NDT analysis, and IS code compliance. Choose from Project, Concessionaire, or Enterprise editions.',
    keywords:
      'OUANTUM pricing, civil engineering software cost, NDT software pricing, IS 456 compliance pricing, NHAI infrastructure audit software, SonReb AI license',
    canonicalPath: '/pricing',
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
          HERO SECTION (Intercom-grade: Clean, confident, unambiguous)
          ========================================================================= */}
      <section
        style={{
          paddingTop: 'clamp(36px, 4.5vw, 60px)',
          paddingBottom: 'clamp(28px, 3.5vw, 44px)',
          background: '#ffffff',
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ maxWidth: '840px', margin: '0 auto', textAlign: 'center' }}>
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
              Predictable, outcome-based pricing for civil structural intelligence.
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
                margin: '0 0 32px 0',
              }}
            >
              Deploy autonomous NDT auditing across highway packages, metro viaducts, and capital project portfolios with zero hidden seat fees.
            </motion.p>

            {/* Annual vs Monthly Toggle */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#f8f8f6',
                padding: '4px',
                borderRadius: 0,
              }}
            >
              <button
                type="button"
                onClick={() => setIsAnnual(false)}
                style={{
                  padding: '8px 18px',
                  fontFamily: 'var(--ic-font-sans)',
                  fontSize: '0.875rem',
                  fontWeight: !isAnnual ? 600 : 500,
                  color: !isAnnual ? '#111111' : '#6a7282',
                  background: !isAnnual ? '#ffffff' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: 0,
                  transition: 'all 0.15s ease',
                }}
              >
                Monthly Billing
              </button>
              <button
                type="button"
                onClick={() => setIsAnnual(true)}
                style={{
                  padding: '8px 18px',
                  fontFamily: 'var(--ic-font-sans)',
                  fontSize: '0.875rem',
                  fontWeight: isAnnual ? 600 : 500,
                  color: isAnnual ? '#111111' : '#6a7282',
                  background: isAnnual ? '#ffffff' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: 0,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.15s ease',
                }}
              >
                <span>Annual Billing</span>
                <span
                  style={{
                    fontFamily: 'var(--ic-font-sans)',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: '#111111',
                    background: '#e8e7df',
                    padding: '2px 6px',
                    borderRadius: 0,
                  }}
                >
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          TIER CARDS GRID (Fin.ai card style: sharp, minimal, zero unnecessary strokes)
          ========================================================================= */}
      <section style={{ padding: '20px 0 80px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 16px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
              alignItems: 'stretch',
            }}
          >
            {PRICING_PLANS.map((plan) => {
              const displayPrice = isAnnual ? plan.annualPrice : plan.monthlyPrice;
              return (
                <div
                  key={plan.id}
                  style={{
                    background: '#f8f8f6',
                    padding: '36px 32px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    borderRadius: 0,
                    boxShadow: 'none',
                  }}
                >
                  <div>
                    {/* Header badge */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <span
                        style={{
                          fontFamily: 'var(--ic-font-sans)',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                          color: '#111111',
                          background: '#ebeae3',
                          padding: '4px 10px',
                          borderRadius: 0,
                        }}
                      >
                        {plan.badge || 'STANDARD'}
                      </span>
                    </div>

                    <h2
                      style={{
                        fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                        fontSize: '1.75rem',
                        fontWeight: 400,
                        letterSpacing: '-0.02em',
                        color: '#111111',
                        margin: '0 0 8px 0',
                      }}
                    >
                      {plan.name}
                    </h2>

                    <p
                      style={{
                        fontFamily: 'var(--ic-font-sans)',
                        fontSize: '0.925rem',
                        lineHeight: 1.55,
                        color: '#4a5565',
                        margin: '0 0 24px 0',
                        minHeight: '44px',
                      }}
                    >
                      {plan.tagline}
                    </p>

                    {/* Price display */}
                    <div style={{ marginBottom: '24px' }}>
                      {displayPrice > 0 ? (
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                          <span
                            style={{
                              fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                              fontSize: '2.5rem',
                              fontWeight: 400,
                              color: '#111111',
                              letterSpacing: '-0.03em',
                            }}
                          >
                            ₹{displayPrice.toLocaleString('en-IN')}
                          </span>
                          <span
                            style={{
                              fontFamily: 'var(--ic-font-sans)',
                              fontSize: '0.875rem',
                              color: '#6a7282',
                            }}
                          >
                            {plan.period}
                          </span>
                        </div>
                      ) : (
                        <div
                          style={{
                            fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                            fontSize: '2.1rem',
                            fontWeight: 400,
                            color: '#111111',
                            letterSpacing: '-0.02em',
                          }}
                        >
                          Custom Quote
                        </div>
                      )}
                      <p
                        style={{
                          fontFamily: 'var(--ic-font-sans)',
                          fontSize: '0.8125rem',
                          color: '#6a7282',
                          margin: '6px 0 0',
                        }}
                      >
                        {plan.targetAudience}
                      </p>
                    </div>

                    {/* CTA Button */}
                    <Link
                      to={plan.ctaLink}
                      className="ic-btn-primary"
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        padding: '12px 20px',
                        fontSize: '0.925rem',
                        fontWeight: 600,
                        borderRadius: 0,
                        textDecoration: 'none',
                        marginBottom: '32px',
                        boxSizing: 'border-box',
                      }}
                    >
                      <span>{plan.ctaText}</span>
                    </Link>

                    {/* Deliverables list */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
                      <span
                        style={{
                          fontFamily: 'var(--ic-font-sans)',
                          fontSize: '0.725rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                          color: '#6a7282',
                        }}
                      >
                        Included Capabilities
                      </span>
                      {plan.deliverables.map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                          <span
                            style={{
                              fontFamily: 'var(--ic-font-mono)',
                              fontSize: '0.75rem',
                              color: '#111111',
                              marginTop: '2px',
                            }}
                          >
                            +
                          </span>
                          <span
                            style={{
                              fontFamily: 'var(--ic-font-sans)',
                              fontSize: '0.875rem',
                              lineHeight: 1.5,
                              color: '#334155',
                            }}
                          >
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Specs Footer */}
                  <div
                    style={{
                      paddingTop: '20px',
                      borderTop: 'none',
                      display: 'grid',
                      gridTemplateColumns: '1fr',
                      gap: '8px',
                      background: '#ffffff',
                      padding: '16px',
                    }}
                  >
                    {plan.specs.map((spec, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                        <span style={{ color: '#6a7282', fontFamily: 'var(--ic-font-sans)' }}>{spec.label}</span>
                        <span style={{ color: '#111111', fontWeight: 600, fontFamily: 'var(--ic-font-sans)' }}>{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          ADD-ONS & EXTENSIONS
          ========================================================================= */}
      <section style={{ padding: '80px 0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ marginBottom: '40px' }}>
            <h2
              style={{
                fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                color: '#111111',
                margin: 0,
              }}
            >
              Tailored modules for high-complexity civil infrastructure.
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {ADDON_MODULES.map((addon, idx) => (
              <div
                key={idx}
                style={{
                  background: '#f8f8f6',
                  padding: '28px',
                  borderRadius: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                      fontSize: '1.2rem',
                      fontWeight: 400,
                      color: '#111111',
                      margin: '0 0 10px 0',
                    }}
                  >
                    {addon.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--ic-font-sans)',
                      fontSize: '0.875rem',
                      lineHeight: 1.6,
                      color: '#4a5565',
                      margin: '0 0 20px 0',
                    }}
                  >
                    {addon.description}
                  </p>
                </div>
                <div
                  style={{
                    fontFamily: 'var(--ic-font-mono)',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: '#111111',
                  }}
                >
                  {addon.pricing}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          PRICING & PROCUREMENT FAQ
          ========================================================================= */}
      <section style={{ padding: '60px 16px 100px', background: '#f4f3ec' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', width: '100%' }}>
          <h2
            style={{
              fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              fontSize: 'clamp(2rem, 3.2vw, 2.75rem)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              color: '#111111',
              margin: '0 auto 36px',
              textAlign: 'center',
              maxWidth: '820px',
            }}
          >
            Frequently asked pricing & procurement questions
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', width: '100%' }}>
              {FAQS.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <div
                    key={i}
                    style={{
                      background: '#ffffff',
                      padding: '20px 24px',
                      borderRadius: 0,
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                        textAlign: 'left',
                        fontFamily: 'var(--ic-font-sans)',
                        fontSize: '1.05rem',
                        fontWeight: 600,
                        color: '#111111',
                      }}
                    >
                      <span>{faq.q}</span>
                      <span style={{ fontSize: '1.25rem', fontFamily: 'var(--ic-font-mono)' }}>
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>
                    {isOpen && (
                      <p
                        style={{
                          fontFamily: 'var(--ic-font-sans)',
                          fontSize: '0.925rem',
                          lineHeight: 1.65,
                          color: '#4a5565',
                          margin: '14px 0 0',
                        }}
                      >
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
        </div>
      </section>
    </main>
  );
};

export default Pricing;
