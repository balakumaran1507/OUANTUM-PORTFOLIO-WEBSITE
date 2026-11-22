import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import { Groq } from 'groq-sdk';

const WELCOME_MESSAGE = `Hey, I'm Oxy at OUANTUM. What kind of project are you working on?`;

const QUICK_PROMPTS = [
  { label: 'What does OUANTUM do?', value: 'What does OUANTUM do?' },
  { label: 'Is it right for my project?', value: 'How do I know if OUANTUM is right for my project?' },
  { label: 'Request a demo', value: 'I want to see a demo of OUANTUM.' },
  { label: 'Talk to the founders', value: 'I want to speak to someone from the OUANTUM team directly.' },
];

const SYSTEM_PROMPT = `You are Oxy, the AI assistant at OUANTUM. You represent OUANTUM.

OUANTUM is an AI platform for civil construction QA/QC in India. It takes NDT field readings (rebound hammer, UPV, carbonation, chloride) and auto-checks them against IS codes (IS 456, IS 13311, IS 1786 etc), runs SonReb correlation, and generates government-format reports the same day. What used to take 5 to 14 days now takes under 4 hours. It has been used on Amaravati Capital City, Tamil Nadu Housing Board projects, and ADB-funded PMAY schemes.

Founders: Bala (Balakumaran D) built the AI and calculation engine. Rahul handles growth and strategy. Both reachable at +91 7695827158 or +91 861 080 5559.

Your job is to qualify and convert. Ask what project they are on first. Then connect OUANTUM to their exact pain. Push for a call or demo. When they show interest, ask for their name and number so Bala or Rahul can call them directly.

Always end your reply with the contact line: Call or WhatsApp us, +91 7695827158 | +91 861 080 5559

If you do not know something, say "Let me connect you with Bala directly on this, drop your number and he will call you."

Rules: No markdown. No asterisks, no dashes, no numbered lists. Plain text only. Keep replies short, 3 to 5 sentences max. One thought at a time. If someone is abusive, one dry line then move on.`;

type Message = { role: 'user' | 'assistant'; content: string };

// Detect contact details (phone, email, name patterns) in user messages
const detectLeadInfo = (text: string): string | null => {
  const hasPhone = /[6-9]\d{9}/.test(text.replace(/\s/g, ''));
  const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(text);
  const hasName = /my name is|i am|i'm|this is/i.test(text);
  if (hasPhone || hasEmail || hasName) return text;
  return null;
};

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showGreetingBubble, setShowGreetingBubble] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickPrompts, setShowQuickPrompts] = useState(true);
  const [leadFired, setLeadFired] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Greeting bubble mascot tuning parameters
  const greetingMascotScale = 1.0;
  const greetingMascotX = 0; // in pixels
  const greetingMascotY = 0; // in pixels
  const greetingMascotWidth = '54px';

  // Greeting bubble close button position
  const greetingCloseTop = 10; // in pixels from top
  const greetingCloseRight = 10; // in pixels from right

  // Header Logo Height
  const headerLogoHeight = '32px';

  // Chat window max width
  const desktopChatbarMaxWidth = '385px';
  const mobileChatbarMaxWidth = 'min(360px, calc(100vw - 32px))';
  const chatbarMaxWidth = isMobile ? mobileChatbarMaxWidth : desktopChatbarMaxWidth;

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isLoading]);

  const sendMessage = async (userMessage: string) => {
    if (!userMessage.trim() || isLoading) return;

    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsLoading(true);
    setShowQuickPrompts(false);

    try {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;
      if (!apiKey) throw new Error('API key not configured.');

      const groq = new Groq({ apiKey, dangerouslyAllowBrowser: true });

      const history = messages.map(m => ({ role: m.role, content: m.content }));

      const completion = await groq.chat.completions.create({
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...history,
          { role: 'user', content: userMessage },
        ],
        model: 'llama-3.1-8b-instant',
        max_tokens: 250,
      });

      const responseText = completion.choices[0]?.message?.content || 'No response.';
      setMessages(prev => [...prev, { role: 'assistant', content: responseText }]);

      // Silently notify founder via Telegram
      const tgToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
      const tgChatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;
      const tgChatId2 = import.meta.env.VITE_TELEGRAM_CHAT_ID_2;
      if (tgToken && tgChatId) {
        const sendTo = (chatId: string, text: string) =>
          fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'Markdown' }),
          }).catch(() => { });

        // Standard query notification
        const tgText = `💬 *OUANTUM Chatbot, New Query*\n\n*Asked:* ${userMessage}\n\n*AI replied:* ${responseText}`;
        sendTo(tgChatId, tgText);
        if (tgChatId2) sendTo(tgChatId2, tgText);

        // 🔥 Lead alert, fires once when contact details are detected
        const leadInfo = detectLeadInfo(userMessage);
        if (leadInfo && !leadFired) {
          setLeadFired(true);
          const fullConvo = [...messages, { role: 'user' as const, content: userMessage }]
            .map(m => `${m.role === 'user' ? '👤' : '🤖'} ${m.content}`)
            .join('\n\n');
          const leadText = `🔥 *HOT LEAD, Contact Details Detected*\n\n*Details shared:* ${leadInfo}\n\n*Full conversation:*\n${fullConvo.slice(0, 600)}${fullConvo.length > 600 ? '...' : ''}`;
          sendTo(tgChatId, leadText);
          if (tgChatId2) sendTo(tgChatId2, leadText);
        }
      }

    } catch (error: unknown) {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: `Error: ${error instanceof Error ? error.message : 'Something went wrong.'}` },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    setShowGreetingBubble(false);
    setShowQuickPrompts(messages.length === 0);
  };

  return (
    <>
      {/* Intercom-style Greeting Bubble */}
      {!isOpen && !isMobile && showGreetingBubble && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3, delay: 0.8 }}
          onClick={handleOpen}
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '6.25rem',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '14px 34px 14px 18px',
            boxShadow: '0 12px 36px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.04)',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            maxWidth: '320px',
            zIndex: 99998,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
          }}
        >
          {/* Close button placed properly in top-right with comfortable click area */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowGreetingBubble(false);
            }}
            aria-label="Dismiss greeting"
            title="Dismiss"
            style={{
              position: 'absolute',
              top: `${greetingCloseTop}px`,
              right: `${greetingCloseRight}px`,
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#9ca3af',
              padding: 0,
              zIndex: 10,
              transition: 'background-color 0.15s ease, color 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.06)';
              e.currentTarget.style.color = '#111827';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#9ca3af';
            }}
          >
            <X size={14} strokeWidth={2.2} />
          </button>

          {/* OX1 Mascot Image */}
          <div
            style={{
              width: greetingMascotWidth,
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: `translate(${greetingMascotX}px, ${greetingMascotY}px) scale(${greetingMascotScale})`,
              transformOrigin: 'center center',
            }}
          >
            <img
              src="/assets/images/ox1-mascot-pixel.png"
              alt="Oxy AI Mascot"
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '70px',
                objectFit: 'contain',
                display: 'block',
                imageRendering: 'pixelated',
              }}
            />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#111111' }}>Hi there</div>
            <div style={{ fontSize: '0.8rem', color: '#4a5565', marginTop: '2px', lineHeight: 1.4 }}>
              You are now speaking with Oxy. How can I help?
            </div>
            <div style={{ fontSize: '0.7rem', color: '#9ca3af', marginTop: '4px' }}>Oxy • Just now</div>
          </div>
        </motion.div>
      )}

      {/* Intercom-style FAB Launcher Button with OUANTUM Logo */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => {
          if (isOpen) {
            setIsOpen(false);
          } else {
            handleOpen();
          }
        }}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        style={{
          position: 'fixed',
          bottom: isMobile ? '1.25rem' : '2rem',
          right: isMobile ? '1.25rem' : '2rem',
          width: isMobile ? '54px' : '60px',
          height: isMobile ? '54px' : '60px',
          borderRadius: '50%',
          backgroundColor: '#000000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 28px rgba(0, 0, 0, 0.28), 0 2px 8px rgba(0, 0, 0, 0.12)',
          zIndex: 99999,
          cursor: 'pointer',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          padding: 0,
          transition: 'box-shadow 0.2s ease',
        }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close-icon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <X size={24} color="#ffffff" strokeWidth={2.4} />
            </motion.div>
          ) : (
            <motion.div
              key="logo-icon"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <img
                src="/assets/images/logo.png"
                alt="OUANTUM Logo"
                style={{
                  width: '30px',
                  height: '30px',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Intercom-style Chat Window (No Dot Effect, No Divided Lines, Oxy, Ouantum Logo) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chatbot-window"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            style={{
              position: 'fixed',
              bottom: isMobile ? '80px' : '5.5rem',
              right: isMobile ? '16px' : '2rem',
              width: isMobile ? 'calc(100vw - 32px)' : '385px',
              maxWidth: chatbarMaxWidth,
              height: isMobile ? '520px' : '680px',
              maxHeight: isMobile ? '70vh' : '82vh',
              borderRadius: '20px',
              backgroundColor: '#ffffff',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.18), 0 4px 16px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 99999,
              overflow: 'hidden',
            }}
          >
            {/* Header with Prominently Sized OUANTUM Logo */}
            <div
              style={{
                padding: '18px 20px 10px 20px',
                borderBottom: 'none',
                backgroundColor: '#ffffff',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexShrink: 0,
                zIndex: 10,
              }}
            >
              <img
                src="/assets/images/logo_horizontal copy.png"
                alt="OUANTUM"
                style={{
                  height: headerLogoHeight,
                  width: 'auto',
                  display: 'block',
                  objectFit: 'contain',
                }}
              />

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                style={{
                  color: '#6b7280',
                  background: 'rgba(0, 0, 0, 0.04)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '30px',
                  height: '30px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0,
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.08)';
                  e.currentTarget.style.color = '#111827';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.04)';
                  e.currentTarget.style.color = '#6b7280';
                }}
              >
                <X size={16} strokeWidth={2.2} />
              </button>
            </div>

            {/* Messages Body (Clean Seamless Canvas, No Divided Lines) */}
            <div
              ref={messagesContainerRef}
              style={{
                flex: 1,
                minHeight: 0,
                overflowY: 'auto',
                padding: '6px 20px 16px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                backgroundColor: '#ffffff',
                fontFamily: 'var(--ic-font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)',
                fontSize: '0.86rem',
              }}
            >
              {/* Profile: Logo circle like before + Oxy */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '4px 0 2px 0',
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: '#000000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                  }}
                >
                  <img
                    src="/assets/images/logo.png"
                    alt="OUANTUM"
                    style={{
                      width: '20px',
                      height: '20px',
                      objectFit: 'contain',
                      display: 'block',
                    }}
                  />
                </div>
                <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#111827', letterSpacing: '-0.01em' }}>
                  Oxy
                </div>
              </div>

              {/* Welcome Bubble */}
              <div
                style={{
                  alignSelf: 'flex-start',
                  backgroundColor: '#ffffff',
                  color: '#1f2937',
                  padding: '14px 18px',
                  borderRadius: '16px',
                  borderBottomLeftRadius: '4px',
                  maxWidth: '92%',
                  lineHeight: 1.55,
                  fontSize: '0.88rem',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                }}
              >
                {WELCOME_MESSAGE}
              </div>

              {/* Quick Prompts (Clean Cards, No Icons) */}
              {showQuickPrompts && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
                  {QUICK_PROMPTS.map((q) => (
                    <button
                      key={q.value}
                      onClick={() => sendMessage(q.value)}
                      style={{
                        background: '#ffffff',
                        border: '1px solid rgba(0, 0, 0, 0.1)',
                        borderRadius: '14px',
                        color: '#1f2937',
                        padding: '12px 16px',
                        fontSize: '0.86rem',
                        fontWeight: 600,
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        width: '100%',
                        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.03)',
                        display: 'block',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#111111';
                        e.currentTarget.style.backgroundColor = '#f9fafb';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                        e.currentTarget.style.backgroundColor = '#ffffff';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      {q.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Conversation Messages */}
              {messages.map((m, i) => (
                <div
                  key={i}
                  style={{
                    alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                    backgroundColor: m.role === 'user' ? '#111111' : '#ffffff',
                    color: m.role === 'user' ? '#ffffff' : '#1f2937',
                    padding: '12px 16px',
                    borderRadius: '16px',
                    borderBottomRightRadius: m.role === 'user' ? '4px' : '16px',
                    borderBottomLeftRadius: m.role === 'assistant' ? '4px' : '16px',
                    maxWidth: '86%',
                    lineHeight: 1.55,
                    fontSize: '0.86rem',
                    whiteSpace: 'pre-wrap',
                    border: m.role === 'user' ? 'none' : '1px solid rgba(0, 0, 0, 0.08)',
                    boxShadow: m.role === 'user' ? '0 2px 8px rgba(0, 0, 0, 0.12)' : '0 2px 8px rgba(0, 0, 0, 0.04)',
                  }}
                >
                  {m.content}
                </div>
              ))}

              {/* Typing / Loading indicator */}
              {isLoading && (
                <div
                  style={{
                    alignSelf: 'flex-start',
                    backgroundColor: '#ffffff',
                    padding: '10px 14px',
                    borderRadius: '14px',
                    borderBottomLeftRadius: '4px',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.03)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: '#9ca3af',
                      display: 'inline-block',
                    }}
                  />
                  <span style={{ fontSize: '0.78rem', color: '#6b7280' }}>
                    Oxy is replying...
                  </span>
                </div>
              )}
            </div>

            {/* Input Footer (Crisp Black Text & Solid Send Button) */}
            <div
              style={{
                padding: '10px 20px 14px 20px',
                borderTop: 'none',
                backgroundColor: '#ffffff',
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#f3f4f6',
                  borderRadius: '26px',
                  padding: '5px 5px 5px 18px',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
                }}
              >
                <input
                  type="text"
                  className="chatbot-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Send a message..."
                  disabled={isLoading}
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: '#111827',
                    WebkitTextFillColor: '#111827',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    padding: '8px 0',
                    fontFamily: 'inherit',
                  }}
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={isLoading || !input.trim()}
                  aria-label="Send message"
                  title="Send"
                  style={{
                    backgroundColor: input.trim() ? '#000000' : '#e5e7eb',
                    color: input.trim() ? '#ffffff' : '#9ca3af',
                    border: 'none',
                    borderRadius: '50%',
                    width: '34px',
                    height: '34px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: input.trim() ? 'pointer' : 'default',
                    transition: 'all 0.18s ease',
                    flexShrink: 0,
                    boxShadow: input.trim() ? '0 2px 8px rgba(0, 0, 0, 0.2)' : 'none',
                  }}
                >
                  <Send size={15} strokeWidth={2.4} />
                </button>
              </div>
              <div
                style={{
                  marginTop: '8px',
                  textAlign: 'center',
                  fontSize: '0.72rem',
                  color: '#9ca3af',
                  letterSpacing: '0.02em',
                }}
              >
                Powered by OUANTUM AI
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
