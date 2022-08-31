//함수의 오버로드
type StringNumber = string | number;
type NumberBoolean = number | boolean;
type CombineType = StringNumber & NumberBoolean;

//함수명과 동일하게 작성
//다양한 타입의 조합에 대해서 반환되는 값을 명확하게 알 수 있음
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: StringNumber, b: StringNumber) {
  if (typeof a === "string" || typeof b === "string") {
    return `${a} ${b}`;
  }
  return a + b;
}

const result = add("A", "B");
result.split(" ");

//선택적 체이닝
//데이터를 받아왔을때 특정 값이 없을수도 있음
const person = {
  id: "a",
  name: "A",
  skill: {
    s1: "A",
    s2: "B",
  },
};

//person.skill이 있다면 person.skill.s1에 접근
//TS는 해당 값이 있는지 없는지 알 수 있음
console.log(person.skill && person.skill.s1);

//선택적 체이닝 연산자
//정의되어 있는지 여부가 불명확한 부분에 ? 추가
//중첩된 속성과 객체에 대해 안전하게 접근
console.log(person?.skill?.s1);
