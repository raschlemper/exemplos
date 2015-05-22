'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var VisioSchema = new Schema({
    layout: {
    	templateId: mongoose.Schema.ObjectId, 
        name: String,
        order: Number,
        description: String,
        configuration: {
            full: {
                lineHeight: Number
            },
            preview: {
                lineHeight: Number
            }
        },
        containers: [Schema.Types.Containers]
    },
    name: String,
    description: String,
    createDate: Date,
    hashid: Number
});

var Visio = mongoose.model('Visio', VisioSchema);

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
VisioSchema.methods = {};

module.exports = mongoose.model('visios', VisioSchema);
