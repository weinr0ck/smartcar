var AppEngine = require('../../app/vehicle/engine.js');
var Base = require('../../handler/vehicle/base.js');
var App = new AppEngine();

class Engine extends Base {
	gmGet (req, res, next) {
		App.getJsonData(req, next);
	}

	filterGet (req, res, next) {
		res.send(App.filterJsonData(req));
	}
}

module.exports = Engine;