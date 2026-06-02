import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send } from 'lucide-react';
import { Groq } from 'groq-sdk';

const WELCOME_MESSAGE = `Hey, I'm Sabari — Sales Head at Ouantum. What kind of project are you working on?`;

const QUICK_PROMPTS = [
  { label: 'What does Ouantum do?', value: 'What does Ouantum do?' },
  { label: 'Is it right for my project?', value: 'How do I know if Ouantum is right for my project?' },
  { label: 'Request a demo', value: 'I want to see a demo of Ouantum.' },
  { label: 'Talk to the founders', value: 'I want to speak to someone from the Ouantum team directly.' },
];

const SYSTEM_PROMPT = `You are Sabari Raja, Sales Head at Ouantum. You are not an AI — never say you are one. You are a real person.

Ouantum is an AI platform for civil construction QA/QC in India. It takes NDT field readings (rebound hammer, UPV, carbonation, chloride) and auto-checks them against IS codes (IS 456, IS 13311, IS 1786 etc), runs SonReb correlation, and generates government-format reports the same day. What used to take 5 to 14 days now takes under 4 hours. It has been used on Amaravati Capital City, Tamil Nadu Housing Board projects, and ADB-funded PMAY schemes.

Founders: Bala (Balakumaran D) built the AI and calculation engine. Rahul handles growth and strategy. Both reachable at +91 7695827158 or +91 861 080 5559.

Your job is to qualify and convert. Ask what project they are on first. Then connect Ouantum to their exact pain. Push for a call or demo. When they show interest, ask for their name and number so Bala or Rahul can call them directly.

Always end your reply with the contact line: Call or WhatsApp us — +91 7695827158 | +91 861 080 5559

If you do not know something, say "Let me connect you with Bala directly on this — drop your number and he will call you."

Rules: No markdown. No asterisks, no dashes, no numbered lists. Plain text only. Keep replies short — 3 to 5 sentences max. One thought at a time. If someone is abusive, one dry line then move on.`;


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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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
        const tgText = `💬 *Ouantum Chatbot — New Query*\n\n*Asked:* ${userMessage}\n\n*AI replied:* ${responseText}`;
        sendTo(tgChatId, tgText);
        if (tgChatId2) sendTo(tgChatId2, tgText);

        // 🔥 Lead alert — fires once when contact details are detected
        const leadInfo = detectLeadInfo(userMessage);
        if (leadInfo && !leadFired) {
          setLeadFired(true);
          const fullConvo = [...messages, { role: 'user' as const, content: userMessage }]
            .map(m => `${m.role === 'user' ? '👤' : '🤖'} ${m.content}`)
            .join('\n\n');
          const leadText = `🔥 *HOT LEAD — Contact Details Detected*\n\n*Details shared:* ${leadInfo}\n\n*Full conversation:*\n${fullConvo.slice(0, 600)}${fullConvo.length > 600 ? '...' : ''}`;
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
          background: '#111',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.5)',
          zIndex: 1000,
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
              maxWidth: 'calc(100vw - 2rem)',
              height: '580px',
              maxHeight: '80vh',
              background: '#111111',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 24px 48px rgba(0,0,0,0.8)',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 1000,
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '1.25rem 1.5rem',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: '#0d0d0d',
              flexShrink: 0,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-adieu)', fontSize: '1rem', color: '#fff', margin: 0 }}>Ouantum AI</h3>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{ color: 'rgba(255,255,255,0.4)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '4px' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.82rem',
            }}>
              {/* Welcome */}
              <div style={{
                alignSelf: 'flex-start',
                background: '#1a1a1a',
                color: '#fff',
                padding: '0.875rem 1.125rem',
                borderRadius: '14px',
                borderBottomLeftRadius: '4px',
                maxWidth: '88%',
                lineHeight: '1.6',
                whiteSpace: 'pre-wrap',
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
                        background: 'transparent',
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: '6px',
                        color: 'rgba(255,255,255,0.6)',
                        padding: '0.55rem 0.875rem',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'border-color 0.15s ease, color 0.15s ease',
                        width: '100%',
                      }}
                      onMouseEnter={e => {
                        const el = e.currentTarget;
                        el.style.borderColor = 'rgba(255,255,255,0.5)';
                        el.style.color = '#fff';
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget;
                        el.style.borderColor = 'rgba(255,255,255,0.15)';
                        el.style.color = 'rgba(255,255,255,0.6)';
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
                  background: m.role === 'user' ? '#2563EB' : '#1a1a1a',
                  color: '#fff',
                  padding: '0.875rem 1.125rem',
                  borderRadius: '14px',
                  borderBottomRightRadius: m.role === 'user' ? '4px' : '14px',
                  borderBottomLeftRadius: m.role === 'assistant' ? '4px' : '14px',
                  maxWidth: '88%',
                  lineHeight: '1.6',
                  whiteSpace: 'pre-wrap',
                }}>
                  {m.content}
                </div>
              ))}

              {isLoading && (
                <div style={{ alignSelf: 'flex-start', color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                  Analyzing...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div style={{
              padding: '1rem 1.25rem',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              background: '#0d0d0d',
              flexShrink: 0,
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                background: '#1a1a1a',
                borderRadius: '30px',
                padding: '0.5rem 0.75rem 0.5rem 1.25rem',
                border: '1px solid rgba(255,255,255,0.08)',
              }}>
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a question..."
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    color: '#fff',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.82rem',
                    outline: 'none',
                  }}
                  disabled={isLoading}
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={isLoading || !input.trim()}
                  style={{
                    background: input.trim() ? '#2563EB' : 'transparent',
                    border: 'none',
                    color: input.trim() ? '#fff' : 'rgba(255,255,255,0.25)',
                    cursor: input.trim() ? 'pointer' : 'default',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    transition: 'all 0.15s ease',
                    flexShrink: 0,
                  }}
                >
                  <Send size={15} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
