'use strict';

var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var VisioSchema = new Schema({
    layout:{
        selection:[Schema.Types.Layouts]
    },
    campos: [Schema.Types.Campos],
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

