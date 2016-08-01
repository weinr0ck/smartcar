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
		//get the data from the request
		var data = req.doors;

		//create our return filtered object
		var filter = new Array();

		//loop throught the data to filter
		var count = data.length;
		for (var index = 0; index < count; index++) {
			filter.push({
				location: data[index].location.value,
				locked :data[index].locked.value
			})
		}

		return filter;
	}
}

module.exports = Doors;