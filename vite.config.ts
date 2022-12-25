import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			"/api": {
				target: "http://192.168.0.102:4000",
				changeOrigin: true,
				secure: false,
			},
		},
	},
});
