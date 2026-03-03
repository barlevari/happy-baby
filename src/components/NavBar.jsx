import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const NAV_LINKS = {
  moms: [
    { to: '/moms', label: 'בית', icon: '🏠', end: true },
    { to: '/moms/videos', label: 'סרטונים', icon: '🎥' },
    { to: '/moms/nutrition', label: 'תזונה', icon: '🥗' },
    { to: '/moms/mental', label: 'הכנה מנטלית', icon: '🧘' },
    { to: '/settings', label: 'הגדרות', icon: '⚙️' },
    { to: '/about', label: 'אודות', icon: 'ℹ️' },
  ],
  student: [
    { to: '/academy', label: 'סילבוס', icon: '📋', end: true },
    { to: '/academy/videos', label: 'סרטונים', icon: '🎥' },
    { to: '/academy/library', label: 'ספרייה', icon: '📚' },
    { to: '/academy/practice', label: 'תרגול', icon: '✍️' },
    { to: '/academy/events', label: 'אירועים', icon: '📅' },
    { to: '/about', label: 'אודות', icon: 'ℹ️' },
  ],
  admin: [
    { to: '/admin', label: 'לוח בקרה', icon: '📊', end: true },
    { to: '/admin/users', label: 'משתמשים', icon: '👥' },
    { to: '/admin/analytics', label: 'אנליטיקס', icon: '📈' },
    { to: '/about', label: 'אודות', icon: 'ℹ️' },
  ],
};

const ROLE_LABELS = {
  moms: 'בהריון',
  student: 'סטודנטית',
  admin: 'מנהלת',
};

const ROLE_COLORS = {
  moms: { bg: 'var(--color-rose-light)', color: 'var(--color-rose-dark)' },
  student: { bg: 'var(--color-sage-ultra)', color: 'var(--color-sage-dark)' },
  admin: { bg: 'var(--color-admin-light)', color: 'var(--color-admin)' },
};

export default function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Root paths where back button should go to home (not back in history)
  const rootPaths = ['/moms', '/academy', '/admin'];
  const isRoot = rootPaths.includes(location.pathname);

  if (!user) return null;

  const links = NAV_LINKS[user.role] || [];
  const roleLabel = ROLE_LABELS[user.role];
  const roleColor = ROLE_COLORS[user.role];
  const initial = user.name?.charAt(0) || '?';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="sidebar" style={{ display: 'flex', flexDirection: 'column' }}>
        {/* Logo */}
        <div style={{
          padding: '24px 20px 16px',
          borderBottom: '1px solid var(--color-border)',
        }}>
          <img
            src="/happy-baby-logo.png"
            alt="happy baby"
            style={{ height: 48, objectFit: 'contain', mixBlendMode: 'multiply' }}
          />
        </div>

        {/* User Info */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <div style={{
            width: 42,
            height: 42,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--color-sage), var(--color-sage-dark))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 700,
            fontSize: '1.1rem',
            flexShrink: 0,
          }}>
            {initial}
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{
              fontWeight: 700,
              fontSize: '0.9rem',
              color: 'var(--color-text)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
              {user.name}
            </div>
            <span style={{
              display: 'inline-block',
              marginTop: 4,
              fontSize: '0.7rem',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '9999px',
              background: roleColor.bg,
              color: roleColor.color,
            }}>
              {roleLabel}
            </span>
          </div>
        </div>

        {/* Nav Links */}
        <nav style={{ flex: 1, padding: '12px 12px', overflowY: 'auto' }}>
          {links.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 12px',
                borderRadius: '10px',
                marginBottom: '4px',
                textDecoration: 'none',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.9rem',
                color: isActive ? 'var(--color-sage-dark)' : 'var(--color-text-muted)',
                background: isActive ? 'var(--color-sage-ultra)' : 'transparent',
                transition: 'all 0.2s',
              })}
            >
              <span style={{ fontSize: '1.1rem' }}>{link.icon}</span>
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Back button */}
        {!isRoot && (
          <div style={{ padding: '0 12px 8px' }}>
            <button
              onClick={() => navigate(-1)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 12px',
                borderRadius: '10px',
                border: 'none',
                background: 'var(--color-sage-ultra)',
                color: 'var(--color-sage-dark)',
                fontWeight: 700,
                fontSize: '0.875rem',
                cursor: 'pointer',
              }}
            >
              <span>→</span>
              <span>חזרה</span>
            </button>
          </div>
        )}

        {/* Logout */}
        <div style={{ padding: '12px', borderTop: '1px solid var(--color-border)' }}>
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 12px',
              borderRadius: '10px',
              border: 'none',
              background: 'transparent',
              color: 'var(--color-danger)',
              fontWeight: 600,
              fontSize: '0.875rem',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#FDEAEA'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <span>🚪</span>
            <span>יציאה</span>
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <style>{`
        @media (max-width: 768px) {
          .sidebar {
            flex-direction: row !important;
            align-items: center;
            justify-content: space-around;
            padding: 0 8px;
          }
          .sidebar-logo { display: none !important; }
          .sidebar-user { display: none !important; }
          .sidebar-nav {
            display: flex !important;
            flex-direction: row !important;
            flex: 1;
            justify-content: space-around;
            padding: 0 !important;
            overflow-x: auto;
          }
          .sidebar-nav a {
            flex-direction: column !important;
            font-size: 0.65rem !important;
            padding: 8px 4px !important;
            gap: 2px !important;
            min-width: 48px;
            text-align: center;
            justify-content: center;
          }
          .sidebar-logout { display: none !important; }
        }
      `}</style>
    </>
  );
}
