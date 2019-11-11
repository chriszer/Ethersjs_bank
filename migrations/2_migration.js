const EthereumBank = artifacts.require("EthereumBank");

module.exports = function(deployer) {
  deployer.deploy(EthereumBank);
};
