"use strict";
var Test1;
(function (Test1) {
    Test1["one"] = "ONE";
    Test1[Test1["two"] = 2] = "two";
    Test1["three"] = "THREE";
})(Test1 || (Test1 = {}));
console.log(Test1);
//# sourceMappingURL=Enum.js.map