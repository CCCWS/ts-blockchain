"use strict";
const unionAdd = (value1, value2) => {
    if (typeof value1 === "string" && typeof value2 === "string") {
        return `${value1} ${value2}`;
    }
    if (typeof value1 === "number" && typeof value2 === "number") {
        return value1 + value2;
    }
};
console.log(unionAdd("hello", "test"));
console.log(unionAdd(10, 10));
const literalAdd = (value1, value2, value3) => {
    if (typeof value1 === "number" &&
        typeof value2 === "number" &&
        value3 === "number") {
        return value1 + value2;
    }
    else {
        return `${value1} ${value2}`;
    }
};
console.log(literalAdd("hello", "test", "string"));
console.log(literalAdd(10, 10, "number"));
//# sourceMappingURL=union.js.map