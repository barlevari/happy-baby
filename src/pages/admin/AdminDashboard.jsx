import { useAuth } from '../../context/AuthContext';
import { useLanguage, usePageText } from '../../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

// ── Page-level translations ─────────────────────────────────
const PAGE_TEXT = {
  he: {
    // Stat cards
    statPatients: 'מטופלות',
    statStudents: 'סטודנטיות',
    statPendingApproval: 'ממתינים לאישור',
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
    // Recent registrations
    recentRegistrationsTitle: '👥 הצטרפויות אחרונות',
    thName: 'שם',
    thEmail: 'אימייל',
    thRole: 'תפקיד',
    thJoinDate: 'תאריך הצטרפות',
    noUsersYet: 'אין משתמשים רשומים עדיין',
  },
  en: {
    // Stat cards
    statPatients: 'Patients',
    statStudents: 'Students',
    statPendingApproval: 'Pending Approval',
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
    // Recent registrations
    recentRegistrationsTitle: '👥 Recent Registrations',
    thName: 'Name',
    thEmail: 'Email',
    thRole: 'Role',
    thJoinDate: 'Join Date',
    noUsersYet: 'No registered users yet',
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

  // 5 most recent users sorted by join date (newest first)
  const recentUsers = [...allUsers]
    .sort((a, b) => (b.joined || '').localeCompare(a.joined || ''))
    .slice(0, 5);

  const ROLE_CONFIG = {
    moms: { label: pt('rolePatient'), cls: 'badge-rose' },
    student: { label: pt('roleStudent'), cls: 'badge-sage' },
    admin: { label: pt('roleAdmin'), cls: 'badge-admin' },
  };

  const statCards = [
    { label: pt('statPatients'), value: momsCount, icon: '👩‍🤱', iconBg: 'var(--color-sage-ultra)', color: 'var(--color-sage-dark)' },
    { label: pt('statStudents'), value: studentCount, icon: '🎓', iconBg: 'var(--color-rose-light)', color: 'var(--color-rose-dark)' },
    { label: pt('statPendingApproval'), value: pendingCount, icon: '⏳', iconBg: '#FEF3C7', color: '#B45309', onClick: () => navigate('/admin/users') },
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
      <div className="grid-3" style={{ marginBottom: 32 }}>
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

      {/* Recent Registrations */}
      <div className="card">
        <h2 style={{ fontSize: 'var(--font-base)', fontWeight: 800, marginBottom: 16 }}>{pt('recentRegistrationsTitle')}</h2>
        <div className="table-wrapper">
          {recentUsers.length === 0 ? (
            <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', padding: '24px 0' }}>
              {pt('noUsersYet')}
            </p>
          ) : (
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
                {recentUsers.map(u => {
                  const rc = ROLE_CONFIG[u.role] || {};
                  return (
                    <tr key={u.id}>
                      <td style={{ fontWeight: 600 }}>{u.name}</td>
                      <td style={{ color: 'var(--color-text-muted)', direction: 'ltr', textAlign: isRTL ? 'right' : 'left' }}>{u.email}</td>
                      <td><span className={`badge ${rc.cls}`}>{rc.label}</span></td>
                      <td style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                        {(() => {
                          if (!u.joined) return '—';
                          const d = new Date(u.joined + 'T12:00:00');
                          return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
                        })()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
