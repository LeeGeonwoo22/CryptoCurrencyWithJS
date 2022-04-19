const crypto = require("crypto")
const Transaction = require("./transaction")
const Chain = require("./chain")

class Wallet {
  constructor() {
    const keys = crypto.generateKeyPairSync("rsa", {
      modulusLength: 2048,
      publicKeyEncoding: { type: "spki", format: "pem" },
      privateKeyEncoding: { type: "pkcs8", format: "pem" },
    });
    this.privateKey = keys.privateKey;
    this.publicKey = keys.publicKey;
  }

  send(amount, recieverPublicKey) {
    const transaction = new Transaction(
      amount,
      this.publicKey,
      recieverPublicKey
    );
    const shaSign = crypto.createSign("SHA256");
    // add the transaction json
    shaSign.update(transaction.toString()).end();
    // sign the SHA with the private key
    const signature = shaSign.sign(this.privateKey);
    Chain.instance.insertBlock(transaction, this.publicKey, signature);
  }
}

module.exports = Wallet;