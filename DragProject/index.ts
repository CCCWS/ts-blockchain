// .bind()
// 호출하는 함수에 객체를 bind해주지 않으면 전역 객체로부터 값을 받아오려고 하기 때문에
// 원하는 값이아닌 다른값을 가지게됨
function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

//ProjectInput에서 값 입력후 버튼클릭 >
//ProjectState에서 전달 받은 데이터를 다시 전달 >
//ProjectList에서 랜더링

// Drag interface
interface DragAble {
  dragStartHandler(e: DragEvent): void;
  dragEndHandler(e: DragEvent): void;
}

interface DragTarget {
  dragOverHandler(e: DragEvent): void; //드래그가 유효한 타겟임을 알림
  dropHandler(e: DragEvent): void; //드롭시 발생
  dragLeaveHandler(e: DragEvent): void; //시각적 피드백 제공
}

enum ProjectStatus {
  Active,
  Finished,
}

//project type class
//입력한 값을 클래스로 관리
class ProjectType {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}

type ListenerFunc<T> = (item: T[]) => void;

class State<T> {
  //ProjectList에서 받은 함수, 생성된 ProjectList만큼 추가됨
  protected listenerFunc: ListenerFunc<T>[] = [];

  addListener = (listenerFunc: ListenerFunc<T>) => {
    //activ와 finished 두개의 클래스가 생성되어 두번 호출
    //ProjectList의 assigne() 180
    this.listenerFunc.push(listenerFunc);
  };
}

//state manage class
//항목에 추가될 리스트를 관리
class ProjectState extends State<ProjectType> {
  private projects: ProjectType[] = []; //[title, desc, people]로 구성된 튜플
  private static instance: ProjectState;

  private constructor() {
    super();
  }

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

  //입력받은 값들을 클래스를 만들어 저장
  addProject = (title: string, description: string, people: number) => {
    const newProject = new ProjectType(
      String(new Date().getTime()),
      title,
      description,
      people,
      ProjectStatus.Active
    );
    this.projects.push(newProject);
    this.updateListener();
  };

  moveProject = (projectId: string, newStatus: ProjectStatus) => {
    const project = this.projects.find((item) => item.id === projectId);
    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.updateListener();
    }
  };

  private updateListener = () => {
    //ProjectList에서 실제로 DOM에 랜더링을 해줌
    for (const listenerFunc of this.listenerFunc) {
      //for of문 > 받은 배열의 값을 순환, 배열에만 사용가능
      //for in문 > 객체를 순환, 배열을 받을시 배열의 index출력
      //ProjectList클래스의 assigne함수
      listenerFunc(this.projects.slice());
    }
  };
}

//ProjectList와 ProjectInput의 공통기능 관리
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T; //랜더링 할곳
  element: U; //랜더링 할것

  constructor(
    templateId: string, //template의 id
    hostElementId: string, //생성될 요소의 부모의 id
    insert: boolean, // afterbegin or beforeend
    newElementId?: string //생성될 요소의 id
  ) {
    this.templateElement = document.getElementById(
      templateId
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElementId)! as T;
    // ! > null조건 완화, 값이 있다는것을 전달
    // 타입변경을 통해 null이 아니라는것을 보장

    //document.importNode
    //현재 문서가 아닌 외부 문서의 노드를 복사하여 현재 문서에 넣음
    //true시 자식요소를 포함하여 가져옴
    const importNode = document.importNode(this.templateElement.content, true);

    //template의 첫번째 자식노드
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

//ProjectItem Class
//입력값을 리스트에 추가하여 랜더링할 클래스
class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements DragAble
{
  private project: ProjectType;

  constructor(hostId: string, project: ProjectType) {
    //hostId > active-projects or finished-project
    super("single-project", hostId, true, project.id);
    this.project = project;

    this.configure();
    this.renderContent();
  }

  dragStartHandler = (e: DragEvent) => {
    //보이지 않는곳에 드래그중 데이터를 임시로 저장
    //드롭이 발생하면 이벤트 발생
    e.dataTransfer!.setData("text/plain", this.project.id);
    e.dataTransfer!.effectAllowed = "move";
    //드롭시 원래 장소에서 제거하고 새로운 장소에 추가함
  };
  dragEndHandler = (e: DragEvent) => {
    console.log("Drop");
  };

  //생성된 리스트에 드래그 이벤트 추가, li태그에 draggable 속성 추가
  configure = () => {
    this.element.addEventListener(
      "dragstart",
      this.dragStartHandler.bind(this)
    );
    this.element.addEventListener("dragend", this.dragEndHandler.bind(this));
  };

  renderContent = () => {
    //랜더링할 목록
    //element > 부모 노드의 id > active-projects or finished-project
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("p")!.textContent = this.project.description;
    this.element.querySelector("h3")!.textContent =
      this.project.people.toString() + "명";
  };
}

//ProjectList Class
//active, finished 카테고리 생성
class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget
{
  itemArr: ProjectType[];
  //DOM에 랜더링할 데이터

  constructor(private status: "active" | "finished") {
    super("project-list", "app", false, `${status}-projects`);
    this.itemArr = [];

    this.configure();
    this.renderContent();
  }
  //드롭 가능한 위치에 닿았을때 발생
  dragOverHandler(e: DragEvent) {
    if (e.dataTransfer && e.dataTransfer.types[0] === "text/plain") {
      //이벤트가 발생 가능한지 체크, text/plain만 허용, 다른 포멧은 불가
      e.preventDefault();
      const list = this.element.querySelector("ul")!;
      list.classList.add("droppable");
    }
  }
  //드래그 아웃 시 이벤트 발생
  dragLeaveHandler(e: DragEvent) {
    const list = this.element.querySelector("ul")!;
    list.classList.remove("droppable");
  }

  //드롭시 이벤트 발생
  dropHandler(e: DragEvent) {
    //드래그 시작시 데이터로 줬던 드래그한 list의 id
    const listId = e.dataTransfer!.getData("text/plain");
    const status =
      this.status === "active" ? ProjectStatus.Active : ProjectStatus.Finished;
    //랜더링된 프로젝트 리스트의 상태를 넘겨줌
    projectState.moveProject(listId, status);
  }

  configure = () => {
    this.element.addEventListener("dragover", this.dragOverHandler.bind(this));
    this.element.addEventListener("drop", this.dropHandler.bind(this));
    this.element.addEventListener(
      "dragleave",
      this.dragLeaveHandler.bind(this)
    );
    projectState.addListener(this.assigne);
  };

  private assigne = (projects: ProjectType[]) => {
    // projects > ProjectState에서 보내준 입력값 데이터
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
    this.itemArr = projectFillter;
    this.renderProjects();
  };

  renderContent = () => {
    //template의 요소의 값을 추가
    const listId = `${this.status}-projects-list`;
    this.element.querySelector("ul")!.id = listId; //ul의 id입력
    this.element.querySelector("h2")!.textContent =
      this.status.toLocaleUpperCase(); //클래스 생성시 입력된 값
  };

  private renderProjects = () => {
    const list = document.getElementById(
      `${this.status}-projects-list`
    )! as HTMLUListElement;
    list.innerHTML = ""; //drop로 이동시 기존위치의 리스트는 비워짐
    for (const item of this.itemArr) {
      new ProjectItem(this.element.querySelector("ul")!.id, item);
    }
  };
}

//input class
//입력 카테고리 생성
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInput: HTMLInputElement;
  descriptionInput: HTMLInputElement;
  peopleInput: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");

    //해당 ID가 inputElement인것을 보장하기위해 형변환 필요
    //form의 자식노드인 input에 접근
    this.titleInput = this.element.querySelector("#title") as HTMLInputElement;
    this.descriptionInput = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInput = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;

    this.renderContent();
    this.configure();
  }

  //method//
  private userInput = (): [string, string, number] | void => {
    //input의 값들을 모두 가져옴
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
    this.clearInput();
  };

  renderContent = () => {};

  configure = () => {
    this.element.addEventListener("submit", this.submitHendler.bind(this));
  };
}

const projectState = ProjectState.getInstance();
const projectInput = new ProjectInput();
const ProjectList1 = new ProjectList("active");
const ProjectList2 = new ProjectList("finished");
