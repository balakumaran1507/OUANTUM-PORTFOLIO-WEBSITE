import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import useSEO from '../hooks/useSEO';
import GlowCard from '../components/GlowCard';

const BASE_URL = 'https://ouantum.com';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'OUANTUM',
  url: BASE_URL,
  sameAs: ['https://www.linkedin.com/company/ouantum/'],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-7695827158',
    contactType: 'customer service',
    email: 'contact@ouantum.com',
    availableLanguage: ['English', 'Tamil'],
  },
};

const Contact: React.FC = () => {
  useSEO({
    title: 'Contact OUANTUM | Get in Touch with Our Team',
    description:
      'Contact OUANTUM to discuss platform integration, structural auditing requirements, or enterprise deployments. Get in touch with our team in Chennai.',
    keywords:
      'contact OUANTUM, OUANTUM email, structural audit demo, QA platform inquiry, civil engineering AI contact Chennai, OUANTUM phone number',
    canonicalPath: '/contact',
    jsonLd: [organizationSchema],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [ctaActive, setCtaActive] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: '',
    website: '', // honeypot — hidden field bots fill, humans don't
  });

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isActive = (idx: number) => activeCard === idx;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    // Honeypot check — bots fill hidden fields, humans don't
    if (formData.website) return;

    setIsSubmitting(true);
    try {
      await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact_form',
          name: formData.name,
          email: formData.email,
          organization: formData.organization,
          message: formData.message,
        }),
      });
      setIsSubmitted(true);
      setFormData({ name: '', email: '', organization: '', message: '', website: '' });
    } catch {
      // Silently succeed — notification is best-effort
      setIsSubmitted(true);
      setFormData({ name: '', email: '', organization: '', message: '', website: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main
      className="subpage-wrapper"
      style={{ background: '#000000', color: '#fff', minHeight: '100vh', paddingBottom: '0' }}
    >
      {/* Hero */}
      <section className="hero" style={{ minHeight: '60vh', paddingTop: '120px' }} aria-label="Contact hero section">
        <div className="container hero-content">
          <div className="section-split hero-main-layout">
            <motion.div className="sidebar-info hero-left">
              <div className="hero-labels">
                <span className="hero-tech-label">
                  COMMUNICATION NODE · GLOBAL REACH
                </span>
              </div>
              <p className="side-description hero-description">
                INITIATE SECURE COMMUNICATIONS WITH OUR ENGINEERING TEAM.
              </p>
            </motion.div>

            <motion.div className="hero-right-content hero-right">
              <h1
                style={{
                  fontFamily: 'var(--font-adieu)',
                  fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                  lineHeight: 1.1,
                  marginBottom: '2rem',
                  color: '#ffffff',
                }}
              >
                Get in Touch<br/>with OUANTUM
              </h1>
            </motion.div>
          </div>
          <p className="hero-subtext" style={{ marginTop: '2rem' }}>
            Whether you have a project enquiry, would like to learn more about our platform, explore collaboration opportunities, or require additional information, our team is here to help. Use the contact form below to submit your enquiry, and the appropriate team will review your request and respond through the contact details you provide.
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
            src="/assets/images/contact-us-hero.jpg"
            alt="OUANTUM Chennai headquarters contact background"
            className="subpage-hero-image"
          />
          <div className="overlay-gradient" aria-hidden="true"></div>
        </motion.div>
      </section>

      {/* Content Section */}
      <section
        className="container"
        style={{ paddingTop: '4rem', paddingBottom: '4rem' }}
        aria-label="Contact options"
      >
        <div className="contact-grid" style={{ marginBottom: '4rem' }}>
          {/* Email */}
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setActiveCard(isActive(0) ? null : 0)}
            role="button"
            tabIndex={0}
            aria-label="Email contact card"
            onKeyDown={(e) => e.key === 'Enter' && setActiveCard(isActive(0) ? null : 0)}
            style={{ cursor: 'pointer' }}
          >
            <GlowCard style={{ padding: '2.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', minHeight: '160px' }}>
                <a
                  href="mailto:contact@ouantum.com"
                  onClick={e => e.stopPropagation()}
                  className="contact-link"
                  aria-label="Send email to OUANTUM at contact@ouantum.com"
                >
                  contact@ouantum.com
                </a>
                <p className="contact-label" style={{ marginTop: 'auto' }}>RESPONSE WITHIN 12H</p>
              </div>
            </GlowCard>
          </motion.div>

          {/* Phone */}
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setActiveCard(isActive(1) ? null : 1)}
            role="button"
            tabIndex={0}
            aria-label="Phone contact card"
            onKeyDown={(e) => e.key === 'Enter' && setActiveCard(isActive(1) ? null : 1)}
            style={{ cursor: 'pointer' }}
          >
            <GlowCard style={{ padding: '2.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', minHeight: '160px' }}>
                <div>
                  <a
                    href="tel:+917695827158"
                    onClick={e => e.stopPropagation()}
                    className="contact-link"
                    style={{ fontSize: '1.25rem', marginBottom: '0.25rem', display: 'block' }}
                    aria-label="Call OUANTUM at +91 7695827158"
                  >
                    +91 7695827158
                  </a>
                  <a
                    href="tel:+918610805559"
                    onClick={e => e.stopPropagation()}
                    className="contact-link"
                    style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'block' }}
                    aria-label="Call OUANTUM at +91 8610805559"
                  >
                    +91 8610805559
                  </a>
                </div>
                <p className="contact-label" style={{ marginTop: 'auto' }}>OPERATIONAL: 24/7</p>
              </div>
            </GlowCard>
          </motion.div>

          {/* Address */}
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setActiveCard(isActive(2) ? null : 2)}
            role="button"
            tabIndex={0}
            aria-label="Office address card"
            onKeyDown={(e) => e.key === 'Enter' && setActiveCard(isActive(2) ? null : 2)}
            style={{ cursor: 'pointer' }}
          >
            <GlowCard style={{ padding: '2.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', minHeight: '160px' }}>
                <address className="contact-address" style={{ fontStyle: 'normal', margin: 0 }}>
                  25, SILAMBU ST,<br />PADMANABHA NAGAR, CHOOLAIMEDU,<br />CHENNAI, TAMIL NADU 600094
                </address>
              </div>
            </GlowCard>
          </motion.div>
        </div>

        {/* Centered Action Button */}
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '4rem' }}>
          <motion.a
            href="https://api.whatsapp.com/send/?phone=917695827158&text&type=phone_number&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setCtaActive(v => !v)}
            className={`contact-cta ${ctaActive ? 'active' : ''}`}
            style={{ textDecoration: 'none', display: 'inline-flex' }}
            aria-label="Start a WhatsApp conversation with OUANTUM"
          >
            <span className="contact-cta-text">
              START WHATSAPP CHAT
            </span>
            <div className="contact-cta-icon" aria-hidden="true">
              <ArrowRight size={24} />
            </div>
          </motion.a>
        </div>

        {/* Interactive Contact Form (CP-002) */}
        <div style={{ width: '100%', margin: '0 0 4rem 0' }}>
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <GlowCard borderRadius={24} style={{ padding: '4rem 3rem', textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <CheckCircle2 size={48} color="#ffffff" />
                </div>
                <h3 style={{ fontFamily: 'var(--font-adieu)', fontSize: '1.25rem', color: '#fff', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
                  Enquiry Sent
                </h3>
                <p style={{
                  fontFamily: 'var(--font-main)',
                  fontSize: '1rem',
                  lineHeight: 1.8,
                  color: 'rgba(255, 255, 255, 0.75)',
                  marginBottom: '2.5rem',
                }}>
                  Thank you for contacting OUANTUM. Your enquiry has been received successfully. Our team will review your request and respond using the contact information you provided. If additional information is required, we will reach out to you directly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  style={{
                    background: 'transparent',
                    color: '#fff',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    borderRadius: '8px',
                    padding: '0.75rem 1.5rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    transition: 'border-color 0.2s',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.borderColor = '#ffffff')}
                  onMouseOut={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)')}
                >
                  Send Another Message
                </button>
              </GlowCard>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <GlowCard borderRadius={24} style={{ padding: '3rem' }}>
                <form
                  onSubmit={handleSubmit}
                  noValidate
                >
                  {/* Honeypot — hidden from real users, caught on submit */}
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={e => setFormData(prev => ({ ...prev, website: e.target.value }))}
                    tabIndex={-1}
                    autoComplete="off"
                    style={{ display: 'none' }}
                    aria-hidden="true"
                  />
                  <p style={{
                    fontFamily: 'var(--font-main)',
                    fontSize: '0.88rem',
                    lineHeight: 1.6,
                    color: 'rgba(255, 255, 255, 0.55)',
                    marginBottom: '2rem',
                    marginTop: 0,
                  }}>
                    Please provide accurate contact information and a brief description of your enquiry to help us respond more efficiently.
                  </p>

                  {/* Form Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
                    {/* Name */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label htmlFor="name" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.75)' }}>
                        Name <span style={{ color: '#ffffff' }}>*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        style={{
                          background: 'rgba(15, 12, 10, 0.85)',
                          border: errors.name ? '1px solid #ff4d4d' : '1px solid rgba(248, 156, 82, 0.35)',
                          borderRadius: '8px',
                          padding: '0.75rem 1rem',
                          color: '#fff',
                          fontSize: '0.9rem',
                          fontFamily: 'var(--font-main)',
                          outline: 'none',
                          boxShadow: errors.name ? '0 0 12px rgba(255, 77, 77, 0.25)' : '0 4px 20px rgba(0, 0, 0, 0.4), 0 0 12px rgba(248, 156, 82, 0.1), inset 0 0 10px rgba(248, 156, 82, 0.05)',
                          backdropFilter: 'blur(12px)',
                          transition: 'all 0.25s ease',
                        }}
                        onFocus={(e) => {
                          if (!errors.name) {
                            e.currentTarget.style.borderColor = 'rgba(248, 156, 82, 0.85)';
                            e.currentTarget.style.boxShadow = '0 0 25px rgba(248, 156, 82, 0.3), inset 0 0 15px rgba(248, 156, 82, 0.15)';
                            e.currentTarget.style.background = 'rgba(22, 17, 14, 0.95)';
                          }
                        }}
                        onBlur={(e) => {
                          if (!errors.name) {
                            e.currentTarget.style.borderColor = 'rgba(248, 156, 82, 0.35)';
                            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.4), 0 0 12px rgba(248, 156, 82, 0.1), inset 0 0 10px rgba(248, 156, 82, 0.05)';
                            e.currentTarget.style.background = 'rgba(15, 12, 10, 0.85)';
                          }
                        }}
                      />
                      {errors.name && <span style={{ color: '#ff4d4d', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>{errors.name}</span>}
                    </div>

                    {/* Email */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label htmlFor="email" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.75)' }}>
                        Email <span style={{ color: '#ffffff' }}>*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        style={{
                          background: 'rgba(15, 12, 10, 0.85)',
                          border: errors.email ? '1px solid #ff4d4d' : '1px solid rgba(248, 156, 82, 0.35)',
                          borderRadius: '8px',
                          padding: '0.75rem 1rem',
                          color: '#fff',
                          fontSize: '0.9rem',
                          fontFamily: 'var(--font-main)',
                          outline: 'none',
                          boxShadow: errors.email ? '0 0 12px rgba(255, 77, 77, 0.25)' : '0 4px 20px rgba(0, 0, 0, 0.4), 0 0 12px rgba(248, 156, 82, 0.1), inset 0 0 10px rgba(248, 156, 82, 0.05)',
                          backdropFilter: 'blur(12px)',
                          transition: 'all 0.25s ease',
                        }}
                        onFocus={(e) => {
                          if (!errors.email) {
                            e.currentTarget.style.borderColor = 'rgba(248, 156, 82, 0.85)';
                            e.currentTarget.style.boxShadow = '0 0 25px rgba(248, 156, 82, 0.3), inset 0 0 15px rgba(248, 156, 82, 0.15)';
                            e.currentTarget.style.background = 'rgba(22, 17, 14, 0.95)';
                          }
                        }}
                        onBlur={(e) => {
                          if (!errors.email) {
                            e.currentTarget.style.borderColor = 'rgba(248, 156, 82, 0.35)';
                            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.4), 0 0 12px rgba(248, 156, 82, 0.1), inset 0 0 10px rgba(248, 156, 82, 0.05)';
                            e.currentTarget.style.background = 'rgba(15, 12, 10, 0.85)';
                          }
                        }}
                      />
                      {errors.email && <span style={{ color: '#ff4d4d', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>{errors.email}</span>}
                    </div>
                  </div>

                  {/* Organization */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
                    <label htmlFor="organization" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.75)' }}>
                      Organization / Company <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>(Optional)</span>
                    </label>
                    <input
                      id="organization"
                      type="text"
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      placeholder="Your company name"
                      style={{
                        background: 'rgba(15, 12, 10, 0.85)',
                        border: '1px solid rgba(248, 156, 82, 0.35)',
                        borderRadius: '8px',
                        padding: '0.75rem 1rem',
                        color: '#fff',
                        fontSize: '0.9rem',
                        fontFamily: 'var(--font-main)',
                        outline: 'none',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4), 0 0 12px rgba(248, 156, 82, 0.1), inset 0 0 10px rgba(248, 156, 82, 0.05)',
                        backdropFilter: 'blur(12px)',
                        transition: 'all 0.25s ease',
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(248, 156, 82, 0.85)';
                        e.currentTarget.style.boxShadow = '0 0 25px rgba(248, 156, 82, 0.3), inset 0 0 15px rgba(248, 156, 82, 0.15)';
                        e.currentTarget.style.background = 'rgba(22, 17, 14, 0.95)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(248, 156, 82, 0.35)';
                        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.4), 0 0 12px rgba(248, 156, 82, 0.1), inset 0 0 10px rgba(248, 156, 82, 0.05)';
                        e.currentTarget.style.background = 'rgba(15, 12, 10, 0.85)';
                      }}
                    />
                  </div>

                  {/* Message */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2.5rem' }}>
                    <label htmlFor="message" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.75)' }}>
                      Message / Project Enquiry <span style={{ color: '#ffffff' }}>*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please describe your project or platform inquiry..."
                      style={{
                        background: 'rgba(15, 12, 10, 0.85)',
                        border: errors.message ? '1px solid #ff4d4d' : '1px solid rgba(248, 156, 82, 0.35)',
                        borderRadius: '8px',
                        padding: '0.75rem 1rem',
                        color: '#fff',
                        fontSize: '0.9rem',
                        fontFamily: 'var(--font-main)',
                        outline: 'none',
                        resize: 'vertical',
                        boxShadow: errors.message ? '0 0 12px rgba(255, 77, 77, 0.25)' : '0 4px 20px rgba(0, 0, 0, 0.4), 0 0 12px rgba(248, 156, 82, 0.1), inset 0 0 10px rgba(248, 156, 82, 0.05)',
                        backdropFilter: 'blur(12px)',
                        transition: 'all 0.25s ease',
                      }}
                      onFocus={(e) => {
                        if (!errors.message) {
                          e.currentTarget.style.borderColor = 'rgba(248, 156, 82, 0.85)';
                          e.currentTarget.style.boxShadow = '0 0 25px rgba(248, 156, 82, 0.3), inset 0 0 15px rgba(248, 156, 82, 0.15)';
                          e.currentTarget.style.background = 'rgba(22, 17, 14, 0.95)';
                        }
                      }}
                      onBlur={(e) => {
                        if (!errors.message) {
                          e.currentTarget.style.borderColor = 'rgba(248, 156, 82, 0.35)';
                          e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.4), 0 0 12px rgba(248, 156, 82, 0.1), inset 0 0 10px rgba(248, 156, 82, 0.05)';
                          e.currentTarget.style.background = 'rgba(15, 12, 10, 0.85)';
                        }
                      }}
                    />
                    {errors.message && <span style={{ color: '#ff4d4d', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>{errors.message}</span>}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '0.5rem',
                      background: isSubmitting ? 'rgba(255, 255, 255, 0.1)' : '#ffffff',
                      color: isSubmitting ? 'rgba(255, 255, 255, 0.5)' : '#000000',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '1rem 2rem',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      textTransform: 'uppercase',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseOver={(e) => {
                      if (!isSubmitting) {
                        e.currentTarget.style.background = '#e6e6e6';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (!isSubmitting) {
                        e.currentTarget.style.background = '#ffffff';
                      }
                    }}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
                  </button>
                </form>
              </GlowCard>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Contact;



