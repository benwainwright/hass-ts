import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    setupFiles: ["./test-support/setup-tests.ts"],
    globals: true,
    include: ["src/lib/**/*.spec.ts"],
    coverage: {
      all: true,
      include: ["src/lib/**/*.ts"],
      provider: "istanbul",
      cleanOnRerun: true,
      thresholdAutoUpdate: true,
      reporter: ["text", "html", "lcov"],
      functions: 100,
      lines: 100,
      statements: 100,
      branches: 100,
    },
  },
});
