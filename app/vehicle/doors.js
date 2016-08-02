var Base = require('../../app/vehicle/base.js');
var request = require('request');

class Doors extends Base {

	getJsonData(req, next) {
		request.post(this.url + "/getSecurityStatusService", {
			method: "POST",
			json: {
				id: req.params.id,
				responseType: "JSON"
			}
		}, function (err, res, body) {
			req.doors = body.data.doors.values;
			next();
		});
	}

	filterJsonData(req) {
		//check if we have the req object and its data
		if (req === undefined || req.doors === undefined) {
			throw new Error("Request object does not contain usable info");
		}

		//get the data from the request
		var data = req.doors;

		//check that our data to filter on has come through
		if (data.length == 0) {
			throw new Error("doors data not found");
		}

		//create our return filtered object
		var filter = new Array();

		//loop throught the data to filter
		var count = data.length;
		for (var index = 0; index < count; index++) {
			//check that our doors have the correct structure
			if (data[index].location === undefined || data[index].location.value === undefined) {
				throw new Error("doors location data not found");
			}
			if (data[index].locked === undefined || data[index].locked.value === undefined) {
				throw new Error("doors locked data not found");
			}

			filter.push({
				location: data[index].location.value,
				locked :data[index].locked.value
			})
		}

		return filter;
	}
}

module.exports = Doors;