"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
class Block {
    constructor(prevHash, height, data) {
        this.prevHash = prevHash;
        this.height = height;
        this.data = data;
        this.hash = Block.calcHash(prevHash, height, data);
    }
    static calcHash(prevHash, height, data) {
        const toHash = `${prevHash}${height}${data}`;
        return crypto_1.default.createHash("sha256").update(toHash).digest("hex");
    }
}
class BlockChain {
    constructor() {
        this.block = [];
    }
    getPrevHash() {
        if (this.block.length === 0)
            return "";
        return this.block[this.block.length - 1].hash;
    }
    addBlock(data) {
        const newBlock = new Block(this.getPrevHash(), this.block.length + 1, data);
        this.block.push(newBlock);
    }
    getBlock() {
        return [...this.block];
    }
}
const test = new BlockChain();
test.addBlock("first");
test.addBlock("second");
test.getBlock().push(new Block("tas", 1, "tesatast"));
console.log(test.getBlock());
//# sourceMappingURL=index.js.map