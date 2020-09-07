// FILE: ./src/controllers/card.controller.js

// ----------------------------------------------------------------------------
// TABLE:       mtg.Cards
// PURPOSE:     Controllers for REST API
// HISTORY: 
// 2020-09-07   Malarcher   Initial Implementation.
// -----------------------------------------------------------------------------

'use strict';

const Card = require('../models/Card.model');

exports.findAll = function(request, resultSet) {
    Card.findAll(function(error, Card) {
        console.log('card controller findAll');
    
        if (error)
            resultSet.send(error);

        console.log('resultSet', Card);
        resultSet.send(Card);
    });
};

exports.findById = function(req, resultSet) {
    Card.findById(req.params.id, function(error, Card) {
        console.log("card controller findById: '", req.params.id, "'");
        if (error)
        resultSet.send(error);

        console.log('resultSet', Card);
        resultSet.json(Card);
    });
};

