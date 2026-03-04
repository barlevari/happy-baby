import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const VIDEO_CHART_DATA = [
  { name: 'הכנה ללידה', views: 1240 },
  { name: 'תזונה בהריון', views: 1102 },
  { name: 'שינה לתינוק', views: 980 },
  { name: 'חיסוני תינוקות', views: 934 },
  { name: 'שגרת ערב', views: 823 },
];

const RECENT_USERS = [
  { id: 1, name: 'שרה לוי', email: 'sarah@test.com', role: 'moms', date: '2026-02-28' },
  { id: 2, name: 'מיכל כהן', email: 'michal@test.com', role: 'student', date: '2026-02-25' },
  { id: 3, name: 'רחל אברהם', email: 'rachel@test.com', role: 'moms', date: '2026-02-22' },
  { id: 4, name: 'דנה ישראלי', email: 'dana@test.com', role: 'student', date: '2026-02-19' },
  { id: 5, name: 'נועה שמש', email: 'noa@test.com', role: 'moms', date: '2026-02-15' },
];

const RECENT_CONTACTS = [
  { id: 1, name: 'אסתר גולד', subject: 'שאלה על לידה טבעית', status: 'new', time: 'לפני שעה' },
  { id: 2, name: 'יפית מזרחי', subject: 'בעיה בגישה לקורס', status: 'pending', time: 'לפני 3 שעות' },
  { id: 3, name: 'שירי לוי', subject: 'בקשה לשינוי מסלול', status: 'done', time: 'לפני יום' },
];

const STAT_CARDS = [
  { label: 'מטופלות', value: 47, icon: '👩‍🤱', iconBg: 'var(--color-sage-ultra)', color: 'var(--color-sage-dark)' },
  { label: 'סטודנטיות', value: 23, icon: '🎓', iconBg: 'var(--color-rose-light)', color: 'var(--color-rose-dark)' },
  { label: 'פניות חדשות', value: 5, icon: '📩', iconBg: '#FEF3E7', color: 'var(--color-warning)' },
  { label: 'צפיות השבוע', value: 312, icon: '👁️', iconBg: 'var(--color-admin-light)', color: 'var(--color-admin)' },
];

const STATUS_CONFIG = {
  new: { label: 'חדש', cls: 'badge-danger' },
  pending: { label: 'ממתין', cls: 'badge-warning' },
  done: { label: 'טופל', cls: 'badge-success' },
};

const ROLE_CONFIG = {
  moms: { label: 'מטופלת', cls: 'badge-rose' },
  student: { label: 'סטודנטית', cls: 'badge-sage' },
  admin: { label: 'מנהלת', cls: 'badge-admin' },
};

export default function AdminDashboard() {
  const { getAllUsers } = useAuth();
  const navigate = useNavigate();
  const allUsers = getAllUsers();
  const pendingCount = allUsers.filter(u => u.status === 'pending').length;
  const momsCount = allUsers.filter(u => u.role === 'moms' && u.status === 'approved').length;
  const studentCount = allUsers.filter(u => u.role === 'student' && u.status === 'approved').length;

  const statCards = [
    { label: 'מטופלות', value: momsCount, icon: '👩‍🤱', iconBg: 'var(--color-sage-ultra)', color: 'var(--color-sage-dark)' },
    { label: 'סטודנטיות', value: studentCount, icon: '🎓', iconBg: 'var(--color-rose-light)', color: 'var(--color-rose-dark)' },
    { label: 'ממתינים לאישור', value: pendingCount, icon: '⏳', iconBg: '#FEF3C7', color: '#B45309', onClick: () => navigate('/admin/users') },
    { label: 'צפיות השבוע', value: 312, icon: '👁️', iconBg: 'var(--color-admin-light)', color: 'var(--color-admin)' },
  ];

  return (
    <div style={{ direction: 'rtl' }}>
      {/* Page Header */}
      <div className="page-header">
        <h1>🛡️ לוח בקרה ניהולי</h1>
        <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
          {(() => { const d = new Date(); const days = ['ראשון','שני','שלישי','רביעי','חמישי','שישי','שבת']; const months = ['ינואר','פברואר','מרץ','אפריל','מאי','יוני','יולי','אוגוסט','ספטמבר','אוקטובר','נובמבר','דצמבר']; return `יום ${days[d.getDay()]}, ${d.getDate()} ב${months[d.getMonth()]} ${d.getFullYear()}`; })()}
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
            <strong style={{ color: '#B45309' }}>יש {pendingCount} משתמשים שממתינים לאישור</strong>
            <div style={{ fontSize: '0.82rem', color: '#92400E' }}>לחץ/י לאישור או דחייה</div>
          </div>
          <span style={{ marginRight: 'auto', color: '#B45309', fontSize: '1.2rem' }}>←</span>
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
            🎬 5 הסרטונים הנצפים ביותר
          </h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={VIDEO_CHART_DATA} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 11, textAnchor: 'start', x: 0 }} />
              <Tooltip formatter={v => [`${v} צפיות`, '']} />
              <Bar dataKey="views" fill="var(--color-sage)" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Contacts */}
        <div className="card">
          <h2 style={{ fontSize: 'var(--font-base)', fontWeight: 800, marginBottom: 16 }}>📩 פניות אחרונות</h2>
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
                  <div style={{ textAlign: 'left', flexShrink: 0 }}>
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
        <h2 style={{ fontSize: 'var(--font-base)', fontWeight: 800, marginBottom: 16 }}>👥 הצטרפויות אחרונות</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>שם</th>
                <th>אימייל</th>
                <th>תפקיד</th>
                <th>תאריך הצטרפות</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_USERS.map(u => {
                const rc = ROLE_CONFIG[u.role] || {};
                return (
                  <tr key={u.id}>
                    <td style={{ fontWeight: 600 }}>{u.name}</td>
                    <td style={{ color: 'var(--color-text-muted)', direction: 'ltr', textAlign: 'right' }}>{u.email}</td>
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
