interface StorageInterface<G> {
  [key: string]: G;
}

abstract class LocalStorageAPI<G> {
  constructor(protected storage: StorageInterface<G> = {}) {}

  abstract setItem(key: string, value: G): void;
  abstract getItem(key: string): G | void;
  abstract clearItem(key: string): void;
  abstract clear(): void;
}

class UserLocalStorage<G> extends LocalStorageAPI<G> {
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
      return console.log("등록 단어 없음");
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

const customLocalStorage = new UserLocalStorage();

customLocalStorage.setItem("string", "string");
customLocalStorage.setItem("number", 1);
customLocalStorage.setItem("boolean", true);

console.log(customLocalStorage.getItem("string"));
customLocalStorage.clearItem("string");
customLocalStorage.clear();
