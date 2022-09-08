const path = require("path");

module.exports = {
  mode: "development",
  entry: "./GoogleMap/index.ts", //시작파일
  output: {
    filename: "webpack-google-index.js",
    path: path.resolve(__dirname, "webpack"),
    //tsconfig의 outDir 경로와 같아야됨, 절대경로로 입력
    publicPath: "webpack",
  },

  devtool: "inline-source-map",

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    extensions: [".ts", ".js"],
  },
};
