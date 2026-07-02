import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'SIMPATIK Orang Tua',
        short_name: 'SIMPATIK',
        start_url: '/login-ortu',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#f97316'
      }
    })
  ],
})
