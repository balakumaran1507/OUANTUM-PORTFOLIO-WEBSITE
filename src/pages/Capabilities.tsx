import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowUpRight, ArrowRight } from 'lucide-react';
import useSEO from '../hooks/useSEO';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'OUANTUM',
  url: 'https://ouantum.com',
  sameAs: ['https://www.linkedin.com/company/ouantum/'],
};

const Capabilities: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: 'Civil AI Model Suite | OUANTUM Platform Capabilities',
    description:
      'Purpose-built civil structural AI models for non-destructive testing (NDT), IS code-compliance auditing, multi-model consensus, and 50-year service life prediction.',
    keywords:
      'OUANTUM capabilities, civil AI models, SonReb AI, NDT analysis engine, IS 456 compliance, multi-model consensus, service life prediction, civil infrastructure QA',
    canonicalPath: '/capabilities',
    jsonLd: [organizationSchema],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const suiteModels = [
    {
      title: 'NDT Analysis Engine (SonReb AI)',
      badge: 'SONREB 2.0',
      badgeType: 'new' as const,
      image: '/assets/images/buildings/sub-buildings/image_copy_2.webp',
      imageAlt: 'Non-destructive testing and SonReb compressive strength calculation',
      path: '/capabilities/ndt-analysis-engine',
      description:
        'Fuses ultrasonic pulse velocity (UPV) and rebound hammer telemetry through bivariate polynomial regression to calculate true in-situ compressive strength without destructive coring.',
      specs: [
        { text: 'Non-linear bivariate polynomial regression (f_c = a · R^b · V^c)' },
        { text: 'Monsoon relative humidity and surface carbonation penalty factors' },
        { text: 'Automated Dixon-Q outlier rejection for anomalous impact angles' },
        { text: 'Same-day compliant audit dossiers for NHAI and metro rail packages' },
      ],
    },
    {
      title: 'IS Code Compliance Engine',
      badge: 'IS-AUDIT 2.0',
      badgeType: 'prod' as const,
      image: '/assets/images/buildings/sub-buildings/image_copy_3.webp',
      imageAlt: 'Automated statutory IS 456, IS 13311 and MoRTH compliance verification',
      path: '/capabilities/is-code-compliance',
      description:
        'Clause-by-clause mathematical verification against IS 456:2000, IS 13311, and MoRTH specifications—catching non-conformities before concrete cures and eliminating paper audit liabilities.',
      specs: [
        { text: 'Clause 15.4 characteristic strength calculation (f_m ≥ f_ck + 0.825 × σ)' },
        { text: 'IS 13311 Part 1 Table 2 pulse velocity threshold evaluation' },
        { text: 'MoRTH Section 1700 w/c ratio and temperature gradient limits' },
        { text: 'Quarry aggregate combined flakiness & elongation index rules' },
      ],
    },
    {
      title: 'Multi-Model Consensus Engine',
      badge: 'CONSENSUS 2.0',
      badgeType: 'prod' as const,
      image: '/assets/images/buildings/sub-buildings/image_copy_4.webp',
      imageAlt: 'Multi-model Bayesian consensus reconciling field testing disparities',
      path: '/capabilities/multi-model-consensus',
      description:
        'Bayesian consensus cross-verifying non-destructive SonReb telemetry, destructive core crushing (IS 516), and acoustic damping to guarantee zero false passes and resolve contractor-client disputes.',
      specs: [
        { text: 'Tri-model weighted evidence scoring across testing modalities' },
        { text: 'Core-to-NDT automatic polynomial coefficient recalibration' },
        { text: 'Discordance detection preventing fraudulent test approvals' },
        { text: 'Audit-ready TPQM reports with cryptographic SHA-256 seals' },
      ],
    },
    {
      title: 'Service Life Prediction (Chronos Life)',
      badge: 'CHRONOS 2.0',
      badgeType: 'prod' as const,
      image: '/assets/images/buildings/sub-buildings/image_copy_5.webp',
      imageAlt: '50-year structural service life and non-linear chloride diffusion simulation',
      path: '/capabilities/service-life-prediction',
      description:
        'Fickian chloride diffusion modeling and regional carbonation kinetics that predict the exact year rebar depassivation occurs, scheduling preventive interventions decades before failure.',
      specs: [
        { text: 'Fick’s Second Law non-steady-state chloride ingress simulation' },
        { text: 'Regional CO₂ carbonation front progression rate modeling (x = k · √t)' },
        { text: 'Half-cell potential (ASTM C876) corrosion probability mapping' },
        { text: 'IRC:112:2020 100-year durability compliance forecasting' },
      ],
    },
  ];

  const benchmarks = [
    { value: '±8%', label: 'Test Variance', sub: 'vs ±25% manual hammer variance' },
    { value: '< 4h', label: 'Audit Turnaround', sub: 'vs 14-21 days manual paperwork' },
    { value: '100%', label: 'Codal Coverage', sub: 'IS 456, IS 13311, MoRTH & IRC' },
    { value: '0%', label: 'Data Tampering', sub: 'Cryptographically sealed audit trails' },
  ];

  const faqs = [
    {
      q: 'How does the OUANTUM Model Suite differ from standard civil QA software?',
      a: 'Most construction QA software consists of form-filling dashboards that simply store whatever numbers humans type in. OUANTUM operates deterministic mathematical engines: fusing raw sensor telemetry (pulse transit time, rebound distance, waveform attenuation), cross-referencing codified clauses from IS 456 / IS 13311, and executing multi-model Bayesian consensus to mathematically prove structural safety.',
    },
    {
      q: 'Are OUANTUM audit outputs acceptable for government TPQM inspections?',
      a: 'Yes. Our generated audit reports match the strict Third-Party Quality Monitoring formats specified by NHAI, state PWDs, metro rail corporations, and central public works bodies, complete with clause citations, calculation logs, and cryptographic verification seals.',
    },
    {
      q: 'Can the models adapt to local aggregate and cement chemistry in India?',
      a: 'Yes. The suite includes site-specific calibration curves for major regional quarry geology (Tamil Nadu black granite, Deccan basalt, dolomitic limestone) and automatically compensates for high tropical relative humidity and coastal marine environments.',
    },
    {
      q: 'How does the suite handle discrepancies between NDT and core crushing?',
      a: 'When non-destructive hammer readings contradict destructive core breaks, the Multi-Model Consensus Engine identifies surface carbonation bias (common in humid coastal zones) and overrides the rebound value, preventing hazardous false passes.',
    },
  ];

  return (
    <main className="cxm-page" style={{ paddingTop: 0 }} aria-label="OUANTUM Capabilities Suite">
      <style>{`
        .cxm-page .ic-hero-section h1,
        .cxm-page .ic-hero-headline,
        .cxm-page .ic-hero-headline span {
          text-align: center !important;
          margin-left: auto !important;
          margin-right: auto !important;
          display: block !important;
          font-family: 'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
          font-weight: 400 !important;
          color: #111111 !important;
          letter-spacing: -0.03em !important;
          line-height: 1.05 !important;
          -webkit-text-fill-color: #111111 !important;
          -webkit-text-stroke: 0px transparent !important;
        }
      `}</style>

      {/* =========================================================================
          1. HERO SECTION (2-Column Layout matching Solution Detail)
          ========================================================================= */}
      <section
        style={{
          padding: 'clamp(48px, 6vw, 76px) 16px 40px',
          background: '#ffffff',
        }}
      >
        <div
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '40px',
            alignItems: 'center',
          }}
        >
          <div>
            <h1
              style={{
                fontSize: 'clamp(2.1rem, 3.8vw, 3.4rem)',
                fontWeight: 400,
                lineHeight: 1.12,
                color: '#111111',
                letterSpacing: '-0.025em',
                margin: '0 0 16px 0',
              }}
            >
              Purpose-Built AI Models for Civil Infrastructure
            </h1>

            <p
              style={{
                fontSize: 'clamp(1rem, 1.25vw, 1.15rem)',
                lineHeight: 1.6,
                color: '#4b5563',
                margin: '0 0 28px 0',
              }}
            >
              OUANTUM's proprietary model suite combines non-destructive testing (NDT), codified IS compliance, multi-model consensus, and 50-year service life forecasting to deliver deterministic structural verification in hours, not weeks.
            </p>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                alignItems: 'center',
              }}
            >
              <a
                href="#model-suite"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '13px 26px',
                  borderRadius: 0,
                  background: '#111111',
                  color: '#ffffff',
                  fontSize: '0.925rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Explore Model Suite
                <ArrowRight size={16} />
              </a>
              <Link
                to="/contact?subject=Platform%20Audit%20Consultation"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '13px 24px',
                  borderRadius: 0,
                  background: '#ffffff',
                  color: '#111111',
                  border: '1px solid #111111',
                  fontSize: '0.925rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Schedule Site Demonstration
              </Link>
            </div>
          </div>

          {/* Hero Visual Card (Matching site card styling) */}
          <div
            style={{
              position: 'relative',
              borderRadius: 0,
              overflow: 'hidden',
              background: '#f4f3ec',
              aspectRatio: '16 / 10',
              border: '1px solid rgba(0, 0, 0, 0.08)',
            }}
          >
            <img
              src="/assets/images/buildings/building-6.png"
              alt="Civil infrastructure structural model suite"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>
        </div>
      </section>

      <div className="cxm-container" style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 16px' }}>
        {/* ── 2. Editorial Manifesto Narrative matching fin.ai/cx-models ── */}
        <section style={{ background: '#f4f3ec', border: '1px solid rgba(0, 0, 0, 0.07)', borderRadius: 0, padding: 'clamp(36px, 5vw, 56px)', marginBottom: '48px' }} aria-label="Purpose-Built Statement">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="cxm-manifesto-lead">
              Most inspection systems are built to be generic dashboards.{' '}
              <span className="cxm-highlight-chip">The OX1 Suite</span> is built to be exceptional at one thing: civil infrastructure quality assurance.
            </div>

            <p className="cxm-manifesto-subtext">
              Built by our civil structural AI team and trained on millions of ultrasonic waveforms, rebound hammer indices, and physical core crushing tests across Indian national highways, metro viaducts, and bridge piers: providing deterministic mathematical calculations, enforcing Indian Standards (IS 456, IS 13311, MoRTH) reliably, and knowing when to flag suspect zones for core verification.
            </p>

            <p className="cxm-manifesto-faded">
              <span className="cxm-highlight-chip">Suite 2.0</span> is our most capable quality intelligence platform to date. Suite 1.0 already outperformed manual paper audits on speed and error elimination. Suite 2.0 builds on that, with <strong>10x faster audit turnarounds</strong>, <strong>zero manual data tampering</strong>, and <strong>100% codified IS 456 & 13311 compliance</strong>.
            </p>
          </motion.div>
        </section>

        {/* ── 3. Model Suite Architecture Breakdown (Clean Grid with Unique Building Images) ── */}
        <section id="model-suite" style={{ marginBottom: '56px' }} aria-label="Model Suite Architectural Grid">
          <div style={{ marginBottom: '32px' }}>
            <h2
              style={{
                fontSize: 'clamp(2rem, 3.6vw, 2.8rem)',
                fontWeight: 400,
                color: '#111111',
                lineHeight: 1.15,
                margin: 0,
              }}
            >
              Introducing the OUANTUM Model Suite
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '56px' }}>
            {suiteModels.map((model) => (
              <motion.div
                key={model.title}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '40px',
                  alignItems: 'center',
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {/* Left Side: Title and Building Image */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h3
                    style={{
                      fontSize: 'clamp(1.4rem, 2.2vw, 1.85rem)',
                      fontWeight: 500,
                      color: '#111111',
                      letterSpacing: '-0.015em',
                      margin: '0 0 16px 0',
                    }}
                  >
                    {model.title}
                  </h3>

                  {/* Building Image with Sharp Corners */}
                  <div
                    style={{
                      width: '100%',
                      height: '240px',
                      borderRadius: 0,
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={model.image}
                      alt={model.imageAlt}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        borderRadius: 0,
                      }}
                    />
                  </div>
                </div>

                {/* Right Side: Description, Specs, and Link */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <p
                    style={{
                      fontSize: '1.025rem',
                      lineHeight: 1.65,
                      color: '#374151',
                      margin: '0 0 24px 0',
                    }}
                  >
                    {model.description}
                  </p>

                  <div
                    style={{
                      fontSize: '0.75rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: '#111111',
                      fontWeight: 700,
                      marginBottom: '12px',
                    }}
                  >
                    SPECIFICATION
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {model.specs.map((spec, sIdx) => (
                      <div
                        key={sIdx}
                        style={{
                          display: 'flex',
                          gap: '12px',
                          alignItems: 'baseline',
                          padding: '4px 0',
                          fontSize: '0.925rem',
                          lineHeight: 1.5,
                          color: '#374151',
                        }}
                      >
                        <span
                          style={{
                            width: '5px',
                            height: '5px',
                            borderRadius: '50%',
                            backgroundColor: '#111111',
                            display: 'inline-block',
                            flexShrink: 0,
                            transform: 'translateY(-2px)',
                          }}
                        />
                        <span>{spec.text}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: '24px' }}>
                    <Link
                      to={model.path}
                      style={{
                        fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                        fontSize: '0.925rem',
                        fontWeight: 600,
                        color: '#111111',
                        textDecoration: 'underline',
                        textUnderlineOffset: '4px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.opacity = '0.7')}
                      onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
                    >
                      EXPLORE {model.title.toUpperCase()} SPECIFICATIONS <ArrowUpRight size={15} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── 4. Technical Benchmarks Strip ── */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '48px' }} aria-label="Platform Benchmarks">
          {benchmarks.map((b, idx) => (
            <motion.div
              key={idx}
              style={{ background: '#f4f3ec', border: '1px solid rgba(0, 0, 0, 0.07)', borderRadius: 0, padding: '28px 24px', textAlign: 'center' }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <div className="cxm-benchmark-val">{b.value}</div>
              <div className="cxm-benchmark-label">{b.label}</div>
              <div className="cxm-benchmark-sub">{b.sub}</div>
            </motion.div>
          ))}
        </section>

        {/* ── 5. Technical FAQ Accordion ── */}
        <section className="cxm-faq-section" aria-label="Technical FAQs">
          <div style={{ marginBottom: '2.5rem' }}>
            <div className="cxm-eyebrow">ENGINEERING SPECIFICATIONS &amp; GOVERNANCE</div>
            <h2 className="cxm-suite-title" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)' }}>
              Frequently Asked Questions
            </h2>
          </div>

          <div className="cxm-faq-list">
            {faqs.map((faq, idx) => (
              <div key={idx} className="cxm-faq-item">
                <button
                  type="button"
                  className="cxm-faq-question"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  aria-expanded={openFaq === idx}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={18}
                    style={{
                      transform: openFaq === idx ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.25s ease',
                      flexShrink: 0,
                    }}
                  />
                </button>
                {openFaq === idx && <div className="cxm-faq-answer">{faq.a}</div>}
              </div>
            ))}
          </div>
        </section>


      </div>
    </main>
  );
};

export default Capabilities;
