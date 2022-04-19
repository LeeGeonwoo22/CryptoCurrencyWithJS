const crypto = require("crypto")

// 블록체인 콜렉션입니다.
// 서로 연결되어 '체계적'으로 접근 가능합니다.

class Block {
    constructor(previoushHash, transaction, timestamp = Date.now()){
        this.previoushHash = previoushHash;
        this.transaction = transaction;
        this.timestamp = timestamp;
    }
    // 블록 해싱 입니다.
    getHash() {
        const json = JSON.stringify(this);
        const hash = crypto.createHash("SHA256");
        hash.update(json).end();
        const hex = hash.digest("hex");
        return hex;
    }
    // json으로 block 객체를 변환해줍니다.
    toString() {
        return JSON.stringify(this);
    }
}

module.exports = Block;