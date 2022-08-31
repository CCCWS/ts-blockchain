type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

//Intersection type
//두개의 타입을 병합
type ElevatedEmployee = Admin & Employee;

const person1: ElevatedEmployee = {
  name: "A",
  privileges: ["server"],
  startDate: new Date(),
};

//union type의 경우 공통된 타입만 사용가능
type StringNumber = string | number;
type NumberBoolean = number | boolean;
type CombineType = StringNumber & NumberBoolean;

const add = (a: StringNumber, b: StringNumber) => {
  if (typeof a === "string" || typeof b === "string") {
    //타입가드, union타입을 유연하게 사용가능
    return `${a} ${b}`;
  }
  return a + b;
};

type Person1 = {
  name: string;
  skill: string[];
};

type Person2 = {
  name: string;
  age: number;
};

type PersonInfo = Person1 | Person2;

const person = (person: PersonInfo) => {
  //두 타입의 중복요소는 바로 호출가능
  console.log(person.name);

  //'skill'이 person속성으로 있는지 확인
  if ("skill" in person) {
    console.log(person.skill);
  }

  if ("age" in person) {
    console.log(person.age);
  }
};

person({ name: "A", age: 1 });

export {};
