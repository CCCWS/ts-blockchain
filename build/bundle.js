"use strict";
var App;
(function (App) {
  let ProjectStatus;
  (function (ProjectStatus) {
    ProjectStatus[(ProjectStatus["Active"] = 0)] = "Active";
    ProjectStatus[(ProjectStatus["Finished"] = 1)] = "Finished";
  })((ProjectStatus = App.ProjectStatus || (App.ProjectStatus = {})));
  class ProjectType {
    constructor(id, title, description, people, status) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.people = people;
      this.status = status;
    }
  }
  App.ProjectType = ProjectType;
})(App || (App = {}));
var App;
(function (App) {
  var _a;
  function autobind(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
      configurable: true,
      get() {
        const boundFn = originalMethod.bind(this);
        return boundFn;
      },
    };
    return adjDescriptor;
  }
  class State {
    constructor() {
      this.listenerFunc = [];
      this.addListener = (listenerFunc) => {
        this.listenerFunc.push(listenerFunc);
      };
    }
  }
  class ProjectState extends State {
    constructor() {
      super();
      this.projects = [];
      this.addProject = (title, description, people) => {
        const newProject = new App.ProjectType(
          String(new Date().getTime()),
          title,
          description,
          people,
          App.ProjectStatus.Active
        );
        this.projects.push(newProject);
        this.updateListener();
      };
      this.moveProject = (projectId, newStatus) => {
        const project = this.projects.find((item) => item.id === projectId);
        if (project && project.status !== newStatus) {
          project.status = newStatus;
          this.updateListener();
        }
      };
      this.updateListener = () => {
        for (const listenerFunc of this.listenerFunc) {
          listenerFunc(this.projects.slice());
        }
      };
    }
  }
  _a = ProjectState;
  ProjectState.getInstance = () => {
    if (_a.instance) {
      return _a.instance;
    }
    _a.instance = new ProjectState();
    return _a.instance;
  };
  class Component {
    constructor(templateId, hostElementId, insert, newElementId) {
      this.attacth = (insert) => {
        this.hostElement.insertAdjacentElement(
          insert ? "afterbegin" : "beforeend",
          this.element
        );
      };
      this.templateElement = document.getElementById(templateId);
      this.hostElement = document.getElementById(hostElementId);
      const importNode = document.importNode(
        this.templateElement.content,
        true
      );
      this.element = importNode.firstElementChild;
      if (newElementId) {
        this.element.id = newElementId;
      }
      this.attacth(insert);
    }
  }
  class ProjectItem extends Component {
    constructor(hostId, project) {
      super("single-project", hostId, true, project.id);
      this.dragStartHandler = (e) => {
        e.dataTransfer.setData("text/plain", this.project.id);
        e.dataTransfer.effectAllowed = "move";
      };
      this.dragEndHandler = (e) => {
        console.log("Drop");
      };
      this.configure = () => {
        this.element.addEventListener(
          "dragstart",
          this.dragStartHandler.bind(this)
        );
        this.element.addEventListener(
          "dragend",
          this.dragEndHandler.bind(this)
        );
      };
      this.renderContent = () => {
        this.element.querySelector("h2").textContent = `${
          this.project.title
        } ${this.project.people.toString()}명`;
        this.element.querySelector("p").textContent = this.project.description;
      };
      this.project = project;
      this.configure();
      this.renderContent();
    }
  }
  class ProjectList extends Component {
    constructor(status) {
      super("project-list", "app", false, `${status}-projects`);
      this.status = status;
      this.configure = () => {
        this.element.addEventListener(
          "dragover",
          this.dragOverHandler.bind(this)
        );
        this.element.addEventListener("drop", this.dropHandler.bind(this));
        this.element.addEventListener(
          "dragleave",
          this.dragLeaveHandler.bind(this)
        );
        projectState.addListener(this.assigne);
      };
      this.assigne = (projects) => {
        const projectFillter = projects.filter((projects) => {
          if (this.status === "active") {
            return projects.status === App.ProjectStatus.Active;
          }
          return projects.status === App.ProjectStatus.Finished;
        });
        this.itemArr = projectFillter;
        this.renderProjects();
      };
      this.renderContent = () => {
        const listId = `${this.status}-projects-list`;
        this.element.querySelector("ul").id = listId;
        this.element.querySelector("h2").textContent =
          this.status.toLocaleUpperCase();
      };
      this.renderProjects = () => {
        const list = document.getElementById(`${this.status}-projects-list`);
        list.innerHTML = "";
        for (const item of this.itemArr) {
          new ProjectItem(this.element.querySelector("ul").id, item);
        }
      };
      this.itemArr = [];
      this.configure();
      this.renderContent();
    }
    dragOverHandler(e) {
      if (e.dataTransfer && e.dataTransfer.types[0] === "text/plain") {
        e.preventDefault();
        const list = this.element.querySelector("ul");
        list.classList.add("droppable");
      }
    }
    dragLeaveHandler(e) {
      const list = this.element.querySelector("ul");
      list.classList.remove("droppable");
    }
    dropHandler(e) {
      const listId = e.dataTransfer.getData("text/plain");
      const status =
        this.status === "active"
          ? App.ProjectStatus.Active
          : App.ProjectStatus.Finished;
      projectState.moveProject(listId, status);
    }
  }
  class ProjectInput extends Component {
    constructor() {
      super("project-input", "app", true, "user-input");
      this.userInput = () => {
        const titleInput = this.titleInput.value;
        const descriptionInput = this.descriptionInput.value;
        const peopleInput = this.peopleInput.value;
        if (
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
      this.clearInput = () => {
        this.titleInput.value = "";
        this.descriptionInput.value = "";
        this.peopleInput.value = "";
      };
      this.submitHendler = (e) => {
        e.preventDefault();
        const userInput = this.userInput();
        if (Array.isArray(userInput)) {
          const [title, desc, people] = userInput;
          projectState.addProject(title, desc, people);
        }
        this.clearInput();
      };
      this.renderContent = () => {};
      this.configure = () => {
        this.element.addEventListener("submit", this.submitHendler.bind(this));
      };
      this.titleInput = this.element.querySelector("#title");
      this.descriptionInput = this.element.querySelector("#description");
      this.peopleInput = this.element.querySelector("#people");
      this.renderContent();
      this.configure();
    }
  }
  const projectState = ProjectState.getInstance();
  new ProjectInput();
  new ProjectList("active");
  new ProjectList("finished");
})(App || (App = {}));

//# sourceMappingURL=bundle.js.map
