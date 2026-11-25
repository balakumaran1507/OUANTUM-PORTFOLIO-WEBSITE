import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Search, CheckCircle2 } from 'lucide-react';
import AsciiImageLayer from '../components/common/AsciiImageLayer';
import { blogPosts, CATEGORIES, type Category, type BlogPost } from '../data/blogPosts';
import useSEO from '../hooks/useSEO';

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
  name: 'The OUANTUM Blog — Civil Infrastructure AI & Structural Intelligence',
  description:
    'Research publications, NDT calculation breakthroughs, IS 456 validation methodologies, and civil infrastructure AI insights.',
  url: `${BASE_URL}/blog`,
  publisher: {
    '@type': 'Organization',
    name: 'OUANTUM',
    url: BASE_URL,
  },
};

const Blog: React.FC = () => {
  useSEO({
    title: 'The OUANTUM Blog | Engineering Research & Civil AI Insights',
    description:
      'Explore technical breakdowns, NDT telemetry breakthroughs, IS code compliance, and structural intelligence research from the OUANTUM team.',
    keywords:
      'civil infrastructure QA, engineering standards, structural assessment, NDT testing, concrete quality monitoring, OUANTUM blog, fin ai',
    canonicalPath: '/blog',
    jsonLd: [organizationSchema, blogListingSchema],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');

  // Filter posts by category and search term
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.author.toLowerCase().includes(q) ||
        post.tags.some((tag) => tag.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // If in 'All' and no search query, separate the first post as the Featured Hero
  const isHeroMode = activeCategory === 'All' && !searchQuery && filteredPosts.length > 0;
  const featuredPost: BlogPost | null = isHeroMode ? filteredPosts[0] : null;
  const gridPosts: BlogPost[] = isHeroMode ? filteredPosts.slice(1) : filteredPosts;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <main
      className="subpage-wrapper"
      style={{
        background: '#ffffff',
        color: '#111111',
        minHeight: '100vh',
        paddingBottom: '0',
      }}
    >
      {/* =========================================================================
          HERO HEADER (Fin.ai signature styling: clean, confident, well-spaced)
          ========================================================================= */}
      <section
        style={{
          paddingTop: 'clamp(28px, 3.5vw, 44px)',
          paddingBottom: 'clamp(20px, 2.5vw, 32px)',
          background: '#ffffff',
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 16px' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              maxWidth: '860px',
            }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontSize: 'clamp(2.75rem, 6vw, 4.75rem)',
                fontWeight: 400,
                lineHeight: 1.0,
                letterSpacing: '-0.035em',
                color: '#111111',
                margin: 0,
              }}
            >
              The OUANTUM Blog
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              style={{
                fontFamily: 'var(--ic-font-sans)',
                fontSize: 'clamp(1.1rem, 1.8vw, 1.35rem)',
                lineHeight: 1.55,
                color: '#4a5565',
                margin: 0,
                maxWidth: '720px',
              }}
            >
              Engineering breakdowns, <span className="ic-text-highlight">NDT research breakthroughs</span>, IS code methodologies, and civil AI insights from the team.
            </motion.p>
          </div>

          {/* Filter Bar & Search (Fin.ai Pill Tabs + Minimal Search) */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              marginTop: '44px',
              paddingBottom: '24px',
            }}
          >
            {/* Category Pills */}
            <nav
              aria-label="Filter blog by topic"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                alignItems: 'center',
              }}
            >
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                    }}
                    type="button"
                    style={{
                      fontFamily: 'var(--ic-font-sans)',
                      fontSize: '0.875rem',
                      fontWeight: isActive ? 600 : 500,
                      padding: '8px 18px',
                      borderRadius: '9999px',
                      border: isActive ? '1px solid #111111' : '1px solid rgba(0, 0, 0, 0.12)',
                      background: isActive ? '#111111' : '#ffffff',
                      color: isActive ? '#ffffff' : '#4a5565',
                      cursor: 'pointer',
                      transition: 'all 0.18s ease',
                      whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = '#f4f3ec';
                        e.currentTarget.style.color = '#111111';
                        e.currentTarget.style.borderColor = '#111111';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = '#ffffff';
                        e.currentTarget.style.color = '#4a5565';
                        e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.12)';
                      }
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </nav>

            {/* Quick Search Input */}
            <div
              style={{
                position: 'relative',
                minWidth: '240px',
                flex: '0 1 300px',
              }}
            >
              <Search
                size={16}
                color="#6a7282"
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none',
                }}
              />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 16px 9px 38px',
                  fontFamily: 'var(--ic-font-sans)',
                  fontSize: '0.875rem',
                  border: '1px solid rgba(0, 0, 0, 0.15)',
                  borderRadius: '9999px',
                  background: '#ffffff',
                  color: '#111111',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#111111';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.15)';
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MAIN CONTENT AREA
          ========================================================================= */}
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 16px 100px' }}>
        {/* =======================================================================
            FEATURED HERO POST (Directly modelled on Fin.ai top article banner)
            ======================================================================= */}
        {featuredPost && (
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              marginBottom: '64px',
              paddingBottom: '48px',
            }}
          >
            <Link
              to={`/blog/${featuredPost.slug}`}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: 'clamp(24px, 4vw, 48px)',
                alignItems: 'center',
                textDecoration: 'none',
                color: 'inherit',
              }}
              className="fin-featured-card"
            >
              {/* Featured Image with ASCII effect layer */}
              <div
                style={{
                  borderRadius: '0px',
                  overflow: 'hidden',
                  border: 'none',
                }}
              >
                <AsciiImageLayer
                  src={featuredPost.coverImage}
                  alt={featuredPost.coverImageAlt}
                  aspectRatio="16 / 10"
                />
              </div>

              {/* Featured Content Details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                  <span
                    style={{
                      fontFamily: 'var(--ic-font-sans)',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      color: '#111111',
                    }}
                  >
                    {featuredPost.category}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--ic-font-sans)',
                      fontSize: '0.85rem',
                      color: '#6a7282',
                    }}
                  >
                    {featuredPost.author}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--ic-font-sans)',
                      fontSize: '0.85rem',
                      color: '#6a7282',
                    }}
                  >
                    {featuredPost.date}
                  </span>
                </div>

                <h2
                  style={{
                    fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                    fontSize: 'clamp(1.75rem, 3.2vw, 2.65rem)',
                    fontWeight: 400,
                    lineHeight: 1.15,
                    letterSpacing: '-0.025em',
                    color: '#111111',
                    margin: 0,
                  }}
                >
                  {featuredPost.title}
                </h2>

                <p
                  style={{
                    fontFamily: 'var(--ic-font-sans)',
                    fontSize: '1.075rem',
                    lineHeight: 1.65,
                    color: '#4a5565',
                    margin: 0,
                  }}
                >
                  {featuredPost.excerpt}
                </p>

                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontFamily: 'var(--ic-font-sans)',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    color: '#111111',
                    marginTop: '8px',
                  }}
                >
                  <span>Read more</span>
                </div>
              </div>
            </Link>
          </motion.article>
        )}

        {/* =======================================================================
            ARTICLES GRID (Fin.ai card style: sleek, minimalist, hover-animated)
            ======================================================================= */}
        <section aria-label="Blog posts list">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCategory}-${searchQuery}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
                gap: '40px 32px',
              }}
            >
              {gridPosts.map((post, idx) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.04 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                  }}
                >
                  <Link
                    to={`/blog/${post.slug}`}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      textDecoration: 'none',
                      color: 'inherit',
                    }}
                    className="fin-blog-card"
                  >
                    {/* Thumbnail Image Container with ASCII effect layer */}
                    <div
                      style={{
                        marginBottom: '18px',
                        borderRadius: '0px',
                        overflow: 'hidden',
                        border: 'none',
                      }}
                    >
                      <AsciiImageLayer
                        src={post.coverImage}
                        alt={post.coverImageAlt}
                        aspectRatio="16 / 10"
                      />
                    </div>

                    {/* Metadata: Category & Date */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        marginBottom: '10px',
                        flexWrap: 'wrap',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--ic-font-sans)',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                          color: '#111111',
                        }}
                      >
                        {post.category}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--ic-font-sans)',
                          fontSize: '0.8125rem',
                          color: '#6a7282',
                        }}
                      >
                        {post.author}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--ic-font-sans)',
                          fontSize: '0.8125rem',
                          color: '#6a7282',
                        }}
                      >
                        {post.date}
                      </span>
                    </div>

                    {/* Headline */}
                    <h3
                      style={{
                        fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                        fontSize: '1.35rem',
                        fontWeight: 400,
                        lineHeight: 1.25,
                        letterSpacing: '-0.015em',
                        color: '#111111',
                        margin: '0 0 10px 0',
                        transition: 'color 0.2s ease',
                      }}
                    >
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p
                      style={{
                        fontFamily: 'var(--ic-font-sans)',
                        fontSize: '0.925rem',
                        lineHeight: 1.6,
                        color: '#4a5565',
                        margin: '0 0 18px 0',
                        flex: 1,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {post.excerpt}
                    </p>

                    <div
                      style={{
                        fontFamily: 'var(--ic-font-sans)',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: '#111111',
                        marginTop: 'auto',
                      }}
                    >
                      <span>Read more</span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredPosts.length === 0 && (
            <div
              style={{
                textAlign: 'center',
                padding: '80px 16px',
                background: '#f4f3ec',
                borderRadius: '0px',
                margin: '40px 0',
              }}
            >
              <h3
                style={{
                  fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                  fontSize: '1.5rem',
                  fontWeight: 400,
                  marginBottom: '8px',
                }}
              >
                No articles found
              </h3>
              <p
                style={{
                  fontFamily: 'var(--ic-font-sans)',
                  fontSize: '1rem',
                  color: '#6a7282',
                  margin: '0 0 20px',
                }}
              >
                Try selecting another category or clearing your search term.
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory('All');
                  setSearchQuery('');
                }}
                className="ic-btn-secondary"
                style={{ padding: '8px 20px', fontSize: '0.875rem', borderRadius: '0px' }}
              >
                Clear all filters
              </button>
            </div>
          )}
        </section>

        {/* =======================================================================
            STAY UP TO DATE WITH OUANTUM (Clean integrated section, no blue, no card)
            ======================================================================= */}
        <section
          style={{
            marginTop: '80px',
            paddingTop: '40px',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '40px',
              alignItems: 'center',
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: 'var(--ic-font-sans)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#6a7282',
                  display: 'block',
                  marginBottom: '10px',
                }}
              >
                Intelligence Dispatch
              </span>
              <h2
                style={{
                  fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                  fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                  fontWeight: 400,
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  color: '#111111',
                  margin: '0 0 12px 0',
                }}
              >
                Stay up to date with OUANTUM
              </h2>
              <p
                style={{
                  fontFamily: 'var(--ic-font-sans)',
                  fontSize: '1rem',
                  lineHeight: 1.6,
                  color: '#4a5565',
                  margin: 0,
                  maxWidth: '520px',
                }}
              >
                Follow OUANTUM on LinkedIn for the latest engineering benchmarks, NDT standards, and field deployments.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a
                  href="https://www.linkedin.com/company/ouantum/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ic-btn-primary"
                  style={{
                    backgroundColor: '#111111',
                    color: '#ffffff',
                    padding: '12px 24px',
                    fontSize: '0.925rem',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    borderRadius: '0px',
                    fontWeight: 600,
                    transition: 'background-color 0.2s ease, transform 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#222222';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#111111';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <span>Follow us on LinkedIn</span>
                  <ArrowUpRight size={15} />
                </a>
              </div>

              {/* Newsletter Form */}
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '8px', maxWidth: '440px', width: '100%' }}>
                {!subscribed ? (
                  <>
                    <input
                      type="email"
                      required
                      placeholder="Enter work email for updates"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      style={{
                        flex: 1,
                        minWidth: 0,
                        padding: '11px 18px',
                        background: '#ffffff',
                        border: '1px solid rgba(0, 0, 0, 0.15)',
                        borderRadius: '0px',
                        color: '#111111',
                        fontSize: '0.875rem',
                        fontFamily: 'var(--ic-font-sans)',
                        outline: 'none',
                        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#111111';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.15)';
                      }}
                    />
                    <button
                      type="submit"
                      style={{
                        background: '#111111',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '0px',
                        padding: '11px 22px',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        transition: 'background-color 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#222222';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#111111';
                      }}
                    >
                      Subscribe
                    </button>
                  </>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#16a34a', fontSize: '0.9rem', fontWeight: 500 }}>
                    <CheckCircle2 size={16} />
                    <span>You’re subscribed to OUANTUM engineering insights!</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Blog;
