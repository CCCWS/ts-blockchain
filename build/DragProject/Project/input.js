import { Component } from "./component.js";
import { projectState } from "./state.js";
export class ProjectInput extends Component {
    constructor() {
        super("project-input", "app", true, "user-input");
        this.userInput = () => {
            const titleInput = this.titleInput.value;
            const descriptionInput = this.descriptionInput.value;
            const peopleInput = this.peopleInput.value;
            if (titleInput.trim().length === 0 ||
                descriptionInput.trim().length === 0 ||
                peopleInput.trim().length === 0) {
                alert("error");
                return;
            }
            else {
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
        this.renderContent = () => { };
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
//# sourceMappingURL=input.js.map