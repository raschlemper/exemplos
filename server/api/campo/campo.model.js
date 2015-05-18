'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CampoSchema = new Schema({
    "column": String,
    "label": String,
    "groupby": {
        column: String,
        label: String
    }
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

