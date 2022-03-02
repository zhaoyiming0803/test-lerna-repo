const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  mode: 'production',
  entry: resolve("src/index.js"),
  output: {
    filename: "[name].js",
    path: resolve("dist/")
  },
  devtool: false,
  resolve: {
    alias: {
      "@": resolve("src"),
      static: resolve("static"),
    },
    extensions: [".js", ".jsx", ".css", ".less", ".ts", ".tsx", ".json"],
  },
  // optimization: {
  //   usedExports: true,
  //   minimize: true,
  //   minimizer: [new TerserPlugin()],
  // }
}