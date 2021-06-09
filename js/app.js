// var url_nifty = 'https://spreadsheets.google.com/feeds/cells/11CeHRJ8HTIcAxKTd6BrzMTN-gY0f8C4iI0_ZQ7nGZyQ/ocvh19r/public/basic?alt=json#';
var url_nifty_all = {
	0: 'https://spreadsheets.google.com/feeds/cells/11CeHRJ8HTIcAxKTd6BrzMTN-gY0f8C4iI0_ZQ7nGZyQ/ocvh19r/public/basic?alt=json',
	1: 'https://spreadsheets.google.com/feeds/cells/1-ZI_sRkV3YXW1EyzaD8TzLAjjIDo3-4KxdEAEKx9cGg/ocvh19r/public/basic?alt=json',
	2: 'https://spreadsheets.google.com/feeds/cells/1UUhg8026dTGpI9lvpMk1HMBYWL0VE9TOO-ouQSeFQi8/ocvh19r/public/basic?alt=json',
	3: 'https://spreadsheets.google.com/feeds/cells/1QuRPDUiKVKsq2Pn1vUgl6RgYan0vAKxEQK_aPuK52bA/ocvh19r/public/basic?alt=json',
	4: 'https://spreadsheets.google.com/feeds/cells/1P93jrxiWVUIYtoxxcg9t3XJrDZat_wJZN1mJaiDuIUw/ocvh19r/public/basic?alt=json',
	5: 'https://spreadsheets.google.com/feeds/cells/1OLb3THjSJNqE4yBb_zaYemkvO_EmlaHGHJUyT3HbOs4/ocvh19r/public/basic?alt=json',
	6: 'https://spreadsheets.google.com/feeds/cells/1K2Mj2tDqpP3p9KBx0S4jJur7VCddbwmL9pokDgBwHYU/ocvh19r/public/basic?alt=json',
	7: 'https://spreadsheets.google.com/feeds/cells/1tqMWxaUlurnAoTeTjdLxWnUVz42dR3WHvcBOv35-VnU/ocvh19r/public/basic?alt=json'
};
var url_banknifty = 'https://spreadsheets.google.com/feeds/cells/11CeHRJ8HTIcAxKTd6BrzMTN-gY0f8C4iI0_ZQ7nGZyQ/o6nd5tx/public/basic?alt=json';
var url_banknifty_all = {
	0: 'https://spreadsheets.google.com/feeds/cells/11CeHRJ8HTIcAxKTd6BrzMTN-gY0f8C4iI0_ZQ7nGZyQ/o6nd5tx/public/basic?alt=json',
	1: 'https://spreadsheets.google.com/feeds/cells/1-ZI_sRkV3YXW1EyzaD8TzLAjjIDo3-4KxdEAEKx9cGg/o6nd5tx/public/basic?alt=json',
	2: 'https://spreadsheets.google.com/feeds/cells/1UUhg8026dTGpI9lvpMk1HMBYWL0VE9TOO-ouQSeFQi8/o6nd5tx/public/basic?alt=json',
	3: 'https://spreadsheets.google.com/feeds/cells/1QuRPDUiKVKsq2Pn1vUgl6RgYan0vAKxEQK_aPuK52bA/o6nd5tx/public/basic?alt=json',
	4: 'https://spreadsheets.google.com/feeds/cells/1P93jrxiWVUIYtoxxcg9t3XJrDZat_wJZN1mJaiDuIUw/o6nd5tx/public/basic?alt=json',
	5: 'https://spreadsheets.google.com/feeds/cells/1OLb3THjSJNqE4yBb_zaYemkvO_EmlaHGHJUyT3HbOs4/o6nd5tx/public/basic?alt=json',
	6: 'https://spreadsheets.google.com/feeds/cells/1K2Mj2tDqpP3p9KBx0S4jJur7VCddbwmL9pokDgBwHYU/o6nd5tx/public/basic?alt=json',
	7: 'https://spreadsheets.google.com/feeds/cells/1tqMWxaUlurnAoTeTjdLxWnUVz42dR3WHvcBOv35-VnU/o6nd5tx/public/basic?alt=json'
};
var url_usdinr = '';

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
		premium123[data.feed.entry[83+23*i].content.$t] = [parseFloat((data.feed.entry[82+23*i].content.$t).replace(/,/g, '')), parseFloat((data.feed.entry[84+23*i].content.$t).replace(/,/g, '')), (data.feed.entry[12].content.$t), (data.feed.entry[13].content.$t), (data.feed.entry[18].content.$t), (data.feed.entry[19].content.$t), (data.feed.entry[27].content.$t), (data.feed.entry[28].content.$t), (data.feed.entry[33].content.$t), (data.feed.entry[34].content.$t), (data.feed.entry[40].content.$t), (data.feed.entry[41].content.$t)];;
		i++;
	}
	return {
		"spotprice" : spotprice,
		"premium123" : premium123
	}
}
console.log(stock(url_nifty_all[0]));
$(document).ready(function() {
	let temp = stock(url_nifty_all[0])
	$("#spot_Price").text(temp['spotprice']);
	$("#lot_size").text(1);
	$('#strategy').text((Object.values(temp['premium123'])[0][2]));
	$('#oi').text((Object.values(temp['premium123'])[0][6]));
	$('#change_in_oi').text((Object.values(temp['premium123'])[0][4]));
	$('#volume').text((Object.values(temp['premium123'])[0][8]));
	$('#trend_strength').text((Object.values(temp['premium123'])[0][10]));
});

var url_nifty = url_nifty_all[0];
var change_expiry = function() {
	console.log('hi');
	var expiry = $('.expiry').children('option:selected').val();
	console.log(expiry);
	for (var i=0; i<$('.expiry').children().length; i++) {
		var option = '.expiry option:nth-child(' + (i+1).toString() + ')';
		if (expiry == $(option).val()) {
			url_nifty = url_nifty_all[i];
			break;
		}
	}
	console.log(url_nifty);
};

var changeqty = function() {
	$("qty:input").bind("keyup mouseup", function() {
		console.log("changed");
	});
};

var d = new Date()
d.setDate(d.getDate() + (1 + 7 - d.getDate()) % 7);
console.log(d)
function getNextDayOfTheWeek(dayName, excludeToday = true, refDate = new Date()) {
    const dayOfWeek = ["sun","mon","tue","wed","thu","fri","sat"].indexOf(dayName.slice(0,3).toLowerCase());
    if (dayOfWeek < 0) return;
    refDate.setHours(0,0,0,0);
    refDate.setDate(refDate.getDate() + +!!excludeToday + (dayOfWeek + 7 - refDate.getDay() - +!!excludeToday) % 7);
    return refDate;
}
console.log("Next is: " + getNextDayOfTheWeek("Wednesday", false));

var options_expiries = function() {
	var arr = [];
	for (var i=0; i<28; i+=7) {
		var d = new Date();
		d.setDate(i + d.getDate() + ((7-d.getDay())%7+4) % 7);
		d = d.toString().toUpperCase();
		d = d.slice(4,15)
		var day = d.slice(4,6);
		var month = d.slice(0,3);
		var year = d.slice(7,);
		var result = day+' '+month+' '+year;
		arr.push(result);
	}
	for (var i=0; i<4; i++) {
		var d = new Date();
		d.setDate(1);
		if (i < 3) {
			d.setMonth(d.getMonth()+2+i);
		} else {
			d.setMonth(12);
		}
		do {
			d.setDate(d.getDate() - 1);
		} while (d.getDay() !== 4);
		d = d.toString().slice(4,15).toUpperCase();
		var day = d.slice(4,6);
		var month = d.slice(0,3);
		var year = d.slice(7,);
		var result = day+' '+month+' '+year;
		arr.push(result);
	}
	return arr;
};
console.log(options_expiries());

var future_expiries = function() {
	var arr = [];
	for (var i=0; i<3; i++) {
		var d = new Date();
		d.setDate(1);
		d.setMonth(d.getMonth()+1+i);
		do {
			d.setDate(d.getDate() - 1);
		} while (d.getDay() !== 4);
		arr.push(d.toString().slice(4,15).toUpperCase());
	}
	return arr;
};
console.log(future_expiries());

var app = angular.module("optionsApp", ['ui.bootstrap', 'chart.js']);

app.controller('MainCtrl', ["$scope", "DataService", "UtilService", function ($scope, DataService, UtilService) {
	$scope.url = url_nifty_all[0];
	$scope.expiry;
	// $scope.expiries = ['27 MAY 2021','03 JUN 2021','10 JUN 2021','17 JUN 2021', '24 JUN 2021', '29 JULy 2021', '30 SEP 2021', '30 DEC 2021'];
	$scope.expiries = options_expiries();
	$scope.segments = ["OPTIONS", "FUTURES"];
	$scope.segment = "OPTIONS";
	// $scope.expiries = expiryData();
	$scope.id = 0;
	// $scope.stockdata = stock(url_nifty_all[0]);
	$scope.stockdata = stock($scope.url);
	// $scope.premiumData = $scope.stockdata["premium123"];
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
			$('#strategy').text((Object.values($scope.stockdata["premium123"])[0][3]));
			$('#oi').text((Object.values($scope.stockdata['premium123'])[0][7]));
			$('#change_in_oi').text((Object.values($scope.stockdata['premium123'])[0][5]));
			$('#volume').text((Object.values($scope.stockdata['premium123'])[0][9]));
			$('#trend_strength').text((Object.values($scope.stockdata['premium123'])[0][11]));
		} else if (trade_type == 'call') {
			console.log('call');
			// console.log($scope.stockdata["premium123"][strikeprice][0]);
			// $scope.premiumValue = [$scope.stockdata["premium123"][strikeprice][0]];
			$scope.premiumValue[index] = [$scope.premium[index][strikeprice][0]];
			console.log($scope.premiumValue);
			$('#strategy').text((Object.values($scope.stockdata["premium123"])[0][2]));
			$('#oi').text((Object.values($scope.stockdata['premium123'])[0][6]));
			$('#change_in_oi').text((Object.values($scope.stockdata['premium123'])[0][4]));
			$('#volume').text((Object.values($scope.stockdata['premium123'])[0][8]));
			$('#trend_strength').text((Object.values($scope.stockdata['premium123'])[0][10]));
		} else {
			console.log('no');
		}
	};
	$scope.changestrikeprice = function(index) {
		console.log(index);
		var strikeprice = $("#"+index.toString()).children("option:selected").val();
		strikeprice = strikeprice.replace("string:", "0");
		strikeprice = parseInt(strikeprice);
		console.log(strikeprice);
		// $('#strategy').text(strikeprice);
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
			console.log();
		} else {
			console.log('no');
		}
	};
	$scope.index = function(name) {
		console.log(name);
		if (name == 'NIFTY') {
			$scope.stockdata = stock($scope.url);
			console.log($scope.stockdata);
			for (var x in $scope.premium) {
				console.log(x);
				$scope.premium[x] = $scope.stockdata["premium123"];
			}
			console.log($scope.premium);
			// $scope.stockdata = stock(url);
			$scope.strike_price = Object.keys($scope.stockdata["premium123"]);
			$scope.spot_price = [$scope.stockdata["spotprice"]];
			$scope.indices = ["NIFTY", "BANKNIFTY", "USDINR"]
			// $scope.premiumValue = [premium123[12800][0]];
			// $scope.premiumValue = [$scope.stockdata["premium123"][Object.keys($scope.stockdata["premium123"])[0]][0]];
			$scope.premiumValue = {0: [$scope.stockdata["premium123"][Object.keys($scope.stockdata["premium123"])[0]][0]]};
			$scope.trade_type = 'call';
			$(".qty").attr("step", "75");
			$(".qty").attr("min", "75");
			$(".qty").attr("value", "75");
			$('#strategy').text((Object.values($scope.stockdata["premium123"])[0][2]));
			$('#oi').text((Object.values($scope.stockdata['premium123'])[0][6]));
			$('#change_in_oi').text((Object.values($scope.stockdata['premium123'])[0][4]));
			$('#volume').text((Object.values($scope.stockdata['premium123'])[0][8]));
			$('#trend_strength').text((Object.values($scope.stockdata['premium123'])[0][10]));
		} else if (name == 'BANKNIFTY') {
			$scope.stockdata = stock($scope.url);
			console.log($scope.stockdata);
			for (var x in $scope.premium) {
				console.log(x);
				$scope.premium[x] = $scope.stockdata["premium123"];
			}
			console.log($scope.premium);
			$scope.strike_price = Object.keys($scope.stockdata["premium123"]);
			$scope.spot_price = [$scope.stockdata["spotprice"]];
			$scope.indices = ["NIFTY", "BANKNIFTY", "USDINR"]
			// $scope.premiumValue = [premium123[12800][0]];
			// $scope.premiumValue = [$scope.stockdata["premium123"][Object.keys($scope.stockdata["premium123"])[0]][0]];
			$scope.premiumValue = {0: [$scope.stockdata["premium123"][Object.keys($scope.stockdata["premium123"])[0]][0]]};
			$scope.trade_type = 'call';
			$(".qty").attr("step", "25");
			$(".qty").attr("min", "25");
			$(".qty").attr("value", "25");
			$('#strategy').text((Object.values($scope.stockdata["premium123"])[0][2]));
			$('#oi').text((Object.values($scope.stockdata['premium123'])[0][6]));
			$('#change_in_oi').text((Object.values($scope.stockdata['premium123'])[0][4]));
			$('#volume').text((Object.values($scope.stockdata['premium123'])[0][8]));
			$('#trend_strength').text((Object.values($scope.stockdata['premium123'])[0][10]));
		}
	}
	$scope.change_expiry = function(expiry, name) {
		var expiry = $('.expiry').children('option:selected').val();
		expiry = expiry.slice(7);
		console.log(expiry);
		var option = ($scope.expiries).indexOf(expiry);
		console.log(option);
		if (name === "NIFTY") {
			$scope.url = url_nifty_all[option];
		} else if (name === "BANKNIFTY") {
			$scope.url = url_banknifty_all[option];
		}
		// url_nifty = url_nifty_all[option];
		// $scope.url = url_nifty;
		console.log($scope.url);
		$scope.index(name);
	}
	$scope.change_qty = function(qty, name) {
		console.log(qty);
		if (name == 'NIFTY') {
			$("#lot_size").text(qty/75);
		} else if (name == 'BANKNIFTY') {
			$("#lot_size").text(qty/25);
		}
	};
	$scope.load = function (n) {
		$scope.id = n;
		for (var i=0; i<n; i++) {
			$scope.premium[i] = $scope.stockdata["premium123"];
		}
		// console.log($scope.premium);
	}
	$scope.change_segment = function(segment) {
		console.log(segment);
		$scope.segment = segment;
		var x = document.getElementsByClassName("trade_div");
		var y = document.getElementsByClassName("callput");
    	var z = document.getElementsByClassName("future-hide");
		for (var i=0; i<y.length; i++) {
			if (segment === "OPTIONS") {
				x[i].style.display = "flex";
				y[i].style.display = "inline-block";
				z[i].style.display = "inline-block";
				$('.strike-price').text('Strike Price');
				$scope.expiries = options_expiries();
			} else if (segment === "FUTURES") {
				if (i !== 0) {
					x[i].style.display = "none";
				}
				y[i].style.display = "none";
        		z[i].style.display = "none";
        		$('.strike-price').text('Futures Price');
				$scope.expiries = future_expiries();
			}
		}
	}

	$scope.setups = DataService.getAllSetups();
	// $scope.abc = ($scope.setups[0].trades);
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
		$('#strategy').text((Object.values($scope.stockdata["premium123"])[0][2]));
		$('#oi').text((Object.values($scope.stockdata['premium123'])[0][6]));
		$('#change_in_oi').text((Object.values($scope.stockdata['premium123'])[0][4]));
		$('#volume').text((Object.values($scope.stockdata['premium123'])[0][8]));
		$('#trend_strength').text((Object.values($scope.stockdata['premium123'])[0][10]));
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
		// $scope.premium[$scope.id] = $scope.premiumData;
		// $scope.premium[$scope.id] = stock($scope.url)["premium123"];
		$scope.premium[$scope.id] = $scope.stockdata["premium123"];
		console.log($scope.premium);
		$scope.id++;
		// console.log($scope.abc);
		// console.log(Object.keys(setup.trades).length);
		// console.log(setup.trades.length);
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