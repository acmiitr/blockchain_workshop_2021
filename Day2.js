const SHA256 =  require('crypto-js/sha256');

class Transaction{

    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }

}

class Block{
   
    /** 
    * timestamp and index to uniquely identify blocks
    * transaction will store the transaction details
    * previuosHash will store the output of the hash value of previous block 
    * nonce is the key which is changed to get the desired Hash.
    */

    constructor(timestamp, transactions, previousHash='') {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce=0;
    }

    /**
     * method to calculate hash value using SHA256 algorithm
     */
 
    calculateHash(){
        
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();

    }

    /**
     * difficulty is the number of zeros required in the prefix of Hash
     */
    mineBlock(difficulty){

        // we are incrementing nonce here to change the hash of the block until we get the required hash
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++; 
            this.hash = this.calculateHash();
        }

        console.log("Block Mined: " + this.hash);
    }

}

class BlockChain{

    /**
     * chain is used to store the blocks in the BlockChain
     * difficulty is the number of zeros required in the prefix of Hash.
     * Since blocks are created only after a certain interval, therefore to store the transaction that occured
     *    in between we need to store them in an array,
     * miningReward is the incentive awarded to the miner
     */
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
        this.pendingTransactions = [],
        this.miningReward = 100;
    }
    
    /**
     * Creating the first block
     * this will have previous hash as 0
     */
    createGenesisBlock(){
        return (new Block(Date.now(), "Genesis Block", "0"));
    }
    
    /**
     * will return the latest block 
     */
    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    /**
     * minePendingTransaction is used to mine a new valid block in the chain.
     * And adding the block in the chain we are rewarding the miner with miningReward.
     */
    minePendingTransaction(miningRewardAddress){
        let block = new Block(Date.now(), this.pendingTransactions);
        block.previousHash = this.getLatestBlock().hash;
        block.mineBlock(this.difficulty);

        console.log('Block sucessfully mined');
        this.chain.push(block);

        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ]
    }
    
    /**
     * createTransaction is used to add a transaction in the pending transaction Array
     */

    createTransaction(transaction){
        this.pendingTransactions.push(transaction);
    }

    /**
     * getBalanceOfAddress is used to get the balance of the specified address
     */
    getBalanceOfAddress(address){
        let balance = 0;

        for (const block of this.chain) {
            for (const transaction of block.transactions) {
                if (transaction.fromAddress === address) {
                    balance -= transaction.amount;
                }

                if (transaction.toAddress === address) {
                    balance += transaction.amount;
                }
            }
        }

        return balance;
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

/**
 * Code for testing

console.log("Mining Block 1.....");
const startTime1 = Date.now();
ACMCoin.addNewBlock(new Block(1, Date.now(), { amount: 1000 }));
const startTime2 = Date.now();
console.log(startTime2-startTime1);


console.log("Mining Block 2.....");
const startTime3 = Date.now();
ACMCoin.addNewBlock(new Block(2, Date.now(), { amount: 2000 }));
const startTime4 = Date.now();
console.log(startTime4-startTime3);

console.log("--------------------")
console.log((startTime4-startTime3)/(startTime2-startTime1))
console.log("--------------------")
console.log('Is blockchain Valid? ' + ACMCoin.isChainValid());
 */

/**
 * trying to modify the previously stored data
 */
// ACMCoin.chain[1].data = { amount: 10000 };
// ACMCoin.chain[1].hash = ACMCoin.chain[1].calculateHash();

/**
 * checking whether blockchain is valid?
 */


ACMCoin.createTransaction(new Transaction('Address1', 'Address2', 100));
ACMCoin.createTransaction(new Transaction('Address2', 'Address1', 50));

console.log('\n Starting the miner.....');
ACMCoin.minePendingTransaction('MINER-ADDRESS');

console.log('Balance of MINER is: ', ACMCoin.getBalanceOfAddress('MINER-ADDRESS'));

console.log('\n Starting the miner again.....');
ACMCoin.minePendingTransaction('MINER-ADDRESS');

console.log('Balance of MINER is: ', ACMCoin.getBalanceOfAddress('MINER-ADDRESS'));

console.log('Is blockchain Valid? ' + ACMCoin.isChainValid());

console.log(JSON.stringify(ACMCoin, null, 4));