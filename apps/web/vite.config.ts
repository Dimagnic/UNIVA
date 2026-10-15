import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['brand/favicon.png'],
      manifest: {
        name: 'UNIVA · Movilidad segura y transparente',
        short_name: 'UNIVA',
        description:
          'Plataforma mexicana de movilidad: viajes seguros y ganancias claras para conductores.',
        lang: 'es-MX',
        start_url: '/',
        display: 'standalone',
        theme_color: '#050504',
        background_color: '#050504',
        icons: [
          { src: '/brand/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/brand/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/brand/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,webmanifest}'],
        navigateFallbackDenylist: [/^\/api\//],
      },
    }),
  ],
  build: { sourcemap: true },
});
