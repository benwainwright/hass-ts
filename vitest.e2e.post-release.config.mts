import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    env: {
      POST_RELEASE: "true",
    },
    globals: true,
    globalSetup: "./src/test-support/e2e-global-setup.ts",
    setupFiles: "./src/test-support/setup-post-release-mock.mts",
    include: ["src/e2e-tests/**/*.spec.ts"],
  },
});
