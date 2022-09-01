const words: Array<string> = [];

const promise: Promise<string> = new Promise((res, rej) => {
  setTimeout(() => {
    res("sueccess");
  }, 2000);
});

promise.then((data) => {
  data.split(" ");
});

// generic type
//타입을 자동으로 추론함
//타입 안전성과 유연성 제공
//extends 제약조건 추가, extends object > 내부의 요소를 무엇을 가지든 일단은 객체여야 함
const merge = <T extends object, G extends object>(a: T, b: G) => {
  return Object.assign(a, b); //오브젝트 병합
};

const newObj = merge<{ name: string; skill: string[] }, { age: number }>(
  { name: "A", skill: ["B"] },
  { age: 10 }
);
newObj.name;

interface Length {
  length: number;
}

//모든 value가 .length에 접근이 가능한지 증명이 불가능함
//제약사항을 추가하여 .length를 보장함
//.length를 사용가능한 string과 array타입만 파라미터로 전달 가능
const genericFunc = <T extends Length>(value: T): [T, string] => {
  let length = "not value";

  if (value.length > 0) {
    length = `${value.length}`;
  }

  return [value, length];
};

// console.log(genericFunc([1, 2, 3, 4]));

interface ToLowerCase {
  toLowerCase(): string;
}

const lower = <T extends ToLowerCase>(value: T) => {
  return console.log(value.toLowerCase());
};

// lower("T");

// key of
const genericFunc2 = <T extends object, U extends keyof T>(obj: T, key: U) => {
  //매개변수로 받은 객체에 입력받은 key가 있는지 확인이 필요함
  //T extends object > 첫번째 매개변수는 객체여야 한다
  //U extends keyof T > 두번째 매개변수는 첫번째 배개변수인 객체의 키값이여야 한다
  //obj는 객체고 key는 obj의 키값임을 보장함
  return obj[key];
};

// console.log(genericFunc2({ name: "TEST" }, "name"));

//제네릭 클래스
//
class ArrData<T extends string | number | boolean> {
  // 원시타입만 받게해서 참조타입을 받을시 오작동을 방지
  private data: T[] = [];
  // private data: string[] | number[] | boolean[] = [];

  addItem = (item: T) => {
    this.data.push(item);
  };

  // addItem = (item: string | number | boolean) => {
  //   this.data.push(item);
  // };

  //유니온 타입을 사용할경우 호출할때마다 타입을 선택해야됨
  //제네릭 타입을 사용할경우 클래스를 생성할때 타입을 선택함

  removeItem = (item: T) => {
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1);
  };

  getItems() {
    return [...this.data];
  }
}

const stringArr = new ArrData<string>();
const numberArr = new ArrData<number>();
//  const objArr = new ArrData<object>();
// objArr.addItem({ name: "A" });
// objArr.addItem({ name: "B" });

// objArr.removeItem()
// console.log(objArr.getItems());

const objTest1 = [{ name: "A" }, { age: "B" }];
objTest1.indexOf({ name: "A" });
// objTest1에서 값을 찾지못해서 -1을 반환함
// 같은 값처럼 보이지만 참조하는 주소가 달라서 찾지못함

const objData = { name: "A" };
const objTest2 = [objData, { age: "B" }];
objTest2.indexOf(objData);
// 값을 상수에 저장하면 같은 값을 참조하기 때문에 정상작동함

// 유틸리티 타입, TS에만 존재, JS 변환시 삭제
// Partial type
// Partial<type> type에 있는 모든 속성이 선택적인 타입이 됨
interface Person {
  name: string;
  age: number;
  time: Date;
}

const createPerson = (name: string, age: number, time: Date): Person => {
  const person: Partial<Person> = {};
  person.name = name;
  person.age = age;
  person.time = time;

  return person as Person;
  // person는 partial타입이지 일반 person타입이 아니기 때문에 형변환 필요
};
