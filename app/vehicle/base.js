class Base {
	constructor() {
		this.url = "http://gmapi.azurewebsites.net/";
	}

	getJsonData(req, next) {
		next();
	}

	filterJsonData(req) {
		return {};
	}
}

module.exports = Base;