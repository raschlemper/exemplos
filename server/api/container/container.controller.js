'use strict';

var Container = require('./container.model');

/**
 * Get list of Movimentos
 */
exports.index = function(req, res) {
  Container.find({}, function (err, containers) {
    if(err) return res.send(500, err);
    res.json(200, containers);
  });
};

/**
 * Create Movimentos
 */
exports.create = function(req, res, next) {
  var newContainer = new Container(req.body);
  newContainer.save(function(err, container) {
  	if(err) return res.send(500, err);
    res.json(200, container);
  });
};
