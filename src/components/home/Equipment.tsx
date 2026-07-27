import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WordHover } from '@/components/common/WordHover';
import { ChevronRight } from 'lucide-react';

const machineData = [
  {
    id: '01',
    name: 'SonReb Calculation Engine',
    category: 'DETERMINISTIC CORE',
    specs: 'IS 13311 · IS 456 · SonReb Correlation',
    image: '/assets/images/cl4.png',
    details: 'Combines Rebound Hammer (RH) and Ultrasonic Pulse Velocity (UPV) readings using the SonReb method, producing a more accurate concrete strength estimate than either test alone. Every calculation is deterministic: established civil engineering formulas, not AI guesses. Results are instantly cross-referenced against IS 13311 and IS 456 design grade requirements.',
    tech: 'RULE ENGINE',
    tolerance: 'ZERO APPROXIMATION',
    status: 'ONLINE',
  },
  {
    id: '02',
    name: 'Multi-Model AI Consensus',
    category: 'INTELLIGENCE LAYER',
    specs: 'Claude AI · 3-Model Validation',
    image: '/assets/images/industrial-part.png',
    details: 'Every structural assessment is independently evaluated by three AI models: a Code Specialist (hard IS code limits), a Structural Safety Analyst (load-bearing context and safety margins), and a Pattern Intelligence engine (cross-project trends, contractor history, material batch tracking). All three must reach consensus before a result is confirmed. Disagreement triggers mandatory senior engineer review.',
    tech: 'CONSENSUS AI',
    tolerance: '3-MODEL AGREEMENT',
    status: 'ONLINE',
  },
  {
    id: '03',
    name: 'Service Life Prediction',
    category: 'PREDICTIVE ANALYTICS',
    specs: 'Tuutti Model · ASTM C876 · IS 456',
    image: '/assets/images/project-pipeline.png',
    details: 'For structural audit assignments, the platform combines carbonation depth, chloride content, and half-cell potential readings to predict remaining structural service life. Outputs include estimated years to corrosion initiation, recommended intervention window, and priority classification, all per the Tuutti model and IS 456 durability provisions.',
    tech: 'PREDICTIVE MODEL',
    tolerance: 'SERVICE LIFE OUTPUT',
    status: 'ONLINE',
  },
  {
    id: '04',
    name: 'Automated Government Reports',
    category: 'OUTPUT LAYER',
    specs: 'APCRDA · TNHB · ADB · NABL',
    image: '/assets/images/gears.png',
    details: 'The platform auto-generates complete assessment reports in the exact format required by government authorities - AP Capital Region Development Authority, Tamil Nadu Housing Board, Tamil Nadu Urban Habitat Development Board, and Asian Development Bank funded project formats. Includes IS code references, element-wise findings, condition grading (Good / Satisfactory / Poor / Critical), and engineer recommendations. Ready for digital sign-off within the same site visit day.',
    tech: 'REPORT ENGINE',
    tolerance: 'SAME-DAY DELIVERY',
    status: 'ONLINE',
  },
];

const fleetStats = [
  { label: 'REPORT COMPRESSION', value: '10×', unit: 'FASTER' },
  { label: 'AI MODELS', value: '3', unit: 'CONSENSUS' },
  { label: 'IS CODES INDEXED', value: '8+', unit: 'STANDARDS' },
  { label: 'ASSESSMENT TIME', value: '<4', unit: 'HOURS' },
];

const Equipment = () => {
  const [active, setActive] = useState(0);
  const [activeStat, setActiveStat] = useState<number | null>(null);

  return (
    <section id="equipment" className="equipment-section">
      <div className="container">

        {/* ── Header ── */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="equipment-header"
        >
          <h2 className="equipment-title">
            How the<br />AI Works
          </h2>
          <p className="equipment-subtitle">
            <WordHover text="Deterministic math first. AI second. Every result is context-aware, audit-ready, and validated by three independent models before it is confirmed." />
          </p>
        </motion.div>

        {/* ── Main Layout ── */}
        <motion.div
          animate="visible"
          className="equipment-grid"
        >
          {/* LEFT - machine selector list */}
          <div className="equipment-list">
            {machineData.map((m, idx) => {
              const isActive = active === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActive(idx)}
                  className={`equipment-item ${isActive ? 'active' : ''}`}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                    <h3 className="equipment-item-name">
                      {m.name}
                    </h3>
                  </div>
                  <div style={{ opacity: isActive ? 1 : 0.2, transition: 'all 0.4s ease' }}>
                    <ChevronRight size={16} color={isActive ? '#fff' : '#000000'} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT - image + spec overlay */}
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            className="equipment-display-panel"
          >
            {/* Machine image - animated crossfade */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, filter: 'blur(16px)', scale: 1.06 }}
                animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                exit={{ opacity: 0, filter: 'blur(8px)', scale: 0.96 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="equipment-image-wrapper"
              >
                <img
                  src={machineData[active].image}
                  alt={machineData[active].name}
                  className="equipment-main-image"
                  loading="lazy"
                />
              </motion.div>
            </AnimatePresence>

            {/* Gradient overlay */}
            <div className="equipment-display-gradient" />

            {/* Spec overlay card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`spec-${active}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.45, delay: 0.2 }}
                className="equipment-overlay-card"
              >
                <h4 className="equipment-overlay-title">
                  {machineData[active].name}
                </h4>
                <p className="equipment-overlay-description">
                  <WordHover text={machineData[active].details} />
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* ── Bottom stat bar ── */}
        <motion.div
          animate="visible"
          className="equipment-stat-grid"
        >
          {fleetStats.map((stat, idx) => {
            const isStatActive = activeStat === idx;
            return (
              <div
                key={idx}
                onClick={() => setActiveStat(isStatActive ? null : idx)}
                className={`equipment-stat-card ${isStatActive ? 'active' : ''}`}
              >
                <div className="equipment-stat-label">
                  {stat.label}
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem' }}>
                  <span className="equipment-stat-value">
                    {stat.value}
                  </span>
                  <span className="equipment-stat-unit">
                    {stat.unit}
                  </span>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Equipment;


