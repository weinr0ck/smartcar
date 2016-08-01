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
		//get the data from the request
		var data = req.battery;

		//return the object of filtered data
		return {
			percent: data.batteryLevel.value
		};
	}
}

module.exports = Battery;