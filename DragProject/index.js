// .bind()
// 호출하는 함수에 객체를 bind해주지 않으면 전역 객체로부터 값을 받아오려고 하기 때문에
// 원하는 값이아닌 다른값을 가지게됨
// const autobind = (_: any, _2: string, descriptor: PropertyDescriptor) => {
//   const originalMethod = descriptor.value;
//   const adjDescriptor: PropertyDescriptor = {
//     configurable: true,
//     get() {
//       const bound = originalMethod.bind(this);
//       return bound;
//     },
//   };
//   return adjDescriptor;
// };
//list class
var ProjectList = /** @class */ (function () {
    function ProjectList(state) {
        this.state = state;
        this.templateElement = document.getElementById("project-list");
        this.hostDivElement = document.getElementById("app");
        var importNode = document.importNode(this.templateElement.content, true);
        this.sectionElement = importNode.firstElementChild;
        this.sectionElement.id = "".concat(state, "-project");
    }
    return ProjectList;
}());
//input class
var ProjectInput = /** @class */ (function () {
    function ProjectInput() {
        var _this = this;
        this.addForm = function () {
            //insertAdjacentElement
            //innerHTML보다 빠르며 요소를 재분석하지 않고 내부의 기존 요소를 방해하지 않음
            _this.hostDivElement.insertAdjacentElement("afterbegin", _this.formElement);
        };
        this.userInput = function () {
            //input의 값들으 모두 가져옴
            var titleInput = _this.titleInput.value;
            var descriptionInput = _this.descriptionInput.value;
            var peopleInput = _this.peopleInput.value;
            if (
            //trim() 문자열 양끝의 공백 제거
            titleInput.trim().length === 0 ||
                descriptionInput.trim().length === 0 ||
                peopleInput.trim().length === 0) {
                alert("error");
                return;
            }
            else {
                return [titleInput, descriptionInput, parseInt(peopleInput)];
            }
        };
        this.clearInput = function () {
            _this.titleInput.value = "";
            _this.descriptionInput.value = "";
            _this.peopleInput.value = "";
        };
        // @autobind
        this.submitHendler = function (e) {
            e.preventDefault();
            var userInput = _this.userInput();
            if (Array.isArray(userInput)) {
                var title = userInput[0], desc = userInput[1], people = userInput[2];
            }
            _this.clearInput();
        };
        this.configure = function () {
            _this.formElement.addEventListener("submit", _this.submitHendler);
        };
        this.templateElement = document.getElementById("project-input");
        this.hostDivElement = document.getElementById("app");
        // ! > null조건 완화, 값이 있다는것을 전달
        // 타입변경을 통해 null이 아니라는것을 보장
        //document.importNode
        //현재 문서가 아닌 외부 문서의 노드를 복사하여 현재 문서에 넣음
        //true시 자식요소를 포함하여 가져옴
        var importNode = document.importNode(this.templateElement.content, true);
        //div에 template를 추가시켜서 화면에 출력시켜줌
        this.formElement = importNode.firstElementChild;
        this.addForm();
        this.formElement.id = "user-input"; //form에 id추가
        //해당 ID가 inputElement인것을 보장하기위해 형변환 필요
        //form의 자식노드인 input에 접근
        this.titleInput = this.formElement.querySelector("#title");
        this.descriptionInput = this.formElement.querySelector("#description");
        this.peopleInput = this.formElement.querySelector("#people");
        this.configure();
    }
    return ProjectInput;
}());
var projectInput = new ProjectInput();
