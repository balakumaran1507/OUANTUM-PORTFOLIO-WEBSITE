import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { blogPosts, CATEGORIES, type Category } from '../data/blogPosts';
import useSEO from '../hooks/useSEO';
import GlowCard from '../components/GlowCard';

const BASE_URL = 'https://ouantum.com';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'OUANTUM',
  url: BASE_URL,
  sameAs: ['https://www.linkedin.com/company/ouantum/'],
};

const blogListingSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'OUANTUM Knowledge Centre, Resources & Insights',
  description:
    'Practical resources, technical guidance, and industry insights related to civil infrastructure quality assurance.',
  url: `${BASE_URL}/blog`,
  publisher: {
    '@type': 'Organization',
    name: 'OUANTUM',
    url: BASE_URL,
  },
};

const CATEGORY_COLORS: Record<string, string> = {
  'Quality Assurance': '#ffffff',
  'Infrastructure Inspection': '#ffffff',
  'Structural Assessment': '#ffffff',
  'Engineering Standards': '#ffffff',
  'Industry Insights': '#ffffff',
};

const Blog: React.FC = () => {
  useSEO({
    title: 'Knowledge Centre | OUANTUM, Resources & Insights',
    description:
      'The OUANTUM Knowledge Centre provides practical resources, technical guidance, and industry insights related to civil infrastructure quality assurance.',
    keywords:
      'civil infrastructure QA, engineering standards, structural assessment, NDT testing, concrete quality monitoring, OUANTUM knowledge centre',
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
      style={{ background: '#000000', color: '#fff', minHeight: '100vh', paddingBottom: '100px' }}
    >
      {/* Hero */}
      <section
        className="hero"
        style={{ minHeight: '60vh', paddingTop: '120px' }}
        aria-label="Knowledge Centre hero section"
      >
        <div className="container hero-content">
          <div className="section-split hero-main-layout">
            <motion.div className="sidebar-info hero-left">
              <div className="hero-labels">
                <span className="hero-tech-label">KNOWLEDGE BASE · TECHNICAL INSIGHTS · FIELD INTELLIGENCE</span>
              </div>
              <p className="side-description hero-description">
                DEEP-DIVES INTO DETERMINISTIC ENGINEERING SYSTEMS.
              </p>
            </motion.div>
            <motion.div className="hero-right-content hero-right">
              <h1
                style={{
                  fontFamily: 'var(--font-adieu)',
                  fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                  lineHeight: 1.1,
                  marginBottom: '2rem',
                  textTransform: 'none',
                  color: '#ffffff',
                }}
              >
                Knowledge<br />Centre
              </h1>
            </motion.div>
          </div>
          <p className="hero-subtext" style={{ marginTop: '2rem' }}>
            The OUANTUM Knowledge Centre provides practical resources, technical guidance, and industry insights related to civil infrastructure quality assurance. The content is designed to help engineering professionals, infrastructure organisations, consultants, and project teams better understand inspection processes, quality management, structural assessment, and standards-based reporting.
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
            src="/assets/images/blog_page_bg.png"
            alt="OUANTUM Engineering Journal background image"
            className="subpage-hero-image"
          />
          <div className="overlay-gradient" aria-hidden="true" />
        </motion.div>
      </section>

      <div className="container">
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
            const color = cat === 'All' ? '#000000' : CATEGORY_COLORS[cat] ?? '#000000';
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
                    : '1px solid rgba(255, 255, 255, 0.15)',
                  background: isActive
                    ? `${color}18`
                    : 'transparent',
                  color: isActive ? color : 'rgba(255, 255, 255, 0.55)',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
                onMouseOver={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = `${color}60`;
                    e.currentTarget.style.color = '#ffffff';
                  }
                }}
                onMouseOut={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.55)';
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
                return (
                  <article key={post.slug} aria-label={post.title} style={{ height: '100%' }}>
                    <motion.div
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.06 }}
                      style={{
                        height: '100%',
                        transition: 'transform 0.25s ease',
                      }}
                      onMouseOver={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                      }}
                      onMouseOut={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                      }}
                    >
                      <GlowCard borderRadius={20} style={{ padding: '0.85rem' }}>
                        <div style={{ height: '200px', width: '100%', overflow: 'hidden', borderRadius: '12px' }}>
                          <img
                            src={post.coverImage}
                            alt={post.coverImageAlt}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                          />
                        </div>
                        <div
                          style={{
                            padding: '1.25rem 0.85rem 0.85rem',
                            display: 'flex',
                            flexDirection: 'column',
                            flex: 1,
                          }}
                        >
                          {/* Title */}
                          <h2
                            className="blog-card-title"
                            style={{
                              fontFamily: 'var(--font-adieu)',
                              fontSize: '1.25rem',
                              lineHeight: 1.3,
                              color: '#fff',
                              marginBottom: '1rem',
                              fontWeight: 400,
                            }}
                          >
                            {post.title}
                          </h2>

                          {/* Excerpt */}
                          <p
                            className="blog-card-excerpt"
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.88rem',
                              lineHeight: 1.6,
                              color: 'rgba(255, 255, 255, 0.6)',
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
                              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                              paddingTop: '1.25rem',
                              gap: '0.75rem',
                              flexWrap: 'wrap',
                            }}
                          >
                            <span
                              style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.65rem',
                                color: 'rgba(255, 255, 255, 0.35)',
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
                      </GlowCard>
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
                color: 'rgba(255, 255, 255, 0.4)',
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


