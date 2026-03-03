import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState({
    weeklyTip: true,
    events: true,
    testReminders: true,
    newsletter: false,
  });

  const [passwordForm, setPasswordForm] = useState({ current: '', next: '', confirm: '' });
  const [passwordMsg, setPasswordMsg] = useState('');
  const [lmpDate, setLmpDate] = useState(user?.lmpDate || '');
  const [trackRequestSent, setTrackRequestSent] = useState(false);
  const [lmpSaved, setLmpSaved] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwordForm.next.length < 8) {
      setPasswordMsg('error:הסיסמה החדשה חייבת להכיל לפחות 8 תווים');
      return;
    }
    if (passwordForm.next !== passwordForm.confirm) {
      setPasswordMsg('error:הסיסמאות אינן תואמות');
      return;
    }
    setPasswordMsg('success:הסיסמה עודכנה בהצלחה (סימולציה)');
    setPasswordForm({ current: '', next: '', confirm: '' });
  };

  const msgType = passwordMsg.startsWith('error:') ? 'danger' : 'success';
  const msgText = passwordMsg.replace(/^(error|success):/, '');

  const Toggle = ({ value, onChange }) => (
    <div
      onClick={() => onChange(!value)}
      style={{
        width: 44,
        height: 24,
        borderRadius: 12,
        background: value ? 'var(--color-sage)' : 'var(--color-border)',
        position: 'relative',
        cursor: 'pointer',
        transition: 'background 0.25s',
        flexShrink: 0,
      }}
    >
      <div style={{
        position: 'absolute',
        top: 2,
        right: value ? 2 : 20,
        width: 20,
        height: 20,
        borderRadius: '50%',
        background: 'white',
        boxShadow: 'var(--shadow-sm)',
        transition: 'right 0.25s',
      }} />
    </div>
  );

  const Section = ({ title, children }) => (
    <div className="card" style={{ marginBottom: 20 }}>
      <h2 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid var(--color-border)' }}>
        {title}
      </h2>
      {children}
    </div>
  );

  const Row = ({ label, value, muted }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--color-border)' }}>
      <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>{label}</span>
      <span style={{ color: muted ? 'var(--color-text-muted)' : 'var(--color-text)', fontSize: '0.875rem' }}>{value}</span>
    </div>
  );

  return (
    <div style={{ direction: 'rtl', maxWidth: 600 }}>
      <div className="page-header">
        <h1>⚙️ הגדרות</h1>
      </div>

      {/* Profile Section */}
      <Section title="👤 פרופיל">
        <Row label="שם מלא" value={user?.name} />
        <Row label="אימייל" value={user?.email} muted />
        <Row label="תעודת זהות" value={`${user?.idNumber?.slice(0, 3)}XXXXXX`} muted />
        <Row label="תפקיד" value={user?.role === 'moms' ? 'מטופלת' : user?.role === 'student' ? 'סטודנטית' : 'מנהלת'} muted />
      </Section>

      {/* LMP Update (Moms only) */}
      {user?.role === 'moms' && (
        <Section title="🤰 נתוני הריון">
          <div className="form-group">
            <label className="form-label">תאריך הווסת האחרון (LMP)</label>
            <input
              type="date"
              lang="en"
              className="form-input"
              value={lmpDate}
              onChange={e => { setLmpDate(e.target.value); setLmpSaved(false); }}
              dir="ltr"
            />
          </div>
          {lmpSaved && <div className="alert alert-success" style={{ marginBottom: 12 }}>✓ עודכן בהצלחה</div>}
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setLmpSaved(true)}
          >
            עדכן תאריך
          </button>
        </Section>
      )}

      {/* Notifications */}
      <Section title="🔔 הודעות ועדכונים">
        {[
          { key: 'weeklyTip', label: 'טיפ שבועי' },
          { key: 'events', label: 'עדכוני אירועים' },
          { key: 'testReminders', label: 'תזכורות בדיקות' },
          { key: 'newsletter', label: 'ניוזלטר' },
        ].map(item => (
          <div key={item.key} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 0',
            borderBottom: '1px solid var(--color-border)',
          }}>
            <span style={{ fontWeight: 500, fontSize: '0.875rem' }}>{item.label}</span>
            <Toggle
              value={notifications[item.key]}
              onChange={val => setNotifications(n => ({ ...n, [item.key]: val }))}
            />
          </div>
        ))}
      </Section>

      {/* Password Change */}
      <Section title="🔐 שינוי סיסמה">
        {passwordMsg && (
          <div className={`alert alert-${msgType}`} style={{ marginBottom: 12 }}>
            {msgType === 'success' ? '✓ ' : '⚠️ '}{msgText}
          </div>
        )}
        <form onSubmit={handlePasswordChange}>
          <div className="form-group">
            <label className="form-label">סיסמה נוכחית</label>
            <input type="password" className="form-input" value={passwordForm.current} onChange={e => setPasswordForm(f => ({ ...f, current: e.target.value }))} dir="ltr" />
          </div>
          <div className="form-group">
            <label className="form-label">סיסמה חדשה</label>
            <input type="password" className="form-input" value={passwordForm.next} onChange={e => setPasswordForm(f => ({ ...f, next: e.target.value }))} dir="ltr" />
          </div>
          <div className="form-group">
            <label className="form-label">אימות סיסמה חדשה</label>
            <input type="password" className="form-input" value={passwordForm.confirm} onChange={e => setPasswordForm(f => ({ ...f, confirm: e.target.value }))} dir="ltr" />
          </div>
          <button type="submit" className="btn btn-secondary btn-sm">שמור סיסמה</button>
        </form>
      </Section>

      {/* Track Switch */}
      {user?.role !== 'admin' && (
        <Section title="🔄 שינוי מסלול">
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: 12 }}>
            רוצה לעבור בין מסלול מטופלות לסטודנטיות? שלחי בקשה למנהלת.
          </p>
          {trackRequestSent ? (
            <div className="alert alert-success">✓ הבקשה נשלחה! המנהלת תצור איתך קשר בקרוב.</div>
          ) : (
            <button className="btn btn-secondary btn-sm" onClick={() => setTrackRequestSent(true)}>
              בקשה למעבר מסלול
            </button>
          )}
        </Section>
      )}

      {/* Account */}
      <Section title="🚪 חשבון">
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: 16 }}>
          יציאה מהמערכת תנתק אותך מהחשבון הנוכחי
        </p>
        <button
          className="btn"
          onClick={handleLogout}
          style={{ background: 'var(--color-danger)', color: 'white', border: 'none' }}
        >
          🚪 יציאה מהמערכת
        </button>
      </Section>
    </div>
  );
}
