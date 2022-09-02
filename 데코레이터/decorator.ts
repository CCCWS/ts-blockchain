// 데코레이터

// 데코레이터 팩토리
// 데코레이터 함수를 반환하여 매개변수를 받아서 사용
const DecoFunc = (value: string) => {
  return (constructor: any) => {
    const name = new constructor();
    console.log(`${value} ${name.name}`);
    // console.log(constructor);
  };
};

@DecoFunc("TEST") //클래스를 실체화하지 않아도 실행됨
class Person {
  name: string = "A";

  constructor() {
    // console.log("test");
  }
}

// const person = new Person();
// console.log(person);
