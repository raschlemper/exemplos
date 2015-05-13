'use strict';

var _ = require('underscore');
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

/**
 * Get list Movimentos by Header
 */
exports.getHeader = function(req, res, next) {
  var fields = req.body.fields;
  var group = getHeaderGroup(fields);
  Movimento.aggregate([
    { $group: { _id: group } }
  ], function (err, headers) {
      if(err) return res.send(500, err);
      res.json(200, _.map(headers, function(value, key){ return value._id; }));
  });
};

var getHeaderSelect = function(fields) {
    var select = '';
    for(var i=0; i<fields.length; i++) {
        var field = fields[i];
        select += field + ', ';
    }
    return select;
};

var getHeaderGroup = function(fields) {
  return fields.reduce(function(obj, k) {
    obj[k] = '$' + k;
    return obj;
  }, {})
};
