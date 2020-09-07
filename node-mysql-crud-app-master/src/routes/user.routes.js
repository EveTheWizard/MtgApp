// FILE: ./src/routes/user.routes.js

// ----------------------------------------------------------------------------
// TABLE:       mtg.Users
// PURPOSE:     Routes for REST API
// HISTORY: 
// 2020-09-07   Malarcher   Initial Implementation.
// -----------------------------------------------------------------------------

const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller');

// Routes for Users

//router.post('/', userController.loginWithEmail);
//router.post('/', userController.loginWithUsername);

//router.put('/:id', userController.changePassword);
//router.put('/:id', userController.resetPassword);

router.get('/:id', userController.findById);

router.post('/activate', userController.activate);
router.post('/deactivate', userController.deactivate);

//router.delete('/:id', userController.purgeData);
router.delete('/:id', userController.delete);

router.post('/', userController.create);
router.get('/', userController.findAll);
router.put('/', userController.update);

module.exports = router;