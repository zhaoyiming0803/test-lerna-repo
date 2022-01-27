const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  mode: 'development',
  entry: resolve("src/index-esm.js"),
  output: {
    filename: "index-esm.js",
    path: resolve("dist/")
  },
  devtool: false,
  resolve: {
    alias: {
      "@": resolve("src"),
      static: resolve("static"),
    },
    extensions: [".js", ".jsx", ".css", ".less", ".ts", ".tsx", ".json"],
  }
}