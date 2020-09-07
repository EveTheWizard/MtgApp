// FILE: ./src/controllers/link.controller.js

// ----------------------------------------------------------------------------
// TABLE:       mtg.Links
// PURPOSE:     Controllers for REST API
// HISTORY: 
// 2020-09-07   Malarcher   Initial Implementation.
// -----------------------------------------------------------------------------

'use strict';

const Link = require('../models/Link.model');

exports.findAll = function(request, resultSet) {
  Link.findAll(function(error, Link) {
    console.log('controller')
    if (error)
    resultSet.send(error);
    console.log('resultSet', Link);
    resultSet.send(Link);
  });
};


exports.create = function(req, res) {
    const new_Link = new Link(req.body);

    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required fields for link create' });
    }else{
        Link.create(new_Link, function(err, Link) {
            if (err)
            res.send(err);
            res.json({error:false,message:"Link added successfully!",data:Link});
        });
    }
};


exports.findById = function(req, resultSet) {
    Link.findById(req.params.id, function(error, Link) {
        if (error)
        resultSet.send(error);
        resultSet.json(Link);
    });
};


exports.update = function(request, resultSet) {
    console.log("update request header: '",request.header,"'");
    console.log("update request body: '", request.body + "'");
   // console.log("resultSet: '",resultSet,"'");

    if(request.body.constructor === Object && Object.keys(request.body).length === 0){
        resultSet.status(400).send({ error:true, message: 'Please provide all required fields in update' });

    } else {
        Link.update(request.params.id, new Link(request.body), function(error, Link) {
            if (error)
            resultSet.send(error);
            resultSet.json({ error:false, message: 'Link successfully updated' });
        });
    }
  
};

exports.update2 = function(request, resultSet) {
    console.log("update 2 request header: '",request.header,"'");
    console.log("update 2 request body: '", request.body + "'");
   // console.log("resultSet: '",resultSet,"'");

    if(request.body.constructor === Object && Object.keys(request.body).length === 0){
        resultSet.status(400).send({ error:true, message: 'Please provide all required fields in update 2' });

    } else {
        Link.update(request.params.id, new Link(request.body), function(error, Link) {
            if (error)
            resultSet.send(error);
            resultSet.json({ error:false, message: 'Link successfully updated' });
        });
    }
  
};

exports.activate = function(request, resultSet) {
    console.log("activate request header: '",request.header,"'");
    console.log("activate request body: '", request.body + "'");
   // console.log("resultSet: '",resultSet,"'");

    if(request.body.constructor === Object && Object.keys(request.body).length === 0){
        resultSet.status(400).send({ error:true, message: 'Please provide all required fields in activate' });

    } else {
        LInk.activate(request.params.id, new Linkr(request.body), function(error, Link) {
            if (error)
            resultSet.send(error);
            resultSet.json({ error:false, message: 'Link successfully updated' });
        });
    }
  
};

exports.deactivate = function(request, resultSet) {
    console.log("deactivate request header: '",request.header,"'");
    console.log("deactivate request body: '", request.body + "'");
   // console.log("resultSet: '",resultSet,"'");

    if(request.body.constructor === Object && Object.keys(request.body).length === 0){
        resultSet.status(400).send({ error:true, message: 'Please provide all required fields in deactivate' });

    } else {
        Link.deactivate(request.params.id, new Link(request.body), function(error, Link) {
            if (error)
            resultSet.send(error);
            resultSet.json({ error:false, message: 'Link successfully updated' });
        });
    }
  
};


exports.delete = function(request, resultSet) {
  Link.delete( request.params.id, function(error, Link) {
    if (error)
    resultSet.send(error);
    resultSet.json({ error:false, message: 'Link successfully deleted' });
  });
};
