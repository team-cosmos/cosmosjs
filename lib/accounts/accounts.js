// account.js

'use strict';

var User = require('./user.js');

module.exports = function() {
    return new Accounts();
};

/**
 * Set up user accounts.
 * @constructor 
 *
 * @return {User} A user object.
 */
function Accounts() {
    var _accounts = new Array();
    this.initAccounts();
}

/**
 * Restore user instance.
 */
Account.prototype.initAccounts = function() {
	_accounts.push(loadAcount('cosmos'));
}

/**
 * Create a new user.
 * @return {User} A user object.
 */
var newAccount = function() {
	var newUser = User();
	var newWallet = wallet.generate();
	newUser.setPrivateKey(wallet.getAddressString());
	newUser.setAddress(wallet.getPrivateKeyString());
	return newUser;
}

/**
 * Load an existing user.
 * @param {string} name - Name of user.
 * @return {User} A user object.
 */
var loadAcount = function(name) {
	var newUser = User();
	newUser.setPrivateKey('0x929FFF0071a12d66b9d2A90f8c3A6699551E91e3');
	newUser.setAddress('3656e131f04ddb9eaf206b2859f423c8260bdff9d7b1a071b06d405f50ed3fa0');
	return newUser;
}
