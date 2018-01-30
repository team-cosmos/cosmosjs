// core.js

'use strict';

const Transaction = require('./transaction.js');

module.exports = function(web3) {
    return new Core(web3);
};

/**
 * Set up Core library and relevant modules.
 * @constructor 
 *
 * @param {Web3 object} web3 - Externally created web3 object.
 */
function Core(web3) {
    this._web3 = web3;
    this._transaction = Transaction(this._web3);
}

/**
 * Wrapper for Transaction's approve method. 
 *
 * @param {User object} user - User instance of sender.
 * @param {string} spender - Address of spender.
 * @param {int} value - Amount to add to allowance.
 */
Core.prototype.approve = function(user, spender, value) {
    this._transaction.approve(user, spender, value);
};

/**
 * Wrapper for Transaction's sendToken method. 
 *
 * @param {User object} user - User instance of sender.
 * @param {string} to - Address of receiver.
 * @param {int} value - Amount to send.
 */
Core.prototype.sendToken = function(user, to, value) {
    this._transaction.sendToken(user, to, value);
};

/**
 * Wrapper for Transaction's callContract method. 
 *
 * @param {User object} user - User instance of caller.
 * @param {string} to - Address of function being called.
 * @param {Abi object} abi - Abi encoded function call.
 */
Core.prototype.callContract = function(user, to, abi) {
    this._transaction.callContract(abi);
};