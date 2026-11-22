import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight } from 'lucide-react';
import useSEO from '../hooks/useSEO';

const Consensus: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<number>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useSEO({
    title: 'Multi-Model Consensus Engine 2.0 | OUANTUM Capabilities',
    description:
      'Tri-model AI consensus cross-verifying non-destructive SonReb, ultrasonic pulse velocity, and physical core crushing under IS 516.',
    canonicalPath: '/capabilities/multi-model-consensus',
  });

  const cases = [
    {
      id: 'CASE-01',
      title: 'Metro Pier 42 (M45 Concrete)',
      agreement: '99.4% Multi-Model Consensus',
      status: 'VERIFIED COMPLIANT',
      model1: 'Empirical SonReb: 46.2 MPa (In-Situ Est.)',
      model2: 'Core Crushing IS 516: 47.1 MPa (Lab True)',
      model3: 'Safety & Defect Classifier: Zero Void / Anomaly',
      variance: '±1.9% Inter-Model Spread',
      codeLog:
        '>> INGEST: Model_1 (SonReb NDT telemetry) -> 46.2 MPa\n>> INGEST: Model_2 (Core compression ASTM C42 / IS 516) -> 47.1 MPa\n>> INGEST: Model_3 (Acoustic attenuation & velocity spectrum) -> PASS\n>> RECONCILE: Weighted Bayesian voting applied\n>> CONSENSUS SCORE: 99.4% agreement -> Confirmed M45 structural sign-off approved.',
    },
    {
      id: 'CASE-02',
      title: 'Viaduct Segment Deck S-08 (M50 Concrete)',
      agreement: '98.8% Multi-Model Consensus',
      status: 'VERIFIED COMPLIANT',
      model1: 'Empirical SonReb: 52.4 MPa (In-Situ Est.)',
      model2: 'Core Crushing IS 516: 53.0 MPa (Lab True)',
      model3: 'Safety & Defect Classifier: High Matrix Density',
      variance: '±1.1% Inter-Model Spread',
      codeLog:
        '>> INGEST: Model_1 (Prestressed box girder NDT scan) -> 52.4 MPa\n>> INGEST: Model_2 (Cylinder test breaks n=6) -> 53.0 MPa\n>> INGEST: Model_3 (Cross-element velocity homogeneity) -> EXCELLENT\n>> RECONCILE: Zero standard deviation conflict found\n>> CONSENSUS SCORE: 98.8% agreement -> Milestone payment certification unlocked.',
    },
    {
      id: 'CASE-03',
      title: 'Abutment Wall A-04 (M35 Suspect Zone)',
      agreement: 'Discrepancy Detected (Re-Test Triggered)',
      status: 'OUTLIER FLAGGED (CARBONATION OVERRIDE)',
      model1: 'Empirical SonReb: 41.2 MPa (Artificially high due to carbonated surface crust)',
      model2: 'Core Crushing IS 516: 31.8 MPa (True Core Low Density)',
      model3: 'Safety & Defect Classifier: High Acoustic Damping Anomaly',
      variance: '±29.5% Inter-Model Conflict',
      codeLog:
        '>> WARNING: Model_1 and Model_2 diverge by > 15% (Threshold exceeded)\n>> DETECT: Model_3 identifies anomalous acoustic attenuation at depth 80mm\n>> RESOLUTION: Carbonation surface hardness bias identified\n>> VERDICT: Automatic non-destructive result rejection -> Core test authoritative.\n>> ACTION: Remedial pressure grouting protocol dispatched.',
    },
  ];

  const current = cases[selectedCase];

  const subModels = [
    {
      title: 'Triangulated Bayesian Solver',
      image: '/assets/images/buildings/sub-buildings/sub-building-9.png',
      imageAlt: 'Bayesian probability consensus across multi-modal sensor arrays',
      description:
        'Executes multi-hypothesis Bayesian probability synthesis across in-situ NDT readings, lab core crushing values, and acoustic attenuation curves to derive confirmed consensus.',
      specs: [
        { text: 'Tri-model weighted evidence scoring across testing modalities' },
        { text: 'Inter-model variance threshold verification (Δ ≤ 12% acceptable envelope)' },
        { text: 'Automatic conflict flagging when empirical and lab destructive tests diverge' },
        { text: 'Cryptographic sign-off hash for every synthesized batch verdict' },
      ],
    },
    {
      title: 'Core-to-NDT Site Calibrator',
      image: '/assets/images/buildings/building-10.png',
      imageAlt: 'Destructive core crushing calibration against non-destructive ultrasonic tests',
      description:
        'Directly ingests laboratory core crushing results under IS 516 / ASTM C42 to automatically fine-tune site-specific SonReb polynomial coefficients for active quarry sources.',
      specs: [
        { text: 'Core test ingestion compliant with IS 516:2021 compression norms' },
        { text: 'Slenderness ratio (h/d) and rebar inclusion geometric corrections' },
        { text: 'Automated coefficient tuning for local batch quarry geology' },
        { text: 'True in-situ characteristic compressive strength confirmation' },
      ],
    },
    {
      title: 'Carbonation Crust & Bias Detector',
      image: '/assets/images/buildings/building-12.png',
      imageAlt: 'Detection of surface carbonation crusts to eliminate false rebound hammer passes',
      description:
        'Identifies artificially high rebound hammer readings caused by surface carbonation in humid tropical zones, protecting owners from hazardous false passes.',
      specs: [
        { text: 'Compares surface hardness index against internal ultrasonic pulse velocity' },
        { text: 'Flags discordant batches where outer hardness conceals inner porosity' },
        { text: 'Automatic override rejecting misleading non-destructive test numbers' },
        { text: 'Dispatches targeted core extraction recommendations for suspect zones' },
      ],
    },
    {
      title: 'TPQM Immutable Dossier Builder',
      image: '/assets/images/buildings/building-4.png',
      imageAlt: 'Tamper-evident third-party quality monitoring digital dossier creation',
      description:
        'Compiles audit-ready Third-Party Quality Monitoring documentation with full mathematical logs and cryptographic verification seals for NHAI and state PWDs.',
      specs: [
        { text: 'Automated TPQM reporting matching Indian government audit standards' },
        { text: 'Raw calculation audit trail with mathematical step-by-step logs' },
        { text: 'Tamper-proof evidence encapsulation with SHA-256 digital seals' },
        { text: 'Multi-party digital sign-off workflow for concessionaire and engineer' },
      ],
    },
  ];

  const benchmarks = [
    { value: '99.4%', label: 'Consensus Agreement', sub: 'Across 400+ audited structures' },
    { value: 'Zero', label: 'False Passes', sub: 'Multi-sensor conflict override' },
    { value: '±1.5%', label: 'Inter-Model Spread', sub: 'On calibrated batch sets' },
    { value: '100%', label: 'Arbitration Defense', sub: 'Immutable mathematical proofs' },
  ];

  const faqs = [
    {
      q: 'How does Multi-Model Consensus eliminate arbitration disputes in civil projects?',
      a: 'In traditional construction audits, disputes frequently arise when non-destructive hammer readings contradict destructive core tests. OUANTUM runs three independent validation engines (Empirical SonReb, Direct Core Calibration under IS 516, and Acoustic Anomaly Modeling). The consensus engine uses Bayesian evidence synthesis to reconcile differences, generating an immutable technical audit report both concessionaires and government reviewers trust.',
    },
    {
      q: 'What happens when NDT results and core crushing tests disagree?',
      a: 'The engine flags the discrepancy immediately. If surface rebound shows high strength but core crushing shows low strength, the system detects surface carbonation bias (common in humid Indian coastal areas) and overrides the rebound value, preventing false passes.',
    },
    {
      q: 'Can the consensus engine calibrate itself directly from site-specific core breaks?',
      a: 'Yes. When destructive core specimens are broken in accordance with IS 516 / ASTM C42, their load-deflection telemetry is fed into the engine to automatically tune localized SonReb polynomial coefficients for that specific batch and quarry source.',
    },
    {
      q: 'Is the consensus audit accepted by National Highway Authority of India (NHAI)?',
      a: 'Yes. The multi-model report conforms to TPQM requirements, providing mathematical proof of testing reliability with zero manual data massaging.',
    },
  ];

  return (
    <main className="cxm-page" style={{ paddingTop: 0 }} aria-label="Multi-Model Consensus Engine">
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
              Tri-Model AI Consensus for Zero-Defect Structural Verification
            </h1>

            <p
              style={{
                fontSize: 'clamp(1rem, 1.25vw, 1.15rem)',
                lineHeight: 1.6,
                color: '#4b5563',
                margin: '0 0 28px 0',
              }}
            >
              Bayesian consensus cross-verifying non-destructive SonReb telemetry, destructive core crushing (IS 516), and acoustic damping to guarantee zero false passes and resolve contractor-client disputes.
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
                href="#case-simulator"
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
                Explore Consensus Cases
                <ArrowRight size={16} />
              </a>
              <Link
                to="/contact?subject=Consensus%20Engine%20Deployment"
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
              src="/assets/images/buildings/building-5.png"
              alt="Multi-model structural consensus and zero-defect validation"
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
              Single-method inspection creates endless arbitration disputes between contractors and authorities.{' '}
              <span className="cxm-highlight-chip">Consensus AI</span> is built to be exceptional at one thing: multi-model validation that guarantees zero false passes.
            </div>

            <p className="cxm-manifesto-subtext">
              Built by our civil structural AI team to cross-verify non-destructive SonReb telemetry, laboratory core crushing under IS 516, and acoustic damping anomaly models. When testing methods diverge, the system isolates the physical cause (such as coastal carbonation bias) and enforces the authoritative ground truth.
            </p>

            <p className="cxm-manifesto-faded">
              <span className="cxm-highlight-chip">Consensus 2.0</span> achieves <strong>99.4% agreement</strong> across multi-model validation sets, eliminates subjective data manipulation, and delivers <strong>mathematically indisputable compliance sign-offs</strong>.
            </p>
          </motion.div>
        </section>

        {/* ── 3. Model Suite Architecture Breakdown (Clean Grid with Unique Building Images) ── */}
        <section style={{ marginBottom: '56px' }} aria-label="Consensus Architecture">
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
              Introducing the Consensus 2.0 Sub-Model Suite
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

        {/* ── 4. Interactive Consensus Case Simulator ── */}
        <section id="case-simulator" style={{ background: '#f4f3ec', border: '1px solid rgba(0, 0, 0, 0.07)', borderRadius: 0, padding: 'clamp(32px, 5vw, 56px)', marginBottom: '48px' }} aria-label="Consensus Case Simulator">
          <div style={{ marginBottom: '2rem' }}>
            <div className="cxm-eyebrow">INTERACTIVE BAYESIAN RECONCILIATION</div>
            <h2 className="cxm-suite-title" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)' }}>
              Live Multi-Model Case Study Sandbox
            </h2>
          </div>

          <div className="cxm-sim-tabs">
            {cases.map((c, idx) => (
              <button
                key={c.id}
                type="button"
                className={`cxm-sim-tab-btn ${selectedCase === idx ? 'active' : ''}`}
                onClick={() => setSelectedCase(idx)}
              >
                {c.title}
              </button>
            ))}
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px',
              marginBottom: '2rem',
            }}
          >
            <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '14px', border: '1px solid rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ic-font-mono)', color: '#6a7282', textTransform: 'uppercase' }}>
                Consensus Score
              </div>
              <div style={{ fontSize: '1.45rem', fontWeight: 700, color: '#111111', marginTop: '6px' }}>
                {current.agreement}
              </div>
            </div>

            <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '14px', border: '1px solid rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ic-font-mono)', color: '#6a7282', textTransform: 'uppercase' }}>
                Inter-Model Variance
              </div>
              <div style={{ fontSize: '1.45rem', fontWeight: 700, color: '#111111', marginTop: '6px' }}>
                {current.variance}
              </div>
            </div>

            <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '14px', border: '1px solid rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ic-font-mono)', color: '#6a7282', textTransform: 'uppercase' }}>
                Model 1 vs Model 2
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginTop: '6px', lineHeight: 1.4 }}>
                {current.model1}
                <br />
                {current.model2}
              </div>
            </div>

            <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '14px', border: '1px solid rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ic-font-mono)', color: '#6a7282', textTransform: 'uppercase' }}>
                Reconciled Status
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#008138', marginTop: '6px' }}>
                {current.status}
              </div>
            </div>
          </div>

          <div className="cxm-sim-console">
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{current.codeLog}</pre>
          </div>
        </section>

        {/* ── 5. Technical Benchmarks Strip ── */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '48px' }} aria-label="Consensus Benchmarks">
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
        <section className="cxm-faq-section" aria-label="Consensus FAQs">
          <div style={{ marginBottom: '2.5rem' }}>
            <div className="cxm-eyebrow">ARBITRATION ELIMINATION &amp; METHODOLOGY</div>
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

export default Consensus;
