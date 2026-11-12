import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests/e2e",
  timeout: 60000,
  use: { baseURL: "http://localhost:4173", channel: "chrome" },
  webServer: { command: "npm run build && npx vite preview --port 4173 --strictPort", url: "http://localhost:4173", reuseExistingServer: false, timeout: 120000 },
});
