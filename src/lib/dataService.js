// ============================================================
// Data Service – dual mode (mock / Supabase)
// When VITE_SUPABASE_URL is not set, falls back to mock data.
// ============================================================

import { supabase, isSupabaseConfigured } from './supabase';

// ── Video Progress ──────────────────────────────────────────

export async function getVideoProgress(userId) {
  if (!isSupabaseConfigured) {
    const stored = localStorage.getItem(`hb_video_progress_${userId}`);
    return stored ? JSON.parse(stored) : [];
  }
  const { data, error } = await supabase
    .from('video_progress')
    .select('*')
    .eq('user_id', userId);
  if (error) throw error;
  return data;
}

export async function saveVideoProgress(userId, videoId, seconds, completed) {
  if (!isSupabaseConfigured) {
    const key = `hb_video_progress_${userId}`;
    const stored = JSON.parse(localStorage.getItem(key) || '[]');
    const idx = stored.findIndex(p => p.video_id === videoId);
    const entry = { video_id: videoId, watched_seconds: seconds, completed, last_watched_at: new Date().toISOString() };
    if (idx >= 0) stored[idx] = { ...stored[idx], ...entry };
    else stored.push(entry);
    localStorage.setItem(key, JSON.stringify(stored));
    return entry;
  }
  const { data, error } = await supabase
    .from('video_progress')
    .upsert({
      user_id: userId,
      video_id: videoId,
      watched_seconds: seconds,
      completed,
      last_watched_at: new Date().toISOString(),
    }, { onConflict: 'user_id,video_id' })
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ── Health Metrics ──────────────────────────────────────────

export async function getHealthMetrics(userId) {
  if (!isSupabaseConfigured) {
    const stored = localStorage.getItem(`hb_health_${userId}`);
    return stored ? JSON.parse(stored) : [];
  }
  const { data, error } = await supabase
    .from('health_metrics')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: true });
  if (error) throw error;
  return data;
}

export async function saveHealthMetric(userId, metric) {
  if (!isSupabaseConfigured) {
    const key = `hb_health_${userId}`;
    const stored = JSON.parse(localStorage.getItem(key) || '[]');
    stored.push({ ...metric, id: Date.now(), created_at: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(stored));
    return metric;
  }
  const { data, error } = await supabase
    .from('health_metrics')
    .insert({ user_id: userId, ...metric })
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ── Test Tracking ───────────────────────────────────────────

export async function getTestTracking(userId) {
  if (!isSupabaseConfigured) {
    const stored = localStorage.getItem(`hb_tests_${userId}`);
    return stored ? JSON.parse(stored) : [];
  }
  const { data, error } = await supabase
    .from('test_tracking')
    .select('*')
    .eq('user_id', userId);
  if (error) throw error;
  return data;
}

export async function updateTestStatus(userId, testId, status, date) {
  if (!isSupabaseConfigured) {
    const key = `hb_tests_${userId}`;
    const stored = JSON.parse(localStorage.getItem(key) || '[]');
    const idx = stored.findIndex(t => t.test_id === testId);
    const entry = { test_id: testId, status, date };
    if (idx >= 0) stored[idx] = { ...stored[idx], ...entry };
    else stored.push(entry);
    localStorage.setItem(key, JSON.stringify(stored));
    return entry;
  }
  const { data, error } = await supabase
    .from('test_tracking')
    .upsert({
      user_id: userId,
      test_id: testId,
      status,
      date,
    }, { onConflict: 'user_id,test_id' })
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ── Chat Messages ───────────────────────────────────────────

export async function getChatHistory(userId) {
  if (!isSupabaseConfigured) {
    const stored = localStorage.getItem(`hb_chat_${userId}`);
    return stored ? JSON.parse(stored) : [];
  }
  const { data, error } = await supabase
    .from('chat_messages')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data;
}

export async function saveChatMessage(userId, role, content) {
  if (!isSupabaseConfigured) {
    const key = `hb_chat_${userId}`;
    const stored = JSON.parse(localStorage.getItem(key) || '[]');
    const msg = { role, content, created_at: new Date().toISOString() };
    stored.push(msg);
    localStorage.setItem(key, JSON.stringify(stored));
    return msg;
  }
  const { data, error } = await supabase
    .from('chat_messages')
    .insert({ user_id: userId, role, content })
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ── Admin: User Management ──────────────────────────────────

export async function getAllProfiles() {
  if (!isSupabaseConfigured) return null; // fall back to mock
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .neq('role', 'admin')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function updateProfileStatus(userId, status) {
  if (!isSupabaseConfigured) return null;
  const { error } = await supabase
    .from('profiles')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', userId);
  if (error) throw error;
}

export async function updateProfileRole(userId, role) {
  if (!isSupabaseConfigured) return null;
  const { error } = await supabase
    .from('profiles')
    .update({ role, updated_at: new Date().toISOString() })
    .eq('id', userId);
  if (error) throw error;
}
