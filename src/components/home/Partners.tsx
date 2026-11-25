import { motion } from 'framer-motion';
import { WordHover } from '../common/WordHover';
import GlowCard from '../GlowCard';

const partners = [
  {
    id: '01',
    role: 'DOMAIN PARTNER',
    name: 'AMITH CIVIL & ALLIED ENGINEERING (ACAES) PVT LTD',
    description: 'Providing the foundational 30-year civil engineering and structural auditing methodologies embedded within the platform\'s validation models.',
  },
  {
    id: '02',
    role: 'TRAINING & SUPPORT PARTNER',
    name: 'ZAPSTERS IT SOLUTIONS PVT LTD',
    description: 'Providing comprehensive user training, onboarding support, and technical implementation assistance to ensure seamless adoption of the OUANTUM platform on-site.',
  },
  {
    id: '03',
    role: 'TECHNOLOGY & CYBERSECURITY PARTNER',
    name: 'ETHERENCE IT SOLUTIONS',
    description: 'Engineering the multi-model AI consensus layer, deterministic calculation engine, scalable IT infrastructure, and robust cybersecurity protocols.',
  },
  {
    id: '04',
    role: 'SYSTEMS SUPPORT PARTNER',
    name: 'CYBERCOM',
    description: 'Providing specialized systems support, vulnerability assessment, and infrastructure hardening protocols for high-security enterprise deployments.',
  },
];

const Partners = () => {
  return (
    <section id="partners" style={{ background: '#000000', padding: '120px 0' }}>
      <div className="container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          className="section-header"
          style={{ marginBottom: '4rem' }}
        >
          <div style={{ position: 'relative', display: 'inline-block', margin: '0' }}>
            <h2 className="section-title" style={{
              fontFamily: 'var(--font-geist)',
              fontWeight: 200,
              position: 'relative',
              zIndex: 1,
            }}>
              Domain & Technology<br />Partners
            </h2>
          </div>
        </motion.div>

        {/* Partners Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.5rem',
        }}>
          {partners.map((partner, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 1, y: 0 }}
              style={{ minHeight: '280px' }}
            >
              <GlowCard style={{ padding: '2.5rem' }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                  height: '100%',
                }}>
                  {/* Role label */}
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.2em',
                    color: 'rgba(255,255,255,0.35)',
                    textTransform: 'uppercase',
                  }}>
                    {partner.role}
                  </span>

                  {/* Partner name */}
                  <h3 style={{
                    fontFamily: 'var(--font-geist)',
                    fontWeight: 200,
                    fontSize: 'clamp(1rem, 1.8vw, 1.3rem)',
                    color: '#fff',
                    lineHeight: 1.45,
                    textTransform: 'uppercase',
                    margin: 0,
                  }}>
                    {partner.name}
                  </h3>

                  <p style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    color: 'rgba(255, 255, 255, 0.4)',
                    lineHeight: 1.7,
                    letterSpacing: '0.03em',
                    marginTop: 'auto',
                  }}>
                    <WordHover text={partner.description} />
                  </p>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Partners;


