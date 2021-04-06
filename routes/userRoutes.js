const userController = require('../controllers/user');
const {checkAuth} = require('../middleware/checkAuth');
const express = require('express');

const router = express.Router();

// GET - login
router.get('/login', userController.getLogin);

// POST - login
router.post('/login', userController.postLogin);

// POST - to create a record of a user in DB
router.post('/create', userController.createUser);

// PUT - to update record of a user having paticular ID in DB
router.put('/update/:id', userController.updateUser);

// DELETE - to delete of a user having particular ID from DB
router.delete('/delete/:id', userController.deleteUser);

// GET - returns vehicle list and registration data of a target user
router.get('/registrationData/:id', userController.registrationData);

// GET - returns a List of user-data with registed vehicles and state
router.get('/userData', userController.userData);

// GET - returns a list of my vehicles
router.get('/dashboard', checkAuth, userController.dashboard);

// GET - logout
router.get('/logout', checkAuth, userController.logout);

module.exports = router;