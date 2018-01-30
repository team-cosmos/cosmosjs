// cosmos.js

'use strict';

module.exports = function(web3) {

	/* Set up web3 */
	const ethClient = 'https://ropsten.infura.io/ynXBPNoUYJ3C4ZDzqjga';
	var Web3 = require('web3');
	web3 = new Web3(new Web3.providers.HttpProvider(ethClient));

    return new Cosmos(web3);
};

/* Import libraries. */
const Core = require('./core/core.js');
const Accounts = require('./accounts/accounts.js');

/**
 * Set up Cosmos library and relevant modules.
 * @constructor 
 *
 * @param {Web3 object} web3 - Externally created web3 object.
 */
function Cosmos(web3) {
    var _web3 = web3;
	// var _core = new Core(web3);
	var _accounts = new Accounts();
	console.log(this._accounts);
	// Set up variables to export.
	this.accounts = _accounts.accounts;
	// this.core = core;
}

/* Test */
Cosmos.prototype.test = function() {
	// core.sendToken(accounts.accounts[0].getAddress(), '0x435C4c81bb9cf4326FfB05cb25A862d62151897D');

	// let cosmosGodAddress = '0x2E20eD696e36005a2BcE073c727761504673d407';
	// let cosmosAddress = '0x9f8df0243C394A62C4bf9dBCA24Ad9d77874Acc8';
	// var fs = require('fs');
	// var file = "./abi/cosmos-token.json";
	// var cosmosGodAbi = JSON.parse(fs.readFileSync(file)); 
	// var cosmosGodContract = new web3.eth.Contract(cosmosGodAbi, cosmosGodAddress);
	// var callData = cosmosGodContract.methods.updateAddress(cosmosAddress).encodeABI();
	// core.callContract(accounts.accounts[0].getAddress());
	console.log(this.accounts[0].getAddressString());
}