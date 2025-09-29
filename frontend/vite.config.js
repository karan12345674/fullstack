



import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

console.log("✅ vite.config.js loaded!");

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@Components': path.resolve(__dirname, 'src/Components'),
      '@Pages': path.resolve(__dirname, 'src/pages'),
      '@Utils': path.resolve(__dirname, 'src/Utils')
    }
  },
  server: {
    host: '0.0.0.0',
    port: 5173
  }
});
