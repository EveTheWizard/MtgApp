// FILE: ./src/models/link.model.js

'use strict';

var dbConn = require('./../../config/db.config');

//link object create
var Link = function(link){
    this.link_id         = link.link_id;
    this.link_name       = link.link_name;
    this.card_1           = link.card_1;
    this.card_2           = link.card_2;
    this.score      = link.score;
    this.creator_id = link.creator_id;
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
//{ 
//     "card_1" : "38513fa0-ea83-5642-8ecd-4f0b3daa6768",
//     "card_2" : "b8a68840-4044-52c0-a14e-0a1c630ba42c",
//     "score" : 23,
//     "creator_id" : 14
// }
//
// RESPONSE:
// {
//     "error": false,
//     "message": "Link added successfully!",
//     "data": [
//         [
//             {
//                 "Link_ID": 3,
//                 "Link_Name": "[Abundance]|[Academy Researchers]",
//                 "Card_1": "38513fa0-ea83-5642-8ecd-4f0b3daa6768",
//                 "Card_2": "b8a68840-4044-52c0-a14e-0a1c630ba42c",
//                 "User_Score": 23,
//                 "Creator_Score": 23,
//                 "Creator_User_ID": 14,
//                 "Avg_Comment_Score": 0,
//                 "Number_of_Comments": 0
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
// ERROR REPSONSE EXAMPLE: (note the error number -1502 in the returned Link_ID)
// {
//     "error": false,
//     "message": "Link added successfully!",
//     "data": [
//         [
//             {
//                 "Link_ID": -1502,
//                 "Link_Name": "",
//                 "Card_1": "",
//                 "Card_2": "",
//                 "User_Score": 0,
//                 "Creator_Score": 0,
//                 "Creator_User_ID": 0,
//                 "Avg_Comment_Score": 0,
//                 "Number_of_Comments": 0
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
// ------------------------------------------------------------------------------

Link.create = function (newLink, result) {    
    let sql = `CALL Link_Create ( ?,?,?,? )`;
    console.log("sql: ", sql);
    console.log("link.card_1:           '",newLink.card_1,"'");
    console.log("link.card_2:           '",newLink.card_2,"'");
    console.log("link.score:      '",newLink.score,"'");
    console.log("link.creator_id: '",newLink.creator_id,"'");

    dbConn.query(sql, 
        [newLink.card_1, newLink.card_2, newLink.score, newLink.creator_id]
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
            //console.log(asJson[0][0].Link_ID);

            result(null, res);
        }
    });           
};

// ----------------------------------------------------------------------------
// TABLE:       mtg.Links
// PROCEDURE:   Find By ID
// PURPOSE:     To create a Link between two cards by a user for commentary
// HISTORY: 
// 2020-09-07   Malarcher   Initial Implementation.
// -----------------------------------------------------------------------------
// Example call to the REST API:
//
// GET :    http://localhost:5000/api/v1/links/3
// (no body)
//
// RESPONSE:
// [
//     {
//         "Link_ID": 3,
//         "Link_Name": "[Abundance]|[Academy Researchers]",
//         "Card_1": "38513fa0-ea83-5642-8ecd-4f0b3daa6768",
//         "Card_2": "b8a68840-4044-52c0-a14e-0a1c630ba42c",
//         "User_Score": 23,
//         "Creator_Score": 23,
//         "Creator_User_ID": 14,
//         "Avg_Comment_Score": 0,
//         "Number_of_Comments": 0,
//         "CreatedBy": "root@localhost",
//         "CreatedDate": "2020-09-07T18:49:14.000Z",
//         "ModifiedBy": "root@localhost",
//         "ModifiedDate": "2020-09-07T18:49:14.000Z"
//     }
// ]
//
// ------------------------------------------------------------------------------


Link.findById = function (id, result) {
    let sql = `Select * from mtg.Links where Link_id = ? `;
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


// Link.findByName = function (name, result) {
//     let sql = `Select * from mtg.Links where Link_Name = ? `;
//     console.log("sql: ", sql);
//     dbConn.query(sql, name, function (error, res) {             
//         if(error) {
//             console.log("error: ", error);
//             result(error, null);
//         }
//         else{
//             result(null, res);
//         }
//     });   
// };

// ----------------------------------------------------------------------------
// TABLE:       mtg.Links
// PROCEDURE:   Find All
// PURPOSE:     To get all opf the Links
// HISTORY: 
// 2020-09-07   Malarcher   Initial Implementation.
// -----------------------------------------------------------------------------
// Example call to the REST API:
//
// GET :    http://localhost:5000/api/v1/links
// (no body)
//
// RESPONSE:
// [
//     {
//         "Link_ID": 3,
//         "Link_Name": "[Abundance]|[Academy Researchers]",
//         "Card_1": "38513fa0-ea83-5642-8ecd-4f0b3daa6768",
//         "Card_2": "b8a68840-4044-52c0-a14e-0a1c630ba42c",
//         "User_Score": 23,
//         "Creator_Score": 23,
//         "Creator_User_ID": 14,
//         "Avg_Comment_Score": 0,
//         "Number_of_Comments": 0,
//         "CreatedBy": "root@localhost",
//         "CreatedDate": "2020-09-07T18:49:14.000Z",
//         "ModifiedBy": "root@localhost",
//         "ModifiedDate": "2020-09-07T18:49:14.000Z"
//     },
//     {
//         "Link_ID": 4,
//         "Link_Name": "[***NULL***]|[***NULL***]",
//         "Card_1": "5e77de09-7521-54b6-b516-b7ed7740f7fe",
//         "Card_2": "2d44a443-9c52-5614-ba7c-9757c877e827",
//         "User_Score": 9,
//         "Creator_Score": 9,
//         "Creator_User_ID": 14,
//         "Avg_Comment_Score": 0,
//         "Number_of_Comments": 0,
//         "CreatedBy": "root@localhost",
//         "CreatedDate": "2020-09-07T18:54:09.000Z",
//         "ModifiedBy": "root@localhost",
//         "ModifiedDate": "2020-09-07T18:54:09.000Z"
//     },
//     {
//         "Link_ID": 5,
//         "Link_Name": "[A Good Thing]|[A Reckoning Approaches]",
//         "Card_1": "edcf06a7-ca90-54f3-b2f0-ae8a82ea3f31",
//         "Card_2": "89a846cc-0dc1-5d13-9f58-36a624ddd87e",
//         "User_Score": 9,
//         "Creator_Score": 9,
//         "Creator_User_ID": 14,
//         "Avg_Comment_Score": 0,
//         "Number_of_Comments": 0,
//         "CreatedBy": "root@localhost",
//         "CreatedDate": "2020-09-07T18:58:11.000Z",
//         "ModifiedBy": "root@localhost",
//         "ModifiedDate": "2020-09-07T18:58:11.000Z"
//     }
// ]
// ------------------------------------------------------------------------------


Link.findAll = function (result) {
    let sql = `Select * from mtg.Links`;
    console.log("sql: ", sql);
    dbConn.query(sql, function (error, res) {
        if(error) {
            console.log("error: ", error);
            result(error, null);
        }
        else{
            console.log('links : ', res);  
            result(null, res);
        }
    });   
};

// TABLE: Links
// EXAMPLE DELETE:  http://localhost:5000/api/v1/links/28
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
// DELETE :    http://localhost:5000/api/v1/links
// (no body)
//
// RESPONSE:
// {
//     "error": false,
//     "message": "Link successfully deleted"
// }
//
// ------------------------------------------------------------------------------


Link.delete = function(id, result)
{
    let sql =`CALL Link_Delete ( ? )`;
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

module.exports= Link;
