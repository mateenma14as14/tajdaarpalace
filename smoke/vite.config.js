import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Server-render bundle used only by `npm run smoke`. Tailwind is not needed
// here — the checks are about markup and logic, not styles.
export default defineConfig({
  plugins: [react()],
  logLevel: "warn",
  build: {
    ssr: "smoke/entry.jsx",
    outDir: "smoke/.out",
    emptyOutDir: true,
    minify: false,
    copyPublicDir: false,
  },
});
