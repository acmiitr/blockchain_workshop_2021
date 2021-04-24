const SHA256 =  require('crypto-js/sha256');

class Block{
   
    /** 
    * timestamp and index to uniquely identify blocks
    * data will store the transaction details
    * previuosHash will store the output of the hash value of previous block 
    */
     

    constructor(index, timestamp, data, previousHash='') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    /**
     * method to calculate hash value using SHA256 algorithm
    */
 
     

    calculateHash(){
        
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();

    }

}



class BlockChain{

    constructor() {
        this.chain = [this.createGenesisBlock()];
    }
    
    /**
     * Creating the first block
     * this will have previous hash as 0
     */
    createGenesisBlock(){
        return (new Block(0, Date.now(), "Genesis Block", "0"));
    }
    
    /**
     * will return the latest block 
     */

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }
    
    /**
     * adding a new block to the chain
     * would take arguement an object of class Block
     * initialize the previousHash of this block
     * calculateHash of this block
     * push it into the chain
     */

    addNewBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

     /**
     * Exclude Genesis block 
     * for all the blocks check whether its hash value match with calculateHash
     * also check previousHash of this block matches with the previous block's current hash
     * if no malicious activity found,return true
     */
    

    isChainValid(){
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
            
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }

}

/**
 * instanciating BlockChain class i.e. creating an object of the class Blockchian
 */
let ACMCoin = new BlockChain();

/**
 * adding newBlocks to the blockchain recently created
 */
ACMCoin.addNewBlock(new Block(1, Date.now(), { amount: 1000 }));
ACMCoin.addNewBlock(new Block(2, Date.now(), { amount: 2000 }));

console.log('Is blockchain Valid? ' + ACMCoin.isChainValid());

/**
 * trying to modify the previously stored data
 */
ACMCoin.chain[1].data = { amount: 10000 };
ACMCoin.chain[1].hash = ACMCoin.chain[1].calculateHash();

/**
 * checking whether blockchain is valid?
 */
console.log('Is blockchain Valid? ' + ACMCoin.isChainValid());

console.log(JSON.stringify(ACMCoin, null, 4));