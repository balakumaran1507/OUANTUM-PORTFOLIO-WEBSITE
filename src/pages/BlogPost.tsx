import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, ArrowUpRight } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
import useSEO from '../hooks/useSEO';
import GlowCard from '../components/GlowCard';

const BASE_URL = 'https://ouantum.com';

const CATEGORY_COLORS: Record<string, string> = {
  'Quality Assurance': '#ffffff',
  'Infrastructure Inspection': '#ffffff',
  'Structural Assessment': '#ffffff',
  'Engineering Standards': '#ffffff',
  'Industry Insights': '#ffffff',
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'OUANTUM',
  url: BASE_URL,
  sameAs: ['https://www.linkedin.com/company/ouantum/'],
};

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Related posts: filter by same category first, max 3
  const relatedPosts = React.useMemo(() => {
    if (!post) return [];
    let related = blogPosts.filter((p) => p.category === post.category && p.slug !== post.slug);
    if (related.length < 3) {
      const otherCats = blogPosts.filter((p) => p.category !== post.category && p.slug !== post.slug);
      related = [...related, ...otherCats];
    }
    return related.slice(0, 3);
  }, [post]);

  // Article JSON-LD
  const articleSchema = post
    ? {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.excerpt,
      datePublished: post.datePublished,
      dateModified: post.datePublished,
      author: {
        '@type': 'Organization',
        name: 'OUANTUM',
        url: BASE_URL,
      },
      publisher: {
        '@type': 'Organization',
        name: 'OUANTUM',
        url: BASE_URL,
      },
      url: `${BASE_URL}/blog/${post.slug}`,
      keywords: post.tags.join(', '),
      isPartOf: {
        '@type': 'Blog',
        name: 'OUANTUM Knowledge Centre',
        url: `${BASE_URL}/blog`,
      },
    }
    : null;

  useSEO(
    post
      ? {
        title: `${post.title} | OUANTUM Knowledge Centre`,
        description: post.excerpt,
        keywords: post.tags.join(', '),
        ogType: 'article',
        canonicalPath: `/blog/${post.slug}`,
        publishedTime: post.datePublished,
        author: 'OUANTUM',
        jsonLd: articleSchema ? [organizationSchema, articleSchema] : [organizationSchema],
      }
      : {
        title: 'Post Not Found | OUANTUM Knowledge Centre',
        description: 'This resource could not be found.',
        noIndex: true,
      }
  );

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const catColor = CATEGORY_COLORS[post.category] ?? '#000000';

  return (
    <main
      className="subpage-wrapper"
      style={{ background: '#000000', color: '#fff', minHeight: '100vh', paddingBottom: '80px' }}
    >
      <div className="container" style={{ paddingTop: '140px' }}>

        {/* Back link */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: '2.5rem' }}>
          <Link
            to="/blog"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'rgba(255, 255, 255, 0.45)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = '#fff')}
            onMouseOut={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.45)')}
          >
            <ArrowLeft size={14} aria-hidden="true" />
            BACK TO KNOWLEDGE CENTRE
          </Link>
        </nav>

        {/* Article header */}
        <header style={{ marginBottom: '3rem' }}>
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{
              fontFamily: 'var(--font-adieu)',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              lineHeight: 1.1,
              color: '#fff',
              marginBottom: '2rem',
              fontWeight: 400,
            }}
          >
            {post.title}
          </motion.h1>

          {/* Meta row */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.5rem',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'rgba(255, 255, 255, 0.4)',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <Calendar size={12} aria-hidden="true" />
              <time dateTime={post.datePublished}>{post.date}</time>
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'rgba(255, 255, 255, 0.4)',
                letterSpacing: '0.06em',
              }}
            >
              BY {post.author}
            </span>
          </div>

          {/* Cover Image */}
          {post.coverImage && (
            <div style={{ width: '100%', height: '400px', overflow: 'hidden', borderRadius: '16px', marginTop: '3rem', marginBottom: '1rem' }}>
              <img
                src={post.coverImage}
                alt={post.coverImageAlt}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          )}
        </header>

        {/* Article body */}
        <article
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.92rem',
            lineHeight: '1.85',
            color: 'rgba(255, 255, 255, 0.75)',
          }}
        >
          {post.content.map((section, idx) => {
            switch (section.type) {
              case 'paragraph':
                return (
                  <p key={idx} style={{ marginBottom: '1.75rem' }}>
                    {section.text}
                  </p>
                );
              case 'heading':
                return (
                  <h2
                    key={idx}
                    style={{
                      fontFamily: 'var(--font-adieu)',
                      fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                      color: '#fff',
                      marginTop: '3rem',
                      marginBottom: '1.25rem',
                      lineHeight: 1.2,
                      fontWeight: 400,
                    }}
                  >
                    {section.text}
                  </h2>
                );
              case 'subheading':
                return (
                  <h3
                    key={idx}
                    style={{
                      fontFamily: 'var(--font-adieu)',
                      fontSize: '1.1rem',
                      color: 'rgba(255, 255, 255, 0.85)',
                      marginTop: '2rem',
                      marginBottom: '1rem',
                      fontWeight: 400,
                    }}
                  >
                    {section.text}
                  </h3>
                );
              case 'quote':
                return (
                  <blockquote
                    key={idx}
                    style={{
                      borderLeft: `3px solid ${catColor}60`,
                      paddingLeft: '1.5rem',
                      margin: '2.5rem 0',
                      color: 'rgba(255, 255, 255, 0.55)',
                      fontStyle: 'italic',
                      fontSize: '1.05rem',
                      lineHeight: 1.7,
                    }}
                  >
                    {section.text}
                  </blockquote>
                );
              case 'list':
                return (
                  <ul
                    key={idx}
                    style={{
                      margin: '1.5rem 0 2rem',
                      paddingLeft: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.85rem',
                      listStyle: 'none',
                    }}
                  >
                    {section.items?.map((item, i) => (
                      <li
                        key={i}
                        style={{
                          lineHeight: 1.75,
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.75rem',
                        }}
                      >
                        <span
                          style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            backgroundColor: '#ffffff',
                            display: 'inline-block',
                            marginTop: '0.65em',
                            flexShrink: 0,
                          }}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                );
              default:
                return null;
            }
          })}
          
          {/* Key Takeaways */}
          {post.takeaways && post.takeaways.length > 0 && (
            <div style={{ marginTop: '4rem' }}>
              <GlowCard borderRadius={24} style={{ padding: '2.5rem' }}>
                <h3 style={{
                  fontFamily: 'var(--font-adieu)',
                  fontSize: '1rem',
                  color: '#ffffff',
                  marginBottom: '1.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Key Takeaways
                </h3>
                <ul style={{
                  margin: 0,
                  paddingLeft: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  listStyle: 'none',
                }}>
                  {post.takeaways.map((takeaway, tIdx) => (
                    <li key={tIdx} style={{
                      fontFamily: 'var(--font-main)',
                      fontSize: '0.9rem',
                      lineHeight: 1.6,
                      color: 'rgba(255, 255, 255, 0.65)',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                    }}>
                      <span
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: '#ffffff',
                          display: 'inline-block',
                          marginTop: '0.5em',
                          flexShrink: 0,
                        }}
                      />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </GlowCard>
            </div>
          )}

          {/* References */}
          {post.references && post.references.length > 0 && (
            <div style={{ marginTop: '2.5rem' }}>
              <GlowCard borderRadius={24} style={{ padding: '2.5rem' }}>
                <h3 style={{
                  fontFamily: 'var(--font-adieu)',
                  fontSize: '1rem',
                  color: '#ffffff',
                  marginBottom: '1.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Technical References
                </h3>
                <ul style={{
                  margin: 0,
                  paddingLeft: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}>
                  {post.references.map((ref, rIdx) => (
                    <li key={rIdx} style={{
                      fontFamily: 'var(--font-main)',
                      fontSize: '0.88rem',
                      lineHeight: 1.6,
                      color: 'rgba(255, 255, 255, 0.65)',
                    }}>
                      {ref.url ? (
                        <a href={ref.url} target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255, 255, 255, 0.85)', textDecoration: 'none' }}>
                          {ref.name} ↗
                        </a>
                      ) : (
                        ref.name
                      )}
                    </li>
                  ))}
                </ul>
              </GlowCard>
            </div>
          )}

          {/* Governance review date */}
          <div style={{ marginTop: '2rem', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.35)', textTransform: 'uppercase' }}>
            LAST REVIEWED: {post.date} | COMPLIANT STATUS: VALIDATED
          </div>
        </article>

        {/* Article Footer */}
        <footer style={{ marginTop: '3rem' }}>

          {/* Back to blog */}
          <Link
            to="/blog"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(0, 0, 0, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#fff',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              letterSpacing: '0.1em',
              textDecoration: 'none',
              padding: '0.85rem 1.75rem',
              borderRadius: '4px',
              transition: 'all 0.2s',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(0, 0, 0, 0.09)';
              e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.22)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(0, 0, 0, 0.05)';
              e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.1)';
            }}
          >
            <ArrowLeft size={14} aria-hidden="true" />
            BACK TO KNOWLEDGE CENTRE
          </Link>
        </footer>
      </div>

      {/* ── Related Posts ── */}
      {relatedPosts.length > 0 && (
        <section
          aria-label="Related posts"
          style={{
            marginTop: '5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '4rem',
            paddingBottom: '2rem',
          }}
        >
          <div className="container">
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                color: 'rgba(255, 255, 255, 0.35)',
                textTransform: 'uppercase',
                marginBottom: '2rem',
              }}
            >
              Related Articles
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {relatedPosts.map((related, idx) => (
                <motion.article
                  key={related.slug}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <GlowCard borderRadius={16} style={{ padding: '0.75rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ height: '180px', width: '100%', overflow: 'hidden', borderRadius: '10px' }}>
                      <img
                        src={related.coverImage}
                        alt={related.coverImageAlt}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    </div>
                    <div style={{ padding: '1rem 0.5rem 0.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <h3
                        style={{
                          fontFamily: 'var(--font-adieu)',
                          fontSize: '1.1rem',
                          lineHeight: 1.3,
                          color: '#fff',
                          marginBottom: '0.85rem',
                          fontWeight: 400,
                        }}
                      >
                        {related.title}
                      </h3>
                      <p
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.78rem',
                          lineHeight: 1.7,
                          color: 'rgba(255, 255, 255, 0.45)',
                          marginBottom: '1.25rem',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {related.excerpt}
                      </p>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          alignItems: 'center',
                          marginTop: 'auto',
                        }}
                      >
                        <Link
                          to={`/blog/${related.slug}`}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            color: '#fff',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.68rem',
                            letterSpacing: '0.1em',
                            textDecoration: 'none',
                            fontWeight: 600,
                            opacity: 0.85,
                            transition: 'opacity 0.2s',
                          }}
                          onMouseOver={(e) => (e.currentTarget.style.opacity = '1')}
                          onMouseOut={(e) => (e.currentTarget.style.opacity = '0.85')}
                          aria-label={`Read: ${related.title}`}
                        >
                          READ <ArrowUpRight size={12} aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  </GlowCard>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default BlogPost;


