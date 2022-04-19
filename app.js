const Chain = require("./script/chain")
const Wallet = require("./script/wallet")

const GeonWoo = new Wallet();
GeonWoo.send(50, GeonWoo.publicKey);

console.log(Chain.instance);

