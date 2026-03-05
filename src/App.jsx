import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

import NavBar from './components/NavBar';
import WhatsAppButton from './components/WhatsAppButton';
import AIChatWidget from './components/AIChatWidget';

// Eager-loaded pages (public / always needed)
import Landing from './pages/Landing';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Lazy-loaded pages (only loaded when visited)
const MomsDashboard = lazy(() => import('./pages/moms/MomsDashboard'));
const NutritionPage = lazy(() => import('./pages/moms/NutritionPage'));
const MentalPage = lazy(() => import('./pages/moms/MentalPage'));
const MomsVideosPage = lazy(() => import('./pages/moms/MomsVideosPage'));
const AcademyDashboard = lazy(() => import('./pages/academy/AcademyDashboard'));
const VideosPage = lazy(() => import('./pages/academy/VideosPage'));
const LibraryPage = lazy(() => import('./pages/academy/LibraryPage'));
const PracticePage = lazy(() => import('./pages/academy/PracticePage'));
const EventsPage = lazy(() => import('./pages/academy/EventsPage'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const UsersTable = lazy(() => import('./pages/admin/UsersTable'));
const VideoAnalytics = lazy(() => import('./pages/admin/VideoAnalytics'));
const AboutPage = lazy(() => import('./pages/shared/AboutPage'));
const Settings = lazy(() => import('./pages/shared/Settings'));
const ChatPage = lazy(() => import('./pages/shared/ChatPage'));
const PaymentSuccess = lazy(() => import('./pages/shared/PaymentSuccess'));
const PaymentCancel = lazy(() => import('./pages/shared/PaymentCancel'));

// Loading fallback
function PageLoader() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      minHeight: '60vh',
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🍼</div>
        <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>טוען...</div>
      </div>
    </div>
  );
}

function AppShell({ children }) {
  return (
    <div className="app-shell">
      <NavBar />
      <main className="main-content">
        <Suspense fallback={<PageLoader />}>
          {children}
        </Suspense>
      </main>
      <AIChatWidget />
    </div>
  );
}

function AboutWrapper() {
  const { user } = useAuth();
  if (user) {
    return <AppShell><AboutPage /><WhatsAppButton /></AppShell>;
  }
  return <Suspense fallback={<PageLoader />}><AboutPage /><WhatsAppButton /></Suspense>;
}

function RoleRedirect() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === 'moms') return <Navigate to="/moms" replace />;
  if (user.role === 'student') return <Navigate to="/academy" replace />;
  if (user.role === 'admin') return <Navigate to="/admin" replace />;
  return <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about" element={<AboutWrapper />} />

      {/* Auto-redirect after login */}
      <Route path="/dashboard" element={<RoleRedirect />} />

      {/* Moms */}
      <Route path="/moms" element={
        <ProtectedRoute requiredRole="moms">
          <AppShell><MomsDashboard /></AppShell>
        </ProtectedRoute>
      } />
      <Route path="/moms/nutrition" element={
        <ProtectedRoute requiredRole="moms">
          <AppShell><NutritionPage /></AppShell>
        </ProtectedRoute>
      } />
      <Route path="/moms/mental" element={
        <ProtectedRoute requiredRole="moms">
          <AppShell><MentalPage /></AppShell>
        </ProtectedRoute>
      } />
      <Route path="/moms/videos" element={
        <ProtectedRoute requiredRole="moms">
          <AppShell><MomsVideosPage /></AppShell>
        </ProtectedRoute>
      } />

      {/* Academy */}
      <Route path="/academy" element={
        <ProtectedRoute requiredRole="student">
          <AppShell><AcademyDashboard /></AppShell>
        </ProtectedRoute>
      } />
      <Route path="/academy/videos" element={
        <ProtectedRoute requiredRole="student">
          <AppShell><VideosPage /></AppShell>
        </ProtectedRoute>
      } />
      <Route path="/academy/library" element={
        <ProtectedRoute requiredRole="student">
          <AppShell><LibraryPage /></AppShell>
        </ProtectedRoute>
      } />
      <Route path="/academy/practice" element={
        <ProtectedRoute requiredRole="student">
          <AppShell><PracticePage /></AppShell>
        </ProtectedRoute>
      } />
      <Route path="/academy/events" element={
        <ProtectedRoute requiredRole="student">
          <AppShell><EventsPage /></AppShell>
        </ProtectedRoute>
      } />

      {/* Admin */}
      <Route path="/admin" element={
        <ProtectedRoute requiredRole="admin">
          <AppShell><AdminDashboard /></AppShell>
        </ProtectedRoute>
      } />
      <Route path="/admin/users" element={
        <ProtectedRoute requiredRole="admin">
          <AppShell><UsersTable /></AppShell>
        </ProtectedRoute>
      } />
      <Route path="/admin/analytics" element={
        <ProtectedRoute requiredRole="admin">
          <AppShell><VideoAnalytics /></AppShell>
        </ProtectedRoute>
      } />

      {/* Shared Protected (always free) */}
      <Route path="/settings" element={
        <ProtectedRoute>
          <AppShell><Settings /></AppShell>
        </ProtectedRoute>
      } />
      <Route path="/chat" element={
        <ProtectedRoute>
          <AppShell><ChatPage /></AppShell>
        </ProtectedRoute>
      } />

      {/* Payment result pages */}
      <Route path="/payment/success" element={
        <ProtectedRoute>
          <Suspense fallback={<PageLoader />}><PaymentSuccess /></Suspense>
        </ProtectedRoute>
      } />
      <Route path="/payment/cancel" element={
        <ProtectedRoute>
          <Suspense fallback={<PageLoader />}><PaymentCancel /></Suspense>
        </ProtectedRoute>
      } />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
