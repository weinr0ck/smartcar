var expect  = require("chai").expect;
var engine = require("../../app/vehicle/engine");

describe("Engine Vehicle App", function() {
	describe("filterJsonData", function() {
		it("exceptions", function() {
			var App = new engine();

			expect(() => App.filterJsonData()).to.throw(Error, /Request object does not contain usable/);
			expect(() => App.filterJsonData({})).to.throw(Error, /Request object does not contain usable/);
		});

		it("legit data 1", function() {
			var App = new engine();

			var req = {
				engine: "EXECUTED"
			};

			//Shouldn't be any errors
			var result = App.filterJsonData(req);
			expect(result.status).to.equal("success");
		});

		it("legit data 2", function() {
			var App = new engine();

			var req = {
				engine: "FAILED"
			};

			//Shouldn't be any errors
			var result = App.filterJsonData(req);
			expect(result.status).to.equal("error");
		});
	});
});