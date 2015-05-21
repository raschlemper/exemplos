'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ComponentSchema = new Schema({
    "column": Number,
    "label": String,
	"line": Number,
	"name": String,
	"type": String,
	"dependency": { type : mongoose.Schema.ObjectId, ref : 'components' }
});


var component = mongoose.model('components', ComponentSchema);

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
ComponentSchema.methods = {};

module.exports = mongoose.model('components', ComponentSchema);

