'use strict';

// index.js
var ethTx = require('ethereumjs-tx');
const ethClient = 

const _password = 
const _address = 
const _privateKey = 

/* Set up web3 */
var Web3 = require('web3');
web3 = new Web3(new Web3.providers.HttpProvider(ethClient));
var nonce = web3.eth.getTransactionCount(_address).then(function(response) {
  sendTransaction(response);
}, function(error) {
  errorNonce(error);
});

var sendTransaction = function(value) {

	let rawTx = {
		from: _address,
		nonce: web3.utils.toHex(value),
		gasPrice: web3.utils.toHex(100000000000),
		gasLimit: web3.utils.toHex(140000),
		to: ,
		value: web3.utils.toHex(2),
		data: web3.utils.toHex(0)
	}
	const privateKey = Buffer.from(, 'hex');
	const transaction = new ethTx(rawTx);
	transaction.sign(privateKey);
	const serializedTxn = '0x' + transaction.serialize().toString('hex');
	var transactionId = web3.utils.sha3(serializedTxn);
	web3.eth.sendSignedTransaction(serializedTxn).on('receipt', console.log(transactionId));
}


var errorNonce = function(error) {
	console.log("Error in retreiving nonce!");
}


