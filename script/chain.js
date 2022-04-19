// block 클래스를 만든후, 블록에 '체인'을 채워 넣을 수 있습니다.
// 체인은 매 블록체인에서 발생하는 모든 '블록' 또는 모든 '트랜잭션'을 보유합니다.
// 모든 블록을 한 곳에 함께 유지하기 위해 Chain 클래스가 필요합니다.
const crypto = require("crypto")
const Block = require("./block")
const Transaction = require("./transaction")

class Chain {
    static instance = new Chain();
    // 레코드가 없는 체인 초기화 
    // 더미 블록 
    constructor() {
      this.chain = [new Block("", new Transaction(100, "temp", "temp"))];
    }
    
    
    getPreviousBlockHash() {
      // 전체 블록 자체를 전송
      return this.chain[this.chain.length - 1].getHash();
    }
    // 블록을 생성하고 체인배열에 삽임하는 메소드
    insertBlock(transaction, senderPublicKey, sig) {
      // create verifier
      const verify = crypto.createVerify("SHA256");
      // add the transaction JSON
      verify.update(transaction.toString());
      // Verify it with the sender's public key
      const isValid = verify.verify(senderPublicKey, sig);
      if (isValid) {
        const block = new Block(this.getPreviousBlockHash(), transaction);
        console.log("Block added", block.toString());
        this.chain.push(block);
      }
    }
  }

  module.exports = Chain