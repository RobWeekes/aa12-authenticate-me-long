import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    eslint({
      lintOnStart: true,
      failOnError: mode === "production"
    })
  ],
    // added below for phase 0 of frontend readme
  server: {
    // To automatically open the app in the browser whenever the server starts,
    // uncomment the following line:
    // open: true,
    // proxy: {
    //   '/api': mode === "production"
    //     ? 'https://auth-me-z6z9.onrender.com'
    //     : 'http://localhost:8000'
    // },
    proxy: {
      '/api': 'http://localhost:8000'
    },
  }
}));

// original proxy from README:
// proxy: {
//   '/api': 'http://localhost:8000'
// },

// This configuration is already handling the API proxy in development mode, redirecting all '/api' requests to http://localhost:8000. For production, we need to add a similar configuration that points to your production backend URL.

// Let's modify the config to handle both environments:
// proxy: {
//   '/api': mode === 'production'
//     ? 'https://your-backend-url.onrender.com'
//     : 'http://localhost:8000'
// },
