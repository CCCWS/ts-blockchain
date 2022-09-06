/// <reference path = "./component.ts" />
/// <reference path="../model/inputType.ts" />

namespace App {
  //ProjectItem Class
  //입력값을 리스트에 추가하여 랜더링할 클래스
  export class ProjectItem
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
      this.element.querySelector("h2")!.textContent = `${
        this.project.title
      } ${this.project.people.toString()}명`;
      this.element.querySelector("p")!.textContent = this.project.description;
    };
  }
}
