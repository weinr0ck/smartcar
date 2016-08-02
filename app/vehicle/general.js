var Base = require('../../app/vehicle/base.js');
var request = require('request');

//General class to handle /getVehicleInfoService
class General extends Base {

	/**
	 * Get the json data from the 3rd party Api
	 *
	 * @param {object} req
	 * @param {function} next
	 */
	getJsonData(req, next) {
		request.post(this.url + "/getVehicleInfoService", {
			method: "POST",
			json: {
				id: req.params.id,
				responseType: "JSON"
			}
		}, function (err, res, body) {
			if (body.data !== undefined) {
				req.general = body.data;
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
		if (req === undefined || req.general === undefined) {
			throw new Error("Request object does not contain usable info");
		}

		//get the data from the request
		var data = req.general;

		//check that our data to filter on has come through
		if (data.vin === undefined || data.vin.value === undefined) {
			throw new Error("Vin data not found");
		}
		if (data.color === undefined || data.color.value === undefined) {
			throw new Error("Color data not found");
		}
		if (data.fourDoorSedan === undefined || data.fourDoorSedan.value === undefined) {
			throw new Error("doorCount data not found");
		}
		if (data.driveTrain === undefined || data.driveTrain.value === undefined) {
			throw new Error("driveTrain data not found");
		}

		//return the object of filtered data
		return {
			vin: data.vin.value,
			color: data.color.value,
			doorCount: data.fourDoorSedan.value === 'True' ? 4 : 2,
			driveTrain: data.driveTrain.value
		};
	}
}

module.exports = General;