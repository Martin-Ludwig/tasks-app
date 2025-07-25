import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig( ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return ({
    base: env.VITE_BASE_PATH || '/',
    plugins: [react(), tailwindcss(),],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    }
    // build: {
    //   sourcemap: mode === "development" ? 'hidden' : false
    // }
  });
});
