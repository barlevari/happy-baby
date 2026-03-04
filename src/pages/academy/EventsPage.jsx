import { useState } from 'react';
import { useLanguage, usePageText } from '../../context/LanguageContext';
import { MOCK_EVENTS } from '../../data/mockData';

// ── Page-level translations ─────────────────────────────────
const PAGE_TEXT = {
  he: {
    pageTitle: '📅 אירועים',
    upcomingEvents: 'אירועים קרובים',
    pastEventsToggle: 'אירועים שעברו',
    online: '💻 אונליין',
    inPerson: '📍 פרונטלי',
    spotsRemaining: 'מקומות נותרו',
    registered: '✓ רשומה',
    register: 'הרשמי',
    eventEnded: 'האירוע הסתיים',
    newsletterTitle: 'הירשמי לניוזלטר',
    newsletterDescription: 'קבלי עדכונים על אירועים חדשים, טיפים וחדשות מהאקדמיה',
    newsletterSuccess: '🎉 תודה! הצטרפת בהצלחה לניוזלטר של Happy Baby',
    fullNamePlaceholder: 'שם מלא',
    emailPlaceholder: 'כתובת אימייל',
    subscribeButton: 'הרשמי לניוזלטר',
    daySunday: 'ראשון',
    dayMonday: 'שני',
    dayTuesday: 'שלישי',
    dayWednesday: 'רביעי',
    dayThursday: 'חמישי',
    dayFriday: 'שישי',
    daySaturday: 'שבת',
    monthJan: 'ינואר',
    monthFeb: 'פברואר',
    monthMar: 'מרץ',
    monthApr: 'אפריל',
    monthMay: 'מאי',
    monthJun: 'יוני',
    monthJul: 'יולי',
    monthAug: 'אוגוסט',
    monthSep: 'ספטמבר',
    monthOct: 'אוקטובר',
    monthNov: 'נובמבר',
    monthDec: 'דצמבר',
    monthShortJan: 'ינו',
    monthShortFeb: 'פבר',
    monthShortMar: 'מרץ',
    monthShortApr: 'אפר',
    monthShortMay: 'מאי',
    monthShortJun: 'יוני',
    monthShortJul: 'יולי',
    monthShortAug: 'אוג',
    monthShortSep: 'ספט',
    monthShortOct: 'אוק',
    monthShortNov: 'נוב',
    monthShortDec: 'דצמ',
    dayPrefix: 'יום',
    monthPrefix: 'ב',
    pastWorkshop: 'סדנת לידה – מחזור 12',
    pastWebinar: 'וובינר: תזונה בהנקה',
    pastSupportGroup: 'קבוצת תמיכה – אמהות חדשות',
  },
  en: {
    pageTitle: '📅 Events',
    upcomingEvents: 'Upcoming Events',
    pastEventsToggle: 'Past Events',
    online: '💻 Online',
    inPerson: '📍 In-Person',
    spotsRemaining: 'spots remaining',
    registered: '✓ Registered',
    register: 'Register',
    eventEnded: 'Event ended',
    newsletterTitle: 'Subscribe to Newsletter',
    newsletterDescription: 'Get updates about new events, tips, and news from the academy',
    newsletterSuccess: '🎉 Thank you! You have successfully subscribed to the Happy Baby newsletter',
    fullNamePlaceholder: 'Full name',
    emailPlaceholder: 'Email address',
    subscribeButton: 'Subscribe to Newsletter',
    daySunday: 'Sunday',
    dayMonday: 'Monday',
    dayTuesday: 'Tuesday',
    dayWednesday: 'Wednesday',
    dayThursday: 'Thursday',
    dayFriday: 'Friday',
    daySaturday: 'Saturday',
    monthJan: 'January',
    monthFeb: 'February',
    monthMar: 'March',
    monthApr: 'April',
    monthMay: 'May',
    monthJun: 'June',
    monthJul: 'July',
    monthAug: 'August',
    monthSep: 'September',
    monthOct: 'October',
    monthNov: 'November',
    monthDec: 'December',
    monthShortJan: 'Jan',
    monthShortFeb: 'Feb',
    monthShortMar: 'Mar',
    monthShortApr: 'Apr',
    monthShortMay: 'May',
    monthShortJun: 'Jun',
    monthShortJul: 'Jul',
    monthShortAug: 'Aug',
    monthShortSep: 'Sep',
    monthShortOct: 'Oct',
    monthShortNov: 'Nov',
    monthShortDec: 'Dec',
    dayPrefix: '',
    monthPrefix: '',
    pastWorkshop: 'Birth Workshop - Cycle 12',
    pastWebinar: 'Webinar: Breastfeeding Nutrition',
    pastSupportGroup: 'Support Group - New Mothers',
  },
};

const PAST_EVENTS = [
  { id: 101, title: 'pastWorkshop', date: '2026-01-20', type: 'inPerson', spots: 0 },
  { id: 102, title: 'pastWebinar', date: '2026-01-05', type: 'online', spots: 0 },
  { id: 103, title: 'pastSupportGroup', date: '2025-12-15', type: 'inPerson', spots: 0 },
];

function EventCard({ event, pt, isPastEvent }) {
  const [registered, setRegistered] = useState(false);
  const isPast = new Date(event.date) < new Date();

  const dayKeys = ['daySunday', 'dayMonday', 'dayTuesday', 'dayWednesday', 'dayThursday', 'dayFriday', 'daySaturday'];
  const monthKeys = ['monthJan', 'monthFeb', 'monthMar', 'monthApr', 'monthMay', 'monthJun', 'monthJul', 'monthAug', 'monthSep', 'monthOct', 'monthNov', 'monthDec'];
  const monthShortKeys = ['monthShortJan', 'monthShortFeb', 'monthShortMar', 'monthShortApr', 'monthShortMay', 'monthShortJun', 'monthShortJul', 'monthShortAug', 'monthShortSep', 'monthShortOct', 'monthShortNov', 'monthShortDec'];

  const d = new Date(event.date + 'T12:00:00');
  const dayName = pt(dayKeys[d.getDay()]);
  const monthName = pt(monthKeys[d.getMonth()]);
  const monthShort = pt(monthShortKeys[d.getMonth()]);
  const dayPrefix = pt('dayPrefix');
  const monthPrefix = pt('monthPrefix');

  const title = isPastEvent ? pt(event.title) : event.title;

  const formattedDate = dayPrefix
    ? `${dayPrefix} ${dayName}, ${d.getDate()} ${monthPrefix}${monthName} ${d.getFullYear()}`
    : `${dayName}, ${monthName} ${d.getDate()}, ${d.getFullYear()}`;

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
          {d.getDate()}
        </div>
        <div>
          {monthShort}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>{title}</h3>
          <span className={`badge ${event.type === 'online' ? 'badge-sage' : 'badge-rose'}`}>
            {event.type === 'online' ? pt('online') : pt('inPerson')}
          </span>
        </div>
        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: 8 }}>
          {formattedDate}
        </div>
        {!isPast && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: '0.8rem', color: event.spots < 5 ? 'var(--color-warning)' : 'var(--color-text-muted)' }}>
              {event.spots} {pt('spotsRemaining')}
            </span>
            <button
              className={`btn btn-sm ${registered ? 'btn-ghost' : 'btn-primary'}`}
              onClick={() => setRegistered(r => !r)}
              disabled={event.spots === 0}
            >
              {registered ? pt('registered') : pt('register')}
            </button>
          </div>
        )}
        {isPast && (
          <span className="badge badge-warning">{pt('eventEnded')}</span>
        )}
      </div>
    </div>
  );
}

export default function EventsPage() {
  const pt = usePageText(PAGE_TEXT);
  const { isRTL } = useLanguage();

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
    <div style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      <div className="page-header">
        <h1>{pt('pageTitle')}</h1>
      </div>

      {/* Upcoming Events */}
      <div style={{ marginBottom: 8 }}>
        <h2 style={{ fontSize: 'var(--font-lg)', fontWeight: 800, marginBottom: 16 }}>{pt('upcomingEvents')}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {MOCK_EVENTS.map(event => (
            <EventCard key={event.id} event={event} pt={pt} isPastEvent={false} />
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
          <span>{pt('pastEventsToggle')} ({PAST_EVENTS.length})</span>
        </button>

        {showPast && (
          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {PAST_EVENTS.map(event => (
              <EventCard key={event.id} event={event} pt={pt} isPastEvent={true} />
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
        <h2 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: 8 }}>{pt('newsletterTitle')}</h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: 20 }}>
          {pt('newsletterDescription')}
        </p>

        {newsletterSent ? (
          <div className="alert alert-success" style={{ justifyContent: 'center' }}>
            {pt('newsletterSuccess')}
          </div>
        ) : (
          <form onSubmit={handleNewsletterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input
              type="text"
              className="form-input"
              placeholder={pt('fullNamePlaceholder')}
              value={newsletter.name}
              onChange={e => setNewsletter(n => ({ ...n, name: e.target.value }))}
            />
            <input
              type="email"
              className="form-input"
              placeholder={pt('emailPlaceholder')}
              value={newsletter.email}
              onChange={e => setNewsletter(n => ({ ...n, email: e.target.value }))}
              dir="ltr"
            />
            <button type="submit" className="btn btn-primary">
              {pt('subscribeButton')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
