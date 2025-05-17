import { defineConfig } from "rollup";
import typescript from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";
import execute from "rollup-plugin-execute";

export default defineConfig([
  {
    input: "src/index.ts",
    output: {
      dir: "dist",
      format: "esm"
    },
    plugins: [
      typescript({
        clean: true,
        tsconfig: "./tsconfig.json",
        tsconfigOverride: {
          compilerOptions: {
            emitDeclarationOnly: false,
            moduleResolution: "node",
            declarationDir: "dist/types",
            composite: false
          }
        },
        useTsconfigDeclarationDir: true
      }),
      execute("node scripts/cleanFile.mjs")
    ]
  },
  {
    input: "src/react/index.ts",
    output: {
      dir: "dist/react",
      format: "esm",
      sourcemap: true
    },
    external: ["react", "react-dom"],
    plugins: [
      resolve({
        extensions: [".js", ".jsx", ".ts", ".tsx"]
      }),
      typescript({
        tsconfig: "./tsconfig.react.json",
        tsconfigOverride: {
          compilerOptions: {
            declaration: true,
            declarationDir: "dist/react/types",
            declarationMap: true,
            sourceMap: true,
            outDir: "dist/react",
            noEmit: false,
            emitDeclarationOnly: false,
            moduleResolution: "node",
            composite: false
          }
        },
        clean: true,
        useTsconfigDeclarationDir: true
      }),
      execute("node scripts/cleanFile.mjs")
    ]
  }
]);
