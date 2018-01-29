module.exports = require('./lib/cosmos');

const ethClient = 'https://ropsten.infura.io/ynXBPNoUYJ3C4ZDzqjga';

/* Set up web3 */
var Web3 = require('web3');
web3 = new Web3(new Web3.providers.HttpProvider(ethClient));

var 

var testTransaction = function() {

	/* Call contract function */
	let cosmosGodAddress = '0x2E20eD696e36005a2BcE073c727761504673d407';
	let cosmosAddress = '0x9f8df0243C394A62C4bf9dBCA24Ad9d77874Acc8';
	var fs = require('fs');
	var file = "./abi/cosmos-god.json";
	var cosmosGodAbi = JSON.parse(fs.readFileSync(file)); 
	var cosmosGodContract = new web3.eth.Contract(cosmosGodAbi, cosmosGodAddress);
	var callData = cosmosGodContract.methods.updateAddress(cosmosAddress).encodeABI();

	sendToken(_address, '0x253378e2093d818c4887115446f5640365ef131bed9f4a4b87622c80a5e7d2c0', 2);
	sendtx(callData);
}