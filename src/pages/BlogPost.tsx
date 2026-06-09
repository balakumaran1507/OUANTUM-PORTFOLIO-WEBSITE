import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Tag, ArrowUpRight } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
import useSEO from '../hooks/useSEO';

const BASE_URL = 'https://ouantum.com';

const CATEGORY_COLORS: Record<string, string> = {
  'AI in Construction': '#4ade80',
  'Predictive Maintenance': '#60a5fa',
  BIM: '#f472b6',
  'Civil Engineering AI': '#fb923c',
  'Quality Assurance': '#a78bfa',
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Ouantum',
  url: BASE_URL,
  sameAs: ['https://www.linkedin.com/company/ouantum/'],
};

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Related posts: random posts, exclude current post, max 3
  const relatedPosts = React.useMemo(() => {
    if (!post) return [];
    const others = blogPosts.filter((p) => p.slug !== post.slug);
    // Shuffle
    const shuffled = [...others].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  }, [post?.slug]);

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
        name: 'Ouantum',
        url: BASE_URL,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Ouantum',
        url: BASE_URL,
      },
      url: `${BASE_URL}/blog/${post.slug}`,
      keywords: post.tags.join(', '),
      isPartOf: {
        '@type': 'Blog',
        name: 'Ouantum Blog',
        url: `${BASE_URL}/blog`,
      },
    }
    : null;

  useSEO(
    post
      ? {
        title: `${post.title} | Ouantum Blog`,
        description: post.excerpt,
        keywords: post.tags.join(', '),
        ogType: 'article',
        canonicalPath: `/blog/${post.slug}`,
        publishedTime: post.datePublished,
        author: 'Ouantum',
        jsonLd: articleSchema ? [organizationSchema, articleSchema] : [organizationSchema],
      }
      : {
        title: 'Post Not Found | Ouantum Blog',
        description: 'This blog post could not be found.',
        noIndex: true,
      }
  );

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const catColor = CATEGORY_COLORS[post.category] ?? '#fff';

  return (
    <main
      className="subpage-wrapper"
      style={{ background: '#000', color: '#fff', minHeight: '100vh', paddingBottom: '80px' }}
    >
      <div className="container" style={{ maxWidth: '820px', margin: '0 auto', paddingTop: '140px' }}>

        {/* Back link */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: '2.5rem' }}>
          <Link
            to="/blog"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'rgba(255,255,255,0.45)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = '#fff')}
            onMouseOut={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
          >
            <ArrowLeft size={14} aria-hidden="true" />
            BACK TO BLOG
          </Link>
        </nav>

        {/* Article header */}
        <header style={{ marginBottom: '3rem' }}>
          {/* Category tag */}
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: catColor,
              background: `${catColor}18`,
              border: `1px solid ${catColor}35`,
              padding: '5px 12px',
              borderRadius: '4px',
              marginBottom: '1.75rem',
            }}
          >
            <Tag size={9} aria-hidden="true" />
            {post.category}
          </span>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{
              fontFamily: 'var(--font-adieu)',
              fontSize: 'clamp(1.75rem, 4vw, 3rem)',
              lineHeight: 1.15,
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
              paddingBottom: '2rem',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}
          >
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
              <time dateTime={post.datePublished}>{post.date}</time>
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'rgba(255,255,255,0.4)',
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
            color: 'rgba(255,255,255,0.72)',
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
                      color: 'rgba(255,255,255,0.85)',
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
                      color: 'rgba(255,255,255,0.55)',
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
                      paddingLeft: '1.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.85rem',
                    }}
                  >
                    {section.items?.map((item, i) => (
                      <li
                        key={i}
                        style={{
                          lineHeight: 1.75,
                          paddingLeft: '0.5rem',
                          borderLeft: `1px solid ${catColor}40`,
                        }}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                );
              default:
                return null;
            }
          })}
        </article>

        {/* Tags */}
        <footer style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2.5rem' }}>
            {post.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.08em',
                  color: 'rgba(255,255,255,0.45)',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  padding: '4px 12px',
                  borderRadius: '3px',
                }}
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Back to blog */}
          <Link
            to="/blog"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
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
              e.currentTarget.style.background = 'rgba(255,255,255,0.09)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
            }}
          >
            <ArrowLeft size={14} aria-hidden="true" />
            ALL POSTS
          </Link>
        </footer>
      </div>

      {/* ── Related Posts ── */}
      {relatedPosts.length > 0 && (
        <section
          aria-label="Related posts"
          style={{
            marginTop: '5rem',
            borderTop: '1px solid rgba(255,255,255,0.07)',
            paddingTop: '4rem',
            paddingBottom: '2rem',
          }}
        >
          <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                color: 'rgba(255,255,255,0.35)',
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
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  style={{
                    borderRadius: '16px',
                    border: '1px solid rgba(255,255,255,0.08)',
                    background: 'rgba(255,255,255,0.02)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
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
                    el.style.borderColor = 'rgba(255,255,255,0.08)';
                    el.style.transform = 'translateY(0)';
                    el.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ height: '180px', width: '100%', overflow: 'hidden' }}>
                    <img
                      src={related.coverImage}
                      alt={related.coverImageAlt}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
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
                      color: 'rgba(255,255,255,0.45)',
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
