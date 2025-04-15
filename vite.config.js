import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Lắng nghe trên tất cả các địa chỉ IP
    port: 5173,      // Cổng mà Vite sẽ chạy
    open: true       // Tự động mở trình duyệt
  },
  assetsInclude: ['**/*.glb', '**/*.gltf'],
})
