import { motion } from 'framer-motion';

const partners = [
  {
    id: '01',
    role: 'DOMAIN PARTNER',
    name: 'AMITH CIVIL & ALLIED ENGINEERING (ACAES) PVT LTD',
    description: 'Providing the foundational 30-year civil engineering and structural auditing methodologies embedded within the platform\'s validation models.',
  },
  {
    id: '02',
    role: 'UI/UX & CIVIL INTERFACE PARTNER',
    name: 'ZAPSTERS IT SOLUTIONS PVT LTD',
    description: 'Designing the user interface architecture, front-end experience, and translating complex civil engineering requirements into accessible digital workflows.',
  },
  {
    id: '03',
    role: 'TECHNOLOGY & CYBERSECURITY PARTNER',
    name: 'ETHERENCE IT SOLUTIONS',
    description: 'Engineering the multi-model AI consensus layer, deterministic calculation engine, scalable IT infrastructure, and robust cybersecurity protocols.',
  }
];

const Partners = () => {
  return (
    <section id="partners" style={{ background: '#000', padding: '120px 0', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="section-header"
        >
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            letterSpacing: '0.25em',
            color: 'rgba(255,255,255,0.35)',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '1.5rem',
          }}>
            INSTITUTIONAL TRUST
          </span>
          <h2 className="section-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            DOMAIN & TECHNOLOGY<br />PARTNERS
          </h2>
        </motion.div>

        {/* Partners Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
        }}>
          {partners.map((partner, i) => (
            <motion.div
              key={i}
              className="animated-silver-bg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              style={{
                padding: '3rem',
                borderRadius: '24px',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                position: 'relative',
              }}
            >
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                letterSpacing: '0.15em',
                color: 'rgba(255,255,255,0.25)',
              }}>
                {partner.id} - {partner.role}
              </div>

              <h3 style={{
                fontFamily: 'var(--font-adieu)',
                fontSize: '1.4rem',
                color: '#fff',
                lineHeight: 1.3,
                textTransform: 'uppercase',
              }}>
                {partner.name}
              </h3>

              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: 'rgba(255,255,255,0.4)',
                lineHeight: 1.7,
                textTransform: 'uppercase',
                letterSpacing: '0.03em',
                marginTop: 'auto',
              }}>
                {partner.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Partners;
