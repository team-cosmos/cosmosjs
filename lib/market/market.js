var _cosmos;

module.exports = function(cosmos) {
	return new Market(cosmos);
} 

var Market = function(cosmos) {

		_cosmos = cosmos; 
		
		this.abi = cosmos.core. 
		this.address = cosmos.core.marketAddress;
		this.MarketContract = new web3.eth.Contract(marketABI, marketAddr, {
			// from: user_addr
		});
 		

    // ---example ---
    // this.getSellListing(function(err, result) {
    // 	console.log(result[0].quantity)

    // });

    this.init();
}

Market.prototype.init = function() {
	
};


// get list of sell listings
Market.prototype.getSellListing = function(callback) {

	var MarketContract = this.MarketContract;

  this.getListingCount(function(err, count) {
  	if(err) console.log(err);

  	var sellListingList = [];

  	getListingById(0);

  	function getListingById(i) {
			MarketContract.methods.getSellListing(i).call({}, function(err, result){
				sellListingList.push(result);
				i++;

				if(i < count) {
					getListingById(i);
				}
				else {
					callback(err, sellListingList);
				}
			});  		
  	}
  });
};


// get number of sellListings
Market.prototype.getListingCount = function(callback) {
	this.MarketContract.methods.sellListingId().call({}, function(err, result){
			callback(err, result);
	});
};




// MarketContract.methods.sellListingId().call({}, function(err, result){
// 	if(err) console.log(err);

// 	for(var i = 0; i < result; i++) {
// 		MarketContract.methods.getSellListing(i).call({}, function(err, result){
// 			if(err) console.log(err);

// 		  // ejse.data('main_file', 'main_dashboard.ejs');

// 			// active
// 			// energyType
// 			// quantity
// 			// seller
// 			// success
// 			// unitPrice


//       // <th>Listing Id</th>
//       // <th>Energy Type</th>
//       // <th>Seller</th>
//       // <th>Price</th>
//       // <th>Quantity</th>
//       // <th>Status</th>

// 			// console.log(result.)

//                       // <tr>
//                       //   <td>Yiorgos Avraamu</td>
//                       //   <td>2012/01/01</td>
//                       //   <td>Member</td>
//                       //   <td>
//                       //     <span class="badge badge-success">Active</span>
//                       //   </td>
//                       // </tr>
//                       console.log(result)
// 			$('table#sell_listing tbody').append("<tr><td>" + result.id + "</td><td>" + result.energyType + "</td><td>" + result.seller + "</td><th>" + result.unitPrice + "</th><th>" + result.quantity + "</th><td><span class='badge badge-success'>Active</span></td></tr>");

// 		});
// 	}

// });