// user.js

const wallet = require('ethereumjs-wallet');

module.exports = function() {
    return new User();
};

function User() {
    this.name = ""
    var _address = "";
    var _privateKey = "";
}

User.prototype.setAddress = function(address) {
	_address = address;
}

User.prototype.getAddress = function() {
	 return _address;
}

User.prototype.setPrivateKey = function(privateKey) {
	_privateKey = privateKey;
}

User.prototype.getPrivateKey = function() {
	return privateKey;
}