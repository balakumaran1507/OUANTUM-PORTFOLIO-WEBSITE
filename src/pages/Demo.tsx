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

interface StructuralAssetOption {
  id: string;
  name: string;
  designGrade: string;
  targetMpa: number;
  structureType: string;
  defaultR: number;
  defaultV: number;
}

const ASSET_OPTIONS: StructuralAssetOption[] = [
  {
    id: 'pier-cap',
    name: 'Metro Viaduct Pier Cap',
    designGrade: 'M45',
    targetMpa: 45,
    structureType: 'High-Fatigue Precast Segment',
    defaultR: 39,
    defaultV: 4.32,
  },
  {
    id: 'box-culvert',
    name: '6-Lane Expressway Box Culvert',
    designGrade: 'M35',
    targetMpa: 35,
    structureType: 'Sub-Grade Reinforced Cast-in-Situ',
    defaultR: 34,
    defaultV: 3.92,
  },
  {
    id: 'prestressed-girder',
    name: 'Prestressed Bridge I-Girder',
    designGrade: 'M50',
    targetMpa: 50,
    structureType: 'High-Tensile Post-Tensioned',
    defaultR: 44,
    defaultV: 4.65,
  },
];

const Demo: React.FC = () => {
  const [selectedAsset, setSelectedAsset] = useState<StructuralAssetOption>(ASSET_OPTIONS[0]);
  const [reboundIndex, setReboundIndex] = useState<number>(ASSET_OPTIONS[0].defaultR);
  const [upvVelocity, setUpvVelocity] = useState<number>(ASSET_OPTIONS[0].defaultV);
  const [surfaceCondition, setSurfaceCondition] = useState<'dry' | 'damp' | 'carbonated'>('dry');

  // Booking Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: 'Concessionaire Executive',
    projectScope: 'Highway BOT/HAM Corridor',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useSEO({
    title: 'Interactive Platform Demo & Simulator | OUANTUM',
    description:
      'Test the OUANTUM civil structural AI engine live. Simulate Rebound Hammer and UPV inputs against IS 456 and IS 13311, and schedule an executive technical walkthrough.',
    keywords:
      'OUANTUM demo, civil AI simulator, SonReb calculator online, IS 456 testing simulator, NDT concrete strength calculation, civil infrastructure walkthrough',
    canonicalPath: '/demo',
    jsonLd: [organizationSchema],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAssetSelect = (asset: StructuralAssetOption) => {
    setSelectedAsset(asset);
    setReboundIndex(asset.defaultR);
    setUpvVelocity(asset.defaultV);
  };

  // SonReb Bivariate Regression Calculation (IS 13311 Part 1 & 2 correlation)
  // f_c = a * (R^b) * (V^c)
  // with environmental penalty factors
  const envFactor = surfaceCondition === 'damp' ? 1.08 : surfaceCondition === 'carbonated' ? 0.92 : 1.0;
  const calculatedStrength = Math.round(0.028 * Math.pow(reboundIndex, 1.35) * Math.pow(upvVelocity, 1.82) * envFactor * 10) / 10;
  const isCompliant = calculatedStrength >= selectedAsset.targetMpa;

  // IS 13311 Ultrasonic Velocity Grading Thresholds
  let upvGrading = 'Doubtful';
  if (upvVelocity >= 4.4) upvGrading = 'Excellent';
  else if (upvVelocity >= 3.75) upvGrading = 'Good';
  else if (upvVelocity >= 3.0) upvGrading = 'Medium';

  // Dynamic Modulus of Elasticity in GPa: E_d = rho * V^2 (assuming concrete density 2400 kg/m3)
  const dynamicModulus = Math.round(2400 * Math.pow(upvVelocity * 1000, 2) / 1e9 * 10) / 10;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email.trim()) {
      setSubmitted(true);
    }
  };

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
          HERO SECTION (Clean, confident enterprise presentation)
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
              Interactive Experience
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
              Experience the civil AI engine in real time.
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
              Simulate in-situ non-destructive test readings across structural bridge components, observe instant IS 456 codal compliance verification, and schedule an executive technical demonstration.
            </motion.p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE TEST SIMULATOR
          ========================================================================= */}
      <section style={{ padding: '20px 0 80px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 16px' }}>
          <div
            style={{
              background: '#f8f8f6',
              padding: 'clamp(28px, 4vw, 56px)',
              borderRadius: 0,
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: 'clamp(32px, 5vw, 64px)',
                alignItems: 'flex-start',
              }}
            >
              {/* Left Column: Interactive Controls */}
              <div>
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
                  Step 1: Select Structural Element
                </span>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '32px' }}>
                  {ASSET_OPTIONS.map((asset) => {
                    const isSelected = selectedAsset.id === asset.id;
                    return (
                      <button
                        key={asset.id}
                        type="button"
                        onClick={() => handleAssetSelect(asset)}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '16px 20px',
                          borderRadius: 0,
                          border: 'none',
                          background: isSelected ? '#111111' : '#ffffff',
                          color: isSelected ? '#ffffff' : '#111111',
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <div>
                          <div style={{ fontFamily: 'var(--ic-font-sans)', fontSize: '0.95rem', fontWeight: 600 }}>
                            {asset.name}
                          </div>
                          <div
                            style={{
                              fontFamily: 'var(--ic-font-sans)',
                              fontSize: '0.8rem',
                              color: isSelected ? '#d1d5db' : '#6a7282',
                              marginTop: '2px',
                            }}
                          >
                            {asset.structureType}
                          </div>
                        </div>
                        <span
                          style={{
                            fontFamily: 'var(--ic-font-mono)',
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            background: isSelected ? '#333333' : '#f4f3ec',
                            color: isSelected ? '#ffffff' : '#111111',
                            padding: '4px 10px',
                          }}
                        >
                          {asset.designGrade}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <span
                  style={{
                    fontFamily: 'var(--ic-font-sans)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: '#6a7282',
                    display: 'block',
                    marginBottom: '16px',
                  }}
                >
                  Step 2: Calibrate Field Sensor Readings
                </span>

                {/* Slider: Rebound Index */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <label style={{ fontFamily: 'var(--ic-font-sans)', fontSize: '0.875rem', fontWeight: 600, color: '#111111' }}>
                      Rebound Number (R Index)
                    </label>
                    <span style={{ fontFamily: 'var(--ic-font-mono)', fontSize: '0.925rem', fontWeight: 700, color: '#111111' }}>
                      R = {reboundIndex}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="55"
                    step="1"
                    value={reboundIndex}
                    onChange={(e) => setReboundIndex(Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#111111', cursor: 'pointer' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#6a7282', marginTop: '4px' }}>
                    <span>20 (Weak / Honeycombed)</span>
                    <span>55 (Dense High-Strength)</span>
                  </div>
                </div>

                {/* Slider: UPV Transit Velocity */}
                <div style={{ marginBottom: '28px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <label style={{ fontFamily: 'var(--ic-font-sans)', fontSize: '0.875rem', fontWeight: 600, color: '#111111' }}>
                      Ultrasonic Pulse Velocity (UPV)
                    </label>
                    <span style={{ fontFamily: 'var(--ic-font-mono)', fontSize: '0.925rem', fontWeight: 700, color: '#111111' }}>
                      V = {upvVelocity.toFixed(2)} km/s
                    </span>
                  </div>
                  <input
                    type="range"
                    min="2.8"
                    max="5.0"
                    step="0.05"
                    value={upvVelocity}
                    onChange={(e) => setUpvVelocity(Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#111111', cursor: 'pointer' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#6a7282', marginTop: '4px' }}>
                    <span>2.80 km/s (Doubtful)</span>
                    <span>5.00 km/s (Excellent Homogeneity)</span>
                  </div>
                </div>

                {/* Radio: Surface Condition */}
                <div>
                  <label style={{ fontFamily: 'var(--ic-font-sans)', fontSize: '0.875rem', fontWeight: 600, color: '#111111', display: 'block', marginBottom: '8px' }}>
                    Surface Environmental State
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                    {[
                      { id: 'dry', label: 'Dry Surface' },
                      { id: 'damp', label: 'Wet / Saturated' },
                      { id: 'carbonated', label: 'Carbonated Crust' },
                    ].map((cond) => {
                      const isSel = surfaceCondition === cond.id;
                      return (
                        <button
                          key={cond.id}
                          type="button"
                          onClick={() => setSurfaceCondition(cond.id as any)}
                          style={{
                            padding: '10px 8px',
                            borderRadius: 0,
                            border: 'none',
                            background: isSel ? '#111111' : '#ffffff',
                            color: isSel ? '#ffffff' : '#334155',
                            fontFamily: 'var(--ic-font-sans)',
                            fontSize: '0.8rem',
                            fontWeight: isSel ? 600 : 500,
                            cursor: 'pointer',
                          }}
                        >
                          {cond.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column: Real-Time AI Calculation Output */}
              <div
                style={{
                  background: '#ffffff',
                  padding: 'clamp(28px, 4vw, 40px)',
                  borderRadius: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--ic-font-sans)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        color: '#6a7282',
                      }}
                    >
                      Instantaneous SonReb In-Situ Strength
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--ic-font-sans)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        padding: '3px 8px',
                        background: isCompliant ? '#dcfce7' : '#fee2e2',
                        color: isCompliant ? '#15803d' : '#b91c1c',
                      }}
                    >
                      {isCompliant ? 'IS 456 PASS' : 'FLAGGED NON-CONFORMITY'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <span
                      style={{
                        fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                        fontSize: '3.5rem',
                        fontWeight: 400,
                        color: isCompliant ? '#111111' : '#b91c1c',
                        letterSpacing: '-0.03em',
                        lineHeight: 1,
                      }}
                    >
                      {calculatedStrength}
                    </span>
                    <span style={{ fontFamily: 'var(--ic-font-sans)', fontSize: '1.25rem', color: '#6a7282', fontWeight: 500 }}>
                      MPa
                    </span>
                  </div>

                  <p style={{ fontFamily: 'var(--ic-font-sans)', fontSize: '0.85rem', color: '#6a7282', margin: '8px 0 0' }}>
                    Target Design Strength: <strong style={{ color: '#111111' }}>{selectedAsset.targetMpa} MPa ({selectedAsset.designGrade})</strong>
                  </p>
                </div>

                {/* Analytical breakdown grid */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '16px',
                    padding: '20px 0',
                    borderTop: 'none',
                    borderBottom: 'none',
                  }}
                >
                  <div style={{ background: '#f8f8f6', padding: '14px', borderRadius: 0 }}>
                    <span style={{ fontFamily: 'var(--ic-font-sans)', fontSize: '0.725rem', color: '#6a7282', display: 'block', textTransform: 'uppercase' }}>
                      IS 13311 (Part 1) Grading
                    </span>
                    <span style={{ fontFamily: 'var(--ic-font-sans)', fontSize: '1.1rem', fontWeight: 600, color: '#111111', marginTop: '2px', display: 'block' }}>
                      {upvGrading}
                    </span>
                    <span style={{ fontFamily: 'var(--ic-font-mono)', fontSize: '0.725rem', color: '#6a7282' }}>
                      {upvVelocity.toFixed(2)} km/s acoustic velocity
                    </span>
                  </div>

                  <div style={{ background: '#f8f8f6', padding: '14px', borderRadius: 0 }}>
                    <span style={{ fontFamily: 'var(--ic-font-sans)', fontSize: '0.725rem', color: '#6a7282', display: 'block', textTransform: 'uppercase' }}>
                      Dynamic Modulus (E_d)
                    </span>
                    <span style={{ fontFamily: 'var(--ic-font-sans)', fontSize: '1.1rem', fontWeight: 600, color: '#111111', marginTop: '2px', display: 'block' }}>
                      {dynamicModulus} GPa
                    </span>
                    <span style={{ fontFamily: 'var(--ic-font-mono)', fontSize: '0.725rem', color: '#6a7282' }}>
                      Derived acoustic stiffness
                    </span>
                  </div>
                </div>

                {/* Statutory Verdict Box */}
                <div
                  style={{
                    background: '#f4f3ec',
                    padding: '20px',
                    borderRadius: 0,
                  }}
                >
                  <span style={{ fontFamily: 'var(--ic-font-sans)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#111111', display: 'block', marginBottom: '6px' }}>
                    MoRTH Section 1700 Audit Statement
                  </span>
                  <p style={{ fontFamily: 'var(--ic-font-sans)', fontSize: '0.875rem', lineHeight: 1.55, color: '#334155', margin: 0 }}>
                    {isCompliant
                      ? `Calculated in-situ characteristic strength (${calculatedStrength} MPa) fulfills the statutory characteristic compressive criteria for ${selectedAsset.designGrade} concrete under IS 456 Clause 15. Independent Engineer sign-off recommended.`
                      : `Calculated in-situ strength (${calculatedStrength} MPa) is below the minimum permissible threshold (${selectedAsset.targetMpa} MPa). Automated Non-Conformance Notice (NCR) generated for TPQM verification.`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          EXECUTIVE TECHNICAL DEMONSTRATION BOOKING FORM
          ========================================================================= */}
      <section style={{ padding: '40px 0 100px', background: '#ffffff' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 16px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '48px',
              alignItems: 'flex-start',
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: 'var(--ic-font-sans)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#6a7282',
                  display: 'block',
                  marginBottom: '10px',
                }}
              >
                Executive Consultation
              </span>
              <h2
                style={{
                  fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                  fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  color: '#111111',
                  margin: '0 0 16px 0',
                }}
              >
                Schedule a 1-on-1 technical walkthrough.
              </h2>
              <p
                style={{
                  fontFamily: 'var(--ic-font-sans)',
                  fontSize: '1rem',
                  lineHeight: 1.6,
                  color: '#4a5565',
                  margin: '0 0 24px 0',
                }}
              >
                Our structural engineering leads will review your specific corridor drawings, bridge schedules, or laboratory core testing protocols, and demonstrate the exact deployment workflow for your team.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  'Live Bluetooth BLE probe streaming demonstration with field tablets',
                  'Review of your local aggregate quarry calibration coefficients',
                  'Walkthrough of custom statutory MoRTH / NHAI inspection templates',
                  'Enterprise security and Tier-4 domestic data sovereignty briefing',
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <span style={{ fontFamily: 'var(--ic-font-mono)', fontSize: '0.75rem', color: '#111111', marginTop: '3px' }}>
                      +
                    </span>
                    <span style={{ fontFamily: 'var(--ic-font-sans)', fontSize: '0.9rem', color: '#334155' }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking Form Card */}
            <div
              style={{
                background: '#f8f8f6',
                padding: 'clamp(28px, 4vw, 44px)',
                borderRadius: 0,
              }}
            >
              {!submitted ? (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ fontFamily: 'var(--ic-font-sans)', fontSize: '0.85rem', fontWeight: 600, color: '#111111', display: 'block', marginBottom: '6px' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Er. Rajeshwar Rao"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        background: '#ffffff',
                        border: 'none',
                        borderRadius: 0,
                        fontSize: '0.9rem',
                        fontFamily: 'var(--ic-font-sans)',
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontFamily: 'var(--ic-font-sans)', fontSize: '0.85rem', fontWeight: 600, color: '#111111', display: 'block', marginBottom: '6px' }}>
                      Official Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@concessionaire.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        background: '#ffffff',
                        border: 'none',
                        borderRadius: 0,
                        fontSize: '0.9rem',
                        fontFamily: 'var(--ic-font-sans)',
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                    <div>
                      <label style={{ fontFamily: 'var(--ic-font-sans)', fontSize: '0.85rem', fontWeight: 600, color: '#111111', display: 'block', marginBottom: '6px' }}>
                        Organization Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Company or Authority"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          background: '#ffffff',
                          border: 'none',
                          borderRadius: 0,
                          fontSize: '0.9rem',
                          fontFamily: 'var(--ic-font-sans)',
                          outline: 'none',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ fontFamily: 'var(--ic-font-sans)', fontSize: '0.85rem', fontWeight: 600, color: '#111111', display: 'block', marginBottom: '6px' }}>
                        Your Professional Role
                      </label>
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          background: '#ffffff',
                          border: 'none',
                          borderRadius: 0,
                          fontSize: '0.9rem',
                          fontFamily: 'var(--ic-font-sans)',
                          outline: 'none',
                          boxSizing: 'border-box',
                        }}
                      >
                        <option value="Concessionaire Executive">Concessionaire Executive</option>
                        <option value="Independent Engineer (IE)">Independent Engineer (IE)</option>
                        <option value="Head of Quality (QA/QC)">Head of Quality (QA/QC)</option>
                        <option value="TPQM Consultant">TPQM Consultant</option>
                        <option value="Structural Design Lead">Structural Design Lead</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ fontFamily: 'var(--ic-font-sans)', fontSize: '0.85rem', fontWeight: 600, color: '#111111', display: 'block', marginBottom: '6px' }}>
                      Project Corridor Details & Requirements
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. 84 km Expressway package, 14 viaduct spans, M45 concrete grade verification..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        background: '#ffffff',
                        border: 'none',
                        borderRadius: 0,
                        fontSize: '0.9rem',
                        fontFamily: 'var(--ic-font-sans)',
                        outline: 'none',
                        resize: 'vertical',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="ic-btn-primary"
                    style={{
                      padding: '12px 24px',
                      fontSize: '0.925rem',
                      fontWeight: 600,
                      borderRadius: 0,
                      cursor: 'pointer',
                      border: 'none',
                      marginTop: '8px',
                    }}
                  >
                    Confirm Walkthrough Request
                  </button>
                </form>
              ) : (
                <div style={{ textAlign: 'center', padding: '36px 12px' }}>
                  <h3
                    style={{
                      fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                      fontSize: '1.5rem',
                      fontWeight: 400,
                      color: '#111111',
                      margin: '0 0 10px 0',
                    }}
                  >
                    Walkthrough Request Received
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--ic-font-sans)',
                      fontSize: '0.95rem',
                      lineHeight: 1.6,
                      color: '#4a5565',
                      margin: '0 0 20px 0',
                    }}
                  >
                    Thank you, {formData.name}. Our civil engineering team will reach out to <strong>{formData.email}</strong> within 4 business hours with your dedicated walkthrough agenda.
                  </p>
                  <Link to="/pricing" className="ic-btn-secondary" style={{ padding: '8px 20px', borderRadius: 0, textDecoration: 'none' }}>
                    View Platform Editions
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Demo;