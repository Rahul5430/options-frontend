jQuery.extend({
	getData: function() {
		var result = null;
		$.ajax({
			url: 'https://spreadsheets.google.com/feeds/cells/11CeHRJ8HTIcAxKTd6BrzMTN-gY0f8C4iI0_ZQ7nGZyQ/ocvh19r/public/basic?alt=json#',
			type: 'GET',
			dataType: 'JSON',
			async: false,
			success: function(data) {
				result = data;
			}
		});
		return result;
	}
});
var data = $.getData();
var spotprice = data.feed.entry[35].content.$t;
console.log(spotprice);
$(document).ready(function(){
	$("#select-segment").change(function() {
		var selected = $(this).children("option:selected").val();
		console.log(selected);
	});
});
// $('#spotPrice').text(spotprice);
// document.getElementById("spotPrice").innerHTML = spotprice;

function getStrikePrice123(data) {
	result = [];
	for (var i=0; i<80; i++) {
		result.push(data.feed.entry[83+23*i].content.$t);
	}
	return result;
}
var strikeprice123 = getStrikePrice123(data);
console.log(strikeprice123);

function getPremium(data) {
	result = [];
	for (var i=0; i<80; i++) {
		result.push(parseFloat((data.feed.entry[82+23*i].content.$t).replace(/,/g, '')));
	}
	return result;
}
var premium = getPremium(data);
console.log(premium);

var premium123 = {};
for (var i=0; i<80; i++) {
	// premium123[data.feed.entry[83+23*i].content.$t] = [data.feed.entry[82+23*i].content.$t, data.feed.entry[84+23*i].content.$t];
	premium123[data.feed.entry[83+23*i].content.$t] = [parseFloat((data.feed.entry[82+23*i].content.$t).replace(/,/g, '')), parseFloat((data.feed.entry[84+23*i].content.$t).replace(/,/g, ''))];
}
console.log(premium123);
var premiumvalue = premium123[12800];
console.log(premiumvalue);
// $(document).ready(function() {
// 	$(".strike_price").change(function() {
// 		var strikeprice = $(this).children("option:selected").val();
// 		strikeprice = strikeprice.replace("string:", "0");
// 		strikeprice = parseInt(strikeprice);
// 		console.log(strikeprice);
// 		console.log(premium123[strikeprice]);
// 		premiumvalue = premium123[strikeprice];
// 		console.log(premiumvalue);
// 	});
// });

var app = angular.module("optionsApp", ['ui.bootstrap', 'chart.js']);

app.controller('MainCtrl', ["$scope", "DataService", "UtilService", function ($scope, DataService, UtilService) {
	$scope.strike_price = strikeprice123;
	$scope.spot_price = [spotprice];
	$scope.index = ["NIFTY", "BANKNIFTY", "USDINR"]
	$scope.premiumValue = premium123[12800];
	$scope.setups = DataService.getAllSetups();
	$scope.chart = {
		data: {},
		series: ['Profit & Loss'],
		options: {
			responsive: true
		}
	};
	$scope.trade_type = 'call';
	$scope.changetrade = function(trade_type) {
		$scope.trade_type = trade_type;
		var strikeprice = $(".strike_price").children("option:selected").val();
		strikeprice = strikeprice.replace("string:", "0");
		strikeprice = parseInt(strikeprice);
		if (trade_type == 'put') {
			console.log('put');
			console.log(premium123[strikeprice][1]);
			$scope.premiumValue = [premium123[strikeprice][1]];
		} else if (trade_type == 'call') {
			console.log('call');
			console.log(premium123[strikeprice][0]);
			$scope.premiumValue = [premium123[strikeprice][0]];
		} else {
			console.log('no');
		}
	};
	$scope.changestrikeprice = function(setup) {
		var strikeprice = $(".strike_price").children("option:selected").val();
		strikeprice = strikeprice.replace("string:", "0");
		strikeprice = parseInt(strikeprice);
		console.log(strikeprice);
		console.log(premium123[strikeprice])
		// $scope.premiumValue = premium123[strikeprice];
		if ($scope.trade_type == 'put') {
			console.log('put');
			console.log(premium123[strikeprice][1]);
			$scope.premiumValue = [premium123[strikeprice][1]];
		} else if ($scope.trade_type == 'call') {
			console.log('call');
			console.log(premium123[strikeprice][0]);
			$scope.premiumValue = [premium123[strikeprice][0]];
		} else {
			console.log('no');
		}
	};
	
	$scope.$watch('setups', function () {
		angular.forEach($scope.setups, function (setup) {
			setup.profit = $scope.netProfit(setup);
			$scope.updateChartData(setup);
		});
		DataService.saveSetups($scope.setups);
	}, true);

	$scope.addSetup = function () {
		var setup = {
			id: UtilService.getUniqueId(),
			name: '',
			spotPrice: 0,
			trades: [],
			profit: 0
		};
		console.log(setup.spotPrice);
		$scope.setups.push(setup);
	};

	$scope.deleteSetup = function (setup) {
		for (var i = 0; i < $scope.setups.length; i++) {
			if ($scope.setups[i].id == setup.id) {
				$scope.setups.splice(i, 1);
				DataService.saveSetups($scope.setups);
				break;
			}
		}
	};

	$scope.addTrade = function (setup) {
		setup.trades.push({
			id: UtilService.getUniqueId(),
			tradeType: "buy",
			optionType: "call",
			strike: 0,
			premium: 0,
			qty: 1
		});
	};

	$scope.removeTrade = function (setup, trade) {
		for (var i = 0; i < setup.trades.length; i++) {
			if (setup.trades[i].id == trade.id) {
				setup.trades.splice(i, 1);
				DataService.saveSetups($scope.setups);
				break;
			}
		}
	};

	$scope.netPremium = function (setup) {
		var ret = 0;
		setup.trades.forEach(function (trade) {
			if (trade.tradeType == "buy") {
				ret -= trade.premium * trade.qty;
			} else { //sell
				ret += trade.premium * trade.qty;
			}
		});

		return ret;
	};

	$scope.netProfit = function (setup, spotPrice) {
		if (!spotPrice) {
			//DataService.saveSetups($scope.setups);
			spotPrice = parseInt(setup.spotPrice, 10);
		} else {
			//calculating for chart
		}

		if (spotPrice == 0) return 0;

		var ret = 0;
		setup.trades.forEach(function (trade) {
			if (trade.strike <= 0) return;

			if (trade.tradeType == "buy") {
				if (trade.optionType == "call") {
					ret += (Math.max(spotPrice - trade.strike, 0) - trade.premium) * trade.qty;
				} else { //put
					ret += (Math.max(trade.strike - spotPrice, 0) - trade.premium) * trade.qty;
				}
			} else { //sell
				if (trade.optionType == "call") {
					ret += (trade.premium - Math.max(spotPrice - trade.strike, 0)) * trade.qty;
				} else { //put
					ret += (trade.premium - Math.max(trade.strike - spotPrice, 0)) * trade.qty;
				}
			}
		});

		return parseFloat(ret).toFixed(2);
	};

	$scope.getProfitClass = function (setup) {
		if (setup.profit > 0) {
			return "green";
		} else if (setup.profit < 0) {
			return "red";
		} else {
			return "";
		}
	};

	$scope.updateChartData = function (setup) {
		spotPrice = parseInt(setup.spotPrice, 10);
		if (spotPrice == 0) return 0;

		var spotRange = parseInt(spotPrice * 0.08, 10);
		var spotInc = UtilService.getSpotInc(spotRange);
		var spotMin = Math.ceil((spotPrice - spotRange) / spotInc) * spotInc;
		var spotMax = Math.ceil((spotPrice + spotRange) / spotInc) * spotInc;


		var profitArr = [];
		var labelArr = [];

		for (var spot = spotMin; spot <= spotMax; spot += spotInc) {
			labelArr.push(spot);
			profitArr.push($scope.netProfit(setup, spot));
		}

		$scope.chart.data[setup.id] = {
			profits: [profitArr],
			labels: labelArr
		};

		return 1;
	};

}]);

app.factory('DataService', ["StorageService", function (StorageService) {
	var methods = {
		getAllSetups: function () {
			var data = StorageService.getData() || [];
			return data;
		},
		saveSetups: function (data) {
			StorageService.saveData(data);
		}
	};
	return methods;
}]);

app.factory('StorageService', function () {
	var methods = {
		saveData: function (data) {
			if (typeof localStorage !== "undefined") {
				if (data.length) {
					localStorage.setItem('_data', JSON.stringify(data));
				}
			}
		},
		getData: function () {
			var ret = [];
			if (typeof localStorage !== "undefined") {
				var data = localStorage.getItem('_data');
				if (data) {
					ret = JSON.parse(data);
				}
			}
			return ret;
		}
	};
	return methods;
});

app.factory('UtilService', function () {
	var methods = {
		getUniqueId: function () {
			function s4() {
				return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
			}
			return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
		},

		getSpotInc: function (x) {
			switch (true) {
				case x < 10:
					return 1;
				case x < 20:
					return 2;
				case x < 50:
					return 5;
				case x < 100:
					return 10;
				case x < 500:
					return 50;
				case x < 1000:
					return 100;
				case x < 2000:
					return 200;
				default:
					return 500;
			}
		}
	};
	return methods;
});