import path from 'node:path';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
  // Tailwind runs through its own Vite plugin. Pinning an inline (empty) PostCSS
  // config stops Vite walking up the filesystem and picking up an unrelated
  // postcss.config.js from a parent directory.
  css: { postcss: {} },
  build: {
    // NOT the Vite default of 'assets'. Softinvites-website-QR is also a Vite
    // app and emits to /assets/. Both are served from the same origin
    // (softinvite.com) via rewrites, so their asset paths must not collide.
    assetsDir: 'site-assets',
  },
  server: { port: 3040 },
  preview: { port: 3040 },
});
