import { useState, useRef, useEffect, useCallback } from 'react';
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

const API_ENABLED = true;

const SUGGESTIONS = [
  'מה מותר לאכול בהריון?',
  'איך מתמודדים עם בחילות בוקר?',
  'מה גודל התינוק בשבוע 20?',
  'מה חשוב לדעת לפני הלידה?',
  'כמה שינה צריך תינוק?',
];

const STORAGE_KEY = 'hb_chat_conversations';

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function loadConversations() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveConversations(convs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(convs));
}

function getWelcomeMessage(userName) {
  return {
    role: 'assistant',
    content: `שלום ${userName}! 👋 אני העוזר של Happy Baby. אשמח לעזור לך בכל שאלה על הריון, לידה וגידול תינוקות. במה אוכל לסייע?`,
  };
}

function autoTitle(messages) {
  const firstUser = messages.find(m => m.role === 'user');
  if (!firstUser) return 'שיחה חדשה';
  const text = firstUser.content;
  return text.length > 40 ? text.slice(0, 40) + '...' : text;
}

export default function ChatPage() {
  const { user } = useAuth();
  const { lang } = useLanguage();
  const isRTL = lang === 'he';
  const userName = user?.name?.split(' ')[0] || '';

  const [conversations, setConversations] = useState(() => loadConversations());
  const [activeId, setActiveId] = useState(() => {
    const convs = loadConversations();
    return convs.length > 0 ? convs[0].id : null;
  });
  const [showSidebar, setShowSidebar] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);
  const editInputRef = useRef(null);

  const activeConv = conversations.find(c => c.id === activeId);
  const messages = activeConv?.messages || [getWelcomeMessage(userName)];

  // Save conversations to localStorage whenever they change
  useEffect(() => {
    saveConversations(conversations);
  }, [conversations]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (editingId && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [editingId]);

  const updateConversation = useCallback((id, updater) => {
    setConversations(prev => prev.map(c => c.id === id ? updater(c) : c));
  }, []);

  const createNewChat = useCallback(() => {
    const newConv = {
      id: generateId(),
      title: 'שיחה חדשה',
      messages: [getWelcomeMessage(userName)],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setConversations(prev => [newConv, ...prev]);
    setActiveId(newConv.id);
    setShowSidebar(false);
    setInput('');
    setError('');
  }, [userName]);

  const deleteConversation = useCallback((id) => {
    setConversations(prev => {
      const filtered = prev.filter(c => c.id !== id);
      if (id === activeId) {
        setActiveId(filtered.length > 0 ? filtered[0].id : null);
      }
      return filtered;
    });
  }, [activeId]);

  const startEditing = useCallback((conv) => {
    setEditingId(conv.id);
    setEditTitle(conv.title);
  }, []);

  const finishEditing = useCallback(() => {
    if (editingId && editTitle.trim()) {
      updateConversation(editingId, c => ({ ...c, title: editTitle.trim() }));
    }
    setEditingId(null);
    setEditTitle('');
  }, [editingId, editTitle, updateConversation]);

  const switchConversation = useCallback((id) => {
    setActiveId(id);
    setShowSidebar(false);
    setInput('');
    setError('');
  }, []);

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText || loading) return;

    setInput('');
    setError('');

    // If no active conversation, create one
    let currentId = activeId;
    if (!currentId) {
      const newConv = {
        id: generateId(),
        title: 'שיחה חדשה',
        messages: [getWelcomeMessage(userName)],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      setConversations(prev => [newConv, ...prev]);
      currentId = newConv.id;
      setActiveId(currentId);
    }

    const currentMessages = conversations.find(c => c.id === currentId)?.messages || [getWelcomeMessage(userName)];
    const newMessages = [...currentMessages, { role: 'user', content: userText }];

    // Update messages immediately
    updateConversation(currentId, c => ({
      ...c,
      messages: newMessages,
      title: c.title === 'שיחה חדשה' ? autoTitle(newMessages) : c.title,
      updatedAt: Date.now(),
    }));
    setLoading(true);

    if (!API_ENABLED) {
      setTimeout(() => {
        updateConversation(currentId, c => ({
          ...c,
          messages: [...c.messages, { role: 'assistant', content: getAutoResponse(userText) }],
          updatedAt: Date.now(),
        }));
        setLoading(false);
      }, 800);
      return;
    }

    try {
      const apiMessages = newMessages
        .filter(m => m.role === 'user' || m.role === 'assistant')
        .slice(1) // skip welcome message
        .map(m => ({ role: m.role, content: m.content }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 512,
          system: SYSTEM_PROMPT,
          messages: apiMessages,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error?.message || `שגיאה ${res.status}`);
      }

      const data = await res.json();
      const reply = data.content?.[0]?.text || '...';
      updateConversation(currentId, c => ({
        ...c,
        messages: [...c.messages, { role: 'assistant', content: reply }],
        updatedAt: Date.now(),
      }));
    } catch (err) {
      setError(err.message || 'שגיאה בחיבור לAI');
      updateConversation(currentId, c => ({
        ...c,
        messages: [...c.messages, { role: 'assistant', content: '⚠️ אירעה שגיאה. נסי שוב מאוחר יותר.' }],
        updatedAt: Date.now(),
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  const clearAllHistory = () => {
    setConversations([]);
    setActiveId(null);
    setShowSidebar(false);
  };

  const formatDate = (ts) => {
    const d = new Date(ts);
    const now = new Date();
    const diffDays = Math.floor((now - d) / 86400000);
    if (diffDays === 0) return 'היום';
    if (diffDays === 1) return 'אתמול';
    if (diffDays < 7) return `לפני ${diffDays} ימים`;
    return d.toLocaleDateString('he-IL', { day: 'numeric', month: 'short' });
  };

  return (
    <div style={{ direction: isRTL ? 'rtl' : 'ltr', height: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Header */}
      <div className="page-header" style={{ marginBottom: 0, flexShrink: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => setShowSidebar(s => !s)}
          title={isRTL ? 'היסטוריית שיחות' : 'Chat history'}
          style={{ fontSize: '1.1rem', padding: '4px 8px' }}
        >
          {showSidebar ? '✕' : '☰'}
        </button>
        <h1 style={{ flex: 1, margin: 0 }}>🤰 {isRTL ? 'צ\'אט AI' : 'AI Chat'}</h1>
        <button
          className="btn btn-secondary btn-sm"
          onClick={createNewChat}
          title={isRTL ? 'שיחה חדשה' : 'New chat'}
        >
          ✨ {isRTL ? 'שיחה חדשה' : 'New Chat'}
        </button>
      </div>

      {/* Sidebar overlay */}
      {showSidebar && (
        <div
          onClick={() => setShowSidebar(false)}
          style={{
            position: 'absolute', inset: 0, top: 50,
            background: 'rgba(0,0,0,0.3)',
            zIndex: 10,
            borderRadius: 'var(--radius-lg)',
          }}
        />
      )}

      {/* Sidebar */}
      {showSidebar && (
        <div style={{
          position: 'absolute',
          top: 50,
          [isRTL ? 'right' : 'left']: 0,
          width: 300,
          maxWidth: '85%',
          height: 'calc(100% - 50px)',
          background: 'var(--color-white)',
          borderLeft: isRTL ? 'none' : '1px solid var(--color-border)',
          borderRight: isRTL ? '1px solid var(--color-border)' : 'none',
          boxShadow: 'var(--shadow-xl)',
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '0 0 var(--radius-lg) var(--radius-lg)',
          overflow: 'hidden',
        }}>
          {/* Sidebar header */}
          <div style={{
            padding: '14px 16px',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--color-sage-ultra)',
          }}>
            <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-sage-dark)' }}>
              📋 {isRTL ? 'היסטוריית שיחות' : 'Chat History'}
            </span>
            {conversations.length > 0 && (
              <button
                onClick={clearAllHistory}
                style={{
                  background: 'none', border: 'none', color: 'var(--color-danger)',
                  fontSize: '0.75rem', cursor: 'pointer', padding: '2px 6px',
                }}
                title={isRTL ? 'מחק הכל' : 'Clear all'}
              >
                🗑️ {isRTL ? 'מחק הכל' : 'Clear all'}
              </button>
            )}
          </div>

          {/* Conversation list */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
            {conversations.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 24, color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                {isRTL ? 'אין שיחות עדיין' : 'No conversations yet'}
              </div>
            ) : (
              conversations.map(conv => (
                <div
                  key={conv.id}
                  style={{
                    padding: '10px 16px',
                    cursor: 'pointer',
                    background: conv.id === activeId ? 'var(--color-sage-ultra)' : 'transparent',
                    borderRight: conv.id === activeId && isRTL ? '3px solid var(--color-sage)' : 'none',
                    borderLeft: conv.id === activeId && !isRTL ? '3px solid var(--color-sage)' : 'none',
                    transition: 'background 0.15s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                  onMouseEnter={e => { if (conv.id !== activeId) e.currentTarget.style.background = 'var(--color-cream)'; }}
                  onMouseLeave={e => { if (conv.id !== activeId) e.currentTarget.style.background = 'transparent'; }}
                  onClick={() => editingId !== conv.id && switchConversation(conv.id)}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    {editingId === conv.id ? (
                      <input
                        ref={editInputRef}
                        value={editTitle}
                        onChange={e => setEditTitle(e.target.value)}
                        onBlur={finishEditing}
                        onKeyDown={e => { if (e.key === 'Enter') finishEditing(); if (e.key === 'Escape') setEditingId(null); }}
                        className="form-input"
                        style={{ padding: '2px 6px', fontSize: '0.85rem', width: '100%' }}
                        onClick={e => e.stopPropagation()}
                      />
                    ) : (
                      <>
                        <div style={{
                          fontSize: '0.85rem',
                          fontWeight: conv.id === activeId ? 600 : 400,
                          color: 'var(--color-text)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}>
                          💬 {conv.title}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginTop: 2 }}>
                          {formatDate(conv.updatedAt)} · {conv.messages.filter(m => m.role === 'user').length} {isRTL ? 'הודעות' : 'messages'}
                        </div>
                      </>
                    )}
                  </div>

                  {editingId !== conv.id && (
                    <div style={{ display: 'flex', gap: 2, flexShrink: 0 }}>
                      <button
                        onClick={e => { e.stopPropagation(); startEditing(conv); }}
                        style={{
                          background: 'none', border: 'none', cursor: 'pointer',
                          padding: '2px 4px', fontSize: '0.75rem', opacity: 0.5,
                        }}
                        title={isRTL ? 'שנה שם' : 'Rename'}
                      >
                        ✏️
                      </button>
                      <button
                        onClick={e => { e.stopPropagation(); deleteConversation(conv.id); }}
                        style={{
                          background: 'none', border: 'none', cursor: 'pointer',
                          padding: '2px 4px', fontSize: '0.75rem', opacity: 0.5,
                        }}
                        title={isRTL ? 'מחק' : 'Delete'}
                      >
                        🗑️
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* New chat button in sidebar */}
          <div style={{ padding: 12, borderTop: '1px solid var(--color-border)' }}>
            <button
              className="btn btn-primary btn-sm w-full"
              onClick={createNewChat}
              style={{ width: '100%' }}
            >
              ✨ {isRTL ? 'שיחה חדשה' : 'New Chat'}
            </button>
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
              }}>🤰</div>
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
            }}>🤰</div>
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

      {/* Suggestions (only when no active conversation or first message only) */}
      {messages.length <= 1 && (
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

      {error && (
        <div style={{ fontSize: '0.78rem', color: 'var(--color-danger)', marginTop: 4, textAlign: 'center' }}>
          {error}
        </div>
      )}

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
  return 'תודה על שאלתך! אשמח לעזור עם שאלות נוספות על הריון ותינוקות! 💝';
}
