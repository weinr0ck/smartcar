var AppDoors = require('../../app/vehicle/doors.js');
var Base = require('../../handler/vehicle/base.js');
var App = new AppDoors();

class Doors extends Base {
	gmGet (req, res, next) {
		App.getJsonData(req, next);
	}

	filterGet (req, res, next) {
		res.send(App.filterJsonData(req));
	}
}

module.exports = Doors;