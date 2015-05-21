'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EntitySchema = new Schema({
    "name": String,
    "key": [Schema.Types.Campos],
    "value": [Schema.Types.Campos],
    "expression": String,
    "group": {
        "fields": [Schema.Types.Campos],
        "formula": String
    }
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
