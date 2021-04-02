// TODO: Make .env
require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  contracts_build_directory: "./src/artifacts/",
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
    xdai: {
      provider: () => new HDWalletProvider(process.env.MNEMONIC, "https://xdai.1hive.org/"),
      network_id: 100,
      gas: 5000000,
      gasPrice: 1000000000,
    },
  },
  compilers: {
    solc: {
      version: "0.7.4",
    },
  },
};
