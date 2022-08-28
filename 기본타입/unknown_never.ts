// unknown 어떤 타입도 지정 가능
// any는 타입 검사를 수행하지 않으며 다른 특정 타입의 변수에 할당이 가능
//unknown은 타입 검사를 수행할 수 있으며 다른 특정 타입의 변수에 할당 불가

let unknownValue: unknown;
let stringValue: string;

unknownValue = 5;
unknownValue = "TEST";

// stringValue = unknownValue;
//string 타입에 unknown 타입을 넣을 수 없음

// never
// 어떤 값도 never타입에 할당이 불가능하고 특정 타입의 변수에 할당이 불가능
// 일어날 수 없는 상황 > 에러발상
const neverFunc = (message: string, code: number): never => {
  throw { message: message, error: code };
};

neverFunc("Error", 404);
