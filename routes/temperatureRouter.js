const express = require("express");
const router = express.Router();

const temperatureController = require('../controllers/temperatureController');

router.get('/', temperatureController.getTemperature);

module.exports = router;