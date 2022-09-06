var App;
(function (App) {
    var ProjectStatus;
    (function (ProjectStatus) {
        ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
        ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
    })(ProjectStatus = App.ProjectStatus || (App.ProjectStatus = {}));
    //project type class
    //입력한 값을 클래스로 관리
    var ProjectType = /** @class */ (function () {
        function ProjectType(id, title, description, people, status) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.people = people;
            this.status = status;
        }
        return ProjectType;
    }());
    App.ProjectType = ProjectType;
})(App || (App = {}));
