const vehicleRegistrationController = require('../controllers/vehicleRegistration');

const express = require('express');

const router = express.Router();

// POST - to create a record of a vehicle registration in DB
router.post('/create', vehicleRegistrationController.registerVehicle);

// PUT - to update the record of a vehicle registration having paticular ID in DB
router.put('/update/:id', vehicleRegistrationController.updateVehicleRegistration);

// DELETE - to delete the record of a vehicle registration having particular ID from DB
router.delete('/delete/:id', vehicleRegistrationController.deleteVehicleRegistration);

module.exports = router;