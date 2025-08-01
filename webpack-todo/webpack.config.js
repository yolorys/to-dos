// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // <-- NEW: Import the plugin

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  // <-- NEW: Add the plugins and devServer sections
  plugins: [
    new HtmlWebpackPlugin({
      title: "Todo List", // Title for the browser tab
      template: "./src/index.html", // The source HTML file
      filename: "index.html", // The output filename
    }),
  ],
  devServer: {
    static: "./dist", // Tells dev-server to serve files from the 'dist' directory
    port: 8080,
    open: true, // Automatically opens the browser
  },
  // <-- NEW: Add module.rules to handle CSS and other assets later
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};