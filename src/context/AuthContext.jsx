import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const AuthContext = createContext(null);

// Admin secret loaded from env var — never hardcode in client code
const ADMIN_SECRET = import.meta.env.VITE_ADMIN_SECRET || '';

// ── Mock mode helpers (used when Supabase is not configured) ──

// Simple hash for mock passwords — NOT cryptographically secure, just avoids plaintext in bundle
async function hashPassword(pw) {
  const encoded = new TextEncoder().encode(pw);
  const buf = await crypto.subtle.digest('SHA-256', encoded);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function checkPassword(pw, hash) {
  return (await hashPassword(pw)) === hash;
}

// Pre-hashed passwords (SHA-256): test1234 and admin1234
const H_TEST = '937e8d5fbb48bd4949536cd65b8d35c426b80d2f830c5c308e2cdec422ae2244'; // test1234
const H_ADMIN = 'ac9689e2272427085e35b9d3e3e8bed88cb3434828b43b86fc0596cad4c6e270'; // admin1234

const SEED_USERS = [
  { id: 1, name: 'שרה לוי', email: 'sarah@test.com', passwordHash: H_TEST, role: 'moms', lmpDate: '2024-09-01', idNumber: '031234567', status: 'approved', joined: '2026-01-05' },
  { id: 2, name: 'מיכל כהן', email: 'michal@test.com', passwordHash: H_TEST, role: 'student', idNumber: '012345678', status: 'approved', joined: '2026-01-08' },
  { id: 3, name: 'מנהלת', email: 'admin@happybaby.com', passwordHash: H_ADMIN, role: 'admin', idNumber: '000000018', status: 'approved', joined: '2026-01-01' },
  { id: 4, name: 'רחל אברהם', email: 'rachel@test.com', passwordHash: H_TEST, role: 'moms', idNumber: '025874561', status: 'pending', joined: '2026-02-20' },
  { id: 5, name: 'דנה ישראלי', email: 'dana@test.com', passwordHash: H_TEST, role: 'student', idNumber: '074125836', status: 'pending', joined: '2026-02-22' },
  { id: 6, name: 'נועה שמש', email: 'noa@test.com', passwordHash: H_TEST, role: 'moms', idNumber: '036985214', status: 'blocked', joined: '2026-01-18' },
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
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch(
        `${supabaseUrl}/rest/v1/profiles?id=eq.${userId}&select=*`,
        {
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${session?.access_token || supabaseKey}`,
          },
        }
      );
      if (!res.ok) return null;
      const rows = await res.json();
      if (!rows.length) return null;
      const data = rows[0];
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
    } catch {
      return null;
    }
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

    // Mock mode — compare hashed password
    const allUsers = loadUsers();
    const found = allUsers.find(u => u.email === email);
    if (!found) return { ok: false, error: 'אימייל או סיסמה שגויים' };
    const pwMatch = await checkPassword(password, found.passwordHash);
    if (!pwMatch) return { ok: false, error: 'אימייל או סיסמה שגויים' };
    if (found.status === 'pending') return { ok: false, pending: true, error: 'בקשתך ממתינה לאישור מנהל' };
    if (found.status === 'blocked') return { ok: false, error: 'חשבונך חסום. פני למנהל האתר' };
    const { passwordHash: _, ...safe } = found;
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

      // Step 1: Create auth user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name, role, id_number: idNumber, lmp_date: lmpDate || null },
        },
      });
      if (error) {
        setAuthLoading(false);
        if (error.message.includes('already registered')) {
          return { ok: false, error: 'כתובת האימייל כבר רשומה במערכת' };
        }
        return { ok: false, error: error.message };
      }

      const userId = data?.user?.id;
      if (!userId) {
        setAuthLoading(false);
        return { ok: false, error: 'שגיאה ביצירת המשתמש' };
      }

      // Step 2: Ensure we have a valid session (signUp may not return one)
      if (!data.session) {
        const { error: signInErr } = await supabase.auth.signInWithPassword({ email, password });
        if (signInErr) {
          console.error('Post-signup sign-in failed:', signInErr);
        }
      }

      // Step 3: Create profile via direct REST call
      // (Supabase JS client's .upsert() hangs in some environments)
      const adminStatus = role === 'admin' ? 'approved' : 'pending';
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
        const res = await fetch(`${supabaseUrl}/rest/v1/profiles`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseKey,
            'Authorization': `Bearer ${currentSession?.access_token || supabaseKey}`,
            'Prefer': 'resolution=merge-duplicates',
          },
          body: JSON.stringify({
            id: userId, name, email, role,
            id_number: idNumber,
            lmp_date: lmpDate || null,
            status: adminStatus,
          }),
        });
        if (!res.ok) {
          const errText = await res.text();
          console.error('Profile creation error:', res.status, errText);
        }
      } catch (e) {
        console.error('Profile creation failed:', e.message);
      }

      if (role === 'admin') {
        const profile = await fetchProfile(userId);
        setUser(profile);
        setAuthLoading(false);
        return { ok: true, user: profile };
      }

      setAuthLoading(false);
      return { ok: true, pending: true };
    }

    // Mock mode — hash the password before storing
    const allUsers = loadUsers();
    if (allUsers.find(u => u.email === email)) return { ok: false, error: 'כתובת האימייל כבר רשומה במערכת' };

    const status = role === 'admin' ? 'approved' : 'pending';
    const newUser = {
      id: Date.now(),
      name, email,
      passwordHash: await hashPassword(password),
      role,
      lmpDate: lmpDate || null,
      idNumber, status,
      joined: new Date().toISOString().split('T')[0],
    };

    const updated = [...allUsers, newUser];
    saveUsers(updated);
    setUsers(updated);

    if (role === 'admin') {
      const { passwordHash: _, ...safe } = newUser;
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
