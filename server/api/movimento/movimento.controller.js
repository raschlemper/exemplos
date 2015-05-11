'use strict';

var Movimento = require('./movimento.model');

/**
 * Get list of Movimentos
 */
exports.index = function(req, res) {
  Movimento.find({}, function (err, movimentos) {
    if(err) return res.send(500, err);
    res.json(200, movimentos);
  });
};

/**
 * Create Movimentos
 */
exports.create = function(req, res, next) {
  var newMovimento = new Movimento(req.body);
  newMovimento.save(function(err, movimento) {
  	if(err) return res.send(500, err);
    res.json(200, movimento);
  });
};
