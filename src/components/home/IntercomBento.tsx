import React from 'react';

export interface SuiteCardItem {
  id: string;
  image: string;
  title: string;
  desc: string;
  alt: string;
  /**
   * Image alignment and zoom parameters:
   * x: Horizontal offset in px (positive moves right, negative moves left)
   * y: Vertical offset in px (positive moves down, negative moves up)
   * scale: Zoom multiplier (1.0 = 100% natural size, 1.2 = 120% zoom, etc.)
   * Note: These can also be tuned globally via CSS variables in src/styles/intercom.css:
   * --suite-card-1-x, --suite-card-1-y, --suite-card-1-scale
   */
  x: number;
  y: number;
  scale: number;
}

const suiteCards: SuiteCardItem[] = [
  {
    id: 'card-1',
    image: '/assets/images/suite-card-1.webp',
    title: 'Work together, seamlessly',
    desc: 'OX1 and your site team work from the same unified inspection ledger. When OX1 needs an approval or verified field data, it collaborates with your engineers and finishes the audit dossier itself.',
    alt: 'Work together seamlessly with OX1 AI and engineering team',
    x: 0,
    y: 0,
    scale: 1.0,
  },
  {
    id: 'card-2',
    image: '/assets/images/suite-card-2.webp',
    title: 'Self-improving system',
    desc: 'OX1 constantly improves by learning from certified core tests and senior engineer validations. With everything in one system, quality managers get proactive recommendations on calibration gaps and structural risks.',
    alt: 'Self-improving AI system with recommendations and gap analysis',
    x: 0,
    y: 0,
    scale: 1.0,
  },
  {
    id: 'card-3',
    image: '/assets/images/suite-card-3.webp',
    title: 'Centralized Knowledge Hub',
    desc: 'Centralize, manage, and verify all civil standards, IS 456 / IS 13311 codal rules, blueprints, and NDT calibrations across every highway package and metro corridor in one single source of truth.',
    alt: 'Centralized Knowledge Hub for civil infrastructure and codal standards',
    x: 0,
    y: 0,
    scale: 1.0,
  },
];

const IntercomBento: React.FC = () => {
  return (
    <section style={{ padding: '80px 16px', backgroundColor: '#ffffff', border: 'none' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'left', marginBottom: '44px' }}>
          <h2
            style={{
              fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              fontSize: 'clamp(1.875rem, 3.5vw, 3.375rem)',
              fontWeight: 300,
              color: '#111111',
              lineHeight: 1.05,
              letterSpacing: '-0.015em',
              WebkitTextStroke: '0.4px #ffffff',
              WebkitTextFillColor: '#111111',
              maxWidth: '840px',
              margin: 0,
            }}
          >
            A unified suite built for civil engineering precision and audit velocity
          </h2>
        </div>

        {/* 3-Column Suite Feature Cards Grid */}
        <div className="ic-suite-grid">
          {suiteCards.map((card, idx) => {
            const cardNum = idx + 1;
            return (
              <div key={card.id} className="ic-suite-card">
                <div className="ic-suite-image-box">
                  <img
                    src={card.image}
                    alt={card.alt}
                    className="ic-suite-img"
                    loading="lazy"
                    style={{
                      transform: `translate(var(--suite-card-${cardNum}-x, ${card.x}px), var(--suite-card-${cardNum}-y, ${card.y}px)) scale(var(--suite-card-${cardNum}-scale, ${card.scale}))`,
                    }}
                  />
                </div>
                <div className="ic-suite-content">
                  <h3 className="ic-suite-title">{card.title}</h3>
                  <p className="ic-suite-desc">{card.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IntercomBento;
