import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useSEO from '../hooks/useSEO';
import GlowCard from '../components/GlowCard';
import ScrollReveal from '../components/common/ScrollReveal';
import {
  FOUNDING_DATE_LABEL,
  LINKEDIN,
  MSME_CERTIFICATE_URL,
  UDYAM_NUMBER,
  organizationPeopleSchema,
} from '../config/company';

const BASE_URL = 'https://ouantum.com';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'OUANTUM',
  url: BASE_URL,
  sameAs: ['https://www.linkedin.com/company/ouantum/'],
  ...organizationPeopleSchema,
};

const team = [
  {
    role: 'President & Director',
    linkedin: LINKEDIN.balakumaran,
    name: 'Balakumaran D',
    image: '/assets/images/Balakumaran_CEO_Profile_Pic.png',
    initials: 'BD',
    bio: 'Balakumaran is the Founder & CEO of Cybercom and Etherence. He stands as the backbone of the entire AI systems at OUANTUM, shaping the core architectures and resolving complex technical issues that remain unsolved by others.\n\nHe leads the product engineering teams to ensure that all platforms maintain high standards of deterministic quality assurance and structural validation.\nReach him at +91 7695827158.',
  },
  {
    role: 'CEO & Director',
    linkedin: LINKEDIN.rahul,
    name: 'Rahul',
    image: '/assets/images/rahul.jpeg',
    initials: 'RA',
    bio: 'Rahul is the CEO of OUANTUM and the one who had the initial idea of implementing AI in industrial domains. He leads the commercial and strategic direction of OUANTUM, shaping the go-to-market across the globe.\n\nHis focus is on delivering reliable same-day outcomes for every client.\nReach him at +91 861 080 5559.',
  },
  {
    role: 'Chief Technology Officer',
    linkedin: LINKEDIN.guru,
    name: 'Guru Prasanth',
    image: '/assets/images/guru.png',
    initials: 'GP',
    bio: 'Guru Prasanth serves as Chief Technology Officer at OUANTUM, architecting the deep-tech infrastructure, computer vision models, and consensus verification pipelines.\n\nHe spearheads the engineering team in translating complex non-destructive testing (NDT) physics and IS compliance standards into high-throughput, deterministic AI systems.',
  },
  {
    role: 'CFO & Director',
    linkedin: LINKEDIN.sabari,
    name: 'Sabari Raja',
    image: '/assets/images/sabari.jpeg',
    initials: 'SR',
    bio: 'Sabari Raja is the Founder & CEO of Zapsters. Sabari is the frontline interface between OUANTUM and every civil engineering firm we serve. He qualifies projects, maps client pain to our capability stack, and ensures the right team is in the room before a single rupee changes hands.\n\nIf you are evaluating OUANTUM for your next project, Sabari is your first call.',
  },
  {
    role: 'Vice President',
    linkedin: LINKEDIN.raghu,
    name: 'Raghu',
    image: '/assets/images/raghu.png',
    initials: 'RG',
    bio: 'Raghu serves as Vice President at OUANTUM, overseeing operational strategy, government compliance, and strategic enterprise initiatives. He bridges technical engineering precision with regulatory defensibility to ensure every automated assessment stands up to municipal and government audits.\n\nHis leadership drives cross-functional execution across OUANTUM\'s expanding footprint in India\'s critical infrastructure.',
  },
];


const TeamCard = ({ member, index }: { member: typeof team[0]; index: number }) => {
  const [expanded, setExpanded] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
      className="about-team-card-wrapper"
    >
      <GlowCard
        className={`about-team-card ${expanded ? 'is-expanded' : ''}`}
        role="button"
        tabIndex={0}
        aria-expanded={expanded}
        aria-label={`${member.name}, ${member.role}, click to view biography`}
        onClick={() => {
          if (!expanded) setExpanded(true);
        }}
        onKeyDown={(e) => e.key === 'Enter' && setExpanded((v) => !v)}
      >
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="about-team-linkedin"
          aria-label={`${member.name} on LinkedIn`}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
            <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
          </svg>
        </a>

        {/* ── PORTRAIT ── */}
        <div
          className="about-team-portrait"
          style={{ transform: expanded ? 'translateY(-100%)' : 'translateY(0)' }}
          aria-hidden="true"
        >
          {member.image && !imgError ? (
            <img
              src={member.image}
              alt={`${member.name}, ${member.role} at OUANTUM`}
              onError={() => setImgError(true)}
              className="about-team-portrait-img"
              loading="lazy"
            />
          ) : (
            <div className="about-team-initials-bg">
              <span className="about-team-initials">{member.initials}</span>
            </div>
          )}
          <div className="about-team-tap-hint">{expanded ? 'CLOSE' : 'TAP FOR BIO'}</div>
        </div>

        {/* ── BIO PANEL ── */}
        <div
          className="about-team-bio-panel"
          style={{
            transform: expanded ? 'translateY(0)' : 'translateY(110%)',
            opacity: expanded ? 1 : 0,
            visibility: expanded ? 'visible' : 'hidden',
            pointerEvents: expanded ? 'auto' : 'none',
          }}
          onClick={(e) => {
            // Stop propagation so scrolling or interacting with bio text doesn't trigger card click
            e.stopPropagation();
          }}
        >
          {/* LEFT, passport photo */}
          <div className="about-team-bio-photo-col">
            <div className="about-team-bio-thumb">
              {member.image && !imgError ? (
                <img
                  src={member.image}
                  alt={`Portrait of ${member.name}`}
                  className="about-team-portrait-img"
                  loading="lazy"
                />
              ) : (
                <div className="about-team-bio-thumb-placeholder">
                  <span>{member.initials}</span>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT, bio text */}
          <div className="about-team-bio-text-col">
            <div className="about-team-bio-top-bar">
              <p className="about-team-bio-header">BIOGRAPHY</p>
              <button
                type="button"
                className="about-team-bio-close-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded(false);
                }}
                aria-label="Close biography"
              >
                ✕
              </button>
            </div>
            <div className="about-team-bio-paragraphs">
              {member.bio.split('\n\n').map((para, i) => (
                <p key={i} className="about-team-bio-para">{para}</p>
              ))}
            </div>
            <button
              type="button"
              className="about-team-tap-close"
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(false);
              }}
            >
              TAP TO CLOSE ↑
            </button>
          </div>
        </div>

        {/* ── FOOTER ── */}
        <div
          className="about-team-footer"
          onClick={(e) => {
            e.stopPropagation();
            setExpanded((v) => !v);
          }}
        >
          <p className="about-team-footer-role">{member.role}</p>
          <h3 className="about-team-footer-name">{member.name}</h3>
        </div>
      </GlowCard>
    </motion.div>
  );
};

const About: React.FC = () => {
  useSEO({
    title: 'About | Ouantum',
    description:
      'Meet the core team behind OUANTUM, civil engineers, AI specialists, and structural auditors building deterministic quality assurance for India\'s critical infrastructure.',
    keywords:
      'OUANTUM team, Balakumaran D, about OUANTUM, civil engineering AI team, structural auditing company India, Etherence, Zapsters, Amith',
    canonicalPath: '/about',
    jsonLd: [organizationSchema],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main
      className="subpage-wrapper"
      style={{ background: '#000000', color: '#fff', minHeight: '100vh', paddingBottom: '80px' }}
    >
      {/* Hero */}
      <section
        className="hero"
        style={{ minHeight: '60vh', paddingTop: '120px' }}
        aria-label="About OUANTUM hero section"
      >
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
              <h1
                style={{
                  fontFamily: 'var(--font-geist)',
                  fontWeight: 200,
                  fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                  lineHeight: 1.1,
                  marginBottom: '2rem',
                  color: '#ffffff',
                }}
              >
                About<br />OUANTUM
              </h1>
            </motion.div>
          </div>
          <p className="hero-subtext" style={{ marginTop: '2rem' }}>
            OUANTUM is a technology company focused on improving quality assurance within the civil infrastructure sector. By combining engineering knowledge with artificial intelligence, the platform helps organisations simplify inspections, structural assessments, quality monitoring, and standards-based reporting through a unified digital solution.
          </p>
        </div>
        <motion.div
          className="hero-image-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          style={{ height: '60vh' }}
        >
          <img
            src="/assets/images/about-hero.jpg"
            alt="Civil infrastructure site, background image for OUANTUM About page"
            className="subpage-hero-image"
          />
          <div className="overlay-gradient" aria-hidden="true" />
        </motion.div>
      </section>

      {/* Content */}
      <div className="about-content-outer">
        <div className="about-content-stack">

          {/* OVERVIEW INTRO */}
          <section style={{ marginBottom: '80px' }} aria-label="OUANTUM Overview">
            <ScrollReveal
              style={{
                fontFamily: 'var(--font-main)',
                fontSize: 'clamp(1.2rem, 2.2vw, 1.45rem)',
                lineHeight: 1.85,
                color: 'rgba(255, 255, 255, 0.75)',
                margin: 0,
              }}
            >
              The organisation works to improve how infrastructure projects are inspected, monitored, and documented by providing practical digital tools that support engineering teams, consultants, contractors, and public sector organisations throughout the quality assurance process.
            </ScrollReveal>
          </section>

          {/* COMPANY REGISTRATION */}
          <section style={{ marginBottom: '80px' }} aria-label="Company Registration">
            <h2 className="about-team-heading">Company Registration</h2>
            <div className="about-team-rule" aria-hidden="true" />
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2rem',
              }}
            >
              {[
                { label: 'FOUNDED', value: FOUNDING_DATE_LABEL },
                { label: 'REGISTERED AS', value: 'MSME (Udyam), Micro Enterprise' },
                { label: 'UDYAM REGISTRATION NO.', value: UDYAM_NUMBER },
                { label: 'REGISTERED OFFICE', value: 'Chennai, Tamil Nadu, India' },
              ].map((item) => (
                <GlowCard key={item.label} style={{ padding: '1.5rem' }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-adieu)',
                      fontSize: '0.7rem',
                      letterSpacing: '0.12em',
                      color: 'rgba(255, 255, 255, 0.45)',
                      marginBottom: '0.75rem',
                    }}
                  >
                    {item.label}
                  </div>
                  <div style={{ fontFamily: 'var(--font-main)', fontSize: '1rem', lineHeight: 1.5, color: '#ffffff' }}>
                    {item.value}
                  </div>
                </GlowCard>
              ))}
            </div>
            <a
              href={MSME_CERTIFICATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-nav-link"
              style={{ fontFamily: 'var(--font-main)', fontSize: '0.95rem', textDecoration: 'underline' }}
            >
              View MSME registration certificate (PDF)
            </a>
          </section>

          {/* OUR EXPERTISE */}
          <section style={{ marginBottom: '80px' }} aria-label="Our Expertise">
            <h2 className="about-team-heading">Our Expertise</h2>
            <div className="about-team-rule" aria-hidden="true" />
            <ScrollReveal
              style={{
                fontFamily: 'var(--font-main)',
                fontSize: 'clamp(1.2rem, 2.2vw, 1.45rem)',
                lineHeight: 1.8,
                color: 'rgba(255, 255, 255, 0.7)',
                margin: 0,
              }}
            >
              OUANTUM focuses on improving quality assurance processes within the civil infrastructure sector through practical digital technologies. The organisation's work centres on inspection workflows, structural assessments, quality monitoring, engineering documentation, and standards-based reporting, helping organisations manage quality assurance activities more efficiently and consistently. By combining engineering knowledge with digital solutions, OUANTUM aims to simplify complex quality assurance processes while supporting informed decision-making across infrastructure projects.
            </ScrollReveal>
          </section>

          {/* CORE CAPABILITIES */}
          <section style={{ marginBottom: '80px' }} aria-label="Core Capabilities">
            <h2 className="about-team-heading">Core Capabilities</h2>
            <div className="about-team-rule" aria-hidden="true" />
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
              marginTop: '2.5rem',
            }}>
              {[
                {
                  title: 'NDT Analysis Engine',
                  desc: 'Calculates concrete compressive strength in real-time using rebound hammer and UPV readings.',
                  link: '/capabilities/ndt-analysis-engine',
                },
                {
                  title: 'IS Code Compliance',
                  desc: 'Automates structural compliance auditing against Indian standards (IS 456, IS 1786, IS 383).',
                  link: '/capabilities/is-code-compliance',
                },
                {
                  title: 'Multi-Model Consensus',
                  desc: 'Implements a triple-model AI consensus mechanism to verify compliance audits.',
                  link: '/capabilities/multi-model-consensus',
                },
                {
                  title: 'Service Life Prediction',
                  desc: 'Forecasts reinforcement corrosion rates and remaining structure life.',
                  link: '/capabilities/service-life-prediction',
                },
                {
                  title: 'On-Site Data Acquisition',
                  desc: 'Simplifies mobile-first field data logging and eliminates paper records on site.',
                  link: null,
                },
                {
                  title: 'Standards-Based Reporting',
                  desc: 'Generates structured, compliant reports for faster engineering approvals.',
                  link: null,
                },
              ].map((cap, i) => (
                <div key={i}>
                  <GlowCard borderRadius={24} style={{ padding: '2rem' }}>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      height: '100%',
                      minHeight: '180px',
                    }}>
                      <div>
                        <h3 style={{
                          fontFamily: 'var(--font-adieu)',
                          fontSize: '0.95rem',
                          color: '#ffffff',
                          marginBottom: '1rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                        }}>
                          {cap.title}
                        </h3>
                        <p style={{
                          fontFamily: 'var(--font-main)',
                          fontSize: '0.88rem',
                          lineHeight: 1.6,
                          color: 'rgba(255, 255, 255, 0.55)',
                          margin: 0,
                        }}>
                          {cap.desc}
                        </p>
                      </div>
                      {cap.link && (
                        <div style={{ marginTop: '1.5rem' }}>
                          <Link
                            to={cap.link}
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.72rem',
                              color: '#ffffff',
                              textDecoration: 'none',
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em',
                              fontWeight: 600,
                            }}
                          >
                            Explore Capability →
                          </Link>
                        </div>
                      )}
                    </div>
                  </GlowCard>
                </div>
              ))}
            </div>
          </section>

          {/* WHO WE SUPPORT */}
          <section style={{ marginBottom: '80px' }} aria-label="Who We Support">
            <h2 className="about-team-heading">Who We Support</h2>
            <div className="about-team-rule" aria-hidden="true" />
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
              marginTop: '2.5rem',
            }}>
              {[
                {
                  title: 'Government Agencies',
                  desc: 'Enables public infrastructure owners and departments to automate compliance checks, secure independent quality audits, and maintain bulletproof records.',
                },
                {
                  title: 'Engineering Consultants',
                  desc: 'Accelerates field report reviews and auditing tasks, letting structural audit teams verify onsite tests and compile compliant reports in hours.',
                },
                {
                  title: 'Contractors & Project Teams',
                  desc: 'Helps quality engineers monitor concrete strength development, check aggregate grading instantly, and resolve deviations before they turn into costly rework.',
                },
              ].map((target, i) => (
                <div key={i}>
                  <GlowCard borderRadius={24} style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                      <h3 style={{
                        fontFamily: 'var(--font-adieu)',
                        fontSize: '0.95rem',
                        color: '#ffffff',
                        marginBottom: '1rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}>
                        {target.title}
                      </h3>
                      <p style={{
                        fontFamily: 'var(--font-main)',
                        fontSize: '0.88rem',
                        lineHeight: 1.6,
                        color: 'rgba(255, 255, 255, 0.55)',
                        margin: 0,
                      }}>
                        {target.desc}
                      </p>
                    </div>
                  </GlowCard>
                </div>
              ))}
            </div>
          </section>

          {/* LEADERSHIP */}
          <section aria-label="Leadership team">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              viewport={{ once: true }}
              className="about-team-eyebrow"
            >
              THE TEAM
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="about-team-heading"
            >
              Meet The Core Team
            </motion.h2>

            <div className="about-team-rule" aria-hidden="true" />

            <div className="about-team-grid">
              {team.map((member, i) => (
                <TeamCard key={i} member={member} index={i} />
              ))}
            </div>
          </section>

          {/* PARTNER ECOSYSTEM */}
          <section className="about-partners-section" aria-label="Partner ecosystem" style={{ marginBottom: '40px' }}>
            <h2 className="about-partners-heading">
              Partner Ecosystem
            </h2>
            <div className="about-partners-grid">
              {[
                { name: 'ETHERENCE', desc: 'TECHNOLOGY & CYBERSECURITY', url: 'https://etherence.com', label: 'etherence.com' },
                { name: 'ZAPSTERS', desc: 'TRAINING & SUPPORT', url: 'https://zapsters.in', label: 'zapsters.in' },
                { name: 'AMITH', desc: 'CIVIL & ALLIED ENGINEERING', url: 'https://amith.in.net', label: 'amith.in.net' },
                { name: 'CYBERCOM', desc: 'SYSTEMS SUPPORT', url: 'https://www.cybercomctf.com/', label: 'cybercomctf.com' },
              ].map(p => (
                <a
                  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-partner-link"
                  style={{ textDecoration: 'none', display: 'block' }}
                  aria-label={`Visit ${p.name}, ${p.desc} partner of OUANTUM`}
                >
                  <GlowCard borderRadius={24} style={{ padding: '2.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '0.75rem' }}>
                      <h3 className="about-partner-name" style={{ margin: 0 }}>{p.name}</h3>
                      <p className="about-partner-desc" style={{ margin: 0 }}>{p.desc}</p>
                      <span className="about-partner-url" style={{ marginTop: 'auto', paddingTop: '1rem' }}>{p.label} ↗</span>
                    </div>
                  </GlowCard>
                </a>
              ))}
            </div>
          </section>

        </div>
      </div>
    </main>
  );
};

export default About;


