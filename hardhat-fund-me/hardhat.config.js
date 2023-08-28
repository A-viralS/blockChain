require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

require("hardhat-gas-reporter");
require("solidity-coverage");//put in gitignore file
require("hardhat-deploy");
const SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY;
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY;

module.exports = {
  solidity: {
    compilers: [{ version: "0.8.8" }, { version: "0.6.6" },],
  },
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/VNZwbw8EPznsJTEGk6gJy-R-Bk9mDOy-",
      accounts: [SEPOLIA_PRIVATE_KEY],
      chainId: 11155111,
      blockConfirmations: 6,
    },
    localhost: {
      url: 'http://127.0.0.1:8545/',
      chainId: 31337,
    },
    etherscan: {
      url: "...", // Fill in the correct URL
      apiKey: {
        sepolia: '5MZ875AYKP65CMFYHBFECVQFNY6DA7CJJE',
      },
    },
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
    coinmarketcap: COINMARKETCAP_API_KEY,
  },
  namedAccounts: { // this is connected to the getNamedAccounts function
    deployer: {
      default: 0,
    },
  },
};