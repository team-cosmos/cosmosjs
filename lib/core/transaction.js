// transaction.js

'use strict';

const ethTx = require('ethereumjs-tx'); 



module.exports = function(web3) {
    return new Transaction(web3);
};

function Transaction(web3) {
    var _web3 = web3;
	var _fs = require('fs');
	var _file = "../abi/cosmos-token.json";
	var _cosmosTokenAbi = JSON.parse(_fs.readFileSync(_file));
	var _cosmosTokenAddress = '0x0fD0E740B012bB7AA4E48AD6ECDB854345C2463d';
    var _cosmosTokenContract = _web3.eth.Consract(_cosmosTokenAbi, _cosmosTokenAddress);
}

/* Send money, */
Transaction.prototype.sendToken = function(user, to, value) {

	var callData = _cosmosTokenContract.methods.transferFrom(
								user.getAddress(), to, value).encodeABI();

	var nonce = _web3.eth.getTransactionCount(user.getAddress()).then(function(result) {
	  callContractWithValues(result, value, 0); // Call contract function.
	}, function(error) {
	  errorNonce(error);
	});
}

Transaction.prototype.callContract = function(abi) {
	var nonce = _web3.eth.getTransactionCount(user.getAddress()).then(function(result) {
	  callContractWithValues(result, 0, abi); // Call contract function.
	}, function(error) {
	  errorNonce(error);
	});
}

var callContractWithValues = function(nonceValue, value, data) {

	let rawTx = {
		from: user.getAddress(),
		nonce: _web3.utils.toHex(nonceValue),
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

var printTransactionId = function(transactionId) {
	console.log('Transaction sent! Tx receipt: ' + transactionId);
}


var errorNonce = function(error) {
	console.log("Error in retreiving nonce!");
}
