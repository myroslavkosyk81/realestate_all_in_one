import { defineConfig, loadEnv  } from 'vite'

import react from '@vitejs/plugin-react-swc'
import dotenv from 'dotenv'

dotenv.config()
//console.log(process.env.VITE_APP_API_URL)

export default defineConfig({
  server: {
    proxy: {
      // '/foo': 'http://localhost:5173',
      '/api': {
        target: 'https://realestate-all-in-one.vercel.app',
        // target: `${process.env.VITE_APP_API_URL}`,
        changeOrigin: true,
        secure: false,      
        ws: true,
        // configure: (proxy, _options) => {
        //   proxy.on('error', (err, _req, _res) => {
        //     console.log('proxy error', err);
        //   });
        //   proxy.on('proxyReq', (proxyReq, req, _res) => {
        //     console.log('Sending Request to the Target:', req.method, req.url);
        //   });
        //   proxy.on('proxyRes', (proxyRes, req, _res) => {
        //     console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
        //   });
        // },
      },
    },
  },
  plugins: [react()],
})