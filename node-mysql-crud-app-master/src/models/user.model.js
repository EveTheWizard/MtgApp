// FILE: ./src/models/user.model.js

'use strict';

var dbConn = require('./../../config/db.config');

//user object create
var User = function(user){
    this.user_id     = user.user_id;
    this.user_name   = user.user_name;
    this.email       = user.email;
    this.rank        = user.rank;
    this.user_score  = user.user_score;
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


User.create = function (newUser, result) {    
    let sql = `CALL User_Create ( ?,?,?,? )`;
    console.log("sql: ", sql);
    dbConn.query(sql, 
        [newUser.user_name, newUser.email, newUser.rank, newUser.user_score]
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
            //console.log(asJson[0][0].User_ID);

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


User.findById = function (id, result) {
    let sql = `Select * from mtg.Users where User_ID = ? `;
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


User.findAll = function (result) {
    let sql = `Select * from mtg.Users`;
    console.log("sql: ", sql);
    dbConn.query(sql, function (error, res) {
        if(error) {
            console.log("error: ", error);
            result(error, null);
        }
        else{
            console.log('users : ', res);  
            result(null, res);
        }
    });   
};

// This is the PUT route to update the user specified by the user_id
// TABLE: Users
// EXAMPLE PUT:  http://localhost:5000/api/v1/users/update
//
// The body contains:
// { 
//    "user_id" : 26,
//    "user_name" : "George",
//    "email" : "george@aol.com",
//    "rank" : 12,
//    "user_score" : 25
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


User.update = function(id, user, result)
{
        let sql = `CALL User_Update ( ?, ?, ?, ?, ? )`;
        console.log("update sql: ", sql);
        console.log("id: '", id, "'");

        console.log("user.user_id:    '", user.user_id, "'");
        console.log("user.user_name:  '", user.user_name, "'");
        console.log("user.email:      '", user.email, "'");
        console.log("user.rank:       '", user.rank, "'");
        console.log("user.user.score: '", user.user_score, "'");
   
        dbConn.query(sql, 
            [user.user_id, user.user_name,user.email,user.rank,user.user_score], 
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



// This is the PUT route to update the user specified by the user_id
// TABLE: Users
// EXAMPLE PUT:  http://localhost:5000/api/v1/users/update
//
// The body contains:
// { 
//    "user_id" : 26,
//    "user_name" : "George",
//    "email" : "george@aol.com",
//    "rank" : 12,
//    "user_score" : 25
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


User.activate = function(id, user, result){
        let sql = `CALL User_Activate ( ? )`;
        console.log("activate sql: ", sql);
        console.log("id: '", id, "'");

        console.log("user.user_id:    '", user.user_id, "'");
   
        dbConn.query(sql, 
            [user.user_id], 
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


User.deactivate = function(id, user, result){
            let sql = `CALL User_Deactivate ( ? )`;
            console.log("deactivate sql: ", sql);
            console.log("id: '", id, "'");
    
            console.log("user.user_id:    '", user.user_id, "'");
       
            dbConn.query(sql, 
                [user.user_id], 
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
    
// TABLE: Users
// EXAMPLE DELETE:  http://localhost:5000/api/v1/users/28
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


User.delete = function(id, result){
    let sql =`CALL User_Delete ( ? )`;
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

module.exports= User;

