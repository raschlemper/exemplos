'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ComponentSchema = new Schema({
    "column": Number,
	"line": Number
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

