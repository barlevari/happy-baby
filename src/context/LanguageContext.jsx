import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext(null);

export const TRANSLATIONS = {
  he: {
    // NavBar
    home: 'בית',
    videos: 'סרטונים',
    nutrition: 'תזונה',
    mental: 'הכנה מנטלית',
    settings: 'הגדרות',
    about: 'אודות',
    syllabus: 'סילבוס',
    library: 'ספרייה',
    practice: 'תרגול',
    events: 'אירועים',
    dashboard: 'לוח בקרה',
    users: 'משתמשים',
    analytics: 'אנליטיקס',
    logout: 'יציאה',
    back: 'חזרה',
    // Settings
    settingsTitle: '⚙️ הגדרות',
    language: 'שפה',
    languageLabel: 'שפת ממשק',
    hebrew: 'עברית',
    english: 'English',
    profile: '👤 פרופיל',
    fullName: 'שם מלא',
    email: 'אימייל',
    idNumber: 'תעודת זהות',
    role: 'תפקיד',
    notifications: '🔔 הודעות ועדכונים',
    weeklyTip: 'טיפ שבועי',
    eventsUpdates: 'עדכוני אירועים',
    testReminders: 'תזכורות בדיקות',
    newsletter: 'ניוזלטר',
    changePassword: '🔐 שינוי סיסמה',
    currentPassword: 'סיסמה נוכחית',
    newPassword: 'סיסמה חדשה',
    confirmPassword: 'אימות סיסמה חדשה',
    savePassword: 'שמור סיסמה',
    aiChat: '🤖 צ\'אט AI',
    aiChatNav: 'צ\'אט',
  },
  en: {
    // NavBar
    home: 'Home',
    videos: 'Videos',
    nutrition: 'Nutrition',
    mental: 'Mental Prep',
    settings: 'Settings',
    about: 'About',
    syllabus: 'Syllabus',
    library: 'Library',
    practice: 'Practice',
    events: 'Events',
    dashboard: 'Dashboard',
    users: 'Users',
    analytics: 'Analytics',
    logout: 'Logout',
    back: 'Back',
    // Settings
    settingsTitle: '⚙️ Settings',
    language: 'Language',
    languageLabel: 'Interface Language',
    hebrew: 'עברית',
    english: 'English',
    profile: '👤 Profile',
    fullName: 'Full Name',
    email: 'Email',
    idNumber: 'ID Number',
    role: 'Role',
    notifications: '🔔 Notifications',
    weeklyTip: 'Weekly Tip',
    eventsUpdates: 'Event Updates',
    testReminders: 'Test Reminders',
    newsletter: 'Newsletter',
    changePassword: '🔐 Change Password',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    confirmPassword: 'Confirm New Password',
    savePassword: 'Save Password',
    aiChat: '🤖 AI Chat',
    aiChatNav: 'Chat',
  },
};

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try { return localStorage.getItem('hb_lang') || 'he'; } catch { return 'he'; }
  });

  useEffect(() => {
    const dir = lang === 'en' ? 'ltr' : 'rtl';
    const htmlLang = lang === 'he' ? 'he-u-ca-gregory-nu-latn' : 'en';
    document.documentElement.setAttribute('lang', htmlLang);
    document.documentElement.setAttribute('dir', dir);
  }, [lang]);

  const setLang = (l) => {
    localStorage.setItem('hb_lang', l);
    setLangState(l);
  };

  const t = (key) => TRANSLATIONS[lang]?.[key] ?? TRANSLATIONS['he'][key] ?? key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, isRTL: lang === 'he' }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
};

// Hook for per-page translations: each page defines its own { he: {...}, en: {...} }
export function usePageText(pageTexts) {
  const { lang } = useLanguage();
  return (key) => pageTexts[lang]?.[key] ?? pageTexts['he']?.[key] ?? key;
}
