//ProjectInput에서 값 입력후 버튼클릭 >
//ProjectState에서 전달 받은 데이터를 다시 전달 >
//ProjectList에서 랜더링

//ES모듈 방식은 최신 브라우저에서만 작동함
//구형 브라우저에서 사용시 bunding tool 사용 > webpack을 사용해 하나의 JS파일로 묶음
//webpack을 통하여 코드를 하나로 묶음으로써 http요청이 줄어듬 > import가 없어짐
//import한 파일의 확장자를 자동으로 찾음

//import * as Test from "./test.js" //test.js의 모든 export를 가져옴 Test.(name)으로 접근가능
//import {test as Test} "./test.js"

import { ProjectInput } from "./Project/input";
import { ProjectList } from "./Project/list";

new ProjectInput();
new ProjectList("active");
new ProjectList("finished");
