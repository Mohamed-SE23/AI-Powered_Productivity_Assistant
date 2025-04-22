import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,
  },
//   server: {
//     proxy: {
//       // Proxy API requests to the Node backend
//       '/api': {
//         // target: 'http://127.0.0.1:5000',  // Node backend URL
//         target: 'https://ai-powered-productivity-assistant.onrender.com',  // Node backend URL
//         changeOrigin: true,
//         secure: false,
//       },
//     },
//   },
})
