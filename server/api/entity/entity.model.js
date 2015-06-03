'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EntitySchema = new Schema({
    "name": String,
    "order": Number,
    "key": [Schema.Types.Campos],
    "value": [Schema.Types.Campos],
    "expression": String,
    "formula": String,
    "description": String,
    "groups": [Schema.Types.Campos]
});

var entity = mongoose.model('entity', EntitySchema);

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
EntitySchema.methods = {};

module.exports = mongoose.model('entitys', EntitySchema);
