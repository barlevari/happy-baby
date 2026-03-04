import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage, usePageText } from '../../context/LanguageContext';

// ── Page-level translations ─────────────────────────────────
const PAGE_TEXT = {
  he: {
    // Role labels
    rolePatient: 'מטופלת',
    roleStudent: 'סטודנטית',
    roleAdmin: 'מנהלת',
    // Status labels
    statusApproved: 'פעיל',
    statusPending: 'ממתין לאישור',
    statusBlocked: 'חסום',
    // Page header
    pageTitle: '👥 ניהול משתמשים',
    pendingBadge: 'ממתינים לאישור',
    usersCount: 'משתמשים',
    // Pending banner
    pendingBannerPre: 'יש',
    pendingBannerPost: 'משתמשים שממתינים לאישור הרשמה',
    pendingBannerAction: 'לחץ/י כאן לצפייה ואישור',
    // Search
    searchPlaceholder: '🔍 חיפוש לפי שם או אימייל...',
    // Tabs
    tabAll: 'כולם',
    tabPending: 'ממתינים לאישור',
    tabPatients: 'מטופלות',
    tabStudents: 'סטודנטיות',
    tabBlocked: 'חסומים',
    // Table headers
    thName: 'שם',
    thEmail: 'אימייל',
    thRole: 'תפקיד',
    thJoinDate: 'תאריך הצטרפות',
    thStatus: 'סטטוס',
    thActions: 'פעולות',
    // Action buttons
    btnApprove: '✅ אשר/י',
    btnReject: '❌ דחה/י',
    btnBlock: '🚫 חסום/י',
    btnUnblock: '✅ בטל חסימה',
    btnDelete: '🗑️ מחק/י',
    // Empty state
    noUsersFound: 'לא נמצאו משתמשים',
    // Delete modal
    deleteTitle: 'מחיקת משתמש',
    deleteConfirm: 'האם את בטוחה שברצונך למחוק את המשתמש? פעולה זו אינה הפיכה.',
    deleteCancel: 'ביטול',
    deleteAction: 'מחק/י',
    // Role options in dropdown
    optionPatient: 'מטופלת',
    optionStudent: 'סטודנטית',
  },
  en: {
    // Role labels
    rolePatient: 'Patient',
    roleStudent: 'Student',
    roleAdmin: 'Admin',
    // Status labels
    statusApproved: 'Active',
    statusPending: 'Pending Approval',
    statusBlocked: 'Blocked',
    // Page header
    pageTitle: '👥 User Management',
    pendingBadge: 'pending approval',
    usersCount: 'users',
    // Pending banner
    pendingBannerPre: '',
    pendingBannerPost: 'users pending registration approval',
    pendingBannerAction: 'Click here to view and approve',
    // Search
    searchPlaceholder: '🔍 Search by name or email...',
    // Tabs
    tabAll: 'All',
    tabPending: 'Pending Approval',
    tabPatients: 'Patients',
    tabStudents: 'Students',
    tabBlocked: 'Blocked',
    // Table headers
    thName: 'Name',
    thEmail: 'Email',
    thRole: 'Role',
    thJoinDate: 'Join Date',
    thStatus: 'Status',
    thActions: 'Actions',
    // Action buttons
    btnApprove: '✅ Approve',
    btnReject: '❌ Reject',
    btnBlock: '🚫 Block',
    btnUnblock: '✅ Unblock',
    btnDelete: '🗑️ Delete',
    // Empty state
    noUsersFound: 'No users found',
    // Delete modal
    deleteTitle: 'Delete User',
    deleteConfirm: 'Are you sure you want to delete this user? This action cannot be undone.',
    deleteCancel: 'Cancel',
    deleteAction: 'Delete',
    // Role options in dropdown
    optionPatient: 'Patient',
    optionStudent: 'Student',
  },
};

function formatDate(d) {
  if (!d) return '—';
  const [y, m, day] = d.split('-');
  return `${day}/${m}/${y}`;
}

export default function UsersTable() {
  const { getAllUsers, approveUser, blockUser, unblockUser, deleteUser, changeRole } = useAuth();
  const pt = usePageText(PAGE_TEXT);
  const { isRTL } = useLanguage();
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

  const STATUS_CONFIG = {
    approved: { label: pt('statusApproved'), cls: 'badge-success' },
    pending:  { label: pt('statusPending'), cls: 'badge-warning' },
    blocked:  { label: pt('statusBlocked'), cls: 'badge-danger' },
  };

  const tabs = [
    { id: 'all', label: `${pt('tabAll')} (${allUsers.length})` },
    { id: 'pending', label: `${pt('tabPending')} (${pendingCount})`, highlight: pendingCount > 0 },
    { id: 'moms', label: `${pt('tabPatients')} (${allUsers.filter(u => u.role === 'moms').length})` },
    { id: 'student', label: `${pt('tabStudents')} (${allUsers.filter(u => u.role === 'student').length})` },
    { id: 'blocked', label: `${pt('tabBlocked')} (${allUsers.filter(u => u.status === 'blocked').length})` },
  ];

  return (
    <div style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      <div className="page-header">
        <h1>{pt('pageTitle')}</h1>
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
              ⚠️ {pendingCount} {pt('pendingBadge')}
            </span>
          )}
          <span className="badge badge-sage" style={{ fontSize: '0.9rem' }}>{filtered.length} {pt('usersCount')}</span>
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
            <strong style={{ color: '#B45309' }}>
              {isRTL
                ? `${pt('pendingBannerPre')} ${pendingCount} ${pt('pendingBannerPost')}`
                : `${pendingCount} ${pt('pendingBannerPost')}`}
            </strong>
            <div style={{ fontSize: '0.82rem', color: '#92400E' }}>{pt('pendingBannerAction')}</div>
          </div>
          <span style={{ marginRight: isRTL ? 'auto' : undefined, marginLeft: isRTL ? undefined : 'auto', color: '#B45309' }}>{isRTL ? '←' : '→'}</span>
        </div>
      )}

      {/* Search */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
        <input
          type="text"
          className="form-input"
          placeholder={pt('searchPlaceholder')}
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
              <th>{pt('thName')}</th>
              <th>{pt('thEmail')}</th>
              <th>{pt('thRole')}</th>
              <th>{pt('thJoinDate')}</th>
              <th>{pt('thStatus')}</th>
              <th>{pt('thActions')}</th>
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
                  <td style={{ color: 'var(--color-text-muted)', direction: 'ltr', textAlign: isRTL ? 'right' : 'left' }}>{u.email}</td>
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
                      <option value="moms">{pt('optionPatient')}</option>
                      <option value="student">{pt('optionStudent')}</option>
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
                            {pt('btnApprove')}
                          </button>
                          <button
                            className="btn btn-sm btn-ghost"
                            onClick={() => blockUser(u.id)}
                            style={{ fontSize: '0.75rem', color: 'var(--color-danger)' }}
                          >
                            {pt('btnReject')}
                          </button>
                        </>
                      )}
                      {u.status === 'approved' && (
                        <button
                          className="btn btn-sm btn-ghost"
                          onClick={() => blockUser(u.id)}
                          style={{ fontSize: '0.75rem', color: 'var(--color-danger)' }}
                        >
                          {pt('btnBlock')}
                        </button>
                      )}
                      {u.status === 'blocked' && (
                        <button
                          className="btn btn-sm btn-ghost"
                          onClick={() => unblockUser(u.id)}
                          style={{ fontSize: '0.75rem', color: 'var(--color-sage)' }}
                        >
                          {pt('btnUnblock')}
                        </button>
                      )}
                      <button
                        className="btn btn-sm btn-ghost"
                        onClick={() => setConfirmDelete(u.id)}
                        style={{ fontSize: '0.75rem', color: 'var(--color-danger)' }}
                      >
                        {pt('btnDelete')}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: 32, color: 'var(--color-text-muted)' }}>
                  {pt('noUsersFound')}
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
            <h2 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: 8 }}>{pt('deleteTitle')}</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: 24 }}>
              {pt('deleteConfirm')}
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn btn-ghost" onClick={() => setConfirmDelete(null)} style={{ flex: 1 }}>{pt('deleteCancel')}</button>
              <button
                className="btn"
                onClick={() => { deleteUser(confirmDelete); setConfirmDelete(null); }}
                style={{ flex: 1, background: 'var(--color-danger)', color: 'white', border: 'none' }}
              >
                {pt('deleteAction')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
