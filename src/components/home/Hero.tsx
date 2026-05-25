import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Phone, Mail, MessageCircle } from 'lucide-react';

const Hero: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);

    try {
      const tgToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
      const tgChatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;
      const tgChatId2 = import.meta.env.VITE_TELEGRAM_CHAT_ID_2;

      if (tgToken && tgChatId) {
        const text = `🚨 *New Website Lead (Hero Form)*\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Phone:* ${formData.phone || 'N/A'}\n*Message:* ${formData.message || 'N/A'}`;

        const sendTo = (chatId: string) =>
          fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'Markdown' }),
          }).catch(() => { });

        await sendTo(tgChatId);
        if (tgChatId2) await sendTo(tgChatId2);
      }

      setIsSuccess(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setIsSuccess(false);
        setFormData({ name: '', email: '', phone: '', message: '' });
      }, 3000);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="hero" className="hero">
      <div className="container hero-content">
        <div className="section-split hero-main-layout">
          <motion.div className="sidebar-info hero-left">
            <div className="hero-labels">
              <span className="hero-tech-label">
                <span className="desktop-only">AI-POWERED QUALITY ASSURANCE · STRUCTURAL AUDITING · </span>INFRASTRUCTURE INTEGRITY
              </span>
            </div>

            <p className="side-description hero-description desktop-only">
              EVERY VARIABLE. INSTANT INTELLIGENCE. AI-POWERED QUALITY ASSURANCE FOR INDIA'S CONSTRUCTION INFRASTRUCTURE.
            </p>
          </motion.div>

          <motion.div className="hero-right-content hero-right">
            <p className="hero-subtext">
              <span className="desktop-only">OUANTUM IS THE AI PLATFORM BUILT FOR CIVIL CONSTRUCTION QUALITY ASSURANCE, MONITORING, AND AUDITING. </span>
              <span className="mobile-only">AI PLATFORM FOR CIVIL QA/QC.<br/><br/></span>
              FIELD DATA IN. GOVERNMENT-GRADE REPORTS OUT. SAME DAY.
            </p>

            <button
              onClick={() => setIsModalOpen(true)}
              className="discuss-button hero-cta"
              style={{ fontFamily: 'var(--font-adieu)', border: 'none', cursor: 'pointer', outline: 'none' }}
            >
              START CONVERSATION
              <div className="cta-icon-wrapper">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </button>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="hero-image-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <img
          src="/assets/images/cl3.png"
          alt="Diagnostic Intelligence"
          className="hero-main-image"
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
              background: 'rgba(0,0,0,0.85)',
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
                background: '#111',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '24px',
                width: '100%',
                maxWidth: '900px',
                maxHeight: '90vh',
                overflowY: 'auto',
                position: 'relative',
                boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
              }}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'rgba(255,255,255,0.1)',
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
              <div style={{ padding: '40px', background: '#0a0a0a' }}>
                <h3 style={{ fontFamily: 'var(--font-adieu)', fontSize: '1.5rem', marginBottom: '10px', textTransform: 'uppercase' }}>Send us a message</h3>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginBottom: '30px' }}>Fill out the form below and we'll get back to you.</p>

                {isSuccess ? (
                  <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10B981', padding: '20px', borderRadius: '12px', color: '#10B981', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
                    Message sent successfully! We'll be in touch soon.
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <input
                      type="text"
                      placeholder="Name"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      style={{ width: '100%', boxSizing: 'border-box', background: '#111', border: '1px solid rgba(255,255,255,0.1)', padding: '14px 16px', borderRadius: '8px', color: '#fff', fontFamily: 'var(--font-mono)', outline: 'none' }}
                    />
                    <div className="contact-modal-form-row">
                      <input
                        type="email"
                        placeholder="Email"
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        style={{ width: '100%', boxSizing: 'border-box', background: '#111', border: '1px solid rgba(255,255,255,0.1)', padding: '14px 16px', borderRadius: '8px', color: '#fff', fontFamily: 'var(--font-mono)', outline: 'none' }}
                      />
                      <input
                        type="tel"
                        placeholder="Phone (Optional)"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        style={{ width: '100%', boxSizing: 'border-box', background: '#111', border: '1px solid rgba(255,255,255,0.1)', padding: '14px 16px', borderRadius: '8px', color: '#fff', fontFamily: 'var(--font-mono)', outline: 'none' }}
                      />
                    </div>
                    <textarea
                      placeholder="Project details or message..."
                      rows={4}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      style={{ width: '100%', boxSizing: 'border-box', background: '#111', border: '1px solid rgba(255,255,255,0.1)', padding: '14px 16px', borderRadius: '8px', color: '#fff', fontFamily: 'var(--font-mono)', resize: 'vertical', outline: 'none' }}
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      style={{ background: '#fff', color: '#000', border: 'none', padding: '16px', borderRadius: '8px', fontFamily: 'var(--font-adieu)', cursor: isSubmitting ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', opacity: isSubmitting ? 0.7 : 1, marginTop: '10px' }}
                    >
                      {isSubmitting ? 'SENDING...' : 'SUBMIT MESSAGE'}
                      <Send size={16} />
                    </button>
                  </form>
                )}
              </div>

              {/* Right Column - Direct Links */}
              <div style={{ padding: '40px', background: '#111', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontFamily: 'var(--font-adieu)', fontSize: '1.5rem', marginBottom: '10px', textTransform: 'uppercase' }}>Direct Contact</h3>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginBottom: '30px' }}>Or reach out to us instantly via these channels.</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, justifyContent: 'center' }}>
                  <a href="https://api.whatsapp.com/send/?phone=917695827158&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', color: '#fff', textDecoration: 'none', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = '#222'} onMouseLeave={e => e.currentTarget.style.background = '#1a1a1a'}>
                    <div style={{ background: '#25D366', color: '#fff', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <MessageCircle size={20} />
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-adieu)', fontSize: '1.1rem' }}>WhatsApp</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>Instant response</div>
                    </div>
                  </a>

                  <a href="tel:+917695827158" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', color: '#fff', textDecoration: 'none', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = '#222'} onMouseLeave={e => e.currentTarget.style.background = '#1a1a1a'}>
                    <div style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Phone size={20} />
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-adieu)', fontSize: '1.1rem' }}>Phone Call</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>+91 76958 27158</div>
                    </div>
                  </a>

                  <a href="mailto:contact@ouantum.com" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', color: '#fff', textDecoration: 'none', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = '#222'} onMouseLeave={e => e.currentTarget.style.background = '#1a1a1a'}>
                    <div style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Mail size={20} />
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-adieu)', fontSize: '1.1rem' }}>Email</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>contact@ouantum.com</div>
                    </div>
                  </a>

                  <a href="https://linkedin.com/company/ouantum" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', color: '#fff', textDecoration: 'none', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = '#222'} onMouseLeave={e => e.currentTarget.style.background = '#1a1a1a'}>
                    <div style={{ background: '#0A66C2', color: '#fff', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-adieu)', fontSize: '1.1rem' }}>LinkedIn</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>Connect professionally</div>
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
