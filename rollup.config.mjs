import { defineConfig } from "rollup";
import typescript from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import execute from "rollup-plugin-execute";

export default defineConfig([
  {
    input: "src/index.ts",
    output: { dir: "dist" },
    plugins: [commonjs(), typescript({ clean: true }), terser(), execute("node scripts/cleanFile.mjs")]
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
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.react.json",
        tsconfigOverride: {
          compilerOptions: {
            declaration: true,
            declarationDir: "dist/react/types",
            declarationMap: true,
            sourceMap: true,
            outDir: "dist/react",
            noEmit: false
          }
        },
        clean: true,
        useTsconfigDeclarationDir: true
      }),
      babel({
        babelHelpers: "bundled",
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
        exclude: "node_modules/**"
      }),
      terser(),
      execute("node scripts/cleanFile.mjs")
    ]
  }
]);
