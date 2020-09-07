// FILE: ./src/routes/card.routes.js

// ----------------------------------------------------------------------------
// TABLE:       mtg.Cards
// PURPOSE:     Routes for REST API
// HISTORY: 
// 2020-09-07   Malarcher   Initial Implementation.
// -----------------------------------------------------------------------------

const express = require('express')
const router = express.Router()
const cardController = require('../controllers/card.controller');

// Routes for Cards

//router.get('/ByName', cardController.findByName);
router.get('/:id', cardController.findByUuid);
router.get('/', cardController.findAll);

module.exports = router;