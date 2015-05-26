'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ContainerSchema = new Schema({
    "name": String,
	"type": String,
	"line": Number,
	"column": Number,
	"components":[Schema.Types.Components]		
});


var container = mongoose.model('container', ContainerSchema);

/**
 * Virtuals
 */


/**
 * Validations
 */


/**
 * Pre-save hook
 */


/**
 * Methods
 */
ContainerSchema.methods = {};

module.exports = mongoose.model('containers', ContainerSchema);

