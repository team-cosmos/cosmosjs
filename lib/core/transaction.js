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
	var _file = "../abi/cosmos-token.json";
	this._cosmosTokenAbi = JSON.parse(_fs.readFileSync(_file));
	this._cosmosTokenAddress = '0x0fD0E740B012bB7AA4E48AD6ECDB854345C2463d';
    this._cosmosTokenContract = _web3.eth.Consract(_cosmosTokenAbi, _cosmosTokenAddress);
}

/**
 * Setter for public address.
 * 
 * @param {User object} user - User instance of sender.
 * @param {string} to - Address of receiver.
 * @param {int} value - Amount to send.
 */
Transaction.prototype.sendToken = function(user, to, value) {

	var callData = _cosmosTokenContract.methods.transferFrom(
								user.getAddress(), to, value).encodeABI();

	var nonce = _web3.eth.getTransactionCount(user.getAddress()).then(function(result) {
	  callContractWithValues(result, value, 0); // Call contract function.
	}, function(error) {
	  errorNonce(error);
	});
}

/**
 * Call contract requiring transaction with supplied abi.
 * 
 * @param {Abi object} abi - Abi encoded function call.
 */
Transaction.prototype.callContract = function(abi) {
	var nonce = _web3.eth.getTransactionCount(user.getAddress()).then(function(result) {
	  callContractWithValues(result, 0, abi); // Call contract function.
	}, function(error) {
	  errorNonce(error);
	});
}

/**
 * Helper function for creating and signing a transaction.
 * 
 * @param {int} nonce - Nonce of sender's account.
 * @param {string} value - 'value' field of a raw transaction.
 * @param {data} data - 'data' field of a raw transaction.
 */
var callContractWithValues = function(nonce, value, data) {

	let rawTx = {
		from: user.getAddress(),
		nonce: _web3.utils.toHex(nonce),
		gasPrice: _web3.utils.toHex(100000000000),
		gasLimit: _web3.utils.toHex(140000),
		to: cosmosGodAddress,
		value: _web3.utils.toHex(value),
		data: _web3.utils.toHex(data)
	}
	const privateKey = Buffer.from(user.getPrivateKey(), 'hex');

	const transaction = new ethTx(rawTx);
	transaction.sign(privateKey);

	const serializedTxn = '0x' + transaction.serialize().toString('hex');
	var transactionId = _web3.utils.sha3(serializedTxn);

	_web3.eth.sendSignedTransaction(serializedTxn).on('receipt', 
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
