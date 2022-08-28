"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const myPackage_1 = require("./myPackage");
(0, myPackage_1.init)({
    url: "TEST",
    debug: true,
});
(0, myPackage_1.exit)(1);
const last = (arr) => {
    return arr[arr.length - 1];
};
const prepend = (arr, item) => {
    arr.unshift(item);
    return arr;
};
console.log(last([1, 2, 3, 4]));
console.log(prepend([2, 3, 4], 1));
//# sourceMappingURL=myPakage.js.map