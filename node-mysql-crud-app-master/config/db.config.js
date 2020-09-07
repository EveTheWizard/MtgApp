// FILE: ./config/db.config.js

// ----------------------------------------------------------------------------
// PURPOSE:     Database connection configuration file for REST API
// HISTORY: 
// 2020-09-07   Malarcher   Initial Implementation.
// -----------------------------------------------------------------------------

'use strict';

const mysql = require('mysql');

//local mysql db connection
const dbConn = mysql.createConnection({
  host     : '192.168.1.68',
  user     : 'mtgAdmin',
  password : 'Godzilla2020!',
  database : 'mtg'
});
dbConn.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});
module.exports = dbConn;