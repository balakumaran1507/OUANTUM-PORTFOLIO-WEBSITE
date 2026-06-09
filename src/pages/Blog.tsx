import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Tag } from 'lucide-react';
import { blogPosts, CATEGORIES, type Category } from '../data/blogPosts';
import useSEO from '../hooks/useSEO';

const BASE_URL = 'https://ouantum.com';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Ouantum',
  url: BASE_URL,
  sameAs: ['https://www.linkedin.com/company/ouantum/'],
};

const blogListingSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'Ouantum Blog — Insights & Engineering Intelligence',
  description:
    'Technical insights on AI in construction, predictive maintenance, BIM, civil engineering AI, and quality assurance from the Ouantum team.',
  url: `${BASE_URL}/blog`,
  publisher: {
    '@type': 'Organization',
    name: 'Ouantum',
    url: BASE_URL,
  },
};

const CATEGORY_COLORS: Record<string, string> = {
  'AI in Construction': '#4ade80',
  'Predictive Maintenance': '#60a5fa',
  BIM: '#f472b6',
  'Civil Engineering AI': '#fb923c',
  'Quality Assurance': '#a78bfa',
};

const Blog: React.FC = () => {
  useSEO({
    title: 'Blog | Ouantum — Insights & Engineering Intelligence',
    description:
      'Explore technical insights on AI in construction, predictive maintenance, BIM workflows, civil engineering AI, and quality assurance from the Ouantum team.',
    keywords:
      'AI in construction, predictive maintenance, BIM, civil engineering AI, quality assurance, construction technology, Ouantum blog',
    canonicalPath: '/blog',
    jsonLd: [organizationSchema, blogListingSchema],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'All') return blogPosts;
    return blogPosts.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <main
      className="subpage-wrapper"
      style={{ background: '#000', color: '#fff', minHeight: '100vh', paddingBottom: '100px' }}
    >
      {/* ── Hero ── */}
      <header>
        <section
          className="hero"
          style={{ minHeight: '44vh', paddingTop: '140px', paddingBottom: '60px', textAlign: 'center' }}
          aria-label="Blog hero section"
        >
          <div className="container">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                color: 'rgba(255,255,255,0.4)',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '1.5rem',
              }}
            >
              KNOWLEDGE BASE · TECHNICAL INSIGHTS · FIELD INTELLIGENCE
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{
                fontFamily: 'var(--font-adieu)',
                fontSize: 'clamp(2rem, 6vw, 4.5rem)',
                lineHeight: 1.1,
                marginBottom: '1.5rem',
                textTransform: 'uppercase',
              }}
            >
              THE QUANTUM LOG
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.95rem',
                color: 'rgba(255,255,255,0.55)',
                maxWidth: '580px',
                margin: '0 auto',
                lineHeight: 1.8,
              }}
            >
              Deep-dives into AI-powered construction quality assurance, predictive maintenance,
              BIM workflows, and structural engineering technology.
            </motion.p>
          </div>
        </section>
      </header>

      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* ── Category Filter Tabs ── */}
        <motion.nav
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          aria-label="Blog category filter"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.65rem',
            marginBottom: '3.5rem',
            justifyContent: 'center',
          }}
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            const color = cat === 'All' ? '#fff' : CATEGORY_COLORS[cat] ?? '#fff';
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={isActive}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '8px 18px',
                  borderRadius: '30px',
                  border: isActive
                    ? `1px solid ${color}`
                    : '1px solid rgba(255,255,255,0.15)',
                  background: isActive
                    ? `${color}18`
                    : 'transparent',
                  color: isActive ? color : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
                onMouseOver={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = `${color}60`;
                    e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
                  }
                }}
                onMouseOut={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
                  }
                }}
              >
                {cat}
              </button>
            );
          })}
        </motion.nav>

        {/* ── Blog Grid ── */}
        <section aria-label="Blog posts">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '2rem',
              }}
            >
              {filteredPosts.map((post, idx) => {
                const catColor = CATEGORY_COLORS[post.category] ?? '#fff';
                return (
                  <article key={post.slug} aria-label={post.title}>
                    <motion.div
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.06 }}
                      style={{
                        borderRadius: '20px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        background: 'rgba(255,255,255,0.02)',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        transition: 'border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease',
                      }}
                      onMouseOver={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = `${catColor}35`;
                        el.style.transform = 'translateY(-4px)';
                        el.style.boxShadow = `0 12px 40px rgba(0,0,0,0.4)`;
                      }}
                      onMouseOut={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = 'rgba(255,255,255,0.1)';
                        el.style.transform = 'translateY(0)';
                        el.style.boxShadow = 'none';
                      }}
                    >
                      <div style={{ height: '200px', width: '100%', overflow: 'hidden' }}>
                        <img
                          src={post.coverImage}
                          alt={post.coverImageAlt}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                      </div>
                      <div style={{ padding: '1.5rem 2rem 0' }}>
                        {/* Category tag */}
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.62rem',
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            color: catColor,
                            background: `${catColor}18`,
                            border: `1px solid ${catColor}35`,
                            padding: '4px 10px',
                            borderRadius: '4px',
                            marginBottom: '1.25rem',
                          }}
                        >
                          <Tag size={9} aria-hidden="true" />
                          {post.category}
                        </span>
                      </div>

                      <div
                        style={{
                          padding: '0 2rem 2rem',
                          display: 'flex',
                          flexDirection: 'column',
                          flex: 1,
                        }}
                      >
                        {/* Title */}
                        <h2
                          style={{
                            fontFamily: 'var(--font-adieu)',
                            fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
                            lineHeight: 1.25,
                            color: '#fff',
                            marginBottom: '1rem',
                            fontWeight: 400,
                          }}
                        >
                          {post.title}
                        </h2>

                        {/* Excerpt */}
                        <p
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.82rem',
                            lineHeight: 1.75,
                            color: 'rgba(255,255,255,0.5)',
                            marginBottom: '1.75rem',
                            flex: 1,
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {post.excerpt}
                        </p>

                        {/* Footer row */}
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderTop: '1px solid rgba(255,255,255,0.07)',
                            paddingTop: '1.25rem',
                            gap: '0.75rem',
                            flexWrap: 'wrap',
                          }}
                        >
                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.65rem',
                              color: 'rgba(255,255,255,0.35)',
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em',
                            }}
                          >
                            BY {post.author}
                          </span>
                          <Link
                            to={`/blog/${post.slug}`}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.4rem',
                              color: '#fff',
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.72rem',
                              letterSpacing: '0.1em',
                              textDecoration: 'none',
                              fontWeight: 600,
                              opacity: 0.9,
                              transition: 'opacity 0.2s',
                            }}
                            onMouseOver={(e) => (e.currentTarget.style.opacity = '1')}
                            onMouseOut={(e) => (e.currentTarget.style.opacity = '0.9')}
                            aria-label={`Read full article: ${post.title}`}
                          >
                            READ MORE <ArrowUpRight size={13} aria-hidden="true" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  </article>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {filteredPosts.length === 0 && (
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem',
                color: 'rgba(255,255,255,0.4)',
                textAlign: 'center',
                padding: '4rem 0',
              }}
            >
              No posts in this category yet.
            </p>
          )}
        </section>
      </div>
    </main>
  );
};

export default Blog;
