const networkConfig = {
    31337: {
        name: "localhost",
    },
    // Price Feed Address, values can be obtained at https://docs.chain.link/data-feeds/price-feeds/addresses
    11155111:/*this is the chain Id   */  {
        name: "sepolia",
        ethUsdPriceFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306",//this is the pricefeed address used in the priceConverter contract
    },
} 

const developmentChains = ["hardhat", "localhost"] // these aer the chains that we are going to use for development, so we need to deploy the mock aggregator  USING MOCK FOR THESE CHAINS!!

module.exports = {
    networkConfig,
    developmentChains,
}// these will be taken in the 00-deploy-mocks.js file