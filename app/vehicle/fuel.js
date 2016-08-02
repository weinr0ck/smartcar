var Base = require('../../app/vehicle/base.js');
var request = require('request');

class Fuel extends Base {

	getJsonData(req, next) {
		request.post(this.url + "/getEnergyService", {
			method: "POST",
			json: {
				id: req.params.id,
				responseType: "JSON"
			}
		}, function (err, res, body) {
			req.fuel = body.data;
			next();
		});
	}

	filterJsonData(req) {
		//check if we have the req object and its data
		if (req === undefined || req.fuel === undefined) {
			throw new Error("Request object does not contain usable info");
		}

		//get the data from the request
		var data = req.fuel;

		//check that our data to filter on has come through
		if (data.tankLevel === undefined || data.tankLevel.value === undefined) {
			throw new Error("tankLevel data not found");
		}

		//return the object of filtered data
		return {
			percent: data.tankLevel.value
		};
	}
}

module.exports = Fuel;