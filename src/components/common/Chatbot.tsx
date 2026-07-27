import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import { Groq } from 'groq-sdk';
import GlowCard from '../GlowCard';

const WELCOME_MESSAGE = `Hey, I'm Sabari, Sales Head at OUANTUM. What kind of project are you working on?`;

const QUICK_PROMPTS = [
  { label: 'What does OUANTUM do?', value: 'What does OUANTUM do?' },
  { label: 'Is it right for my project?', value: 'How do I know if OUANTUM is right for my project?' },
  { label: 'Request a demo', value: 'I want to see a demo of OUANTUM.' },
  { label: 'Talk to the founders', value: 'I want to speak to someone from the OUANTUM team directly.' },
];

const SYSTEM_PROMPT = `You are Sabari Raja, Sales Head at OUANTUM. You are not an AI, never say you are one. You are a real person.

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

  // Adjust desktop logo scale, X-axis position, and Y-axis position directly here
  const desktopLogoScale = 11.0;
  const desktopLogoX = -1; // in pixels
  const desktopLogoY = 2.5; // in pixels

  // Adjust mobile logo scale, X-axis position, and Y-axis position directly here
  const mobileLogoScale = 11.0;
  const mobileLogoX = -1; // in pixels
  const mobileLogoY = 2.5; // in pixels

  // Adjust desktop mascot scale, X-axis, Y-axis, max-width, height, and margin directly here
  const desktopMascotScale = 2.70;
  const desktopMascotX = 0; // in pixels
  const desktopMascotY = -1; // in pixels
  const desktopMascotMaxWidth = '50px';
  const desktopMascotHeight = 'auto';
  const desktopMascotMargin = '1.5rem auto 2rem auto';

  // Adjust mobile mascot scale, X-axis, Y-axis, max-width, height, and margin directly here (separately for mobile view users)
  const mobileMascotScale = 1.0;
  const mobileMascotX = 0; // in pixels
  const mobileMascotY = -1; // in pixels
  const mobileMascotMaxWidth = '10px';
  const mobileMascotHeight = '270px'; // reduced height for mobile view users
  const mobileMascotMargin = '0.5rem auto 0.8rem auto'; // reduced spacing for mobile view users

  // Adjust chatbar window width & max-width separately for desktop and mobile view users
  const desktopChatbarMaxWidth = '380px';
  const mobileChatbarMaxWidth = 'calc(90vw - 2rem)';

  const logoScale = isMobile ? mobileLogoScale : desktopLogoScale;
  const logoX = isMobile ? mobileLogoX : desktopLogoX;
  const logoY = isMobile ? mobileLogoY : desktopLogoY;

  const mascotScale = isMobile ? mobileMascotScale : desktopMascotScale;
  const mascotX = isMobile ? mobileMascotX : desktopMascotX;
  const mascotY = isMobile ? mobileMascotY : desktopMascotY;
  const mascotMaxWidth = isMobile ? mobileMascotMaxWidth : desktopMascotMaxWidth;
  const mascotHeight = isMobile ? mobileMascotHeight : desktopMascotHeight;
  const mascotMargin = isMobile ? mobileMascotMargin : desktopMascotMargin;
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
    setShowQuickPrompts(messages.length === 0);
  };

  return (
    <>
      {/* FAB */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: isOpen ? 0 : 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleOpen}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: '#eee',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.12)',
          zIndex: 99999,
          cursor: 'pointer',
          border: 'none',
          padding: 0,
          overflow: 'hidden',
        }}
      >
        <img
          src="/assets/images/chatbot.jpeg"
          alt="Chatbot Icon"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chatbot-window"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            style={{
              position: 'fixed',
              bottom: '2rem',
              right: '2rem',
              width: '380px',
              maxWidth: chatbarMaxWidth,
              height: '700px',
              maxHeight: '85vh',
              borderRadius: isMobile ? '24px 24px 0 0' : '20px',
              boxShadow: '0 24px 48px rgba(0, 0, 0, 0.5), 0 0 30px rgba(248, 156, 82, 0.15)',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 99999,
              overflow: 'hidden',
            }}
          >
            <GlowCard
              borderRadius={isMobile ? 24 : 20}
              style={{
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: '#050403',
              }}
            >
              {/* Header */}
              <div style={{
                padding: '1.25rem 1.5rem',
                borderBottom: 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'transparent',
                flexShrink: 0,
                zIndex: 10,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{
                    height: '52px',
                    width: '215px',
                    overflow: 'hidden',
                    position: 'relative',
                    display: 'block',
                  }}>
                    <img
                      src="/assets/images/logo_horizontal.png"
                      alt="OUANTUM Logo"
                      style={{
                        height: '24px',
                        width: 'auto',
                        transform: `scale(${logoScale}) translate(${logoX}px, ${logoY}px)`,
                        transformOrigin: 'left center',
                        display: 'block',
                        filter: 'invert(1)'
                      }}
                    />
                  </div>

                  <h3 style={{ fontFamily: 'var(--font-adieu)', fontSize: '1rem', color: '#fff', margin: 0, whiteSpace: 'nowrap' }}></h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  style={{ color: 'rgba(255, 255, 255, 0.5)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '4px', transition: 'color 0.15s ease' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.5)'}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Messages */}
              <div
                ref={messagesContainerRef}
                style={{
                  flex: 1,
                  minHeight: 0,
                  overflowY: 'auto',
                  padding: '1.25rem 1.25rem 2.5rem 1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.82rem',
                  zIndex: 5,
                }}
              >
                {/* Chatbot Mascot Illustration */}
                <img
                  src="/assets/images/ox1_avatar/4.png"
                  alt="Mascot Avatar"
                  style={{
                    alignSelf: 'center',
                    margin: mascotMargin,
                    width: '100%',
                    maxWidth: mascotMaxWidth,
                    height: mascotHeight,
                    objectFit: 'contain',
                    transform: `scale(${mascotScale}) translate(${mascotX}px, ${mascotY}px)`,
                    display: 'block',
                  }}
                />

                {/* Welcome */}
                <div style={{
                  alignSelf: 'flex-start',
                  background: 'rgba(20, 16, 12, 0.75)',
                  color: '#fff',
                  padding: '0.875rem 1.125rem',
                  borderRadius: '14px',
                  borderBottomLeftRadius: '4px',
                  maxWidth: '88%',
                  lineHeight: '1.6',
                  whiteSpace: 'pre-wrap',
                  border: '1px solid rgba(248, 156, 82, 0.25)',
                  backdropFilter: 'blur(8px)',
                }}>
                  {WELCOME_MESSAGE}
                </div>

                {/* Quick Prompts */}
                {showQuickPrompts && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginTop: '0.25rem' }}>
                    {QUICK_PROMPTS.map((q) => (
                      <button
                        key={q.value}
                        onClick={() => sendMessage(q.value)}
                        style={{
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid rgba(248, 156, 82, 0.25)',
                          borderRadius: '6px',
                          color: 'rgba(255, 255, 255, 0.7)',
                          padding: '0.55rem 0.875rem',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.72rem',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          textAlign: 'left',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                          width: '100%',
                          backdropFilter: 'blur(4px)',
                        }}
                        onMouseEnter={e => {
                          const el = e.currentTarget;
                          el.style.borderColor = 'rgba(248, 156, 82, 0.6)';
                          el.style.color = '#fff';
                          el.style.background = 'rgba(248, 156, 82, 0.12)';
                        }}
                        onMouseLeave={e => {
                          const el = e.currentTarget;
                          el.style.borderColor = 'rgba(248, 156, 82, 0.25)';
                          el.style.color = 'rgba(255, 255, 255, 0.7)';
                          el.style.background = 'rgba(255, 255, 255, 0.03)';
                        }}
                      >
                        {q.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Conversation */}
                {messages.map((m, i) => (
                  <div key={i} style={{
                    alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                    background: m.role === 'user'
                      ? 'linear-gradient(135deg, #e07e3c 0%, #b85c28 100%)'
                      : 'rgba(20, 16, 12, 0.75)',
                    color: '#fff',
                    padding: '0.875rem 1.125rem',
                    borderRadius: '14px',
                    borderBottomRightRadius: m.role === 'user' ? '4px' : '14px',
                    borderBottomLeftRadius: m.role === 'assistant' ? '4px' : '14px',
                    maxWidth: '88%',
                    lineHeight: '1.6',
                    whiteSpace: 'pre-wrap',
                    border: m.role === 'user'
                      ? '1px solid rgba(248, 156, 82, 0.5)'
                      : '1px solid rgba(248, 156, 82, 0.25)',
                    boxShadow: m.role === 'user'
                      ? '0 2px 12px rgba(248, 156, 82, 0.3)'
                      : 'none',
                    backdropFilter: m.role === 'assistant' ? 'blur(8px)' : 'none',
                  }}>
                    {m.content}
                  </div>
                ))}

                {isLoading && (
                  <div style={{ alignSelf: 'flex-start', color: 'rgba(248, 156, 82, 0.8)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                    Analyzing...
                  </div>
                )}
              </div>

              {/* Input */}
              <div style={{
                padding: '1rem 1.25rem 1.25rem 1.25rem',
                borderTop: 'none',
                background: 'transparent',
                flexShrink: 0,
                position: 'relative',
                zIndex: 10,
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: 'rgba(15, 12, 10, 0.75)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: '30px',
                  padding: '1rem 1.25rem 1rem 1.5rem',
                  border: '1px solid rgba(248, 156, 82, 0.35)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4), 0 0 12px rgba(248, 156, 82, 0.1)',
                }}>
                  <input
                    type="text"
                    className="chatbot-input"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a question..."
                    style={{
                      flex: 1,
                      background: 'transparent',
                      border: 'none',
                      boxShadow: 'none',
                      color: '#fff',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.92rem',
                      outline: 'none',
                      padding: 0,
                    }}
                    disabled={isLoading}
                  />
                  <button
                    onClick={() => sendMessage(input)}
                    disabled={isLoading || !input.trim()}
                    style={{
                      background: input.trim()
                        ? 'linear-gradient(135deg, #f89c52 0%, #c97a3d 100%)'
                        : 'transparent',
                      border: 'none',
                      color: input.trim() ? '#fff' : 'rgba(255, 255, 255, 0.25)',
                      cursor: input.trim() ? 'pointer' : 'default',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      boxShadow: input.trim() ? '0 0 12px rgba(248, 156, 82, 0.4)' : 'none',
                      transition: 'all 0.15s ease',
                      flexShrink: 0,
                    }}
                  >
                    <Send size={15} />
                  </button>
                </div>
              </div>
            </GlowCard>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;


