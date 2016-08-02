var Base = require('../../app/vehicle/base.js');
var request = require('request');

class Engine extends Base {

	getJsonData(req, next) {
		request.post(this.url + "/actionEngineService", {
			method: "POST",
			json: {
				id: req.params.id,
				command: req.body.action.toUpperCase() + "_VEHICLE",
				responseType: "JSON"
			}
		}, function (err, res, body) {
			req.engine = body.actionResult.status;
			next();
		});
	}

	filterJsonData(req) {
		//check if we have the req object and its data
		if (req === undefined || req.engine === undefined) {
			throw new Error("Request object does not contain usable info");
		}

		//return the result of the engine service
		return {
			status: req.engine.toUpperCase() === 'EXECUTED' ? 'success' : 'error'
		};
	}
}

module.exports = Engine;