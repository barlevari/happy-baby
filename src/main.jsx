import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { LanguageProvider } from './context/LanguageContext'
import { SubscriptionProvider } from './context/SubscriptionContext'
import ErrorBoundary from './components/ErrorBoundary'
import App from './App.jsx'
import './index.css'

// Force any waiting service worker to activate immediately on page load
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistration().then((reg) => {
    if (reg) {
      // If there's a waiting SW, skip waiting
      if (reg.waiting) {
        reg.waiting.postMessage({ type: 'SKIP_WAITING' });
      }
      // Listen for new service workers and auto-activate them
      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content available - reload to get fresh version
              newWorker.postMessage({ type: 'SKIP_WAITING' });
              window.location.reload();
            }
          });
        }
      });
    }
  });
  // When the controlling SW changes, reload for fresh content
  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!refreshing) {
      refreshing = true;
      window.location.reload();
    }
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <LanguageProvider>
            <SubscriptionProvider>
              <App />
            </SubscriptionProvider>
          </LanguageProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
)
