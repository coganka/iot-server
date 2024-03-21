const express = require("express");
const router = express.Router();

const windowsController = require('../controllers/windowsController');

router.get('/', windowsController.getWindows);

module.exports = router;