const SHA256 = require('crypto-js/sha256');

class Block
{
    constructor(index, timestamp, data, previousHash = '')
    {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }
    calculateHash()
    {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }

}


class Blockchain
{
    constructor()
    {
        this.chain = [this.createGenesisBlock()];
        
    }
    createGenesisBlock()
    {
        return new Block(0, "01/01/2017" , "Genesis Block" , "0");
    }
    getLatestBlock()
    {
        return this.chain[this.chain.length -1];
    }

    addBlock(newBlock)
    {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid()
    {
        for(let i=1; i < this.chain.length ; i++)
        {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash !== currentBlock.calculateHash())
            {
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash)
            {
                return false;
            }
        }
        return true;
    }


}

let johnCoin = new Blockchain();
johnCoin.addBlock(new Block(1, "10/07/2017", {amount : 4}));
johnCoin.addBlock(new Block(2, "12/07/2017", {amount : 10}));

console.log('is blockchain valid ?', + johnCoin.isChainValid());

johnCoin.chain[1].data = {amount:100};
johnCoin.chain[1].hash = johnCoin.chain[1].calculateHash();

console.log('is blockchain valid ?', + johnCoin.isChainValid());

//console.log(JSON.stringify(johnCoin, null ,4));