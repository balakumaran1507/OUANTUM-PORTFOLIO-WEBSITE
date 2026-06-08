import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  canonicalPath?: string;
  noIndex?: boolean;
  /** Article-specific */
  publishedTime?: string;
  author?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const BASE_URL = 'https://ouantum.com';
const DEFAULT_IMAGE = `${BASE_URL}/assets/images/og-image.jpg`;

export function useSEO({
  title,
  description,
  keywords,
  ogType = 'website',
  ogImage = DEFAULT_IMAGE,
  canonicalPath = '',
  noIndex = false,
  publishedTime,
  author,
  jsonLd,
}: SEOProps) {
  useEffect(() => {
    const canonicalUrl = `${BASE_URL}${canonicalPath}`;

    // --- Title ---
    document.title = title;

    // Helper: set or create a meta tag
    const setMeta = (selector: string, attr: string, content: string) => {
      let el = document.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement('meta');
        const [key, val] = attr.split('=');
        el.setAttribute(key, val);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const setLink = (rel: string, href: string) => {
      let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    // --- Standard meta ---
    setMeta('meta[name="description"]', 'name=description', description);
    if (keywords) setMeta('meta[name="keywords"]', 'name=keywords', keywords);
    setMeta(
      'meta[name="robots"]',
      'name=robots',
      noIndex
        ? 'noindex, nofollow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    );

    // --- Open Graph ---
    setMeta('meta[property="og:title"]', 'property=og:title', title);
    setMeta('meta[property="og:description"]', 'property=og:description', description);
    setMeta('meta[property="og:type"]', 'property=og:type', ogType);
    setMeta('meta[property="og:image"]', 'property=og:image', ogImage);
    setMeta('meta[property="og:url"]', 'property=og:url', canonicalUrl);
    setMeta('meta[property="og:site_name"]', 'property=og:site_name', 'Ouantum');

    // Article-specific OG
    if (ogType === 'article' && publishedTime) {
      setMeta('meta[property="article:published_time"]', 'property=article:published_time', publishedTime);
    }
    if (ogType === 'article' && author) {
      setMeta('meta[property="article:author"]', 'property=article:author', author);
    }

    // --- Twitter Card ---
    setMeta('meta[name="twitter:card"]', 'name=twitter:card', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', 'name=twitter:title', title);
    setMeta('meta[name="twitter:description"]', 'name=twitter:description', description);
    setMeta('meta[name="twitter:image"]', 'name=twitter:image', ogImage);
    setMeta('meta[name="twitter:site"]', 'name=twitter:site', '@ouantum');
    setMeta('meta[name="twitter:creator"]', 'name=twitter:creator', '@ouantum');

    // Author meta
    if (author) {
      setMeta('meta[name="author"]', 'name=author', author);
    }

    // --- Canonical ---
    setLink('canonical', canonicalUrl);

    // --- JSON-LD ---
    // Remove old dynamic JSON-LD scripts (ones we added, not inline page ones)
    document.querySelectorAll('script[data-seo="true"]').forEach((s) => s.remove());

    const schemas = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];
    schemas.forEach((schema) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo', 'true');
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    return () => {
      // Cleanup JSON-LD on unmount
      document.querySelectorAll('script[data-seo="true"]').forEach((s) => s.remove());
    };
  }, [title, description, keywords, ogType, ogImage, canonicalPath, noIndex, publishedTime, author, jsonLd]);
}

export default useSEO;
