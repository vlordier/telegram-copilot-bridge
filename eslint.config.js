// @ts-check
const tseslint = require("typescript-eslint");
const prettier = require("eslint-config-prettier");

/** @type {import("eslint").Linter.Config[]} */
module.exports = [
  // Global ignores
  {
    ignores: ["out/**", "node_modules/**", "*.vsix"],
  },

  // typescript-eslint flat/recommended provides the parser + base rules
  ...tseslint.configs.recommended,

  // Project-specific overrides for type-aware linting
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module",
      },
    },
    rules: {
      // Allow unused function parameters when prefixed with _ (not in the flat/recommended default)
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],

      // Type-aware rules (require parserOptions.project)
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": "error",
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/no-unnecessary-type-assertion": "error",

      // Safer throw — replaces the deprecated core no-throw-literal
      "@typescript-eslint/only-throw-error": "error",

      // Core rules
      eqeqeq: ["error", "always"],
      "no-console": "warn",
    },
  },

  // Disable Prettier-conflicting ESLint formatting rules (must be last)
  prettier,
];
