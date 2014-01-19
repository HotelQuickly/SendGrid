// index.js

// Load plugins
var hapiModule = require('hapi');
var mysqlModule = require('mysql');
var requestModule = require('request');

// Load project libraries and configuration
var config = require('./config.js');
var callback = require('./lib/callback.js');
var mysqlTools = require('./lib/mysql-tools.js');
var serverTools = require('./lib/server-tools.js');
var errorCollector = require('./lib/error-collector.js');

// Create a server with a host and port
var server = hapiModule.createServer('localhost', 8000, {debug: false});

// Set up error tracker
errorCollector.setRequestModule(requestModule);
errorCollector.setHostname(server.info.uri);
errorCollector.setTargetUrl(config.errorTracker.url);

// Connect to MySQL
mysqlTools.setErrorCollector(errorCollector);
mysqlConnection = mysqlTools.connectToMysql(mysqlModule, config);

// Set handler params
callback.setErrorCollector(errorCollector);
callback.setMysqlConnection(mysqlConnection);

// Add the routes and their handlers
server.route({
    method: 'POST',
    path: '/callback',
    handler: callback.handlerSaveCallback
});

// Start server
server.start(function () {
    console.log('Server started at: ' + server.info.uri);
});