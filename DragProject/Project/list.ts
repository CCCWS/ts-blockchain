import { ProjectItem } from "./item";
import { projectState } from "./state";
import { DragTarget } from "../model/dragDrop";
import { ProjectType, ProjectStatus } from "../model/inputType";
import { Component } from "./component";

//ProjectList Class
//active, finished 카테고리 생성
export class ProjectList
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
