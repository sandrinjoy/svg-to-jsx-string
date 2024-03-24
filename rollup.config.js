import nodeResolve from "@rollup/plugin-node-resolve";
import buble from "@rollup/plugin-buble";
export default {
  input: "src/index.js",
  output: [
    { format: "esm", file: "dist/svg-to-jsx-string.esm.js", sourcemap: true },
    {
      format: "umd",
      file: "dist/svg-to-jsx-string.umd.js",
      name: "svgToJsxString",
      sourcemap: true
    }
  ],
  plugins: [
    nodeResolve(),
    buble({
      transforms: {
        dangerousForOf: true
      }
    })
  ]
};
