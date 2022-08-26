//union타입
//or연산사로 여거래의 타입을 지정
type Value = string | number; //타입을 변수처럼 따로 지정 > type aliases

const unionAdd = (value1: Value, value2: Value) => {
  if (typeof value1 === "string" && typeof value2 === "string") {
    return `${value1} ${value2}`;
  }

  if (typeof value1 === "number" && typeof value2 === "number") {
    return value1 + value2;
  }
};

console.log(unionAdd("hello", "test"));
console.log(unionAdd(10, 10));

//literal타입
//타입에 특정 값을 지정
type WhatType = "string" | "number";

const literalAdd = (value1: Value, value2: Value, value3: WhatType) => {
  if (
    typeof value1 === "number" &&
    typeof value2 === "number" &&
    value3 === "number"
  ) {
    return value1 + value2;
  } else {
    return `${value1} ${value2}`;
  }
};

console.log(literalAdd("hello", "test", "string"));
console.log(literalAdd(10, 10, "number"));
