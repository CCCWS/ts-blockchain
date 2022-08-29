"use strict";
const push = (config) => {
  if (typeof config === "string") console.log(config);
  else console.log(config.path);
};
const read = [3];
const player = {
  name: "test",
  extra: {
    test: 1,
  },
};
const print = (arr, a) => console.log(arr, a);
function genericeFunc(a) {
  return a[0];
}
class User {
  constructor(firstName, lastName, nickName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.nickName = nickName;
  }
  getFullName() {
    return console.log(`${this.firstName} ${this.lastName}`);
  }
}
class Test extends User {
  getNickName() {
    return this.nickName;
  }
}
const test = new Test("firstName", "lastName", "nickName");
const test2 = new Test("D", "E", null);
test.getNickName();
const wordsEx = {
  key: "value",
  key2: "value2",
};
class Dict {
  constructor() {
    this.words = {};
    this.ttest = {};
  }
  add(word) {
    if (this.words[word.name] === undefined) {
      this.words[word.name] = word.discription;
      return "test";
    } else {
      console.log(`${this.words[word.name]}는 이미 등록된 단어입니다.`);
    }
  }
  del(name) {
    if (this.words[name]) {
      delete this.words[name];
    } else {
      console.log("해당 단어는 없음");
    }
  }
  update(name, discription) {
    if (this.words[name]) {
      this.words[name] = discription;
    } else {
      console.log("해당 단어는 없음");
    }
  }
  discription(name) {
    if (this.words[name]) {
      return this.words[name];
    } else {
      console.log("해당 단어는 없음");
    }
  }
  showAll() {
    Object.values(this.words).forEach((word) => console.log(word));
  }
  size() {
    console.log(Object.keys(this.words).length);
  }
  static test() {
    return "test";
  }
}
class Word {
  constructor(name, discription) {
    this.name = name;
    this.discription = discription;
  }
}
const food = new Word("food", "음식");
const flower = new Word("flower", "꽃");
const dict = new Dict();
console.log(dict.add(food));
console.log(dict.add(flower));
dict.showAll();
dict.discription("food");
Dict.test();
const health = 1;
const color = "red";
const interfaceTest = {
  name: "test",
  health: 1,
  color: "red",
  extra: "테스트",
};
class Player4 {
  constructor(firstName, lastName, test) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.test = test;
  }
  name() {
    return `${this.firstName}${this.lastName}`;
  }
  hello(arg) {
    return `hello ${arg}. im ${this.name()}`;
  }
}
const interfaceFunc = (user) => {
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
class LocalStorage {
  constructor() {
    this.storage = {};
  }
  set(key, value) {
    if (this.storage[key]) {
      console.log("중복입니다.");
    } else {
      this.storage[key] = value;
      console.log("등록완료");
    }
  }
  remove(key) {
    if (this.storage[key]) {
      delete this.storage[key];
      console.log("삭제완료");
    } else {
      console.log("없음");
    }
  }
  get(key) {
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
const stringLocal = new LocalStorage();
const numberLocal = new LocalStorage();
const booleanLocal = new LocalStorage();
//# sourceMappingURL=test.js.map
