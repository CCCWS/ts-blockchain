"use strict";
let unknownValue;
let stringValue;
unknownValue = 5;
unknownValue = "TEST";
const neverFunc = (message, code) => {
    throw { message: message, error: code };
};
neverFunc("Error", 404);
//# sourceMappingURL=unknown_never.js.map