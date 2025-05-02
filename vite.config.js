import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync('./certs/private.key'),
      cert: fs.readFileSync('./certs/certificate.crt'),
    },
    host: true, // Terima koneksi dari semua IP
    port: 5174
  },
  preview: {
    https: {
      key: fs.readFileSync('./certs/private.key'),
      cert: fs.readFileSync('./certs/certificate.crt'),
    },
    host: true,
    port: 5174
  }
})