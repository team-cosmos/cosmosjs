// transaction.js

'use strict';

const ethTx = require('ethereumjs-tx');

module.exports = {
  sendToken:sendToken,
  callContract:callContract
}

function Transaction(web3) {
    var _web3 = web3;
}

/* Send money, */
var sendToken = function(user, to, value) {

	let rawTx = {
		from: user.getAddress(),
		nonce: _web3.utils.toHex(nonceValue),
		gasPrice: _web3.utils.toHex(100000000000),
		gasLimit: _web3.utils.toHex(140000),
		to: to,
		value: _web3.utils.toHex(value),
		data: _web3.utils.toHex(0)
	}

	var abi = ;
	callContract(abi);
}

var callContract = function(abi) {
	var nonce = _web3.eth.getTransactionCount(user.getAddress()).then(function(result) {
	  callContractWithNonce(abi, result); // Call contract function.
	}, function(error) {
	  errorNonce(error);
	});
}

var callContractWithNonce = function(abi, nonceValue) {

	let rawTx = {
		from: user.getAddress(),
		nonce: _web3.utils.toHex(nonceValue),
		gasPrice: _web3.utils.toHex(100000000000),
		gasLimit: _web3.utils.toHex(140000),
		to: cosmosGodAddress,
		value: _web3.utils.toHex(0),
		data: abi
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
