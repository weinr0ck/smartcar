var Base = require('../../app/vehicle/base.js');
var request = require('request');

//Fuel class to handle /getEnergyService
class Fuel extends Base {

	/**
	 * Get the json data from the 3rd party Api
	 *
	 * @param {object} req
	 * @param {function} next
	 */
	getJsonData(req, next) {
		request.post(this.url + "/getEnergyService", {
			method: "POST",
			json: {
				id: req.params.id,
				responseType: "JSON"
			}
		}, function (err, res, body) {
			if (body.data !== undefined) {
				req.fuel = body.data;
			}
			next();
		});
	}

	/**
	 * Filter the json to a smartcar standard
	 *
	 * @param {object} req
	 */
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