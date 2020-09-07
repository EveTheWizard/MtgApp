// FILE: ./src/routes/link.routes.js

// ----------------------------------------------------------------------------
// TABLE:       mtg.Links
// PURPOSE:     Routes for REST API
// HISTORY: 
// 2020-09-07   Malarcher   Initial Implementation.
// -----------------------------------------------------------------------------

const express = require('express')
const router = express.Router()
const linkController = require('../controllers/link.controller');

// Routes for Links

router.get('/:id', linkController.findById);
//router.get('/:name', linkController.findByName);

router.delete('/:id', linkController.delete);


router.post('/', linkController.create);
router.get('/', linkController.findAll);

module.exports = router;