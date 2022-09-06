namespace App {
  export enum ProjectStatus {
    Active,
    Finished,
  }

  //project type class
  //입력한 값을 클래스로 관리
  export class ProjectType {
    constructor(
      public id: string,
      public title: string,
      public description: string,
      public people: number,
      public status: ProjectStatus
    ) {}
  }
}
