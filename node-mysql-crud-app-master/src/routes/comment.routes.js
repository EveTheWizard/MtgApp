// FILE: ./src/routes/comment.routes.js

// ----------------------------------------------------------------------------
// TABLE:       mtg.Comments
// PURPOSE:     Routes for REST API
// HISTORY: 
// 2020-09-07   Malarcher   Initial Implementation.
// -----------------------------------------------------------------------------

const express = require('express')
const router = express.Router()
const commentController = require('../controllers/comment.controller');

// Routes for Comments

router.get('/findByCommentId/:id', commentController.findByCommentId);
router.get('/findByLinkId/:id', commentController.findByLinkId);
router.get('/findByUserId/:id', commentController.findByUserId);


router.delete('/:id', commentController.delete);

router.post('/', commentController.create);
router.get('/', commentController.findAll);
router.put('/', commentController.update);

module.exports = router;