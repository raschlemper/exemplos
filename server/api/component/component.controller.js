'use strict';

var Component = require('./component.model');

/**
 * Get list of Movimentos
 */
exports.index = function(req, res) {
  component.find({}, function (err, campos) {
    if(err) return res.send(500, err);
    res.json(200, campos);
  });
};

/**
 * Create Movimentos
 */
exports.create = function(req, res, next) {
  var newComponent = new Component(req.body);
  newComponent.save(function(err, component) {
  	if(err) return res.send(500, err);
    res.json(200, campo);
  });
};
