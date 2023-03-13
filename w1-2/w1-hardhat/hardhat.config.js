require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");

let dotenv = require('dotenv');
dotenv.config({ path: "./.env" });

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    goerli: {
      url: process.env.RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 5
    }
  },
  etherscan: {
    apiKey: process.env.VERIFY_KEY,
    customChains: [
      {
        network: "goerli",
        chainId: 5,
        urls: {
          apiURL: "http://api-goerli.etherscan.io/api",  // https => http
          browserURL: "https://goerli.etherscan.io"
        }
      }
    ]
  }
};
