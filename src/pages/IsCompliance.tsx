import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight } from 'lucide-react';
import useSEO from '../hooks/useSEO';

const IsCompliance: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useSEO({
    title: 'IS Code Compliance Engine 2.0 | OUANTUM Capabilities',
    description:
      'Programmatic codal verification engine for IS 456, IS 13311, MoRTH Section 1700, and IRC bridge specifications.',
    canonicalPath: '/capabilities/is-code-compliance',
  });

  const subModels = [
    {
      title: 'IS 456:2000 Acceptance Engine',
      image: '/assets/images/buildings/sub-buildings/sub-building-5.png',
      imageAlt: 'IS 456 characteristic compressive strength evaluation and acceptance',
      description:
        'Encodes the complete statistical acceptance logic of IS 456 Clause 15 and Clause 16. Evaluates mean compressive strength, individual sample deviations, and small-batch corrections.',
      specs: [
        { text: 'Clause 15.4 characteristic strength calculation: f_m ≥ f_ck + 0.825 × σ' },
        { text: 'Individual specimen floor verification: f_ci ≥ f_ck - 3.0 MPa' },
        { text: 'Automatic standard deviation (σ) updates based on ongoing batch control history' },
        { text: 'Zero ambiguity: produces cryptographic pass/fail compliance certificates' },
      ],
    },
    {
      title: 'IS 13311 Acoustic Quality Grader',
      image: '/assets/images/buildings/sub-buildings/sub-building-6.png',
      imageAlt: 'IS 13311 non-destructive ultrasonic pulse velocity quality grading',
      description:
        'Instant non-destructive concrete quality grading matching IS 13311 Part 1 Table 2. Categorizes concrete as Excellent, Good, Medium, or Doubtful based on ultrasonic velocity.',
      specs: [
        { text: 'Table 2 pulse velocity thresholds (> 4.40 km/s = Excellent grading)' },
        { text: 'Rebound index uniformity checking in compliance with IS 13311 Part 2' },
        { text: 'Automated trigger protocols dispatching core extraction for Doubtful zones' },
        { text: 'Statistical coefficient of variation (CoV) verification across structural grids' },
      ],
    },
    {
      title: 'MoRTH Section 1700 Highway Solver',
      image: '/assets/images/buildings/sub-buildings/sub-building-7.png',
      imageAlt: 'MoRTH specification validation for highway bridges and viaducts',
      description:
        'Enforces Ministry of Road Transport and Highways (MoRTH) 5th Revision guidelines for highway structures, viaduct piers, and prestressed box girders.',
      specs: [
        { text: 'Clause 1707.3 strict water-cement ratio verification (w/c ≤ 0.40)' },
        { text: '45-minute slump retention and slump-flow uniformity rules for hot weather' },
        { text: 'Prestressed girder prestress transfer strength automated validation' },
        { text: 'Direct NHAI Third-Party Quality Monitoring (TPQM) sign-off formats' },
      ],
    },
    {
      title: 'Aggregate & Sieve Validator (IS 383)',
      image: '/assets/images/buildings/sub-buildings/sub-building-8.png',
      imageAlt: 'IS 383 quarry aggregate gradation and particle shape testing',
      description:
        'Automated mechanical and particle-size analysis checking combined flakiness, elongation, aggregate impact value, and gradation curve envelopes.',
      specs: [
        { text: 'Table 2 coarse aggregate gradation curve envelope matching' },
        { text: 'Combined Flakiness & Elongation Index validation (< 30% threshold)' },
        { text: 'Aggregate impact value (< 30%) and crushing value compliance testing' },
        { text: 'Silt content and deleterious material threshold verification' },
      ],
    },
  ];

  const benchmarks = [
    { value: '100%', label: 'Codal Proof', sub: 'IS 456, 13311 & MoRTH' },
    { value: '0%', label: 'Manual Tampering', sub: 'Cryptographically sealed records' },
    { value: '< 4h', label: 'TPQM Sign-Off', sub: 'vs 14-21 days manual lag' },
    { value: 'Zero', label: 'Compliance Disputes', sub: 'Deterministic rule evaluation' },
  ];

  const faqs = [
    {
      q: 'How does the IS Code Compliance Engine handle ambiguous BIS clauses?',
      a: 'The engine encodes mathematical boundary conditions directly as defined in IS 456:2000, IS 13311, and MoRTH specifications. When standards provide ranges or engineering discretion (e.g. sample size adjustments or standard deviation estimates), the system applies conservative codified tolerances with full mathematical transparency.',
    },
    {
      q: 'Can the platform automatically flag non-conformities before concrete reaches 28 days?',
      a: 'Yes. By running 3-day and 7-day accelerated hydration projections against historical maturity curves, the platform flags low-gain batches early, issuing automatic punchlist notices to concessionaires weeks before standard 28-day cylinder breaks fail.',
    },
    {
      q: 'How are MoRTH and NHAI highway tolerances harmonized with BIS standards?',
      a: 'MoRTH specifications impose tighter water-cement ratio limits, higher minimum cementitious content, and stricter durability requirements than general IS 456 rules. OUANTUM automatically enforces the strictest applicable hierarchy based on the project type selected.',
    },
    {
      q: 'Is the compliance export acceptable for government TPQM audits?',
      a: 'Yes. The generated reports match official Third-Party Quality Monitoring formats specified by NHAI, state PWDs, and municipal corporations, complete with cryptographic verification seals, clause citations, and raw calculation audit trails.',
    },
  ];

  return (
    <main className="cxm-page" style={{ paddingTop: 0 }} aria-label="IS Code Compliance Engine">
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
              Programmatic Validation for Indian Standards &amp; Highway Codal Rules
            </h1>

            <p
              style={{
                fontSize: 'clamp(1rem, 1.25vw, 1.15rem)',
                lineHeight: 1.6,
                color: '#4b5563',
                margin: '0 0 28px 0',
              }}
            >
              Clause-by-clause mathematical verification against IS 456:2000, IS 13311, and MoRTH specifications — catching non-conformities before concrete cures and eliminating paper audit liabilities.
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
                href="#codal-models"
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
                Inspect Codal Rules
                <ArrowRight size={16} />
              </a>
              <Link
                to="/contact?subject=Compliance%20Engine%20Deployment"
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
              src="/assets/images/buildings/building-8.png"
              alt="Codal compliance inspection and regulatory standards verification"
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
        {/* ── 2. Editorial Manifesto Narrative ── */}
        <section style={{ background: '#f4f3ec', border: '1px solid rgba(0, 0, 0, 0.07)', borderRadius: 0, padding: 'clamp(36px, 5vw, 56px)', marginBottom: '48px' }} aria-label="Purpose-Built Statement">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="cxm-manifesto-lead">
              Most quality reports rely on manual spreadsheets with human transcription errors.{' '}
              <span className="cxm-highlight-chip">IS-Audit Engine</span> is built to be exceptional at one thing: mathematical verification against codified BIS &amp; MoRTH standards.
            </div>

            <p className="cxm-manifesto-subtext">
              Built by our civil structural AI team and programmed directly with the clauses, tables, and boundary conditions of IS 456, IS 13311, MoRTH Section 1700, and IRC bridge specifications: ensuring that concrete batches meet codified strength, durability, and workmanship requirements with zero human manipulation.
            </p>

            <p className="cxm-manifesto-faded">
              <span className="cxm-highlight-chip">IS-Audit 2.0</span> delivers <strong>100% clause traceability</strong>, prevents fraudulent test passes, and generates <strong>same-day TPQM dossiers</strong> ready for NHAI and government auditor sign-off.
            </p>
          </motion.div>
        </section>

        {/* ── 3. Model Suite Architecture Breakdown (Clean Grid with Unique Building Images) ── */}
        <section id="codal-models" style={{ marginBottom: '56px' }} aria-label="Compliance Architecture">
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
              Introducing the IS-Audit 2.0 Sub-Model Suite
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '56px' }}>
            {subModels.map((model) => (
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

                {/* Right Side: Description and Specifications without divided lines */}
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
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── 5. Technical Benchmarks Strip ── */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '48px' }} aria-label="Compliance Benchmarks">
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

        {/* ── 6. Technical FAQ Accordion ── */}
        <section className="cxm-faq-section" aria-label="Compliance FAQs">
          <div style={{ marginBottom: '2.5rem' }}>
            <div className="cxm-eyebrow">REGULATORY GOVERNANCE &amp; CODIFIED NORMS</div>
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

export default IsCompliance;
