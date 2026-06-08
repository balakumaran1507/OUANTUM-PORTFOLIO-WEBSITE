import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, User } from 'lucide-react';
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

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Build Article JSON-LD (must be outside conditional for hook rules compliance)
  const articleSchema = post
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        image: `${BASE_URL}${post.coverImage}`,
        datePublished: post.publishedTime,
        dateModified: post.publishedTime,
        author: {
          '@type': 'Person',
          name: post.author,
          jobTitle: post.authorRole,
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
          name: 'The Ouantum Log',
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
          ogImage: `${BASE_URL}${post.coverImage}`,
          canonicalPath: `/blog/${post.slug}`,
          publishedTime: post.publishedTime,
          author: post.author,
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

  return (
    <main
      className="subpage-wrapper"
      style={{ background: '#000', color: '#fff', minHeight: '100vh', paddingBottom: '80px' }}
    >
      {/* Hero Image */}
      <div style={{ position: 'relative', height: 'clamp(300px, 45vh, 500px)', overflow: 'hidden' }}>
        <img
          src={post.coverImage}
          alt={post.coverImageAlt}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.85) 100%)',
          }}
          aria-hidden="true"
        />
      </div>

      <div className="container" style={{ maxWidth: '820px', margin: '0 auto', paddingTop: '3rem' }}>

        {/* Back link */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: '3rem' }}>
          <Link
            to="/blog"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'rgba(255,255,255,0.5)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              letterSpacing: '0.1em',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = '#fff')}
            onMouseOut={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
          >
            <ArrowLeft size={14} aria-hidden="true" />
            BACK TO BLOG
          </Link>
        </nav>

        {/* Article header */}
        <header style={{ marginBottom: '3rem' }}>
          {/* Meta row */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.5rem',
              alignItems: 'center',
              marginBottom: '2rem',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                color: 'rgba(255,255,255,0.4)',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <Calendar size={12} aria-hidden="true" />
              <time dateTime={post.publishedTime}>{post.date}</time>
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                color: 'rgba(255,255,255,0.4)',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <Clock size={12} aria-hidden="true" />
              {post.readingTime}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                color: 'rgba(255,255,255,0.4)',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <User size={12} aria-hidden="true" />
              {post.author}
            </span>
          </div>

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
              marginBottom: '1.5rem',
            }}
          >
            {post.title}
          </motion.h1>

          {/* Author info */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-adieu)',
                fontSize: '0.8rem',
                color: '#fff',
                flexShrink: 0,
              }}
              aria-hidden="true"
            >
              {post.author.charAt(0)}
            </div>
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  color: '#fff',
                  margin: 0,
                  letterSpacing: '0.05em',
                }}
              >
                {post.author}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'rgba(255,255,255,0.4)',
                  margin: 0,
                  letterSpacing: '0.05em',
                }}
              >
                {post.authorRole}
              </p>
            </div>
          </div>
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
                      borderLeft: '3px solid rgba(255,255,255,0.25)',
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
                      <li key={i} style={{ lineHeight: 1.75 }}>
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
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '3rem' }}>
            {post.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  letterSpacing: '0.08em',
                  color: 'rgba(255,255,255,0.5)',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
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
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: '#fff',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              letterSpacing: '0.1em',
              textDecoration: 'none',
              padding: '0.85rem 1.75rem',
              borderRadius: '4px',
              transition: 'all 0.2s',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
            }}
          >
            <ArrowLeft size={14} aria-hidden="true" />
            ALL POSTS
          </Link>
        </footer>
      </div>
    </main>
  );
};

export default BlogPost;
