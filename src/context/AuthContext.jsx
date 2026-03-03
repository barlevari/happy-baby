import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

const MOCK_USERS = [
  { id: 1, name: 'שרה לוי', email: 'sarah@test.com', password: 'test1234', role: 'moms', lmpDate: '2024-09-01', idNumber: '031234567' },
  { id: 2, name: 'מיכל כהן', email: 'michal@test.com', password: 'test1234', role: 'student', idNumber: '012345678' },
  { id: 3, name: 'מנהלת', email: 'admin@happybaby.com', password: 'admin1234', role: 'admin', idNumber: '000000018' },
];

function validateIsraeliId(id) {
  const str = String(id).padStart(9, '0');
  if (str.length !== 9) return false;
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    let c = Number(str[i]) * ((i % 2) + 1);
    if (c > 9) c -= 9;
    sum += c;
  }
  return sum % 10 === 0;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('hb_user')) || null; } catch { return null; }
  });

  const login = useCallback((email, password) => {
    const found = MOCK_USERS.find(u => u.email === email && u.password === password);
    if (!found) return { ok: false, error: 'אימייל או סיסמה שגויים' };
    const { password: _, ...safe } = found;
    setUser(safe);
    localStorage.setItem('hb_user', JSON.stringify(safe));
    return { ok: true, user: safe };
  }, []);

  const register = useCallback(({ name, email, password, role, lmpDate, idNumber }) => {
    if (!validateIsraeliId(idNumber)) return { ok: false, error: 'מספר תעודת זהות לא תקין' };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return { ok: false, error: 'כתובת אימייל לא תקינה' };
    if (password.length < 8) return { ok: false, error: 'הסיסמה חייבת להכיל לפחות 8 תווים' };
    const newUser = { id: Date.now(), name, email, role, lmpDate: lmpDate || null, idNumber };
    setUser(newUser);
    localStorage.setItem('hb_user', JSON.stringify(newUser));
    return { ok: true, user: newUser };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('hb_user');
  }, []);

  const getCurrentWeek = useCallback(() => {
    if (!user?.lmpDate) return null;
    const diff = (new Date() - new Date(user.lmpDate)) / (1000 * 60 * 60 * 24 * 7);
    return Math.min(Math.max(Math.floor(diff), 1), 40);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, getCurrentWeek, validateIsraeliId }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
