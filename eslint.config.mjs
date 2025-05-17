import { defineConfig, globalIgnores } from "eslint/config";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default defineConfig(
  { ignores: ["./docs/.next", "./docs/node_modules", "./dist"] },
  {
    plugins: {
      pluginJs: pluginJs.configs.recommended,
      tseslint
    },
    rules: {
      "prefer-const": "warn",
      "no-var": "warn"
    }
  }
);
