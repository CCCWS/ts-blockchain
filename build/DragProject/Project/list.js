import { ProjectItem } from "./item.js";
import { projectState } from "./state.js";
import { ProjectStatus } from "../model/inputType.js";
import { Component } from "./component.js";
export class ProjectList extends Component {
    constructor(status) {
        super("project-list", "app", false, `${status}-projects`);
        this.status = status;
        this.configure = () => {
            this.element.addEventListener("dragover", this.dragOverHandler.bind(this));
            this.element.addEventListener("drop", this.dropHandler.bind(this));
            this.element.addEventListener("dragleave", this.dragLeaveHandler.bind(this));
            projectState.addListener(this.assigne);
        };
        this.assigne = (projects) => {
            const projectFillter = projects.filter((projects) => {
                if (this.status === "active") {
                    return projects.status === ProjectStatus.Active;
                }
                return projects.status === ProjectStatus.Finished;
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
        const status = this.status === "active" ? ProjectStatus.Active : ProjectStatus.Finished;
        projectState.moveProject(listId, status);
    }
}
//# sourceMappingURL=list.js.map