import React from 'react';
import Hero from '../components/home/Hero';
import PlatformIntro from '../components/home/PlatformIntro';
import Problem from '../components/home/Problem';
import Services from '../components/home/Services';
import HowItWorks from '../components/home/HowItWorks';
import Difference from '../components/home/Difference';
import Partners from '../components/home/Partners';
import Contact from '../components/home/Contact';
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
  logo: `${BASE_URL}/assets/images/logo.png`,
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
    title: 'OUANTUM | AI-Powered Quality Assurance for Civil Infrastructure',
    description:
      'OUANTUM is the AI platform built for civil infrastructure quality assurance, monitoring, and structural auditing. Field data in. Government-grade reports out. Same day.',
    keywords:
      'AI quality assurance, civil engineering AI, structural auditing, NDT analysis, SonReb correlation, IS code compliance, TPQM, construction QA, India infrastructure AI, OUANTUM',
    canonicalPath: '/',
    jsonLd: [websiteSchema, organizationSchema],
  });

  return (
    <main id="main-content" aria-label="OUANTUM home page">
      <Hero />
      <PlatformIntro />
      <Problem />
      <Services />
      <HowItWorks />
      <Difference />
      <Partners />
      <Contact />
    </main>
  );
};

export default Home;
