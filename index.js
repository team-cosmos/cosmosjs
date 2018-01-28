// index.js
var ethTx = require('ethereumjs-tx');
const ethClient = 'https://ropsten.infura.io/ynXBPNoUYJ3C4ZDzqjga';
  
const _address = '0x929FFF0071a12d66b9d2A90f8c3A6699551E91e3';
const _privateKey = '3656e131f04ddb9eaf206b2859f423c8260bdff9d7b1a071b06d405f50ed3fa0';

/* Set up web3 */
var Web3 = require('web3');
web3 = new Web3(new Web3.providers.HttpProvider(ethClient));
var nonce = web3.eth.getTransactionCount(_address).then(function(result) {
  sendToken(result); // Send token.
  //callContractFunction(result); // Call contract function.
}, function(error) {
  errorNonce(error);
});


/* Send money, */
var sendToken = function(nonceValue) {

	let rawTx = {
		from: _address,
		nonce: web3.utils.toHex(nonceValue),
		gasPrice: web3.utils.toHex(100000000000),
		gasLimit: web3.utils.toHex(140000),
		to: '0x078875952b34D566cB7441Ad18ec5E11d4A37251',
		value: web3.utils.toHex(2),
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

/* Call contract function */
let cosmosGodAddress = '0x2E20eD696e36005a2BcE073c727761504673d407';
let cosmosAddress = '0x9f8df0243C394A62C4bf9dBCA24Ad9d77874Acc8';
var fs = require('fs');
var file = "./abi/cosmos-god.json";
var cosmosGodAbi = JSON.parse(fs.readFileSync(file)); 
var cosmosGodContract = new web3.eth.Contract(cosmosGodAbi, cosmosGodAddress);
var callData = cosmosGodContract.methods.updateAddress(cosmosAddress).encodeABI();

var callContractFunction = function(nonceValue) {

	let rawTx = {
		from: _address,
		nonce: web3.utils.toHex(nonceValue),
		gasPrice: web3.utils.toHex(100000000000),
		gasLimit: web3.utils.toHex(140000),
		to: cosmosGodAddress,
		value: web3.utils.toHex(0),
		data: callData
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


