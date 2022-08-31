const words: Array<string> = [];

const promise: Promise<string> = new Promise((res, rej) => {
  setTimeout(() => {
    res("sueccess");
  }, 2000);
});

promise.then((data) => {
  data.split(" ");
});

//타입을 자동으로 추론함
//extends 제약조건 추가, extends object > 내부의 요소를 무엇을 가지든 일단은 객체여야 함
const merge = <T extends object, G extends object>(a: T, b: G) => {
  return Object.assign(a, b); //오브젝트 병합
};

const newObj = merge<{ name: string; skill: string[] }, { age: number }>(
  { name: "A", skill: ["B"] },
  { age: 10 }
);
newObj.name;

//모든 value가 .length에 접근이 가능한지 증명이 불가능함

interface Length {
  length: number;
}

//제약사항을 추가하여 .length를 보장함
//.length를 사용가능한 string과 array타입만 파라미터로 전달 가능
const genericFunc = <T extends Length>(value: T): [T, string] => {
  let length = "not value";

  if (value.length > 0) {
    length = `${value.length}`;
  }

  return [value, length];
};

console.log(genericFunc([1, 2, 3, 4]));

interface ToLowerCase {
  toLowerCase(): string;
}

const lower = <T extends ToLowerCase>(value: T) => {
  return console.log(value.toLowerCase());
};

lower("T");
