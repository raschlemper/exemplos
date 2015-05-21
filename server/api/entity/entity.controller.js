'use strict';

var Entity = require('./entity.model');

/**
 * Get list of Movimentos
 */
exports.index = function(req, res) {
  Entity.find({}, function (err, entities) {
    if(err) return res.send(500, err);
    res.json(200, entities);
  });
};

/**
 * Create Movimentos
 */
exports.create = function(req, res, next) {
  var newEntity = new Entity(req.body);
  newEntity.save(function(err, entity) {
  	if(err) return res.send(500, err);
    res.json(200, entity);
  });
};
