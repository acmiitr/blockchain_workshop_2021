const SHA256 =  require('crypto-js/sha256');

class Block{
   
    /** 
    * timestamp and index to uniquely identify blocks
    * data will store the transaction details
    * previuosHash will store the output of the hash value of previous block 
    */
     

    constructor(index, timestamp, data, previousHash='') {
        
    }

    /**
     * method to calculate hash value using SHA256 algorithm
    */
 
     

    calculateHash(){
        
      

    }

}



class BlockChain{

    constructor() {
        
    }
    
    /**
     * Creating the first block
     * this will have previous hash as 0
     */
    createGenesisBlock(){
        
    }
    
    /**
     * will return the latest block 
     */

    getLatestBlock(){
        
    }
    
    /**
     * adding a new block to the chain
     * would take arguement an object of class Block
     * initialize the previousHash of this block
     * calculateHash of this block
     * push it into the chain
     */

    addNewBlock(newBlock){
        
    }

     /**
     * Exclude Genesis block 
     * for all the blocks check whether its hash value match with calculateHash
     * also check previousHash of this block matches with the previous block's current hash
     * if no malicious activity found,return true
     */
    

    isChainValid(){
        
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