import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    fs: {
      allow: [
        'C:/Users/Shreyansh Singh/Desktop/projects3rd year/PROJECT/Uber Clone/frontend',
        'C:/Users/Shreyansh Singh/Desktop/projects3rd year/PROJECT/Uber Clone/node_modules'
      ]
    }
  }
})
