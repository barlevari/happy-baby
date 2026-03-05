import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        workbox: {
          globPatterns: ['**/*.{js,css,html,png,jpg,jpeg,svg,ico,woff2}'],
          // Force the new service worker to activate immediately
          skipWaiting: true,
          clientsClaim: true,
          // SPA: always serve index.html for navigation requests
          navigateFallback: '/index.html',
          navigateFallbackDenylist: [/^\/api\//],
          runtimeCaching: [
            {
              // App shell & assets: network-first so updates show immediately
              urlPattern: /^https:\/\/happy-baby-web\.vercel\.app\/.*/i,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'app-shell',
                expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 },
                networkTimeoutSeconds: 3,
              },
            },
            {
              urlPattern: /^https:\/\/img\.youtube\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'youtube-thumbnails',
                expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 7 },
              },
            },
          ],
        },
        manifest: false, // We use our own manifest.json in public/
      }),
    ],
    server: {
      proxy: {
        '/api/chat': {
          target: 'https://api.anthropic.com',
          changeOrigin: true,
          rewrite: () => '/v1/messages',
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              proxyReq.setHeader('x-api-key', env.ANTHROPIC_API_KEY || '');
              proxyReq.setHeader('anthropic-version', '2023-06-01');
              proxyReq.setHeader('anthropic-dangerous-direct-browser-access', 'true');
              proxyReq.removeHeader('origin');
              proxyReq.removeHeader('referer');
            });
          },
        },
      },
    },
  }
})
