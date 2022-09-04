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
class ProjectList {
  templateElement: HTMLTemplateElement;
  hostDivElement: HTMLDivElement;
  sectionElement: HTMLElement;

  constructor(private state: "active" | "finish") {
    this.templateElement = document.getElementById(
      "project-list"
    )! as HTMLTemplateElement;
    this.hostDivElement = document.getElementById("app")! as HTMLDivElement;

    const importNode = document.importNode(this.templateElement.content, true);

    this.sectionElement = importNode.firstElementChild as HTMLElement;
    this.sectionElement.id = `${state}-project`;
  }
}

//input class
class ProjectInput {
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
    this.addForm();
    this.formElement.id = "user-input"; //form에 id추가

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

  private addForm = () => {
    //insertAdjacentElement
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
    }
    this.clearInput();
  };

  private configure = () => {
    this.formElement.addEventListener("submit", this.submitHendler);
  };
}

const projectInput = new ProjectInput();
