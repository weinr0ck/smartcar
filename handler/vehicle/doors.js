var AppDoors = require('../../app/vehicle/doors.js');
var Base = require('../../handler/vehicle/base.js');
var App = new AppDoors();

//Doors class is used to handle the doors endpoint
class Doors extends Base {
    /**
     * Call application to get json data.
     * @param {object} req - The request
     * @param {object} res - The response
	 * @param {function} next - Continue from this middleware
     */
	gmGet (req, res, next) {
		App.getJsonData(req, next);
	}

    /**
     * Call application to filter json data.
     * @param {object} req - The request
     * @param {object} res - The response
	 * @param {function} next - Continue from this middleware
     */
	filterGet (req, res, next) {
		res.send(App.filterJsonData(req));
	}
}

module.exports = Doors;