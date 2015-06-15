/**
 * Main application file
 */

'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var http = require('http');
var config = require('./config/environment');

// Setup server
var app = express();
var server = http.createServer(app);
require('./config/mongodb');
require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %s:%d, in %s mode', process.env.IP_ADDRESS, process.env.PORT_ADDRESS, app.get('env'));
});

// Expose app
exports = module.exports = app;
