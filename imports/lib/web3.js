export const Web3 = require('web3');
export const web3 = new Web3();

web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545"));