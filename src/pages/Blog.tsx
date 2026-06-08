import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Clock, Calendar } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
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
  name: 'Ouantum Blog — Insights on AI-Powered Quality Assurance',
  description:
    'Technical insights, case studies, and industry analysis from Ouantum — the AI platform for civil construction quality assurance and structural auditing in India.',
  url: `${BASE_URL}/blog`,
  publisher: {
    '@type': 'Organization',
    name: 'Ouantum',
    url: BASE_URL,
  },
};

const Blog: React.FC = () => {
  useSEO({
    title: 'Blog | Ouantum — AI Quality Assurance Insights',
    description:
      'Technical insights, NDT analysis deep-dives, and TPQM workflow articles from Ouantum — the AI platform for civil construction quality assurance and structural auditing in India.',
    keywords:
      'Ouantum blog, NDT analysis, SonReb, TPQM, structural auditing, IS code compliance, civil engineering AI, quality assurance India',
    canonicalPath: '/blog',
    jsonLd: [organizationSchema, blogListingSchema],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [featured, ...rest] = blogPosts;

  return (
    <main className="subpage-wrapper" style={{ background: '#000', color: '#fff', minHeight: '100vh', paddingBottom: '80px' }}>
      {/* Hero */}
      <header>
        <section
          className="hero"
          style={{ minHeight: '40vh', paddingTop: '140px', paddingBottom: '60px', textAlign: 'center' }}
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
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                lineHeight: 1.1,
                marginBottom: '1.5rem',
              }}
            >
              THE OUANTUM LOG
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.95rem',
                color: 'rgba(255,255,255,0.6)',
                maxWidth: '580px',
                margin: '0 auto',
                lineHeight: 1.8,
              }}
            >
              Technical insights on AI-powered quality assurance, NDT analysis, and TPQM workflow transformation for India's infrastructure.
            </motion.p>
          </div>
        </section>
      </header>

      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Featured Post */}
        <article aria-label={`Featured post: ${featured.title}`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="animated-silver-bg"
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              borderRadius: '24px',
              border: '1px solid rgba(255,255,255,0.1)',
              overflow: 'hidden',
              marginBottom: '4rem',
              minHeight: '420px',
            }}
          >
            {/* Content */}
            <div
              style={{
                flex: '1 1 400px',
                padding: 'clamp(2rem, 4vw, 3.5rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    gap: '1.5rem',
                    alignItems: 'center',
                    marginBottom: '1.5rem',
                    flexWrap: 'wrap',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      letterSpacing: '0.12em',
                      color: 'rgba(255,255,255,0.4)',
                      textTransform: 'uppercase',
                      background: 'rgba(255,255,255,0.05)',
                      padding: '4px 10px',
                      borderRadius: '3px',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    FEATURED
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: 'rgba(255,255,255,0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    <Calendar size={12} aria-hidden="true" />
                    {featured.date}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: 'rgba(255,255,255,0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    <Clock size={12} aria-hidden="true" />
                    {featured.readingTime}
                  </span>
                </div>
                <h2
                  style={{
                    fontFamily: 'var(--font-adieu)',
                    fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                    lineHeight: 1.15,
                    color: '#fff',
                    marginBottom: '1.25rem',
                  }}
                >
                  {featured.title}
                </h2>
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.875rem',
                    lineHeight: 1.8,
                    color: 'rgba(255,255,255,0.6)',
                    marginBottom: '2rem',
                  }}
                >
                  {featured.excerpt}
                </p>
              </div>
              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'rgba(255,255,255,0.4)',
                    letterSpacing: '0.1em',
                  }}
                >
                  BY {featured.author.toUpperCase()} · {featured.authorRole.toUpperCase()}
                </span>
                <Link
                  to={`/blog/${featured.slug}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#fff',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    letterSpacing: '0.1em',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    opacity: 0.9,
                    transition: 'opacity 0.2s',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.opacity = '1')}
                  onMouseOut={(e) => (e.currentTarget.style.opacity = '0.9')}
                  aria-label={`Read full article: ${featured.title}`}
                >
                  READ MORE <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>
            {/* Image */}
            <div style={{ flex: '1 1 320px', minHeight: '280px', overflow: 'hidden' }}>
              <img
                src={featured.coverImage}
                alt={featured.coverImageAlt}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </motion.div>
        </article>

        {/* Grid Posts */}
        {rest.length > 0 && (
          <section aria-label="More blog posts">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '2rem',
              }}
            >
              {rest.map((post, idx) => (
                <article key={post.slug} aria-label={post.title}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.15 }}
                    className="animated-silver-bg"
                    style={{
                      borderRadius: '20px',
                      border: '1px solid rgba(255,255,255,0.1)',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                    }}
                  >
                    <div style={{ height: '220px', overflow: 'hidden' }}>
                      <img
                        src={post.coverImage}
                        alt={post.coverImageAlt}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div
                      style={{
                        padding: '2.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          gap: '1rem',
                          marginBottom: '1rem',
                          flexWrap: 'wrap',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.68rem',
                            color: 'rgba(255,255,255,0.4)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          <Calendar size={11} aria-hidden="true" />
                          {post.date}
                        </span>
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.68rem',
                            color: 'rgba(255,255,255,0.4)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          <Clock size={11} aria-hidden="true" />
                          {post.readingTime}
                        </span>
                      </div>
                      <h2
                        style={{
                          fontFamily: 'var(--font-adieu)',
                          fontSize: '1.4rem',
                          lineHeight: 1.25,
                          color: '#fff',
                          marginBottom: '1rem',
                        }}
                      >
                        {post.title}
                      </h2>
                      <p
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.84rem',
                          lineHeight: 1.75,
                          color: 'rgba(255,255,255,0.55)',
                          flex: 1,
                          marginBottom: '2rem',
                        }}
                      >
                        {post.excerpt}
                      </p>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                          gap: '0.75rem',
                          marginTop: 'auto',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.7rem',
                            color: 'rgba(255,255,255,0.35)',
                            letterSpacing: '0.08em',
                          }}
                        >
                          BY {post.author.toUpperCase()}
                        </span>
                        <Link
                          to={`/blog/${post.slug}`}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            color: '#fff',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.78rem',
                            letterSpacing: '0.1em',
                            textDecoration: 'none',
                            fontWeight: 'bold',
                            opacity: 0.85,
                            transition: 'opacity 0.2s',
                          }}
                          onMouseOver={(e) => (e.currentTarget.style.opacity = '1')}
                          onMouseOut={(e) => (e.currentTarget.style.opacity = '0.85')}
                          aria-label={`Read full article: ${post.title}`}
                        >
                          READ MORE <ArrowUpRight size={14} aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default Blog;
