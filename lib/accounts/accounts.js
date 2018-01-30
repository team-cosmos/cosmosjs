// accounts.js

'use strict';

var User = require('./user.js');

module.exports = function() {
    return new Accounts();
};

/**
 * Set up user accounts.
 * @constructor 
 */
function Accounts() {
    this._accounts = new Array();
    this.initAccounts();
}

/**
 * Restore or instantiate user instance.
 */
Accounts.prototype.initAccounts = function() {
	var newUser = loadAccount('cosmos');
	this._accounts.push(newUser);
}

/**
 * Create a new user.
 * @return {User} A user object.
 */
var newAccount = function() {
	var newUser = User();
	var newWallet = wallet.generate();
	newUser.setAddress(wallet.getAddressString());
	newUser.setPrivateKey(wallet.getPrivateKeyString());
	return newUser;
}

/**
 * Load an existing user.
 *
 * @param {string} name - Name of user.
 * @return {User} A user object.
 */
var loadAccount = function(name) {
	var newUser = User();
	newUser.setAddress('0x929FFF0071a12d66b9d2A90f8c3A6699551E91e3');
	newUser.setPrivateKey('3656e131f04ddb9eaf206b2859f423c8260bdff9d7b1a071b06d405f50ed3fa0');
	return newUser;
}
