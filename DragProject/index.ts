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

enum ProjectStatus {
  Active,
  Finished,
}

//project type class
//입력한 값을 클래스로 관리
class ProjectType {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}

type ListenerFunc = (item: ProjectType[]) => void;

//state manage class
//항목에 추가될 리스트를 관리
class ProjectState {
  private listenerFunc: ListenerFunc[] = []; //ProjectList에서 받은 함수, 생성된 ProjectList만큼 추가됨
  private projects: ProjectType[] = []; //[title, desc, people]로 구성된 튜플
  private static instance: ProjectState;

  private constructor() {}

  //method//
  //singleton
  static getInstance = () => {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
    //생성이 되어있다면 그대로 리턴 없으면 생성
    //외부에서 클래스 생성불가
  };

  addListener = (listenerFunc: ListenerFunc) => {
    //activ와 finished 두개의 클래스가 생성되어 두번 호출
    //ProjectList의 assigne함수가 들어감 180
    this.listenerFunc.push(listenerFunc);
  };

  //입력받은 값들을 객체로 묶어서 배열에 저장
  addProject = (title: string, description: string, people: number) => {
    const newProject = new ProjectType(
      new Date().getTime(),
      title,
      description,
      people,
      ProjectStatus.Active
    );
    this.projects.push(newProject);

    //ProjectList에서 실제로 DOM에 랜더링을 해줌
    //activ와 finished 클래스에 하나씩 랜더링됨
    for (const listenerFunc of this.listenerFunc) {
      //for of문 > 받은 배열의 값을 순환, 배열에만 사용가능
      //for in문 > 객체를 순환, 배열을 받을시 배열의 index출력
      listenerFunc(
        //ProjectList클래스의 assigne함수
        this.projects.slice(this.projects.length - 1, this.projects.length)
      );
    }
  };
}

const projectState = ProjectState.getInstance();

//ProjectList와 ProjectInput의 공통기능 관리
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(
    templateId: string,
    hostElementId: string,
    insert: boolean, // afterbegin or beforeend
    newElementId?: string
  ) {
    this.templateElement = document.getElementById(
      templateId
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElementId)! as T;

    //document.importNode
    //현재 문서가 아닌 외부 문서의 노드를 복사하여 현재 문서에 넣음
    //true시 자식요소를 포함하여 가져옴
    const importNode = document.importNode(this.templateElement.content, true);

    //div에 template를 추가시켜서 화면에 출력시켜줌
    this.element = importNode.firstElementChild as U;
    if (newElementId) {
      this.element.id = newElementId;
    }

    this.attacth(insert);
  }

  //template를 dom에 랜더링
  //insertAdjacentElement
  //innerHTML보다 빠르며 요소를 재분석하지 않고 내부의 기존 요소를 방해하지 않음
  //beforeend > element 안에 가장 마지막 child
  //afterbegin > element 안에 가장 첫번째 child
  private attacth = (insert: boolean) => {
    this.hostElement.insertAdjacentElement(
      insert ? "afterbegin" : "beforeend",
      this.element
    );
  };

  abstract configure(): void;
  abstract renderContent(): void;
}

//list class
//active, finished 카테고리 생성
class ProjectList extends Component<HTMLDivElement, HTMLElement> {
  //   itemArr: ProjectType[]; //DOM에 랜더링할 데이터 [title, desc, people]로 구성된 튜플
  constructor(private status: "active" | "finished") {
    super("project-list", "app", false, `${status}-projects`);
    // this.itemArr = [];
    this.configure();
    this.renderContent();
  }

  //method//
  private renderProjects = (itemArr: ProjectType[]) => {
    const list = document.getElementById(
      `${this.status}-projects`
    )! as HTMLUListElement;

    for (const item of itemArr) {
      const listItem = document.createElement("li");

      listItem.textContent = `
      TITLE : ${item.title} / 
      DESC : ${item.description} / 
      PEOPLE : ${item.people}`;

      list.appendChild(listItem);
      //item의 값이 들어있는 li를 this.state-projects > ul의 자식노드로 추가
    }
  };

  renderContent = () => {
    //template의 요소의 값을 추가
    this.element.querySelector("ul")!.id = `${this.status}-projects`; //ul의 id입력
    this.element.querySelector("h2")!.textContent =
      this.status.toLocaleUpperCase(); //클래스 생성시 입력된 값
  };

  configure = () => {
    projectState.addListener(this.assigne);
  };

  private assigne = (projects: ProjectType[]) => {
    // projects > ProjectState에서 보내준 [title, desc, people]로 구성된 튜플
    const projectFillter = projects.filter((projects) => {
      //active, finished 상태 필터링
      if (this.status === "active") {
        //active 클래스일 경우
        //상태가 active인 데이터만 남김
        return projects.status === ProjectStatus.Active;
      }
      //finished 클래스일 경우
      //상태가 finished인 데이터만 남김
      return projects.status === ProjectStatus.Finished;
    });
    // this.itemArr = projectFillter;
    this.renderProjects(projectFillter);
  };
}

const test = new ProjectList("active");
const test2 = new ProjectList("finished");

//input class
//입력 카테고리 생성
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  templateElement: HTMLTemplateElement;
  hostDivElement: HTMLDivElement;
  formElement: HTMLFormElement;

  titleInput: HTMLInputElement;
  descriptionInput: HTMLInputElement;
  peopleInput: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;
    this.hostDivElement = document.getElementById("app")! as HTMLDivElement;
    // ! > null조건 완화, 값이 있다는것을 전달
    // 타입변경을 통해 null이 아니라는것을 보장

    //document.importNode
    //현재 문서가 아닌 외부 문서의 노드를 복사하여 현재 문서에 넣음
    //true시 자식요소를 포함하여 가져옴
    const importNode = document.importNode(this.templateElement.content, true);

    //div에 template를 추가시켜서 화면에 출력시켜줌
    this.formElement = importNode.firstElementChild as HTMLFormElement;
    this.formElement.id = "user-input"; //form에 id추가
    this.attacth();

    //해당 ID가 inputElement인것을 보장하기위해 형변환 필요
    //form의 자식노드인 input에 접근
    this.titleInput = this.formElement.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionInput = this.formElement.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInput = this.formElement.querySelector(
      "#people"
    ) as HTMLInputElement;

    this.configure();
  }

  //method//
  private attacth = () => {
    //insertAdjacentElement
    //요소를 DOM에 추가
    //innerHTML보다 빠르며 요소를 재분석하지 않고 내부의 기존 요소를 방해하지 않음
    this.hostDivElement.insertAdjacentElement("afterbegin", this.formElement);
  };

  private userInput = (): [string, string, number] | void => {
    //input의 값들으 모두 가져옴
    const titleInput = this.titleInput.value;
    const descriptionInput = this.descriptionInput.value;
    const peopleInput = this.peopleInput.value;

    if (
      //trim() 문자열 양끝의 공백 제거
      titleInput.trim().length === 0 ||
      descriptionInput.trim().length === 0 ||
      peopleInput.trim().length === 0
    ) {
      alert("error");
      return;
    } else {
      return [titleInput, descriptionInput, parseInt(peopleInput)];
    }
  };

  private clearInput = () => {
    this.titleInput.value = "";
    this.descriptionInput.value = "";
    this.peopleInput.value = "";
  };

  // @autobind
  private submitHendler = (e: Event) => {
    e.preventDefault();
    const userInput = this.userInput();
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      projectState.addProject(title, desc, people);
    }
    // this.clearInput();
  };

  private configure = () => {
    this.formElement.addEventListener("submit", this.submitHendler);
  };
}

const projectInput = new ProjectInput();
