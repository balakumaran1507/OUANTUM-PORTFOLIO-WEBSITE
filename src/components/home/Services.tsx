import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const activityItems = [
  {
    id: '01',
    title: 'NDT ANALYSIS ENGINE',
    category: 'CALCULATION',
    tags: ['SONREB', 'UPV', 'IS 13311'],
    description: 'PROCESSES REBOUND HAMMER AND UPV READINGS AUTOMATICALLY. RUNS SONREB CORRELATION AND FLAGS OUTLIER READINGS.'
  },
  {
    id: '02',
    title: 'IS CODE COMPLIANCE',
    category: 'VALIDATION',
    tags: ['IS 456', 'IS 2386', 'IS 1786'],
    description: 'EVERY TEST VALUE IS AUTOMATICALLY CHECKED AGAINST THE RELEVANT INDIAN STANDARD. PASS / CONCERN / FAIL IS AUTO-FLAGGED.'
  },
  {
    id: '03',
    title: 'MULTI-MODEL CONSENSUS',
    category: 'AI ENGINE',
    tags: ['CODE SPECIALIST', 'SAFETY ANALYST', 'PATTERN INTELLIGENCE'],
    description: 'EVERY ASSESSMENT IS INDEPENDENTLY ANALYZED BY THREE AI MODELS. ALL THREE MUST REACH CONSENSUS BEFORE A RESULT IS CONFIRMED.'
  },
  {
    id: '04',
    title: 'SERVICE LIFE PREDICTION',
    category: 'PREDICTIVE',
    tags: ['CARBONATION', 'CHLORIDE', 'HALF-CELL'],
    description: 'COMBINES CARBONATION DEPTH, CHLORIDE CONTENT, AND HALF-CELL POTENTIAL READINGS TO PREDICT REMAINING SERVICE LIFE.'
  },
];

const Services: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const isActive = (idx: number) => activeCard === idx;

  return (
    <section id="activities" className="section-padding services-section">
      <div className="container">

        {/* Centered Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="section-header"
        >
          <h2 className="section-title services-main-title">
            CORE<br />CAPABILITIES
          </h2>
          <p className="section-subtitle">
            OUR DOMAIN-SPECIFIC AI PLATFORM AUTOMATES QUALITY ASSURANCE WORKFLOWS, COMPRESSING WEEKS OF MANUAL ANALYSIS INTO A SINGLE WORKING DAY.
          </p>
        </motion.div>

        {/* Full-width 2×2 Card Grid */}
        <div className="services-grid">
          {activityItems.map((item, index) => {
            const active = isActive(index);
            return (
              <div
                key={index}
                onClick={() => setActiveCard(active ? null : index)}
                className={`service-card animated-silver-bg ${active ? 'active' : ''}`}
              >
                <div>
                  {/* ID number placeholder */}
                  <div className="service-card-id"></div>
                  <div>
                    <h3 className="service-card-title">
                      {item.title}
                    </h3>
                    <p className="service-card-description">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Footer: tags + arrow */}
                <div className="service-card-footer">
                  <div className="service-tags">
                    {item.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="tag-item">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="service-arrow-wrapper">
                    <ArrowUpRight size={24} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Services;
