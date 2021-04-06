const stateController = require('../controllers/state');

const express = require('express');

const router = express();

// GET - returns vehicle list and registration data of a target state
router.get('/registrationData/:stateName', stateController.registrationData);

module.exports = router;