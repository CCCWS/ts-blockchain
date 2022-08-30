interface Storage<G> {
  [key: string]: G;
}

abstract class AbstractLocalStorage<G> {
  constructor(protected storage: Storage<G> = {}) {}

  abstract setItem(key: string, value: G): void;
  abstract getItem(key: string): G | void;
  abstract clearItem(key: string): void;
  abstract clear(): void;
}

class LocalStorage<G> extends AbstractLocalStorage<G> {
  setItem(key: string, value: G) {
    if (this.storage[key]) {
      console.log("단어 중복");
    } else {
      this.storage[key] = value;
      console.log("단어 등록");
    }
  }

  getItem(key: string) {
    if (this.storage[key]) {
      return this.storage[key];
    } else {
      console.log("등록 단어 없음");
    }
  }

  clearItem(key: string) {
    if (this.storage[key]) {
      delete this.storage[key];
      console.log("단어 삭제");
    } else {
      console.log("등록 단어 없음");
    }
  }

  clear() {
    this.storage = {};
    console.log("초기화");
  }
}

const localStorage = new LocalStorage();

localStorage.setItem("string", "string");
localStorage.setItem("number", 1);
localStorage.setItem("boolean", true);

console.log(localStorage.getItem("string"));
localStorage.clearItem("string");
localStorage.clear();




