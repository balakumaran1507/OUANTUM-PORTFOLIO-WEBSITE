import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import GlowCard from '../GlowCard';

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
    excerpt: 'DIGITIZING ONSITE READINGS AND ELIMINATING PAPER-BASED RECORDS FOR SITE TEAMS.',
  },
];

const Blog: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section id="blog" className="section-padding" style={{ background: '#000000' }}>
      <div className="container">

        {/* Centered Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'left', marginBottom: '4rem' }}
        >
          <h2 className="section-title" style={{ lineHeight: 0.9, fontFamily: 'var(--font-geist)', fontWeight: 200 }}>
            Diagnostic<br />Journal
          </h2>
          <p style={{
            color: 'rgba(255, 255, 255, 0.35)',
            fontSize: 'clamp(1.2rem, 2.2vw, 1.45rem)',
            maxWidth: '680px',
            margin: '2rem 0 0',
            fontFamily: 'var(--font-main)',
            lineHeight: 1.7,
            textTransform: 'none',
            letterSpacing: '0.05em'
          }}>
            Technical analyses, industry news, and research from the frontiers of engineering.
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
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            onClick={() => navigate('/blog')}
            style={{
              height: '100%',
              cursor: 'pointer',
            }}
          >
            <GlowCard
              style={{
                padding: '3rem',
                minHeight: '420px',
              }}
            >
              <div>
                <div style={{
                  fontFamily: 'var(--font-adieu)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.12em',
                  color: 'rgba(255, 255, 255, 0.5)',
                  marginBottom: '2rem',
                }}>
                  {featuredPost.tag}
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-geist)',
                  fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)',
                  fontWeight: 200,
                  lineHeight: 1.1,
                  textTransform: 'uppercase',
                  color: '#ffffff',
                }}>
                  {featuredPost.title}
                </h3>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.55)',
                  marginTop: '1.5rem',
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-adieu)',
                  lineHeight: 1.6,
                }}>
                  {featuredPost.excerpt}
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '20px',
                    height: '1px',
                    background: 'rgba(255, 255, 255, 0.3)',
                  }} />
                  <span style={{
                    fontFamily: 'var(--font-adieu)',
                    fontSize: '0.6rem',
                    letterSpacing: '0.1em',
                    color: 'rgba(255, 255, 255, 0.5)',
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
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#fff',
                  transition: 'all 0.4s ease',
                }}>
                  <ArrowUpRight size={20} />
                </div>
              </div>
            </GlowCard>
          </motion.div>

          {/* 3 side posts stacked */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {blogPosts.map((post, idx) => {
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  onClick={() => navigate('/blog')}
                  style={{
                    flex: 1,
                    cursor: 'pointer',
                  }}
                >
                  <GlowCard
                    style={{
                      padding: '2rem 2.5rem',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                      <span style={{
                        fontSize: '0.6rem',
                        opacity: 0.5,
                        fontFamily: 'var(--font-adieu)',
                        color: '#ffffff',
                      }}>
                        {post.date}
                      </span>
                      <span style={{
                        fontSize: '0.5rem',
                        opacity: 0.35,
                        fontFamily: 'var(--font-adieu)',
                        letterSpacing: '0.1em',
                        color: '#ffffff',
                      }}>
                        ID_LOG: {post.id}
                      </span>
                    </div>

                    <h3 style={{
                      textTransform: 'uppercase',
                      fontSize: '1rem',
                      fontWeight: 200,
                      fontFamily: 'var(--font-geist)',
                      color: '#ffffff',
                      marginBottom: '0.5rem',
                      lineHeight: 1.25,
                    }}>
                      {post.title}
                    </h3>

                    <p style={{
                      fontSize: '0.78rem',
                      color: 'rgba(255, 255, 255, 0.55)',
                      lineHeight: 1.55,
                      flex: 1,
                      fontFamily: 'var(--font-adieu)',
                    }}>
                      {post.excerpt}
                    </p>

                    <div style={{
                      paddingTop: '1rem',
                      marginTop: '1rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                      <span style={{
                        fontFamily: 'var(--font-adieu)',
                        fontSize: '0.55rem',
                        letterSpacing: '0.1em',
                        opacity: 0.5,
                        color: 'rgba(255, 255, 255, 0.7)',
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
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#fff',
                        transition: 'all 0.4s ease',
                      }}>
                        <ArrowUpRight size={14} />
                      </div>
                    </div>
                  </GlowCard>
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* Archive CTA - rounded card, not pill */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
          <Link
            to="/blog"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              padding: '1.25rem 2rem',
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '16px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textDecoration: 'none',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <span style={{
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              fontFamily: 'var(--font-adieu)',
              color: '#fff',
              textTransform: 'uppercase',
            }}>
              EXPLORE OUR KNOWLEDGE CENTRE
            </span>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#fff',
            }}>
              <ArrowUpRight size={16} />
            </div>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Blog;


