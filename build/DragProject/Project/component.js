export class Component {
    constructor(templateId, hostElementId, insert, newElementId) {
        this.attacth = (insert) => {
            this.hostElement.insertAdjacentElement(insert ? "afterbegin" : "beforeend", this.element);
        };
        this.templateElement = document.getElementById(templateId);
        this.hostElement = document.getElementById(hostElementId);
        const importNode = document.importNode(this.templateElement.content, true);
        this.element = importNode.firstElementChild;
        if (newElementId) {
            this.element.id = newElementId;
        }
        this.attacth(insert);
    }
}
//# sourceMappingURL=component.js.map