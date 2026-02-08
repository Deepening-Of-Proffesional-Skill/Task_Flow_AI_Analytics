import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  {
    files: ["**/*.test.{js,jsx}"],
    languageOptions: { globals: globals.jest },
  },
  {
    plugins: { react: pluginReact },
    settings: { react: { version: "detect" } },
  },
  pluginReact.configs.flat.recommended,
  {
    ignores: ["dist/", "build/", "node_modules/"],
  },
]);