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
 * Get Visio by hashid
 */
exports.findByHashid = function(req, res) { 
  Visio.find({hashid:req.params.hashid}, function (err, visio) {
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


exports.update = function(req, res, next) {
  Visio.findByIdAndUpdate(req.body._id, req.body, function(err, visio) {
    if(err) return res.send(500, err);
    res.json(200, visio);
  });
};

/**
 * Remove Visio
 */
exports.remove = function(req, res, next) {
  var newVisio = new Visio(req.body);
  newVisio.remove(function(err, visio) {
  	if(err) return res.send(500, err);
    res.json(200, visio);
  });
};
