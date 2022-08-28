//합수의 반환 타입
//void > 함수가 아무것도 반환하지 않음
//undefined는 실제 값을 반환하지 않을때만 사용가능
//기본적으로 함수는 void를 사용
const returnType = (value1: number, value2: number): number => {
  return value1 + value2;
};

const printReturnType = (num: number): void => {
  console.log(`result : ${num}`);
  //return; 이라면 undefined 사용 가능
};

printReturnType(returnType(10, 10));

//함수 타입
//합수의 모양을 정해줌
type FuncType = (a: number, b: number) => number;

const funcValue: FuncType = returnType;
console.log(funcValue(1, 2));

//callBack
const retrunCB = (
  value1: number,
  value2: number,
  cb: (num: number) => void
) => {
  cb(value1 + value2);
};
//콜백 함수는 void타입으로 반환값을 기대하지 않는 경우에도 값을 반환할 수 있음

retrunCB(10, 10, (result) => {
  console.log(result);
});
//retrunCB함수에서 콜백함수의 파라미터의 타입을 미리 정의를 해주었기 때문에
//result는 자동으로 타입을 유추할 수 있음

function sendRequest(data: string, cb: (response: any) => void) {
  // ... sending a request with "data"
  cb({ [data]: "Hi there!" });
}

sendRequest("Send this!", (response) => {
  console.log(response);
  return true;
});
