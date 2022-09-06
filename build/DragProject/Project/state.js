var _a;
import { ProjectType } from "./../model/inputType.js";
import { ProjectStatus } from "../model/inputType.js";
class State {
    constructor() {
        this.listenerFunc = [];
        this.addListener = (listenerFunc) => {
            this.listenerFunc.push(listenerFunc);
        };
    }
}
export class ProjectState extends State {
    constructor() {
        super();
        this.projects = [];
        this.addProject = (title, description, people) => {
            const newProject = new ProjectType(String(new Date().getTime()), title, description, people, ProjectStatus.Active);
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
export const projectState = ProjectState.getInstance();
//# sourceMappingURL=state.js.map