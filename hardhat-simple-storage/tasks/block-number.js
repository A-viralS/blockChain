// THE VARIABLE blockNumber WILL BE SHOWN AS A NEW TASK.
// WE ALSO NEED TO ADD THIS INTO THE HARDHAT CONFIG FILE.
//TO RUN IT TYPE yarn hardhat block-number ( it will zero) but if you run yarn hardhat blocknumber --netweork sepolia you get a largere number

const { task } = require('hardhat/config');
task("block-number", "Prints the current block number").setAction(

    async (taskArgs, hre) => {

        //hre is hardhat runtime environment
        // hre can access the functions and variables from hardhat.config.js
        const blockNumber = await hre.ethers.provider.getBlockNumber();
        console.log(`Current block number : ${blockNumber}`);

    }
)
module.exports = {};