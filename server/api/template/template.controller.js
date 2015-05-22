'use strict';

var Template = require('./template.model');

/**
 * Get list of Movimentos
 */
exports.index = function(req, res) {
  Template.find({}, function (err, templates) {
    if(err) return res.send(500, err);
    res.json(200, templates);
  });
};


exports.getById = function(req, res) { 
	console.log(req.params.id);
  Template.find({_id: req.params.id}, function (err, templates) {
    if(err) return res.send(500, err);
    res.json(200, templates);
  });
};


/**
 * Create Movimentos
 */
exports.create = function(req, res, next) {
  var newTemplate = new Template(req.body);
  newTemplate.save(function(err, template) {
  	if(err) return res.send(500, err);
    res.json(200, template);
  });
};
