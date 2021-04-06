const vehicleController = require('../controllers/vehicle');

const express = require('express');

const router = express.Router();

// POST - to create a record of a vehicle in DB
router.post('/create', vehicleController.createVehicle);

// PUT - to update the record of a vehicle having paticular ID in DB
router.put('/update/:id', vehicleController.updateVehicle);

// DELETE - to delete the record of a vehicle having particular ID from DB
router.delete('/delete/:id', vehicleController.deleteVehicle);

module.exports = router;