import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./", import.meta.url)),
    },
  },
  test: {
    clearMocks: true,
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
  },
});
