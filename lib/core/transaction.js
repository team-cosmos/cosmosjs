// transaction.js

'use strict';

const _fs = require('fs');
const ethTx = require('ethereumjs-tx'); 

module.exports = function(web3) {
    return new Transaction(web3);
};

/**
 * Set up Transaction module.
 * @constructor
 * 
 * @param {Web3 object} web3 - Externally created web3 object.
 */
function Transaction(web3) {
    this._web3 = web3;

    /* Load abi */
	var _file = "./lib/abi/cosmos-token.json";
	this._cosmosTokenAbi = JSON.parse(_fs.readFileSync(_file));
	this._cosmosTokenAddress = '0x0fD0E740B012bB7AA4E48AD6ECDB854345C2463d';
	this._cosmosMarketAddress = '0xb24af1f3d5ec84aa14693d114ae94ef542da521f';
    this._cosmosTokenContract = new this._web3.eth.Contract(this._cosmosTokenAbi, 
    														this._cosmosTokenAddress);
}

/**
 * Approve spending on contract's behalf.
 * 
 * @param {User object} user - User instance of sender.
 * @param {string} spender - Address of spender.
 * @param {int} value - Amount to add to allowance.
 */
Transaction.prototype.approve = function(user, spender, value) {

	var callData = this._cosmosTokenContract.methods.approve(
								spender, value).encodeABI();

	var ccwv = this.callContractWithValues;
	var context = this;
	var tokenContractAddr = this._cosmosTokenAddress;

	var nonce = this._web3.eth.getTransactionCount(user.getAddressString()).then(
	function(result) {
	  ccwv(context, user, result, tokenContractAddr, 0, callData);
	}, function(error) {
	  errorNonce(error);
	});
}


/**
 * Send Cosmos token.
 * 
 * @param {User object} user - User instance of sender.
 * @param {string} to - Address of receiver.
 * @param {int} value - Amount to send.
 */
Transaction.prototype.sendToken = function(user, to, value) {

	var callData = this._cosmosTokenContract.methods.transferFrom(
								user.getAddressString(), to, value).encodeABI();

	var ccwv = this.callContractWithValues;
	var context = this;
	var tokenContractAddr = this._cosmosTokenAddress;

	var nonce = this._web3.eth.getTransactionCount(user.getAddressString()).then(
	function(result) {
	  ccwv(context, user, result, tokenContractAddr, 0, callData);
	}, function(error) {
	  errorNonce(error);
	});
}

/**
 * Call contract requiring transaction with supplied abi.
 * 
 * @param {User object} user - User instance of caller.
 * @param {string} to - Address of function being called.
 * @param {Abi object} abi - Abi encoded function call.
 */
Transaction.prototype.callContract = function(user, to, abi) {

	var ccwv = this.callContractWithValues;
	var context = this;

	var nonce = this._web3.eth.getTransactionCount(user.getAddressString()).then(
	function(result) {
	  ccwv(context, user, result, to, 0, abi);
	}, function(error) {
	  errorNonce(error);
	});
}

/**
 * Helper function for creating and signing a transaction.
 * 
 * @param {int} nonce - Nonce of sender's account.
 * @param {string} to - Address of function being called.
 * @param {int} value - 'value' field of a raw transaction.
 * @param {data} data - 'data' field of a raw transaction.
 */
Transaction.prototype.callContractWithValues = function(context, user, nonce, to, value, data) {

	var __web3 = context._web3;

	let rawTx = {
		from: user.getAddressString(),
		nonce: __web3.utils.toHex(nonce),
		gasPrice: __web3.utils.toHex(100000000000),
		gasLimit: __web3.utils.toHex(140000),
		to: to,
		value: __web3.utils.toHex(value),
		data: data
	}

	const privateKey = Buffer.from(user.getPrivateKeyString(), 'hex');

	const transaction = new ethTx(rawTx);
	transaction.sign(privateKey);

	const serializedTxn = '0x' + transaction.serialize().toString('hex');
	var transactionId = __web3.utils.sha3(serializedTxn);

	__web3.eth.sendSignedTransaction(serializedTxn).on('receipt', 
		printTransactionId(transactionId));
}

/**
 * Indicate successful transaction and print transaction id.
 * 
 * @param {string} transactionId - Transaction Id.
 */
var printTransactionId = function(transactionId) {
	console.log('Transaction sent! Tx receipt: ' + transactionId);
}

/**
 * Indicate error in fetching nonce.
 *
 * @param {string} error - Error from promise.
 */
var errorNonce = function(error) {
	console.log("Error in retreiving nonce!");
}
