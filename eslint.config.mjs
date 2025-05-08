import { defineConfig } from "eslint/config";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default defineConfig({
  plugins: {
    pluginJs: pluginJs.configs.recommended,
    tseslint
  },
  rules: {
    "prefer-const": "warn",
    "no-var": "warn"
  }
});
