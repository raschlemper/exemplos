var express  = require("express");  
var path = require('path');
var fs = require('fs');

var App = function() {
	
	var self = this;
    
    self.setupVariables = function() {
        self.ipAddress  = '127.0.0.1';
        self.port       = '9000';
        self.root       = path.normalize(__dirname + '/..');
    };

    self.cache_get = function(key) { return self.zcache[key]; };
    
    self.populateCache = function() {
        if (typeof self.zcache === "undefined") {
            self.zcache = { 'index.html': '' };
        }
        self.zcache['index.html'] = fs.readFileSync(self.root + '/app/index.html');
    };
    
    self.initializeServer = function() {
    	self.app = express();
        var app = self.app; 
        // app.use(express.json());
        console.log(self.root);
        app.use(express.static(self.root + '/app/')); 
        self.createRoutes();   	
    }
    
    self.createRoutes = function() {
        var app = self.app;
        app.get("/", function(req, res) {
	        res.setHeader('Content-Type', 'text/html');
	        res.send(self.cache_get('index.html'));
        });   
    };
    	
    self.initialize = function() {
        self.setupVariables();
        self.populateCache();
        self.initializeServer();
    };
    
    self.start = function() {
    	self.app.listen(self.port, self.ipAddress, function(err) {
			if(err) { console.log("[Error] Node server might not be running." + err); }
			else { console.log('%s: Node server started on %s:%d ...', Date(Date.now() ), self.ipAddress, self.port); }
        });
    };
}

var App = new App();
App.initialize();
App.start();
