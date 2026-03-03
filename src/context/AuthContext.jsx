import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

export const ADMIN_SECRET = 'HAPPYBABY2025';

const SEED_USERS = [
  { id: 1, name: 'שרה לוי', email: 'sarah@test.com', password: 'test1234', role: 'moms', lmpDate: '2024-09-01', idNumber: '031234567', status: 'approved', joined: '2026-01-05' },
  { id: 2, name: 'מיכל כהן', email: 'michal@test.com', password: 'test1234', role: 'student', idNumber: '012345678', status: 'approved', joined: '2026-01-08' },
  { id: 3, name: 'מנהלת', email: 'admin@happybaby.com', password: 'admin1234', role: 'admin', idNumber: '000000018', status: 'approved', joined: '2026-01-01' },
  { id: 4, name: 'רחל אברהם', email: 'rachel@test.com', password: 'test1234', role: 'moms', idNumber: '025874561', status: 'pending', joined: '2026-02-20' },
  { id: 5, name: 'דנה ישראלי', email: 'dana@test.com', password: 'test1234', role: 'student', idNumber: '074125836', status: 'pending', joined: '2026-02-22' },
  { id: 6, name: 'נועה שמש', email: 'noa@test.com', password: 'test1234', role: 'moms', idNumber: '036985214', status: 'blocked', joined: '2026-01-18' },
];

function loadUsers() {
  try {
    const stored = localStorage.getItem('hb_users');
    return stored ? JSON.parse(stored) : [...SEED_USERS];
  } catch {
    return [...SEED_USERS];
  }
}

function saveUsers(users) {
  localStorage.setItem('hb_users', JSON.stringify(users));
}

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

  const [users, setUsers] = useState(() => loadUsers());

  const updateUsers = useCallback((updater) => {
    setUsers(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      saveUsers(next);
      return next;
    });
  }, []);

  const login = useCallback((email, password) => {
    const allUsers = loadUsers();
    const found = allUsers.find(u => u.email === email && u.password === password);
    if (!found) return { ok: false, error: 'אימייל או סיסמה שגויים' };
    if (found.status === 'pending') return { ok: false, pending: true, error: 'בקשתך ממתינה לאישור מנהל' };
    if (found.status === 'blocked') return { ok: false, error: 'חשבונך חסום. פני למנהל האתר' };
    const { password: _, ...safe } = found;
    setUser(safe);
    localStorage.setItem('hb_user', JSON.stringify(safe));
    return { ok: true, user: safe };
  }, []);

  const register = useCallback(({ name, email, password, role, lmpDate, idNumber, adminCode }) => {
    if (!validateIsraeliId(idNumber)) return { ok: false, error: 'מספר תעודת זהות לא תקין' };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return { ok: false, error: 'כתובת אימייל לא תקינה' };
    if (password.length < 8) return { ok: false, error: 'הסיסמה חייבת להכיל לפחות 8 תווים' };

    const allUsers = loadUsers();
    if (allUsers.find(u => u.email === email)) return { ok: false, error: 'כתובת האימייל כבר רשומה במערכת' };

    if (role === 'admin') {
      if ((adminCode || '').trim() !== ADMIN_SECRET) return { ok: false, error: 'קוד המנהל שגוי' };
    }

    const status = role === 'admin' ? 'approved' : 'pending';
    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      role,
      lmpDate: lmpDate || null,
      idNumber,
      status,
      joined: new Date().toISOString().split('T')[0],
    };

    const updated = [...allUsers, newUser];
    saveUsers(updated);
    setUsers(updated);

    if (role === 'admin') {
      const { password: _, ...safe } = newUser;
      setUser(safe);
      localStorage.setItem('hb_user', JSON.stringify(safe));
      return { ok: true, user: safe };
    }

    return { ok: true, pending: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('hb_user');
  }, []);

  const getAllUsers = useCallback(() => {
    return users.filter(u => u.role !== 'admin');
  }, [users]);

  const approveUser = useCallback((id) => {
    updateUsers(prev => prev.map(u => u.id === id ? { ...u, status: 'approved' } : u));
  }, [updateUsers]);

  const blockUser = useCallback((id) => {
    updateUsers(prev => prev.map(u => u.id === id ? { ...u, status: 'blocked' } : u));
  }, [updateUsers]);

  const unblockUser = useCallback((id) => {
    updateUsers(prev => prev.map(u => u.id === id ? { ...u, status: 'approved' } : u));
  }, [updateUsers]);

  const deleteUser = useCallback((id) => {
    updateUsers(prev => prev.filter(u => u.id !== id));
  }, [updateUsers]);

  const changeRole = useCallback((id, newRole) => {
    updateUsers(prev => prev.map(u => u.id === id ? { ...u, role: newRole } : u));
  }, [updateUsers]);

  const getCurrentWeek = useCallback(() => {
    if (!user?.lmpDate) return null;
    const diff = (new Date() - new Date(user.lmpDate)) / (1000 * 60 * 60 * 24 * 7);
    return Math.min(Math.max(Math.floor(diff), 1), 40);
  }, [user]);

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      getCurrentWeek,
      validateIsraeliId,
      getAllUsers,
      approveUser,
      blockUser,
      unblockUser,
      deleteUser,
      changeRole,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
