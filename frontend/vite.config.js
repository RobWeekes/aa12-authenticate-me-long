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
    proxy: {
      '/api': 'http://localhost:8000'
    },
  }
}));
