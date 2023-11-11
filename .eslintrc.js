/* eslint-env node */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/strict-type-checked",
    "plugin:markdown/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint", "filenames", "import"],
  root: true,
  rules: {
    "import/no-relative-parent-imports": "error",
    "@typescript-eslint/prefer-readonly-parameter-types": "off",
    "filenames/match-regex": [2, "^[a-z-0-9.]+$", true],
  },
  overrides: [
    {
      files: ["./**/*.js"],
      env: {
        node: true,
      },
    },
    {
      files: ["./**/*.spec.ts"],
      rules: {
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/unbound-method": "off",
        "@typescript-eslint/no-unsafe-argument": "off",
      },
    },
  ],
};
