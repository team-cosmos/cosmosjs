// util.js

var _cosmos;

module.exports = function(cosmos) {
    return new Util(cosmos);
};

/**
 * Initialize utility module.
 * @constructor
 * 
 * @param {Object} cosmos - Cosmos module instance.
 */
function Util(cosmos) {
	var _cosmos = cosmos;
}

/**
 * Generate abi of a function wih parameters.
 * 
 * @param {Object} abi - Abi JSON contract.
 * @param {string} address - Address of contract.
 */
Util.prototype.generateABI = function(abi, address) {
	var contract = new _cosmos._web3.eth.Contract(abi, address);
}