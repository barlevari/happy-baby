import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage, usePageText } from '../../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

const PAGE_TEXT = {
  he: {
    pageTitle: '⚙️ הגדרות',
    language: '🌐 שפה',
    profile: '👤 פרופיל',
    fullName: 'שם מלא',
    email: 'אימייל',
    idNumber: 'תעודת זהות',
    role: 'תפקיד',
    roleMoms: 'מטופלת',
    roleStudent: 'סטודנטית',
    roleAdmin: 'מנהלת',
    pregnancyData: '🤰 נתוני הריון',
    lmpLabel: 'תאריך הווסת האחרון (LMP)',
    lmpSaved: '✓ עודכן בהצלחה',
    updateDate: 'עדכן תאריך',
    notifications: '🔔 הודעות ועדכונים',
    weeklyTip: 'טיפ שבועי',
    eventUpdates: 'עדכוני אירועים',
    testReminders: 'תזכורות בדיקות',
    newsletter: 'ניוזלטר',
    changePassword: '🔐 שינוי סיסמה',
    currentPassword: 'סיסמה נוכחית',
    newPassword: 'סיסמה חדשה',
    confirmPassword: 'אימות סיסמה חדשה',
    savePassword: 'שמור סיסמה',
    errPasswordShort: 'הסיסמה החדשה חייבת להכיל לפחות 8 תווים',
    errPasswordMatch: 'הסיסמאות אינן תואמות',
    passwordSuccess: 'הסיסמה עודכנה בהצלחה (סימולציה)',
    switchTrack: '🔄 שינוי מסלול',
    switchTrackDesc: 'רוצה לעבור בין מסלול מטופלות לסטודנטיות? שלחי בקשה למנהלת.',
    switchTrackSent: '✓ הבקשה נשלחה! המנהלת תצור איתך קשר בקרוב.',
    switchTrackBtn: 'בקשה למעבר מסלול',
    account: '🚪 חשבון',
    accountDesc: 'יציאה מהמערכת תנתק אותך מהחשבון הנוכחי',
    logout: '🚪 יציאה מהמערכת',
  },
  en: {
    pageTitle: '⚙️ Settings',
    language: '🌐 Language',
    profile: '👤 Profile',
    fullName: 'Full Name',
    email: 'Email',
    idNumber: 'ID Number',
    role: 'Role',
    roleMoms: 'Patient',
    roleStudent: 'Student',
    roleAdmin: 'Admin',
    pregnancyData: '🤰 Pregnancy Data',
    lmpLabel: 'Last Menstrual Period (LMP)',
    lmpSaved: '✓ Updated successfully',
    updateDate: 'Update Date',
    notifications: '🔔 Notifications',
    weeklyTip: 'Weekly Tip',
    eventUpdates: 'Event Updates',
    testReminders: 'Test Reminders',
    newsletter: 'Newsletter',
    changePassword: '🔐 Change Password',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    confirmPassword: 'Confirm New Password',
    savePassword: 'Save Password',
    errPasswordShort: 'New password must be at least 8 characters',
    errPasswordMatch: 'Passwords do not match',
    passwordSuccess: 'Password updated successfully (simulation)',
    switchTrack: '🔄 Switch Track',
    switchTrackDesc: 'Want to switch between patient and student tracks? Send a request to admin.',
    switchTrackSent: '✓ Request sent! The admin will contact you soon.',
    switchTrackBtn: 'Request Track Switch',
    account: '🚪 Account',
    accountDesc: 'Logging out will disconnect you from the current account',
    logout: '🚪 Logout',
  },
};

export default function Settings() {
  const { user, logout } = useAuth();
  const { lang, setLang, isRTL } = useLanguage();
  const pt = usePageText(PAGE_TEXT);
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
      setPasswordMsg('error:' + pt('errPasswordShort'));
      return;
    }
    if (passwordForm.next !== passwordForm.confirm) {
      setPasswordMsg('error:' + pt('errPasswordMatch'));
      return;
    }
    setPasswordMsg('success:' + pt('passwordSuccess'));
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

  const getRoleLabel = (role) => {
    if (role === 'moms') return pt('roleMoms');
    if (role === 'student') return pt('roleStudent');
    return pt('roleAdmin');
  };

  return (
    <div style={{ direction: isRTL ? 'rtl' : 'ltr', maxWidth: 600 }}>
      <div className="page-header">
        <h1>{pt('pageTitle')}</h1>
      </div>

      {/* Language Section */}
      <Section title={pt('language')}>
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            className={`btn btn-sm ${lang === 'he' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setLang('he')}
          >
            🇮🇱 עברית
          </button>
          <button
            className={`btn btn-sm ${lang === 'en' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setLang('en')}
          >
            🇺🇸 English
          </button>
        </div>
      </Section>

      {/* Profile Section */}
      <Section title={pt('profile')}>
        <Row label={pt('fullName')} value={user?.name} />
        <Row label={pt('email')} value={user?.email} muted />
        <Row label={pt('idNumber')} value={`${user?.idNumber?.slice(0, 3)}XXXXXX`} muted />
        <Row label={pt('role')} value={getRoleLabel(user?.role)} muted />
      </Section>

      {/* LMP Update (Moms only) */}
      {user?.role === 'moms' && (
        <Section title={pt('pregnancyData')}>
          <div className="form-group">
            <label className="form-label">{pt('lmpLabel')}</label>
            <input
              type="date"
              lang="en-US"
              className="form-input"
              value={lmpDate}
              onChange={e => { setLmpDate(e.target.value); setLmpSaved(false); }}
              dir="ltr"
            />
          </div>
          {lmpSaved && <div className="alert alert-success" style={{ marginBottom: 12 }}>{pt('lmpSaved')}</div>}
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setLmpSaved(true)}
          >
            {pt('updateDate')}
          </button>
        </Section>
      )}

      {/* Notifications */}
      <Section title={pt('notifications')}>
        {[
          { key: 'weeklyTip', label: pt('weeklyTip') },
          { key: 'events', label: pt('eventUpdates') },
          { key: 'testReminders', label: pt('testReminders') },
          { key: 'newsletter', label: pt('newsletter') },
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
      <Section title={pt('changePassword')}>
        {passwordMsg && (
          <div className={`alert alert-${msgType}`} style={{ marginBottom: 12 }}>
            {msgType === 'success' ? '✓ ' : '⚠️ '}{msgText}
          </div>
        )}
        <form onSubmit={handlePasswordChange}>
          <div className="form-group">
            <label className="form-label">{pt('currentPassword')}</label>
            <input type="password" className="form-input" value={passwordForm.current} onChange={e => setPasswordForm(f => ({ ...f, current: e.target.value }))} dir="ltr" />
          </div>
          <div className="form-group">
            <label className="form-label">{pt('newPassword')}</label>
            <input type="password" className="form-input" value={passwordForm.next} onChange={e => setPasswordForm(f => ({ ...f, next: e.target.value }))} dir="ltr" />
          </div>
          <div className="form-group">
            <label className="form-label">{pt('confirmPassword')}</label>
            <input type="password" className="form-input" value={passwordForm.confirm} onChange={e => setPasswordForm(f => ({ ...f, confirm: e.target.value }))} dir="ltr" />
          </div>
          <button type="submit" className="btn btn-secondary btn-sm">{pt('savePassword')}</button>
        </form>
      </Section>

      {/* Track Switch */}
      {user?.role !== 'admin' && (
        <Section title={pt('switchTrack')}>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: 12 }}>
            {pt('switchTrackDesc')}
          </p>
          {trackRequestSent ? (
            <div className="alert alert-success">{pt('switchTrackSent')}</div>
          ) : (
            <button className="btn btn-secondary btn-sm" onClick={() => setTrackRequestSent(true)}>
              {pt('switchTrackBtn')}
            </button>
          )}
        </Section>
      )}

      {/* Account */}
      <Section title={pt('account')}>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: 16 }}>
          {pt('accountDesc')}
        </p>
        <button
          className="btn"
          onClick={handleLogout}
          style={{ background: 'var(--color-danger)', color: 'white', border: 'none' }}
        >
          {pt('logout')}
        </button>
      </Section>
    </div>
  );
}
