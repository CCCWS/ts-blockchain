/// <reference path = "./component.ts" />
/// <reference path = "./state.ts" />

namespace App {
  //input class
  //입력 카테고리 생성
  export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInput: HTMLInputElement;
    descriptionInput: HTMLInputElement;
    peopleInput: HTMLInputElement;

    constructor() {
      super("project-input", "app", true, "user-input");

      //해당 ID가 inputElement인것을 보장하기위해 형변환 필요
      //form의 자식노드인 input에 접근
      this.titleInput = this.element.querySelector(
        "#title"
      ) as HTMLInputElement;
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
}
