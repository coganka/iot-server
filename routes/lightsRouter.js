const express = require('express');
const router = express.Router();

const lightsController = require('../controllers/lightsController');

router.get('/', lightsController.getLights);

module.exports = router;