const path = require("path");
const CleanPlugin = require("clean-webpack-plugin");

module.exports = {
  mode: "production", //production모드시 코드 경량화 및 죄척화
  entry: "./DragProject/index.ts", //시작파일
  output: {
    filename: "webpack-index.js",
    path: path.resolve(__dirname, "webpack"),
    //tsconfig의 outDir 경로와 같아야됨, 절대경로로 입력
    publicPath: "webpack",
  },

  devtool: "none",

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

  plugins: [new CleanPlugin.CleanWebpackPlugin()],
};
