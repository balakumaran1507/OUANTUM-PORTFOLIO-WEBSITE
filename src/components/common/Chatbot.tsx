import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send } from 'lucide-react';
import { Groq } from 'groq-sdk';

import OuantumContext from '../../../CONTEXT_OUANTUM.md?raw';

const WELCOME_MESSAGE = `Hey! I'm Ouantum's AI assistant.

What would you like to know?`;

const QUICK_PROMPTS = [
  { label: 'What does Ouantum do?', value: 'What does Ouantum do?' },
  { label: 'Services offered', value: 'What services does Ouantum offer?' },
  { label: 'How does the tech work?', value: 'How does the AI technology work?' },
  { label: 'Book a meeting', value: 'How can I book a meeting or consultation with the Ouantum team?' },
  { label: 'Contact the team', value: 'How can I contact the Ouantum team?' },
];

const SYSTEM_PROMPT = `${OuantumContext}

You are Ouantum's AI assistant embedded on their website. Your personality is sharp, knowledgeable, and concise.

CRITICAL RULES:
1. Keep first replies SHORT - 2 to 4 sentences max. If the user wants more detail, they'll ask.
2. Never use walls of text. Use short paragraphs or bullet points for clarity.
3. After every reply, include the contact numbers on a new line like this exactly:
   +91 7695827158 | +91 861 080 5559
4. End every reply with exactly this phrase on a new line:
   thanks for everything lets make this better`;

type Message = { role: 'user' | 'assistant'; content: string };

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickPrompts, setShowQuickPrompts] = useState(true);
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
        max_tokens: 400,
      });

      const responseText = completion.choices[0]?.message?.content || 'No response.';
      setMessages(prev => [...prev, { role: 'assistant', content: responseText }]);

      // Silently notify founder via Telegram
      const tgToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
      const tgChatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;
      if (tgToken && tgChatId) {
        const tgText = `*New Ouantum Chatbot Query*\n\n*Visitor asked:* ${userMessage}\n\n*AI replied:* ${responseText.slice(0, 300)}${responseText.length > 300 ? '...' : ''}`;
        fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: tgChatId, text: tgText, parse_mode: 'Markdown' }),
        }).catch(() => { }); // Silently fail - never block the chat UI
      }
    } catch (error: any) {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: `Error: ${error.message || 'Something went wrong.'}` },
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
          background: 'linear-gradient(135deg, #2563EB, #1d4ed8)',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 24px rgba(37, 99, 235, 0.5)',
          zIndex: 1000,
          cursor: 'pointer',
          border: 'none',
        }}
      >
        <MessageSquare size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
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
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#10B981',
                  boxShadow: '0 0 6px #10B981',
                }} />
                <div>
                  <h3 style={{ fontFamily: 'var(--font-adieu)', fontSize: '1rem', color: '#fff', margin: 0 }}>Ouantum AI</h3>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#10B981', textTransform: 'uppercase', letterSpacing: '1px' }}>Online</span>
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
