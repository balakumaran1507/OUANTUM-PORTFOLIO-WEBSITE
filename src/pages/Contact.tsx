import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, ArrowLeft, ChevronDown } from 'lucide-react';
import useSEO from '../hooks/useSEO';
import '../styles/contact-intercom.css';

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

const COMPANY_SIZES = [
  { value: '1-50', label: '1-50 employees (Audit Consultancy / NDT Lab)' },
  { value: '51-250', label: '51-250 employees (Regional EPC / Testing Agency)' },
  { value: '251-1000', label: '251-1,000 employees (Tier-1 Contractor / Concessionaire)' },
  { value: '1000+', label: '1,000+ employees (National Highway / Metro Authority / EPC Conglomerate)' },
];

const Contact: React.FC = () => {
  useSEO({
    title: 'Contact Sales & Technical Briefing | OUANTUM',
    description:
      'Schedule an appointment with our civil structural AI team. Discover how OUANTUM delivers deterministic NDT calibration, codified IS code audits, and zero-defect compliance.',
    keywords:
      'contact OUANTUM sales, civil infrastructure AI demo, structural audit briefing, NDT calibration inquiry, IS 456 compliance consultation, TPQM AI audit',
    canonicalPath: '/contact',
    jsonLd: [organizationSchema],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Multi-Step Form State (Step 1, 2, 3, or Submitted)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Fields
  const [formData, setFormData] = useState({
    businessEmail: '',
    companySize: '',
    firstName: '',
    lastName: '',
    phone: '',
    organization: '',
    interest: 'NDT SonReb & Ultrasonic Calibration',
    projectScope: '',
  });

  // Validation Errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isCompanySizeOpen, setIsCompanySizeOpen] = useState(false);
  const companySizeDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        companySizeDropdownRef.current &&
        !companySizeDropdownRef.current.contains(e.target as Node)
      ) {
        setIsCompanySizeOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleInterestSelect = (interest: string) => {
    setFormData((prev) => ({ ...prev, interest }));
  };

  // Step 1 Validation
  const validateStep1 = () => {
    const err: { [key: string]: string } = {};
    if (!formData.businessEmail.trim()) {
      err.businessEmail = 'Business email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.businessEmail.trim())) {
      err.businessEmail = 'Please provide a valid business email address';
    }
    if (!formData.companySize) {
      err.companySize = 'Please select your organization size';
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // Step 2 Validation
  const validateStep2 = () => {
    const err: { [key: string]: string } = {};
    if (!formData.firstName.trim()) err.firstName = 'First name is required';
    if (!formData.lastName.trim()) err.lastName = 'Last name is required';
    if (!formData.phone.trim()) {
      err.phone = 'Phone number is required';
    } else if (formData.phone.trim().length < 8) {
      err.phone = 'Please enter a valid phone number';
    }
    if (!formData.organization.trim()) {
      err.organization = 'Company / Agency name is required';
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleNextStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleNextStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep2()) {
      setCurrentStep(3);
    }
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Simulate enterprise submission
      await new Promise((resolve) => setTimeout(resolve, 1100));
      setCurrentStep(4);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      businessEmail: '',
      companySize: '',
      firstName: '',
      lastName: '',
      phone: '',
      organization: '',
      interest: 'NDT SonReb & Ultrasonic Calibration',
      projectScope: '',
    });
    setErrors({});
    setCurrentStep(1);
  };

  return (
    <main className="ic-contact-page" aria-label="Contact Sales Page">
      <div className="ic-contact-container">
        {/* 50/50 Split Screen matching intercom.com/contact-sales */}
        <div className="ic-contact-split">
        {/* Left Column: Image Background & Floating White Card */}
        <div className="ic-contact-left-col">
          <div className="ic-contact-card">
            <h1 className="ic-contact-title">
              Discover the perfect<br />fit with OUANTUM
            </h1>

            <p className="ic-contact-desc">
              Secure an appointment to talk to our civil engineering AI team and learn how OUANTUM guarantees zero-defect structural compliance.
            </p>
          </div>
        </div>

        <div className="ic-contact-right-col">
          <div className="ic-form-wrapper">
            <AnimatePresence mode="wait">
              {/* ── STEP 1 ── */}
              {currentStep === 1 && (
                <motion.form
                  key="step-1"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.25 }}
                  onSubmit={handleNextStep1}
                  noValidate
                >
                  <div className="ic-field-group">
                    <label htmlFor="businessEmail" className="ic-field-label">
                      Business Email<span className="req">*</span>
                    </label>
                    <input
                      id="businessEmail"
                      type="email"
                      name="businessEmail"
                      value={formData.businessEmail}
                      onChange={handleChange}
                      placeholder="Business email address"
                      className="ic-input"
                      autoFocus
                    />
                    {errors.businessEmail && (
                      <div className="ic-field-error">{errors.businessEmail}</div>
                    )}
                  </div>

                  <div className="ic-field-group" ref={companySizeDropdownRef} style={{ position: 'relative' }}>
                    <label htmlFor="companySize" className="ic-field-label">
                      Your company size<span className="req">*</span>
                    </label>

                    <button
                      type="button"
                      id="companySize"
                      onClick={() => setIsCompanySizeOpen(!isCompanySizeOpen)}
                      style={{
                        width: '100%',
                        backgroundColor: '#ffffff',
                        border: isCompanySizeOpen
                          ? '1px solid #111111'
                          : errors.companySize
                          ? '1px solid #d93025'
                          : '1px solid rgba(0, 0, 0, 0.2)',
                        borderRadius: 0,
                        padding: '13px 14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                        fontSize: '0.95rem',
                        lineHeight: 1.4,
                        transition: 'border-color 0.15s ease',
                      }}
                    >
                      <span
                        style={{
                          color: formData.companySize ? '#111111' : '#8c95a6',
                          fontWeight: formData.companySize ? 500 : 400,
                        }}
                      >
                        {COMPANY_SIZES.find((s) => s.value === formData.companySize)?.label || 'Select...'}
                      </span>
                      <ChevronDown
                        size={16}
                        style={{
                          color: '#6a7282',
                          transform: isCompanySizeOpen ? 'rotate(180deg)' : 'none',
                          transition: 'transform 0.2s ease',
                          flexShrink: 0,
                        }}
                      />
                    </button>

                    <AnimatePresence>
                      {isCompanySizeOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.15 }}
                          style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            right: 0,
                            marginTop: '4px',
                            background: '#ffffff',
                            border: '1px solid rgba(0, 0, 0, 0.14)',
                            borderRadius: 0,
                            boxShadow: '0 10px 28px rgba(0, 0, 0, 0.1)',
                            zIndex: 100,
                            overflow: 'hidden',
                          }}
                        >
                          {COMPANY_SIZES.map((option) => {
                            const isSelected = formData.companySize === option.value;
                            return (
                              <div
                                key={option.value}
                                onClick={() => {
                                  setFormData((prev) => ({ ...prev, companySize: option.value }));
                                  if (errors.companySize) {
                                    setErrors((prev) => {
                                      const next = { ...prev };
                                      delete next.companySize;
                                      return next;
                                    });
                                  }
                                  setIsCompanySizeOpen(false);
                                }}
                                style={{
                                  padding: '12px 14px',
                                  fontSize: '0.925rem',
                                  fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                                  color: '#111111',
                                  backgroundColor: isSelected ? '#f4f3ec' : '#ffffff',
                                  fontWeight: isSelected ? 600 : 400,
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  transition: 'background-color 0.12s ease',
                                }}
                                onMouseEnter={(e) => {
                                  if (!isSelected) (e.currentTarget as HTMLElement).style.backgroundColor = '#faf9f6';
                                }}
                                onMouseLeave={(e) => {
                                  if (!isSelected) (e.currentTarget as HTMLElement).style.backgroundColor = '#ffffff';
                                }}
                              >
                                <span>{option.label}</span>
                                {isSelected && <Check size={14} color="#111111" />}
                              </div>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {errors.companySize && (
                      <div className="ic-field-error">{errors.companySize}</div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="ic-btn-submit"
                    id="contact-next-step-1"
                  >
                    <span>Next</span>
                    <ArrowRight size={16} />
                  </button>

                  <p className="ic-legal-text">
                    By continuing, you accept that your data will be processed in accordance with{' '}
                    <a href="/privacy" target="_blank" rel="noopener noreferrer">
                      OUANTUM's Privacy Policy
                    </a>.
                  </p>

                  <div className="ic-step-footer">
                    <span className="ic-step-label">STEP 01/03</span>
                  </div>
                </motion.form>
              )}

              {/* ── STEP 2 ── */}
              {currentStep === 2 && (
                <motion.form
                  key="step-2"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.25 }}
                  onSubmit={handleNextStep2}
                  noValidate
                >
                  <div className="ic-field-row">
                    <div>
                      <label htmlFor="firstName" className="ic-field-label">
                        First Name<span className="req">*</span>
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First name"
                        className="ic-input"
                        autoFocus
                      />
                      {errors.firstName && (
                        <div className="ic-field-error">{errors.firstName}</div>
                      )}
                    </div>

                    <div>
                      <label htmlFor="lastName" className="ic-field-label">
                        Last Name<span className="req">*</span>
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last name"
                        className="ic-input"
                      />
                      {errors.lastName && (
                        <div className="ic-field-error">{errors.lastName}</div>
                      )}
                    </div>
                  </div>

                  <div className="ic-field-group">
                    <label htmlFor="phone" className="ic-field-label">
                      Phone Number<span className="req">*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="ic-input"
                    />
                    {errors.phone && (
                      <div className="ic-field-error">{errors.phone}</div>
                    )}
                  </div>

                  <div className="ic-field-group">
                    <label htmlFor="organization" className="ic-field-label">
                      Company / Agency Name<span className="req">*</span>
                    </label>
                    <input
                      id="organization"
                      type="text"
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      placeholder="e.g. L&T Infrastructure, Dilip Buildcon"
                      className="ic-input"
                    />
                    {errors.organization && (
                      <div className="ic-field-error">{errors.organization}</div>
                    )}
                  </div>

                  <div className="ic-form-btn-row">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="ic-btn-back"
                    >
                      <ArrowLeft size={16} />
                    </button>
                    <button
                      type="submit"
                      className="ic-btn-submit"
                      id="contact-next-step-2"
                    >
                      <span>Next</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>

                  <div className="ic-step-footer">
                    <span className="ic-step-label">STEP 02/03</span>
                  </div>
                </motion.form>
              )}

              {/* ── STEP 3 ── */}
              {currentStep === 3 && (
                <motion.form
                  key="step-3"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.25 }}
                  onSubmit={handleFinalSubmit}
                  noValidate
                >
                  <div className="ic-field-group">
                    <label className="ic-field-label">
                      What can our engineering team assist with?<span className="req">*</span>
                    </label>
                    <div className="ic-pill-options">
                      {[
                        'NDT SonReb & Ultrasonic Calibration',
                        'Codified IS Code / MoRTH Compliance Audit',
                        'Multi-Model Consensus & TPQM Verification',
                        'Platform Enterprise Demo & API Integration',
                      ].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleInterestSelect(opt)}
                          className={`ic-pill-option ${formData.interest === opt ? 'active' : ''}`}
                        >
                          <span>{opt}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="ic-field-group">
                    <label htmlFor="projectScope" className="ic-field-label">
                      Project Scope or Corridor Details{' '}
                      <span style={{ color: '#6a7282', fontWeight: 400 }}>(Optional)</span>
                    </label>
                    <textarea
                      id="projectScope"
                      name="projectScope"
                      rows={3}
                      value={formData.projectScope}
                      onChange={handleChange}
                      placeholder="e.g., Elevated metro viaduct, 140 NDT test locations, upcoming TPQM audit date..."
                      className="ic-textarea"
                    />
                  </div>

                  <div className="ic-form-btn-row">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="ic-btn-back"
                      disabled={isSubmitting}
                    >
                      <ArrowLeft size={16} />
                    </button>
                    <button
                      type="submit"
                      className="ic-btn-submit"
                      disabled={isSubmitting}
                      id="contact-submit-final"
                    >
                      {isSubmitting ? 'Transmitting...' : 'Request Briefing'}
                    </button>
                  </div>

                  <div className="ic-step-footer">
                    <span className="ic-step-label">STEP 03/03</span>
                  </div>
                </motion.form>
              )}

              {/* ── STEP 4: CONFIRMATION STATE ── */}
              {currentStep === 4 && (
                <motion.div
                  key="step-4"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="ic-success-card"
                >
                  <div className="ic-success-icon">
                    <Check size={28} />
                  </div>

                  <h2 className="ic-success-title">Briefing Request Confirmed</h2>

                  <p className="ic-success-body">
                    Thank you, <strong>{formData.firstName || 'Partner'}</strong>. Your consultation request for{' '}
                    <strong>{formData.organization || 'your organization'}</strong> has been received by our senior civil structural AI team. We will be in touch shortly.
                  </p>

                  <div className="ic-direct-box">
                    <div className="ic-direct-title">DIRECT CIVIL ENGINEERING CONTACT</div>
                    <a href="tel:+917695827158" className="ic-direct-link">
                      +91 7695827158
                    </a>
                    <a href="tel:+918610805559" className="ic-direct-link">
                      +91 8610805559
                    </a>
                    <a href="mailto:contact@ouantum.com" className="ic-direct-link">
                      contact@ouantum.com
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="ic-btn-submit"
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Seamless Bottom Quick Access Strip ── */}
      <section className="ic-contact-quick-strip" aria-label="Direct Technical Contacts">
        <div className="ic-quick-card">
          <div className="ic-quick-label">CHENNAI HEADQUARTERS</div>
          <div className="ic-quick-val">
            25, Silambu St, Padmanabha Nagar,<br />
            Choolaimedu, Chennai, TN 600094
          </div>
        </div>

        <div className="ic-quick-card">
          <div className="ic-quick-label">TELEPHONE & TECHNICAL DESK</div>
          <div className="ic-quick-val">
            <a href="tel:+917695827158">+91 7695827158</a><br />
            <a href="tel:+918610805559">+91 8610805559</a>
          </div>
        </div>

        <div className="ic-quick-card">
          <div className="ic-quick-label">DIRECT INQUIRIES & WHATSAPP</div>
          <div className="ic-quick-val">
            <a href="mailto:contact@ouantum.com">contact@ouantum.com</a><br />
            <a
              href="https://api.whatsapp.com/send/?phone=917695827158&text=Hi%20OUANTUM%20team,%20I%20would%20like%20to%20discuss%20a%20structural%20audit%20or%20platform%20demo.&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}
            >
              Start WhatsApp Chat <ArrowRight size={14} />
            </a>
          </div>
        </div>

        <div className="ic-quick-card">
          <div className="ic-quick-label">AUDIT RESPONSE SLA</div>
          <div className="ic-quick-val">
            Under 2 Hours<br />
            <span style={{ fontSize: '0.85rem', color: '#6a7282', fontWeight: 400 }}>
              24/7 National Infrastructure Coverage
            </span>
          </div>
        </div>
      </section>
      </div>
    </main>
  );
};

export default Contact;
