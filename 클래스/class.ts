class Animal {
  constructor(
    protected readonly name: string,
    protected readonly age: number,
    protected arr: string[]
  ) {}

  //readonly 특정 속성이 초기화된 이후에는 변경 불가
  // TS만 있는 문법, JS변환시 사라짐

  print = () => {
    console.log(this.name, this.age);
  };

  arrPush = (data: string) => {
    this.arr.push(data);
  };

  printArr = () => {
    console.log(this.arr.length);
    console.log(this.arr);
  };
}

const animal = new Animal("A", 100, []);

// animal.arrPush("A");
// animal.arrPush("B");
// animal.arrPush("C");

// console.log(animal);

class Dog extends Animal {
  //getter
  //반드시 return을 해줌
  get dogAge() {
    if (this.age > 20) {
      console.log("20살보다 많음.");
    } else {
      console.log("20살보다 낮음");
    }
    return;
  }

  //setter
  set dogNameChack(name: string) {
    if (this.name === name) {
      console.log("중복");
    } else {
      this.name = name;
    }
  }

  constructor(
    protected name: string,
    protected age: number,
    protected sound: string,
    protected arr: string[]
  ) {
    super(name, age, arr);
    //상속받은 클래스의 생성자를 가져옴
  }

  play = () => {
    console.log(this.sound);
  };
}

const dog = new Dog("dogName", 10, "wall", ["dog"]);

dog.dogAge;
dog.dogNameChack = "dogName";

console.log(dog);
