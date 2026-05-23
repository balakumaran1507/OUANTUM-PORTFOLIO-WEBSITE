import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const featuredPost = {
  tag: 'RESEARCH',
  title: 'ACHIEVING 99.9% ACCURACY IN REBOUND HAMMER VALIDATION',
  excerpt: 'A COMPREHENSIVE ANALYSIS OF OUR CONSENSUS AI APPROACH IN CORRELATING SONREB DATA.',
};

const blogPosts = [
  {
    date: 'NOV 10, 2024',
    id: 1042,
    title: 'AUTOMATING IS CODE COMPLIANCE',
    excerpt: 'HOW THE RULE ENGINE ELIMINATES HUMAN ERROR IN FIELD DATA VALIDATION.',
  },
  {
    date: 'OCT 25, 2024',
    id: 1043,
    title: 'PREDICTIVE MODELING FOR SERVICE LIFE',
    excerpt: 'LEVERAGING HALF-CELL POTENTIAL AND CHLORIDE CONTENT FOR ACCURATE PREDICTIONS.',
  },
  {
    date: 'SEP 14, 2024',
    id: 1044,
    title: 'MOBILE-FIRST QA/QC WORKFLOWS',
    excerpt: 'DIGITIZING ONSITE READINGS AND ELIMINATING PAPER-BASED RECORDS AT 4000+ UNITS.',
  },
];

const Blog: React.FC = () => {
  const [featuredActive, setFeaturedActive] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="blog" className="section-padding" style={{ background: '#000' }}>
      <div className="container">

        {/* Centered Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <h2 className="section-title" style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', lineHeight: 0.9, fontFamily: 'var(--font-adieu)' }}>
            DIAGNOSTIC<br />JOURNAL
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.35)',
            fontSize: '0.9rem',
            maxWidth: '520px',
            margin: '2rem auto 0',
            fontFamily: 'var(--font-adieu)',
            lineHeight: 1.7,
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            TECHNICAL ANALYSES, INDUSTRY NEWS, AND RESEARCH FROM THE FRONTIERS OF ENGINEERING.
          </p>
        </motion.div>

        {/* Grid: 1 featured + 3 side posts */}
        <div className="blog-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1.5rem',
          alignItems: 'stretch',
        }}>

          {/* Featured card - click to toggle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            onClick={() => setFeaturedActive(v => !v)}
            style={{
              background: featuredActive ? '#fff' : '#000',
              border: `1px solid ${featuredActive ? 'transparent' : 'rgba(255,255,255,0.07)'}`,
              borderRadius: '32px',
              padding: '3rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '420px',
              transform: featuredActive ? 'translateY(-6px)' : 'translateY(0)',
              transition: 'all 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              cursor: 'pointer',
            }}
          >
            <div>
              <div style={{
                fontFamily: 'var(--font-adieu)',
                fontSize: '0.65rem',
                letterSpacing: '0.12em',
                color: featuredActive ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.4)',
                marginBottom: '2rem',
                transition: 'color 0.4s ease',
              }}>
                {featuredPost.tag}
              </div>
              <h3 style={{
                fontFamily: 'var(--font-adieu)',
                fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)',
                fontWeight: 400,
                lineHeight: 1.1,
                textTransform: 'uppercase',
                color: featuredActive ? '#000' : '#fff',
                transition: 'color 0.4s ease',
              }}>
                {featuredPost.title}
              </h3>
              <p style={{
                color: featuredActive ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.4)',
                marginTop: '1.5rem',
                fontSize: '0.85rem',
                fontFamily: 'var(--font-adieu)',
                lineHeight: 1.6,
                transition: 'color 0.4s ease',
              }}>
                {featuredPost.excerpt}
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '20px',
                  height: '1px',
                  background: featuredActive ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.3)',
                  transition: 'background 0.4s ease',
                }} />
                <span style={{
                  fontFamily: 'var(--font-adieu)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.1em',
                  color: featuredActive ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.4)',
                  transition: 'color 0.4s ease',
                }}>
                </span>
              </div>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: featuredActive ? '#000' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${featuredActive ? '#000' : 'rgba(255,255,255,0.15)'}`,
                color: '#fff',
                transition: 'all 0.4s ease',
              }}>
                <ArrowUpRight size={20} />
              </div>
            </div>
          </motion.div>

          {/* 3 side posts stacked - click each to toggle */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {blogPosts.map((post, idx) => {
              const active = activeIndex === idx;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  onClick={() => setActiveIndex(active ? null : idx)}
                  style={{
                    borderRadius: '24px',
                    padding: '2rem 2.5rem',
                    background: active ? '#fff' : '#000',
                    border: `1px solid ${active ? 'transparent' : 'rgba(255,255,255,0.05)'}`,
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    transform: active ? 'translateY(-4px)' : 'translateY(0)',
                    transition: 'all 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span style={{
                      fontSize: '0.6rem',
                      opacity: 0.4,
                      fontFamily: 'var(--font-adieu)',
                      color: active ? '#000' : '#fff',
                      transition: 'color 0.4s ease',
                    }}>
                      {post.date}
                    </span>
                    <span style={{
                      fontSize: '0.5rem',
                      opacity: 0.25,
                      fontFamily: 'var(--font-adieu)',
                      letterSpacing: '0.1em',
                      color: active ? '#000' : '#fff',
                      transition: 'color 0.4s ease',
                    }}>
                      ID_LOG: {post.id}
                    </span>
                  </div>

                  <h3 style={{
                    textTransform: 'uppercase',
                    fontSize: '0.95rem',
                    fontWeight: 400,
                    fontFamily: 'var(--font-adieu)',
                    color: active ? '#000' : '#fff',
                    marginBottom: '0.5rem',
                    lineHeight: 1.25,
                    transition: 'color 0.4s ease',
                  }}>
                    {post.title}
                  </h3>

                  <p style={{
                    fontSize: '0.78rem',
                    color: active ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.35)',
                    lineHeight: 1.55,
                    flex: 1,
                    fontFamily: 'var(--font-adieu)',
                    transition: 'color 0.4s ease',
                  }}>
                    {post.excerpt}
                  </p>

                  <div style={{
                    borderTop: `1px solid ${active ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.04)'}`,
                    paddingTop: '1rem',
                    marginTop: '1rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'border-color 0.4s ease',
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-adieu)',
                      fontSize: '0.55rem',
                      letterSpacing: '0.1em',
                      opacity: 0.45,
                      color: active ? 'rgba(0,0,0,0.6)' : '#fff',
                      transition: 'color 0.4s ease',
                    }}>
                      TECH_ANALYSIS
                    </span>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: active ? '#000' : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${active ? '#000' : 'rgba(255,255,255,0.08)'}`,
                      color: '#fff',
                      transition: 'all 0.4s ease',
                    }}>
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* Archive CTA - rounded card, not pill */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
          <motion.button
            whileHover={{ background: 'rgba(255,255,255,0.06)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              padding: '1.25rem 2rem',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '16px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            <span style={{
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              fontFamily: 'var(--font-adieu)',
              color: '#fff',
              textTransform: 'uppercase',
            }}>
              ACCESS_COMPLETE_ARCHIVE
            </span>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#fff',
            }}>
              <ArrowUpRight size={16} />
            </div>
          </motion.button>
        </div>

      </div>
    </section>
  );
};

export default Blog;
