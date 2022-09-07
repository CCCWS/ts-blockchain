(() => {
  "use strict";
  class t {
    constructor(t, e, s, i) {
      (this.attacth = (t) => {
        this.hostElement.insertAdjacentElement(
          t ? "afterbegin" : "beforeend",
          this.element
        );
      }),
        (this.templateElement = document.getElementById(t)),
        (this.hostElement = document.getElementById(e));
      const n = document.importNode(this.templateElement.content, !0);
      (this.element = n.firstElementChild),
        i && (this.element.id = i),
        this.attacth(s);
    }
  }
  var e, s;
  !(function (t) {
    (t[(t.Active = 0)] = "Active"), (t[(t.Finished = 1)] = "Finished");
  })(e || (e = {}));
  class i {
    constructor(t, e, s, i, n) {
      (this.id = t),
        (this.title = e),
        (this.description = s),
        (this.people = i),
        (this.status = n);
    }
  }
  class n extends class {
    constructor() {
      (this.listenerFunc = []),
        (this.addListener = (t) => {
          this.listenerFunc.push(t);
        });
    }
  } {
    constructor() {
      super(),
        (this.projects = []),
        (this.addProject = (t, s, n) => {
          const r = new i(String(new Date().getTime()), t, s, n, e.Active);
          this.projects.push(r), this.updateListener();
        }),
        (this.moveProject = (t, e) => {
          const s = this.projects.find((e) => e.id === t);
          s && s.status !== e && ((s.status = e), this.updateListener());
        }),
        (this.updateListener = () => {
          for (const t of this.listenerFunc) t(this.projects.slice());
        });
    }
  }
  (s = n),
    (n.getInstance = () => (s.instance || (s.instance = new n()), s.instance));
  const r = n.getInstance();
  class a extends t {
    constructor(t, e) {
      super("single-project", t, !0, e.id),
        (this.dragStartHandler = (t) => {
          t.dataTransfer.setData("text/plain", this.project.id),
            (t.dataTransfer.effectAllowed = "move");
        }),
        (this.dragEndHandler = (t) => {
          console.log("Drop");
        }),
        (this.configure = () => {
          this.element.addEventListener(
            "dragstart",
            this.dragStartHandler.bind(this)
          ),
            this.element.addEventListener(
              "dragend",
              this.dragEndHandler.bind(this)
            );
        }),
        (this.renderContent = () => {
          (this.element.querySelector("h2").textContent = `${
            this.project.title
          } ${this.project.people.toString()}명`),
            (this.element.querySelector("p").textContent =
              this.project.description);
        }),
        (this.project = e),
        this.configure(),
        this.renderContent();
    }
  }
  class o extends t {
    constructor(t) {
      super("project-list", "app", !1, `${t}-projects`),
        (this.status = t),
        (this.configure = () => {
          this.element.addEventListener(
            "dragover",
            this.dragOverHandler.bind(this)
          ),
            this.element.addEventListener("drop", this.dropHandler.bind(this)),
            this.element.addEventListener(
              "dragleave",
              this.dragLeaveHandler.bind(this)
            ),
            r.addListener(this.assigne);
        }),
        (this.assigne = (t) => {
          const s = t.filter((t) =>
            "active" === this.status
              ? t.status === e.Active
              : t.status === e.Finished
          );
          (this.itemArr = s), this.renderProjects();
        }),
        (this.renderContent = () => {
          const t = `${this.status}-projects-list`;
          (this.element.querySelector("ul").id = t),
            (this.element.querySelector("h2").textContent =
              this.status.toLocaleUpperCase());
        }),
        (this.renderProjects = () => {
          document.getElementById(`${this.status}-projects-list`).innerHTML =
            "";
          for (const t of this.itemArr)
            new a(this.element.querySelector("ul").id, t);
        }),
        (this.itemArr = []),
        this.configure(),
        this.renderContent();
    }
    dragOverHandler(t) {
      t.dataTransfer &&
        "text/plain" === t.dataTransfer.types[0] &&
        (t.preventDefault(),
        this.element.querySelector("ul").classList.add("droppable"));
    }
    dragLeaveHandler(t) {
      this.element.querySelector("ul").classList.remove("droppable");
    }
    dropHandler(t) {
      const s = t.dataTransfer.getData("text/plain"),
        i = "active" === this.status ? e.Active : e.Finished;
      r.moveProject(s, i);
    }
  }
  new (class extends t {
    constructor() {
      super("project-input", "app", !0, "user-input"),
        (this.userInput = () => {
          const t = this.titleInput.value,
            e = this.descriptionInput.value,
            s = this.peopleInput.value;
          return 0 === t.trim().length ||
            0 === e.trim().length ||
            0 === s.trim().length
            ? void alert("error")
            : [t, e, parseInt(s)];
        }),
        (this.clearInput = () => {
          (this.titleInput.value = ""),
            (this.descriptionInput.value = ""),
            (this.peopleInput.value = "");
        }),
        (this.submitHendler = (t) => {
          t.preventDefault();
          const e = this.userInput();
          if (Array.isArray(e)) {
            const [t, s, i] = e;
            r.addProject(t, s, i);
          }
          this.clearInput();
        }),
        (this.renderContent = () => {}),
        (this.configure = () => {
          this.element.addEventListener(
            "submit",
            this.submitHendler.bind(this)
          );
        }),
        (this.titleInput = this.element.querySelector("#title")),
        (this.descriptionInput = this.element.querySelector("#description")),
        (this.peopleInput = this.element.querySelector("#people")),
        this.renderContent(),
        this.configure();
    }
  })(),
    new o("active"),
    new o("finished");
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q3RELEtBQUsrRSxpQkFBbUIvRSxLQUFLRyxRQUFRbUQsY0FDbkMsZ0JBRUZ0RCxLQUFLZ0YsWUFBY2hGLEtBQUtHLFFBQVFtRCxjQUM5QixXQUdGdEQsS0FBS3FELGdCQUNMckQsS0FBS2tELFdBQ1AsR0RURixJQUFJTyxFQUFZLFVBQ2hCLElBQUlBLEVBQVksVyIsInNvdXJjZXMiOlsid2VicGFjazovL3RzLWJsb2NrY2hhaW4vLi9EcmFnUHJvamVjdC9Qcm9qZWN0L2NvbXBvbmVudC50cyIsIndlYnBhY2s6Ly90cy1ibG9ja2NoYWluLy4vRHJhZ1Byb2plY3QvbW9kZWwvaW5wdXRUeXBlLnRzIiwid2VicGFjazovL3RzLWJsb2NrY2hhaW4vLi9EcmFnUHJvamVjdC9Qcm9qZWN0L3N0YXRlLnRzIiwid2VicGFjazovL3RzLWJsb2NrY2hhaW4vLi9EcmFnUHJvamVjdC9Qcm9qZWN0L2l0ZW0udHMiLCJ3ZWJwYWNrOi8vdHMtYmxvY2tjaGFpbi8uL0RyYWdQcm9qZWN0L1Byb2plY3QvbGlzdC50cyIsIndlYnBhY2s6Ly90cy1ibG9ja2NoYWluLy4vRHJhZ1Byb2plY3QvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vdHMtYmxvY2tjaGFpbi8uL0RyYWdQcm9qZWN0L1Byb2plY3QvaW5wdXQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy9Qcm9qZWN0TGlzdOyZgCBQcm9qZWN0SW5wdXTsnZgg6rO17Ya16riw64qlIOq0gOumrFxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQ29tcG9uZW50PFQgZXh0ZW5kcyBIVE1MRWxlbWVudCwgVSBleHRlbmRzIEhUTUxFbGVtZW50PiB7XHJcbiAgdGVtcGxhdGVFbGVtZW50OiBIVE1MVGVtcGxhdGVFbGVtZW50O1xyXG4gIGhvc3RFbGVtZW50OiBUOyAvL+uenOuNlOungSDtlaDqs7NcclxuICBlbGVtZW50OiBVOyAvL+uenOuNlOungSDtlaDqsoNcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICB0ZW1wbGF0ZUlkOiBzdHJpbmcsIC8vdGVtcGxhdGXsnZggaWRcclxuICAgIGhvc3RFbGVtZW50SWQ6IHN0cmluZywgLy/sg53shLHrkKAg7JqU7IaM7J2YIOu2gOuqqOydmCBpZFxyXG4gICAgaW5zZXJ0OiBib29sZWFuLCAvLyBhZnRlcmJlZ2luIG9yIGJlZm9yZWVuZFxyXG4gICAgbmV3RWxlbWVudElkPzogc3RyaW5nIC8v7IOd7ISx65CgIOyalOyGjOydmCBpZFxyXG4gICkge1xyXG4gICAgdGhpcy50ZW1wbGF0ZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcclxuICAgICAgdGVtcGxhdGVJZFxyXG4gICAgKSEgYXMgSFRNTFRlbXBsYXRlRWxlbWVudDtcclxuICAgIHRoaXMuaG9zdEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChob3N0RWxlbWVudElkKSEgYXMgVDtcclxuICAgIC8vICEgPiBudWxs7KGw6rG0IOyZhO2ZlCwg6rCS7J20IOyeiOuLpOuKlOqyg+ydhCDsoITri6xcclxuICAgIC8vIO2DgOyeheuzgOqyveydhCDthrXtlbQgbnVsbOydtCDslYTri4jrnbzripTqsoPsnYQg67O07J6lXHJcblxyXG4gICAgLy9kb2N1bWVudC5pbXBvcnROb2RlXHJcbiAgICAvL+2YhOyerCDrrLjshJzqsIAg7JWE64uMIOyZuOu2gCDrrLjshJzsnZgg64W465Oc66W8IOuzteyCrO2VmOyXrCDtmITsnqwg66y47ISc7JeQIOuEo+ydjFxyXG4gICAgLy90cnVl7IucIOyekOyLneyalOyGjOulvCDtj6ztlajtlZjsl6wg6rCA7KC47Ji0XHJcbiAgICBjb25zdCBpbXBvcnROb2RlID0gZG9jdW1lbnQuaW1wb3J0Tm9kZSh0aGlzLnRlbXBsYXRlRWxlbWVudC5jb250ZW50LCB0cnVlKTtcclxuXHJcbiAgICAvL3RlbXBsYXRl7J2YIOyyq+uyiOynuCDsnpDsi53rhbjrk5xcclxuICAgIHRoaXMuZWxlbWVudCA9IGltcG9ydE5vZGUuZmlyc3RFbGVtZW50Q2hpbGQgYXMgVTtcclxuICAgIGlmIChuZXdFbGVtZW50SWQpIHtcclxuICAgICAgdGhpcy5lbGVtZW50LmlkID0gbmV3RWxlbWVudElkO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYXR0YWN0aChpbnNlcnQpO1xyXG4gIH1cclxuXHJcbiAgLy90ZW1wbGF0ZeulvCBkb23sl5Ag656c642U66eBXHJcbiAgLy9pbnNlcnRBZGphY2VudEVsZW1lbnRcclxuICAvL2lubmVySFRNTOuztOuLpCDruaDrpbTrqbAg7JqU7IaM66W8IOyerOu2hOyEne2VmOyngCDslYrqs6Ag64K067aA7J2YIOq4sOyhtCDsmpTshozrpbwg67Cp7ZW07ZWY7KeAIOyViuydjFxyXG4gIC8vYmVmb3JlZW5kID4gZWxlbWVudCDslYjsl5Ag6rCA7J6lIOuniOyngOuniSBjaGlsZFxyXG4gIC8vYWZ0ZXJiZWdpbiA+IGVsZW1lbnQg7JWI7JeQIOqwgOyepSDssqvrsojsp7ggY2hpbGRcclxuICBwcml2YXRlIGF0dGFjdGggPSAoaW5zZXJ0OiBib29sZWFuKSA9PiB7XHJcbiAgICB0aGlzLmhvc3RFbGVtZW50Lmluc2VydEFkamFjZW50RWxlbWVudChcclxuICAgICAgaW5zZXJ0ID8gXCJhZnRlcmJlZ2luXCIgOiBcImJlZm9yZWVuZFwiLFxyXG4gICAgICB0aGlzLmVsZW1lbnRcclxuICAgICk7XHJcbiAgfTtcclxuXHJcbiAgYWJzdHJhY3QgY29uZmlndXJlKCk6IHZvaWQ7XHJcbiAgYWJzdHJhY3QgcmVuZGVyQ29udGVudCgpOiB2b2lkO1xyXG59XHJcbiIsImV4cG9ydCBlbnVtIFByb2plY3RTdGF0dXMge1xyXG4gIEFjdGl2ZSxcclxuICBGaW5pc2hlZCxcclxufVxyXG5cclxuLy9wcm9qZWN0IHR5cGUgY2xhc3NcclxuLy/snoXroKXtlZwg6rCS7J2EIO2BtOuemOyKpOuhnCDqtIDrpqxcclxuZXhwb3J0IGNsYXNzIFByb2plY3RUeXBlIHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHB1YmxpYyBpZDogc3RyaW5nLFxyXG4gICAgcHVibGljIHRpdGxlOiBzdHJpbmcsXHJcbiAgICBwdWJsaWMgZGVzY3JpcHRpb246IHN0cmluZyxcclxuICAgIHB1YmxpYyBwZW9wbGU6IG51bWJlcixcclxuICAgIHB1YmxpYyBzdGF0dXM6IFByb2plY3RTdGF0dXNcclxuICApIHt9XHJcbn1cclxuIiwiaW1wb3J0IHsgUHJvamVjdFR5cGUgfSBmcm9tIFwiLi8uLi9tb2RlbC9pbnB1dFR5cGVcIjtcclxuaW1wb3J0IHsgUHJvamVjdFN0YXR1cyB9IGZyb20gXCIuLi9tb2RlbC9pbnB1dFR5cGVcIjtcclxuXHJcbnR5cGUgTGlzdGVuZXJGdW5jPFQ+ID0gKGl0ZW06IFRbXSkgPT4gdm9pZDtcclxuXHJcbmNsYXNzIFN0YXRlPFQ+IHtcclxuICAvL1Byb2plY3RMaXN07JeQ7IScIOuwm+ydgCDtlajsiJgsIOyDneyEseuQnCBQcm9qZWN0TGlzdOunjO2BvCDstpTqsIDrkKhcclxuICBwcm90ZWN0ZWQgbGlzdGVuZXJGdW5jOiBMaXN0ZW5lckZ1bmM8VD5bXSA9IFtdO1xyXG5cclxuICBhZGRMaXN0ZW5lciA9IChsaXN0ZW5lckZ1bmM6IExpc3RlbmVyRnVuYzxUPikgPT4ge1xyXG4gICAgLy9hY3RpduyZgCBmaW5pc2hlZCDrkZDqsJzsnZgg7YG0656Y7Iqk6rCAIOyDneyEseuQmOyWtCDrkZDrsogg7Zi47LacXHJcbiAgICAvL1Byb2plY3RMaXN07J2YIGFzc2lnbmUoKSAxODBcclxuICAgIHRoaXMubGlzdGVuZXJGdW5jLnB1c2gobGlzdGVuZXJGdW5jKTtcclxuICB9O1xyXG59XHJcblxyXG4vL3N0YXRlIG1hbmFnZSBjbGFzc1xyXG4vL+2VreuqqeyXkCDstpTqsIDrkKAg66as7Iqk7Yq466W8IOq0gOumrFxyXG5leHBvcnQgY2xhc3MgUHJvamVjdFN0YXRlIGV4dGVuZHMgU3RhdGU8UHJvamVjdFR5cGU+IHtcclxuICBwcml2YXRlIHByb2plY3RzOiBQcm9qZWN0VHlwZVtdID0gW107IC8vW3RpdGxlLCBkZXNjLCBwZW9wbGVd66GcIOq1rOyEseuQnCDtipztlIxcclxuICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogUHJvamVjdFN0YXRlO1xyXG5cclxuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcblxyXG4gIC8vbWV0aG9kLy9cclxuICAvL3NpbmdsZXRvblxyXG4gIHN0YXRpYyBnZXRJbnN0YW5jZSA9ICgpID0+IHtcclxuICAgIGlmICh0aGlzLmluc3RhbmNlKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5pbnN0YW5jZSA9IG5ldyBQcm9qZWN0U3RhdGUoKTtcclxuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gICAgLy/sg53shLHsnbQg65CY7Ja07J6I64uk66m0IOq3uOuMgOuhnCDrpqzthLQg7JeG7Jy866m0IOyDneyEsVxyXG4gICAgLy/smbjrtoDsl5DshJwg7YG0656Y7IqkIOyDneyEseu2iOqwgFxyXG4gIH07XHJcblxyXG4gIC8v7J6F66Cl67Cb7J2AIOqwkuuTpOydhCDtgbTrnpjsiqTrpbwg66eM65Ok7Ja0IOyggOyepVxyXG4gIGFkZFByb2plY3QgPSAodGl0bGU6IHN0cmluZywgZGVzY3JpcHRpb246IHN0cmluZywgcGVvcGxlOiBudW1iZXIpID0+IHtcclxuICAgIGNvbnN0IG5ld1Byb2plY3QgPSBuZXcgUHJvamVjdFR5cGUoXHJcbiAgICAgIFN0cmluZyhuZXcgRGF0ZSgpLmdldFRpbWUoKSksXHJcbiAgICAgIHRpdGxlLFxyXG4gICAgICBkZXNjcmlwdGlvbixcclxuICAgICAgcGVvcGxlLFxyXG4gICAgICBQcm9qZWN0U3RhdHVzLkFjdGl2ZVxyXG4gICAgKTtcclxuICAgIHRoaXMucHJvamVjdHMucHVzaChuZXdQcm9qZWN0KTtcclxuICAgIHRoaXMudXBkYXRlTGlzdGVuZXIoKTtcclxuICB9O1xyXG5cclxuICBtb3ZlUHJvamVjdCA9IChwcm9qZWN0SWQ6IHN0cmluZywgbmV3U3RhdHVzOiBQcm9qZWN0U3RhdHVzKSA9PiB7XHJcbiAgICBjb25zdCBwcm9qZWN0ID0gdGhpcy5wcm9qZWN0cy5maW5kKChpdGVtKSA9PiBpdGVtLmlkID09PSBwcm9qZWN0SWQpO1xyXG4gICAgaWYgKHByb2plY3QgJiYgcHJvamVjdC5zdGF0dXMgIT09IG5ld1N0YXR1cykge1xyXG4gICAgICBwcm9qZWN0LnN0YXR1cyA9IG5ld1N0YXR1cztcclxuICAgICAgdGhpcy51cGRhdGVMaXN0ZW5lcigpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHByaXZhdGUgdXBkYXRlTGlzdGVuZXIgPSAoKSA9PiB7XHJcbiAgICAvL1Byb2plY3RMaXN07JeQ7IScIOyLpOygnOuhnCBET03sl5Ag656c642U66eB7J2EIO2VtOykjFxyXG4gICAgZm9yIChjb25zdCBsaXN0ZW5lckZ1bmMgb2YgdGhpcy5saXN0ZW5lckZ1bmMpIHtcclxuICAgICAgLy9mb3Igb2brrLggPiDrsJvsnYAg67Cw7Je07J2YIOqwkuydhCDsiJztmZgsIOuwsOyXtOyXkOunjCDsgqzsmqnqsIDriqVcclxuICAgICAgLy9mb3IgaW7rrLggPiDqsJ3ssrTrpbwg7Iic7ZmYLCDrsLDsl7TsnYQg67Cb7J2E7IucIOuwsOyXtOydmCBpbmRleOy2nOugpVxyXG4gICAgICAvL1Byb2plY3RMaXN07YG0656Y7Iqk7J2YIGFzc2lnbmXtlajsiJhcclxuICAgICAgbGlzdGVuZXJGdW5jKHRoaXMucHJvamVjdHMuc2xpY2UoKSk7XHJcbiAgICB9XHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHByb2plY3RTdGF0ZSA9IFByb2plY3RTdGF0ZS5nZXRJbnN0YW5jZSgpO1xyXG4iLCJpbXBvcnQgeyBEcmFnQWJsZSB9IGZyb20gXCIuLi9tb2RlbC9kcmFnRHJvcFwiO1xyXG5pbXBvcnQgeyBQcm9qZWN0VHlwZSB9IGZyb20gXCIuLi9tb2RlbC9pbnB1dFR5cGVcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50XCI7XHJcblxyXG4vL1Byb2plY3RJdGVtIENsYXNzXHJcbi8v7J6F66Cl6rCS7J2EIOumrOyKpO2KuOyXkCDstpTqsIDtlZjsl6wg656c642U66eB7ZWgIO2BtOuemOyKpFxyXG5leHBvcnQgY2xhc3MgUHJvamVjdEl0ZW1cclxuICBleHRlbmRzIENvbXBvbmVudDxIVE1MVUxpc3RFbGVtZW50LCBIVE1MTElFbGVtZW50PlxyXG4gIGltcGxlbWVudHMgRHJhZ0FibGVcclxue1xyXG4gIHByaXZhdGUgcHJvamVjdDogUHJvamVjdFR5cGU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGhvc3RJZDogc3RyaW5nLCBwcm9qZWN0OiBQcm9qZWN0VHlwZSkge1xyXG4gICAgLy9ob3N0SWQgPiBhY3RpdmUtcHJvamVjdHMgb3IgZmluaXNoZWQtcHJvamVjdFxyXG4gICAgc3VwZXIoXCJzaW5nbGUtcHJvamVjdFwiLCBob3N0SWQsIHRydWUsIHByb2plY3QuaWQpO1xyXG4gICAgdGhpcy5wcm9qZWN0ID0gcHJvamVjdDtcclxuXHJcbiAgICB0aGlzLmNvbmZpZ3VyZSgpO1xyXG4gICAgdGhpcy5yZW5kZXJDb250ZW50KCk7XHJcbiAgfVxyXG5cclxuICBkcmFnU3RhcnRIYW5kbGVyID0gKGU6IERyYWdFdmVudCkgPT4ge1xyXG4gICAgLy/rs7TsnbTsp4Ag7JWK64qU6rOz7JeQIOuTnOuemOq3uOykkSDrjbDsnbTthLDrpbwg7J6E7Iuc66GcIOyggOyepVxyXG4gICAgLy/rk5zroa3snbQg67Cc7IOd7ZWY66m0IOydtOuypO2KuCDrsJzsg51cclxuICAgIGUuZGF0YVRyYW5zZmVyIS5zZXREYXRhKFwidGV4dC9wbGFpblwiLCB0aGlzLnByb2plY3QuaWQpO1xyXG4gICAgZS5kYXRhVHJhbnNmZXIhLmVmZmVjdEFsbG93ZWQgPSBcIm1vdmVcIjtcclxuICAgIC8v65Oc66Gt7IucIOybkOuemCDsnqXshozsl5DshJwg7KCc6rGw7ZWY6rOgIOyDiOuhnOyatCDsnqXshozsl5Ag7LaU6rCA7ZWoXHJcbiAgfTtcclxuICBkcmFnRW5kSGFuZGxlciA9IChlOiBEcmFnRXZlbnQpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKFwiRHJvcFwiKTtcclxuICB9O1xyXG5cclxuICAvL+yDneyEseuQnCDrpqzsiqTtirjsl5Ag65Oc656Y6re4IOydtOuypO2KuCDstpTqsIAsIGxp7YOc6re47JeQIGRyYWdnYWJsZSDsho3shLEg7LaU6rCAXHJcbiAgY29uZmlndXJlID0gKCkgPT4ge1xyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXHJcbiAgICAgIFwiZHJhZ3N0YXJ0XCIsXHJcbiAgICAgIHRoaXMuZHJhZ1N0YXJ0SGFuZGxlci5iaW5kKHRoaXMpXHJcbiAgICApO1xyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnZW5kXCIsIHRoaXMuZHJhZ0VuZEhhbmRsZXIuYmluZCh0aGlzKSk7XHJcbiAgfTtcclxuXHJcbiAgcmVuZGVyQ29udGVudCA9ICgpID0+IHtcclxuICAgIC8v656c642U66eB7ZWgIOuqqeuhnVxyXG4gICAgLy9lbGVtZW50ID4g67aA66qoIOuFuOuTnOydmCBpZCA+IGFjdGl2ZS1wcm9qZWN0cyBvciBmaW5pc2hlZC1wcm9qZWN0XHJcbiAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcImgyXCIpIS50ZXh0Q29udGVudCA9IGAke1xyXG4gICAgICB0aGlzLnByb2plY3QudGl0bGVcclxuICAgIH0gJHt0aGlzLnByb2plY3QucGVvcGxlLnRvU3RyaW5nKCl966qFYDtcclxuICAgIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwicFwiKSEudGV4dENvbnRlbnQgPSB0aGlzLnByb2plY3QuZGVzY3JpcHRpb247XHJcbiAgfTtcclxufVxyXG4iLCJpbXBvcnQgeyBQcm9qZWN0SXRlbSB9IGZyb20gXCIuL2l0ZW1cIjtcclxuaW1wb3J0IHsgcHJvamVjdFN0YXRlIH0gZnJvbSBcIi4vc3RhdGVcIjtcclxuaW1wb3J0IHsgRHJhZ1RhcmdldCB9IGZyb20gXCIuLi9tb2RlbC9kcmFnRHJvcFwiO1xyXG5pbXBvcnQgeyBQcm9qZWN0VHlwZSwgUHJvamVjdFN0YXR1cyB9IGZyb20gXCIuLi9tb2RlbC9pbnB1dFR5cGVcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50XCI7XHJcblxyXG4vL1Byb2plY3RMaXN0IENsYXNzXHJcbi8vYWN0aXZlLCBmaW5pc2hlZCDsubTthYzqs6Drpqwg7IOd7ISxXHJcbmV4cG9ydCBjbGFzcyBQcm9qZWN0TGlzdFxyXG4gIGV4dGVuZHMgQ29tcG9uZW50PEhUTUxEaXZFbGVtZW50LCBIVE1MRWxlbWVudD5cclxuICBpbXBsZW1lbnRzIERyYWdUYXJnZXRcclxue1xyXG4gIGl0ZW1BcnI6IFByb2plY3RUeXBlW107XHJcbiAgLy9ET03sl5Ag656c642U66eB7ZWgIOuNsOydtO2EsFxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN0YXR1czogXCJhY3RpdmVcIiB8IFwiZmluaXNoZWRcIikge1xyXG4gICAgc3VwZXIoXCJwcm9qZWN0LWxpc3RcIiwgXCJhcHBcIiwgZmFsc2UsIGAke3N0YXR1c30tcHJvamVjdHNgKTtcclxuICAgIHRoaXMuaXRlbUFyciA9IFtdO1xyXG5cclxuICAgIHRoaXMuY29uZmlndXJlKCk7XHJcbiAgICB0aGlzLnJlbmRlckNvbnRlbnQoKTtcclxuICB9XHJcbiAgLy/rk5zroa0g6rCA64ql7ZWcIOychOy5mOyXkCDri7/slZjsnYTrlYwg67Cc7IOdXHJcbiAgZHJhZ092ZXJIYW5kbGVyKGU6IERyYWdFdmVudCkge1xyXG4gICAgaWYgKGUuZGF0YVRyYW5zZmVyICYmIGUuZGF0YVRyYW5zZmVyLnR5cGVzWzBdID09PSBcInRleHQvcGxhaW5cIikge1xyXG4gICAgICAvL+ydtOuypO2KuOqwgCDrsJzsg50g6rCA64ql7ZWc7KeAIOyytO2BrCwgdGV4dC9wbGFpbuunjCDtl4jsmqksIOuLpOuluCDtj6zrqafsnYAg67aI6rCAXHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgY29uc3QgbGlzdCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwidWxcIikhO1xyXG4gICAgICBsaXN0LmNsYXNzTGlzdC5hZGQoXCJkcm9wcGFibGVcIik7XHJcbiAgICB9XHJcbiAgfVxyXG4gIC8v65Oc656Y6re4IOyVhOybgyDsi5wg7J2067Kk7Yq4IOuwnOyDnVxyXG4gIGRyYWdMZWF2ZUhhbmRsZXIoZTogRHJhZ0V2ZW50KSB7XHJcbiAgICBjb25zdCBsaXN0ID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJ1bFwiKSE7XHJcbiAgICBsaXN0LmNsYXNzTGlzdC5yZW1vdmUoXCJkcm9wcGFibGVcIik7XHJcbiAgfVxyXG5cclxuICAvL+uTnOuhreyLnCDsnbTrsqTtirgg67Cc7IOdXHJcbiAgZHJvcEhhbmRsZXIoZTogRHJhZ0V2ZW50KSB7XHJcbiAgICAvL+uTnOuemOq3uCDsi5zsnpHsi5wg642w7J207YSw66GcIOykrOuNmCDrk5zrnpjqt7jtlZwgbGlzdOydmCBpZFxyXG4gICAgY29uc3QgbGlzdElkID0gZS5kYXRhVHJhbnNmZXIhLmdldERhdGEoXCJ0ZXh0L3BsYWluXCIpO1xyXG4gICAgY29uc3Qgc3RhdHVzID1cclxuICAgICAgdGhpcy5zdGF0dXMgPT09IFwiYWN0aXZlXCIgPyBQcm9qZWN0U3RhdHVzLkFjdGl2ZSA6IFByb2plY3RTdGF0dXMuRmluaXNoZWQ7XHJcbiAgICAvL+uenOuNlOungeuQnCDtlITroZzsoJ3tirgg66as7Iqk7Yq47J2YIOyDge2DnOulvCDrhJjqsqjspIxcclxuICAgIHByb2plY3RTdGF0ZS5tb3ZlUHJvamVjdChsaXN0SWQsIHN0YXR1cyk7XHJcbiAgfVxyXG5cclxuICBjb25maWd1cmUgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdvdmVyXCIsIHRoaXMuZHJhZ092ZXJIYW5kbGVyLmJpbmQodGhpcykpO1xyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkcm9wXCIsIHRoaXMuZHJvcEhhbmRsZXIuYmluZCh0aGlzKSk7XHJcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgXCJkcmFnbGVhdmVcIixcclxuICAgICAgdGhpcy5kcmFnTGVhdmVIYW5kbGVyLmJpbmQodGhpcylcclxuICAgICk7XHJcbiAgICBwcm9qZWN0U3RhdGUuYWRkTGlzdGVuZXIodGhpcy5hc3NpZ25lKTtcclxuICB9O1xyXG5cclxuICBwcml2YXRlIGFzc2lnbmUgPSAocHJvamVjdHM6IFByb2plY3RUeXBlW10pID0+IHtcclxuICAgIC8vIHByb2plY3RzID4gUHJvamVjdFN0YXRl7JeQ7IScIOuztOuCtOykgCDsnoXroKXqsJIg642w7J207YSwXHJcbiAgICBjb25zdCBwcm9qZWN0RmlsbHRlciA9IHByb2plY3RzLmZpbHRlcigocHJvamVjdHMpID0+IHtcclxuICAgICAgLy9hY3RpdmUsIGZpbmlzaGVkIOyDge2DnCDtlYTthLDrp4FcclxuICAgICAgaWYgKHRoaXMuc3RhdHVzID09PSBcImFjdGl2ZVwiKSB7XHJcbiAgICAgICAgLy9hY3RpdmUg7YG0656Y7Iqk7J28IOqyveyasFxyXG4gICAgICAgIC8v7IOB7YOc6rCAIGFjdGl2ZeyduCDrjbDsnbTthLDrp4wg64Ko6rmAXHJcbiAgICAgICAgcmV0dXJuIHByb2plY3RzLnN0YXR1cyA9PT0gUHJvamVjdFN0YXR1cy5BY3RpdmU7XHJcbiAgICAgIH1cclxuICAgICAgLy9maW5pc2hlZCDtgbTrnpjsiqTsnbwg6rK97JqwXHJcbiAgICAgIC8v7IOB7YOc6rCAIGZpbmlzaGVk7J24IOuNsOydtO2EsOunjCDrgqjquYBcclxuICAgICAgcmV0dXJuIHByb2plY3RzLnN0YXR1cyA9PT0gUHJvamVjdFN0YXR1cy5GaW5pc2hlZDtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5pdGVtQXJyID0gcHJvamVjdEZpbGx0ZXI7XHJcbiAgICB0aGlzLnJlbmRlclByb2plY3RzKCk7XHJcbiAgfTtcclxuXHJcbiAgcmVuZGVyQ29udGVudCA9ICgpID0+IHtcclxuICAgIC8vdGVtcGxhdGXsnZgg7JqU7IaM7J2YIOqwkuydhCDstpTqsIBcclxuICAgIGNvbnN0IGxpc3RJZCA9IGAke3RoaXMuc3RhdHVzfS1wcm9qZWN0cy1saXN0YDtcclxuICAgIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwidWxcIikhLmlkID0gbGlzdElkOyAvL3Vs7J2YIGlk7J6F66ClXHJcbiAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcImgyXCIpIS50ZXh0Q29udGVudCA9XHJcbiAgICAgIHRoaXMuc3RhdHVzLnRvTG9jYWxlVXBwZXJDYXNlKCk7IC8v7YG0656Y7IqkIOyDneyEseyLnCDsnoXroKXrkJwg6rCSXHJcbiAgfTtcclxuXHJcbiAgcHJpdmF0ZSByZW5kZXJQcm9qZWN0cyA9ICgpID0+IHtcclxuICAgIGNvbnN0IGxpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcclxuICAgICAgYCR7dGhpcy5zdGF0dXN9LXByb2plY3RzLWxpc3RgXHJcbiAgICApISBhcyBIVE1MVUxpc3RFbGVtZW50O1xyXG4gICAgbGlzdC5pbm5lckhUTUwgPSBcIlwiOyAvL2Ryb3DroZwg7J2064+Z7IucIOq4sOyhtOychOy5mOydmCDrpqzsiqTtirjripQg67mE7JuM7KeQXHJcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdGhpcy5pdGVtQXJyKSB7XHJcbiAgICAgIG5ldyBQcm9qZWN0SXRlbSh0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcInVsXCIpIS5pZCwgaXRlbSk7XHJcbiAgICB9XHJcbiAgfTtcclxufVxyXG4iLCIvL1Byb2plY3RJbnB1dOyXkOyEnCDqsJIg7J6F66Cl7ZuEIOuyhO2KvO2BtOumrSA+XHJcbi8vUHJvamVjdFN0YXRl7JeQ7IScIOyghOuLrCDrsJvsnYAg642w7J207YSw66W8IOuLpOyLnCDsoITri6wgPlxyXG4vL1Byb2plY3RMaXN07JeQ7IScIOuenOuNlOungVxyXG5cclxuLy9FU+uqqOuTiCDrsKnsi53snYAg7LWc7IugIOu4jOudvOyasOyggOyXkOyEnOunjCDsnpHrj5ntlahcclxuLy/qtaztmJUg67iM65287Jqw7KCA7JeQ7IScIOyCrOyaqeyLnCBidW5kaW5nIHRvb2wg7IKs7JqpID4gd2VicGFja+ydhCDsgqzsmqntlbQg7ZWY64KY7J2YIEpT7YyM7J2866GcIOustuydjFxyXG4vL3dlYnBhY2vsnYQg7Ya17ZWY7JesIOy9lOuTnOulvCDtlZjrgpjroZwg66y27J2M7Jy866Gc7I2oIGh0dHDsmpTssq3snbQg7KSE7Ja065OsID4gaW1wb3J06rCAIOyXhuyWtOynkFxyXG4vL2ltcG9ydO2VnCDtjIzsnbzsnZgg7ZmV7J6l7J6Q66W8IOyekOuPmeycvOuhnCDssL7snYxcclxuXHJcbi8vaW1wb3J0ICogYXMgVGVzdCBmcm9tIFwiLi90ZXN0LmpzXCIgLy90ZXN0Lmpz7J2YIOuqqOuToCBleHBvcnTrpbwg6rCA7KC47Ji0IFRlc3QuKG5hbWUp7Jy866GcIOygkeq3vOqwgOuKpVxyXG4vL2ltcG9ydCB7dGVzdCBhcyBUZXN0fSBcIi4vdGVzdC5qc1wiXHJcblxyXG5pbXBvcnQgeyBQcm9qZWN0SW5wdXQgfSBmcm9tIFwiLi9Qcm9qZWN0L2lucHV0XCI7XHJcbmltcG9ydCB7IFByb2plY3RMaXN0IH0gZnJvbSBcIi4vUHJvamVjdC9saXN0XCI7XHJcblxyXG5uZXcgUHJvamVjdElucHV0KCk7XHJcbm5ldyBQcm9qZWN0TGlzdChcImFjdGl2ZVwiKTtcclxubmV3IFByb2plY3RMaXN0KFwiZmluaXNoZWRcIik7XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBwcm9qZWN0U3RhdGUgfSBmcm9tIFwiLi9zdGF0ZVwiO1xyXG5cclxuLy9pbnB1dCBjbGFzc1xyXG4vL+yeheugpSDsubTthYzqs6Drpqwg7IOd7ISxXHJcbmV4cG9ydCBjbGFzcyBQcm9qZWN0SW5wdXQgZXh0ZW5kcyBDb21wb25lbnQ8SFRNTERpdkVsZW1lbnQsIEhUTUxGb3JtRWxlbWVudD4ge1xyXG4gIHRpdGxlSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgZGVzY3JpcHRpb25JbnB1dDogSFRNTElucHV0RWxlbWVudDtcclxuICBwZW9wbGVJbnB1dDogSFRNTElucHV0RWxlbWVudDtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcihcInByb2plY3QtaW5wdXRcIiwgXCJhcHBcIiwgdHJ1ZSwgXCJ1c2VyLWlucHV0XCIpO1xyXG5cclxuICAgIC8v7ZW064u5IElE6rCAIGlucHV0RWxlbWVudOyduOqyg+ydhCDrs7TsnqXtlZjquLDsnITtlbQg7ZiV67OA7ZmYIO2VhOyalFxyXG4gICAgLy9mb3Jt7J2YIOyekOyLneuFuOuTnOyduCBpbnB1dOyXkCDsoJHqt7xcclxuICAgIHRoaXMudGl0bGVJbnB1dCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiI3RpdGxlXCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICB0aGlzLmRlc2NyaXB0aW9uSW5wdXQgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIjZGVzY3JpcHRpb25cIlxyXG4gICAgKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgdGhpcy5wZW9wbGVJbnB1dCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIiNwZW9wbGVcIlxyXG4gICAgKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG5cclxuICAgIHRoaXMucmVuZGVyQ29udGVudCgpO1xyXG4gICAgdGhpcy5jb25maWd1cmUoKTtcclxuICB9XHJcblxyXG4gIC8vbWV0aG9kLy9cclxuICBwcml2YXRlIHVzZXJJbnB1dCA9ICgpOiBbc3RyaW5nLCBzdHJpbmcsIG51bWJlcl0gfCB2b2lkID0+IHtcclxuICAgIC8vaW5wdXTsnZgg6rCS65Ok7J2EIOuqqOuRkCDqsIDsoLjsmLRcclxuICAgIGNvbnN0IHRpdGxlSW5wdXQgPSB0aGlzLnRpdGxlSW5wdXQudmFsdWU7XHJcbiAgICBjb25zdCBkZXNjcmlwdGlvbklucHV0ID0gdGhpcy5kZXNjcmlwdGlvbklucHV0LnZhbHVlO1xyXG4gICAgY29uc3QgcGVvcGxlSW5wdXQgPSB0aGlzLnBlb3BsZUlucHV0LnZhbHVlO1xyXG5cclxuICAgIGlmIChcclxuICAgICAgLy90cmltKCkg66y47J6Q7Je0IOyWkeuBneydmCDqs7XrsLEg7KCc6rGwXHJcbiAgICAgIHRpdGxlSW5wdXQudHJpbSgpLmxlbmd0aCA9PT0gMCB8fFxyXG4gICAgICBkZXNjcmlwdGlvbklucHV0LnRyaW0oKS5sZW5ndGggPT09IDAgfHxcclxuICAgICAgcGVvcGxlSW5wdXQudHJpbSgpLmxlbmd0aCA9PT0gMFxyXG4gICAgKSB7XHJcbiAgICAgIGFsZXJ0KFwiZXJyb3JcIik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBbdGl0bGVJbnB1dCwgZGVzY3JpcHRpb25JbnB1dCwgcGFyc2VJbnQocGVvcGxlSW5wdXQpXTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBwcml2YXRlIGNsZWFySW5wdXQgPSAoKSA9PiB7XHJcbiAgICB0aGlzLnRpdGxlSW5wdXQudmFsdWUgPSBcIlwiO1xyXG4gICAgdGhpcy5kZXNjcmlwdGlvbklucHV0LnZhbHVlID0gXCJcIjtcclxuICAgIHRoaXMucGVvcGxlSW5wdXQudmFsdWUgPSBcIlwiO1xyXG4gIH07XHJcblxyXG4gIHByaXZhdGUgc3VibWl0SGVuZGxlciA9IChlOiBFdmVudCkgPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIGNvbnN0IHVzZXJJbnB1dCA9IHRoaXMudXNlcklucHV0KCk7XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh1c2VySW5wdXQpKSB7XHJcbiAgICAgIGNvbnN0IFt0aXRsZSwgZGVzYywgcGVvcGxlXSA9IHVzZXJJbnB1dDtcclxuICAgICAgcHJvamVjdFN0YXRlLmFkZFByb2plY3QodGl0bGUsIGRlc2MsIHBlb3BsZSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmNsZWFySW5wdXQoKTtcclxuICB9O1xyXG5cclxuICByZW5kZXJDb250ZW50ID0gKCkgPT4ge307XHJcblxyXG4gIGNvbmZpZ3VyZSA9ICgpID0+IHtcclxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIHRoaXMuc3VibWl0SGVuZGxlci5iaW5kKHRoaXMpKTtcclxuICB9O1xyXG59XHJcbiJdLCJuYW1lcyI6WyJDb21wb25lbnQiLCJjb25zdHJ1Y3RvciIsInRlbXBsYXRlSWQiLCJob3N0RWxlbWVudElkIiwiaW5zZXJ0IiwibmV3RWxlbWVudElkIiwiYXR0YWN0aCIsInRoaXMiLCJob3N0RWxlbWVudCIsImluc2VydEFkamFjZW50RWxlbWVudCIsImVsZW1lbnQiLCJ0ZW1wbGF0ZUVsZW1lbnQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiaW1wb3J0Tm9kZSIsImNvbnRlbnQiLCJmaXJzdEVsZW1lbnRDaGlsZCIsImlkIiwiUHJvamVjdFN0YXR1cyIsIlByb2plY3RUeXBlIiwidGl0bGUiLCJkZXNjcmlwdGlvbiIsInBlb3BsZSIsInN0YXR1cyIsIlByb2plY3RTdGF0ZSIsImxpc3RlbmVyRnVuYyIsImFkZExpc3RlbmVyIiwicHVzaCIsInN1cGVyIiwicHJvamVjdHMiLCJhZGRQcm9qZWN0IiwibmV3UHJvamVjdCIsIlN0cmluZyIsIkRhdGUiLCJnZXRUaW1lIiwiQWN0aXZlIiwidXBkYXRlTGlzdGVuZXIiLCJtb3ZlUHJvamVjdCIsInByb2plY3RJZCIsIm5ld1N0YXR1cyIsInByb2plY3QiLCJmaW5kIiwiaXRlbSIsInNsaWNlIiwiZ2V0SW5zdGFuY2UiLCJpbnN0YW5jZSIsInByb2plY3RTdGF0ZSIsIlByb2plY3RJdGVtIiwiaG9zdElkIiwiZHJhZ1N0YXJ0SGFuZGxlciIsImUiLCJkYXRhVHJhbnNmZXIiLCJzZXREYXRhIiwiZWZmZWN0QWxsb3dlZCIsImRyYWdFbmRIYW5kbGVyIiwiY29uc29sZSIsImxvZyIsImNvbmZpZ3VyZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJiaW5kIiwicmVuZGVyQ29udGVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ0ZXh0Q29udGVudCIsInRvU3RyaW5nIiwiUHJvamVjdExpc3QiLCJkcmFnT3ZlckhhbmRsZXIiLCJkcm9wSGFuZGxlciIsImRyYWdMZWF2ZUhhbmRsZXIiLCJhc3NpZ25lIiwicHJvamVjdEZpbGx0ZXIiLCJmaWx0ZXIiLCJGaW5pc2hlZCIsIml0ZW1BcnIiLCJyZW5kZXJQcm9qZWN0cyIsImxpc3RJZCIsInRvTG9jYWxlVXBwZXJDYXNlIiwiaW5uZXJIVE1MIiwidHlwZXMiLCJwcmV2ZW50RGVmYXVsdCIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsImdldERhdGEiLCJ1c2VySW5wdXQiLCJ0aXRsZUlucHV0IiwidmFsdWUiLCJkZXNjcmlwdGlvbklucHV0IiwicGVvcGxlSW5wdXQiLCJ0cmltIiwibGVuZ3RoIiwiYWxlcnQiLCJwYXJzZUludCIsImNsZWFySW5wdXQiLCJzdWJtaXRIZW5kbGVyIiwiQXJyYXkiLCJpc0FycmF5IiwiZGVzYyJdLCJzb3VyY2VSb290IjoiIn0=
