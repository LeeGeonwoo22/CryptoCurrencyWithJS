// 상대 변화 업데이트 수행 작업단위
// 트랜잭션 클레스 만들기 

class Transaction {
    constructor (amount, senderPublickey, recieverPublicKey){
        this.amount = amount;
        this.senderPublickey = senderPublickey;
        this.recieverPublicKey = recieverPublicKey;
    }
    // 클래스 데이터를 json으로 변환
    // hash로 변환 가능함
    toString() {
        return JSON.stringify(this);
      }
}

module.exports = Transaction