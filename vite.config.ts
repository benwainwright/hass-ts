import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    setupFiles: ["./src/test-support/setup-tests.ts"],
    globals: true,
    include: ["src/lib/**/*.spec.ts"],
    coverage: {
      all: true,
      include: ["src/lib/**/*.ts"],
      provider: "istanbul",
      cleanOnRerun: true,
      reporter: ["text", "html", "lcov"],
      thresholds: {
        autoUpdate: true,
        functions: 100,
        lines: 100,
        statements: 100,
        branches: 100,
      },
    },
  },
});
