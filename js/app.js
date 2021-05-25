var url_nifty = 'https://spreadsheets.google.com/feeds/cells/11CeHRJ8HTIcAxKTd6BrzMTN-gY0f8C4iI0_ZQ7nGZyQ/ocvh19r/public/basic?alt=json#';
var url_banknifty = 'https://spreadsheets.google.com/feeds/cells/11CeHRJ8HTIcAxKTd6BrzMTN-gY0f8C4iI0_ZQ7nGZyQ/o6nd5tx/public/basic?alt=json';
var url_usdinr = '';

// var changeIndex = function() {
// 	// var x = document.getElementById("index");
// 	var x = $('#index').children("option:selected").val();
// 	console.log(x);
// 	if (x === "string:BANKNIFTY") {
// 		console.log('BANKNIFTY');
// 		url = url_banknifty;
// 	} else if (x === "string:USDINR") {
// 		console.log('USDINR');
// 		url = url_usdinr;
// 	} else {
// 		console.log('NIFTY');
// 	}
// }

// jQuery.extend({
// 	getNiftyData: function() {
// 		var result = null;
// 		$.ajax({
// 			url: url_nifty,
// 			type: 'GET',
// 			dataType: 'JSON',
// 			async: false,
// 			success: function(data) {
// 				result = data;
// 			}
// 		});
// 		return result;
// 	}
// });
// var niftyData = $.getNiftyData();
// var spotprice = niftyData.feed.entry[35].content.$t;
// console.log(spotprice);
// $(document).ready(function(){
// 	$("#select-segment").change(function() {
// 		var selected = $(this).children("option:selected").val();
// 		console.log(selected);
// 	});
// });

// function getStrikePrice123(data) {
// 	result = [];
// 	// for (var i=0; i<80; i++) {
// 	var i=0;
// 	while (data.feed.entry[83+23*i].content.$t != "#VALUE!" && data.feed.entry[83+23*i].content.$t != "") {
// 		result.push(data.feed.entry[83+23*i].content.$t);
// 		i++;
// 	}
// 	return result;
// }
// var strikeprice123 = getStrikePrice123(niftyData);
// console.log(strikeprice123);

// // function getPremium(data) {
// // 	result = [];
// // 	for (var i=0; i<80; i++) {
// // 		result.push(parseFloat((data.feed.entry[82+23*i].content.$t).replace(/,/g, '')));
// // 	}
// // 	return result;
// // }
// // var premium = getPremium(niftyData);
// // console.log(premium);

// var premium123 = {};
// for (var i=0; i<80; i++) {
// 	premium123[niftyData.feed.entry[83+23*i].content.$t] = [parseFloat((niftyData.feed.entry[82+23*i].content.$t).replace(/,/g, '')), parseFloat((niftyData.feed.entry[84+23*i].content.$t).replace(/,/g, ''))];
// }
// console.log(premium123);

var stock = function(url) {
	jQuery.extend({
		getStockData: function() {
			var result = null;
			$.ajax({
				url: url,
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
	var data = $.getStockData();
	var spotprice = data.feed.entry[35].content.$t;
	$("#spot_Price").text(spotprice);
	var strikeprice123 = [];
	var premium123 = {};
	var i=0;
	while (data.feed.entry[83+23*i].content.$t != "#VALUE!" && data.feed.entry[83+23*i].content.$t != "") {
		strikeprice123.push(data.feed.entry[83+23*i].content.$t);
		premium123[data.feed.entry[83+23*i].content.$t] = [parseFloat((data.feed.entry[82+23*i].content.$t).replace(/,/g, '')), parseFloat((data.feed.entry[84+23*i].content.$t).replace(/,/g, ''))];;
		i++;
	}
	return {
		"spotprice" : spotprice,
		"premium123" : premium123
	}
}
console.log(stock(url_nifty));
// var stockdata = stock(url_nifty)
$(document).ready(function() {
	$("#spot_Price").text(stock(url_nifty)["spotprice"]);
});

var app = angular.module("optionsApp", ['ui.bootstrap', 'chart.js']);

app.controller('MainCtrl', ["$scope", "DataService", "UtilService", function ($scope, DataService, UtilService) {
	$scope.id = 0;
	$scope.stockdata = stock(url_nifty);
	$scope.premiumData = $scope.stockdata["premium123"];
	$scope.premium = {};
	$scope.strike_price = Object.keys($scope.stockdata["premium123"]);
	$scope.spot_price = [$scope.stockdata["spotprice"]];
	$scope.indices = ["NIFTY", "BANKNIFTY", "USDINR"]
	// $scope.premiumValue = [premium123[12800][0]];
	// $scope.premiumValue = [$scope.stockdata["premium123"][Object.keys($scope.stockdata["premium123"])[0]][0]];
	$scope.premiumValue = {0: [$scope.stockdata["premium123"][Object.keys($scope.stockdata["premium123"])[0]][0]]};
	$scope.trade_type = 'call';
	$scope.changetrade = function(trade_type, index) {
		$scope.trade_type = trade_type;
		var strikeprice = $("#"+index.toString()).children("option:selected").val();
		strikeprice = strikeprice.replace("string:", "0");
		strikeprice = parseInt(strikeprice);
		if (trade_type == 'put') {
			console.log('put');
			// console.log($scope.stockdata["premium123"][strikeprice][1]);
			// $scope.premiumValue = [$scope.stockdata["premium123"][strikeprice][1]];
			$scope.premiumValue[index] = [$scope.premium[index][strikeprice][1]];
			console.log($scope.premiumValue);
		} else if (trade_type == 'call') {
			console.log('call');
			// console.log($scope.stockdata["premium123"][strikeprice][0]);
			// $scope.premiumValue = [$scope.stockdata["premium123"][strikeprice][0]];
			$scope.premiumValue[index] = [$scope.premium[index][strikeprice][0]];
			console.log($scope.premiumValue);
		} else {
			console.log('no');
		}
	};
	//premiumValue is same for all. Correct it
	$scope.changestrikeprice = function(index) {
		console.log(index);
		var strikeprice = $("#"+index.toString()).children("option:selected").val();
		strikeprice = strikeprice.replace("string:", "0");
		strikeprice = parseInt(strikeprice);
		console.log(strikeprice);
		// console.log($scope.stockdata["premium123"][strikeprice])
		// $scope.premiumValue = $scope.stockdata["premium123"][strikeprice];
		if ($scope.trade_type == 'put') {
			console.log('put');
			// console.log($scope.stockdata["premium123"][strikeprice][1]);
			// $scope.premiumValue = [$scope.stockdata["premium123"][strikeprice][1]];
			$scope.premiumValue[index] = [$scope.premium[index][strikeprice][1]];
			console.log($scope.premiumValue);
		} else if ($scope.trade_type == 'call') {
			console.log('call');
			// console.log($scope.stockdata["premium123"][strikeprice][0]);
			// console.log($scope.premium[index][strikeprice][0]);
			// $scope.premiumValue = [$scope.stockdata["premium123"][strikeprice][0]];
			// $scope.premiumValue = [$scope.premium[index][strikeprice][0]];
			$scope.premiumValue[index] = [$scope.premium[index][strikeprice][0]];
			console.log($scope.premiumValue);
		} else {
			console.log('no');
		}
	};
	$scope.index = function(name) {
		console.log(name);
		if (name == 'NIFTY') {
			$scope.stockdata = stock(url_nifty);
			$scope.strike_price = Object.keys($scope.stockdata["premium123"]);
			$scope.spot_price = [$scope.stockdata["spotprice"]];
			$scope.indices = ["NIFTY", "BANKNIFTY", "USDINR"]
			// $scope.premiumValue = [premium123[12800][0]];
			$scope.premiumValue = [$scope.stockdata["premium123"][Object.keys($scope.stockdata["premium123"])[0]][0]];
			$scope.trade_type = 'call';
			$(".qty").attr("step", "75");
			$(".qty").attr("min", "75");
			$(".qty").attr("value", "75");
		} else if (name == 'BANKNIFTY') {
			$scope.stockdata = stock(url_banknifty);
			$scope.strike_price = Object.keys($scope.stockdata["premium123"]);
			$scope.spot_price = [$scope.stockdata["spotprice"]];
			$scope.indices = ["NIFTY", "BANKNIFTY", "USDINR"]
			// $scope.premiumValue = [premium123[12800][0]];
			$scope.premiumValue = [$scope.stockdata["premium123"][Object.keys($scope.stockdata["premium123"])[0]][0]];
			$scope.trade_type = 'call';
			$(".qty").attr("step", "25");
			$(".qty").attr("min", "25");
			$(".qty").attr("value", "25");
		}
	}

	$scope.setups = DataService.getAllSetups();
	$scope.chart = {
		data: {},
		series: ['Profit & Loss'],
		options: {
			responsive: true,
			legend: {
				labels: {
					fontColor: "white",
				}
			}
		},
		// labels: ["White"]
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
		$scope.id = 0;
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
		$scope.premium[$scope.id] = $scope.premiumData;
		console.log($scope.premium);
		$scope.id++;
	};

	$scope.removeTrade = function (setup, trade) {
		for (var i = 0; i < setup.trades.length; i++) {
			if (setup.trades[i].id == trade.id) {
				setup.trades.splice(i, 1);
				DataService.saveSetups($scope.setups);
				break;
			}
		}
		if ($scope.id > 0) {
			$scope.id--;
		} else {
			$scope.id = 0;
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