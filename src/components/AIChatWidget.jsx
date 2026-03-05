import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const WIDGET_SYSTEM_PROMPT = `You are the Hapby Baby assistant – a warm, professional AI helper for an Israeli pregnancy and baby care platform.
You help users with common questions about:
- The Hapby Baby platform (features, navigation, subscription)
- Pregnancy tracking, nutrition, and mental preparation
- Academy courses and content
- General pregnancy and baby FAQ

Keep answers concise (2-3 sentences). If the question is medical, remind them to consult their doctor.
Respond in the same language the user writes in (Hebrew or English).`;

const FAQ_HE = [
  'איך אני עוקבת אחרי ההריון?',
  'מה יש באקדמיה?',
  'איך משנים שפה?',
  'איך יוצרים קשר?',
];

const FAQ_EN = [
  'How do I track my pregnancy?',
  'What\'s in the Academy?',
  'How to change language?',
  'How to contact support?',
];

// Rate limiter: max 10 messages per minute
const rateLimiter = { count: 0, resetTime: 0 };
function checkRateLimit() {
  const now = Date.now();
  if (now > rateLimiter.resetTime) {
    rateLimiter.count = 0;
    rateLimiter.resetTime = now + 60000;
  }
  rateLimiter.count++;
  return rateLimiter.count <= 10;
}

export default function AIChatWidget() {
  const { user } = useAuth();
  const { lang } = useLanguage();
  const isRTL = lang === 'he';
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const faqs = isRTL ? FAQ_HE : FAQ_EN;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText || loading) return;

    if (!checkRateLimit()) {
      setMessages(prev => [...prev,
        { role: 'user', content: userText },
        { role: 'assistant', content: isRTL ? '⚠️ יותר מדי הודעות. נסי שוב בעוד דקה.' : '⚠️ Too many messages. Please wait a minute.' },
      ]);
      return;
    }

    setInput('');

    const newMessages = [...messages, { role: 'user', content: userText }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const apiMessages = newMessages.map(m => ({ role: m.role, content: m.content }));
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 256,
          system: WIDGET_SYSTEM_PROMPT,
          messages: apiMessages,
        }),
      });

      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data = await res.json();
      const reply = data.content?.[0]?.text || '...';
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: isRTL ? '⚠️ שגיאה בחיבור. נסי שוב.' : '⚠️ Connection error. Please try again.',
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <>
      <style>{`
        @keyframes widgetSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes widgetPulse {
          0%, 100% { box-shadow: 0 4px 16px rgba(125, 170, 146, 0.4); }
          50% { box-shadow: 0 4px 24px rgba(125, 170, 146, 0.6); }
        }
        @keyframes widgetBounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-5px); }
        }
      `}</style>

      {/* Chat Panel */}
      {open && (
        <div style={{
          position: 'fixed',
          bottom: 96,
          left: 24,
          width: 360,
          maxWidth: 'calc(100vw - 48px)',
          height: 480,
          maxHeight: 'calc(100vh - 140px)',
          background: 'var(--color-white)',
          borderRadius: 20,
          boxShadow: '0 12px 48px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1000,
          overflow: 'hidden',
          animation: 'widgetSlideUp 0.3s ease',
          direction: isRTL ? 'rtl' : 'ltr',
        }}>
          {/* Header */}
          <div style={{
            padding: '14px 16px',
            background: 'linear-gradient(135deg, var(--color-sage), var(--color-sage-dark))',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            flexShrink: 0,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.2rem',
            }}>🤰</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                {isRTL ? 'עוזרת Hapby Baby' : 'Hapby Baby Assistant'}
              </div>
              <div style={{ fontSize: '0.72rem', opacity: 0.85 }}>
                {isRTL ? 'כאן לעזור בכל שאלה' : 'Here to help with any question'}
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                borderRadius: '50%',
                width: 28, height: 28,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                color: 'white',
                fontSize: '0.9rem',
              }}
            >✕</button>
          </div>

          {/* Messages area */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '12px 14px',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}>
            {/* Welcome */}
            {messages.length === 0 && (
              <div style={{
                textAlign: 'center',
                padding: '16px 8px',
                color: 'var(--color-text-muted)',
              }}>
                <div style={{ fontSize: '2rem', marginBottom: 8 }}>👋</div>
                <div style={{ fontSize: '0.88rem', fontWeight: 600, marginBottom: 4, color: 'var(--color-text)' }}>
                  {isRTL ? `שלום${user?.name ? ` ${user.name.split(' ')[0]}` : ''}!` : `Hi${user?.name ? ` ${user.name.split(' ')[0]}` : ''}!`}
                </div>
                <div style={{ fontSize: '0.8rem', lineHeight: 1.5 }}>
                  {isRTL ? 'איך אפשר לעזור?' : 'How can I help?'}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: msg.role === 'user'
                    ? (isRTL ? 'flex-start' : 'flex-end')
                    : (isRTL ? 'flex-end' : 'flex-start'),
                  gap: 6,
                  alignItems: 'flex-end',
                }}
              >
                {msg.role === 'assistant' && (
                  <div style={{
                    width: 26, height: 26, borderRadius: '50%',
                    background: 'var(--color-sage-light)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.75rem', flexShrink: 0,
                  }}>🤰</div>
                )}
                <div style={{
                  maxWidth: '78%',
                  padding: '8px 12px',
                  borderRadius: msg.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                  background: msg.role === 'user' ? 'var(--color-sage)' : 'var(--color-cream)',
                  color: msg.role === 'user' ? 'white' : 'var(--color-text)',
                  fontSize: '0.82rem',
                  lineHeight: 1.5,
                  whiteSpace: 'pre-wrap',
                }}>
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display: 'flex', justifyContent: isRTL ? 'flex-end' : 'flex-start', gap: 6, alignItems: 'flex-end' }}>
                <div style={{
                  width: 26, height: 26, borderRadius: '50%',
                  background: 'var(--color-sage-light)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.75rem',
                }}>🤰</div>
                <div style={{
                  padding: '8px 14px',
                  borderRadius: '14px 14px 14px 4px',
                  background: 'var(--color-cream)',
                }}>
                  <span style={{ display: 'inline-flex', gap: 3 }}>
                    {[0,1,2].map(i => (
                      <span key={i} style={{
                        width: 6, height: 6, borderRadius: '50%',
                        background: 'var(--color-sage-light)',
                        display: 'inline-block',
                        animation: `widgetBounce 1.2s ${i * 0.2}s infinite`,
                      }}/>
                    ))}
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* FAQ quick buttons */}
          {messages.length === 0 && (
            <div style={{
              padding: '0 14px 8px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: 6,
              flexShrink: 0,
            }}>
              {faqs.map((q, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(q)}
                  style={{
                    background: 'var(--color-sage-ultra)',
                    border: '1px solid var(--color-sage-light)',
                    borderRadius: 20,
                    padding: '5px 12px',
                    fontSize: '0.73rem',
                    color: 'var(--color-sage-dark)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--color-sage-light)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'var(--color-sage-ultra)'}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSubmit} style={{
            display: 'flex',
            gap: 8,
            padding: '10px 14px',
            borderTop: '1px solid var(--color-border)',
            flexShrink: 0,
            background: 'var(--color-white)',
          }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={isRTL ? 'שאלי שאלה...' : 'Ask a question...'}
              disabled={loading}
              style={{
                flex: 1,
                border: '1px solid var(--color-border)',
                borderRadius: 12,
                padding: '8px 12px',
                fontSize: '0.82rem',
                outline: 'none',
                background: 'var(--color-cream)',
              }}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              style={{
                background: 'var(--color-sage)',
                color: 'white',
                border: 'none',
                borderRadius: 12,
                padding: '8px 14px',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: loading || !input.trim() ? 'default' : 'pointer',
                opacity: loading || !input.trim() ? 0.5 : 1,
                flexShrink: 0,
              }}
            >
              {isRTL ? 'שלחי' : 'Send'}
            </button>
          </form>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          position: 'fixed',
          bottom: 24,
          left: 24,
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: open
            ? 'var(--color-text-muted)'
            : 'linear-gradient(135deg, var(--color-sage), var(--color-sage-dark))',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 1001,
          animation: open ? 'none' : 'widgetPulse 3s ease-in-out infinite',
          transition: 'background 0.3s, transform 0.2s',
          fontSize: '1.5rem',
          color: 'white',
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
        }}
        title={isRTL ? (open ? 'סגור צ\'אט' : 'צ\'אט עם העוזרת') : (open ? 'Close chat' : 'Chat with assistant')}
      >
        {open ? '✕' : '💬'}
      </button>
    </>
  );
}
