'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TemplateSchema = new Schema({
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

var template = mongoose.model('template', TemplateSchema);

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
TemplateSchema.methods = {};

module.exports = mongoose.model('templates', TemplateSchema);
