import { useState } from 'react';
import { MOCK_EVENTS } from '../../data/mockData';

const PAST_EVENTS = [
  { id: 101, title: 'סדנת לידה – מחזור 12', date: '2026-01-20', type: 'inPerson', spots: 0 },
  { id: 102, title: 'וובינר: תזונה בהנקה', date: '2026-01-05', type: 'online', spots: 0 },
  { id: 103, title: 'קבוצת תמיכה – אמהות חדשות', date: '2025-12-15', type: 'inPerson', spots: 0 },
];

function EventCard({ event }) {
  const [registered, setRegistered] = useState(false);
  const isPast = new Date(event.date) < new Date();

  return (
    <div className="card" style={{
      display: 'flex',
      gap: 16,
      alignItems: 'flex-start',
      opacity: isPast ? 0.7 : 1,
    }}>
      {/* Date Badge */}
      <div style={{
        width: 56,
        height: 56,
        borderRadius: 'var(--radius-md)',
        background: event.type === 'online' ? 'var(--color-sage-ultra)' : 'var(--color-rose-light)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        fontSize: '0.7rem',
        fontWeight: 700,
        color: event.type === 'online' ? 'var(--color-sage-dark)' : 'var(--color-rose-dark)',
      }}>
        <div style={{ fontSize: '1.2rem' }}>
          {new Date(event.date + 'T12:00:00').getDate()}
        </div>
        <div>
          {['ינו','פבר','מרץ','אפר','מאי','יוני','יולי','אוג','ספט','אוק','נוב','דצמ'][new Date(event.date + 'T12:00:00').getMonth()]}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>{event.title}</h3>
          <span className={`badge ${event.type === 'online' ? 'badge-sage' : 'badge-rose'}`}>
            {event.type === 'online' ? '💻 אונליין' : '📍 פרונטלי'}
          </span>
        </div>
        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: 8 }}>
          {(() => { const d = new Date(event.date + 'T12:00:00'); const days = ['ראשון','שני','שלישי','רביעי','חמישי','שישי','שבת']; const months = ['ינואר','פברואר','מרץ','אפריל','מאי','יוני','יולי','אוגוסט','ספטמבר','אוקטובר','נובמבר','דצמבר']; return `יום ${days[d.getDay()]}, ${d.getDate()} ב${months[d.getMonth()]} ${d.getFullYear()}`; })()}
        </div>
        {!isPast && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: '0.8rem', color: event.spots < 5 ? 'var(--color-warning)' : 'var(--color-text-muted)' }}>
              {event.spots} מקומות נותרו
            </span>
            <button
              className={`btn btn-sm ${registered ? 'btn-ghost' : 'btn-primary'}`}
              onClick={() => setRegistered(r => !r)}
              disabled={event.spots === 0}
            >
              {registered ? '✓ רשומה' : 'הרשמי'}
            </button>
          </div>
        )}
        {isPast && (
          <span className="badge badge-warning">האירוע הסתיים</span>
        )}
      </div>
    </div>
  );
}

export default function EventsPage() {
  const [showPast, setShowPast] = useState(false);
  const [newsletter, setNewsletter] = useState({ name: '', email: '' });
  const [newsletterSent, setNewsletterSent] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletter.name && newsletter.email) {
      setNewsletterSent(true);
    }
  };

  return (
    <div style={{ direction: 'rtl' }}>
      <div className="page-header">
        <h1>📅 אירועים</h1>
      </div>

      {/* Upcoming Events */}
      <div style={{ marginBottom: 8 }}>
        <h2 style={{ fontSize: 'var(--font-lg)', fontWeight: 800, marginBottom: 16 }}>אירועים קרובים</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {MOCK_EVENTS.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>

      {/* Past Events Toggle */}
      <div style={{ marginTop: 32, marginBottom: 32 }}>
        <button
          className="btn btn-ghost"
          onClick={() => setShowPast(s => !s)}
          style={{ display: 'flex', alignItems: 'center', gap: 8 }}
        >
          <span>{showPast ? '▲' : '▼'}</span>
          <span>אירועים שעברו ({PAST_EVENTS.length})</span>
        </button>

        {showPast && (
          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {PAST_EVENTS.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>

      {/* Newsletter Signup */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, var(--color-sage-ultra), var(--color-cream))',
        border: '1px solid var(--color-sage-light)',
        textAlign: 'center',
        maxWidth: 520,
        margin: '0 auto',
      }}>
        <div style={{ fontSize: '2rem', marginBottom: 12 }}>📧</div>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: 8 }}>הירשמי לניוזלטר</h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: 20 }}>
          קבלי עדכונים על אירועים חדשים, טיפים וחדשות מהאקדמיה
        </p>

        {newsletterSent ? (
          <div className="alert alert-success" style={{ justifyContent: 'center' }}>
            🎉 תודה! הצטרפת בהצלחה לניוזלטר של Happy Baby
          </div>
        ) : (
          <form onSubmit={handleNewsletterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input
              type="text"
              className="form-input"
              placeholder="שם מלא"
              value={newsletter.name}
              onChange={e => setNewsletter(n => ({ ...n, name: e.target.value }))}
            />
            <input
              type="email"
              className="form-input"
              placeholder="כתובת אימייל"
              value={newsletter.email}
              onChange={e => setNewsletter(n => ({ ...n, email: e.target.value }))}
              dir="ltr"
            />
            <button type="submit" className="btn btn-primary">
              הרשמי לניוזלטר
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
