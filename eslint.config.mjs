// eslint.config.mjs

import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// 1. IMPORT NECESSARY PLUGINS
import jsxA11y from "eslint-plugin-jsx-a11y"; // For Accessibility (A11Y)
import tailwindPlugin from "eslint-plugin-tailwindcss"; // For Tailwind Class Order/Consistency
import tseslint from "typescript-eslint"; // For base TypeScript rules
import pluginReact from "eslint-plugin-react"; // For base React hooks/components rules

const eslintConfig = defineConfig([
  // --- BASE CONFIGURATIONS ---
  
  // Base Next.js rules (Web Vitals, general JavaScript)
  ...nextVitals,
  
  // Next.js TypeScript rules
  ...nextTs,

  // --- CORE LANGUAGE/FRAMEWORK RULES ---

  // Base TypeScript recommended rules
  ...tseslint.configs.recommended,

  // React Hooks/JSX rules (use flat config structure for plugins)
  {
    plugins: {
      react: pluginReact,
    },
    rules: {
      // Enforce rules of hooks (essential for React stability)
      "react/rules-of-hooks": "error", 
      // Enforce dependencies of hooks (essential for React stability)
      "react/hook-dependencies": "error", 
    },
  },

  // --- PROJECT-SPECIFIC RULES ---
  
  // 2. A11Y (ACCESSIBILITY) RULES
  {
    // Apply A11Y rules to all JS, JSX, TS, and TSX files
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "jsx-a11y": jsxA11y,
    },
    // Extends the recommended set of accessibility rules
    ...jsxA11y.configs.recommended,
  },

  // 3. TAILWIND CSS RULES
  {
    // Apply Tailwind rules to all files
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      tailwindcss: tailwindPlugin,
    },
    extends: [
      // Enforce standard Tailwind practices and class ordering
      "plugin:tailwindcss/recommended",
    ],
    rules: {
      // Optional: enforce consistent Tailwind class ordering 
      // (helps maintain code quality)
      "tailwindcss/classnames-order": "warn",
    },
  },
  
  // 4. OVERRIDE IGNORES
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Add any node module/build folder ignores here
  ]),
]);

export default eslintConfig;