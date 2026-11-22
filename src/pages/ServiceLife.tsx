import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight } from 'lucide-react';
import useSEO from '../hooks/useSEO';

const ServiceLife: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<number>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useSEO({
    title: 'Service Life Prediction Engine 2.0 | OUANTUM Capabilities',
    description:
      '50-year concrete durability and service life modeling. Fickian chloride diffusion, carbonation front progression, and half-cell potential rebar mapping.',
    canonicalPath: '/capabilities/service-life-prediction',
  });

  const scenarios = [
    {
      id: 'COASTAL',
      title: 'Coastal Marine Bridge Pier (Severe Saline Zone)',
      exposure: 'Severe Coastal Saline (Chennai Marina Ennore Basin)',
      coverDepth: '50 mm High Performance Cover',
      carbonationDepth: '14.2 mm @ 20 Years',
      chlorideArrival: 'Year 38 (Depassivation Threshold: 0.05% by mass)',
      projectedLife: '64 Years (With targeted silane impregnation @ Year 30)',
      riskLevel: 'LOW CORROSION RISK (CURRENT)',
      codeLog:
        '>> SOLVE: Fick\'s 2nd Law of Diffusion -> C(x,t) = C_s · [1 - erf(x / 2√(D_app · t))]\n>> PARAMETERS: Apparent diffusion D_app = 3.2 × 10^-12 m²/s, Surface chloride C_s = 2.4%\n>> CARBONATION RATE: x = k · √t (k = 3.18 mm/√year in tropical coastal relative humidity)\n>> PREDICTION: Rebar passive oxide layer remains intact until Year 38.\n>> ACTION: Schedule proactive surface sealer application at Year 30 to extend lifespan to 75+ years.',
    },
    {
      id: 'URBAN',
      title: 'Urban Highway Flyover Pier (High CO₂ Exposure)',
      exposure: 'Heavy Vehicular Carbonation (Delhi NCR / Bengaluru Ring Road)',
      coverDepth: '40 mm Standard Cover',
      carbonationDepth: '22.8 mm @ 15 Years',
      chlorideArrival: 'Year 45 (De-icing salts absent)',
      projectedLife: '42 Years (Critical carbonation alert)',
      riskLevel: 'MODERATE CORROSION RISK',
      codeLog:
        '>> SOLVE: Accelerated carbonation progression under elevated urban atmospheric CO₂ (650 ppm)\n>> PARAMETERS: Water-cement ratio w/c = 0.42, Cement type: OPC with 25% Fly Ash\n>> CARBONATION DEPTH: 22.8 mm observed vs 40 mm cover (57% cover consumed in 15 years)\n>> DEPENETRATION TIME: 27.6 years to rebar depassivation.\n>> ACTION: Anti-carbonation elastomeric barrier coating mandatory within 24 months.',
    },
    {
      id: 'RIVERINE',
      title: 'River Bridge Substructure (Submerged/Atmospheric Cycle)',
      exposure: 'Moderate Splash & Wet-Dry Cycles (Cauvery River Basin)',
      coverDepth: '55 mm Extra Thick Cover',
      carbonationDepth: '8.4 mm @ 25 Years',
      chlorideArrival: 'Year 50+ (Freshwater environment)',
      projectedLife: '85+ Years',
      riskLevel: 'NEGLIGIBLE CORROSION RISK',
      codeLog:
        '>> SOLVE: Saturated pore structure prevents gaseous CO₂ diffusion\n>> PARAMETERS: Relative humidity in submerged zone > 95% (Carbonation rate k ≈ 0.6 mm/√year)\n>> ELECTROCHEMICAL HALF-CELL: E_corr = -140 mV CSE (ASTM C876: >90% probability no corrosion)\n>> RESULT: High durability M45 concrete performing ahead of design life specifications.\n>> STATUS: Certified structural health dossier signed off.',
    },
  ];

  const current = scenarios[selectedScenario];

  const subModels = [
    {
      title: 'Fickian Chloride Diffusion Engine',
      image: '/assets/images/buildings/sub-buildings/image_copy_10.webp',
      imageAlt: 'Non-steady-state chloride ion transport diffusion modeling',
      description:
        'Solves Fick’s Second Law of non-steady-state diffusion to predict chloride ion transport through cover concrete in marine and coastal highway corridors.',
      specs: [
        { text: 'Diffusion formula: C(x,t) = C_s · [1 - erf(x / (2 · √(D_app · t)))]' },
        { text: 'Apparent diffusion coefficient derivation (D_app = 2.0 to 8.5 × 10^-12 m²/s)' },
        { text: 'Critical threshold boundary: 0.05% chloride by weight of concrete' },
        { text: 'Marine zone calibration (atmospheric, tidal splash, and submerged)' },
      ],
    },
    {
      title: 'Carbonation Front Kinetics Modeler',
      image: '/assets/images/buildings/sub-buildings/image_copy_11.webp',
      imageAlt: 'Carbonation front progression modeling under tropical conditions',
      description:
        'Calculates carbonation depth over time under elevated CO₂ atmospheric conditions, calibrated for Indian regional relative humidity and curing methods.',
      specs: [
        { text: 'Carbonation progression formula: x = k · √t' },
        { text: 'Reaction rate coefficient calibration (k = 1.2 to 4.5 mm/√year)' },
        { text: 'Water-cement ratio (w/c) and fly ash / slag blending compensation' },
        { text: 'Predictive alert when carbonation front reaches 70% of rebar cover' },
      ],
    },
    {
      title: 'Electrochemical Corrosion Predictor',
      image: '/assets/images/buildings/sub-buildings/image_copy_12.webp',
      imageAlt: 'Electrochemical half-cell potential mapping and rebar corrosion analysis',
      description:
        'Maps rebar corrosion probability and volumetric oxide expansion using ASTM C876 half-cell potential telemetry and resistivity modeling.',
      specs: [
        { text: 'Half-cell potential interpretation: E_corr < -350 mV CSE = >90% corrosion probability' },
        { text: 'Steel cross-sectional loss rate modeling (µm/year section reduction)' },
        { text: 'Concrete tensile stress generation from rust volume expansion (2.5x to 6x)' },
        { text: 'Cover cracking and spalling risk categorization for bridge decks' },
      ],
    },
    {
      title: 'Preventive Intervention Scheduler',
      image: '/assets/images/buildings/sub-buildings/image_copy_9.webp',
      imageAlt: 'Lifecycle preventive intervention and cathodic protection scheduling',
      description:
        'Optimizes rehabilitation timing, recommending cost-effective silane impregnations or cathodic protection before irreversible structural loss occurs.',
      specs: [
        { text: 'Optimal window determination for hydrophobic silane sealers' },
        { text: 'Migrating corrosion inhibitor (MCI) penetration depth verification' },
        { text: 'Galvanic sacrificial anode patch placement design for joint zones' },
        { text: 'IRC:112:2020 100-year design life compliance dossier generation' },
      ],
    },
  ];

  const benchmarks = [
    { value: '50+ Yrs', label: 'Forecast Horizon', sub: 'Predictive lifecycle modeling' },
    { value: '0.05%', label: 'Chloride Threshold', sub: 'Rebar depassivation limit' },
    { value: 'Up to 80%', label: 'Cost Reduction', sub: 'vs reactive post-spall repair' },
    { value: 'IRC:112', label: 'Durability Norms', sub: 'Bridge life design verified' },
  ];

  const faqs = [
    {
      q: 'How does Fickian diffusion modeling predict concrete bridge life?',
      a: 'The engine implements Fick’s Second Law of non-steady-state diffusion to calculate the time required for external chloride ions or atmospheric carbon dioxide to migrate through the concrete cover layer. When concentrations reach the critical corrosion threshold (typically 0.05% chloride by weight of concrete), the protective alkaline passivating layer on steel rebar breaks down, initiating rust and volumetric expansion.',
    },
    {
      q: 'How does Indian tropical climate affect concrete carbonation rates?',
      a: 'Carbonation occurs fastest when concrete internal relative humidity is between 50% and 70%. In tropical regions like Southern and Western India, alternate monsoon wetting and dry heating cycles accelerate both chemical reaction kinetics and diffusion rates. OUANTUM incorporates regional humidity profiles to prevent premature structural failure.',
    },
    {
      q: 'Can the platform determine exactly when cathodic protection or repair is required?',
      a: 'Yes. Rather than waiting for visible cracking or spalling (which indicates irreversible structural loss), the platform models the exact depassivation timeline years in advance. This allows asset owners to schedule cost-effective protective sealers or cathodic anodes, saving up to 80% compared to full structural rehabilitation.',
    },
    {
      q: 'Does this service life report comply with IRC:112 and Indian bridge norms?',
      a: 'Yes. The predictions and deterioration equations directly align with Indian Roads Congress (IRC:112:2020) Durability Guidelines and BS EN 1504 requirements, providing an audit-ready lifecycle dossier for concessionaires and EPCs.',
    },
  ];

  return (
    <main className="cxm-page" style={{ paddingTop: 0 }} aria-label="Service Life Prediction Engine">
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
              50-Year Lifecycle &amp; Degradation Modeling for Civil Assets
            </h1>

            <p
              style={{
                fontSize: 'clamp(1rem, 1.25vw, 1.15rem)',
                lineHeight: 1.6,
                color: '#4b5563',
                margin: '0 0 28px 0',
              }}
            >
              Fickian chloride diffusion modeling and regional carbonation kinetics that predict the exact year rebar depassivation occurs, scheduling preventive interventions decades before failure.
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
                href="#durability-simulator"
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
                Simulate Exposure Scenarios
                <ArrowRight size={16} />
              </a>
              <Link
                to="/contact?subject=Service%20Life%20Audit%20Consultation"
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
              src="/assets/images/buildings/building-2.png"
              alt="50-year concrete asset durability and degradation modeling"
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
              Most structural management is reactive—discovering damage only after concrete cracks and spalls.{' '}
              <span className="cxm-highlight-chip">Chronos Life</span> is built to be exceptional at one thing: predicting rebar corrosion and durability 50 years ahead of time.
            </div>

            <p className="cxm-manifesto-subtext">
              Built by our civil structural AI team to model Fick’s Second Law of non-steady-state chloride diffusion, carbonation front kinetics in tropical monsoons, and electrochemical half-cell potential mapping: determining the exact year steel depassivation initiates and optimizing preventive maintenance.
            </p>

            <p className="cxm-manifesto-faded">
              <span className="cxm-highlight-chip">Chronos 2.0</span> enables asset concessionaires and highway agencies to <strong>save up to 80% on lifecycle repair costs</strong> by intervening proactively with silane sealers before irreversible concrete spalling occurs.
            </p>
          </motion.div>
        </section>

        {/* ── 3. Model Suite Architecture Breakdown (Clean Grid with Unique Building Images) ── */}
        <section style={{ marginBottom: '56px' }} aria-label="Durability Architecture">
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
              Introducing the Chronos-Life 2.0 Sub-Model Suite
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

        {/* ── 4. Interactive Scenario Simulator ── */}
        <section id="durability-simulator" style={{ background: '#f4f3ec', border: '1px solid rgba(0, 0, 0, 0.07)', borderRadius: 0, padding: 'clamp(32px, 5vw, 56px)', marginBottom: '48px' }} aria-label="Durability Scenario Simulator">
          <div style={{ marginBottom: '2rem' }}>
            <div className="cxm-eyebrow">INTERACTIVE DEGRADATION MODELING</div>
            <h2 className="cxm-suite-title" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)' }}>
              Live Environmental Exposure &amp; Ingress Sandbox
            </h2>
          </div>

          <div className="cxm-sim-tabs">
            {scenarios.map((sc, idx) => (
              <button
                key={sc.id}
                type="button"
                className={`cxm-sim-tab-btn ${selectedScenario === idx ? 'active' : ''}`}
                onClick={() => setSelectedScenario(idx)}
              >
                {sc.title}
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
                Cover Thickness
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111111', marginTop: '6px' }}>
                {current.coverDepth}
              </div>
            </div>

            <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '14px', border: '1px solid rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ic-font-mono)', color: '#6a7282', textTransform: 'uppercase' }}>
                Carbonation Depth
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111111', marginTop: '6px' }}>
                {current.carbonationDepth}
              </div>
            </div>

            <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '14px', border: '1px solid rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ic-font-mono)', color: '#6a7282', textTransform: 'uppercase' }}>
                Chloride Depassivation
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#b91c1c', marginTop: '6px' }}>
                {current.chlorideArrival}
              </div>
            </div>

            <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '14px', border: '1px solid rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--ic-font-mono)', color: '#6a7282', textTransform: 'uppercase' }}>
                Projected Service Life
              </div>
              <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#008138', marginTop: '6px' }}>
                {current.projectedLife}
              </div>
            </div>
          </div>

          <div className="cxm-sim-console">
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{current.codeLog}</pre>
          </div>
        </section>

        {/* ── 5. Technical Benchmarks Strip ── */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '48px' }} aria-label="Service Life Benchmarks">
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
        <section className="cxm-faq-section" aria-label="Service Life FAQs">
          <div style={{ marginBottom: '2.5rem' }}>
            <div className="cxm-eyebrow">DURABILITY PREDICTION &amp; LIFE-CYCLE NORMS</div>
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

export default ServiceLife;
