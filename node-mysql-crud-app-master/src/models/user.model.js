// FILE: ./src/models/user.model.js

'use strict';

var dbConn = require('./../../config/db.config');

//user object create
var User = function(user){
    this.user_id     = user.user_id;
    this.user_name   = user.user_name;
    this.email       = user.email;
    this.password    = user.password;
    this.rank        = user.rank;
    this.user_score  = user.user_score;
};

// ----------------------------------------------------------------------------
// TABLE:       mtg.Users
// PROCEDURE:   Create
// PURPOSE:     To create a new user for the mtgApp
// HISTORY: 
// 2020-09-07   Malarcher   Initial Implementation.
// -----------------------------------------------------------------------------
// Example call to the REST API:
//
// POST :    http://localhost:5000/api/v1/users
// BODY:
// { 
//    "user_name" : "jsmith",
//    "email" : "jsmith123@aol.com",
//    "password" : "dontTell",
//    "rank" : 1,
//    "user_score" : 2
// }
//
// RETURNS:
// {
//    "error": false,
//    "message": "User added successfully!",
//    "data": [
//        [
//            {
//                "User_ID": 12,
//                "User_Name": "jsmith",
//                "Email": "jsmith123@aol.com",
//                "SignUp_Date": "2020-09-07T17:10:54.000Z",
//                "Rank": 1,
//                "User_Score": 2
//            }
//        ],
//        {
//            "fieldCount": 0,
//            "affectedRows": 0,
//            "insertId": 0,
//            "serverStatus": 2,
//            "warningCount": 0,
//            "message": "",
//            "protocol41": true,
//            "changedRows": 0
//        }
//    ]
// }
//
// ------------------------------------------------------------------------------


User.create = function (newUser, result) {    
    let sql = `CALL User_Create ( ?,?,?,?,? )`;
    console.log("sql: ", sql);
    dbConn.query(sql, 
        [newUser.user_name, newUser.email, newUser.password, newUser.rank, newUser.user_score]
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
// TABLE:       mtg.Users
// PROCEDURE:   Find By ID
// PURPOSE:     To retrieve user information about a particular user identified 
//              by their User_ID number.
// HISTORY: 
// 2020-09-07   Malarcher   Initial Implementation.
// -----------------------------------------------------------------------------
// Example call to the REST API:
//
// GET :    http://localhost:5000/api/v1/users/12
// (no body)
//
// RETURNS:
// [
//     {
//         "User_ID": 12,
//         "User_Name": "jsmith",
//         "Email": "jsmith123@aol.com",
//         "SignUp_Date": "2020-09-07T17:10:54.000Z",
//         "Rank": 1,
//         "User_Score": 2,
//         "Active": {
//             "type": "Buffer",
//             "data": [
//                 1
//             ]
//         },
//         "FailedLoginAttempts": 0
//     }
// ]
//
// ------------------------------------------------------------------------------


User.findById = function (id, result) {
    let sql = "SELECT User_ID, User_Name, Email, SignUp_Date, `Rank`, User_Score, `Active`, FailedLoginAttempts FROM mtg.Users WHERE User_ID = ? ";
    console.log("sql: '", sql, "'");
    console.log("id: '", id, "'");
    
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
// TABLE:       mtg.Users
// PROCEDURE:   Find All
// PURPOSE:     To get a list of all users, sorted by user_id.
// HISTORY: 
// 2020-09-07   Malarcher   Initial Implementation.
// -----------------------------------------------------------------------------
// Example call to the REST API:
//
// GET :    http://localhost:5000/api/v1/users
// (no body)
//
// RETURNS:
//
// [
//     {
//         "User_ID": 10,
//         "User_Name": "TESTUSER_1",
//         "Email": "testuser1@gmail.com",
//         "SignUp_Date": "2020-09-06T19:58:45.000Z",
//         "Rank": 7,
//         "User_Score": 2
//     },
//     {
//         "User_ID": 11,
//         "User_Name": "TESTUSER_2",
//         "Email": "testuser2@gmail.com",
//         "SignUp_Date": "2020-09-06T19:58:45.000Z",
//         "Rank": 9,
//         "User_Score": 8
//     },
//     {
//         "User_ID": 12,
//         "User_Name": "jsmith",
//         "Email": "jsmith123@aol.com",
//         "SignUp_Date": "2020-09-07T17:10:54.000Z",
//         "Rank": 1,
//         "User_Score": 2
//     }
// ]
//
// ------------------------------------------------------------------------------


User.findAll = function (result) {
    let sql = "SELECT User_ID, User_Name, Email, SignUp_Date, `Rank`, User_Score, `Active`, FailedLoginAttempts FROM mtg.Users ORDER BY User_ID";
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


// ----------------------------------------------------------------------------
// TABLE:       mtg.Users
// PROCEDURE:   Update
// PURPOSE:     To update information about a user.
// HISTORY: 
// 2020-09-07   Malarcher   Initial Implementation.
// -----------------------------------------------------------------------------
// Example call to the REST API:
//
// PUT :    http://localhost:5000/api/v1/users/update
// Body:
// { 
//     "user_id" : 12,
//     "user_name" : "George",
//     "email" : "george@aol.com",
//     "rank" : 12,
//     "user_score" : 25
// }
//
// RESPONSE:
// [
//     [
//       RowDataPacket {
//         User_ID: 12,
//         User_Name: 'George',
//         Email: 'george@aol.com',
//         SignUp_Date: 2020-09-07T18:15:03.000Z,
//         Rank: 12,
//         User_Score: 25
//       }
//     ],
//     OkPacket {
//       fieldCount: 0,
//       affectedRows: 0,
//       insertId: 0,
//       serverStatus: 2,
//       warningCount: 0,
//       message: '',
//       protocol41: true,
//       changedRows: 0
//     }
//   ]
  
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


// ----------------------------------------------------------------------------
// TABLE:       mtg.Users
// PROCEDURE:   Activate
// PURPOSE:     To allow a user to log into the mtgApp after being deactivated.
// HISTORY: 
// 2020-09-07   Malarcher   Initial Implementation.
// -----------------------------------------------------------------------------
// Example call to the REST API:
//
// POST :    http://localhost:5000/api/v1/users/activate
// BODY:
// { 
//    "user_id" : 12
// }
//
// RESPONSE:
// {
//    "error": false,
//    "message": "User successfully updated"
// }
//
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
// PROCEDURE:   Deactivate
// PURPOSE:     To disallow a user from logging into the mtgApp.
// HISTORY: 
// 2020-09-07   Malarcher   Initial Implementation.
// -----------------------------------------------------------------------------
// Example call to the REST API:
//
// POST :    http://localhost:5000/api/v1/users/deactivate
// BODY:
// { 
//    "user_id" : 12
// }
//
// RESPONSE:
// {
//    "error": false,
//    "message": "User successfully updated"
// }
//
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
// DELETE :    http://localhost:5000/api/v1/users/12
// (no body)
//
// RESPONSE:
// {
//    "error": false,
//    "message": "User successfully deleted"
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

