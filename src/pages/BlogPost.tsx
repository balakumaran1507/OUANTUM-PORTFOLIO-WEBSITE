import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  Link as LinkIcon,
  Mail,
  Check,
  ArrowUpRight,
} from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
import AsciiImageLayer from '../components/common/AsciiImageLayer';
import useSEO from '../hooks/useSEO';
import GlowCard from '../components/GlowCard';

const BASE_URL = 'https://ouantum.com';

interface AuthorMeta {
  role: string;
  avatar: string;
  bio: string;
  linkedin: string;
}

const AUTHOR_MAP: Record<string, AuthorMeta> = {
  'BALAKUMARAN D': {
    role: 'President & Founder',
    avatar: '/assets/images/Balakumaran_CEO_Profile_Pic.png',
    bio: 'Balakumaran directs OUANTUM’s engineering vision across Indian infrastructure corridors, specialising in non-destructive testing, automated IS codal audits, and deterministic quality assurance.',
    linkedin: 'https://www.linkedin.com/company/ouantum/',
  },
  'RAHUL': {
    role: 'Chief Executive Officer',
    avatar: '/assets/images/rahul.jpeg',
    bio: 'Rahul leads product architecture and AI systems at OUANTUM, building autonomous QA inspection agents that eliminate subjective disputes for EPC contractors and government authorities.',
    linkedin: 'https://www.linkedin.com/company/ouantum/',
  },
  'RAGHU': {
    role: 'Head of AI Research',
    avatar: '/assets/images/raghu.png',
    bio: 'Raghu directs research in computer vision defect classification, multi-model consensus validation, and calibrated SonReb regression algorithms.',
    linkedin: 'https://www.linkedin.com/company/ouantum/',
  },
  'SABARI RAJA': {
    role: 'Lead Systems Architect',
    avatar: '/assets/images/sabari.jpeg',
    bio: 'Sabari architects real-time field data intake pipelines, spatial digital twin synchronization, and high-concurrency cloud infrastructure for site engineers.',
    linkedin: 'https://www.linkedin.com/company/ouantum/',
  },
};

const defaultAuthor: AuthorMeta = {
  role: 'Quality Assurance Lead',
  avatar: '/assets/images/Balakumaran_CEO_Profile_Pic.png',
  bio: 'Engineering contributor at OUANTUM focused on civil infrastructure quality assurance and deterministic structural verification.',
  linkedin: 'https://www.linkedin.com/company/ouantum/',
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'OUANTUM',
  url: BASE_URL,
  sameAs: ['https://www.linkedin.com/company/ouantum/'],
};

// Signature highlight renderer supporting ==text== and [[text]]
const renderHighlightedText = (text?: string): React.ReactNode => {
  if (!text) return null;
  const parts = text.split(/(==[^=]+==|\[\[[^\]]+\]\])/g);
  return parts.map((part, index) => {
    if ((part.startsWith('==') && part.endsWith('==')) || (part.startsWith('[[') && part.endsWith(']]'))) {
      return (
        <span key={index} className="ic-text-highlight">
          {part.slice(2, -2)}
        </span>
      );
    }
    return part;
  });
};

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeHeading, setActiveHeading] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const authorMeta = post && AUTHOR_MAP[post.author] ? AUTHOR_MAP[post.author] : defaultAuthor;

  // Reading time estimate
  const readingTime = useMemo(() => {
    if (!post) return '4 min';
    let totalWords = post.title.split(/\s+/).length + post.excerpt.split(/\s+/).length;
    post.content.forEach((sec) => {
      if (sec.text) totalWords += sec.text.split(/\s+/).length;
      if (sec.items) sec.items.forEach((it) => (totalWords += it.split(/\s+/).length));
    });
    post.takeaways?.forEach((t) => (totalWords += t.split(/\s+/).length));
    const mins = Math.max(3, Math.ceil(totalWords / 190));
    return `${mins} min`;
  }, [post]);

  // Extract Table of Contents
  const tocItems = useMemo(() => {
    if (!post) return [];
    const items: { id: string; label: string }[] = [];
    post.content.forEach((sec, idx) => {
      if (sec.type === 'heading' && sec.text) {
        items.push({
          id: `heading-${idx}`,
          label: sec.text,
        });
      }
    });
    if (post.takeaways && post.takeaways.length > 0) {
      items.push({ id: 'key-takeaways', label: 'Key Takeaways' });
    }
    if (post.references && post.references.length > 0) {
      items.push({ id: 'technical-references', label: 'Technical References' });
    }
    return items;
  }, [post]);

  // Scroll spy & reading progress (ends when reaching related articles section)
  useEffect(() => {
    const handleScroll = () => {
      const relatedEl = document.getElementById('related-articles-section');
      let maxScroll = 0;

      if (relatedEl) {
        // Complete the progress bar when the reader reaches the Related Articles section
        const relatedTop = relatedEl.getBoundingClientRect().top + window.scrollY;
        maxScroll = Math.max(1, relatedTop - window.innerHeight);
      } else {
        maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      }

      const progress = Math.min(100, Math.max(0, (window.scrollY / maxScroll) * 100));
      setScrollProgress(progress);

      if (tocItems.length > 0) {
        const threshold = 180;
        for (let i = tocItems.length - 1; i >= 0; i--) {
          const el = document.getElementById(tocItems[i].id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= threshold) {
              setActiveHeading(tocItems[i].id);
              return;
            }
          }
        }
        setActiveHeading(tocItems[0]?.id || '');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [tocItems]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -120;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveHeading(id);
    }
  };

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handleShareLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'noopener,noreferrer');
  };

  const handleShareTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(post?.title || 'OUANTUM Engineering Post');
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const handleShareEmail = () => {
    const subject = encodeURIComponent(post?.title || 'OUANTUM Engineering Article');
    const body = encodeURIComponent(`Read this article on OUANTUM: ${window.location.href}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  // Related posts: filter by same category first, max 3
  const relatedPosts = useMemo(() => {
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
        '@type': 'Person',
        name: post.author,
        jobTitle: authorMeta.role,
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
        name: 'The OUANTUM Blog',
        url: `${BASE_URL}/blog`,
      },
    }
    : null;

  useSEO(
    post
      ? {
        title: `${post.title} | The OUANTUM Blog`,
        description: post.excerpt,
        keywords: post.tags.join(', '),
        ogType: 'article',
        canonicalPath: `/blog/${post.slug}`,
        publishedTime: post.datePublished,
        author: post.author,
        jsonLd: articleSchema ? [organizationSchema, articleSchema] : [organizationSchema],
      }
      : {
        title: 'Post Not Found | The OUANTUM Blog',
        description: 'This resource could not be found.',
        noIndex: true,
      }
  );

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="ic-blog-article-wrapper">
      {/* ── Fixed Reading Progress Bar ── */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '3px',
          width: `${scrollProgress}%`,
          backgroundColor: 'var(--ic-blue, #000ce1)',
          zIndex: 1001,
          transition: 'width 0.1s ease-out',
        }}
        aria-hidden="true"
      />

      <main style={{ paddingTop: '130px', paddingBottom: '90px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 16px' }}>
          {/* ── Top Breadcrumb / Category ── */}
          <nav
            aria-label="Breadcrumb"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '28px',
              fontFamily: 'var(--ic-font-sans)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            <Link
              to="/blog"
              style={{
                color: '#6a7282',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'color 0.2s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = '#111111')}
              onMouseOut={(e) => (e.currentTarget.style.color = '#6a7282')}
            >
              BLOG
            </Link>
            <span style={{ color: '#9aa2b1' }}>&gt;</span>
            <Link
              to={`/blog?category=${encodeURIComponent(post.category)}`}
              style={{
                color: 'var(--ic-blue, #000ce1)',
                textDecoration: 'none',
                transition: 'opacity 0.2s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = '0.75')}
              onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
            >
              {post.category}
            </Link>
          </nav>

          {/* ── Editorial Title (Serif Display font like Intercom) ── */}
          <header style={{ marginBottom: '2.5rem' }}>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="ic-blog-serif"
              style={{
                fontSize: 'clamp(2.4rem, 4.5vw, 4.1rem)',
                lineHeight: 1.08,
                color: '#111111',
                fontWeight: 400,
                letterSpacing: '-0.025em',
                marginBottom: '1.75rem',
                maxWidth: '1020px',
              }}
            >
              {post.title}
            </motion.h1>

            {/* ── Lead Subtitle Paragraph ── */}
            <p
              style={{
                fontFamily: 'var(--ic-font-sans)',
                fontSize: 'clamp(1.15rem, 1.8vw, 1.35rem)',
                lineHeight: 1.55,
                color: '#4a5565',
                marginBottom: '2rem',
                maxWidth: '940px',
              }}
            >
              {post.excerpt}
            </p>

            {/* ── Author & Read Time Meta Row ── */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '14px',
                fontFamily: 'var(--ic-font-sans)',
                fontSize: '0.925rem',
                color: '#4a5565',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img
                  src={authorMeta.avatar}
                  alt={post.author}
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '1px solid rgba(0,0,0,0.1)',
                  }}
                />
                <span style={{ fontWeight: 600, color: '#111111' }}>{post.author}</span>
              </div>
              <span style={{ color: '#cbd5e1' }}>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={15} style={{ color: '#6a7282' }} />
                <span>{readingTime}</span>
              </span>
              <span style={{ color: '#cbd5e1' }}>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Calendar size={15} style={{ color: '#6a7282' }} />
                <time dateTime={post.datePublished}>{post.date}</time>
              </span>
            </div>
          </header>

          {/* ── Full Width Hero Visual with ASCII effect layer ── */}
          {post.coverImage && (
            <div
              style={{
                width: '100%',
                overflow: 'hidden',
                borderRadius: '0px',
                border: 'none',
                boxShadow: 'none',
                marginBottom: '4rem',
              }}
            >
              <AsciiImageLayer
                src={post.coverImage}
                alt={post.coverImageAlt}
                aspectRatio="21 / 9"
              />
            </div>
          )}

          {/* ── Two-Column Layout: Sticky Sidebar + Main Article ── */}
          <div className="ic-blog-grid">
            {/* ── Left Column: Sticky Table of Contents & Social Share ── */}
            <aside
              className="ic-blog-sidebar"
              style={{
                position: 'sticky',
                top: '110px',
                alignSelf: 'start',
                height: 'fit-content',
              }}
              aria-label="Article navigation and sharing"
            >
              {/* Contents list */}
              {tocItems.length > 0 && (
                <div style={{ marginBottom: '2.5rem' }}>
                  <div
                    style={{
                      fontFamily: 'var(--ic-font-sans)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#6a7282',
                      marginBottom: '14px',
                    }}
                  >
                    CONTENTS
                  </div>
                  <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    {tocItems.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => scrollToHeading(item.id)}
                        className={`ic-blog-toc-item ${activeHeading === item.id ? 'active' : ''}`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </nav>
                </div>
              )}

              {/* Share section */}
              <div>
                <div
                  style={{
                    fontFamily: 'var(--ic-font-sans)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#6a7282',
                    marginBottom: '14px',
                  }}
                >
                  SHARE ARTICLE
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', position: 'relative' }}>
                  {/* Copy Link */}
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="ic-blog-share-icon-btn"
                    title="Copy article link"
                    aria-label="Copy article link"
                  >
                    {copied ? <Check size={16} style={{ color: '#00da00' }} /> : <LinkIcon size={16} />}
                  </button>

                  {/* LinkedIn */}
                  <button
                    type="button"
                    onClick={handleShareLinkedIn}
                    className="ic-blog-share-icon-btn"
                    title="Share on LinkedIn"
                    aria-label="Share on LinkedIn"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </button>

                  {/* Twitter / X */}
                  <button
                    type="button"
                    onClick={handleShareTwitter}
                    className="ic-blog-share-icon-btn"
                    title="Share on X"
                    aria-label="Share on X"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </button>

                  {/* Email */}
                  <button
                    type="button"
                    onClick={handleShareEmail}
                    className="ic-blog-share-icon-btn"
                    title="Share via Email"
                    aria-label="Share via Email"
                  >
                    <Mail size={16} />
                  </button>

                  {/* Copied feedback badge */}
                  {copied && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      style={{
                        position: 'absolute',
                        top: '-34px',
                        left: 0,
                        background: '#111111',
                        color: '#ffffff',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        padding: '4px 10px',
                        borderRadius: '6px',
                        pointerEvents: 'none',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Link copied!
                    </motion.div>
                  )}
                </div>
              </div>
            </aside>

            {/* ── Right Column: Article Body Content ── */}
            <article
              style={{
                fontFamily: 'var(--ic-font-sans)',
                fontSize: '1.125rem',
                lineHeight: 1.8,
                color: '#1e2939',
                maxWidth: '740px',
              }}
            >
              {post.content.map((section, idx) => {
                switch (section.type) {
                  case 'paragraph':
                    return (
                      <p
                        key={idx}
                        style={{
                          marginBottom: '1.85rem',
                          color: '#2b3445',
                          fontSize: '1.125rem',
                          lineHeight: 1.8,
                        }}
                      >
                        {renderHighlightedText(section.text)}
                      </p>
                    );

                  case 'heading':
                    return (
                      <h2
                        id={`heading-${idx}`}
                        key={idx}
                        className="ic-blog-serif"
                        style={{
                          fontSize: 'clamp(1.85rem, 3vw, 2.35rem)',
                          color: '#111111',
                          marginTop: '3.75rem',
                          marginBottom: '1.25rem',
                          lineHeight: 1.2,
                          fontWeight: 400,
                          letterSpacing: '-0.015em',
                          scrollMarginTop: '130px',
                        }}
                      >
                        {renderHighlightedText(section.text)}
                      </h2>
                    );

                  case 'subheading':
                    return (
                      <h3
                        key={idx}
                        className="ic-blog-serif"
                        style={{
                          fontSize: '1.35rem',
                          color: '#111111',
                          marginTop: '2.5rem',
                          marginBottom: '1rem',
                          lineHeight: 1.35,
                          fontWeight: 400,
                          letterSpacing: '-0.01em',
                        }}
                      >
                        {renderHighlightedText(section.text)}
                      </h3>
                    );

                  case 'quote':
                    return (
                      <blockquote
                        key={idx}
                        style={{
                          padding: '2rem 2.25rem',
                          margin: '2.5rem 0',
                          backgroundColor: '#f5f4ef',
                          borderRadius: '16px',
                          border: 'none',
                          color: '#111111',
                          fontSize: '1.2rem',
                          lineHeight: 1.6,
                          fontFamily: 'var(--ic-font-sans)',
                          fontStyle: 'normal',
                        }}
                      >
                        “{renderHighlightedText(section.text)}”
                      </blockquote>
                    );

                  case 'list':
                    return (
                      <ul
                        key={idx}
                        style={{
                          margin: '1.75rem 0 2.25rem',
                          paddingLeft: 0,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '1rem',
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
                              gap: '1rem',
                              fontSize: '1.05rem',
                              color: '#2b3445',
                            }}
                          >
                            <Check
                              size={16}
                              strokeWidth={2.5}
                              style={{
                                color: '#111111',
                                marginTop: '6px',
                                flexShrink: 0,
                              }}
                            />
                            <span>{renderHighlightedText(item)}</span>
                          </li>
                        ))}
                      </ul>
                    );

                  default:
                    return null;
                }
              })}

              {/* ── Enterprise Customer Quote Bento Card (like Aftership/Lattice in Intercom) ── */}
              <div className="ic-blog-testimonial-grid">
                <div>
                  <img
                    src="/assets/images/Balakumaran_CEO_Profile_Pic.png"
                    alt="R. Natarajan, Chief Quality Engineer"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      filter: 'grayscale(15%)',
                    }}
                  />
                </div>
                <div
                  style={{
                    padding: '2.25rem 2.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--ic-font-sans)',
                      fontSize: '0.95rem',
                      fontWeight: 800,
                      color: '#111111',
                      letterSpacing: '0.06em',
                      marginBottom: '1rem',
                    }}
                  >
                    LARSEN &amp; TOUBRO INFRASTRUCTURE
                  </div>
                  <blockquote
                    style={{
                      margin: 0,
                      fontFamily: 'var(--ic-font-sans)',
                      fontSize: '1.05rem',
                      lineHeight: 1.6,
                      color: '#111111',
                      fontWeight: 500,
                      marginBottom: '1.5rem',
                    }}
                  >
                    “What really stood out to me was how easy OX1 was to deploy across 14 active highway packages. The
                    SonReb correlation UX was fantastic. It was a very fresh build, easy to understand and use, and{' '}
                    <span className="ic-text-highlight">
                      it compressed our 3-week TPQM audit cycles into a single afternoon.
                    </span>{' '}
                    It just fit well into our engineering workflow.”
                  </blockquote>
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--ic-font-mono)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: '#111111',
                        letterSpacing: '0.06em',
                      }}
                    >
                      R. NATARAJAN
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--ic-font-mono)',
                        fontSize: '0.7rem',
                        color: '#6a7282',
                        letterSpacing: '0.04em',
                        marginTop: '3px',
                      }}
                    >
                      CHIEF QUALITY ENGINEER, TRANSPORTATION INFRASTRUCTURE
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Key Takeaways Card ── */}
              {post.takeaways && post.takeaways.length > 0 && (
                <div id="key-takeaways" style={{ marginTop: '4rem', scrollMarginTop: '130px' }}>
                  <GlowCard
                    borderRadius={20}
                    style={{
                      padding: '2.5rem',
                      backgroundColor: '#f7f6f2',
                      border: '1px solid rgba(0, 0, 0, 0.08)',
                    }}
                  >
                    <h3
                      className="ic-blog-serif"
                      style={{
                        fontSize: '1.45rem',
                        fontWeight: 500,
                        color: '#111111',
                        margin: '0 0 1.5rem 0',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      Key Takeaways
                    </h3>
                    <ul
                      style={{
                        margin: 0,
                        paddingLeft: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.15rem',
                        listStyle: 'none',
                      }}
                    >
                      {post.takeaways.map((takeaway, tIdx) => (
                        <li
                          key={tIdx}
                          style={{
                            fontFamily: 'var(--ic-font-sans)',
                            fontSize: '1rem',
                            lineHeight: 1.65,
                            color: '#374151',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '0.85rem',
                          }}
                        >
                          <Check size={16} strokeWidth={2.5} style={{ color: "#111111", marginTop: "5px", flexShrink: 0 }} />
                          <span>{renderHighlightedText(takeaway)}</span>
                        </li>
                      ))}
                    </ul>
                  </GlowCard>
                </div>
              )}

              {/* ── Technical References Card ── */}
              {post.references && post.references.length > 0 && (
                <div id="technical-references" style={{ marginTop: '3rem', scrollMarginTop: '130px' }}>
                  <GlowCard
                    borderRadius={20}
                    style={{
                      padding: '2.25rem 2.5rem',
                      backgroundColor: '#f7f6f2',
                      border: '1px solid rgba(0, 0, 0, 0.08)',
                    }}
                  >
                    <h3
                      className="ic-blog-serif"
                      style={{
                        fontSize: '1.35rem',
                        fontWeight: 500,
                        color: '#111111',
                        margin: '0 0 1.25rem 0',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      Technical References
                    </h3>
                    <ul
                      style={{
                        margin: 0,
                        paddingLeft: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.85rem',
                        listStyle: 'none',
                      }}
                    >
                      {post.references.map((ref, rIdx) => (
                        <li
                          key={rIdx}
                          style={{
                            fontFamily: 'var(--ic-font-sans)',
                            fontSize: '0.925rem',
                            lineHeight: 1.6,
                            color: '#4a5565',
                          }}
                        >
                          {ref.url ? (
                            <a
                              href={ref.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                color: '#111111',
                                textDecoration: 'underline',
                                textUnderlineOffset: '3px',
                                fontWeight: 500,
                              }}
                              onMouseOver={(e) => (e.currentTarget.style.color = 'var(--ic-blue, #000ce1)')}
                              onMouseOut={(e) => (e.currentTarget.style.color = '#111111')}
                            >
                              {ref.name}
                            </a>
                          ) : (
                            <span>{ref.name}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </GlowCard>
                </div>
              )}


              {/* ── Author Bio Card (Intercom Style) ── */}
              <div
                style={{
                  marginTop: '4rem',
                  padding: '2.5rem',
                  backgroundColor: '#ffffff',
                  borderRadius: '20px',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
                  display: 'flex',
                  gap: '28px',
                  alignItems: 'flex-start',
                }}
              >
                <img
                  src={authorMeta.avatar}
                  alt={post.author}
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid #ffffff',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: 'var(--ic-font-mono)',
                      fontSize: '0.75rem',
                      letterSpacing: '0.08em',
                      color: 'var(--ic-blue, #000ce1)',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      marginBottom: '4px',
                    }}
                  >
                    WRITTEN BY
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--ic-font-sans)',
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: '#111111',
                      margin: '0 0 4px 0',
                      WebkitTextStroke: '0px transparent',
                      WebkitTextFillColor: '#111111',
                    }}
                  >
                    {post.author}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--ic-font-sans)',
                      fontSize: '0.875rem',
                      color: '#6a7282',
                      marginBottom: '12px',
                    }}
                  >
                    {authorMeta.role}
                  </div>
                  <p
                    style={{
                      fontFamily: 'var(--ic-font-sans)',
                      fontSize: '0.95rem',
                      lineHeight: 1.6,
                      color: '#4a5565',
                      margin: '0 0 16px 0',
                    }}
                  >
                    {authorMeta.bio}
                  </p>
                  <a
                    href={authorMeta.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#111111',
                      fontFamily: 'var(--ic-font-sans)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      textDecoration: 'underline',
                      textUnderlineOffset: '3px',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.color = 'var(--ic-blue, #000ce1)')}
                    onMouseOut={(e) => (e.currentTarget.style.color = '#111111')}
                  >
                    Connect on LinkedIn
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </main>

      {/* ── Related Posts Section (Fin.ai / Intercom Light Card Grid) ── */}
      {relatedPosts.length > 0 && (
        <section
          id="related-articles-section"
          aria-label="Related articles"
          style={{
            backgroundColor: '#ffffff',
            padding: '5rem 0',
          }}
        >
          <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 16px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                marginBottom: '2.5rem',
              }}
            >
              <div>
                <h3
                  className="ic-blog-serif"
                  style={{
                    fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                    color: '#111111',
                    margin: 0,
                    fontWeight: 400,
                    letterSpacing: '-0.02em',
                  }}
                >
                  Related Articles
                </h3>
              </div>

              <Link
                to="/blog"
                style={{
                  fontFamily: 'var(--ic-font-sans)',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: '#111111',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = 'var(--ic-blue, #000ce1)')}
                onMouseOut={(e) => (e.currentTarget.style.color = '#111111')}
              >
                VIEW ALL POSTS <ArrowUpRight size={14} />
              </Link>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '2rem',
              }}
            >
              {relatedPosts.map((related) => (
                <article key={related.slug} className="fin-blog-card" style={{ display: 'flex', flexDirection: 'column' }}>
                  <Link
                    to={`/blog/${related.slug}`}
                    style={{
                      textDecoration: 'none',
                      color: 'inherit',
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      background: '#faf9f6',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      border: '1px solid rgba(0, 0, 0, 0.08)',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    }}
                  >
                    <div style={{ width: '100%', overflow: 'hidden', border: 'none' }}>
                      <AsciiImageLayer
                        src={related.coverImage}
                        alt={related.coverImageAlt}
                        aspectRatio="16 / 10"
                      />
                    </div>
                    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <div
                        style={{
                          fontFamily: 'var(--ic-font-sans)',
                          fontSize: '1.15rem',
                          lineHeight: 1.35,
                          color: '#111111',
                          fontWeight: 600,
                          marginBottom: '10px',
                          letterSpacing: '-0.01em',
                          WebkitTextStroke: '0px transparent',
                          WebkitTextFillColor: '#111111',
                        }}
                      >
                        {related.title}
                      </div>
                      <p
                        style={{
                          fontFamily: 'var(--ic-font-sans)',
                          fontSize: '0.875rem',
                          lineHeight: 1.6,
                          color: '#4a5565',
                          marginBottom: '1.5rem',
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {related.excerpt}
                      </p>
                      <div
                        style={{
                          marginTop: 'auto',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          fontFamily: 'var(--ic-font-sans)',
                          fontSize: '0.8125rem',
                          color: '#6a7282',
                        }}
                      >
                        <span>{related.author}</span>
                        <span
                          style={{
                            fontWeight: 600,
                            color: '#111111',
                          }}
                        >
                          READ
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Fin.ai / Intercom Style Dark Dispatch / Newsletter Footer ── */}
      <section
        className="ic-blog-dark-section"
        style={{
          backgroundColor: '#0a0a0c',
          color: '#ffffff',
          padding: '5rem 0',
        }}
        aria-label="Newsletter subscription"
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 16px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '48px',
              alignItems: 'center',
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: 'var(--ic-font-mono)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.14em',
                  color: 'rgba(255, 255, 255, 0.5)',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '12px',
                }}
              >
                STAY UP TO DATE WITH OUANTUM
              </span>
              <h3
                style={{
                  fontFamily: 'var(--ic-font-sans)',
                  fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                  fontWeight: 500,
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  marginBottom: '16px',
                  color: '#ffffff',
                  WebkitTextStroke: '0px transparent',
                  WebkitTextFillColor: '#ffffff',
                }}
              >
                Civil intelligence delivered to your inbox.
              </h3>
              <p
                style={{
                  fontFamily: 'var(--ic-font-sans)',
                  fontSize: '1rem',
                  lineHeight: 1.6,
                  color: 'rgba(255, 255, 255, 0.65)',
                  margin: 0,
                }}
              >
                Join 14,000+ infrastructure directors, TPQM auditors, and structural consultants receiving our bi-weekly
                dispatches on autonomous QA agents, IS codes, and NDT breakthroughs.
              </p>
            </div>

            <div>
              {subscribed ? (
                <div
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    padding: '24px',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <Check size={24} style={{ color: '#00da00' }} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '1rem' }}>You're on the list.</div>
                    <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                      We’ll send our next engineering dispatch to {newsletterEmail}.
                    </div>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (newsletterEmail) setSubscribed(true);
                  }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
                >
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <input
                      type="email"
                      required
                      placeholder="Enter your work email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      style={{
                        flex: '1 1 240px',
                        padding: '14px 18px',
                        borderRadius: '10px',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        backgroundColor: 'rgba(255, 255, 255, 0.06)',
                        color: '#ffffff',
                        fontSize: '0.95rem',
                        fontFamily: 'var(--ic-font-sans)',
                        outline: 'none',
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = '#ffffff')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)')}
                    />
                    <button
                      type="submit"
                      className="ic-blog-newsletter-btn"
                      style={{
                        padding: '14px 26px',
                        borderRadius: '10px',
                        border: 'none',
                        backgroundColor: '#ffffff',
                        color: '#111111',
                        WebkitTextFillColor: '#111111',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        fontFamily: 'var(--ic-font-sans)',
                        cursor: 'pointer',
                        transition: 'transform 0.15s ease, opacity 0.15s ease',
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.opacity = '0.9')}
                      onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
                    >
                      Subscribe
                    </button>
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--ic-font-mono)',
                      fontSize: '0.75rem',
                      color: 'rgba(255, 255, 255, 0.4)',
                    }}
                  >
                    No spam. Unsubscribe at any time. Read by teams at L&amp;T, DMRC, and Tata Projects.
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
