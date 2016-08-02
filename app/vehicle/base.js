//Base for handling app logic
class Base {
	/**
	 * Constructor handles setting up the app logic
	 */
	constructor() {
		this.url = "http://gmapi.azurewebsites.net/";
	}

	/**
	 * Get the json data from the 3rd party Api
	 *
	 * @param {object} req
	 * @param {function} next
	 */
	getJsonData(req, next) {
		//call next if this function isn't overwritten
		next();
	}

	/**
	 * Filter the json to a smartcar standard
	 *
	 * @param {object} req
	 */
	filterJsonData(req) {
		//return a blank json object if this functoin isn't overwritten
		return {};
	}
}

module.exports = Base;