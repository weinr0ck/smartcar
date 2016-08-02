var expect  = require("chai").expect;
var doors = require("../../app/vehicle/doors");

//Doors Logic tests
describe("Doors Vehicle App", function() {
	describe("filterJsonData", function() {
		//Test exceptions
		it("exceptions", function() {
			var App = new doors();

			expect(() => App.filterJsonData()).to.throw(Error, /Request object does not contain usable/);
			expect(() => App.filterJsonData({})).to.throw(Error, /Request object does not contain usable/);

			//construct an object to throw different execptions
			var req = {
				doors: new Array()
			};

			//doors errors
			expect(() => App.filterJsonData(req)).to.throw(Error, /doors data not found/);

			req.doors[0] = {};
			expect(() => App.filterJsonData(req)).to.throw(Error, /doors location data not found/);
			req.doors[0].location = {};
			expect(() => App.filterJsonData(req)).to.throw(Error, /doors location data not found/);

			req.doors[0].location.value = "frontLeft";
			expect(() => App.filterJsonData(req)).to.throw(Error, /doors locked data not found/);
			req.doors[0].locked = {};
			expect(() => App.filterJsonData(req)).to.throw(Error, /doors locked data not found/);
		});

		//First test legit data
		it("legit data 1", function() {
			var App = new doors();

			var req = {
				doors: [
					{
						location: {
							type: "String",
							value: "frontLeft"
						},
						locked: {
							type: "Boolean",
							value: "False"
						}
					},
					{
						location: {
							type: "String",
							value: "frontRight"
						},
						locked: {
							type: "Boolean",
							value: "True"
						}
					}
				]
			};

			//Shouldn't be any errors
			var result = App.filterJsonData(req);

			expect(result[0].location).to.equal("frontLeft");
			expect(result[0].locked).to.equal("False");
			expect(result[1].location).to.equal("frontRight");
			expect(result[1].locked).to.equal("True");
		});

		//Second test legit data
		it("legit data 2", function() {
			var App = new doors();

			var req = {
				doors: [
					{
						location: {
							type: "String",
							value: "backLeft"
						},
						locked: {
							type: "Boolean",
							value: "True"
						}
					},
					{
						location: {
							type: "String",
							value: "backRight"
						},
						locked: {
							type: "Boolean",
							value: "False"
						}
					}
				]
			};

			//Shouldn't be any errors
			var result = App.filterJsonData(req);

			expect(result[0].location).to.equal("backLeft");
			expect(result[0].locked).to.equal("True");
			expect(result[1].location).to.equal("backRight");
			expect(result[1].locked).to.equal("False");
		});
	});
});