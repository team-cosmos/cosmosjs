// core.js

'use strict';

// var ss = 


const Transaction = require('./transaction');

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

    var context = this;

    this.ready = new Promise(function(resolve, reject) {
      // do a thing, possibly async, then…

      if (context.syncAddresses()) {
        resolve("Stuff worked!");
      }
      else {
        reject(Error("It broke"));
      }
    });

}

/**
 * Sync addresses deployed contracts. 
 *
 * @return {boolean} success - Sync succeeded.
 */
Core.prototype.syncAddresses = function() {

    var context = this;

    /* Load cosmos-god abi */
    this._cosmosGodAbi = require('../contracts/cosmos-god.json');
    this._cosmosGodAddress = '0x2E20eD696e36005a2BcE073c727761504673d407';
    var cosmosGodContract = new _cosmos._web3.eth.Contract(this._cosmosGodAbi, 
                                                           this._cosmosGodAddress);
    /* Fetch cosmos address */
    cosmosGodContract.methods.getAddress().call().then(function(result) {
        console.log('Retreived cosmos address: ' + result);
        context._cosmosAddress = result;
        context._cosmosAbi = require('../contracts/cosmos.json');
    }).then(function() {
        /* Construct cosmos contract */
        context.cosmosContract = new _cosmos._web3.eth.Contract(context._cosmosAbi, 
                                                                context._cosmosAddress);
    }).then(function() {
        /* Fetch token address */
        context.cosmosContract.methods.getAddress(0).call().then(function(result) {
            console.log('Retreived token address: ' + result);
            context._tokenAddress = result;
            context._tokenAbi = require('../contracts/cosmos-token.json');

            // TODO: maybe change function to inline 
            context.initContracts();
        });
    }).then(function() {
        /* Fetch grid address */
        context.cosmosContract.methods.getAddress(1).call().then(function(result) {
            console.log('Retreived grid address: ' + result);
            context._gridAddress = result;
            context._gridAbi = require('../contracts/cosmos-grid.json');
        });
    }).then(function() {
        /* Fetch market address */
        context.cosmosContract.methods.getAddress(2).call().then(function(result) {
            console.log('Retreived market address: ' + result);
            context._marketAddress = result;
            context._marketAbi = require('../contracts/cosmos-market.json');
        });   
    });
    
    return true;
}


// TODO: maybe change the name to initTransactionContract
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