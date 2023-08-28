const { network } = require("hardhat");
const { networkConfig, developmentChains } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");
require("dotenv").config();

module.exports = async ({ getNamedAccounts, deployments }) => {
    // Destructure the deploy and log functions from the deployments object
    const { deploy, log } = deployments;

    // Get the deployer account from the named accounts
    const { deployer } = await getNamedAccounts();

    // Get the chain ID from the current network configuration
    const chainId = network.config.chainId;

    let ethUsdPriceFeedAddress;
    if (chainId == 31337) {
        // If on the local development network (Hardhat network)
        // Get the address of the MockV3Aggregator contract
        const ethUsdAggregator = await deployments.get("MockV3Aggregator");
        ethUsdPriceFeedAddress = ethUsdAggregator.address;
    } else {
        // For other networks, fetch the ETH/USD price feed address from the network configuration
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];
    }

    log("----------------------------------------------------");
    log("Deploying FundMe and waiting for confirmations...");

    // Deploy the FundMe contract
    const fundMe = await deploy("FundMe", {
        from: deployer,//these are the overriredes that we want to add 
        args: [ethUsdPriceFeedAddress],
        log: true,//this is basically custom console.log 
        // Wait for confirmations before proceeding if on a live network
        waitConfirmations: network.config.blockConfirmations || 1,//this  has to do with the blockConfirmations in the hardhat-config.js file
    });
    log(`FundMe deployed at ${fundMe.address}`);

    // Verify the contract on Etherscan for live networks (if applicable)
    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(fundMe.address, [ethUsdPriceFeedAddress]);
    }
};

// Define tags for this deployment script
module.exports.tags = ["all", "fundme"];
