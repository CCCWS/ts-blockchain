//ProjectInput에서 값 입력후 버튼클릭 >
//ProjectState에서 전달 받은 데이터를 다시 전달 >
//ProjectList에서 랜더링

//ES모듈 방식은 최신 브라우저에서만 작동함
//구형 브라우저에서 사용시 bunding tool 사용 > 웹팩을 사용해 하나의 JS파일로 묶음
//웹팩을 통하여 파일을 묶을시 import하기위해 브라우저가 파일을 받을 필요가 없어서 요청이 줄어듬

//import시 웹팩 or 빌드툴 등을 사용하지 않는다면 .js 확장자를 붙여줘야됨
//import * as Test from "./test.js" //test.js의 모든 export를 가져옴 Test.(name)으로 접근가능
//import {test as Test} "./test.js"

import { ProjectInput } from "./Project/input.js";
import { ProjectList } from "./Project/list.js";

new ProjectInput();
new ProjectList("active");
new ProjectList("finished");
