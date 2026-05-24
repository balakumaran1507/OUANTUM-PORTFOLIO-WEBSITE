import { motion } from 'framer-motion';

const stats = [
  {
    value: '5–14',
    unit: 'DAYS',
    label: 'To complete one manual structural assessment',
    index: '01',
  },
  {
    value: '150–300',
    unit: 'DATA POINTS',
    label: 'Collected per bi-weekly site visit on a large project',
    index: '02',
  },
  {
    value: '40–60',
    unit: 'HRS',
    label: 'Senior engineer time writing reports per fortnight',
    index: '03',
  },
];

const Problem = () => {
  return (
    <section id="problem" style={{ background: '#000', padding: '120px 0', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '5rem' }}
        >
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.9rem',
            letterSpacing: '0.25em',
            color: 'rgba(255,255,255,0.35)',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '1.5rem',
          }}>
            THE PROBLEM
          </span>
          <h2 style={{
            fontFamily: 'var(--font-adieu)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 400,
            lineHeight: 1.05,
            color: '#fff',
            maxWidth: '700px',
          }}>
            India's infrastructure QA runs on manual processes that don't scale.
          </h2>
        </motion.div>

        {/* Stat Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1px',
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '20px',
          overflow: 'hidden',
          marginBottom: '4rem',
        }}>
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="animated-silver-bg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              style={{
                padding: 'clamp(1rem, 5vw, 3.5rem)',
                position: 'relative',
              }}
            >
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                letterSpacing: '0.2em',
                color: 'rgba(255,255,255,0.2)',
                display: 'block',
                marginBottom: '2rem',
              }}>
                {stat.index}
              </span>

              <div style={{ marginBottom: '1.25rem' }}>
                <span style={{
                  fontFamily: 'var(--font-adieu)',
                  fontSize: 'clamp(2rem, 10vw, 5.5rem)',
                  fontWeight: 400,
                  lineHeight: 0.9,
                  color: '#fff',
                  display: 'block',
                }}>
                  {stat.value}
                </span>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.95rem',
                  letterSpacing: '0.2em',
                  color: 'rgba(255,255,255,0.4)',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginTop: '0.5rem',
                }}>
                  {stat.unit}
                </span>
              </div>

              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1rem',
                color: 'rgba(255,255,255,0.45)',
                lineHeight: 1.7,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                {stat.label}
              </p>

              {/* Bottom accent line */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '1px',
                background: 'rgba(255,255,255,0.06)',
              }} />
            </motion.div>
          ))}
        </div>

        {/* Anchor copy */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
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
          <p style={{
            fontFamily: 'var(--font-adieu)',
            fontSize: 'clamp(1rem, 2vw, 1.35rem)',
            color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.5,
            maxWidth: '620px',
          }}>
            India's largest infrastructure projects - government housing, capital city developments, ADB-funded construction - rely on a process that is slow, inconsistent, and completely unscalable.{' '}
            <span style={{ color: '#fff' }}>Ouantum changes that.</span>
          </p>

          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.9rem',
            letterSpacing: '0.18em',
            color: 'rgba(255,255,255,0.25)',
            textTransform: 'uppercase',
          }}>
            Ouantum compresses this to{' '}
            <span style={{ color: 'rgba(255,255,255,0.7)' }}>under 4 hours</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Problem;
