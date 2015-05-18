'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var LayoutSchema = new Schema({
    "name": String,
	"type": String,
	"component":[Schema.Types.Components]	
});


var layout = mongoose.model('layout', LayoutSchema);

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
LayoutSchema.methods = {};

module.exports = mongoose.model('layouts', LayoutSchema);

