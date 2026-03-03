import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const ROLE_LABELS = { moms: 'מטופלת', student: 'סטודנטית', admin: 'מנהלת' };
const ROLE_BADGES = { moms: 'badge-rose', student: 'badge-sage', admin: 'badge-admin' };

const STATUS_CONFIG = {
  approved: { label: 'פעיל', cls: 'badge-success' },
  pending:  { label: 'ממתין לאישור', cls: 'badge-warning' },
  blocked:  { label: 'חסום', cls: 'badge-danger' },
};

function formatDate(d) {
  if (!d) return '—';
  const [y, m, day] = d.split('-');
  return `${day}/${m}/${y}`;
}

export default function UsersTable() {
  const { getAllUsers, approveUser, blockUser, unblockUser, deleteUser, changeRole } = useAuth();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [confirmDelete, setConfirmDelete] = useState(null);

  const allUsers = getAllUsers();

  const filtered = allUsers.filter(u => {
    const matchesSearch = u.name.includes(search) || u.email.includes(search);
    if (filter === 'pending') return matchesSearch && u.status === 'pending';
    if (filter === 'moms') return matchesSearch && u.role === 'moms';
    if (filter === 'student') return matchesSearch && u.role === 'student';
    if (filter === 'blocked') return matchesSearch && u.status === 'blocked';
    return matchesSearch;
  });

  const pendingCount = allUsers.filter(u => u.status === 'pending').length;

  const tabs = [
    { id: 'all', label: `כולם (${allUsers.length})` },
    { id: 'pending', label: `ממתינים לאישור (${pendingCount})`, highlight: pendingCount > 0 },
    { id: 'moms', label: `מטופלות (${allUsers.filter(u => u.role === 'moms').length})` },
    { id: 'student', label: `סטודנטיות (${allUsers.filter(u => u.role === 'student').length})` },
    { id: 'blocked', label: `חסומים (${allUsers.filter(u => u.status === 'blocked').length})` },
  ];

  return (
    <div style={{ direction: 'rtl' }}>
      <div className="page-header">
        <h1>👥 ניהול משתמשים</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {pendingCount > 0 && (
            <span style={{
              background: 'var(--color-warning)',
              color: 'white',
              borderRadius: 20,
              padding: '4px 12px',
              fontSize: '0.82rem',
              fontWeight: 800,
              animation: 'pulse 2s infinite',
            }}>
              ⚠️ {pendingCount} ממתינים לאישור
            </span>
          )}
          <span className="badge badge-sage" style={{ fontSize: '0.9rem' }}>{filtered.length} משתמשים</span>
        </div>
      </div>

      {/* Pending approvals banner */}
      {pendingCount > 0 && filter !== 'pending' && (
        <div
          onClick={() => setFilter('pending')}
          style={{
            background: '#FFF8E1',
            border: '1px solid var(--color-warning)',
            borderRadius: 'var(--radius-md)',
            padding: '12px 16px',
            marginBottom: 20,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <span style={{ fontSize: '1.2rem' }}>⏳</span>
          <div>
            <strong style={{ color: '#B45309' }}>יש {pendingCount} משתמשים שממתינים לאישור הרשמה</strong>
            <div style={{ fontSize: '0.82rem', color: '#92400E' }}>לחץ/י כאן לצפייה ואישור</div>
          </div>
          <span style={{ marginRight: 'auto', color: '#B45309' }}>←</span>
        </div>
      )}

      {/* Search */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
        <input
          type="text"
          className="form-input"
          placeholder="🔍 חיפוש לפי שם או אימייל..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ maxWidth: 320 }}
        />
      </div>

      <div className="tabs" style={{ overflowX: 'auto' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn${filter === tab.id ? ' active' : ''}`}
            onClick={() => setFilter(tab.id)}
            style={tab.highlight && filter !== tab.id ? { color: '#B45309', fontWeight: 800 } : {}}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>שם</th>
              <th>אימייל</th>
              <th>תפקיד</th>
              <th>תאריך הצטרפות</th>
              <th>סטטוס</th>
              <th>פעולות</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => {
              const sc = STATUS_CONFIG[u.status] || STATUS_CONFIG.approved;
              return (
                <tr key={u.id} style={u.status === 'pending' ? { background: '#FFFBEB' } : {}}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                        background: u.status === 'pending' ? '#FDE68A' : 'var(--color-sage-ultra)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 700, fontSize: '0.8rem', color: 'var(--color-sage-dark)',
                      }}>
                        {u.name.charAt(0)}
                      </div>
                      <span style={{ fontWeight: 600 }}>{u.name}</span>
                    </div>
                  </td>
                  <td style={{ color: 'var(--color-text-muted)', direction: 'ltr', textAlign: 'right' }}>{u.email}</td>
                  <td>
                    <select
                      value={u.role}
                      onChange={e => changeRole(u.id, e.target.value)}
                      style={{
                        border: '1px solid var(--color-border)',
                        borderRadius: 6,
                        padding: '2px 6px',
                        fontSize: '0.8rem',
                        background: 'white',
                        cursor: 'pointer',
                      }}
                    >
                      <option value="moms">מטופלת</option>
                      <option value="student">סטודנטית</option>
                    </select>
                  </td>
                  <td style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                    {formatDate(u.joined)}
                  </td>
                  <td>
                    <span className={`badge ${sc.cls}`}>{sc.label}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {u.status === 'pending' && (
                        <>
                          <button
                            className="btn btn-sm"
                            onClick={() => approveUser(u.id)}
                            style={{ fontSize: '0.75rem', background: 'var(--color-sage)', color: 'white', border: 'none' }}
                          >
                            ✅ אשר/י
                          </button>
                          <button
                            className="btn btn-sm btn-ghost"
                            onClick={() => blockUser(u.id)}
                            style={{ fontSize: '0.75rem', color: 'var(--color-danger)' }}
                          >
                            ❌ דחה/י
                          </button>
                        </>
                      )}
                      {u.status === 'approved' && (
                        <button
                          className="btn btn-sm btn-ghost"
                          onClick={() => blockUser(u.id)}
                          style={{ fontSize: '0.75rem', color: 'var(--color-danger)' }}
                        >
                          🚫 חסום/י
                        </button>
                      )}
                      {u.status === 'blocked' && (
                        <button
                          className="btn btn-sm btn-ghost"
                          onClick={() => unblockUser(u.id)}
                          style={{ fontSize: '0.75rem', color: 'var(--color-sage)' }}
                        >
                          ✅ בטל חסימה
                        </button>
                      )}
                      <button
                        className="btn btn-sm btn-ghost"
                        onClick={() => setConfirmDelete(u.id)}
                        style={{ fontSize: '0.75rem', color: 'var(--color-danger)' }}
                      >
                        🗑️ מחק/י
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: 32, color: 'var(--color-text-muted)' }}>
                  לא נמצאו משתמשים
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Confirm Delete Modal */}
      {confirmDelete && (
        <div className="modal-overlay" onClick={() => setConfirmDelete(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: 360, textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>⚠️</div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: 8 }}>מחיקת משתמש</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: 24 }}>
              האם את בטוחה שברצונך למחוק את המשתמש? פעולה זו אינה הפיכה.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn btn-ghost" onClick={() => setConfirmDelete(null)} style={{ flex: 1 }}>ביטול</button>
              <button
                className="btn"
                onClick={() => { deleteUser(confirmDelete); setConfirmDelete(null); }}
                style={{ flex: 1, background: 'var(--color-danger)', color: 'white', border: 'none' }}
              >
                מחק/י
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
