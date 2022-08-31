//인덱스 타입
//key에 어떤 값이든 올 수 있음
interface Index {
  //   id: string; //인덱스 타입을 string으로 입력했기때문에 string만 가능
  [key: string]: string;
}

const indexBox: Index = {
  name: "A",
  email: "B",
};
