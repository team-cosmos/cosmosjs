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
var Core = require('./core/core.js');
var Accounts = require('./accounts/accounts.js');

/**
 * Set up Cosmos library and relevant modules.
 * @constructor 
 *
 * @param {Web3 object} web3 - Externally created web3 object.
 */
function Cosmos(web3) {
    this._web3 = web3;
	
	/* Set up core module */
	this.core = Core(this._web3);

	/* Set up accounts */
	var _accounts = Accounts();
	this.accounts = _accounts._accounts;
}

/* Test */
Cosmos.prototype.test = function() {

	/* Return account address */
	console.log(this.accounts[0].getAddressString());

	/* Test send token */
	this.core.approve(this.accounts[0], '0xb24af1f3d5ec84aa14693d114ae94ef542da521f', 200000);

	/* Test send token */
	//this.core.sendToken(this.accounts[0], '0x435C4c81bb9cf4326FfB05cb25A862d62151897D', 2);

	/* Test call contract */
	// let cosmosGodAddress = '0x2E20eD696e36005a2BcE073c727761504673d407';
	// let cosmosAddress = '0x9f8df0243C394A62C4bf9dBCA24Ad9d77874Acc8';
	// var fs = require('fs');
	// var file = "./abi/cosmos-token.json";
	// var cosmosGodAbi = JSON.parse(fs.readFileSync(file)); 
	// var cosmosGodContract = new web3.eth.Contract(cosmosGodAbi, cosmosGodAddress);
	// var callData = cosmosGodContract.methods.updateAddress(cosmosAddress).encodeABI();
	// core.callContract(accounts.accounts[0].getAddress());
	// cosmos.callContract()
}