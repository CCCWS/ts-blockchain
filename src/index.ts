import crypto from "crypto";
//crypto 모듈에 기본 내보내기가 없다고 표시됨 > * as crypto
//혹은 tsconfig에서 따로 설정
//npm i -D @types/(설치한 패키지명)으로 해당 모듈의 .d.ts을 가져올 수 있음
// https://github.com/DefinitelyTyped/DefinitelyTyped 모듈의 type을 정의한 리포지트리

interface BlockShape {
  hash: string; // prevHash, height, data를 이용하여 계산
  prevHash: string; // 이전 값
  height: number; // 블록의 위치
  data: string;
}

class Block implements BlockShape {
  public hash: string;
  constructor(
    public prevHash: string,
    public height: number,
    public data: string
  ) {
    this.hash = Block.calcHash(prevHash, height, data);
    // 새로운 block가 생성되면 calcHash함수를 통하여 새로운 hash가 생성
  }
  static calcHash(prevHash: string, height: number, data: string) {
    const toHash = `${prevHash}${height}${data}`;
    return crypto.createHash("sha256").update(toHash).digest("hex");
  }
}

class BlockChain {
  private readonly block: Block[];
  constructor() {
    this.block = [];
  }
  private getPrevHash() {
    if (this.block.length === 0) return "";
    return this.block[this.block.length - 1].hash;
  }
  public addBlock(data: string) {
    const newBlock = new Block(
      this.getPrevHash(), // prevHash
      this.block.length + 1, // height
      data // data
    );
    this.block.push(newBlock);
  }

  public getBlock() {
    // return this.block; //배열에 직접 접근하여 데이터를 추가하는 보안이슈가 발생함
    return [...this.block]; //새로운 배열을 반환해줌
  }
}

const test = new BlockChain();

test.addBlock("first");
test.addBlock("second");

test.getBlock().push(new Block("tas", 1, "tesatast"));

console.log(test.getBlock());
