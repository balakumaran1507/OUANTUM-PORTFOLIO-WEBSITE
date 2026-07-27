import { motion } from 'framer-motion';
import ScrollReveal from '@/components/common/ScrollReveal';
import GlowCard from '@/components/GlowCard';

const stats = [
  {
    value: '5-14',
    unit: 'DAYS',
    label: 'To complete one manual structural assessment',
    index: '01',
  },
  {
    value: '150-300',
    unit: 'DATA POINTS',
    label: 'Collected per bi-weekly site visit on a large project',
    index: '02',
  },
  {
    value: '40-60',
    unit: 'HRS',
    label: 'Senior engineer time writing reports per fortnight',
    index: '03',
  },
];

const words = [
  { text: "OUANTUM", bold: true },
  { text: "is", bold: false },
  { text: "capable", bold: false },
  { text: "of", bold: false },
  { text: "automating", bold: true },
  { text: "quality", bold: true },
  { text: "assurance", bold: true },
  { text: "and", bold: true },
  { text: "structural", bold: true },
  { text: "auditing", bold: true },
  { text: "for", bold: false },
  { text: "infrastructure", bold: false },
  { text: "projects", bold: false },
  { text: "at", bold: true },
  { text: "any", bold: true },
  { text: "scale,", bold: true },
  { text: "enabling", bold: false },
  { text: "rapid", bold: true },
  { text: "inspection,", bold: true },
  { text: "AI-powered", bold: true },
  { text: "analysis,", bold: true },
  { text: "and", bold: false },
  { text: "same-day", bold: true },
  { text: "compliance", bold: true },
  { text: "reporting", bold: true },
  { text: "across", bold: false },
  { text: "buildings,", bold: false },
  { text: "housing", bold: false },
  { text: "developments,", bold: false },
  { text: "bridges,", bold: false },
  { text: "industrial", bold: false },
  { text: "facilities,", bold: false },
  { text: "and", bold: false },
  { text: "public", bold: false },
  { text: "infrastructure.", bold: false },
];

const Problem = () => {
  return (
    <section id="problem" style={{ background: '#000000', padding: '120px 0' }}>
      <div className="container">

        {/* Header */}
        <div style={{ marginBottom: '5rem', textAlign: 'left' }}>
          <div style={{ position: 'relative', display: 'inline-block', margin: '0' }}>
            <h2 className="section-title" style={{ marginBottom: '1.5rem', position: 'relative', zIndex: 1 }}>
              The Problem
            </h2>
          </div>
          <ScrollReveal
            baseOpacity={0.1}
            style={{
              fontFamily: 'var(--font-main)',
              fontSize: 'clamp(1.2rem, 2.2vw, 1.45rem)',
              lineHeight: 1.5,
              color: 'rgba(255,255,255,0.65)',
              maxWidth: '750px',
              marginLeft: '0',
              marginRight: 'auto',
            }}
          >
            India's infrastructure QA runs on manual processes that don't scale.
          </ScrollReveal>
        </div>

        {/* Bento Stat Cards (1 wide top card + 2 side-by-side bottom cards) */}
        <div className="problem-bento-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1.25rem',
          marginBottom: '4rem',
        }}>
          {/* Top Wide Card (Stat 01) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0 }}
            style={{
              gridColumn: '1 / -1',
            }}
          >
            <GlowCard style={{ padding: 'clamp(2rem, 4vw, 3.5rem)' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '2rem',
                flexWrap: 'wrap',
                width: '100%',
              }}>
                <div>
                  <span style={{
                    fontFamily: 'var(--font-adieu)',
                    fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                    fontWeight: 400,
                    lineHeight: 0.9,
                    color: '#fff',
                    display: 'block',
                  }}>
                    {stats[0].value}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-adieu)',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    letterSpacing: '0.15em',
                    color: 'rgba(255, 255, 255, 0.5)',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginTop: '0.5rem',
                  }}>
                    {stats[0].unit}
                  </span>
                </div>

                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
                  color: 'rgba(255, 255, 255, 0.75)',
                  lineHeight: 1.6,
                  margin: 0,
                  maxWidth: '420px',
                }}>
                  {stats[0].label}
                </p>
              </div>
            </GlowCard>
          </motion.div>

          {/* Bottom Card 1 (Stat 02) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12 }}
          >
            <GlowCard style={{ padding: 'clamp(2rem, 4vw, 3rem)', minHeight: '260px' }}>
              <div>
                <span style={{
                  fontFamily: 'var(--font-adieu)',
                  fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
                  fontWeight: 400,
                  lineHeight: 0.9,
                  color: '#fff',
                  display: 'block',
                }}>
                  {stats[1].value}
                </span>
                <span style={{
                  fontFamily: 'var(--font-adieu)',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  letterSpacing: '0.15em',
                  color: 'rgba(255, 255, 255, 0.5)',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginTop: '0.5rem',
                }}>
                  {stats[1].unit}
                </span>
              </div>

              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
                color: 'rgba(255, 255, 255, 0.75)',
                lineHeight: 1.6,
                margin: '1.5rem 0 0 0',
              }}>
                {stats[1].label}
              </p>
            </GlowCard>
          </motion.div>

          {/* Bottom Card 2 (Stat 03) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.24 }}
          >
            <GlowCard style={{ padding: 'clamp(2rem, 4vw, 3rem)', minHeight: '260px' }}>
              <div>
                <span style={{
                  fontFamily: 'var(--font-adieu)',
                  fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
                  fontWeight: 400,
                  lineHeight: 0.9,
                  color: '#fff',
                  display: 'block',
                }}>
                  {stats[2].value}
                </span>
                <span style={{
                  fontFamily: 'var(--font-adieu)',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  letterSpacing: '0.15em',
                  color: 'rgba(255, 255, 255, 0.5)',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginTop: '0.5rem',
                }}>
                  {stats[2].unit}
                </span>
              </div>

              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
                color: 'rgba(255, 255, 255, 0.75)',
                lineHeight: 1.6,
                margin: '1.5rem 0 0 0',
              }}>
                {stats[2].label}
              </p>
            </GlowCard>
          </motion.div>
        </div>

        {/* Anchor copy */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem',
            flexWrap: 'wrap',
          }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(1rem, 2vw, 1.35rem)',
              lineHeight: 1.5,
              maxWidth: '750px',
            }}
          >
            {words.map((w, index) => (
              <span
                key={index}
                style={{
                  fontWeight: w.bold ? 700 : 400,
                  color: 'rgba(255, 255, 255, 0.55)',
                  transition: 'color 0.3s ease',
                  cursor: 'default',
                  display: 'inline-block',
                  marginRight: '0.28em',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.55)';
                }}
              >
                {w.text}
              </span>
            ))}
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default Problem;
