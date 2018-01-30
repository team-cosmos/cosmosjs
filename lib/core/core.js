// core.js

'use strict';

const _fs = require('fs');
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

    var addrSynced = this.syncAddresses();

    if (addrSynced) { this.initContracts() };
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
    var cosmosGodContract = new this._web3.eth.Contract(this._cosmosGodAbi, 
                                                        this._cosmosGodAddress);
    /* Fetch cosmos address */
    cosmosGodContract.methods.getAddress().call().then(function(result) {
        context._cosmosAddress = result;
        console.log('Retreived cosmos address: ' + result);
    }).then(function() {
        /* Construct cosmos contract */
        var _cosmosAbifile = "./lib/abi/cosmos.json";
        context._cosmosAbi = JSON.parse(_fs.readFileSync(_cosmosAbifile));
        context.cosmosContract = new context._web3.eth.Contract(context._cosmosAbi, 
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
    });
    
    return true;
}

/**
 * Initialize contracts. 
 *
 * @return {boolean} success - Sync succeeded.
 */
Core.prototype.initContracts = function() {
    this._transaction = Transaction(this._web3);
}

/**
 * Sync abis deployed contracts. 
 *
 * Stub for now.
 *
 * @return {boolean} success - Sync succeeded.
 */
Core.prototype.syncAbi = function() {
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
 * @param {string} address - Address of contract being called.
 * @param {Abi object} abi - Abi encoded function call.
 */
Core.prototype.callContract = function(user, address, abi) {
    this._transaction.callContract(abi);
};