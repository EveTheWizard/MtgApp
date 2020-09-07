// FILE: ./src/controllers/user.controller.js

// ----------------------------------------------------------------------------
// TABLE:       mtg.Users
// PURPOSE:     Controllers for REST API
// HISTORY: 
// 2020-09-07   Malarcher   Initial Implementation.
// -----------------------------------------------------------------------------

'use strict';

const User = require('../models/User.model');

exports.findAll = function(request, resultSet) {
  User.findAll(function(error, User) {
    console.log('controller')
    if (error)
    resultSet.send(error);
    console.log('resultSet', User);
    resultSet.send(User);
  });
};


exports.create = function(req, res) {
    const new_User = new User(req.body);

    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        User.create(new_User, function(err, User) {
            if (err)
            res.send(err);
            res.json({error:false,message:"User added successfully!",data:User});
        });
    }
};


exports.findById = function(req, resultSet) {
    User.findById(req.params.id, function(error, User) {
        if (error)
        resultSet.send(error);
        resultSet.json(User);
    });
};


exports.update = function(request, resultSet) {
    console.log("update request header: '",request.header,"'");
    console.log("update request body: '", request.body + "'");
   // console.log("resultSet: '",resultSet,"'");

    if(request.body.constructor === Object && Object.keys(request.body).length === 0){
        resultSet.status(400).send({ error:true, message: 'Please provide all required fields in update' });

    } else {
        User.update(request.params.id, new User(request.body), function(error, User) {
            if (error)
            resultSet.send(error);
            resultSet.json({ error:false, message: 'User successfully updated' });
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
        User.update(request.params.id, new User(request.body), function(error, User) {
            if (error)
            resultSet.send(error);
            resultSet.json({ error:false, message: 'User successfully updated' });
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
        User.activate(request.params.id, new User(request.body), function(error, User) {
            if (error)
            resultSet.send(error);
            resultSet.json({ error:false, message: 'User successfully updated' });
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
        User.deactivate(request.params.id, new User(request.body), function(error, User) {
            if (error)
            resultSet.send(error);
            resultSet.json({ error:false, message: 'User successfully updated' });
        });
    }
  
};


exports.delete = function(request, resultSet) {
  User.delete( request.params.id, function(error, User) {
    if (error)
    resultSet.send(error);
    resultSet.json({ error:false, message: 'User successfully deleted' });
  });
};
