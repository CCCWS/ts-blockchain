//interface
//TS에만 있음. JS변환시 제거
//객체의 구조를 정의
//메소드의 세부 구조를 구현하지 않음
//추상 클래스의 경우 메소드의 세부 구조를 구현할 수 있음
interface Person {
  name: string;
  age: number;
  func1(value: string): void;
}

//동일한 인터페이스명으로 확장가능
interface Person {
  func2(value: string): void;
}

interface Person2 {
  func3(value: string): void;
}

let person: Person = {
  name: "A",
  age: 10,
  func1(value) {
    console.log(value);
  },
  func2(value) {
    console.log(value);
  },
};

class User implements Person, Person2 {
  //여러개의 인터페이스 상속가능
  public weight: number = 10;
  // 추가로 확장가능

  constructor(public name: string, public age: number) {}

  func1(value: string) {
    console.log(value);
  }

  func2(value: string) {
    console.log(value);
  }

  func3(value: string) {
    console.log(value);
  }
}

const user = new User("A", 10);
console.log(user);

//함수의 타입 정의
interface FuncInterface {
  (a: number, b: number): number;
}

const addFunc: FuncInterface = (a, b) => {
  return a + b;
};
