var xlsx = require("node-xlsx");
var fs = require('fs');
var filePath = process.argv[2] + '.xlsx'
console.log(filePath)

var list = xlsx.parse(filePath);
praseExcel(list);

//Ω‚ŒˆExcel
function praseExcel(list) {
	console.log("start");

	for (var i = 0; i < list.length; i++) {

		var datas = list[i].data;
		var newArr = [];
		var keys = datas[1];


		for (var j = 0, len = datas.length; j < len; j++) {

			if (j > 1) {
				let values = datas[j]

				let obj = transferObj(values, keys, j - 1)

				newArr.push(obj)
			}

		}

		if (newArr.length > 0) {
			writeFile(list[i].name + ".json", JSON.stringify(newArr));
		}

	}
	console.log("end");
}

function transferObj(values, keys, id) {
	var newObj = {}
	for (var i = 0, len = keys.length; i < len; i++) {
		if (keys[i] === 'id') {
			newObj[keys[i]] = id
			continue
		}
		newObj[keys[i]] = values[i]
	}
	return newObj
}

//–¥Œƒº˛
function writeFile(fileName, data) {
	fs.writeFile(fileName, data, 'utf-8', complete);

	function complete(err) {
		if (!err) {
			console.log("success");
		}
	}
}