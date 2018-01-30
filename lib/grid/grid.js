// grid.js

const _fs = require('fs');

var cosmos;

module.exports = function(cosmos) {
    return new Grid(cosmos);
};

/**
 * Set up grid methods.
 * @constructor 
 *
 * @param {Cosmos object} cosmos - Cosmos module instance.
 */
function Grid(_cosmos) {
    cosmos = _cosmos;

    /* Load abi */
	var _file = "./lib/abi/cosmos-grid.json";
	this._abi = JSON.parse(_fs.readFileSync(_file));
	this._address = '0x0fD0E740B012bB7AA4E48AD6ECDB854345C2463d';
    this._contract = new cosmos._web3.eth.Contract(this._abi, this._address);
}

/**
 * Wrapper for Grid's registerOwner method. 
 *
 * @param {User object} user - User instance of sender.
 * @param {string} owner - Address of owner.
 */
Grid.prototype.registerOwner = function(user, owner) {
    cosmos.core.callContract(user, this._address, owner);
};