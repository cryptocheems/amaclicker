const Amaclicker = artifacts.require("Amaclicker");

// https://forum.openzeppelin.com/t/simple-erc777-token-example/746
require("@openzeppelin/test-helpers/configure")({
  provider: web3.currentProvider,
  environment: "truffle",
});
const { singletons } = require("@openzeppelin/test-helpers");

module.exports = async (deployer, network, accounts) => {
  // In test environments you have to create the ERC1820 registry
  if (network === "development") {
    await singletons.ERC1820Registry(accounts[0]);
  }

  await deployer.deploy(Amaclicker, "0xEaF7B3376173DF8BC0C22Ad6126943cC8353C1Ee");
};
