import { Component } from "./component.js";
export class ProjectItem extends Component {
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
            this.element.addEventListener("dragstart", this.dragStartHandler.bind(this));
            this.element.addEventListener("dragend", this.dragEndHandler.bind(this));
        };
        this.renderContent = () => {
            this.element.querySelector("h2").textContent = `${this.project.title} ${this.project.people.toString()}명`;
            this.element.querySelector("p").textContent = this.project.description;
        };
        this.project = project;
        this.configure();
        this.renderContent();
    }
}
//# sourceMappingURL=item.js.map