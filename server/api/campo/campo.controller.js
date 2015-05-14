'use strict';

var Campo = require('./campo.model');

/**
 * Get list of Movimentos
 */
exports.index = function(req, res) {
  Campo.find({}, function (err, campos) {
    if(err) return res.send(500, err);
    res.json(200, campos);
  });
};

/**
 * Create Movimentos
 */
exports.create = function(req, res, next) {
  var newCampo = new Campo(req.body);
  newCampo.save(function(err, movimentocampo) {
  	if(err) return res.send(500, err);
    res.json(200, campo);
  });
};
