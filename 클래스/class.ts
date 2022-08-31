abstract class Animal {
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

  abstract abstractFunc(): void;
}

// const animal = new Animal("A", 100, []);

// animal.arrPush("A");
// animal.arrPush("B");
// animal.arrPush("C");

// console.log(animal);

class Dog extends Animal {
  //getter
  //반드시 return을 해줌

  static dogStatic = "static";

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

  static test = () => {
    return this.dogStatic;
  };

  abstractFunc = () => {};
}

const dog = new Dog("dogName", 10, "wall", ["dog"]);

// dog.dogAge;
// dog.dogNameChack = "dogName";

// console.log(Dog.test());

//singleton 패턴
//클래스가 단 하나의 인스턴스만 가지도록함
class Singleton {
  private static instance: Singleton;
  //private이므로 클래스 내부에서만 호출가능

  private constructor(
    private string: string,
    private number: number,
    private boolean: boolean
  ) {}
  //생성자에 private를 붙여서 외부에서 호출 불가

  public static getInstance() {
    return this.instance || (this.instance = new Singleton("A", 1, true));
    //정적 메소드, 클래스 자체에서 호출 가능
    //클래스를 인스턴스화할 필요가 없음
    //인스턴스가 있는지 확인하고 없다면 새로운 인스턴스 생성
  }

  test = () => {
    console.log("test");
  };
}

const singleton = Singleton.getInstance();
console.log(singleton);

class customMath {
  constructor() {}

  static add = (...value: number[]) => value.reduce((a, b) => a + b);

  static max = (...value: number[]) => {
    for (let i = 0; i < value.length; i++) {
      if (value[i] > value[i + 1]) {
        //[3,2,3,4]
        const arr = [...value];
        value[i + 1] = arr[i];
      }
    }

    return value[value.length - 1];
  };
}

// console.log(customMath.max(39, 27, 41, 20));
// console.log(customMath.add(1, 2));
