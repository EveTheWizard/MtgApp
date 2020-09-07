// FILE: ./src/controllers/comment.controller.js

// ----------------------------------------------------------------------------
// TABLE:       mtg.Comments
// PURPOSE:     Controllers for REST API
// HISTORY: 
// 2020-09-07   Malarcher   Initial Implementation.
// -----------------------------------------------------------------------------

'use strict';

const Comment = require('../models/Comment.model');

exports.findAll = function(request, resultSet) {
  Comment.findAll(function(error, Comment) {
    console.log('controller')
    if (error)
    resultSet.send(error);
    console.log('resultSet', Comment);
    resultSet.send(Comment);
  });
};


exports.create = function(req, res) {
    const new_Comment = new Comment(req.body);

    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Comment.create(new_Comment, function(err, Comment) {
            if (err)
            res.send(err);
            res.json({error:false,message:"Comment added successfully!",data:Comment});
        });
    }
};


exports.findByCommentId = function(req, resultSet) {
    Comment.findByCommentId(req.params.id, function(error, Comment) {
        if (error)
        resultSet.send(error);
        resultSet.json(Comment);
    });
};

exports.findByLinkId = function(req, resultSet) {
    Comment.findByLinkId(req.params.id, function(error, Comment) {
        if (error)
        resultSet.send(error);
        resultSet.json(Comment);
    });
};
exports.findByUserId = function(req, resultSet) {
    Comment.findByUserId(req.params.id, function(error, Comment) {
        if (error)
        resultSet.send(error);
        resultSet.json(Comment);
    });
};
exports.update = function(request, resultSet) {
    console.log("update request header: '",request.header,"'");
    console.log("update request body: '", request.body + "'");
   // console.log("resultSet: '",resultSet,"'");

    if(request.body.constructor === Object && Object.keys(request.body).length === 0){
        resultSet.status(400).send({ error:true, message: 'Please provide all required fields in update' });

    } else {
        Comment.update(request.params.id, new Comment(request.body), function(error, Comment) {
            if (error)
            resultSet.send(error);
            resultSet.json({ error:false, message: 'Comment successfully updated' });
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
        Comment.update(request.params.id, new Comment(request.body), function(error, Comment) {
            if (error)
            resultSet.send(error);
            resultSet.json({ error:false, message: 'Comment successfully updated' });
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
        Comment.activate(request.params.id, new Comment(request.body), function(error, Comment) {
            if (error)
            resultSet.send(error);
            resultSet.json({ error:false, message: 'Comment successfully updated' });
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
        Comment.deactivate(request.params.id, new Comment(request.body), function(error, Comment) {
            if (error)
            resultSet.send(error);
            resultSet.json({ error:false, message: 'Comment successfully updated' });
        });
    }
  
};


exports.delete = function(request, resultSet) {
  Comment.delete( request.params.id, function(error, Comment) {
    if (error)
    resultSet.send(error);
    resultSet.json({ error:false, message: 'Comment successfully deleted' });
  });
};
