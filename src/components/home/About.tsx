import { useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { motion } from 'framer-motion'

/* ─── Crosshair corner accent ─── */
const Crosshair = ({ className, style }: { className?: string; style?: CSSProperties }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    className={className}
    style={{ position: 'absolute', zIndex: 30, color: 'rgba(255,255,255,0.3)', ...style }}
  >
    <path d="M7 0L7 14" stroke="currentColor" strokeWidth="1.5" />
    <path d="M0 7L14 7" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)

/* ─── Horizontal rule with crosshairs ─── */
const Divider = () => (
  <div style={{ position: 'relative', width: '100%', height: '1px', background: 'rgba(255,255,255,0.08)', margin: '0' }}>
    <Crosshair style={{ left: 0, top: '50%', transform: 'translate(-50%, -50%)' } as React.CSSProperties} />
    <Crosshair style={{ right: 0, top: '50%', transform: 'translate(50%, -50%)' } as React.CSSProperties} />
  </div>
)

/* ─── Team data ─── */
const team = [
  {
    role: 'FOUNDER — AI & CALCULATION ENGINE',
    name: 'Balakumaran D',
    image: null,
    initials: 'BD',
    bio: 'Bala built the core AI engine that powers Ouantum\'s NDT analysis pipeline. His work translates raw field readings — rebound hammer, UPV, carbonation, chloride — into deterministic IS-code compliance checks.\n\nWith a background spanning structural analysis and applied machine learning, he designed the SonReb correlation model that sits at the heart of every report Ouantum produces. Reach him at +91 7695827158.',
  },
  {
    role: 'CO-FOUNDER — GROWTH & STRATEGY',
    name: 'Rahul',
    image: null,
    initials: 'RA',
    bio: 'Rahul drives the commercial and strategic direction of Ouantum. He has structured the go-to-market across Tamil Nadu Housing Board, ADB-funded PMAY schemes, and Amaravati Capital City — building the operational playbook that lets Ouantum scale without compromising audit quality.\n\nHis focus is on ensuring every client gets same-day delivery, every time. Reach him at +91 861 080 5559.',
  },
  {
    role: 'SALES HEAD',
    name: 'Sabari Raja',
    image: null,
    initials: 'SR',
    bio: 'Sabari is the frontline interface between Ouantum and every civil engineering firm we serve. He qualifies projects, maps client pain to our capability stack, and ensures the right team is in the room before a single rupee changes hands.\n\nIf you are evaluating Ouantum for your next project, Sabari is your first call.',
  },
]

/* ─── Flip card ─── */
const TeamCard = ({ member, index }: { member: typeof team[0]; index: number }) => {
  const [flipped, setFlipped] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      onClick={() => setFlipped(f => !f)}
      style={{
        position: 'relative',
        aspectRatio: '3/4',
        cursor: 'pointer',
        overflow: 'hidden',
        background: '#0a0a0a',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Default — portrait / initials */}
      <div style={{
        position: 'absolute',
        inset: 0,
        transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)',
        transform: flipped ? 'translateY(-100%)' : 'translateY(0)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0a0a',
      }}>
        {member.image ? (
          <img
            src={member.image}
            alt={member.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }}
          />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(160deg, #111 0%, #000 100%)',
          }}>
            <span style={{
              fontFamily: 'var(--font-adieu)',
              fontSize: 'clamp(3rem, 6vw, 5rem)',
              color: 'rgba(255,255,255,0.08)',
              letterSpacing: '0.1em',
            }}>
              {member.initials}
            </span>
          </div>
        )}
        {/* Tap hint */}
        <div style={{
          position: 'absolute',
          top: '1.25rem',
          right: '1.25rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6rem',
          letterSpacing: '0.18em',
          color: 'rgba(255,255,255,0.2)',
          textTransform: 'uppercase',
        }}>
          TAP
        </div>
      </div>

      {/* Flipped — bio */}
      <div style={{
        position: 'absolute',
        inset: 0,
        transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)',
        transform: flipped ? 'translateY(0)' : 'translateY(100%)',
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        padding: '1.75rem',
        gap: '1rem',
        overflowY: 'auto',
      }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>
          Biography
        </p>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.78rem',
          lineHeight: '1.9',
          color: 'rgba(255,255,255,0.65)',
          whiteSpace: 'pre-line',
          flex: 1,
        }}>
          {member.bio}
        </p>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.75rem' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase' }}>
            TAP TO CLOSE
          </p>
        </div>
      </div>

      {/* Persistent footer */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#000',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '1.1rem 1.4rem',
        zIndex: 20,
      }}>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6rem',
          letterSpacing: '0.18em',
          color: 'rgba(255,255,255,0.35)',
          textTransform: 'uppercase',
          marginBottom: '0.3rem',
        }}>
          {member.role}
        </p>
        <h3 style={{
          fontFamily: 'var(--font-adieu)',
          fontSize: 'clamp(1rem, 2vw, 1.4rem)',
          color: '#fff',
          letterSpacing: '0.02em',
          lineHeight: 1,
        }}>
          {member.name}
        </h3>
      </div>
    </motion.div>
  )
}

/* ─── Main About component ─── */
const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null)

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{ background: '#000', overflow: 'hidden' }}
    >
      {/* ── TOP BORDER ── */}
      <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.06)' }} />

      <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto', padding: '0 var(--section-padding)' }}>

        {/* ══ SECTION HEADER ══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ padding: '80px 0 60px' }}
        >
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.3)',
            marginBottom: '1.5rem',
          }}>
            ABOUT_OUANTUM
          </p>
          <h2 style={{
            fontFamily: 'var(--font-adieu)',
            fontSize: 'clamp(2.8rem, 6vw, 6rem)',
            color: '#fff',
            letterSpacing: '-0.01em',
            lineHeight: 0.95,
            fontWeight: 400,
          }}>
            THE INTELLIGENCE<br />LAYER FOR<br />INFRASTRUCTURE
          </h2>
        </motion.div>

        <Divider />

        {/* ══ LEADERSHIP GRID ══ */}
        <div style={{ padding: '80px 0 0' }}>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.3)',
              marginBottom: '2rem',
            }}
          >
            THE TEAM
          </motion.p>
          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{
              fontFamily: 'var(--font-adieu)',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              color: '#fff',
              marginBottom: '3rem',
              letterSpacing: '-0.01em',
              lineHeight: 1,
            }}
          >
            The Founders
          </motion.h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0',
            margin: '0 calc(-1 * var(--section-padding))',
          }}>
            {team.map((member, i) => (
              <TeamCard key={i} member={member} index={i} />
            ))}
          </div>
        </div>

        <Divider />

        {/* ══ WHO WE ARE — dark card ══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            background: '#080808',
            border: '1px solid rgba(255,255,255,0.06)',
            margin: '80px calc(-1 * var(--section-padding))',
          }}
        >
          <div style={{ padding: '4rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '320px' }}>
            <h2 style={{
              fontFamily: 'var(--font-adieu)',
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              color: '#fff',
              fontWeight: 400,
              lineHeight: 1.05,
            }}>
              Who We Are
            </h2>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7" /><path d="M7 7h10v10" />
            </svg>
          </div>
          <div style={{
            padding: '4rem',
            borderLeft: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '1.5rem',
          }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', lineHeight: '1.9', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Ouantum is a domain-specific AI platform built exclusively for civil construction QA/QC<span className="desktop-only"> and structural auditing</span>.
            </p>
            <p className="desktop-only" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', lineHeight: '1.9', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Built in collaboration with 30+ year civil engineering veterans. Quality assurance is not a feature we bolt on — it is the entire product.
            </p>
          </div>
        </motion.div>

        <Divider />

        {/* ══ MISSION & PROBLEM — two-column text ══ */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '6rem',
          padding: '80px 0',
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.22em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              THE MISSION
            </p>
            <h3 style={{ fontFamily: 'var(--font-adieu)', fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', color: '#fff', marginBottom: '2rem', letterSpacing: '0.01em', lineHeight: 1.1 }}>
              The Core Mission
            </h3>
            <p className="desktop-only" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)', lineHeight: '1.9', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Compress weeks of manual QA analysis into a single working day. Ouantum takes NDT field readings and auto-checks every value against IS codes — producing government-grade reports the same day.
            </p>
            <p className="mobile-only" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)', lineHeight: '1.9', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Compress weeks of manual QA analysis into a single working day. Auto-check against IS codes. Same day reports.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.22em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              THE PROBLEM
            </p>
            <h3 style={{ fontFamily: 'var(--font-adieu)', fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', color: '#fff', marginBottom: '2rem', letterSpacing: '0.01em', lineHeight: 1.1 }}>
              The Problem We Solve
            </h3>
            <p className="desktop-only" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)', lineHeight: '1.9', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              India's construction QA industry relies on slow, inconsistent manual processes. What used to take 5–14 days and 40–60 hours of senior engineer time now takes under 4 hours. Field data in. Government-grade reports out. Same day.
            </p>
            <p className="mobile-only" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)', lineHeight: '1.9', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              From 14 days and 60 hours to under 4 hours. Field data in. Government-grade reports out. Same day.
            </p>
          </motion.div>
        </div>

        <Divider />

        {/* ══ FOUNDING OVERVIEW — investor-equivalent ══ */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '6rem',
          padding: '80px 0',
        }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '200px' }}
          >
            <h2 style={{
              fontFamily: 'var(--font-adieu)',
              fontSize: 'clamp(2rem, 3vw, 2.8rem)',
              color: 'rgba(255,255,255,0.9)',
              fontWeight: 400,
              lineHeight: 1.05,
            }}>
              Founding Overview
            </h2>
            <div style={{ marginTop: 'auto', paddingTop: '2.5rem' }}>
              <p style={{ fontFamily: 'var(--font-adieu)', fontSize: '1.4rem', color: '#fff' }}>Bootstrapped</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginTop: '0.4rem' }}>
                Chennai, India — Est. 2024
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.12 }}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', lineHeight: '1.9', color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Ouantum was built with the conviction that civil engineers should spend their expertise on engineering — not data entry. Founded in Chennai and deployed across major government infrastructure programmes, every feature ships only when it meets the standard set by the engineers we serve.
            </p>
          </motion.div>
        </div>

        {/* spacer */}
        <div style={{ height: '80px' }} />
      </div>

      {/* ── BOTTOM BORDER ── */}
      <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.06)' }} />
    </section>
  )
}

export default About
