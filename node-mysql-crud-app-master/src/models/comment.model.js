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
// TABLE:       mtg.Comments
// PROCEDURE:   Create
// PURPOSE:     To create a comment about a link between cards
// HISTORY: 
// 2020-09-07   Malarcher   Initial Implementation.
// -----------------------------------------------------------------------------
// Example call to the REST API:
//
// POST :    http://localhost:5000/api/v1/comments
// Body:
// { 
//     "link_id" : 8,
//     "user_id" : 10,
//     "score" : 9, 
//     "comment_text" : "I really like it." 
// }
//
// RESPONSE:
// {
//     "error": false,
//     "message": "Comment added successfully!",
//     "data": [
//         [
//             {
//                 "rowsAffected": 0
//             }
//         ],
//         [
//             {
//                 "Comment_ID": 3,
//                 "Link_ID": 8,
//                 "User_ID": 10,
//                 "Score": 9,
//                 "Comment": "I really like it."
//             }
//         ],
//         {
//             "fieldCount": 0,
//             "affectedRows": 0,
//             "insertId": 0,
//             "serverStatus": 34,
//             "warningCount": 0,
//             "message": "",
//             "protocol41": true,
//             "changedRows": 0
//         }
//     ]
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
// TABLE:       mtg.Comments
// PROCEDURE:   FindByCommentID
// PURPOSE:     To get a list of comments by Comment ID
// HISTORY: 
// 2020-09-07   Malarcher   Initial Implementation.
// -----------------------------------------------------------------------------
// Example call to the REST API:
//
// GET :    http://localhost:5000/api/v1/comments/findByCommentID/4
// (no body)
//
// RESPONSE:
//
// [
//     {
//         "Comment_ID": 4,
//         "Link_ID": 8,
//         "User_ID": 11,
//         "Score": 9,
//         "Comment": "I do not like it."
//     }
// ]
//
// ------------------------------------------------------------------------------


Comment.findByCommentId = function (id, result) {
    let sql = "SELECT Comment_ID, Link_ID, User_ID, Score, Comment FROM mtg.Comments WHERE Comment_ID = ? ORDER BY Score DESC";
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
// TABLE:       mtg.Comments
// PROCEDURE:   FindByLinkID
// PURPOSE:     To get a list of comments by Link ID
// HISTORY: 
// 2020-09-07   Malarcher   Initial Implementation.
// -----------------------------------------------------------------------------
// Example call to the REST API:
//
// GET :    http://localhost:5000/api/v1/comments/findByLinkID/8
// (no body)
//
// RESPONSE:
//
// [
//     {
//         "Comment_ID": 2,
//         "Link_ID": 8,
//         "User_ID": 10,
//         "Score": 9,
//         "Comment": "I really like it."
//     },
//     {
//         "Comment_ID": 3,
//         "Link_ID": 8,
//         "User_ID": 10,
//         "Score": 9,
//         "Comment": "I really like it."
//     },
//     {
//         "Comment_ID": 4,
//         "Link_ID": 8,
//         "User_ID": 11,
//         "Score": 9,
//         "Comment": "I do not like it."
//     }
// ]
// ------------------------------------------------------------------------------


Comment.findByLinkId = function (id, result) {
    let sql = "SELECT Comment_ID, Link_ID, User_ID, Score, Comment FROM mtg.Comments WHERE Link_ID = ? ORDER BY Score DESC";
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
// TABLE:       mtg.Comments
// PROCEDURE:   FindByUserID
// PURPOSE:     To get a list of comments by User ID
// HISTORY: 
// 2020-09-07   Malarcher   Initial Implementation.
// -----------------------------------------------------------------------------
// Example call to the REST API:
//
// GET :    http://localhost:5000/api/v1/comments/findByUserID/11
// (no body)
//
// RESPONSE:
//
// [
//     {
//         "Comment_ID": 4,
//         "Link_ID": 8,
//         "User_ID": 11,
//         "Score": 9,
//         "Comment": "I do not like it."
//     }
// ]
//
// ------------------------------------------------------------------------------

Comment.findByUserId = function (id, result) {
    let sql = "SELECT Comment_ID, Link_ID, User_ID, Score, Comment FROM mtg.Comments WHERE User_ID = ? ORDER BY Score DESC";
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
// TABLE:       mtg.Comments
// PROCEDURE:   Get All Comments
// PURPOSE:     To a list of all comments
// HISTORY: 
// 2020-09-07   Malarcher   Initial Implementation.
// -----------------------------------------------------------------------------
// Example call to the REST API:
//
// GET :    http://localhost:5000/api/v1/comments
// (no body)
//
// RESPONSE:
// [
//     {
//         "Comment_ID": 1,
//         "Link_ID": 6,
//         "User_ID": 10,
//         "Score": 9,
//         "Comment": "I really like it."
//     },
//     {
//         "Comment_ID": 2,
//         "Link_ID": 8,
//         "User_ID": 10,
//         "Score": 9,
//         "Comment": "I really like it."
//     },
//     {
//         "Comment_ID": 3,
//         "Link_ID": 8,
//         "User_ID": 10,
//         "Score": 9,
//         "Comment": "I really like it."
//     },
//     {
//         "Comment_ID": 4,
//         "Link_ID": 8,
//         "User_ID": 11,
//         "Score": 9,
//         "Comment": "I do not like it."
//     }
// ]
// ------------------------------------------------------------------------------


Comment.findAll = function (result) {
    let sql = "SELECT Comment_ID, Link_ID, User_ID, Score, Comment FROM mtg.Comments ORDER BY Score DESC";
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
// DELETE :    http://localhost:5000/api/v1/comments/1
// (no body)
//
// RESPONSE:
// {
//     "error": false,
//     "message": "Comment successfully deleted"
// }
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
