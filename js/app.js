// var options = {
// 	classname: 'my-class',
// 	id: 'my-id'
// }
// var nanobar = new Nanobar(options);
// nanobar.go( 30 );
// nanobar.go( 76 );
// nanobar.go(100);

NProgress.configure({ minimum: 0.03 });
NProgress.configure({ trickle: false });
NProgress.configure({ easing: 'linear', speed: 200 });
NProgress.start();

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
var temp = options_expiries();

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

var nifty = {};
var banknifty = {};
var niftyfutures = {}
var bankniftyfutures = {}
$(document).ready(function () {
	$.ajax({
		type: 'GET',
		url: 'https://spreadsheets.google.com/feeds/cells/11CeHRJ8HTIcAxKTd6BrzMTN-gY0f8C4iI0_ZQ7nGZyQ/o1jty9e/public/basic?alt=json',
		dataType: 'json',
		async: true,
		success: function (data) {
			console.log("futures data=" + data);
			niftyfutures[0] = parseInt(data.feed.entry[0].content.$t);
			niftyfutures[1] = parseInt(data.feed.entry[2].content.$t);
			niftyfutures[2] = parseInt(data.feed.entry[4].content.$t);
			bankniftyfutures[0] = parseInt(data.feed.entry[1].content.$t);
			bankniftyfutures[1] = parseInt(data.feed.entry[3].content.$t);
			bankniftyfutures[2] = parseInt(data.feed.entry[5].content.$t);
		}
	}).done(function() {
		NProgress.inc(0.03);
	});
	// $.ajax({
	// 	type: 'GET',
	// 	url: url_nifty_all[0],
	// 	dataType: 'json',
	// 	async: true,
	// 	success: function (data) {
	// 		console.log("data0=" + data);
	// 		nifty[0] = data;
	// 	}
	// });
	$.ajax({
		type: 'GET',
		url: url_nifty_all[1],
		dataType: 'json',
		async: true,
		success: function (data) {
			console.log("data1=" + data);
			var temporary;
			$.ajax({
				type: 'GET',
				url: 'https://opstra.definedge.com/api/free/strategybuilder/optionchain/NIFTY&' + temp[1].replace(/\s+/g, ""),
				dataType: 'json',
				async: false,
				success: function (data) {
					console.log("all data=" + data);
					temporary = data;
				},
				error: function(xhr) {
					console.log("No data received for " + temp[1] + " expiry");
				}
			}).done(function() {
				NProgress.inc(0.03);
			});
			var spotprice = data.feed.entry[35].content.$t;
			var strikeprice123 = [];
			var premium123 = {};
			var i=0;
			console.log(temporary.data);
			var j=0;
			while (data.feed.entry[83+23*i].content.$t != "#VALUE!" && data.feed.entry[83+23*i].content.$t != "" && j < temporary.data.length) {
				strikeprice123.push(data.feed.entry[83+23*i].content.$t);
				if (data.feed.entry[83+23*i].content.$t == temporary.data[j].StrikePrice) {
					premium123[data.feed.entry[83+23*i].content.$t] = [parseFloat((data.feed.entry[82+23*i].content.$t).replace(/,/g, '')), parseFloat((data.feed.entry[84+23*i].content.$t).replace(/,/g, '')), (data.feed.entry[12].content.$t), (data.feed.entry[13].content.$t), (data.feed.entry[18].content.$t), (data.feed.entry[19].content.$t), (data.feed.entry[27].content.$t), (data.feed.entry[28].content.$t), (data.feed.entry[33].content.$t), (data.feed.entry[34].content.$t), (data.feed.entry[40].content.$t), (data.feed.entry[41].content.$t), (temporary.data[j].CallDelta), (temporary.data[j].PutDelta), (temporary.data[j].CallTheta), (temporary.data[j].PutTheta), (temporary.data[j].CallGamma), (temporary.data[j].PutGamma), (temporary.data[j].CallVega), (temporary.data[j].PutVega)];;
					j++;
				} else {
					premium123[data.feed.entry[83+23*i].content.$t] = [parseFloat((data.feed.entry[82+23*i].content.$t).replace(/,/g, '')), parseFloat((data.feed.entry[84+23*i].content.$t).replace(/,/g, '')), (data.feed.entry[12].content.$t), (data.feed.entry[13].content.$t), (data.feed.entry[18].content.$t), (data.feed.entry[19].content.$t), (data.feed.entry[27].content.$t), (data.feed.entry[28].content.$t), (data.feed.entry[33].content.$t), (data.feed.entry[34].content.$t), (data.feed.entry[40].content.$t), (data.feed.entry[41].content.$t), "-", "-", "-", "-", "-", "-", "-", "-"];
				}
				i++;
			}
			nifty[1] = {
				"spotprice" : spotprice,
				"premium123" : premium123,
				"temporary" : temporary
			};
		}
	}).done(function() {
		NProgress.inc(0.03);
	});
	$.ajax({
		type: 'GET',
		url: url_nifty_all[2],
		dataType: 'json',
		async: true,
		success: function (data) {
			console.log("data2=" + data);
			var temporary;
			$.ajax({
				type: 'GET',
				url: 'https://opstra.definedge.com/api/free/strategybuilder/optionchain/NIFTY&' + temp[2].replace(/\s+/g, ""),
				dataType: 'json',
				async: false,
				success: function (data) {
					console.log("all data=" + data);
					temporary = data;
				},
				error: function(xhr) {
					console.log("No data received for " + temp[2] + " expiry");
				}
			}).done(function() {
				NProgress.inc(0.03);
			});
			var spotprice = data.feed.entry[35].content.$t;
			var strikeprice123 = [];
			var premium123 = {};
			var i=0;
			console.log(temporary.data);
			var j=0;
			while (data.feed.entry[83+23*i].content.$t != "#VALUE!" && data.feed.entry[83+23*i].content.$t != "" && j < temporary.data.length) {
				strikeprice123.push(data.feed.entry[83+23*i].content.$t);
				if (data.feed.entry[83+23*i].content.$t == temporary.data[j].StrikePrice) {
					premium123[data.feed.entry[83+23*i].content.$t] = [parseFloat((data.feed.entry[82+23*i].content.$t).replace(/,/g, '')), parseFloat((data.feed.entry[84+23*i].content.$t).replace(/,/g, '')), (data.feed.entry[12].content.$t), (data.feed.entry[13].content.$t), (data.feed.entry[18].content.$t), (data.feed.entry[19].content.$t), (data.feed.entry[27].content.$t), (data.feed.entry[28].content.$t), (data.feed.entry[33].content.$t), (data.feed.entry[34].content.$t), (data.feed.entry[40].content.$t), (data.feed.entry[41].content.$t), (temporary.data[j].CallDelta), (temporary.data[j].PutDelta), (temporary.data[j].CallTheta), (temporary.data[j].PutTheta), (temporary.data[j].CallGamma), (temporary.data[j].PutGamma), (temporary.data[j].CallVega), (temporary.data[j].PutVega)];;
					j++;
				} else {
					premium123[data.feed.entry[83+23*i].content.$t] = [parseFloat((data.feed.entry[82+23*i].content.$t).replace(/,/g, '')), parseFloat((data.feed.entry[84+23*i].content.$t).replace(/,/g, '')), (data.feed.entry[12].content.$t), (data.feed.entry[13].content.$t), (data.feed.entry[18].content.$t), (data.feed.entry[19].content.$t), (data.feed.entry[27].content.$t), (data.feed.entry[28].content.$t), (data.feed.entry[33].content.$t), (data.feed.entry[34].content.$t), (data.feed.entry[40].content.$t), (data.feed.entry[41].content.$t), "-", "-", "-", "-", "-", "-", "-", "-"];
				}
				i++;
			}
			nifty[2] = {
				"spotprice" : spotprice,
				"premium123" : premium123,
				"temporary" : temporary
			};
		}
	}).done(function() {
		NProgress.inc(0.03);
	});
	$.ajax({
		type: 'GET',
		url: url_nifty_all[3],
		dataType: 'json',
		async: true,
		success: function (data) {
			console.log("data3=" + data);
			var temporary;
			$.ajax({
				type: 'GET',
				url: 'https://opstra.definedge.com/api/free/strategybuilder/optionchain/NIFTY&' + temp[3].replace(/\s+/g, ""),
				dataType: 'json',
				async: false,
				success: function (data) {
					console.log("all data=" + data);
					temporary = data;
				},
				error: function(xhr) {
					console.log("No data received for " + temp[3] + " expiry");
				}
			}).done(function() {
				NProgress.inc(0.03);
			});
			var spotprice = data.feed.entry[35].content.$t;
			var strikeprice123 = [];
			var premium123 = {};
			var i=0;
			var j=0;
			while (data.feed.entry[83+23*i].content.$t != "#VALUE!" && data.feed.entry[83+23*i].content.$t != "" && j < temporary.data.length) {
				strikeprice123.push(data.feed.entry[83+23*i].content.$t);
				if (data.feed.entry[83+23*i].content.$t == temporary.data[j].StrikePrice) {
					premium123[data.feed.entry[83+23*i].content.$t] = [parseFloat((data.feed.entry[82+23*i].content.$t).replace(/,/g, '')), parseFloat((data.feed.entry[84+23*i].content.$t).replace(/,/g, '')), (data.feed.entry[12].content.$t), (data.feed.entry[13].content.$t), (data.feed.entry[18].content.$t), (data.feed.entry[19].content.$t), (data.feed.entry[27].content.$t), (data.feed.entry[28].content.$t), (data.feed.entry[33].content.$t), (data.feed.entry[34].content.$t), (data.feed.entry[40].content.$t), (data.feed.entry[41].content.$t), (temporary.data[j].CallDelta), (temporary.data[j].PutDelta), (temporary.data[j].CallTheta), (temporary.data[j].PutTheta), (temporary.data[j].CallGamma), (temporary.data[j].PutGamma), (temporary.data[j].CallVega), (temporary.data[j].PutVega)];;
					j++;
				} else {
					premium123[data.feed.entry[83+23*i].content.$t] = [parseFloat((data.feed.entry[82+23*i].content.$t).replace(/,/g, '')), parseFloat((data.feed.entry[84+23*i].content.$t).replace(/,/g, '')), (data.feed.entry[12].content.$t), (data.feed.entry[13].content.$t), (data.feed.entry[18].content.$t), (data.feed.entry[19].content.$t), (data.feed.entry[27].content.$t), (data.feed.entry[28].content.$t), (data.feed.entry[33].content.$t), (data.feed.entry[34].content.$t), (data.feed.entry[40].content.$t), (data.feed.entry[41].content.$t), "-", "-", "-", "-", "-", "-", "-", "-"];
				}
				i++;
			}
			nifty[3] = {
				"spotprice" : spotprice,
				"premium123" : premium123,
				"temporary" : temporary
			};
		}
	}).done(function() {
		NProgress.inc(0.03);
	});
	$.ajax({
		type: 'GET',
		url: url_nifty_all[4],
		dataType: 'json',
		async: true,
		success: function (data) {
			console.log("data4=" + data);
			var temporary;
			$.ajax({
				type: 'GET',
				url: 'https://opstra.definedge.com/api/free/strategybuilder/optionchain/NIFTY&' + temp[4].replace(/\s+/g, ""),
				dataType: 'json',
				async: false,
				success: function (data) {
					console.log("all data=" + data);
					temporary = data;
				},
				error: function(xhr) {
					console.log("No data received for " + temp[4] + " expiry");
				}
			}).done(function() {
				NProgress.inc(0.03);
			});
			var spotprice = data.feed.entry[35].content.$t;
			var strikeprice123 = [];
			var premium123 = {};
			var i=0;
			var j=0;
			while (data.feed.entry[83+23*i].content.$t != "#VALUE!" && data.feed.entry[83+23*i].content.$t != "" && j < temporary.data.length) {
				strikeprice123.push(data.feed.entry[83+23*i].content.$t);
				if (data.feed.entry[83+23*i].content.$t == temporary.data[j].StrikePrice) {
					premium123[data.feed.entry[83+23*i].content.$t] = [parseFloat((data.feed.entry[82+23*i].content.$t).replace(/,/g, '')), parseFloat((data.feed.entry[84+23*i].content.$t).replace(/,/g, '')), (data.feed.entry[12].content.$t), (data.feed.entry[13].content.$t), (data.feed.entry[18].content.$t), (data.feed.entry[19].content.$t), (data.feed.entry[27].content.$t), (data.feed.entry[28].content.$t), (data.feed.entry[33].content.$t), (data.feed.entry[34].content.$t), (data.feed.entry[40].content.$t), (data.feed.entry[41].content.$t), (temporary.data[j].CallDelta), (temporary.data[j].PutDelta), (temporary.data[j].CallTheta), (temporary.data[j].PutTheta), (temporary.data[j].CallGamma), (temporary.data[j].PutGamma), (temporary.data[j].CallVega), (temporary.data[j].PutVega)];;
					j++;
				} else {
					premium123[data.feed.entry[83+23*i].content.$t] = [parseFloat((data.feed.entry[82+23*i].content.$t).replace(/,/g, '')), parseFloat((data.feed.entry[84+23*i].content.$t).replace(/,/g, '')), (data.feed.entry[12].content.$t), (data.feed.entry[13].content.$t), (data.feed.entry[18].content.$t), (data.feed.entry[19].content.$t), (data.feed.entry[27].content.$t), (data.feed.entry[28].content.$t), (data.feed.entry[33].content.$t), (data.feed.entry[34].content.$t), (data.feed.entry[40].content.$t), (data.feed.entry[41].content.$t), "-", "-", "-", "-", "-", "-", "-", "-"];
				}
				i++;
			}
			nifty[4] = {
				"spotprice" : spotprice,
				"premium123" : premium123,
				"temporary" : temporary
			};
		}
	}).done(function() {
		NProgress.inc(0.03);
	});
	$.ajax({
		type: 'GET',
		url: url_nifty_all[5],
		dataType: 'json',
		async: true,
		success: function (data) {
			console.log("data5=" + data);
			var temporary;
			$.ajax({
				type: 'GET',
				url: 'https://opstra.definedge.com/api/free/strategybuilder/optionchain/NIFTY&' + temp[5].replace(/\s+/g, ""),
				dataType: 'json',
				async: false,
				success: function (data) {
					console.log("all data=" + data);
					temporary = data;
				},
				error: function(xhr) {
					console.log("No data received for " + temp[5] + " expiry");
				}
			}).done(function() {
				NProgress.inc(0.03);
			});
			var spotprice = data.feed.entry[35].content.$t;
			var strikeprice123 = [];
			var premium123 = {};
			var i=0;
			var j=0;
			while (data.feed.entry[83+23*i].content.$t != "#VALUE!" && data.feed.entry[83+23*i].content.$t != "" && j < temporary.data.length) {
				strikeprice123.push(data.feed.entry[83+23*i].content.$t);
				if (data.feed.entry[83+23*i].content.$t == temporary.data[j].StrikePrice) {
					premium123[data.feed.entry[83+23*i].content.$t] = [parseFloat((data.feed.entry[82+23*i].content.$t).replace(/,/g, '')), parseFloat((data.feed.entry[84+23*i].content.$t).replace(/,/g, '')), (data.feed.entry[12].content.$t), (data.feed.entry[13].content.$t), (data.feed.entry[18].content.$t), (data.feed.entry[19].content.$t), (data.feed.entry[27].content.$t), (data.feed.entry[28].content.$t), (data.feed.entry[33].content.$t), (data.feed.entry[34].content.$t), (data.feed.entry[40].content.$t), (data.feed.entry[41].content.$t), (temporary.data[j].CallDelta), (temporary.data[j].PutDelta), (temporary.data[j].CallTheta), (temporary.data[j].PutTheta), (temporary.data[j].CallGamma), (temporary.data[j].PutGamma), (temporary.data[j].CallVega), (temporary.data[j].PutVega)];;
					j++;
				} else {
					premium123[data.feed.entry[83+23*i].content.$t] = [parseFloat((data.feed.entry[82+23*i].content.$t).replace(/,/g, '')), parseFloat((data.feed.entry[84+23*i].content.$t).replace(/,/g, '')), (data.feed.entry[12].content.$t), (data.feed.entry[13].content.$t), (data.feed.entry[18].content.$t), (data.feed.entry[19].content.$t), (data.feed.entry[27].content.$t), (data.feed.entry[28].content.$t), (data.feed.entry[33].content.$t), (data.feed.entry[34].content.$t), (data.feed.entry[40].content.$t), (data.feed.entry[41].content.$t), "-", "-", "-", "-", "-", "-", "-", "-"];
				}
				i++;
			}
			nifty[5] = {
				"spotprice" : spotprice,
				"premium123" : premium123,
				"temporary" : temporary
			};
		}
	}).done(function() {
		NProgress.inc(0.03);
	});
	$.ajax({
		type: 'GET',
		url: url_nifty_all[6],
		dataType: 'json',
		async: true,
		success: function (data) {
			console.log("data6=" + data);
			var temporary;
			$.ajax({
				type: 'GET',
				url: 'https://opstra.definedge.com/api/free/strategybuilder/optionchain/NIFTY&' + temp[6].replace(/\s+/g, ""),
				dataType: 'json',
				async: false,
				success: function (data) {
					console.log("all data=" + data);
					temporary = data;
				},
				error: function(xhr) {
					console.log("No data received for " + temp[6] + " expiry");
				}
			}).done(function() {
				NProgress.inc(0.03);
			});
			var spotprice = data.feed.entry[35].content.$t;
			var strikeprice123 = [];
			var premium123 = {};
			var i=0;
			var j=0;
			while (data.feed.entry[83+23*i].content.$t != "#VALUE!" && data.feed.entry[83+23*i].content.$t != "" && j < temporary.data.length) {
				strikeprice123.push(data.feed.entry[83+23*i].content.$t);
				if (data.feed.entry[83+23*i].content.$t == temporary.data[j].StrikePrice) {
					premium123[data.feed.entry[83+23*i].content.$t] = [parseFloat((data.feed.entry[82+23*i].content.$t).replace(/,/g, '')), parseFloat((data.feed.entry[84+23*i].content.$t).replace(/,/g, '')), (data.feed.entry[12].content.$t), (data.feed.entry[13].content.$t), (data.feed.entry[18].content.$t), (data.feed.entry[19].content.$t), (data.feed.entry[27].content.$t), (data.feed.entry[28].content.$t), (data.feed.entry[33].content.$t), (data.feed.entry[34].content.$t), (data.feed.entry[40].content.$t), (data.feed.entry[41].content.$t), (temporary.data[j].CallDelta), (temporary.data[j].PutDelta), (temporary.data[j].CallTheta), (temporary.data[j].PutTheta), (temporary.data[j].CallGamma), (temporary.data[j].PutGamma), (temporary.data[j].CallVega), (temporary.data[j].PutVega)];;
					j++;
				} else {
					premium123[data.feed.entry[83+23*i].content.$t] = [parseFloat((data.feed.entry[82+23*i].content.$t).replace(/,/g, '')), parseFloat((data.feed.entry[84+23*i].content.$t).replace(/,/g, '')), (data.feed.entry[12].content.$t), (data.feed.entry[13].content.$t), (data.feed.entry[18].content.$t), (data.feed.entry[19].content.$t), (data.feed.entry[27].content.$t), (data.feed.entry[28].content.$t), (data.feed.entry[33].content.$t), (data.feed.entry[34].content.$t), (data.feed.entry[40].content.$t), (data.feed.entry[41].content.$t), "-", "-", "-", "-", "-", "-", "-", "-"];
				}
				i++;
			}
			nifty[6] = {
				"spotprice" : spotprice,
				"premium123" : premium123,
				"temporary" : temporary
			};
		}
	}).done(function() {
		NProgress.inc(0.03);
	});
	$.ajax({
		type: 'GET',
		url: url_nifty_all[7],
		dataType: 'json',
		async: true,
		success: function (data) {
			console.log("data7=" + data);
			var temporary;
			$.ajax({
				type: 'GET',
				url: 'https://opstra.definedge.com/api/free/strategybuilder/optionchain/NIFTY&' + temp[7].replace(/\s+/g, ""),
				dataType: 'json',
				async: false,
				success: function (data) {
					console.log("all data=" + data);
					temporary = data;
				},
				error: function(xhr) {
					console.log("No data received for " + temp[7] + " expiry");
				}
			}).done(function() {
				NProgress.inc(0.03);
			});
			var spotprice = data.feed.entry[35].content.$t;
			var strikeprice123 = [];
			var premium123 = {};
			var i=0;
			var j=0;
			while (data.feed.entry[83+23*i].content.$t != "#VALUE!" && data.feed.entry[83+23*i].content.$t != "" && j < temporary.data.length) {
				strikeprice123.push(data.feed.entry[83+23*i].content.$t);
				if (data.feed.entry[83+23*i].content.$t == temporary.data[j].StrikePrice) {
					premium123[data.feed.entry[83+23*i].content.$t] = [parseFloat((data.feed.entry[82+23*i].content.$t).replace(/,/g, '')), parseFloat((data.feed.entry[84+23*i].content.$t).replace(/,/g, '')), (data.feed.entry[12].content.$t), (data.feed.entry[13].content.$t), (data.feed.entry[18].content.$t), (data.feed.entry[19].content.$t), (data.feed.entry[27].content.$t), (data.feed.entry[28].content.$t), (data.feed.entry[33].content.$t), (data.feed.entry[34].content.$t), (data.feed.entry[40].content.$t), (data.feed.entry[41].content.$t), (temporary.data[j].CallDelta), (temporary.data[j].PutDelta), (temporary.data[j].CallTheta), (temporary.data[j].PutTheta), (temporary.data[j].CallGamma), (temporary.data[j].PutGamma), (temporary.data[j].CallVega), (temporary.data[j].PutVega)];;
					j++;
				} else {
					premium123[data.feed.entry[83+23*i].content.$t] = [parseFloat((data.feed.entry[82+23*i].content.$t).replace(/,/g, '')), parseFloat((data.feed.entry[84+23*i].content.$t).replace(/,/g, '')), (data.feed.entry[12].content.$t), (data.feed.entry[13].content.$t), (data.feed.entry[18].content.$t), (data.feed.entry[19].content.$t), (data.feed.entry[27].content.$t), (data.feed.entry[28].content.$t), (data.feed.entry[33].content.$t), (data.feed.entry[34].content.$t), (data.feed.entry[40].content.$t), (data.feed.entry[41].content.$t), "-", "-", "-", "-", "-", "-", "-", "-"];
				}
				i++;
			}
			nifty[7] = {
				"spotprice" : spotprice,
				"premium123" : premium123,
				"temporary" : temporary
			};
		}
	}).done(function() {
		NProgress.inc(0.03);
	});
	$.ajax({
		type: 'GET',
		url: url_banknifty_all[0],
		dataType: 'json',
		async: true,
		success: function (data) {
			console.log("bankdata0=" + data);
			var temporary;
			$.ajax({
				type: 'GET',
				url: 'https://opstra.definedge.com/api/free/strategybuilder/optionchain/BANKNIFTY&' + temp[0].replace(/\s+/g, ""),
				dataType: 'json',
				async: false,
				success: function (data) {
					console.log("all data=" + data);
					temporary = data;
				},
				error: function(xhr) {
					console.log("No data received for " + temp[0] + " expiry");
				}
			}).done(function() {
				NProgress.inc(0.03);
			});
			var spotprice = data.feed.entry[35].content.$t;
			var strikeprice123 = [];
			var premium123 = {};
			var i=0;
			var j=0;
			while (data.feed.entry[83+23*i].content.$t != "#VALUE!" && data.feed.entry[83+23*i].content.$t != "" && j < temporary.data.length) {
				strikeprice123.push(data.feed.entry[83+23*i].content.$t);
				if (data.feed.entry[83+23*i].content.$t == temporary.data[j].StrikePrice) {
					premium123[data.feed.entry[83+23*i].content.$t] = [parseFloat((data.feed.entry[82+23*i].content.$t).replace(/,/g, '')), parseFloat((data.feed.entry[84+23*i].content.$t).replace(/,/g, '')), (data.feed.entry[12].content.$t), (data.feed.entry[13].content.$t), (data.feed.entry[18].content.$t), (data.feed.entry[19].content.$t), (data.feed.entry[27].content.$t), (data.feed.entry[28].content.$t), (data.feed.entry[33].content.$t), (data.feed.entry[34].content.$t), (data.feed.entry[40].content.$t), (data.feed.entry[41].content.$t), (temporary.data[j].CallDelta), (temporary.data[j].PutDelta), (temporary.data[j].CallTheta), (temporary.data[j].PutTheta), (temporary.data[j].CallGamma), (temporary.data[j].PutGamma), (temporary.data[j].CallVega), (temporary.data[j].PutVega)];;
					j++;
				} else {
					premium123[data.feed.entry[83+23*i].content.$t] = [parseFloat((data.feed.entry[82+23*i].content.$t).replace(/,/g, '')), parseFloat((data.feed.entry[84+23*i].content.$t).replace(/,/g, '')), (data.feed.entry[12].content.$t), (data.feed.entry[13].content.$t), (data.feed.entry[18].content.$t), (data.feed.entry[19].content.$t), (data.feed.entry[27].content.$t), (data.feed.entry[28].content.$t), (data.feed.entry[33].content.$t), (data.feed.entry[34].content.$t), (data.feed.entry[40].content.$t), (data.feed.entry[41].content.$t), "-", "-", "-", "-", "-", "-", "-", "-"];
				}
				i++;
			}
			banknifty[0] = {
				"spotprice" : spotprice,
				"premium123" : premium123,
				"temporary" : temporary
			};
		}
	}).done(function() {
		NProgress.inc(0.03);
	});
	$.ajax({
		type: 'GET',
		url: url_banknifty_all[1],
		dataType: 'json',
		async: true,
		success: function (data) {
			console.log("bankdata1=" + data);
			var temporary;
			$.ajax({
				type: 'GET',
				url: 'https://opstra.definedge.com/api/free/strategybuilder/optionchain/BANKNIFTY&' + temp[1].replace(/\s+/g, ""),
				dataType: 'json',
				async: false,
				success: function (data) {
					console.log("all data=" + data);
					temporary = data;
				},
				error: function(xhr) {
					console.log("No data received for " + temp[1] + " expiry");
				}
			}).done(function() {
				NProgress.inc(0.03);
			});
			var spotprice = data.feed.entry[35].content.$t;
			var strikeprice123 = [];
			var premium123 = {};
			var i=0;
			var j=0;
			while (data.feed.entry[83+23*i].content.$t != "#VALUE!" && data.feed.entry[83+23*i].content.$t != "" && j < temporary.data.length) {
				strikeprice123.push(data.feed.entry[83+23*i].content.$t);
				if (data.feed.entry[83+23*i].content.$t == temporary.data[j].StrikePrice) {
					premium123[data.feed.entry[83+23*i].content.$t] = [parseFloat((data.feed.entry[82+23*i].content.$t).replace(/,/g, '')), parseFloat((data.feed.entry[84+23*i].content.$t).replace(/,/g, '')), (data.feed.entry[12].content.$t), (data.feed.entry[13].content.$t), (data.feed.entry[18].content.$t), (data.feed.entry[19].content.$t), (data.feed.entry[27].content.$t), (data.feed.entry[28].content.$t), (data.feed.entry[33].content.$t), (data.feed.entry[34].content.$t), (data.feed.entry[40].content.$t), (data.feed.entry[41].content.$t), (temporary.data[j].CallDelta), (temporary.data[j].PutDelta), (temporary.data[j].CallTheta), (temporary.data[j].PutTheta), (temporary.data[j].CallGamma), (temporary.data[j].PutGamma), (temporary.data[j].CallVega), (temporary.data[j].PutVega)];;
					j++;
				} else {
					premium123[data.feed.entry[83+23*i].content.$t] = [parseFloat((data.feed.entry[82+23*i].content.$t).replace(/,/g, '')), parseFloat((data.feed.entry[84+23*i].content.$t).replace(/,/g, '')), (data.feed.entry[12].content.$t), (data.feed.entry[13].content.$t), (data.feed.entry[18].content.$t), (data.feed.entry[19].content.$t), (data.feed.entry[27].content.$t), (data.feed.entry[28].content.$t), (data.feed.entry[33].content.$t), (data.feed.entry[34].content.$t), (data.feed.entry[40].content.$t), (data.feed.entry[41].content.$t), "-", "-", "-", "-", "-", "-", "-", "-"];
				}
				i++;
			}
			banknifty[1] = {
				"spotprice" : spotprice,
				"premium123" : premium123,
				"temporary" : temporary
			};
		}
	}).done(function() {
		NProgress.inc(0.03);
	});
	$.ajax({
		type: 'GET',
		url: url_banknifty_all[2],
		dataType: 'json',
		async: true,
		success: function (data) {
			console.log("bankdata2=" + data);
			var temporary;
			$.ajax({
				type: 'GET',
				url: 'https://opstra.definedge.com/api/free/strategybuilder/optionchain/BANKNIFTY&' + temp[2].replace(/\s+/g, ""),
				dataType: 'json',
				async: false,
				success: function (data) {
					console.log("all data=" + data);
					temporary = data;
				},
				error: function(xhr) {
					console.log("No data received for " + temp[2] + " expiry");
				}
			}).done(function() {
				NProgress.inc(0.03);
			});
			var spotprice = data.feed.entry[35].content.$t;
			var strikeprice123 = [];
			var premium123 = {};
			var i=0;
			var j=0;
			while (data.feed.entry[83+23*i].content.$t != "#VALUE!" && data.feed.entry[83+23*i].content.$t != "" && j < temporary.data.length) {
				strikeprice123.push(data.feed.entry[83+23*i].content.$t);
				if (data.feed.entry[83+23*i].content.$t == temporary.data[j].StrikePrice) {
					premium123[data.feed.entry[83+23*i].content.$t] = [parseFloat((data.feed.entry[82+23*i].content.$t).replace(/,/g, '')), parseFloat((data.feed.entry[84+23*i].content.$t).replace(/,/g, '')), (data.feed.entry[12].content.$t), (data.feed.entry[13].content.$t), (data.feed.entry[18].content.$t), (data.feed.entry[19].content.$t), (data.feed.entry[27].content.$t), (data.feed.entry[28].content.$t), (data.feed.entry[33].content.$t), (data.feed.entry[34].content.$t), (data.feed.entry[40].content.$t), (data.feed.entry[41].content.$t), (temporary.data[j].CallDelta), (temporary.data[j].PutDelta), (temporary.data[j].CallTheta), (temporary.data[j].PutTheta), (temporary.data[j].CallGamma), (temporary.data[j].PutGamma), (temporary.data[j].CallVega), (temporary.data[j].PutVega)];;
					j++;
				} else {
					premium123[data.feed.entry[83+23*i].content.$t] = [parseFloat((data.feed.entry[82+23*i].content.$t).replace(/,/g, '')), parseFloat((data.feed.entry[84+23*i].content.$t).replace(/,/g, '')), (data.feed.entry[12].content.$t), (data.feed.entry[13].content.$t), (data.feed.entry[18].content.$t), (data.feed.entry[19].content.$t), (data.feed.entry[27].content.$t), (data.feed.entry[28].content.$t), (data.feed.entry[33].content.$t), (data.feed.entry[34].content.$t), (data.feed.entry[40].content.$t), (data.feed.entry[41].content.$t), "-", "-", "-", "-", "-", "-", "-", "-"];
				}
				i++;
			}
			banknifty[2] = {
				"spotprice" : spotprice,
				"premium123" : premium123,
				"temporary" : temporary
			};
		}
	}).done(function() {
		NProgress.inc(0.03);
	});
	$.ajax({
		type: 'GET',
		url: url_banknifty_all[3],
		dataType: 'json',
		async: true,
		success: function (data) {
			console.log("bankdata3=" + data);
			var temporary;
			$.ajax({
				type: 'GET',
				url: 'https://opstra.definedge.com/api/free/strategybuilder/optionchain/BANKNIFTY&' + temp[3].replace(/\s+/g, ""),
				dataType: 'json',
				async: false,
				success: function (data) {
					console.log("all data=" + data);
					temporary = data;
				},
				error: function(xhr) {
					console.log("No data received for " + temp[3] + " expiry");
				}
			}).done(function() {
				NProgress.inc(0.03);
			});
			var spotprice = data.feed.entry[35].content.$t;
			var strikeprice123 = [];
			var premium123 = {};
			var i=0;
			var j=0;
			while (data.feed.entry[83+23*i].content.$t != "#VALUE!" && data.feed.entry[83+23*i].content.$t != "" && j < temporary.data.length) {
				strikeprice123.push(data.feed.entry[83+23*i].content.$t);
				if (data.feed.entry[83+23*i].content.$t == temporary.data[j].StrikePrice) {
					premium123[data.feed.entry[83+23*i].content.$t] = [parseFloat((data.feed.entry[82+23*i].content.$t).replace(/,/g, '')), parseFloat((data.feed.entry[84+23*i].content.$t).replace(/,/g, '')), (data.feed.entry[12].content.$t), (data.feed.entry[13].content.$t), (data.feed.entry[18].content.$t), (data.feed.entry[19].content.$t), (data.feed.entry[27].content.$t), (data.feed.entry[28].content.$t), (data.feed.entry[33].content.$t), (data.feed.entry[34].content.$t), (data.feed.entry[40].content.$t), (data.feed.entry[41].content.$t), (temporary.data[j].CallDelta), (temporary.data[j].PutDelta), (temporary.data[j].CallTheta), (temporary.data[j].PutTheta), (temporary.data[j].CallGamma), (temporary.data[j].PutGamma), (temporary.data[j].CallVega), (temporary.data[j].PutVega)];;
					j++;
				} else {
					premium123[data.feed.entry[83+23*i].content.$t] = [parseFloat((data.feed.entry[82+23*i].content.$t).replace(/,/g, '')), parseFloat((data.feed.entry[84+23*i].content.$t).replace(/,/g, '')), (data.feed.entry[12].content.$t), (data.feed.entry[13].content.$t), (data.feed.entry[18].content.$t), (data.feed.entry[19].content.$t), (data.feed.entry[27].content.$t), (data.feed.entry[28].content.$t), (data.feed.entry[33].content.$t), (data.feed.entry[34].content.$t), (data.feed.entry[40].content.$t), (data.feed.entry[41].content.$t), "-", "-", "-", "-", "-", "-", "-", "-"];
				}
				i++;
			}
			banknifty[3] = {
				"spotprice" : spotprice,
				"premium123" : premium123,
				"temporary" : temporary
			};
		}
	}).done(function() {
		NProgress.inc(0.03);
	});
	$.ajax({
		type: 'GET',
		url: url_banknifty_all[4],
		dataType: 'json',
		async: true,
		success: function (data) {
			console.log("bankdata4=" + data);
			var temporary;
			$.ajax({
				type: 'GET',
				url: 'https://opstra.definedge.com/api/free/strategybuilder/optionchain/BANKNIFTY&' + temp[4].replace(/\s+/g, ""),
				dataType: 'json',
				async: false,
				success: function (data) {
					console.log("all data=" + data);
					temporary = data;
				},
				error: function(xhr) {
					console.log("No data received for " + temp[4] + " expiry");
				}
			}).done(function() {
				NProgress.inc(0.03);
			});
			var spotprice = data.feed.entry[35].content.$t;
			var strikeprice123 = [];
			var premium123 = {};
			var i=0;
			var j=0;
			while (data.feed.entry[83+23*i].content.$t != "#VALUE!" && data.feed.entry[83+23*i].content.$t != "" && j < temporary.data.length) {
				strikeprice123.push(data.feed.entry[83+23*i].content.$t);
				if (data.feed.entry[83+23*i].content.$t == temporary.data[j].StrikePrice) {
					premium123[data.feed.entry[83+23*i].content.$t] = [parseFloat((data.feed.entry[82+23*i].content.$t).replace(/,/g, '')), parseFloat((data.feed.entry[84+23*i].content.$t).replace(/,/g, '')), (data.feed.entry[12].content.$t), (data.feed.entry[13].content.$t), (data.feed.entry[18].content.$t), (data.feed.entry[19].content.$t), (data.feed.entry[27].content.$t), (data.feed.entry[28].content.$t), (data.feed.entry[33].content.$t), (data.feed.entry[34].content.$t), (data.feed.entry[40].content.$t), (data.feed.entry[41].content.$t), (temporary.data[j].CallDelta), (temporary.data[j].PutDelta), (temporary.data[j].CallTheta), (temporary.data[j].PutTheta), (temporary.data[j].CallGamma), (temporary.data[j].PutGamma), (temporary.data[j].CallVega), (temporary.data[j].PutVega)];;
					j++;
				} else {
					premium123[data.feed.entry[83+23*i].content.$t] = [parseFloat((data.feed.entry[82+23*i].content.$t).replace(/,/g, '')), parseFloat((data.feed.entry[84+23*i].content.$t).replace(/,/g, '')), (data.feed.entry[12].content.$t), (data.feed.entry[13].content.$t), (data.feed.entry[18].content.$t), (data.feed.entry[19].content.$t), (data.feed.entry[27].content.$t), (data.feed.entry[28].content.$t), (data.feed.entry[33].content.$t), (data.feed.entry[34].content.$t), (data.feed.entry[40].content.$t), (data.feed.entry[41].content.$t), "-", "-", "-", "-", "-", "-", "-", "-"];
				}
				i++;
			}
			banknifty[4] = {
				"spotprice" : spotprice,
				"premium123" : premium123,
				"temporary" : temporary
			};
		}
	}).done(function() {
		NProgress.inc(0.03);
	});
	$.ajax({
		type: 'GET',
		url: url_banknifty_all[5],
		dataType: 'json',
		async: true,
		success: function (data) {
			console.log("bankdata5=" + data);
			var temporary;
			$.ajax({
				type: 'GET',
				url: 'https://opstra.definedge.com/api/free/strategybuilder/optionchain/BANKNIFTY&' + temp[5].replace(/\s+/g, ""),
				dataType: 'json',
				async: false,
				success: function (data) {
					console.log("all data=" + data);
					temporary = data;
				},
				error: function(xhr) {
					console.log("No data received for " + temp[5] + " expiry");
				}
			}).done(function() {
				NProgress.inc(0.03);
			});
			var spotprice = data.feed.entry[35].content.$t;
			var strikeprice123 = [];
			var premium123 = {};
			var i=0;
			var j=0;
			while (data.feed.entry[83+23*i].content.$t != "#VALUE!" && data.feed.entry[83+23*i].content.$t != "" && j < temporary.data.length) {
				strikeprice123.push(data.feed.entry[83+23*i].content.$t);
				if (data.feed.entry[83+23*i].content.$t == temporary.data[j].StrikePrice) {
					premium123[data.feed.entry[83+23*i].content.$t] = [parseFloat((data.feed.entry[82+23*i].content.$t).replace(/,/g, '')), parseFloat((data.feed.entry[84+23*i].content.$t).replace(/,/g, '')), (data.feed.entry[12].content.$t), (data.feed.entry[13].content.$t), (data.feed.entry[18].content.$t), (data.feed.entry[19].content.$t), (data.feed.entry[27].content.$t), (data.feed.entry[28].content.$t), (data.feed.entry[33].content.$t), (data.feed.entry[34].content.$t), (data.feed.entry[40].content.$t), (data.feed.entry[41].content.$t), (temporary.data[j].CallDelta), (temporary.data[j].PutDelta), (temporary.data[j].CallTheta), (temporary.data[j].PutTheta), (temporary.data[j].CallGamma), (temporary.data[j].PutGamma), (temporary.data[j].CallVega), (temporary.data[j].PutVega)];;
					j++;
				} else {
					premium123[data.feed.entry[83+23*i].content.$t] = [parseFloat((data.feed.entry[82+23*i].content.$t).replace(/,/g, '')), parseFloat((data.feed.entry[84+23*i].content.$t).replace(/,/g, '')), (data.feed.entry[12].content.$t), (data.feed.entry[13].content.$t), (data.feed.entry[18].content.$t), (data.feed.entry[19].content.$t), (data.feed.entry[27].content.$t), (data.feed.entry[28].content.$t), (data.feed.entry[33].content.$t), (data.feed.entry[34].content.$t), (data.feed.entry[40].content.$t), (data.feed.entry[41].content.$t), "-", "-", "-", "-", "-", "-", "-", "-"];
				}
				i++;
			}
			banknifty[5] = {
				"spotprice" : spotprice,
				"premium123" : premium123,
				"temporary" : temporary
			};
		}
	}).done(function() {
		NProgress.inc(0.03);
	});
	$.ajax({
		type: 'GET',
		url: url_banknifty_all[6],
		dataType: 'json',
		async: true,
		success: function (data) {
			console.log("bankdata6=" + data);
			var temporary;
			$.ajax({
				type: 'GET',
				url: 'https://opstra.definedge.com/api/free/strategybuilder/optionchain/BANKNIFTY&' + temp[6].replace(/\s+/g, ""),
				dataType: 'json',
				async: false,
				success: function (data) {
					console.log("all data=" + data);
					temporary = data;
				},
				error: function(xhr) {
					console.log("No data received for " + temp[6] + " expiry");
				}
			}).done(function() {
				NProgress.inc(0.03);
			});
			var spotprice = data.feed.entry[35].content.$t;
			var strikeprice123 = [];
			var premium123 = {};
			var i=0;
			var j=0;
			while (data.feed.entry[83+23*i].content.$t != "#VALUE!" && data.feed.entry[83+23*i].content.$t != "" && j < temporary.data.length) {
				strikeprice123.push(data.feed.entry[83+23*i].content.$t);
				if (data.feed.entry[83+23*i].content.$t == temporary.data[j].StrikePrice) {
					premium123[data.feed.entry[83+23*i].content.$t] = [parseFloat((data.feed.entry[82+23*i].content.$t).replace(/,/g, '')), parseFloat((data.feed.entry[84+23*i].content.$t).replace(/,/g, '')), (data.feed.entry[12].content.$t), (data.feed.entry[13].content.$t), (data.feed.entry[18].content.$t), (data.feed.entry[19].content.$t), (data.feed.entry[27].content.$t), (data.feed.entry[28].content.$t), (data.feed.entry[33].content.$t), (data.feed.entry[34].content.$t), (data.feed.entry[40].content.$t), (data.feed.entry[41].content.$t), (temporary.data[j].CallDelta), (temporary.data[j].PutDelta), (temporary.data[j].CallTheta), (temporary.data[j].PutTheta), (temporary.data[j].CallGamma), (temporary.data[j].PutGamma), (temporary.data[j].CallVega), (temporary.data[j].PutVega)];;
					j++;
				} else {
					premium123[data.feed.entry[83+23*i].content.$t] = [parseFloat((data.feed.entry[82+23*i].content.$t).replace(/,/g, '')), parseFloat((data.feed.entry[84+23*i].content.$t).replace(/,/g, '')), (data.feed.entry[12].content.$t), (data.feed.entry[13].content.$t), (data.feed.entry[18].content.$t), (data.feed.entry[19].content.$t), (data.feed.entry[27].content.$t), (data.feed.entry[28].content.$t), (data.feed.entry[33].content.$t), (data.feed.entry[34].content.$t), (data.feed.entry[40].content.$t), (data.feed.entry[41].content.$t), "-", "-", "-", "-", "-", "-", "-", "-"];
				}
				i++;
			}
			banknifty[6] = {
				"spotprice" : spotprice,
				"premium123" : premium123,
				"temporary" : temporary
			};
		}
	}).done(function() {
		NProgress.inc(0.03);
	});
	$.ajax({
		type: 'GET',
		url: url_banknifty_all[7],
		dataType: 'json',
		async: true,
		success: function (data) {
			console.log("bankdata7=" + data);
			var temporary;
			$.ajax({
				type: 'GET',
				url: 'https://opstra.definedge.com/api/free/strategybuilder/optionchain/BANKNIFTY&' + temp[7].replace(/\s+/g, ""),
				dataType: 'json',
				async: false,
				success: function (data) {
					console.log("all data=" + data);
					temporary = data;
				},
				error: function(xhr) {
					console.log("No data received for " + temp[7] + " expiry");
				}
			}).done(function() {
				NProgress.inc(0.03);
			});
			var spotprice = data.feed.entry[35].content.$t;
			var strikeprice123 = [];
			var premium123 = {};
			var i=0;
			var j=0;
			while (data.feed.entry[83+23*i].content.$t != "#VALUE!" && data.feed.entry[83+23*i].content.$t != "" && j < temporary.data.length) {
				strikeprice123.push(data.feed.entry[83+23*i].content.$t);
				if (data.feed.entry[83+23*i].content.$t == temporary.data[j].StrikePrice) {
					premium123[data.feed.entry[83+23*i].content.$t] = [parseFloat((data.feed.entry[82+23*i].content.$t).replace(/,/g, '')), parseFloat((data.feed.entry[84+23*i].content.$t).replace(/,/g, '')), (data.feed.entry[12].content.$t), (data.feed.entry[13].content.$t), (data.feed.entry[18].content.$t), (data.feed.entry[19].content.$t), (data.feed.entry[27].content.$t), (data.feed.entry[28].content.$t), (data.feed.entry[33].content.$t), (data.feed.entry[34].content.$t), (data.feed.entry[40].content.$t), (data.feed.entry[41].content.$t), (temporary.data[j].CallDelta), (temporary.data[j].PutDelta), (temporary.data[j].CallTheta), (temporary.data[j].PutTheta), (temporary.data[j].CallGamma), (temporary.data[j].PutGamma), (temporary.data[j].CallVega), (temporary.data[j].PutVega)];;
					j++;
				} else {
					premium123[data.feed.entry[83+23*i].content.$t] = [parseFloat((data.feed.entry[82+23*i].content.$t).replace(/,/g, '')), parseFloat((data.feed.entry[84+23*i].content.$t).replace(/,/g, '')), (data.feed.entry[12].content.$t), (data.feed.entry[13].content.$t), (data.feed.entry[18].content.$t), (data.feed.entry[19].content.$t), (data.feed.entry[27].content.$t), (data.feed.entry[28].content.$t), (data.feed.entry[33].content.$t), (data.feed.entry[34].content.$t), (data.feed.entry[40].content.$t), (data.feed.entry[41].content.$t), "-", "-", "-", "-", "-", "-", "-", "-"];
				}
				i++;
			}
			banknifty[7] = {
				"spotprice" : spotprice,
				"premium123" : premium123,
				"temporary" : temporary
			};
		}
	}).done(function() {
		NProgress.inc(0.03);
	});
}).ajaxStop(function() {
	console.log("all requests completed");
	NProgress.done();
});

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
			}).done(function() {
				NProgress.inc(0.03);
			});
			return result;
		}
	});
	var data = $.getStockData();
	var temporary;
	$.ajax({
		type: 'GET',
		url: 'https://opstra.definedge.com/api/free/strategybuilder/optionchain/NIFTY&' + temp[0].replace(/\s+/g, ""),
		dataType: 'json',
		async: false,
		success: function (data) {
			console.log("all data=" + data);
			temporary = data;
		},
		error: function(xhr) {
			console.log("No data received for " + temp[0] + " expiry");
		}
	}).done(function() {
		NProgress.inc(0.03);
	});
	var spotprice = data.feed.entry[35].content.$t;
	$("#spot_Price").text(spotprice);
	var strikeprice123 = [];
	var premium123 = {};
	var i=0;
	var j=0;
	while (data.feed.entry[83+23*i].content.$t != "#VALUE!" && data.feed.entry[83+23*i].content.$t != "" && j < temporary.data.length) {
		strikeprice123.push(data.feed.entry[83+23*i].content.$t);
		if (data.feed.entry[83+23*i].content.$t == temporary.data[j].StrikePrice) {
			premium123[data.feed.entry[83+23*i].content.$t] = [parseFloat((data.feed.entry[82+23*i].content.$t).replace(/,/g, '')), parseFloat((data.feed.entry[84+23*i].content.$t).replace(/,/g, '')), (data.feed.entry[12].content.$t), (data.feed.entry[13].content.$t), (data.feed.entry[18].content.$t), (data.feed.entry[19].content.$t), (data.feed.entry[27].content.$t), (data.feed.entry[28].content.$t), (data.feed.entry[33].content.$t), (data.feed.entry[34].content.$t), (data.feed.entry[40].content.$t), (data.feed.entry[41].content.$t), (temporary.data[j].CallDelta), (temporary.data[j].PutDelta), (temporary.data[j].CallTheta), (temporary.data[j].PutTheta), (temporary.data[j].CallGamma), (temporary.data[j].PutGamma), (temporary.data[j].CallVega), (temporary.data[j].PutVega)];;
			j++;
		} else {
			premium123[data.feed.entry[83+23*i].content.$t] = [parseFloat((data.feed.entry[82+23*i].content.$t).replace(/,/g, '')), parseFloat((data.feed.entry[84+23*i].content.$t).replace(/,/g, '')), (data.feed.entry[12].content.$t), (data.feed.entry[13].content.$t), (data.feed.entry[18].content.$t), (data.feed.entry[19].content.$t), (data.feed.entry[27].content.$t), (data.feed.entry[28].content.$t), (data.feed.entry[33].content.$t), (data.feed.entry[34].content.$t), (data.feed.entry[40].content.$t), (data.feed.entry[41].content.$t), "-", "-", "-", "-", "-", "-", "-", "-"];
		}
		i++;
	}	
	return {
		"spotprice" : spotprice,
		"premium123" : premium123,
		"temporary" : temporary
	}
}
nifty[0] = stock(url_nifty_all[0]);
$(document).ready(function() {
	let temp = nifty[0];
	$("#spot_Price").text(temp['spotprice']);
	$("#lot_size").text(1);
	$('#strategy').text((Object.values(temp['premium123'])[0][2]));
	$('#oi').text((Object.values(temp['premium123'])[0][6]));
	$('#change_in_oi').text((Object.values(temp['premium123'])[0][4]));
	$('#volume').text((Object.values(temp['premium123'])[0][8]));
	$('#trend_strength').text((Object.values(temp['premium123'])[0][10]));
});


console.log(options_expiries());
// var temp = options_expiries();
// for (var i of temp) {
// 	i = i.replace(/\s+/g, "");
// 	console.log(i);
// 	$.ajax({
// 		type: 'GET',
// 		url: 'https://opstra.definedge.com/api/free/strategybuilder/optionchain/NIFTY&' + i,
// 		dataType: 'json',
// 		async: true,
// 		success: function (data) {
// 			console.log(i + "=" + data);
// 			allData.push(data);
// 			console.log(allData);
// 		}
// 	});
// }

var future_expiries = function() {
	var arr = [];
	var temp = 1;
	for (var i=0; i<3; i++) {
		var d = new Date();
		d.setDate(1);
		d.setMonth(d.getMonth()+temp+i);
		do {
			d.setDate(d.getDate() - 1);
		} while (d.getDay() !== 4);
		console.log(d);
		if (d < new Date()) {
			temp = 2;
			i--;
			continue;
		}
		arr.push(d.toString().slice(4,15).toUpperCase());
	}
	return arr;
};
console.log(future_expiries());

var app = angular.module("optionsApp", ['ui.bootstrap', 'chart.js']);

app.controller('MainCtrl', ["$scope", "DataService", "UtilService", function ($scope, DataService, UtilService) {
	// $scope.url = url_nifty_all[0];
	$scope.url = 0;
	$scope.expiry;
	$scope.expiries = options_expiries();
	$scope.segments = ["OPTIONS", "FUTURES"];
	$scope.segment = "OPTIONS";
	$scope.future_price = [Object.values(niftyfutures)[0]];
	$scope.id = 0;
	$scope.stockdata = nifty[0];
	$scope.premium = {};
	$scope.strike_price = Object.keys($scope.stockdata["premium123"]);
	$scope.spot_price = [$scope.stockdata["spotprice"]];
	$scope.indices = ["NIFTY", "BANKNIFTY"]
	$scope.premiumValue = {0: [$scope.stockdata["premium123"][Object.keys($scope.stockdata["premium123"])[0]][0]]};
	$scope.trade_type = 'call';
	$scope.breakevens = {};
	$scope.total_loss = {};
	$scope.delta = 0;
	$scope.gamma = 0;
	$scope.vega = 0;
	$scope.theta = 0;
	$scope.minQty = 50;
	$scope.stepQty = 50;
	$scope.changetrade = function(trade_type, index, trade, setup) {
		$scope.trade_type = trade_type;
		var strikeprice = $("#"+index.toString()).children("option:selected").val();
		strikeprice = strikeprice.replace("string:", "0");
		strikeprice = parseInt(strikeprice);
		if (trade_type == 'put') {
			console.log('put');
			$scope.premiumValue[index] = [$scope.premium[index][strikeprice][1]];
			console.log($scope.premiumValue);
			trade.premium = $scope.premiumValue[index][0];
			$('#strategy').text((Object.values($scope.stockdata["premium123"])[0][3]));
			$('#oi').text((Object.values($scope.stockdata['premium123'])[0][7]));
			$('#change_in_oi').text((Object.values($scope.stockdata['premium123'])[0][5]));
			$('#volume').text((Object.values($scope.stockdata['premium123'])[0][9]));
			$('#trend_strength').text((Object.values($scope.stockdata['premium123'])[0][11]));
			$scope.breakevens[index] = strikeprice - parseInt($scope.premiumValue[index]);
			console.log($scope.breakevens);
			var size = Object.keys($scope.breakevens).length;
			var ans = 0;
			for (var [key, value] of Object.entries($scope.breakevens)) {
				var breakeven = parseInt(`${value}`);
				ans += breakeven;
			}
			console.log(ans/size);
			$('#breakevens').text(ans/size);
			setup.breakevens = "₹ " + (Math.round(((ans/size) + Number.EPSILON) * 100) / 100).toString();
			$scope.total_loss[index] = -1 * parseFloat($scope.premiumValue[index]);
			console.log($scope.total_loss);
			var size = Object.keys($scope.total_loss).length;
			var ans = 0;
			for (var [key, value] of Object.entries($scope.total_loss)) {
				var total_loss = parseInt(`${value}`);
				ans += total_loss;
			}
			console.log(ans/size);
			$('#total_loss').text((ans/size) * $scope.quantity);
			$('#margin').text((ans/size) * $scope.quantity * -1);
			setup.margin = "₹ " + (Math.round((((ans/size) * $scope.quantity * -1) + Number.EPSILON) * 100) / 100).toString();
			$scope.delta = $scope.premium[index][strikeprice][13];
			$scope.theta = $scope.premium[index][strikeprice][15];
			$scope.gamma = $scope.premium[index][strikeprice][17];
			$scope.vega = $scope.premium[index][strikeprice][19];
			setup.delta = $scope.delta;
			setup.theta = $scope.theta;
			setup.gamma = $scope.gamma;
			setup.vega = $scope.vega;
		} else if (trade_type == 'call') {
			console.log('call');
			$scope.premiumValue[index] = [$scope.premium[index][strikeprice][0]];
			console.log($scope.premiumValue);
			trade.premium = $scope.premiumValue[index][0];
			$('#strategy').text((Object.values($scope.stockdata["premium123"])[0][2]));
			$('#oi').text((Object.values($scope.stockdata['premium123'])[0][6]));
			$('#change_in_oi').text((Object.values($scope.stockdata['premium123'])[0][4]));
			$('#volume').text((Object.values($scope.stockdata['premium123'])[0][8]));
			$('#trend_strength').text((Object.values($scope.stockdata['premium123'])[0][10]));
			$scope.breakevens[index] = strikeprice + parseInt($scope.premiumValue[index]);
			console.log($scope.breakevens);
			var size = Object.keys($scope.breakevens).length;
			var ans = 0;
			for (var [key, value] of Object.entries($scope.breakevens)) {
				var breakeven = parseInt(`${value}`);
				ans += breakeven;
			}
			console.log(ans/size);
			$('#breakevens').text(ans/size);
			setup.breakevens = "₹ " + (Math.round(((ans/size) + Number.EPSILON) * 100) / 100).toString();
			$scope.total_loss[index] = -1 * parseFloat($scope.premiumValue[index]);
			console.log($scope.total_loss);
			var size = Object.keys($scope.total_loss).length;
			var ans = 0;
			for (var [key, value] of Object.entries($scope.total_loss)) {
				var total_loss = parseInt(`${value}`);
				ans += total_loss;
			}
			console.log(ans/size);
			$('#total_loss').text((ans/size) * $scope.quantity);
			$('#margin').text((ans/size) * $scope.quantity * -1);
			setup.margin = "₹ " + (Math.round((((ans/size) * $scope.quantity * -1) + Number.EPSILON) * 100) / 100).toString();
			$scope.delta = $scope.premium[index][strikeprice][12];
			$scope.theta = $scope.premium[index][strikeprice][14];
			$scope.gamma = $scope.premium[index][strikeprice][16];
			$scope.vega = $scope.premium[index][strikeprice][18];
			setup.delta = $scope.delta;
			setup.theta = $scope.theta;
			setup.gamma = $scope.gamma;
			setup.vega = $scope.vega;
		} else {
			console.log('no');
		}
	};
	$scope.changestrikeprice = function(index, trade, setup) {
		console.log(index);
		var strikeprice = $("#"+index.toString()).children("option:selected").val();
		strikeprice = strikeprice.replace("string:", "0");
		strikeprice = parseInt(strikeprice);
		console.log(strikeprice);
		if ($scope.trade_type == 'put') {
			console.log('put');
			$scope.premiumValue[index] = [$scope.premium[index][strikeprice][1]];
			console.log($scope.premiumValue);
			trade.premium = $scope.premiumValue[index][0];
			$scope.breakevens[index] = strikeprice - parseInt($scope.premiumValue[index]);
			console.log($scope.breakevens);
			var size = Object.keys($scope.breakevens).length;
			var ans = 0;
			for (var [key, value] of Object.entries($scope.breakevens)) {
				var breakeven = parseInt(`${value}`);
				ans += breakeven;
			}
			console.log(ans/size);
			$('#breakevens').text(ans/size);
			setup.breakevens = "₹ " + (Math.round(((ans/size) + Number.EPSILON) * 100) / 100).toString();
			$scope.total_loss[index] = -1 * parseFloat($scope.premiumValue[index]);
			console.log($scope.total_loss);
			var size = Object.keys($scope.total_loss).length;
			var ans = 0;
			for (var [key, value] of Object.entries($scope.total_loss)) {
				var total_loss = parseInt(`${value}`);
				ans += total_loss;
			}
			console.log(ans/size);
			$('#total_loss').text((ans/size) * $scope.quantity);
			$('#margin').text((ans/size) * $scope.quantity * -1);
			setup.margin = "₹ " + (Math.round((((ans/size) * $scope.quantity * -1) + Number.EPSILON) * 100) / 100).toString();
			$scope.delta = $scope.premium[index][strikeprice][13];
			$scope.theta = $scope.premium[index][strikeprice][15];
			$scope.gamma = $scope.premium[index][strikeprice][17];
			$scope.vega = $scope.premium[index][strikeprice][19];
			setup.delta = $scope.delta;
			setup.theta = $scope.theta;
			setup.gamma = $scope.gamma;
			setup.vega = $scope.vega;
		} else if ($scope.trade_type == 'call') {
			console.log('call');
			$scope.premiumValue[index] = [$scope.premium[index][strikeprice][0]];
			console.log($scope.premiumValue);
			trade.premium = $scope.premiumValue[index][0];
			$scope.breakevens[index] = strikeprice + parseInt($scope.premiumValue[index]);
			console.log($scope.breakevens);
			var size = Object.keys($scope.breakevens).length;
			var ans = 0;
			for (var [key, value] of Object.entries($scope.breakevens)) {
				var breakeven = parseInt(`${value}`);
				ans += breakeven;
			}
			console.log(ans/size);
			$('#breakevens').text(ans/size);
			setup.breakevens = "₹ " + (Math.round(((ans/size) + Number.EPSILON) * 100) / 100).toString();
			$scope.total_loss[index] = -1 * parseFloat($scope.premiumValue[index]);
			console.log($scope.total_loss);
			var size = Object.keys($scope.total_loss).length;
			var ans = 0;
			for (var [key, value] of Object.entries($scope.total_loss)) {
				var total_loss = parseInt(`${value}`);
				ans += total_loss;
			}
			console.log(ans/size);
			$('#total_loss').text((ans/size) * $scope.quantity);
			$('#margin').text((ans/size) * $scope.quantity * -1);
			setup.margin = "₹ " + (Math.round((((ans/size) * $scope.quantity * -1) + Number.EPSILON) * 100) / 100).toString();
			console.log($scope.premium[index][strikeprice]);
			$scope.delta = $scope.premium[index][strikeprice][12];
			$scope.theta = $scope.premium[index][strikeprice][14];
			$scope.gamma = $scope.premium[index][strikeprice][16];
			$scope.vega = $scope.premium[index][strikeprice][18];
			setup.delta = $scope.delta;
			setup.theta = $scope.theta;
			setup.gamma = $scope.gamma;
			setup.vega = $scope.vega;
		} else {
			console.log('no');
		}
	};
	$scope.index = function(name, setup) {
		console.log(name);
		if (name == 'NIFTY') {
			// $scope.stockdata = stock($scope.url);
			$scope.stockdata = nifty[$scope.url];
			console.log($scope.stockdata);
			for (var x in $scope.premium) {
				console.log(x);
				$scope.premium[x] = $scope.stockdata["premium123"];
			}
			console.log($scope.premium);
			$scope.strike_price = Object.keys($scope.stockdata["premium123"]);
			$scope.spot_price = [$scope.stockdata["spotprice"]];
			setup.spotPrice = $scope.spot_price[0];
			$scope.indices = ["NIFTY", "BANKNIFTY"]
			$scope.premiumValue = {0: [$scope.stockdata["premium123"][Object.keys($scope.stockdata["premium123"])[0]][0]]};
			$scope.trade_type = 'call';
			$scope.minQty = 50;
			$(".qty").attr("step", "50");
			// $(".qty").attr("min", "75");
			// $(".qty").attr("value", "75");
			$('#strategy').text((Object.values($scope.stockdata["premium123"])[0][2]));
			$('#oi').text((Object.values($scope.stockdata['premium123'])[0][6]));
			$('#change_in_oi').text((Object.values($scope.stockdata['premium123'])[0][4]));
			$('#volume').text((Object.values($scope.stockdata['premium123'])[0][8]));
			$('#trend_strength').text((Object.values($scope.stockdata['premium123'])[0][10]));
		} else if (name == 'BANKNIFTY') {
			// $scope.stockdata = stock($scope.url);
			$scope.stockdata = banknifty[$scope.url];
			console.log($scope.stockdata);
			for (var x in $scope.premium) {
				console.log(x);
				$scope.premium[x] = $scope.stockdata["premium123"];
			}
			console.log($scope.premium);
			$scope.strike_price = Object.keys($scope.stockdata["premium123"]);
			$scope.spot_price = [$scope.stockdata["spotprice"]];
			setup.spotPrice = $scope.spot_price[0];
			$scope.indices = ["NIFTY", "BANKNIFTY"]
			$scope.premiumValue = {0: [$scope.stockdata["premium123"][Object.keys($scope.stockdata["premium123"])[0]][0]]};
			$scope.trade_type = 'call';
			$scope.minQty = 25;
			$(".qty").attr("step", "25");
			// $(".qty").attr("min", "25");
			// $(".qty").attr("value", "25");
			$('#strategy').text((Object.values($scope.stockdata["premium123"])[0][2]));
			$('#oi').text((Object.values($scope.stockdata['premium123'])[0][6]));
			$('#change_in_oi').text((Object.values($scope.stockdata['premium123'])[0][4]));
			$('#volume').text((Object.values($scope.stockdata['premium123'])[0][8]));
			$('#trend_strength').text((Object.values($scope.stockdata['premium123'])[0][10]));
		}
	}
	$scope.change_expiry = function(expiry, name, setup) {
		// var expiry = $('.expiry').children('option:selected').val();
		// expiry = expiry.slice(7);
		console.log(expiry);
		var option = ($scope.expiries).indexOf(expiry);
		console.log(option);
		if (name === "NIFTY") {
			$scope.url = option;
			// $scope.url = url_nifty_all[option];
			// $scope.stockdata = nifty[option];
			if ($scope.segment === "FUTURES") {
				$scope.future_price = [Object.values(niftyfutures)[option]];
				console.log(setup.trades);
				setup.trades[0].strike = $scope.future_price[0];
			} else if ($scope.segment === "OPTIONS") {
				// options
			}
		} else if (name === "BANKNIFTY") {
			$scope.url = option;
			// $scope.url = url_banknifty_all[option];
			// $scope.stockdata = banknifty[option];
			if ($scope.segment === "FUTURES") {
				$scope.future_price = [Object.values(bankniftyfutures)[option]];
			} else if ($scope.segment === "OPTIONS") {
				// options
			}
		}
		// console.log($scope.url);
		$scope.index(name, setup);
	}
	$scope.quantity = 50;
	$scope.lot = 1;
	$scope.change_qty = function(qty, name) {
		// var qty = trade.qty;
		console.log(qty);
		$scope.quantity = qty;
		$scope.lot = Math.floor(qty / minQty);
		if (name == 'NIFTY') {
			$("#lot_size").text(qty/50);
		} else if (name == 'BANKNIFTY') {
			$("#lot_size").text(qty/25);
		}
	};
	$scope.check_qty = function(trade, lot) {
		console.log(trade.qty);
		console.log($scope.minQty);
		console.log(lot);
		if (trade.qty % $scope.minQty !== 0) {
			// trade.qty -= $scope.minQty;
			trade.qty -= 25;
			console.log(trade.qty);
		}
	};
	$scope.load = function (setup) {
		var n = setup.trades.length;
		$scope.id = n;
		for (var i=0; i<n; i++) {
			$scope.premium[i] = $scope.stockdata["premium123"];
			$scope.breakevens[i] = parseInt($scope.strike_price[0]);
			$scope.total_loss[i] = parseFloat(Object.values($scope.premium[i])[0][0]);
		}
		$('#delta').text($scope.delta);
		$('#theta').text($scope.theta);
		$('#gamma').text($scope.gamma);
		$('#vega').text($scope.vega);
		var size = Object.keys($scope.breakevens).length;
		var ans = 0;
		for (var [key, value] of Object.entries($scope.breakevens)) {
			var breakeven = parseInt(`${value}`);
			ans += breakeven;
		}
		console.log(ans/size);
		$('#breakevens').text(ans/size);
		var size = Object.keys($scope.total_loss).length;
		var ans = 0;
		for (var [key, value] of Object.entries($scope.total_loss)) {
			var total_loss = parseInt(`${value}`);
			ans += total_loss;
		}
		console.log(ans/size);
		$('#total_loss').text((ans/size) * $scope.quantity);
		$('#margin').text((ans/size) * $scope.quantity * -1);
	}
	$scope.change_segment = function(segment, name, setup) {
		console.log(segment);
		$scope.segment = segment;
		if ($scope.id === 0) {
			if (segment === "OPTIONS") {
				$scope.expiries = options_expiries();
			} else if (segment === "FUTURES") {
				$scope.expiries = future_expiries();
			}
			$scope.change_expiry($scope.expiries[0], name, setup);
		} else {
			var x = document.getElementsByClassName("trade_div");
			var y = document.getElementsByClassName("callput");
			var z = document.getElementsByClassName("future-hide");
			var a = document.getElementsByClassName("future");
			var b = document.getElementsByClassName("strike_price");
			if (segment === "FUTURES") {
				if ($scope.id !== 0) {
					document.getElementsByClassName("add_trade")[0].style.display = "none";
				}
			} else if (segment === "OPTIONS") {
				document.getElementsByClassName("add_trade")[0].style.display = "flex";
			}
			for (var i=0; i<y.length; i++) {
				if (segment === "OPTIONS") {
					x[i].style.display = "flex";
					y[i].style.display = "inline-block";
					z[i].style.display = "inline-block";
					a[i].style.display = "none"
					b[i].style.display = "flex"
					$('.strike-price').text('Strike Price');
					$scope.expiries = options_expiries();
				} else if (segment === "FUTURES") {
					if (i !== 0) {
						x[i].style.display = "none";
					}
					y[i].style.display = "none";
					z[i].style.display = "none";
					a[i].style.display = "flex"
					b[i].style.display = "none"
					$('.strike-price').text('Futures Price');
					$scope.expiries = future_expiries();
				}
			}
		}
		// console.log($scope.expiries[0]);
		// $scope.change_expiry($scope.expiries[0], name, setup);
	}

	$scope.setups = DataService.getAllSetups();
	$scope.chartData = []
	$scope.chart = {
		data: {},
		series: ['Profit & Loss'],
		options: {
			
			legend: {
				labels: {
					fontColor: "white",
				}
			}
		},
		datasetOverride: [{
			// fill: {above: 'green', below: 'red', target: 'origin'}
			pointBorderColor: $scope.chartData.map((value) => value < 0 ? 'red' : 'green'),
			pointBackgroundColor: $scope.chartData.map((value) => value < 0 ? 'red' : 'green'),
			fill: true,
			backgroundColor: 'green'
		}]
	};
	
	$scope.$watch('setups', function (newVal, oldVal) {
		angular.forEach($scope.setups, function (setup) {
			console.log(newVal);
			console.log(oldVal);
			console.log($scope.chartData);
			setup.profit = $scope.netProfit(setup);
			// $scope.updateChartData(setup);
			$scope.updateChart(setup);
			setup.maxProfit = $scope.max;
			setup.maxLoss = $scope.min;
			$('#max_profit').text($scope.max);
			$('#max_loss').text($scope.min);
			if ($scope.max !== 'Undefined' && $scope.min !== 'Undefined') {
				$('#max_rr_ratio').text(parseFloat($scope.min)/parseFloat($scope.max));
				let num = parseFloat((setup.maxLoss).slice(2,)) / parseFloat((setup.maxProfit.slice(2,)));
				// setup.maxRrRatio = parseFloat((setup.maxLoss).slice(2,)) / parseFloat((setup.maxProfit.slice(2,)));
				setup.maxRrRatio = Math.round((num + Number.EPSILON) * 100) / 100;
			} else {
				$('#max_rr_ratio').text('NA');
				setup.maxRrRatio = 'NA';
			}
			// $scope.change_qty($scope.quantity, setup.name);
			// setup.delta = $scope.delta;
			// setup.theta = $scope.theta;
			// setup.gamma = $scope.gamma;
			// setup.vega = $scope.vega;
			console.log($scope.breakevens);
			// var size = Object.keys($scope.breakevens).length;
			// var ans = 0;
			// for (var [key, value] of Object.entries($scope.breakevens)) {
			// 	var breakeven = parseInt(`${value}`);
			// 	ans += breakeven;
			// }
			// console.log(ans/size);
			// $('#breakevens').text(ans/size);
			// setup.breakevens = "₹ " + (ans/size).toString();
			console.log($scope.total_loss);
			// var size = Object.keys($scope.total_loss).length;
			// var ans = 0;
			// for (var [key, value] of Object.entries($scope.total_loss)) {
			// 	var total_loss = parseInt(`${value}`);
			// 	ans += total_loss;
			// }
			// console.log(ans/size);
			// $('#total_loss').text((ans/size) * $scope.quantity);
			// $('#margin').text((ans/size) * $scope.quantity * -1);
			// setup.margin = "₹ " + ((ans/size) * $scope.quantity * -1).toString();
		});
		DataService.saveSetups($scope.setups);
		$('#strategy').text((Object.values($scope.stockdata["premium123"])[0][2]));
		$('#oi').text((Object.values($scope.stockdata['premium123'])[0][6]));
		$('#change_in_oi').text((Object.values($scope.stockdata['premium123'])[0][4]));
		$('#volume').text((Object.values($scope.stockdata['premium123'])[0][8]));
		$('#trend_strength').text((Object.values($scope.stockdata['premium123'])[0][10]));
		$('#delta').text($scope.delta);
		$('#theta').text($scope.theta);
		$('#gamma').text($scope.gamma);
		$('#vega').text($scope.vega);
		// console.log($scope.breakevens);
		// var size = Object.keys($scope.breakevens).length;
		// var ans = 0;
		// for (var [key, value] of Object.entries($scope.breakevens)) {
		// 	var breakeven = parseInt(`${value}`);
		// 	ans += breakeven;
		// }
		// console.log(ans/size);
		// $('#breakevens').text(ans/size);
		// console.log($scope.total_loss);
		// var size = Object.keys($scope.total_loss).length;
		// var ans = 0;
		// for (var [key, value] of Object.entries($scope.total_loss)) {
		// 	var total_loss = parseInt(`${value}`);
		// 	ans += total_loss;
		// }
		// console.log(ans/size);
		// $('#total_loss').text((ans/size) * $scope.quantity);
		// $('#margin').text((ans/size) * $scope.quantity * -1);
		console.log('hi');
		console.log($scope.id);
		if ($scope.segment === 'FUTURES') {
			document.getElementsByClassName("add_trade")[0].style.display = "none";
			document.getElementsByClassName("callput")[0].style.display = "none";
			document.getElementsByClassName("future-hide")[0].style.display = "none";
			document.getElementsByClassName("strike_price")[0].style.display = "none";
			document.getElementsByClassName("future")[0].style.display = "flex";
			$('.strike-price').text('Futures Price');
			$scope.expiries = future_expiries();
		}
	}, true);

	$scope.addSetup = function () {
		var setup = {
			id: UtilService.getUniqueId(),
			name: '',
			spotPrice: $scope.spot_price[0],
			trades: [],
			profit: 0,
			maxProfit: "Undefined",
			maxLoss: "Undefined",
			maxRrRatio: "NA",
			pop: "--",
			breakevens: "NA",
			totalPNL: 0,
			netCredit: 0,
			margin: 0,
			delta: 0,
			theta: 0,
			gamma: 0,
			vega: 0
		};
		console.log(setup.spotPrice);
		$('#strategy').text((Object.values($scope.stockdata["premium123"])[0][2]));
		console.log((Object.values($scope.stockdata["premium123"])[0][2]));
		$('#oi').text((Object.values($scope.stockdata['premium123'])[0][6]));
		$('#change_in_oi').text((Object.values($scope.stockdata['premium123'])[0][4]));
		$('#volume').text((Object.values($scope.stockdata['premium123'])[0][8]));
		$('#trend_strength').text((Object.values($scope.stockdata['premium123'])[0][10]));
		$scope.setups.push(setup);
		$scope.premiumValue = {0: [$scope.stockdata["premium123"][Object.keys($scope.stockdata["premium123"])[0]][0]]};
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
		$scope.premium[$scope.id] = $scope.stockdata["premium123"];
		$scope.breakevens[$scope.id] = parseInt($scope.strike_price[0]);
		$scope.total_loss[$scope.id] = parseFloat(Object.values($scope.premium[$scope.id])[0][0]);
		console.log($scope.premium);
		$scope.id++;
		console.log($scope.segment);
		if ($scope.segment === 'FUTURES') {
			document.getElementsByClassName("add_trade")[0].style.display = "none";
			document.getElementsByClassName("callput")[0].style.display = "none";
			document.getElementsByClassName("future-hide")[0].style.display = "none";
			document.getElementsByClassName("strike_price")[0].style.display = "none";
			document.getElementsByClassName("future")[0].style.display = "flex";
		}
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
		if ($scope.segment === 'FUTURES' && $scope.id === 0) {
			document.getElementsByClassName("add_trade")[0].style.display = "flex";
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
		if ($scope.segment === "OPTIONS") {
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
		} else if ($scope.segment === "FUTURES") {
			var trade = setup.trades[0];
			if (trade.strike <= 0) return;

			if (trade.tradeType == "buy") {
				ret += (spotPrice - trade.strike) * trade.qty;
			} else { //sell
				ret += (trade.strike - spotPrice) * trade.qty;
			}
		}

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

	$scope.max;
	$scope.min;
	$scope.updateChartData = function (setup) {
		console.log("graph changed for");
		console.log(setup);
		var spotPrice = parseInt(setup.spotPrice, 10);
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

		var size = profitArr.length;
		var extreme_left = parseFloat(profitArr[0]);
		var extreme_right = parseFloat(profitArr[size-1]);
		var min = Math.min.apply(Math, profitArr);
		var max = Math.max.apply(Math, profitArr);
		console.log(profitArr);
		$scope.chartData = profitArr;
		console.log(extreme_left, extreme_right);
		console.log(max, min);
		if (max !== extreme_left && max !== extreme_right) {
			$scope.max = "₹ " + max.toString();
			// $('.rupee').each(function() {
			// 	$(this).css("display", "inline-flex");
			// });
		} else if (max === parseFloat(profitArr[1]) || max === parseFloat(profitArr[size-2])) {
			$scope.max = "₹ " + max.toString();
			// $('.rupee').each(function() {
			// 	$(this).css("display", "inline-flex");
			// });
		} else {
			$scope.max = 'Undefined';
			// $('.rupee').each(function() {
			// 	$(this).css("display", "none");
			// });
		}
		if (min !== extreme_left && min !== extreme_right) {
			$scope.min = "₹ " + min.toString();
			// $('.rupee').each(function() {
			// 	$(this).css("display", "inline-flex");
			// });
		} else if (min === parseFloat(profitArr[1]) || min === parseFloat(profitArr[size-2])) {
			$scope.min = "₹ " + min.toString();
			// $('.rupee').each(function() {
			// 	$(this).css("display", "inline-flex");
			// });
		} else {
			$scope.min = 'Undefined';
			// $('.rupee').each(function() {
			// 	$(this).css("display", "none");
			// });
		}

		$scope.chart.data[setup.id] = {
			profits: [profitArr],
			labels: labelArr
		};

		return 1;
	};
	$scope.updateChart = function(setup) {
		am4core.useTheme(am4themes_animated);

		var chart = am4core.create("chart-div", am4charts.XYChart);
		chart.colors.list = [
			am4core.color("#67dc75"),
			am4core.color("#dc6967")
		];

		// Add data
		var minimum = 0;
		var maximum = 0;
		// chart.data = generatechartData();
		chart.data = chartData(setup);
		console.log(chart.data);
		function chartData(setup) {
			console.log("graph changed for");
			console.log(setup);
			var spotPrice = parseInt(setup.spotPrice, 10);
			if (spotPrice == 0) return 0;

			var spotRange = parseInt(spotPrice * 0.08, 10);
			var spotInc = UtilService.getSpotInc(spotRange);
			var spotMin = Math.ceil((spotPrice - spotRange) / spotInc) * spotInc;
			var spotMax = Math.ceil((spotPrice + spotRange) / spotInc) * spotInc;

			minimum = spotMin;
			maximum = spotMax;

			var profitArr = [];
			var labelArr = [];

			for (var spot = spotMin; spot <= spotMax; spot += spotInc) {
				labelArr.push(spot);
				profitArr.push($scope.netProfit(setup, spot));
			}

			var size = profitArr.length;
			var extreme_left = parseFloat(profitArr[0]);
			var extreme_right = parseFloat(profitArr[size-1]);
			var min = Math.min.apply(Math, profitArr);
			var max = Math.max.apply(Math, profitArr);
			console.log(profitArr);
			$scope.chartData = profitArr;
			console.log(extreme_left, extreme_right);
			console.log(max, min);
			if (max !== extreme_left && max !== extreme_right) {
				$scope.max = "₹ " + max.toString();
			} else if (max === parseFloat(profitArr[1]) || max === parseFloat(profitArr[size-2])) {
				$scope.max = "₹ " + max.toString();
			} else {
				$scope.max = 'Undefined';
			}
			if (min !== extreme_left && min !== extreme_right) {
				$scope.min = "₹ " + min.toString();
			} else if (min === parseFloat(profitArr[1]) || min === parseFloat(profitArr[size-2])) {
				$scope.min = "₹ " + min.toString();
			} else {
				$scope.min = 'Undefined';
			}

			$scope.chart.data[setup.id] = {
				profits: [profitArr],
				labels: labelArr
			};
			var chartData = []
			for (var i=0; i<labelArr.length; i++) {
				chartData.push({
					date: labelArr[i],
					visits: profitArr[i]
				});
			}

			return chartData;
		}
		function generatechartData() {
			var chartData = [];
			var firstDate = new Date();
			firstDate.setDate(firstDate.getDate() - 150);
			var visits = -40;
			var b = 0.6;
			for (var i = 0; i < 150; i++) {
				// we create date objects here. In your data, you can have date strings
				// and then set format of your dates using chart.dataDateFormat property,
				// however when possible, use date objects, as this will speed up chart rendering.
				var newDate = new Date(firstDate);
				newDate.setDate(newDate.getDate() + i);
				if (i > 80) {
				b = 0.4;
				}
				visits += Math.round((Math.random() < b ? 1 : -1) * Math.random() * 10);

				chartData.push({
				date: newDate,
				visits: visits
				});
			}
			return chartData;
		}

		// Create axes
		var dateAxis = chart.xAxes.push(new am4charts.ValueAxis());
		dateAxis.renderer.labels.template.fill = am4core.color("#23a0a4");
		dateAxis.min = minimum;
		dateAxis.max = maximum;
		dateAxis.strictMinMax = true;
		// dateAxis.startLocation = 0.5;
		// dateAxis.endLocation = 0.5;

		// Create value axis
		var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
		valueAxis.renderer.labels.template.fill = am4core.color("#23a0a4");

		// Create series
		var series = chart.series.push(new am4charts.LineSeries());
		series.dataFields.valueY = "visits";
		series.dataFields.valueX = "date";
		series.strokeWidth = 3;
		series.tooltipText = "{valueY}";
		series.fillOpacity = 0.1;

		// Create a range to change stroke for values below 0
		var range = valueAxis.createSeriesRange(series);
		range.value = 0;
		range.endValue = -1000000000;
		range.contents.stroke = chart.colors.getIndex(1);
		range.contents.fill = range.contents.stroke;
		range.contents.strokeOpacity = 0.7;
		range.contents.fillOpacity = 0.1;
		console.log(chart.colors.list);

		// Add cursor
		chart.cursor = new am4charts.XYCursor();
		dateAxis.getSeriesDataItem = function(series, position) {
			var key = this.axisFieldName + this.axisLetter;
			var value = this.positionToValue(position);
			const dataItem = series.dataItems.getIndex(series.dataItems.findClosestIndex(value, function(x) {
				return x[key] ? x[key] : undefined;
			}, "any"));
			return dataItem;
		};
		// chart.cursor.xAxis = dateAxis;
		chart.scrollbarX = new am4core.Scrollbar();
		// chart.scrollbarY = new am4core.Scrollbar();

		series.tooltip.getFillFromObject = false;
		series.tooltip.adapter.add("x", (x, target) => {
		if (series.tooltip.tooltipDataItem.valueY < 0) {
			series.tooltip.background.fill = chart.colors.getIndex(1);
		} else {
			series.tooltip.background.fill = chart.colors.getIndex(0);
		}
		return x;
		});

		// Add scrollbar
		var scrollbar1 = new am4charts.XYChartScrollbar();
		// var scrollbar2 = new am4charts.XYChartScrollbar();
		scrollbar1.series.push(series);
		chart.scrollbarX = scrollbar1;
		chart.scrollbarX.parent = chart.bottomAxesContainer;
		chart.scrollbarX.background.fillOpacity = 0;
		// chart.scrollbarY = scrollbar2;
		// chart.scrollbarY.parent = chart.rightAxesContainer;
		// chart.scrollbarY.background.fillOpacity = 0;

		// Style scrollbar
		function customizeGrip(grip) {
			grip.icon.disabled = true;
			grip.background.disabled = true;

			var img = grip.createChild(am4core.Rectangle);
			img.width = 15;
			img.height = 15;
			img.fill = am4core.color("#999");
			img.rotation = 45;
			img.align = "center";
			img.valign = "middle";

			var line = grip.createChild(am4core.Rectangle);
			line.height = 60;
			line.width = 3;
			line.fill = am4core.color("#999");
			line.align = "center";
			line.valign = "middle";
		}

		customizeGrip(chart.scrollbarX.startGrip);
		customizeGrip(chart.scrollbarX.endGrip);
		// customizeGrip(chart.scrollbarY.startGrip);
		// customizeGrip(chart.scrollbarY.endGrip);

		var scrollSeries1 = chart.scrollbarX.scrollbarChart.series.getIndex(0);
		scrollSeries1.fillOpacity = 0;
		scrollSeries1.strokeDasharray = "2,2";

		chart.scrollbarX.scrollbarChart.plotContainer.filters.clear();
		chart.scrollbarX.unselectedOverlay.fillOpacity = 0.1;

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
					return 10;
				default:
					return 10;
			}
		}
	};
	return methods;
});

console.log(niftyfutures);
console.log(bankniftyfutures);
console.log(nifty);
console.log(banknifty);
