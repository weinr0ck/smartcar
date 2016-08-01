//start for the router
var express = require('express');
var router = express.Router();
var General = require('../handler/vehicle/general.js');
var Doors = require('../handler/vehicle/doors.js');
var Fuel = require('../handler/vehicle/fuel.js');
var Battery = require('../handler/vehicle/battery.js');
var Engine = require('../handler/vehicle/engine.js');

// establish the handlers
var GeneralHandler = new General();
var DoorsHandler = new Doors();
var FuelHandler = new Fuel();
var BatteryHandler = new Battery();
var EngineHandler = new Engine();

// vehicles endpoints
router.get('/:id', GeneralHandler.gmGet, GeneralHandler.filterGet);
router.get('/:id/doors', DoorsHandler.gmGet, DoorsHandler.filterGet);
router.get('/:id/fuel', FuelHandler.gmGet, FuelHandler.filterGet);
router.get('/:id/battery', BatteryHandler.gmGet, BatteryHandler.filterGet);
router.post('/:id/engine', EngineHandler.gmGet, EngineHandler.filterGet);

module.exports = router;
