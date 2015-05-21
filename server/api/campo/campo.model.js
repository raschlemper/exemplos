'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CampoSchema = new Schema({
    "field": String,
    "label": String,
    "type": String,
    "isKey": Boolean
});


var campo = mongoose.model('campo', CampoSchema);

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
CampoSchema.methods = {};

module.exports = mongoose.model('campos', CampoSchema);

