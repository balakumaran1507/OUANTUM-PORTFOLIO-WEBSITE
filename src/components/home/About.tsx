import { motion } from 'framer-motion'

const About = () => {
  return (
    <section id="about" className="section-padding" style={{ background: '#000' }}>
      <div className="container">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="section-header"
        >
          <h2 className="section-title">ABOUT OUANTUM</h2>
          <p className="section-subtitle">THE INTELLIGENCE LAYER FOR INFRASTRUCTURE</p>
        </motion.div>

        <motion.div
          className="about-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', marginTop: '4rem' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="about-text-block">
            <h3 style={{ fontFamily: 'var(--font-adieu)', fontSize: '1.8rem', color: '#fff', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
              The Core Mission
            </h3>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', lineHeight: '1.8', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
              Ouantum is a domain-specific AI platform built exclusively for civil construction QA/QC and structural auditing. We transform how civil engineers perform quality assurance-compressing weeks of manual analysis into a single working day.
            </p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', lineHeight: '1.8', textTransform: 'uppercase' }}>
              Built in collaboration with 30+ year civil engineering veterans, Ouantum serves as the intelligence layer that sits on top of construction testing data, producing government-grade reports instantly.
            </p>
          </div>

          <div className="about-text-block">
            <h3 style={{ fontFamily: 'var(--font-adieu)', fontSize: '1.8rem', color: '#fff', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
              The Problem We Solve
            </h3>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', lineHeight: '1.8', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
              India's construction quality assurance industry relies heavily on slow, inconsistent manual processes. NDT field readings are recorded on paper, and engineers manually cross-reference every value against IS codes.
            </p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', lineHeight: '1.8', textTransform: 'uppercase' }}>
              What used to take 5–14 days and 40–60 hours of senior engineer time is now compressed to under 4 hours. Field data in. Government-grade reports out. Same day. Nothing slips through unchecked.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About

