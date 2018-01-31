// grid.js

const _fs = require('fs');

var _cosmos;

module.exports = function(cosmos) {
    return new Grid(cosmos);
};

/**
 * Set up grid methods.
 * @constructor 
 *
 * @param {Object} cosmos - Cosmos module instance.
 */
function Grid(cosmos) {
    _cosmos = cosmos;

    /* Load abi */
		this.address = _cosmos.core._gridAddress;
		this.abi = _cosmos.core._gridAbi;
    this.contract = new _cosmos._web3.eth.Contract(this.abi, this.address);
}

/**
 * Wrapper for Grid's registerOwner method. 
 *
 * @param {Object} user - User instance of sender.
 * @param {string} owner - Address of owner.
 */
Grid.prototype.registerOwner = function(user, owner) {
    _cosmos.core.callContract(user, this.address, owner);
};