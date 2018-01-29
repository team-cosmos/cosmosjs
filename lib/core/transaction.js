// transaction.js

'use strict';

const _address = '0x929FFF0071a12d66b9d2A90f8c3A6699551E91e3';
const _privateKey = '3656e131f04ddb9eaf206b2859f423c8260bdff9d7b1a071b06d405f50ed3fa0';

module.exports = {
  return new Transaction(_web3);
}

function Transaction(_web3) {
    this.web3 = _web3;
}

/* Send money, */
Transaction.prototype.sendToken = function(from, to, value, nonceValue) {

	let rawTx = {
		from: from,
		nonce: web3.utils.toHex(nonceValue),
		gasPrice: web3.utils.toHex(100000000000),
		gasLimit: web3.utils.toHex(140000),
		to: to,
		value: web3.utils.toHex(value),
		data: web3.utils.toHex(0)
	}

	const privateKey = Buffer.from(_privateKey, 'hex');

	const transaction = new ethTx(rawTx);
	transaction.sign(privateKey);

	const serializedTxn = '0x' + transaction.serialize().toString('hex');
	var transactionId = web3.utils.sha3(serializedTxn);

	web3.eth.sendSignedTransaction(serializedTxn).on('receipt', 
		printTransactionId(transactionId));
}

Transaction.prototype.sendtx(abi) {
	var nonce = web3.eth.getTransactionCount(_address).then(function(result) {
	  callContractFunction(abi, result); // Call contract function.
	}, function(error) {
	  errorNonce(error);
	});
}

var callContract = function(abi, nonceValue) {

	let rawTx = {
		from: _address,
		nonce: web3.utils.toHex(nonceValue),
		gasPrice: web3.utils.toHex(100000000000),
		gasLimit: web3.utils.toHex(140000),
		to: cosmosGodAddress,
		value: web3.utils.toHex(0),
		data: abi
	}
	const privateKey = Buffer.from(_privateKey, 'hex');

	const transaction = new ethTx(rawTx);
	transaction.sign(privateKey);

	const serializedTxn = '0x' + transaction.serialize().toString('hex');
	var transactionId = web3.utils.sha3(serializedTxn);

	web3.eth.sendSignedTransaction(serializedTxn).on('receipt', 
		printTransactionId(transactionId));
}

var printTransactionId = function(transactionId) {
	console.log('Transaction sent! Tx receipt: ' + transactionId);
}


var errorNonce = function(error) {
	console.log("Error in retreiving nonce!");
}
