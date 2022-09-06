namespace App {
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
  export class ProjectState extends State<ProjectType> {
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

  export const projectState = ProjectState.getInstance();
}
