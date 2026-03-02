import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "https://github.com/kkawayuki/jobPostingSim--react",
})

//need to add base location of file hosting for vite to find/build properly