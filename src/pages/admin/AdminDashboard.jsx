import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth } from '../../context/AuthContext';
import { useLanguage, usePageText } from '../../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

// ── Page-level translations ─────────────────────────────────
const PAGE_TEXT = {
  he: {
    // Chart data
    chartBirthPrep: 'הכנה ללידה',
    chartNutrition: 'תזונה בהריון',
    chartBabySleep: 'שינה לתינוק',
    chartVaccines: 'חיסוני תינוקות',
    chartEveningRoutine: 'שגרת ערב',
    // Recent users
    userName1: 'שרה לוי',
    userName2: 'מיכל כהן',
    userName3: 'רחל אברהם',
    userName4: 'דנה ישראלי',
    userName5: 'נועה שמש',
    // Recent contacts
    contactName1: 'אסתר גולד',
    contactSubject1: 'שאלה על לידה טבעית',
    contactTime1: 'לפני שעה',
    contactName2: 'יפית מזרחי',
    contactSubject2: 'בעיה בגישה לקורס',
    contactTime2: 'לפני 3 שעות',
    contactName3: 'שירי לוי',
    contactSubject3: 'בקשה לשינוי מסלול',
    contactTime3: 'לפני יום',
    // Stat cards
    statPatients: 'מטופלות',
    statStudents: 'סטודנטיות',
    statPendingApproval: 'ממתינים לאישור',
    statWeeklyViews: 'צפיות השבוע',
    // Status labels
    statusNew: 'חדש',
    statusPending: 'ממתין',
    statusDone: 'טופל',
    // Role labels
    rolePatient: 'מטופלת',
    roleStudent: 'סטודנטית',
    roleAdmin: 'מנהלת',
    // Page header
    pageTitle: '🛡️ לוח בקרה ניהולי',
    // Date parts
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
    datePrefix: 'יום',
    dateMonthPrefix: 'ב',
    // Pending alert
    pendingAlertPre: 'יש',
    pendingAlertPost: 'משתמשים שממתינים לאישור',
    pendingAlertAction: 'לחץ/י לאישור או דחייה',
    // Chart title
    topVideosTitle: '🎬 5 הסרטונים הנצפים ביותר',
    views: 'צפיות',
    // Recent contacts section
    recentContactsTitle: '📩 פניות אחרונות',
    // Recent registrations
    recentRegistrationsTitle: '👥 הצטרפויות אחרונות',
    thName: 'שם',
    thEmail: 'אימייל',
    thRole: 'תפקיד',
    thJoinDate: 'תאריך הצטרפות',
  },
  en: {
    // Chart data
    chartBirthPrep: 'Birth Preparation',
    chartNutrition: 'Pregnancy Nutrition',
    chartBabySleep: 'Baby Sleep',
    chartVaccines: 'Baby Vaccines',
    chartEveningRoutine: 'Evening Routine',
    // Recent users
    userName1: 'Sarah Levi',
    userName2: 'Michal Cohen',
    userName3: 'Rachel Abraham',
    userName4: 'Dana Israeli',
    userName5: 'Noa Shemesh',
    // Recent contacts
    contactName1: 'Esther Gold',
    contactSubject1: 'Question about natural birth',
    contactTime1: '1 hour ago',
    contactName2: 'Yafit Mizrachi',
    contactSubject2: 'Problem accessing the course',
    contactTime2: '3 hours ago',
    contactName3: 'Shiri Levi',
    contactSubject3: 'Request to change track',
    contactTime3: '1 day ago',
    // Stat cards
    statPatients: 'Patients',
    statStudents: 'Students',
    statPendingApproval: 'Pending Approval',
    statWeeklyViews: 'Weekly Views',
    // Status labels
    statusNew: 'New',
    statusPending: 'Pending',
    statusDone: 'Done',
    // Role labels
    rolePatient: 'Patient',
    roleStudent: 'Student',
    roleAdmin: 'Admin',
    // Page header
    pageTitle: '🛡️ Admin Dashboard',
    // Date parts
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
    datePrefix: '',
    dateMonthPrefix: '',
    // Pending alert
    pendingAlertPre: '',
    pendingAlertPost: 'users pending approval',
    pendingAlertAction: 'Click to approve or reject',
    // Chart title
    topVideosTitle: '🎬 Top 5 Most Viewed Videos',
    views: 'Views',
    // Recent contacts section
    recentContactsTitle: '📩 Recent Inquiries',
    // Recent registrations
    recentRegistrationsTitle: '👥 Recent Registrations',
    thName: 'Name',
    thEmail: 'Email',
    thRole: 'Role',
    thJoinDate: 'Join Date',
  },
};

export default function AdminDashboard() {
  const { getAllUsers } = useAuth();
  const navigate = useNavigate();
  const pt = usePageText(PAGE_TEXT);
  const { isRTL } = useLanguage();

  const allUsers = getAllUsers();
  const pendingCount = allUsers.filter(u => u.status === 'pending').length;
  const momsCount = allUsers.filter(u => u.role === 'moms' && u.status === 'approved').length;
  const studentCount = allUsers.filter(u => u.role === 'student' && u.status === 'approved').length;

  const VIDEO_CHART_DATA = [
    { name: pt('chartBirthPrep'), views: 1240 },
    { name: pt('chartNutrition'), views: 1102 },
    { name: pt('chartBabySleep'), views: 980 },
    { name: pt('chartVaccines'), views: 934 },
    { name: pt('chartEveningRoutine'), views: 823 },
  ];

  const RECENT_USERS = [
    { id: 1, name: pt('userName1'), email: 'sarah@test.com', role: 'moms', date: '2026-02-28' },
    { id: 2, name: pt('userName2'), email: 'michal@test.com', role: 'student', date: '2026-02-25' },
    { id: 3, name: pt('userName3'), email: 'rachel@test.com', role: 'moms', date: '2026-02-22' },
    { id: 4, name: pt('userName4'), email: 'dana@test.com', role: 'student', date: '2026-02-19' },
    { id: 5, name: pt('userName5'), email: 'noa@test.com', role: 'moms', date: '2026-02-15' },
  ];

  const RECENT_CONTACTS = [
    { id: 1, name: pt('contactName1'), subject: pt('contactSubject1'), status: 'new', time: pt('contactTime1') },
    { id: 2, name: pt('contactName2'), subject: pt('contactSubject2'), status: 'pending', time: pt('contactTime2') },
    { id: 3, name: pt('contactName3'), subject: pt('contactSubject3'), status: 'done', time: pt('contactTime3') },
  ];

  const STATUS_CONFIG = {
    new: { label: pt('statusNew'), cls: 'badge-danger' },
    pending: { label: pt('statusPending'), cls: 'badge-warning' },
    done: { label: pt('statusDone'), cls: 'badge-success' },
  };

  const ROLE_CONFIG = {
    moms: { label: pt('rolePatient'), cls: 'badge-rose' },
    student: { label: pt('roleStudent'), cls: 'badge-sage' },
    admin: { label: pt('roleAdmin'), cls: 'badge-admin' },
  };

  const statCards = [
    { label: pt('statPatients'), value: momsCount, icon: '👩‍🤱', iconBg: 'var(--color-sage-ultra)', color: 'var(--color-sage-dark)' },
    { label: pt('statStudents'), value: studentCount, icon: '🎓', iconBg: 'var(--color-rose-light)', color: 'var(--color-rose-dark)' },
    { label: pt('statPendingApproval'), value: pendingCount, icon: '⏳', iconBg: '#FEF3C7', color: '#B45309', onClick: () => navigate('/admin/users') },
    { label: pt('statWeeklyViews'), value: 312, icon: '👁️', iconBg: 'var(--color-admin-light)', color: 'var(--color-admin)' },
  ];

  const days = [pt('daySunday'), pt('dayMonday'), pt('dayTuesday'), pt('dayWednesday'), pt('dayThursday'), pt('dayFriday'), pt('daySaturday')];
  const months = [pt('monthJan'), pt('monthFeb'), pt('monthMar'), pt('monthApr'), pt('monthMay'), pt('monthJun'), pt('monthJul'), pt('monthAug'), pt('monthSep'), pt('monthOct'), pt('monthNov'), pt('monthDec')];

  const formatCurrentDate = () => {
    const d = new Date();
    if (isRTL) {
      return `${pt('datePrefix')} ${days[d.getDay()]}, ${d.getDate()} ${pt('dateMonthPrefix')}${months[d.getMonth()]} ${d.getFullYear()}`;
    }
    return `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  };

  return (
    <div style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      {/* Page Header */}
      <div className="page-header">
        <h1>{pt('pageTitle')}</h1>
        <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
          {formatCurrentDate()}
        </span>
      </div>

      {/* Pending alert */}
      {pendingCount > 0 && (
        <div
          onClick={() => navigate('/admin/users')}
          style={{
            background: '#FFF8E1',
            border: '1px solid var(--color-warning)',
            borderRadius: 'var(--radius-md)',
            padding: '14px 18px',
            marginBottom: 24,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <span style={{ fontSize: '1.4rem' }}>⏳</span>
          <div>
            <strong style={{ color: '#B45309' }}>
              {isRTL
                ? `${pt('pendingAlertPre')} ${pendingCount} ${pt('pendingAlertPost')}`
                : `${pendingCount} ${pt('pendingAlertPost')}`}
            </strong>
            <div style={{ fontSize: '0.82rem', color: '#92400E' }}>{pt('pendingAlertAction')}</div>
          </div>
          <span style={{ marginRight: isRTL ? 'auto' : undefined, marginLeft: isRTL ? undefined : 'auto', color: '#B45309', fontSize: '1.2rem' }}>{isRTL ? '←' : '→'}</span>
        </div>
      )}

      {/* Stat Cards */}
      <div className="grid-4" style={{ marginBottom: 32 }}>
        {statCards.map((card, i) => (
          <div
            className="stat-card"
            key={i}
            onClick={card.onClick}
            style={card.onClick ? { cursor: 'pointer' } : {}}
          >
            <div className="stat-icon" style={{ background: card.iconBg, fontSize: '1.4rem' }}>
              {card.icon}
            </div>
            <div className="stat-value" style={{ color: card.color }}>{card.value}</div>
            <div className="stat-label">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Charts + Contacts Row */}
      <div className="grid-2" style={{ marginBottom: 32 }}>
        {/* Bar Chart */}
        <div className="card">
          <h2 style={{ fontSize: 'var(--font-base)', fontWeight: 800, marginBottom: 16 }}>
            {pt('topVideosTitle')}
          </h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={VIDEO_CHART_DATA} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 11, textAnchor: 'start', x: 0 }} />
              <Tooltip formatter={v => [`${v} ${pt('views')}`, '']} />
              <Bar dataKey="views" fill="var(--color-sage)" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Contacts */}
        <div className="card">
          <h2 style={{ fontSize: 'var(--font-base)', fontWeight: 800, marginBottom: 16 }}>{pt('recentContactsTitle')}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {RECENT_CONTACTS.map(c => {
              const sc = STATUS_CONFIG[c.status];
              return (
                <div key={c.id} style={{
                  padding: '12px 14px', borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  display: 'flex', alignItems: 'center', gap: 12,
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: 'var(--color-sage-ultra)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 700, color: 'var(--color-sage-dark)', flexShrink: 0,
                  }}>
                    {c.name.charAt(0)}
                  </div>
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>{c.name}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {c.subject}
                    </div>
                  </div>
                  <div style={{ textAlign: isRTL ? 'left' : 'right', flexShrink: 0 }}>
                    <span className={`badge ${sc.cls}`}>{sc.label}</span>
                    <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginTop: 4 }}>{c.time}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Registrations */}
      <div className="card">
        <h2 style={{ fontSize: 'var(--font-base)', fontWeight: 800, marginBottom: 16 }}>{pt('recentRegistrationsTitle')}</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>{pt('thName')}</th>
                <th>{pt('thEmail')}</th>
                <th>{pt('thRole')}</th>
                <th>{pt('thJoinDate')}</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_USERS.map(u => {
                const rc = ROLE_CONFIG[u.role] || {};
                return (
                  <tr key={u.id}>
                    <td style={{ fontWeight: 600 }}>{u.name}</td>
                    <td style={{ color: 'var(--color-text-muted)', direction: 'ltr', textAlign: isRTL ? 'right' : 'left' }}>{u.email}</td>
                    <td><span className={`badge ${rc.cls}`}>{rc.label}</span></td>
                    <td style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                      {(() => { const d = new Date(u.date + 'T12:00:00'); return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`; })()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
