var expect  = require("chai").expect;
var fuel = require("../../app/vehicle/fuel");

describe("Fuel Vehicle App", function() {
	describe("filterJsonData", function() {
		it("exceptions", function() {
			var App = new fuel();

			expect(() => App.filterJsonData()).to.throw(Error, /Request object does not contain usable/);
			expect(() => App.filterJsonData({})).to.throw(Error, /Request object does not contain usable/);

			//construct an object to throw different execptions
			var req = {
				fuel: {}
			};

			//tank errors
			expect(() => App.filterJsonData(req)).to.throw(Error, /tankLevel data not found/);
			req.fuel.tankLevel = {};
			expect(() => App.filterJsonData(req)).to.throw(Error, /tankLevel data not found/);
		});

		it("legit data 1", function() {
			var App = new fuel();

			var req = {
				fuel: {
					tankLevel: {
						type: "Number",
						value: "30"
					},
					batteryLevel: {
						type: "Null",
						value: "null"
					}
				}
			};

			//Shouldn't be any errors
			var result = App.filterJsonData(req);
			expect(result.percent).to.equal("30");
		});

		it("legit data 2", function() {
			var App = new fuel();

			var req = {
				fuel: {
					tankLevel: {
						type: "Number",
						value: "50"
					},
					batteryLevel: {
						type: "Null",
						value: "null"
					}
				}
			};

			//Shouldn't be any errors
			var result = App.filterJsonData(req);
			expect(result.percent).to.equal("50");
		});
	});
});