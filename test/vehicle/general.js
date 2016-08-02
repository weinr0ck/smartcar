var expect  = require("chai").expect;
var general = require("../../app/vehicle/general");

describe("General Vehicle App", function() {
	describe("filterJsonData", function() {
		it("exceptions", function() {
			var App = new general();

			expect(() => App.filterJsonData()).to.throw(Error, /Request object does not contain usable/);
			expect(() => App.filterJsonData({})).to.throw(Error, /Request object does not contain usable/);

			//construct an object to throw different execptions
			var req = {
				general: {}
			};

			//Vin errors
			expect(() => App.filterJsonData(req)).to.throw(Error, /Vin data not found/);
			req.general.vin = {};
			expect(() => App.filterJsonData(req)).to.throw(Error, /Vin data not found/);
			req.general.vin.value = 123;

			//Color errors (not in a racist way...)
			expect(() => App.filterJsonData(req)).to.throw(Error, /Color data not found/);
			req.general.color = {};
			expect(() => App.filterJsonData(req)).to.throw(Error, /Color data not found/);
			req.general.color.value = "Something Blue";

			//Doors errors (RIP Jimmy)
			expect(() => App.filterJsonData(req)).to.throw(Error, /doorCount data not found/);
			req.general.fourDoorSedan = {};
			expect(() => App.filterJsonData(req)).to.throw(Error, /doorCount data not found/);
			req.general.fourDoorSedan.value = "True";

			//Drive train
			expect(() => App.filterJsonData(req)).to.throw(Error, /driveTrain data not found/);
			req.general.driveTrain = {};
			expect(() => App.filterJsonData(req)).to.throw(Error, /driveTrain data not found/);
		});

		it("legit data 1", function() {
			var App = new general();

			var req = {
				general: {
					vin: {
						type: "String",
						value: "123123412412"
					},
					color: {
						type: "String",
						value: "Metallic Silver"
					},
					fourDoorSedan: {
						type: "Boolean",
						value: "True"
					},
					twoDoorCoupe: {
						type: "Boolean",
						value: "False"
					},
					driveTrain: {
						type: "String",
						value: "v8"
					}
				}
			};

			//Shouldn't be any errors
			var result = App.filterJsonData(req);
			expect(result.vin).to.equal("123123412412");
			expect(result.color).to.equal("Metallic Silver");
			expect(result.doorCount).to.equal(4);
			expect(result.driveTrain).to.equal("v8");
		});

		it("legit data 2", function() {
			var App = new general();

			var req = {
				general: {
					vin: {
						type: "String",
						value: "987654321876"
					},
					color: {
						type: "String",
						value: "Metallic Blue"
					},
					fourDoorSedan: {
						type: "Boolean",
						value: "False"
					},
					twoDoorCoupe: {
						type: "Boolean",
						value: "True"
					},
					driveTrain: {
						type: "String",
						value: "v6"
					}
				}
			};

			//Shouldn't be any errors
			var result = App.filterJsonData(req);
			expect(result.vin).to.equal("987654321876");
			expect(result.color).to.equal("Metallic Blue");
			expect(result.doorCount).to.equal(2);
			expect(result.driveTrain).to.equal("v6");
		});
	});
});