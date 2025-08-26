import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	base: './projects/learning-tensorflowjs/second-proj-image-recognition/image-recognition-tensorflowjs/'
})
