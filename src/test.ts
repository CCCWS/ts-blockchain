type Config = {
  path: string;
  state: number;
};

type Push = {
  (config: { path: string; state: number }): void;
  (config: string): void;
};

const push: Push = (config) => {
  if (typeof config === "string") console.log(config);
  else console.log(config.path);
};
// push({ path: "test", state: 123 });

const read: readonly number[] = [3];

type Player<E> = {
  name: string;
  extra: E;
};

const player: Player<{ test: number }> = {
  name: "test",
  extra: {
    test: 1,
  },
};

type Print = <G, A>(arr: G[], a: A) => G | void;
// <G, A> 제네릭의 이름 정의, 아무거나 상관없음 여러개 가능
// arr : G[] 받을 파라미터가 G이므로 타입을 자동으로 지정
// => G | void return값이 G이므로 자동 지정이거나 return이 없을경우 void

//Generices 재사용이 용이함
//하나의 배열에 string[], number[], [string, number, boolean] 등 필요한 타입을 모두 정의하지 않아도
//TS에서 자동으로 타입을 유추함
//any와의 차이점은 any의 경우 TS의 보호기능을 받지 못하지만 Generice을 사용했을경우 보호를 받게됨
//다형성 > 다른 모양의 코드를 가지는 것 > 제네릭은 다형성을 이룸

const print: Print = (arr, a) => console.log(arr, a);

function genericeFunc<V>(a: V[]) {
  return a[0];
} //제네릭을 함수에 동시에 사용

// print([1, 2, 3], 1);
// const b = print(["1", true, 3, null, undefined]);
// const c = print(["1"]);

abstract class User {
  //추상 클래스 > 다른 클래스가 상속할 수 있는 클래스
  //직접 새로운 인스턴스 생성은 불가 > new User 안됨
  constructor(
    protected firstName: string,
    private lastName: string,
    protected nickName: string | null
  ) {
    // 자바스크립트로 변환될때 this.firstName = firstName의 형태로 변환
  }

  abstract getNickName(): void;
  //추상 메소드 > 추상클래스를 상속받는 클래스는 추상 메소드를 구현을 해야함

  public getFullName() {
    //메소드 > 클래스 안에 존재하는 함수
    return console.log(`${this.firstName} ${this.lastName}`);
  }
}

class Test extends User {
  getNickName(): string | null {
    return this.nickName;
  }
}

// class Test {
//   constructor(
//     private firstName: string,
//     private lastName: string,
//     public nickName: string | null
//   ) {
//     // 자바스크립트로 변환될때 this.firstName = firstName의 형태로 변환
//   }
// }

const test = new Test("firstName", "lastName", "nickName");
const test2 = new Test("D", "E", null);

test.getNickName();

type Words = {
  [key: string]: string;
  // key값이 string이고 value가 string인 오브젝트
  // key값의 이름은 모르지만 타입은 알때 사용가능
};

const wordsEx: Words = {
  key: "value",
  key2: "value2",
};

class Dict {
  public words: Words;
  public ttest: Words;
  constructor() {
    this.words = {};
    this.ttest = {};
  }
  add(word: Word) {
    if (this.words[word.name] === undefined) {
      //아직 해당 이름의 값이 없을때
      this.words[word.name] = word.discription;
    }
  }

  del(name: string) {
    if (this.words[name]) {
      //words에 파라미터로 받은 name이 들어있다면 삭제
      delete this.words[name];
    } else {
      console.log("해당 단어는 없음");
    }
  }

  update(name: string, discription: string) {
    if (this.words[name]) {
      this.words[name] = discription;
    } else {
      console.log("해당 단어는 없음");
    }
  }

  discription(name: string) {
    if (this.words[name]) {
      return this.words[name];
    } else {
      console.log("해당 단어는 없음");
    }
  }

  size() {
    console.log(Object.keys(this.words).length);
  }

  static test() {
    return "test";
  }
}

class Word {
  constructor(
    public readonly name: string,
    public readonly discription: string
  ) {}
}

const food = new Word("food", "음식");
const flower = new Word("flower", "꽃");

// food.discription = "test"; readonly옵션으로 인하여 public임에도 불구하고 변경불가

const dict = new Dict();

dict.add(food);
dict.add(flower);

dict.discription("food");

// dict.update("food", "바꾸기");

Dict.test(); //static으로 따로 메소드를 생성하지 않고 바로 사용가능

////////////////////
type Health = 1 | 10 | 100;
type Color = "red" | "blue" | "green"; //타입이 아닌 특정 값만을 가지게함

const health: Health = 1;
const color: Color = "red";

type PlayerType = {
  // 타입
  // 오브젝트 뿐만아니라 다양한 형태로 사용가능
  name: string;
  health: Health;
  color: Color;
};
interface PlayerInterface {
  // 인터페이스
  // 오직 오브젝트 형태에만 사용가능
  name: string;
  health: Health;
  color: Color;
}

interface PlayerInterface {
  // 변수명을 중복해서 사용가능 자동으로 합쳐줌
  test?: string;
}

interface Player1 extends PlayerInterface {
  // 인터페이스는 다른 인터페이스를 상속해서 사용가능
  extra: string;
}

const interfaceTest: Player1 = {
  name: "test",
  health: 1,
  color: "red",
  extra: "테스트",
};

///////////////////
// abstract class AbsUser {
//   //추상클래스는 상속받는 클래스가 구현해야할것을 미리 정의해줌
//   //추상클래스 만으로는 새로운 인스턴스를 생성 불가
//   constructor(protected firstName: string, protected lastName: string) {}

//   abstract hello(arg: string): string;
//   abstract name(): string;
// }

interface InterfaceUser {
  //인터페이스는 타입스크립트에만 존재함
  //자바스크립트로 변환할때 사라짐 > 코드가 가벼움
  //추상클래스는 자바스크립트로 변환됨

  //클래스는 아니지만 클래스의 모양을 정해줌

  firstName: string;
  lastName: string;
  hello(arg: string): string;
  name(): string;
}

interface InterfaceUser2 {
  test?: number;
}

class Player4 implements InterfaceUser, InterfaceUser2 {
  //인터페이스를 상속할경우 private등을 사용 불가
  //동시에 여러개의 인터페이스 상속 가능
  constructor(
    public firstName: string,
    public lastName: string,
    public test?: number
  ) {}
  name(): string {
    return `${this.firstName}${this.lastName}`;
  }

  hello(arg: string) {
    return `hello ${arg}. im ${this.name()}`;
  }
}

const interfaceFunc = (user: InterfaceUser): InterfaceUser => {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    hello: user.hello,
    name: user.name,
  };
};

interfaceFunc({
  firstName: "A",
  lastName: "B",
  hello: (arg) => arg,
  name: () => "test",
});

const testPlayer1 = new Player4("A", "B", 1);
const testPlayer2 = new Player4("a", "b");

///////////////////////////////
interface Storage<G> {
  [key: string]: G;
}
class LocalStorage<G> {
  private storage: Storage<G> = {};

  set(key: string, value: G) {
    if (this.storage[key]) {
      console.log("중복입니다.");
    } else {
      this.storage[key] = value;
      console.log("등록완료");
    }
  }

  remove(key: string) {
    if (this.storage[key]) {
      delete this.storage[key];
      console.log("삭제완료");
    } else {
      console.log("없음");
    }
  }

  get(key: string): void {
    if (this.storage[key]) {
      return console.log(`${key} : ${this.storage[key]}`);
    } else {
      console.log("없음");
    }
  }

  clear() {
    this.storage = {};
    console.log("초기화");
  }
}

const stringLocal = new LocalStorage<string>();
const numberLocal = new LocalStorage<number>();
const booleanLocal = new LocalStorage<boolean>();

stringLocal.set("이름", "name");
numberLocal.set("숫자", 1);
booleanLocal.set("참거짓", true);

stringLocal.get("이름");
