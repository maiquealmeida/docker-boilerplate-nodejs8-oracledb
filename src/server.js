'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var oracledb = require('oracledb');

var app = express();
app.use(bodyParser.json()); // Use body parser to parse JSON body

var port = 3000 || 4000;
console.log('Iniciando... ');

oracledb.outFormat = oracledb.OBJECT;

// HTTP Method: GET
// URI        : /bananas
// Get all farmers' shipments
app.get('/', function (req, res) {
  doGetConnection(res, function(err, connection) {
    if (err)
      return;  
    connection.execute(
      `SELECT 'HELLO WORLD!' AS RESULT FROM DUAL`,
      function (err, result) {
        if (err) {
          res.set('Content-Type', 'application/json');
          res.status(500).send(JSON.stringify({
            status: 500,
            message: "Error getting the farmer's profile",
            detailed_message: err.message
          }));
        } else {
          res.contentType('application/json').status(200);
          res.send(JSON.stringify(result.rows));
        }
        doRelease(connection, "GET /");
      });
  });
});

// Get a connection from the pool
function doGetConnection(res, cb) {
  oracledb.getConnection(function (err, connection) {
    if (err) {
      res.set('Content-Type', 'application/json');
      res.status(500).send(JSON.stringify({
        status: 500,
        message: "Error getting DB connection",
        detailed_message: err.message
      }));
    } else {
      cb(err, connection);
    }
  });
}

// Release a connection to the pool
function doRelease(connection, message) {
  connection.close(
    function(err) {
      if (err)
        console.error(err);
      else
        console.log(message + " : Connection released");
    });
}

function run() {
    const {
        NODE_ORACLEDB_HOST, 
        NODE_ORACLEDB_PORT, 
        NODE_ORACLEDB_SERVICENAME,
        NODE_ORACLEDB_USER, 
        NODE_ORACLEDB_PASSWORD
    } = process.env 
    const connectString = `(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=${NODE_ORACLEDB_HOST})(PORT=${NODE_ORACLEDB_PORT}))(CONNECT_DATA=(SERVICE_NAME=${NODE_ORACLEDB_SERVICENAME})))`;

console.log(`connectString: ${connectString}`)
  oracledb.createPool({
      user: NODE_ORACLEDB_USER,
      password: NODE_ORACLEDB_PASSWORD,
      connectString
    },
    function(err) {
      if (err)
        console.error("createPool() error: " + err.message);
      else
        var server = app.listen(port,
          function () {
            console.log('Server is listening on port ' + server.address().port);
          });
    });
}


process
  .on('SIGTERM', function() {
    console.log("\nTerminating");
    process.exit(0);
  })
  .on('SIGINT', function() {
    console.log("\nTerminating");
    process.exit(0);
  });

run();