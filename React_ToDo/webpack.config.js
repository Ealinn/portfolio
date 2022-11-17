const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const env = process.env.NODE_ENV || "development";
const isDev = env === "development";

module.exports = {
  entry: "./dev/index.js",
  output: {
    path: path.resolve(__dirname, "site"),
    filename: "bundle.js",
  },
  devtool: isDev && "eval-source-map",
  mode: env,
  watch: isDev,
  devServer: {
    contentBase: path.resolve(__dirname, "site"),
    host: "localhost",
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve("./dev/static"),
          to: path.resolve("./site"),
        },
      ],
    }),
  ],
};
