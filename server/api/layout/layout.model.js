'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var LayoutSchema = new Schema({
    "name": String,
    "order": Number,
    "description": String,
    "configuration": {
        "full": {
            "lineHeight": Number
        },
        "preview": {
            "lineHeight": Number
        }
    },
    "containers": [Schema.Types.Containers]
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
