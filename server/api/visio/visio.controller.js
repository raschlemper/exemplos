'use strict';

var _ = require('underscore');
var Visio = require('./visio.model');

/**
 * Get list of visio
 */
exports.index = function(req, res) {
  Visio.find({}, function (err, visio) {
    if(err) return res.send(500, err);
    res.json(200, visio);
  });
};

/**
 * Create Visio
 */
exports.create = function(req, res, next) {
  var newVisio = new Visio(req.body);
  newVisio.save(function(err, visio) {
  	if(err) return res.send(500, err);
    res.json(200, visio);
  });
};
