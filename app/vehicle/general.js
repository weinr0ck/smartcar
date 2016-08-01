var Base = require('../../app/vehicle/base.js');
var request = require('request');

class General extends Base {

	getJsonData(req, next) {
		request.post(this.url + "/getVehicleInfoService", {
			method: "POST",
			json: {
				id: req.params.id,
				responseType: "JSON"
			}
		}, function (err, res, body) {
			req.general = body.data;
			next();
		});
	}

	filterJsonData(req) {
		//get the data from the request
		var data = req.general;

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