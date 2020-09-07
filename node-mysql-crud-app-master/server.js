// FILE: ./server.js

// ----------------------------------------------------------------------------
// PURPOSE:     Server.js file for REST API
// HISTORY: 
// 2020-09-07   Malarcher   Initial Implementation.
// -----------------------------------------------------------------------------

const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// Setup server port
const port = process.env.PORT || 5000;

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())


// define a root route
app.get('/', (req, res) => {
  res.send("mtg Card Link Comment App");
});

// Require employee routes
const cardRoutes = require('./src/routes/card.routes')
const commentRoutes = require('./src/routes/comment.routes')
const employeeRoutes = require('./src/routes/employee.routes')
const linkRoutes = require('./src/routes/link.routes')
const userRoutes = require('./src/routes/user.routes')

// using as middleware
app.use('/api/v1/cards', cardRoutes)
app.use('/api/v1/comments', commentRoutes)
app.use('/api/v1/employees', employeeRoutes)
app.use('/api/v1/links', linkRoutes)
app.use('/api/v1/users', userRoutes)


// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});