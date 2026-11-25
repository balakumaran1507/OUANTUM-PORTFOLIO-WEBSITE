import React from 'react';
import IntercomHero from '../components/home/IntercomHero';
import IntercomShowcase from '../components/home/IntercomShowcase';
import IntercomFinAgent from '../components/home/IntercomFinAgent';
import IntercomBento from '../components/home/IntercomBento';
import IntercomVideoBanner from '../components/home/IntercomVideoBanner';
import IntercomTestimonials from '../components/home/IntercomTestimonials';
import useSEO from '../hooks/useSEO';

const BASE_URL = 'https://ouantum.com';

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'OUANTUM',
  url: BASE_URL,
  description:
    'AI-powered quality assurance platform for civil infrastructure. Field data in. Government-grade reports out. Same day.',
  potentialAction: {
    '@type': 'SearchAction',
    target: `${BASE_URL}/?s={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'OUANTUM',
  url: BASE_URL,
  logo: `${BASE_URL}/assets/images/logo_horizontal copy.png`,
  description:
    'OUANTUM is the AI platform built for civil infrastructure quality assurance, monitoring, and structural auditing. Compressing weeks of manual analysis into a single working day.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '25, Silambu Street, Padmanabha Nagar, Choolaimedu',
    addressLocality: 'Chennai',
    addressRegion: 'Tamil Nadu',
    postalCode: '600094',
    addressCountry: 'IN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-7695827158',
    contactType: 'customer service',
    availableLanguage: ['English', 'Tamil'],
  },
  sameAs: ['https://www.linkedin.com/company/ouantum/'],
  founders: [
    { '@type': 'Person', name: 'Balakumaran D', jobTitle: 'President' },
    { '@type': 'Person', name: 'Rahul', jobTitle: 'Chief Executive Officer' },
  ],
};

const Home: React.FC = () => {
  useSEO({
    title: 'OUANTUM | AI and Civil Infrastructure Quality Assurance',
    description:
      'OUANTUM is the first fully agentic AI platform in the NDT and QA/QC domain — and the first MCP-native solution for civil infrastructure quality assurance. Field data in. Government-grade reports out. Same day.',
    keywords:
      'AI quality assurance, civil engineering AI, structural auditing, NDT analysis, SonReb correlation, IS code compliance, TPQM, construction QA, India infrastructure AI, OUANTUM',
    canonicalPath: '/',
    jsonLd: [websiteSchema, organizationSchema],
  });

  return (
    <main id="main-content" aria-label="OUANTUM home page" style={{ backgroundColor: 'var(--ic-bg)' }}>
      {/* 1. Hero with 3-line typography, flanking images, and badges */}
      <IntercomHero />

      {/* 2. Interactive Dual-Tabbed Application Showcase */}
      <IntercomShowcase />

      {/* 3. OX1 Autonomous Civil Agent (Intercom Fin Section) */}
      <IntercomFinAgent />

      {/* 5. Platform Bento Capabilities Grid */}
      <IntercomBento />

      {/* 6. Iridescent Video Keynote Card */}
      <IntercomVideoBanner />

      {/* 7. Tabbed Customer Quotes with Electric Blue Highlights */}
      <IntercomTestimonials />
    </main>
  );
};

export default Home;
