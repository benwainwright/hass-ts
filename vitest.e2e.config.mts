import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    setupFiles: ["./test-support/setup-tests.ts"],
    globals: true,
    include: ["src/e2e-tests/**/*.spec.ts"],
  },
});
