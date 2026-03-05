import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const AuthContext = createContext(null);

export const ADMIN_SECRET = 'HAPPYBABY2025';

// ── Mock mode helpers (used when Supabase is not configured) ──

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

// ── Shared utilities ──

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

// ── Provider ──

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(() => loadUsers());
  const [authLoading, setAuthLoading] = useState(true);

  // ── Initialize auth state ──
  useEffect(() => {
    if (isSupabaseConfigured) {
      // Supabase mode: listen for auth changes
      supabase.auth.getSession().then(async ({ data: { session } }) => {
        if (session?.user) {
          const profile = await fetchProfile(session.user.id);
          setUser(profile);
        }
        setAuthLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (event === 'SIGNED_IN' && session?.user) {
            const profile = await fetchProfile(session.user.id);
            setUser(profile);
          } else if (event === 'SIGNED_OUT') {
            setUser(null);
          }
        }
      );

      return () => subscription.unsubscribe();
    } else {
      // Mock mode: restore from localStorage
      try {
        const stored = JSON.parse(localStorage.getItem('hb_user'));
        setUser(stored || null);
      } catch {
        setUser(null);
      }
      setAuthLoading(false);
    }
  }, []);

  // ── Supabase helpers ──

  async function fetchProfile(userId) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    if (error || !data) return null;
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
      idNumber: data.id_number,
      lmpDate: data.lmp_date,
      status: data.status,
      subscriptionStatus: data.subscription_status,
      joined: data.created_at?.split('T')[0],
    };
  }

  // ── Mock mode helpers ──

  const updateUsers = useCallback((updater) => {
    setUsers(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      saveUsers(next);
      return next;
    });
  }, []);

  // ── Login ──

  const login = useCallback(async (email, password) => {
    if (isSupabaseConfigured) {
      setAuthLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setAuthLoading(false);
        return { ok: false, error: error.message === 'Invalid login credentials'
          ? 'אימייל או סיסמה שגויים'
          : error.message };
      }
      const profile = await fetchProfile(data.user.id);
      if (!profile) {
        setAuthLoading(false);
        return { ok: false, error: 'לא נמצא פרופיל למשתמש' };
      }
      if (profile.status === 'pending') {
        await supabase.auth.signOut();
        setAuthLoading(false);
        return { ok: false, pending: true, error: 'בקשתך ממתינה לאישור מנהל' };
      }
      if (profile.status === 'blocked') {
        await supabase.auth.signOut();
        setAuthLoading(false);
        return { ok: false, error: 'חשבונך חסום. פני למנהל האתר' };
      }
      setUser(profile);
      setAuthLoading(false);
      return { ok: true, user: profile };
    }

    // Mock mode
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

  // ── Register ──

  const register = useCallback(async ({ name, email, password, role, lmpDate, idNumber, adminCode }) => {
    if (!validateIsraeliId(idNumber)) return { ok: false, error: 'מספר תעודת זהות לא תקין' };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return { ok: false, error: 'כתובת אימייל לא תקינה' };
    if (password.length < 8) return { ok: false, error: 'הסיסמה חייבת להכיל לפחות 8 תווים' };

    if (role === 'admin') {
      if ((adminCode || '').trim() !== ADMIN_SECRET) return { ok: false, error: 'קוד המנהל שגוי' };
    }

    if (isSupabaseConfigured) {
      setAuthLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role,
            id_number: idNumber,
            lmp_date: lmpDate || null,
          },
        },
      });
      setAuthLoading(false);
      if (error) {
        if (error.message.includes('already registered')) {
          return { ok: false, error: 'כתובת האימייל כבר רשומה במערכת' };
        }
        return { ok: false, error: error.message };
      }

      if (role === 'admin') {
        const profile = await fetchProfile(data.user.id);
        setUser(profile);
        return { ok: true, user: profile };
      }
      return { ok: true, pending: true };
    }

    // Mock mode
    const allUsers = loadUsers();
    if (allUsers.find(u => u.email === email)) return { ok: false, error: 'כתובת האימייל כבר רשומה במערכת' };

    const status = role === 'admin' ? 'approved' : 'pending';
    const newUser = {
      id: Date.now(),
      name, email, password, role,
      lmpDate: lmpDate || null,
      idNumber, status,
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

  // ── Logout ──

  const logout = useCallback(async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    setUser(null);
    localStorage.removeItem('hb_user');
  }, []);

  // ── Password Reset (Supabase only) ──

  const resetPassword = useCallback(async (email) => {
    if (!isSupabaseConfigured) {
      return { ok: false, error: 'איפוס סיסמה זמין רק במצב Supabase' };
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  }, []);

  // ── Admin actions ──

  const getAllUsers = useCallback(() => {
    if (isSupabaseConfigured) {
      // In Supabase mode this is async, but we keep the sync API for mock.
      // Components should migrate to use the async dataService.getAllProfiles() instead.
      return users.filter(u => u.role !== 'admin');
    }
    return users.filter(u => u.role !== 'admin');
  }, [users]);

  const approveUser = useCallback(async (id) => {
    if (isSupabaseConfigured) {
      await supabase.from('profiles').update({ status: 'approved', updated_at: new Date().toISOString() }).eq('id', id);
      return;
    }
    updateUsers(prev => prev.map(u => u.id === id ? { ...u, status: 'approved' } : u));
  }, [updateUsers]);

  const blockUser = useCallback(async (id) => {
    if (isSupabaseConfigured) {
      await supabase.from('profiles').update({ status: 'blocked', updated_at: new Date().toISOString() }).eq('id', id);
      return;
    }
    updateUsers(prev => prev.map(u => u.id === id ? { ...u, status: 'blocked' } : u));
  }, [updateUsers]);

  const unblockUser = useCallback(async (id) => {
    if (isSupabaseConfigured) {
      await supabase.from('profiles').update({ status: 'approved', updated_at: new Date().toISOString() }).eq('id', id);
      return;
    }
    updateUsers(prev => prev.map(u => u.id === id ? { ...u, status: 'approved' } : u));
  }, [updateUsers]);

  const deleteUser = useCallback(async (id) => {
    if (isSupabaseConfigured) {
      await supabase.from('profiles').delete().eq('id', id);
      return;
    }
    updateUsers(prev => prev.filter(u => u.id !== id));
  }, [updateUsers]);

  const changeRole = useCallback(async (id, newRole) => {
    if (isSupabaseConfigured) {
      await supabase.from('profiles').update({ role: newRole, updated_at: new Date().toISOString() }).eq('id', id);
      return;
    }
    updateUsers(prev => prev.map(u => u.id === id ? { ...u, role: newRole } : u));
  }, [updateUsers]);

  // ── Pregnancy week calculator ──

  const getCurrentWeek = useCallback(() => {
    if (!user?.lmpDate) return null;
    const diff = (new Date() - new Date(user.lmpDate)) / (1000 * 60 * 60 * 24 * 7);
    return Math.min(Math.max(Math.floor(diff), 1), 40);
  }, [user]);

  return (
    <AuthContext.Provider value={{
      user,
      authLoading,
      isSupabaseMode: isSupabaseConfigured,
      login,
      register,
      logout,
      resetPassword,
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
