/// <reference path = "./Project/input.ts" />
/// <reference path = "./Project/list.ts" />

namespace App {
  //ProjectInput에서 값 입력후 버튼클릭 >
  //ProjectState에서 전달 받은 데이터를 다시 전달 >
  //ProjectList에서 랜더링

  new ProjectInput();
  new ProjectList("active");
  new ProjectList("finished");
}
