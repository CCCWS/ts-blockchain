//ProjectList와 ProjectInput의 공통기능 관리
export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
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
