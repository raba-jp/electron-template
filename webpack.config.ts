import * as path from "path";
import * as devServer from "webpack-dev-server";
import HtmlWebpackPlugin from "html-webpack-plugin";

const isDev = process.env.NODE_ENV === "development";

const server: devServer.Configuration = {
  contentBase: path.resolve(__dirname, "build"),
  port: 3000
};

const main = {
  name: "main",
  target: "electron-main",
  mode: isDev ? "development" : "production",
  entry: {
    main: path.join(__dirname, "src", "main", "index")
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].js"
  },
  node: {
    __dirname: false,
    __filename: false
  },
  module: {
    rules: [
      {
        test: /.ts?$/,
        exclude: [path.resolve(__dirname, "node_modules")],
        loader: "ts-loader"
      }
    ]
  },
  resolve: {
    extensions: [".js", ".ts"]
  },
  stats: "minimal",
  devtool: isDev ? "source-map" : false
};

const renderer = {
  name: "renderer",
  target: "electron-renderer",
  mode: isDev ? "development" : "production",
  resolve: {
    extensions: [".ts", ".js", ".tsx", ".jsx"]
  },
  entry: {
    app: "./src/renderer/index.tsx"
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        use: ["ts-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/renderer/index.html",
      chunks: ["app"],
      filename: "index.html"
    })
  ],
  performance: {
    hints: false
  },
  stats: "minimal",
  devtool: isDev ? "source-map" : false,
  devServer: server
};

module.exports = [main, renderer];
