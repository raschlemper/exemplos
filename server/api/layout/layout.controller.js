'use strict';

var Layout = require('./layout.model');

/**
 * Get list of Movimentos
 */
exports.index = function(req, res) {
  Layout.find({}, function (err, layouts) {
    if(err) return res.send(500, err);
    res.json(200, layouts);
  });
};


exports.getById = function(req, res) { 
	console.log(req.params.id);
  Layout.find({_id: req.params.id}, function (err, layouts) {
    if(err) return res.send(500, err);
    res.json(200, layouts);
  });
};


/**
 * Create Movimentos
 */
exports.create = function(req, res, next) {
  var newLayout = new Layout(req.body);
  newLayout.save(function(err, layout) {
  	if(err) return res.send(500, err);
    res.json(200, layout);
  });
};
