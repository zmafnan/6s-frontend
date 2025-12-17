import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import fs from "fs"

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync("./certs/192.168.16.5-key.pem"),
      cert: fs.readFileSync("./certs/192.168.16.5.pem"),
    },
    host: true, // Accept connections from all IPs
    port: 5174,
    proxy: {
      "/api": {
        target: "https://192.168.56.7:5003",
        changeOrigin: true,
        secure: false,
      },
      "/uploads": {
        target: "https://192.168.56.7:5003",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  preview: {
    https: {
      key: fs.readFileSync("./certs/192.168.16.5-key.pem"),
      cert: fs.readFileSync("./certs/192.168.16.5.pem"),
    },
    host: true,
    port: 5174,
    proxy: {
      "/api": {
        target: "https://192.168.56.7:5003",
        changeOrigin: true,
        secure: false,
      },
      "/uploads": {
        target: "https://192.168.56.7:5003",
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
