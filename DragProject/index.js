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
//ProjectInput에서 값 입력후 버튼클릭 >
//ProjectState에서 전달 받은 데이터를 다시 전달 >
//ProjectList에서 랜더링
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
})(ProjectStatus || (ProjectStatus = {}));
//project type class
//입력한 값을 클래스로 관리
var ProjectType = /** @class */ (function () {
    function ProjectType(id, title, description, people, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
    }
    return ProjectType;
}());
//state manage class
//항목에 추가될 리스트를 관리
var ProjectState = /** @class */ (function () {
    function ProjectState() {
        var _this = this;
        this.listenerFunc = []; //ProjectList에서 받은 함수, 생성된 ProjectList만큼 추가됨
        this.projects = []; //[title, desc, people]로 구성된 튜플
        this.addListener = function (listenerFunc) {
            //activ와 finished 두개의 클래스가 생성되어 두번 호출
            _this.listenerFunc.push(listenerFunc);
            // private assigne = (projects: any[]) => {
            //     this.assigneProjects = projects;
            //     this.renderProjects();
            //   };
            //   private renderProjects = () => {
            //     const list = document.getElementById(
            //       `${this.state}-projects`
            //     )! as HTMLUListElement;
            //     for (const item of this.assigneProjects) {
            //       const listItem = document.createElement("li");
            //       listItem.textContent = item.title;
            //       list?.appendChild(listItem);
            //     }
            //   };
        };
        //입력받은 값들을 객체로 묶어서 배열에 저장
        this.addProject = function (title, description, people) {
            var newProject = new ProjectType(new Date().getTime(), title, description, people, ProjectStatus.Active);
            // {
            //   id: new Date().getTime(),
            //   title: title,
            //   description: description,
            //   people: people,
            // };
            _this.projects.push(newProject);
            //ProjectList에서 실제로 DOM에 랜더링을 해줌
            //activ와 finished 클래스에 하나씩 랜더링됨
            for (var _i = 0, _b = _this.listenerFunc; _i < _b.length; _i++) {
                var listenerFunc = _b[_i];
                //for of문 > 받은 배열의 값을 순환, 배열에만 사용가능
                //for in문 > 객체를 순환, 배열을 받을시 배열의 index출력
                listenerFunc(
                //ProjectList클래스의 assigne함수
                _this.projects.slice(_this.projects.length - 1, _this.projects.length));
            }
        };
    }
    var _a;
    _a = ProjectState;
    //method//
    //singleton
    ProjectState.getInstance = function () {
        if (_a.instance) {
            return _a.instance;
        }
        _a.instance = new ProjectState();
        return _a.instance;
        //생성이 되어있다면 그대로 리턴 없으면 생성
        //외부에서 클래스 생성불가
    };
    return ProjectState;
}());
var projectState = ProjectState.getInstance();
//list class
//active, finished 카테고리 생성
var ProjectList = /** @class */ (function () {
    function ProjectList(status) {
        var _this = this;
        this.status = status;
        //method//
        this.assigne = function (projects) {
            // projects > ProjectState에서 보내준 [title, desc, people]로 구성된 튜플
            var projectFillter = projects.filter(function (projects) {
                //active, finished 상태 필터링
                if (_this.status === "active") {
                    return projects.status === ProjectStatus.Active;
                }
                return projects.status === ProjectStatus.Finished;
            });
            console.log(projectFillter);
            _this.itemArr = projectFillter;
            _this.renderProjects();
        };
        this.renderProjects = function () {
            var list = document.getElementById("".concat(_this.status, "-projects"));
            for (var _i = 0, _b = _this.itemArr; _i < _b.length; _i++) {
                var item = _b[_i];
                var listItem = document.createElement("li");
                listItem.textContent = "\n      TITLE : ".concat(item.title, " / \n      DESC : ").concat(item.description, " / \n      PEOPLE : ").concat(item.people);
                list.appendChild(listItem);
                //item의 값이 들어있는 li를 this.state-projects > ul의 자식노드로 추가
            }
        };
        this.renderContent = function () {
            //template의 요소의 값을 추가
            _this.sectionElement.querySelector("ul").id = "".concat(_this.status, "-projects"); //ul의 id입력
            _this.sectionElement.querySelector("h2").textContent =
                _this.status.toLocaleUpperCase(); //클래스 생성시 입력된 값
        };
        this.attacth = function () {
            //template를 dom에 랜더링
            _this.hostDivElement.insertAdjacentElement("beforeend", _this.sectionElement);
        };
        this.templateElement = document.getElementById("project-list");
        this.hostDivElement = document.getElementById("app");
        this.itemArr = [];
        var importNode = document.importNode(this.templateElement.content, true);
        this.sectionElement = importNode.firstElementChild;
        this.sectionElement.id = "".concat(status, "-projects");
        projectState.addListener(this.assigne);
        this.attacth();
        this.renderContent();
    }
    return ProjectList;
}());
var test = new ProjectList("active");
var test2 = new ProjectList("finished");
//input class
//입력 카테고리 생성
var ProjectInput = /** @class */ (function () {
    function ProjectInput() {
        var _this = this;
        //method//
        this.attacth = function () {
            //insertAdjacentElement
            //요소를 DOM에 추가
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
                projectState.addProject(title, desc, people);
            }
            // this.clearInput();
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
        this.attacth();
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
