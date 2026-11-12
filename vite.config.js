import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Browser checks in tests/e2e run with Playwright (npm run e2e), not Vitest.
  test: { exclude: ["node_modules/**", "tests/e2e/**", "dist/**"] },
});
