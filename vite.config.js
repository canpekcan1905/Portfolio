import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Relatieve paden, zodat de site ook werkt op GitHub Pages (canpekcan1905.github.io/Portfolio/)
  base: './',
})
