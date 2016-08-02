var Base = require('../../app/vehicle/base.js');
var request = require('request');

class Battery extends Base {

	getJsonData(req, next) {
		request.post(this.url + "/getEnergyService", {
			method: "POST",
			json: {
				id: req.params.id,
				responseType: "JSON"
			}
		}, function (err, res, body) {
			req.battery = body.data;
			next();
		});
	}

	filterJsonData(req) {
		//check if we have the req object and its data
		if (req === undefined || req.battery === undefined) {
			throw new Error("Request object does not contain usable info");
		}

		//get the data from the request
		var data = req.battery;

		//check that our data to filter on has come through
		if (data.batteryLevel === undefined || data.batteryLevel.value === undefined) {
			throw new Error("batteryLevel data not found");
		}

		//return the object of filtered data
		return {
			percent: data.batteryLevel.value
		};
	}
}

module.exports = Battery;