// core.js

'use strict';

const Transaction = require('transaction.js');

module.exports = function(web3) {
    return new Core(web3);
};

function Core(web3) {
    var _web3 = web3;
    var transaction = new Transaction(_web3);
}

Core.prototype.sendToken = function(user, to, value) {
    transaction.sendToken(from, to, value);
};

Core.prototype.sendToken = function(abi) {
    transaction.callContract(abi);
};