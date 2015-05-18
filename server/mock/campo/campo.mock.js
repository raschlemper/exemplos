/**
 * Populate DB with sample data on Users
 */

'use strict';

var path = require('path');
var fs = require("fs");
var config = require('../../config/environment');
var Campo = require('../../api/campo/campo.model');

function readJsonFileSync(filepath, encoding){
    if (typeof (encoding) == 'undefined') { encoding = 'utf8'; }
    var file = fs.readFileSync(filepath, encoding);
    return JSON.parse(file);
}

function getConfig(file){
    var filepath = path.join(config.root, 'app', 'data', file);
    return readJsonFileSync(filepath);
}

Campo.find({}).remove(function() {
  var jsondata = getConfig('/campos_movimento.json'); 
  Campo.create(jsondata, function() {
      console.log('finished populating users');
  });
});
