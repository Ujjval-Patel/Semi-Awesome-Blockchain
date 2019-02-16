const {Blockchain, Transaction} = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('4f4fa9378c637893c485511a353c101a5f228305688cfd6566559d7b87d873a3');
const myWalletAddress = myKey.getPublic('hex');

let johnCoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, 'address2' , 100);
tx1.signTransaction(myKey);
johnCoin.addTransaction(tx1);

console.log('\n Starting the miner...');
johnCoin.minePendingTransactions(myWalletAddress);

const tx2 = new Transaction(myWalletAddress, 'address1', 50);
tx2.signTransaction(myKey);
johnCoin.addTransaction(tx2);

// Mine block
johnCoin.minePendingTransactions(myWalletAddress);


console.log();
console.log('Balance of xavier is '+ johnCoin.getBalanceOfAddress(myWalletAddress));

console.log();
console.log('Blockchain valid?', johnCoin.isChainValid() ? 'Yes' : 'No');