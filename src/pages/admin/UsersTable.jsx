import { useState } from 'react';

const INITIAL_USERS = [
  { id: 1, name: 'שרה לוי', email: 'sarah@test.com', role: 'moms', joined: '2026-01-05', status: 'active' },
  { id: 2, name: 'מיכל כהן', email: 'michal@test.com', role: 'student', joined: '2026-01-08', status: 'active' },
  { id: 3, name: 'רחל אברהם', email: 'rachel@test.com', role: 'moms', joined: '2026-01-10', status: 'active' },
  { id: 4, name: 'דנה ישראלי', email: 'dana@test.com', role: 'student', joined: '2026-01-14', status: 'active' },
  { id: 5, name: 'נועה שמש', email: 'noa@test.com', role: 'moms', joined: '2026-01-18', status: 'blocked' },
  { id: 6, name: 'אסתר גולד', email: 'esther@test.com', role: 'moms', joined: '2026-01-22', status: 'active' },
  { id: 7, name: 'יפית מזרחי', email: 'yafit@test.com', role: 'student', joined: '2026-01-25', status: 'active' },
  { id: 8, name: 'שירי לוי', email: 'shiri@test.com', role: 'moms', joined: '2026-01-28', status: 'active' },
  { id: 9, name: 'טלי ברק', email: 'tali@test.com', role: 'student', joined: '2026-02-02', status: 'active' },
  { id: 10, name: 'הילה כץ', email: 'hila@test.com', role: 'moms', joined: '2026-02-05', status: 'blocked' },
  { id: 11, name: 'ענת שפיר', email: 'anat@test.com', role: 'student', joined: '2026-02-08', status: 'active' },
  { id: 12, name: 'מורן דוד', email: 'moran@test.com', role: 'moms', joined: '2026-02-11', status: 'active' },
  { id: 13, name: 'אורן לב', email: 'oren@test.com', role: 'student', joined: '2026-02-14', status: 'active' },
  { id: 14, name: 'רוני שלום', email: 'roni@test.com', role: 'moms', joined: '2026-02-18', status: 'active' },
  { id: 15, name: 'נטע אלון', email: 'neta@test.com', role: 'student', joined: '2026-02-21', status: 'active' },
];

const ROLE_LABELS = { moms: 'מטופלת', student: 'סטודנטית', admin: 'מנהלת' };
const ROLE_BADGES = { moms: 'badge-rose', student: 'badge-sage', admin: 'badge-admin' };

export default function UsersTable() {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [confirmDelete, setConfirmDelete] = useState(null);

  const filtered = users.filter(u => {
    const matchesSearch = u.name.includes(search) || u.email.includes(search);
    const matchesFilter = filter === 'all' || u.role === filter;
    return matchesSearch && matchesFilter;
  });

  const toggleBlock = (id) => {
    setUsers(prev => prev.map(u =>
      u.id === id ? { ...u, status: u.status === 'blocked' ? 'active' : 'blocked' } : u
    ));
  };

  const changeRole = (id) => {
    setUsers(prev => prev.map(u =>
      u.id === id ? { ...u, role: u.role === 'moms' ? 'student' : 'moms' } : u
    ));
  };

  const deleteUser = (id) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    setConfirmDelete(null);
  };

  const tabs = [
    { id: 'all', label: `כולם (${users.length})` },
    { id: 'moms', label: `מטופלות (${users.filter(u => u.role === 'moms').length})` },
    { id: 'student', label: `סטודנטיות (${users.filter(u => u.role === 'student').length})` },
  ];

  return (
    <div style={{ direction: 'rtl' }}>
      <div className="page-header">
        <h1>👥 ניהול משתמשים</h1>
        <span className="badge badge-sage" style={{ fontSize: '0.9rem' }}>{filtered.length} משתמשים</span>
      </div>

      {/* Search + Filter */}
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

      <div className="tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn${filter === tab.id ? ' active' : ''}`}
            onClick={() => setFilter(tab.id)}
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
            {filtered.map(u => (
              <tr key={u.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                      background: 'var(--color-sage-ultra)',
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
                  <span className={`badge ${ROLE_BADGES[u.role]}`}>{ROLE_LABELS[u.role]}</span>
                </td>
                <td style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                  {new Date(u.joined).toLocaleDateString('he-IL')}
                </td>
                <td>
                  <span className={`badge ${u.status === 'active' ? 'badge-success' : 'badge-danger'}`}>
                    {u.status === 'active' ? 'פעיל' : 'חסום'}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button
                      className="btn btn-sm btn-ghost"
                      onClick={() => toggleBlock(u.id)}
                      style={{ fontSize: '0.75rem', color: u.status === 'active' ? 'var(--color-danger)' : 'var(--color-sage)' }}
                    >
                      {u.status === 'active' ? 'חסום' : 'בטל חסימה'}
                    </button>
                    <button
                      className="btn btn-sm btn-ghost"
                      onClick={() => changeRole(u.id)}
                      style={{ fontSize: '0.75rem' }}
                    >
                      שנה תפקיד
                    </button>
                    <button
                      className="btn btn-sm btn-ghost"
                      onClick={() => setConfirmDelete(u.id)}
                      style={{ fontSize: '0.75rem', color: 'var(--color-danger)' }}
                    >
                      מחק
                    </button>
                  </div>
                </td>
              </tr>
            ))}
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
                onClick={() => deleteUser(confirmDelete)}
                style={{ flex: 1, background: 'var(--color-danger)', color: 'white', border: 'none' }}
              >
                מחק
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
