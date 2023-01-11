import path from "path";

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  resolve: {
    fallback: {
      stream: require.resolve("stream-browserify"),
    },
  },
  //   "resolve.fallback": { stream: false },
};
// let stream;
// if (import.meta.env.MODE === "browser") {
//   stream = require("stream-browserify");
// } else {
//   stream = require("stream");
// }
// // webpack.config.js

// const webpack = require("webpack");

// module.exports = {
//   // other webpack config options ...
//   resolve: {
//     fallback: {
//       stream: require.resolve("stream-browserify"),
//     },
//   },
// };
