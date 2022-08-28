"use strict";
const returnType = (value1, value2) => {
    return value1 + value2;
};
const printReturnType = (num) => {
    console.log(`result : ${num}`);
};
printReturnType(returnType(10, 10));
const funcValue = returnType;
console.log(funcValue(1, 2));
const retrunCB = (value1, value2, cb) => {
    cb(value1 + value2);
};
retrunCB(10, 10, (result) => {
    console.log(result);
});
function sendRequest(data, cb) {
    cb({ [data]: "Hi there!" });
}
sendRequest("Send this!", (response) => {
    console.log(response);
    return true;
});
//# sourceMappingURL=returnType.js.map