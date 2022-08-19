//TS에서 사용할 JS 라이브러리의 함수의 모양을 정의, 설명
//JS의 함수의 모양을 미리 알고있는 이유 > 미리 정의해둠
interface Config {
  url: string;
}

declare module "myPackage" {
  function init(config: Config): boolean;
  //myPackage파일의 init함수는 config라는 파라미터를 받고 boolean을 리턴해줌

  function exit(code: number): number;
}
