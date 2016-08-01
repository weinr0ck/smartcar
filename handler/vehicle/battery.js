var AppBattery = require('../../app/vehicle/battery.js');
var Base = require('../../handler/vehicle/base.js');
var App = new AppBattery();

class Battery extends Base {
	gmGet (req, res, next) {
		App.getJsonData(req, next);
	}

	filterGet (req, res, next) {
		res.send(App.filterJsonData(req));
	}
}

module.exports = Battery;