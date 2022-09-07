const path = require("path");

module.exports = {
  entry: "./DragProject/index.ts", //시작파일
  output: {
    filename: "webpack-index.js",
    paht: path.resolve(__dirname, "build"),
    //tsconfig의 outDir 경로와 같아야됨, 절대경로로 입력
  },
};
