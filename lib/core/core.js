// core.js

'use strict';

const _fs = require('fs');
const Transaction = require('./transaction.js');

var _cosmos;

module.exports = function(cosmos) {
    return new Core(cosmos);
};

/**
 * Set up Core library and relevant modules.
 * @constructor 
 *
 * @param {Object} cosmos - Cosmos module instance.
 */
function Core(cosmos) {
    _cosmos = cosmos;

    this.syncAddresses();
}

/**
 * Sync addresses deployed contracts. 
 *
 * @return {boolean} success - Sync succeeded.
 */
Core.prototype.syncAddresses = function() {

    var context = this;

    /* Load cosmos-god abi */
    var _cosmosGodAbifile = "./lib/abi/cosmos-god.json";
    this._cosmosGodAbi = JSON.parse(_fs.readFileSync(_cosmosGodAbifile));
    this._cosmosGodAddress = '0x2E20eD696e36005a2BcE073c727761504673d407';
    var cosmosGodContract = new _cosmos._web3.eth.Contract(this._cosmosGodAbi, 
                                                           this._cosmosGodAddress);
    /* Fetch cosmos address */
    cosmosGodContract.methods.getAddress().call().then(function(result) {
        context._cosmosAddress = result;
        console.log('Retreived cosmos address: ' + result);
    }).then(function() {
        /* Construct cosmos contract */
        var _cosmosAbifile = "./lib/abi/cosmos.json";
        context._cosmosAbi = JSON.parse(_fs.readFileSync(_cosmosAbifile));
        context.cosmosContract = new _cosmos._web3.eth.Contract(context._cosmosAbi, 
                                                                context._cosmosAddress);
    }).then(function() {
        /* Fetch token address */
        context.cosmosContract.methods.getAddress(0).call().then(function(result) {
            context._tokenAddress = result;
            console.log('Retreived token address: ' + result);
        });
    }) .then(function() {
        /* Fetch grid address */
        context.cosmosContract.methods.getAddress(1).call().then(function(result) {
        context._gridAddress = result;
            console.log('Retreived grid address: ' + result);
        });
    }).then(function() {
        /* Fetch market address */
        context.cosmosContract.methods.getAddress(2).call().then(function(result) {
            context._marketAddress = result;
            console.log('Retreived market address: ' + result);
        });   
    }).then(function() {
        context.initContracts();
    });
    
    return true;
}

/**
 * Initialize contracts. 
 *
 * @return {boolean} success - Sync succeeded.
 */
Core.prototype.initContracts = function() {
    this._transaction = Transaction(_cosmos);
}

/**
 * Sync abis deployed contracts. 
 *
 * @return {boolean} success - Sync succeeded.
 */
Core.prototype.syncAbi = function() {
    // Stub for now.
    return true;
}

/**
 * Wrapper for Transaction's callContract method. 
 *
 * @param {Object} user - User instance of caller.
 * @param {Object} abi - Abi encoded function call.
 * @param {string} address - Address of contract being called.
 */
Core.prototype.callContract = function(user, abi, address) {
    this._transaction.callContract(user, abi, addres);
};

/**
 * Wrapper for Transaction's approve method. 
 *
 * @param {Object} user - User instance of sender.
 * @param {string} spender - Address of spender.
 * @param {int} value - Amount to add to allowance.
 */
Core.prototype.approve = function(user, spender, value) {
    this._transaction.approve(user, spender, value);
};

/**
 * Wrapper for Transaction's sendToken method. 
 *
 * @param {Object} user - User instance of sender.
 * @param {string} to - Address of receiver.
 * @param {int} value - Amount to send.
 */
Core.prototype.sendToken = function(user, to, value) {
    this._transaction.sendToken(user, to, value);
};