var expect  = require("chai").expect;
var battery = require("../../app/vehicle/battery");

//Battery Logic tests
describe("Battrey Vehicle App", function() {
	describe("filterJsonData", function() {
		//Test exceptions
		it("exceptions", function() {
			var App = new battery();

			expect(() => App.filterJsonData()).to.throw(Error, /Request object does not contain usable/);
			expect(() => App.filterJsonData({})).to.throw(Error, /Request object does not contain usable/);

			//construct an object to throw different execptions
			var req = {
				battery: {}
			};

			//battery errors
			expect(() => App.filterJsonData(req)).to.throw(Error, /batteryLevel data not found/);
			req.battery.batteryLevel = {};
			expect(() => App.filterJsonData(req)).to.throw(Error, /batteryLevel data not found/);
		});

		//First test legit data
		it("legit data 1", function() {
			var App = new battery();

			var req = {
				battery: {
					tankLevel: {
						type: "Number",
						value: "30"
					},
					batteryLevel: {
						type: "Number",
						value: "20"
					}
				}
			};

			//Shouldn't be any errors
			var result = App.filterJsonData(req);
			expect(result.percent).to.equal("20");
		});

		//Second test legit data
		it("legit data 2", function() {
			var App = new battery();

			var req = {
				battery: {
					tankLevel: {
						type: "Number",
						value: "50"
					},
					batteryLevel: {
						type: "Number",
						value: "100"
					}
				}
			};

			//Shouldn't be any errors
			var result = App.filterJsonData(req);
			expect(result.percent).to.equal("100");
		});
	});
});