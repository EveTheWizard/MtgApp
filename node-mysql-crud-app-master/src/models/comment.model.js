// FILE: ./src/models/comment.model.js


'use strict';
var dbConn = require('./../../config/db.config');

//comment object create
var Comment = function(comment){
    this.comment_id     = comment.comment_id;
    this.link_id   = comment.link_id;
    this.user_id     = comment.user_id;
    this.score     = comment.score;
    this.comment_text  = comment.comment_text;
};

// ----------------------------------------------------------------------------
// TABLE:       mtg.Links
// PROCEDURE:   Create
// PURPOSE:     To create a Link between two cards by a user for commentary
// HISTORY: 
// 2020-09-07   Malarcher   Initial Implementation.
// -----------------------------------------------------------------------------
// Example call to the REST API:
//
// URL :    http://localhost:5000/api/v1/links
// Body:
// { 
//    "card_1" : "38513fa0-ea83-5642-8ecd-4f0b3daa6768",
//    "card_2" : "b8a68840-4044-52c0-a14e-0a1c630ba42c",
//    "score" : 23,
//    "creator_id" : 10
// }
//
// ------------------------------------------------------------------------------


Comment.create = function (newComment, result) {    
    let sql = `CALL Comment_Create ( ?,?,?,? )`;
    console.log("sql: ", sql);
    dbConn.query(sql, 
        [newComment.link_id, newComment.user_id, newComment.score, newComment.comment_text]
    , function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log("res:", res);

            //console.log("---=1=---");
            //var asString = JSON.stringify(res);
            //console.log(asString);
            //var asJson = JSON.parse(asString);
            //console.log(asJson);
            //console.log("---=2=---");
            //console.log(asJson[0]);
            //console.log("---=3=---");
            //console.log(asJson[0][0].Comment_ID);

            result(null, res);
        }
    });           
};

// ----------------------------------------------------------------------------
// TABLE:       mtg.Links
// PROCEDURE:   Create
// PURPOSE:     To create a Link between two cards by a user for commentary
// HISTORY: 
// 2020-09-07   Malarcher   Initial Implementation.
// -----------------------------------------------------------------------------
// Example call to the REST API:
//
// URL :    http://localhost:5000/api/v1/links
// Body:
// { 
//    "card_1" : "38513fa0-ea83-5642-8ecd-4f0b3daa6768",
//    "card_2" : "b8a68840-4044-52c0-a14e-0a1c630ba42c",
//    "score" : 23,
//    "creator_id" : 10
// }
//
// ------------------------------------------------------------------------------


Comment.findById = function (id, result) {
    let sql = `SELECT Comment_ID, Link_ID, User_ID, Score, Comment_Text FROM mtg.Comments WHERE Comment_ID = ? ORDER BY Score DESC`;
    console.log("sql: ", sql);
    dbConn.query(sql, id, function (error, res) {             
        if(error) {
            console.log("error: ", error);
            result(error, null);
        }
        else{
            result(null, res);
        }
    });   
};

// ----------------------------------------------------------------------------
// TABLE:       mtg.Links
// PROCEDURE:   Create
// PURPOSE:     To create a Link between two cards by a user for commentary
// HISTORY: 
// 2020-09-07   Malarcher   Initial Implementation.
// -----------------------------------------------------------------------------
// Example call to the REST API:
//
// URL :    http://localhost:5000/api/v1/links
// Body:
// { 
//    "card_1" : "38513fa0-ea83-5642-8ecd-4f0b3daa6768",
//    "card_2" : "b8a68840-4044-52c0-a14e-0a1c630ba42c",
//    "score" : 23,
//    "creator_id" : 10
// }
//
// ------------------------------------------------------------------------------


Comment.findAll = function (result) {
    let sql = `SELECT Comment_ID, Link_ID, User_ID, Score, Comment_Text FROM mtg.Comments ORDER BY Score DESC`;
    console.log("sql: ", sql);
    dbConn.query(sql, function (error, res) {
        if(error) {
            console.log("error: ", error);
            result(error, null);
        }
        else{
            console.log('comments : ', res);  
            result(null, res);
        }
    });   
};

// This is the PUT route to update the comment specified by the comment_id
// TABLE: Comments
// EXAMPLE PUT:  http://localhost:5000/api/v1/comments/update
//
// The body contains:
// { 
//    "comment_id" : 26,
//    "comment_name" : "George",
//    "email" : "george@aol.com",
//    "rank" : 12,
//    "comment_score" : 25
// }
//
// ----------------------------------------------------------------------------
// TABLE:       mtg.Links
// PROCEDURE:   Create
// PURPOSE:     To create a Link between two cards by a user for commentary
// HISTORY: 
// 2020-09-07   Malarcher   Initial Implementation.
// -----------------------------------------------------------------------------
// Example call to the REST API:
//
// URL :    http://localhost:5000/api/v1/links
// Body:
// { 
//    "card_1" : "38513fa0-ea83-5642-8ecd-4f0b3daa6768",
//    "card_2" : "b8a68840-4044-52c0-a14e-0a1c630ba42c",
//    "score" : 23,
//    "creator_id" : 10
// }
//
// ------------------------------------------------------------------------------


Comment.update = function(id, comment, result){
 
        let sql = `CALL Comment_Update ( ?, ?, ?, ?, ? )`;
        console.log("update sql: ", sql);
        console.log("id: '", id, "'");
        
        // Not allowed to change the Link_ID or the User_ID; these are fixed at comment creation time.
        console.log("comment.comment_id:   '", comment.comment_id, "'");
        console.log("comment.score:        '", comment.score, "'");
        console.log("comment.comment_text: '", comment.comment_text, "'");
   
        dbConn.query(sql, 
            [comment.comment_id, comment.score,comment.comment_text], 
            function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }else{   
                    console.log("res: ", res);
                    result(null, res);
                }
        }); 

};
    
// TABLE: Comments
// EXAMPLE DELETE:  http://localhost:5000/api/v1/comments/28
// where 28 will be passed as the id ion the function below.
// ----------------------------------------------------------------------------
// TABLE:       mtg.Links
// PROCEDURE:   Create
// PURPOSE:     To create a Link between two cards by a user for commentary
// HISTORY: 
// 2020-09-07   Malarcher   Initial Implementation.
// -----------------------------------------------------------------------------
// Example call to the REST API:
//
// URL :    http://localhost:5000/api/v1/links
// Body:
// { 
//    "card_1" : "38513fa0-ea83-5642-8ecd-4f0b3daa6768",
//    "card_2" : "b8a68840-4044-52c0-a14e-0a1c630ba42c",
//    "score" : 23,
//    "creator_id" : 10
// }
//
// ------------------------------------------------------------------------------


Comment.delete = function(id, result){
    let sql =`CALL Comment_Delete ( ? )`;
    console.log("sql: ", sql);
    console.log("id: ", id);

     dbConn.query(sql, [id], function (error, res) {
        if(error) {
            console.log("error: ", error);
            result(null, error);
        }
        else{
            result(null, res);
        }
    }); 
};

module.exports= Comment;
