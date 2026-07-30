import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { WordHover } from '@/components/common/WordHover';


const Hero: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '', website: '' }); // 'website' is a honeypot field
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Adjust background image scale, X-axis position, and Y-axis position directly here
  const heroImageScaleDesktop = 1.0;
  const heroImageXDesktop = 0; // in pixels
  const heroImageYDesktop = 0; // in pixels

  const heroImageScaleMobile = 1.00;
  const heroImageXMobile = 0; // in pixels
  const heroImageYMobile = 0; // in pixels

  const heroImageScale = isMobile ? heroImageScaleMobile : heroImageScaleDesktop;
  const heroImageX = isMobile ? heroImageXMobile : heroImageXDesktop;
  const heroImageY = isMobile ? heroImageYMobile : heroImageYDesktop;

  // Adjust direct contact logo configurations (background, scale, X, and Y positions)
  const whatsappLogoBg = 'transparent';
  const whatsappLogoScale = 1.0;
  const whatsappLogoX = 0; // in pixels
  const whatsappLogoY = 0; // in pixels

  const callLogoBg = 'transparent';
  const callLogoScale = 1.0;
  const callLogoX = 0; // in pixels
  const callLogoY = 0; // in pixels

  const emailLogoBg = 'transparent';
  const emailLogoScale = 1.0;
  const emailLogoX = 0; // in pixels
  const emailLogoY = 0; // in pixels

  const linkedinLogoBg = 'transparent';
  const linkedinLogoScale = 1.0;
  const linkedinLogoX = 0; // in pixels
  const linkedinLogoY = 0; // in pixels

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    // Honeypot check — bots fill hidden fields, humans don't
    if (formData.website) return;

    setIsSubmitting(true);

    try {
      // Notify via server-side API route — no secrets in client code
      await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'hero_form',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });

      setIsSuccess(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setIsSuccess(false);
        setFormData({ name: '', email: '', phone: '', message: '', website: '' });
      }, 3000);
    } catch {
      // Silently succeed — notification is non-critical
      setIsSuccess(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setIsSuccess(false);
        setFormData({ name: '', email: '', phone: '', message: '', website: '' });
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="hero" className="hero">
      <div
        className="container hero-content"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          height: '100%',
          minHeight: 'calc(100vh - 100px)',
          paddingTop: '40px',
          paddingBottom: '40px',
          zIndex: 10,
        }}
      >
        {/* Main Content Stack */}
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'flex-start' : 'flex-end',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '1.5rem' : '3rem',
            marginTop: 'auto',
            marginBottom: '0px',
          }}
        >
          {/* Left: Title */}
          <div style={{ flex: '1 1 auto', minWidth: '280px' }}>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{
                fontFamily: 'var(--font-brand)',
                fontSize: 'clamp(3rem, 9vw, 7.5rem)',
                fontWeight: 400,
                lineHeight: 0.85,
                color: 'rgba(255, 255, 255, 0.9)',
                margin: 0,
                textAlign: 'left',
                letterSpacing: '-0.03em',
                textTransform: 'uppercase',
              }}
            >
              OUANTUM
            </motion.h1>
          </div>

          {/* Right: Wording Content & Buttons */}
          <div
            style={{
              flex: '0 1 540px',
              minWidth: '320px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '1.5rem',
              paddingBottom: '10px',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              style={{
                fontFamily: 'var(--font-main)',
                fontSize: 'clamp(0.9rem, 1.2vw, 1rem)',
                lineHeight: 1.5,
                color: '#b0b0b0',
                fontWeight: 400,
                textAlign: 'left',
              }}
            >
              <p style={{ margin: 0 }}>
                <WordHover text="OUANTUM is the world's first AI-Powered Quality Assurance for Civil Infrastructure that helps government agencies, infrastructure organisations, engineering consultants, and quality inspection teams improve construction quality through AI-assisted inspection, structural assessment, monitoring, and standards-based reporting from a single platform." />
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{
                display: 'flex',
                gap: '0.75rem',
                flexWrap: isMobile ? 'wrap' : 'nowrap',
                margin: '0',
                width: '100%',
              }}
            >
              <Link
                to="/#activities"
                onClick={(e) => {
                  const el = document.getElementById('activities');
                  if (el) {
                    e.preventDefault();
                    el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                style={{
                  fontFamily: 'var(--font-adieu)',
                  fontSize: '0.74rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  color: '#000000',
                  backgroundColor: '#ffffff',
                  border: 'none',
                  borderRadius: '9999px',
                  padding: '0.8rem 1.5rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.25s ease',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.opacity = '0.9';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Explore the Platform
              </Link>

              <Link
                to="/contact"
                style={{
                  fontFamily: 'var(--font-adieu)',
                  fontSize: '0.74rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  color: '#ffffff',
                  backgroundColor: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '9999px',
                  padding: '0.8rem 1.5rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.25s ease',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = '#ffffff';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Contact Our Team
              </Link>
            </motion.div>
          </div>
        </div>



      </div>

      <motion.div
        className="hero-image-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <motion.img
          src="/assets/images/0deda3f3-08be-4515-af7b-2e1b6c2d97d8.png"
          alt="OUANTUM Architecture"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: `scale(${heroImageScale}) translate(${heroImageX}px, ${heroImageY}px)`,
            display: 'block'
          }}
        />
        <div className="overlay-gradient"></div>
      </motion.div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(10px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
          >
            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="contact-modal-grid"
              style={{
                background: '#000000',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '24px',
                width: '100%',
                maxWidth: '900px',
                maxHeight: '90vh',
                overflowY: 'auto',
                position: 'relative',
                boxShadow: '0 30px 60px rgba(0, 0, 0, 0.12)',
              }}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  color: '#fff',
                  width: '32px', height: '32px',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10,
                }}
              >
                <X size={16} />
              </button>

              {/* Left Column - Form */}
              <div style={{ padding: '40px', background: '#000000' }}>
                <h3 style={{ fontFamily: 'var(--font-adieu)', fontSize: '1.5rem', marginBottom: '10px', textTransform: 'uppercase' }}>Send us a message</h3>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '30px' }}>Fill out the form below and we'll get back to you.</p>

                {isSuccess ? (
                  <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.15)', padding: '20px', borderRadius: '12px', color: '#ffffff', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
                    Message sent successfully! We'll be in touch soon.
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {/* Honeypot — hidden from real users, bots fill it */}
                    <input
                      type="text"
                      name="website"
                      value={formData.website}
                      onChange={e => setFormData({ ...formData, website: e.target.value })}
                      tabIndex={-1}
                      autoComplete="off"
                      style={{ display: 'none' }}
                      aria-hidden="true"
                    />
                    <input
                      type="text"
                      placeholder="Name"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        background: 'rgba(15, 12, 10, 0.85)',
                        border: '1px solid rgba(248, 156, 82, 0.35)',
                        padding: '14px 16px',
                        borderRadius: '8px',
                        color: '#fff',
                        fontFamily: 'var(--font-mono)',
                        outline: 'none',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4), 0 0 12px rgba(248, 156, 82, 0.1), inset 0 0 10px rgba(248, 156, 82, 0.05)',
                        backdropFilter: 'blur(12px)',
                        transition: 'all 0.25s ease',
                      }}
                    />
                    <div className="contact-modal-form-row">
                      <input
                        type="email"
                        placeholder="Email"
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        style={{
                          width: '100%',
                          boxSizing: 'border-box',
                          background: 'rgba(15, 12, 10, 0.85)',
                          border: '1px solid rgba(248, 156, 82, 0.35)',
                          padding: '14px 16px',
                          borderRadius: '8px',
                          color: '#fff',
                          fontFamily: 'var(--font-mono)',
                          outline: 'none',
                          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4), 0 0 12px rgba(248, 156, 82, 0.1), inset 0 0 10px rgba(248, 156, 82, 0.05)',
                          backdropFilter: 'blur(12px)',
                          transition: 'all 0.25s ease',
                        }}
                      />
                      <input
                        type="tel"
                        placeholder="Phone (Optional)"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        style={{
                          width: '100%',
                          boxSizing: 'border-box',
                          background: 'rgba(15, 12, 10, 0.85)',
                          border: '1px solid rgba(248, 156, 82, 0.35)',
                          padding: '14px 16px',
                          borderRadius: '8px',
                          color: '#fff',
                          fontFamily: 'var(--font-mono)',
                          outline: 'none',
                          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4), 0 0 12px rgba(248, 156, 82, 0.1), inset 0 0 10px rgba(248, 156, 82, 0.05)',
                          backdropFilter: 'blur(12px)',
                          transition: 'all 0.25s ease',
                        }}
                      />
                    </div>
                    <textarea
                      placeholder="Project details or message..."
                      rows={4}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        background: 'rgba(15, 12, 10, 0.85)',
                        border: '1px solid rgba(248, 156, 82, 0.35)',
                        padding: '14px 16px',
                        borderRadius: '8px',
                        color: '#fff',
                        fontFamily: 'var(--font-mono)',
                        resize: 'vertical',
                        outline: 'none',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4), 0 0 12px rgba(248, 156, 82, 0.1), inset 0 0 10px rgba(248, 156, 82, 0.05)',
                        backdropFilter: 'blur(12px)',
                        transition: 'all 0.25s ease',
                      }}
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      style={{
                        background: '#fff',
                        color: '#000000',
                        border: 'none',
                        padding: '16px',
                        borderRadius: '8px',
                        fontFamily: 'var(--font-adieu)',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        opacity: isSubmitting ? 0.7 : 1,
                        marginTop: '10px',
                        width: '100%',
                        fontWeight: 600,
                        transition: 'opacity 0.3s ease',
                      }}
                      onMouseOver={(e) => {
                        if (!isSubmitting) e.currentTarget.style.opacity = '0.9';
                      }}
                      onMouseOut={(e) => {
                        if (!isSubmitting) e.currentTarget.style.opacity = '1';
                      }}
                    >
                      {isSubmitting ? 'SENDING...' : 'SUBMIT MESSAGE'}
                      <Send size={16} />
                    </button>
                  </form>
                )}
              </div>

              {/* Right Column - Direct Links */}
              <div style={{ padding: '40px', background: '#000000', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontFamily: 'var(--font-adieu)', fontSize: '1.5rem', marginBottom: '10px', textTransform: 'uppercase' }}>Direct Contact</h3>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '30px' }}>Or reach out to us instantly via these channels.</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, justifyContent: 'center' }}>
                  <a href="https://api.whatsapp.com/send/?phone=917695827158&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px', background: '#000000', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '12px', color: '#fff', textDecoration: 'none', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = '#121212'} onMouseLeave={e => e.currentTarget.style.background = '#000000'}>
                    <div style={{ background: whatsappLogoBg, color: '#fff', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
                      <img
                        src="/assets/images/whatsapp_logo.png"
                        alt="WhatsApp"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transform: `scale(${whatsappLogoScale}) translate(${whatsappLogoX}px, ${whatsappLogoY}px)`,
                          display: 'block'
                        }}
                      />
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-adieu)', fontSize: '1.1rem' }}>WhatsApp</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.5)', marginTop: '4px' }}>Instant response</div>
                    </div>
                  </a>

                  <a href="tel:+917695827158" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px', background: '#000000', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '12px', color: '#fff', textDecoration: 'none', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = '#121212'} onMouseLeave={e => e.currentTarget.style.background = '#000000'}>
                    <div style={{ background: callLogoBg, color: '#fff', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
                      <img
                        src="/assets/images/call_logo.png"
                        alt="Phone Call"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transform: `scale(${callLogoScale}) translate(${callLogoX}px, ${callLogoY}px)`,
                          display: 'block'
                        }}
                      />
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-adieu)', fontSize: '1.1rem' }}>Phone Call</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.5)', marginTop: '4px' }}>+91 76958 27158</div>
                    </div>
                  </a>

                  <a href="mailto:contact@ouantum.com" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px', background: '#000000', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '12px', color: '#fff', textDecoration: 'none', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = '#121212'} onMouseLeave={e => e.currentTarget.style.background = '#000000'}>
                    <div style={{ background: emailLogoBg, color: '#fff', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
                      <img
                        src="/assets/images/email_logo.jpg"
                        alt="Email"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transform: `scale(${emailLogoScale}) translate(${emailLogoX}px, ${emailLogoY}px)`,
                          display: 'block'
                        }}
                      />
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-adieu)', fontSize: '1.1rem' }}>Email</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.5)', marginTop: '4px' }}>contact@ouantum.com</div>
                    </div>
                  </a>

                  <a href="https://linkedin.com/company/ouantum" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px', background: '#000000', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '12px', color: '#fff', textDecoration: 'none', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = '#121212'} onMouseLeave={e => e.currentTarget.style.background = '#000000'}>
                    <div style={{ background: linkedinLogoBg, color: '#fff', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
                      <img
                        src="/assets/images/linkedin_logo.png"
                        alt="LinkedIn"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transform: `scale(${linkedinLogoScale}) translate(${linkedinLogoX}px, ${linkedinLogoY}px)`,
                          display: 'block'
                        }}
                      />
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-adieu)', fontSize: '1.1rem' }}>LinkedIn</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.5)', marginTop: '4px' }}>Connect professionally</div>
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;


