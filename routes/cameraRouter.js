const express = require("express");
const router = express.Router();

const cameraController = require('../controllers/cameraController');

router.get('/', cameraController.getCamera);

module.exports = router;