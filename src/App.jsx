import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import Paywall from './components/Paywall';
import NavBar from './components/NavBar';
import WhatsAppButton from './components/WhatsAppButton';
import AIChatWidget from './components/AIChatWidget';

// Pages
import Landing from './pages/Landing';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import MomsDashboard from './pages/moms/MomsDashboard';
import NutritionPage from './pages/moms/NutritionPage';
import MentalPage from './pages/moms/MentalPage';
import MomsVideosPage from './pages/moms/MomsVideosPage';
import AcademyDashboard from './pages/academy/AcademyDashboard';
import VideosPage from './pages/academy/VideosPage';
import LibraryPage from './pages/academy/LibraryPage';
import PracticePage from './pages/academy/PracticePage';
import EventsPage from './pages/academy/EventsPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import UsersTable from './pages/admin/UsersTable';
import VideoAnalytics from './pages/admin/VideoAnalytics';
import AboutPage from './pages/shared/AboutPage';
import Settings from './pages/shared/Settings';
import ChatPage from './pages/shared/ChatPage';

function AppShell({ children }) {
  return (
    <div className="app-shell">
      <NavBar />
      <main className="main-content">
        {children}
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
  return <><AboutPage /><WhatsAppButton /></>;
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

      {/* Moms – dashboard is free, content pages are premium */}
      <Route path="/moms" element={
        <ProtectedRoute requiredRole="moms">
          <AppShell><MomsDashboard /></AppShell>
        </ProtectedRoute>
      } />
      <Route path="/moms/nutrition" element={
        <ProtectedRoute requiredRole="moms">
          <AppShell><Paywall feature="nutrition"><NutritionPage /></Paywall></AppShell>
        </ProtectedRoute>
      } />
      <Route path="/moms/mental" element={
        <ProtectedRoute requiredRole="moms">
          <AppShell><Paywall feature="mental"><MentalPage /></Paywall></AppShell>
        </ProtectedRoute>
      } />
      <Route path="/moms/videos" element={
        <ProtectedRoute requiredRole="moms">
          <AppShell><Paywall feature="videos"><MomsVideosPage /></Paywall></AppShell>
        </ProtectedRoute>
      } />

      {/* Academy – dashboard is free, content pages are premium */}
      <Route path="/academy" element={
        <ProtectedRoute requiredRole="student">
          <AppShell><AcademyDashboard /></AppShell>
        </ProtectedRoute>
      } />
      <Route path="/academy/videos" element={
        <ProtectedRoute requiredRole="student">
          <AppShell><Paywall feature="videos"><VideosPage /></Paywall></AppShell>
        </ProtectedRoute>
      } />
      <Route path="/academy/library" element={
        <ProtectedRoute requiredRole="student">
          <AppShell><Paywall feature="library"><LibraryPage /></Paywall></AppShell>
        </ProtectedRoute>
      } />
      <Route path="/academy/practice" element={
        <ProtectedRoute requiredRole="student">
          <AppShell><Paywall feature="practice"><PracticePage /></Paywall></AppShell>
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

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
