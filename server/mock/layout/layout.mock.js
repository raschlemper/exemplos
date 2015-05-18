/**
 * Populate DB with sample data on Users
 */

'use strict';

var path = require('path');
var fs = require("fs");
var config = require('../../config/environment');
var Layout = require('../../api/layout/layout.model');

function readJsonFileSync(filepath, encoding){
    if (typeof (encoding) == 'undefined') { encoding = 'utf8'; }
    var file = fs.readFileSync(filepath, encoding);
    return JSON.parse(file);
}

function getConfig(file){
    var filepath = path.join(config.root, 'app', 'data', file);
    return readJsonFileSync(filepath);
}

Layout.find({}).remove(function() {
  var jsondata = getConfig('/layout.json'); 
  Layout.create(jsondata, function() {
      console.log('finished populating layout');
  });
});
