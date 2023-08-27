const { ethers, run, network } = require("hardhat");
const { HARDHAT_NETWORK_NAME } = require("hardhat/plugins");
//run is to run the tasks that we get when we do yarn hardhat
//network is to get the network we are connected to. here that is hardhat 


async function main() {
  const simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying contract ...");
  const simpleStorage = await simpleStorageFactory.deploy();
  await simpleStorage.deployed();
  console.log("Contract deployed to:", simpleStorage.address);
  console.log(network.config);//this contain the information about the network we are currently on . alos it give the chain id   
  //THE CODE ABOVE THIS DEPLOYS THE CONTRACT .
  //FROM HERE ON WE ARE GOING TO VERIFY THE CONTRACT
  if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
    console.log("Waiting for block confirmations...")
    await simpleStorage.deployTransaction.wait(6)//this is to wait for 6 block confirmations. as etherscan might take some time to verify the contract
    await verify(simpleStorage.address, [])
  }
  //code below is to interact with the contract 
  const currentValue = await simpleStorage.retrieve()
  console.log(`Current Value is: ${currentValue}`)

  // Update the current value
  const transactionResponse = await simpleStorage.store(7)
  await transactionResponse.wait(1) // Wait for the transaction to be mined
  const updatedValue = await simpleStorage.retrieve()
  console.log(`Updated Value is: ${updatedValue}`)
  // to run this code do yarn hardhat run scripts/deploy.js .
  // and to run this code on the sepolia do yarn hardhat run scripts/deploy.js --network sepolia
  //when you deploy this on selopia it will give the inforamtion as the verify function will work on the sepolia network
  //this is fucking working
}
// THIS IS THE VERIFY FUNCTION
const verify = async (contractAddress, args) => {
  console.log("Verifying contract...")
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!")
    } else {
      console.log(e)
    }
  }
}




// main
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  }) 