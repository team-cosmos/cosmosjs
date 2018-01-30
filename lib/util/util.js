// util.js

module.exports = function() {
    return new Util();
};

function Util(web3) {
	var _web3 = web3;
}

Util.prototype.generateABI = function(abi, address) {
	var contract = new _web3.eth.Contract(abi, address);

}