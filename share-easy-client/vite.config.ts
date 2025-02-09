import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  build: {
    emptyOutDir: true,
    outDir: "../dist",
  },
  server: {
    proxy: {
      "/*": "https://manu-xo5.github.io/share-easyi",
    },
  },
});
