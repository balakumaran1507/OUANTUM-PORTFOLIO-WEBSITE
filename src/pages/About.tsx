import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const team = [
  {
    role: 'FOUNDER & CHIEF EXECUTIVE OFFICER',
    name: 'Balakumaran D',
    image: '/assets/images/Balakumaran_CEO_Profile_Pic.png',
    initials: 'BD',
    bio: 'Balakumaran built Ouantum with a clear vision: civil engineers deserve infrastructure that works from day one. He works with clients across India to turn weeks of manual QA into a single efficient workflow.\n\nHe leads the company’s strategic direction, ensuring every deployment meets high standards of deterministic quality assurance.\nReach him at +91 7695827158.',
  },
  {
    role: 'CO-FOUNDER — GROWTH & STRATEGY',
    name: 'Rahul',
    image: '/assets/images/rahul.jpeg',
    initials: 'RA',
    bio: 'Rahul leads the commercial and strategic direction of Ouantum. He has shaped the go-to-market across Tamil Nadu Housing Board, ADB-funded PMAY schemes, and Amaravati Capital City — building systems that help Ouantum scale without compromising audit quality.\n\nHis focus is on delivering reliable same-day outcomes for every client.\nReach him at +91 861 080 5559.',
  },
  {
    role: 'CHIEF OPERATING OFFICER',
    name: 'Nabeelah Anjum A',
    image: '/assets/images/Nabeelah_COO_Profile_Pic.jpeg',
    initials: 'NA',
    bio: 'Nabeelah oversees the operational excellence of Ouantum, ensuring that our quality-first mission is translated into every project and client relationship we manage.\n\nHer focus is on building resilient organizational structures that allow our technical teams to focus on what they do best: hardening every audit output to government-grade standards.',
  },
  {
    role: 'CHIEF TECHNOLOGY OFFICER',
    name: 'Guru Prasanth M',
    image: '/assets/images/Guru_CTO_Profile.jpeg',
    initials: 'GP',
    bio: 'Guru leads our technical vision, specializing in the AI pipeline architecture and data integrity layers that power Ouantum\'s NDT analysis engine.\n\nPreviously he has worked on complex systems integration, bringing a wealth of experience in building infrastructure that can scale without compromising on accuracy or compliance.',
  },
  {
    role: 'LEAD AUTHOR',
    name: 'Jaie Balaji T',
    image: '/assets/images/Jaie_lead_author_Profile.jpeg',
    initials: 'JB',
    bio: 'Jaie leads our research and documentation efforts, ensuring that our QA methodologies are communicated clearly and implemented rigorously across all deployments.\n\nHer work bridges the gap between complex IS-code compliance research and practical, deployable audit standards that field engineers can trust.',
  },
  {
    role: 'LEGAL & JUNIOR AI ENGINEER',
    name: 'Raghu',
    image: '/assets/images/raghu.png',
    initials: 'RG',
    bio: 'Raghu handles the legal framework and compliance structures that underpin Ouantum\'s government-grade report generation. He also contributes to the AI pipeline — ensuring every automated output is legally defensible and technically sound.\n\nHis dual role bridges the gap between engineering precision and regulatory compliance.',
  },
  {
    role: 'SALES HEAD',
    name: 'Sabari Raja',
    image: '/assets/images/sabari.jpeg',
    initials: 'SR',
    bio: 'Sabari is the frontline interface between Ouantum and every civil engineering firm we serve. He qualifies projects, maps client pain to our capability stack, and ensures the right team is in the room before a single rupee changes hands.\n\nIf you are evaluating Ouantum for your next project, Sabari is your first call.',
  },
];

const FOOTER_H = 88;

const TeamCard = ({ member, index }: { member: typeof team[0]; index: number }) => {
  const [expanded, setExpanded] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
      onClick={() => setExpanded(e => !e)}
      className="about-team-card"
    >
      {/* ── PORTRAIT ── */}
      <div
        className="about-team-portrait"
        style={{ transform: expanded ? 'translateY(-100%)' : 'translateY(0)' }}
      >
        {member.image && !imgError ? (
          <img
            src={member.image}
            alt={member.name}
            onError={() => setImgError(true)}
            className="about-team-portrait-img"
          />
        ) : (
          <div className="about-team-initials-bg">
            <span className="about-team-initials">{member.initials}</span>
          </div>
        )}
        <div className="about-team-tap-hint">TAP</div>
      </div>

      {/* ── BIO PANEL ── */}
      <div
        className="about-team-bio-panel"
        style={{ transform: expanded ? 'translateY(0)' : 'translateY(100%)' }}
      >
        {/* LEFT — passport photo */}
        <div className="about-team-bio-photo-col">
          <div className="about-team-bio-thumb">
            {member.image && !imgError ? (
              <img
                src={member.image}
                alt={member.name}
                className="about-team-portrait-img"
              />
            ) : (
              <div className="about-team-bio-thumb-placeholder">
                <span>{member.initials}</span>
              </div>
            )}
          </div>
          <p className="about-team-profile-label">PROFILE</p>
        </div>

        {/* RIGHT — bio text */}
        <div className="about-team-bio-text-col">
          <p className="about-team-bio-header">BIOGRAPHY</p>
          <div className="about-team-bio-paragraphs">
            {member.bio.split('\n\n').map((para, i) => (
              <p key={i} className="about-team-bio-para">{para}</p>
            ))}
          </div>
          <p className="about-team-tap-close">TAP TO CLOSE ↑</p>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div className="about-team-footer" style={{ height: FOOTER_H }}>
        <p className="about-team-footer-role">{member.role}</p>
        <h3 className="about-team-footer-name">{member.name}</h3>
      </div>
    </motion.div>
  );
};

const About: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="subpage-wrapper" style={{ background: '#000', color: '#fff', minHeight: '100vh', paddingBottom: '80px' }}>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Ouantum",
            "founder": [
              { "@type": "Person", "name": "Balakumaran D", "jobTitle": "Founder" },
              { "@type": "Person", "name": "Rahul", "jobTitle": "Co-founder" }
            ]
          })
        }}
      />

      {/* Hero */}
      <section className="hero" style={{ minHeight: '60vh', paddingTop: '120px' }}>
        <div className="container hero-content">
          <div className="section-split hero-main-layout">
            <motion.div className="sidebar-info hero-left">
              <div className="hero-labels">
                <span className="hero-tech-label">THE ORGANIZATION · ARCHIVE · INFRASTRUCTURE</span>
              </div>
              <p className="side-description hero-description">
                ARCHIVING THE MINDS BEHIND THE DETERMINISTIC INTELLIGENCE ENGINE.
              </p>
            </motion.div>
            <motion.div className="hero-right-content hero-right">
              <h1 style={{ fontFamily: 'var(--font-adieu)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.1, marginBottom: '2rem' }}>
                ABOUT<br />ARCHIVE
              </h1>
              <p className="hero-subtext">
                Ouantum is driven by a core team of civil engineers, AI specialists, and structural auditors committed to bringing deterministic, intelligence-driven quality assurance to critical infrastructure.
              </p>
            </motion.div>
          </div>
        </div>
        <motion.div
          className="hero-image-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          style={{ height: '60vh' }}
        >
          <img src="/assets/images/about-hero.jpg" alt="Infrastructure Archive" className="subpage-hero-image" />
          <div className="overlay-gradient" />
        </motion.div>
      </section>

      {/* Content */}
      <div className="about-content-outer">
        <div className="about-content-stack">

          {/* LEADERSHIP */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="about-team-eyebrow"
            >
              THE TEAM
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="about-team-heading"
            >
              Meet The Core Team
            </motion.h2>

            <div className="about-team-rule" />

            <div className="about-team-grid">
              {team.map((member, i) => (
                <TeamCard key={i} member={member} index={i} />
              ))}
            </div>
          </div>

          {/* PARTNER ECOSYSTEM */}
          <div className="about-partners-section">
            <h2 className="about-partners-heading">
              PARTNER ECOSYSTEM
            </h2>
            <div className="about-partners-grid">
              {[
                { name: 'ETHERENCE', desc: 'TECHNOLOGY & CYBERSECURITY', url: 'https://etherence.com', label: 'etherence.com' },
                { name: 'ZAPSTERS', desc: 'UI/UX & CIVIL INTERFACE', url: 'https://zapsters.in', label: 'zapsters.in' },
                { name: 'AMITH', desc: 'CIVIL & ALLIED ENGINEERING', url: 'https://amith.in.net', label: 'amith.in.net' },
              ].map(p => (
                <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className="about-partner-link">
                  <div className="animated-silver-bg about-partner-card">
                    <h3 className="about-partner-name">{p.name}</h3>
                    <p className="about-partner-desc">{p.desc}</p>
                    <span className="about-partner-url">{p.label} ↗</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;
