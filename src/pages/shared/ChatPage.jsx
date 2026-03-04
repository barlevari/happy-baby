import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

const SYSTEM_PROMPT = `אתה עוזר AI של Happy Baby – פלטפורמה ישראלית לליווי הריון, לידה וגידול תינוקות.
אתה מדבר עברית בצורה חמה, תומכת ומקצועית.
אתה יכול לענות על שאלות בנושאי:
- הריון ולידה (שבועות, סימפטומים, תזונה, בדיקות)
- גידול תינוקות (הנקה, שינה, התפתחות)
- בריאות האם (גופנית ונפשית)
- שאלות כלליות על שיטת Happy Baby

חשוב: אתה לא מחליף ייעוץ רפואי מקצועי. לכל בעיה רפואית, הפנה לרופא או לאחות.
היה קצר, ברור וחם. אם שואלים אותך שאלה שאינה קשורה להריון/תינוקות/בריאות, הפנה בנחמדות לנושאים הרלוונטיים.`;

const SUGGESTIONS = [
  'מה מותר לאכול בהריון?',
  'איך מתמודדים עם בחילות בוקר?',
  'מה גודל התינוק בשבוע 20?',
  'מה חשוב לדעת לפני הלידה?',
  'כמה שינה צריך תינוק?',
];

export default function ChatPage() {
  const { user } = useAuth();
  const { lang, t } = useLanguage();
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `שלום ${user?.name?.split(' ')[0] || ''}! 👋 אני העוזר של Happy Baby. אשמח לעזור לך בכל שאלה על הריון, לידה וגידול תינוקות. במה אוכל לסייע?`,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('hb_ai_key') || '');
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);

  const isRTL = lang === 'he';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const saveApiKey = (key) => {
    localStorage.setItem('hb_ai_key', key);
    setApiKey(key);
    setShowKeyInput(false);
  };

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText) return;

    setInput('');
    setError('');

    const newMessages = [...messages, { role: 'user', content: userText }];
    setMessages(newMessages);
    setLoading(true);

    if (!apiKey) {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: getAutoResponse(userText),
        }]);
        setLoading(false);
      }, 800);
      return;
    }

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-client-side-allow-origin': 'true',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 512,
          system: SYSTEM_PROMPT,
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error?.message || `שגיאה ${res.status}`);
      }

      const data = await res.json();
      const reply = data.content?.[0]?.text || '...';
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      setError(err.message || 'שגיאה בחיבור לAI');
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '⚠️ אירעה שגיאה. נסי שוב או בדקי את מפתח ה-API.',
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
    <div style={{ direction: isRTL ? 'rtl' : 'ltr', height: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div className="page-header" style={{ marginBottom: 0, flexShrink: 0 }}>
        <h1>🤖 {isRTL ? 'צ\'אט AI' : 'AI Chat'}</h1>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => setShowKeyInput(s => !s)}
          title={isRTL ? 'הגדרת מפתח API' : 'Set API Key'}
        >
          🔑 {apiKey ? (isRTL ? 'מחובר ✓' : 'Connected ✓') : (isRTL ? 'הוסיפי מפתח API' : 'Add API Key')}
        </button>
      </div>

      {/* API Key Input */}
      {showKeyInput && (
        <div className="card" style={{ margin: '12px 0', flexShrink: 0 }}>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: 12 }}>
            {isRTL
              ? 'הכנסי מפתח Anthropic API לשיחות AI אמיתיות. ללא מפתח – תשובות מוגבלות אוטומטיות.'
              : 'Enter your Anthropic API key for real AI responses. Without a key, automatic limited responses are used.'}
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              type="password"
              className="form-input"
              placeholder="sk-ant-..."
              defaultValue={apiKey}
              dir="ltr"
              id="api-key-input"
              style={{ flex: 1 }}
            />
            <button
              className="btn btn-primary btn-sm"
              onClick={() => saveApiKey(document.getElementById('api-key-input').value.trim())}
            >
              {isRTL ? 'שמור' : 'Save'}
            </button>
            {apiKey && (
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => { localStorage.removeItem('hb_ai_key'); setApiKey(''); setShowKeyInput(false); }}
                style={{ color: 'var(--color-danger)' }}
              >
                {isRTL ? 'נקה' : 'Clear'}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Messages */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        padding: '16px 0',
      }}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              justifyContent: msg.role === 'user' ? (isRTL ? 'flex-start' : 'flex-end') : (isRTL ? 'flex-end' : 'flex-start'),
              alignItems: 'flex-end',
              gap: 8,
            }}
          >
            {msg.role === 'assistant' && (
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--color-sage), var(--color-sage-dark))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1rem', flexShrink: 0,
              }}>🤖</div>
            )}
            <div style={{
              maxWidth: '72%',
              padding: '10px 14px',
              borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
              background: msg.role === 'user' ? 'var(--color-sage)' : 'var(--color-white)',
              color: msg.role === 'user' ? 'white' : 'var(--color-text)',
              border: msg.role === 'user' ? 'none' : '1px solid var(--color-border)',
              fontSize: '0.9rem',
              lineHeight: 1.6,
              boxShadow: 'var(--shadow-sm)',
              whiteSpace: 'pre-wrap',
            }}>
              {msg.content}
            </div>
            {msg.role === 'user' && (
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--color-rose), var(--color-rose-dark))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontWeight: 700, fontSize: '0.9rem', flexShrink: 0,
              }}>
                {user?.name?.charAt(0) || '?'}
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div style={{ display: 'flex', justifyContent: isRTL ? 'flex-end' : 'flex-start', alignItems: 'flex-end', gap: 8 }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--color-sage), var(--color-sage-dark))',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem',
            }}>🤖</div>
            <div style={{
              padding: '10px 16px',
              borderRadius: '18px 18px 18px 4px',
              background: 'var(--color-white)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-sm)',
            }}>
              <span style={{ display: 'inline-flex', gap: 4 }}>
                {[0,1,2].map(i => (
                  <span key={i} style={{
                    width: 7, height: 7, borderRadius: '50%',
                    background: 'var(--color-sage-light)',
                    display: 'inline-block',
                    animation: `bounce 1.2s ${i * 0.2}s infinite`,
                  }}/>
                ))}
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions (only on first message) */}
      {messages.length === 1 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12, flexShrink: 0 }}>
          {SUGGESTIONS.map((s, i) => (
            <button
              key={i}
              className="btn btn-ghost btn-sm"
              onClick={() => sendMessage(s)}
              style={{
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem',
              }}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        gap: 8,
        paddingTop: 12,
        borderTop: '1px solid var(--color-border)',
        flexShrink: 0,
      }}>
        <input
          className="form-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={isRTL ? 'כתבי הודעה...' : 'Type a message...'}
          disabled={loading}
          style={{ flex: 1 }}
        />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading || !input.trim()}
          style={{ flexShrink: 0 }}
        >
          {isRTL ? 'שלחי' : 'Send'} →
        </button>
      </form>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}

// Fallback auto-responses when no API key
function getAutoResponse(text) {
  const lower = text.toLowerCase();
  if (lower.includes('בחילה') || lower.includes('בחילות')) {
    return 'בחילות בוקר נפוצות בטרימסטר הראשון. טיפים שעוזרים: אכלי ביסקוויטים לפני שקמי מהמיטה, שתי מים קרים, הימני ממאכלים חריפים. אם הבחילה חמורה – דברי עם הרופאה שלך. 💚';
  }
  if (lower.includes('אכל') || lower.includes('תזונה')) {
    return 'בהריון חשוב לאכול:\n✅ פירות וירקות טריים\n✅ חלבונים (ביצים, עוף, דגים)\n✅ פחמימות מורכבות\n✅ מוצרי חלב (סידן)\n\n❌ להימנע: אלכוהול, דגים גדולים (כספית), גבינות רכות לא מפוסטרות.';
  }
  if (lower.includes('שבוע') || lower.includes('גודל')) {
    return 'גודל התינוק משתנה מדי שבוע! 🍓 שבוע 8 – פטל, שבוע 12 – ליים, שבוע 20 – בננה, שבוע 28 – חציל, שבוע 36 – פפאיה, שבוע 40 – אבטיח! 🍉\n\nכנסי לדשבורד שלך לראות את השבוע המדויק שלך.';
  }
  if (lower.includes('לידה') || lower.includes('לפני')) {
    return 'לקראת הלידה כדאי:\n• להכין תיק לבית חולים\n• ללמוד טכניקות נשימה\n• לתאם הסעה לבית החולים\n• לכתוב תכנית לידה\n• לישון טוב ולנוח\n\nAcademy של Happy Baby מכיל קורס מלא על הכנה ללידה! 🌸';
  }
  if (lower.includes('שינה') || lower.includes('תינוק')) {
    return 'תינוק ישן:\n• 0-3 חודשים: 14-17 שעות ביממה\n• 3-6 חודשים: 12-15 שעות\n• 6-12 חודשים: 11-14 שעות\n\nטיפ: שגרת ערב קבועה (אמבטיה → האכלה → שיר → שינה) עוזרת מאוד לתינוקות לישון טוב יותר! 😴';
  }
  return 'תודה על שאלתך! לתשובות מפורטות ומדויקות יותר, חברי מפתח Anthropic API בהגדרות הצ\'אט (לחצי על כפתור 🔑). בינתיים, אשמח לעזור עם שאלות נוספות על הריון ותינוקות! 💝';
}
