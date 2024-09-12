import globals from "globals";
import js from "@eslint/js";
import typescript from "@typescript-eslint/eslint-plugin";
import importPlugin from "eslint-plugin-import";
import noRelativeImportPaths from "eslint-plugin-no-relative-import-paths";
import tsParser from "@typescript-eslint/parser";
import filenames from "eslint-plugin-filenames";
import jsdoc from "eslint-plugin-jsdoc";

export default [
  {
    ignores: ["dist", "coverage", "tmp-declarations", "api", "temp"],
  },
  {
    files: ["**/*.js", "**/*.ts"],
    plugins: {
      filenames,
      import: importPlugin,
      jsdoc,
      "no-relative-import-paths": noRelativeImportPaths,
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.jest,
      },
    },
    rules: {
      "no-relative-import-paths/no-relative-import-paths": [
        "error",
        { allowSameFolder: true },
      ],
      "filenames/match-regex": [2, "^[a-z-0-9.]+$", true],
    },
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      parserOptions: {
        sourceType: "module",
      },
    },
    rules: js.configs.recommended.rules,
  },
  {
    files: ["**/*.ts"],
    plugins: {
      "@typescript-eslint": typescript,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    rules: {
      ...typescript.configs["strict-type-checked"].rules,
      "@typescript-eslint/prefer-readonly-parameter-types": "off",
    },
  },
  {
    files: ["**/*.spec.ts"],
    rules: {
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/unbound-method": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
    },
  },
];
