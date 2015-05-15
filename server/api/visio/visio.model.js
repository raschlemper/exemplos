'use strict';

var mongoose = require('mongoose');
var generator = require('mongoose-gen');


var Schema = mongoose.Schema;

var ConfiguracaoSchema = new Schema({
    header: {
        column: Number,
        line: Number
    },
    title: {
        column: Number,
        line: Number,
        offsetLine: Number,
        component: String
    },
    headerContent: {
        column: Number,
        line: Number,
        component: String
    },
    details: {
        column: Number,
        line: Number,
        component: String
    },
    footer: {
        column: Number,
        line: Number,
        component: String
    },
    detailsContent: {
        column: Number,
        line: Number,
        component: String
    },
    total: {
        column: Number,
        line: Number,
        component: Number
    }
});

var CabecalhoSchema = new Schema({
    name: String,
    configuracao: [ConfiguracaoSchema]
});

var DetailsSchema = new Schema({
    name: String,
    type: String,
    configuracao: [ConfiguracaoSchema]
});
var RodapeSchema = new Schema({
    name: String,
    configuracao: [ConfiguracaoSchema]
});

var CampoSchema = new Schema({
    column: String,
    label: String,
    selected: Number,
    groupby: {
        column: String,
        label: String
    }
});

var VisioSchema = new Schema({
    option: {
        cabecalho: [CabecalhoSchema],
        details: [DetailsSchema],
        rodape: [RodapeSchema],
        selection: {
            cabecalho: {
                name: String,
                configuracao: {
                    header: {
                        column: Number,
                        line: Number
                    },
                    headerContent: {
                        column: Number,
                        line: Number,
                        component: String
                    },
                    foto: {
                        column: Number,
                        line: Number,
                        component: String
                    }
                }
            },
            details: {
                name: String,
                type: String,
                configuracao: {
                    details: {
                        column: Number,
                        line: Number,
                        component: String
                    }
                }
            },
            rodape: {
                name: String,
                configuracao: {
                    footer: {
                        column: Number,
                        line: Number,
                        offsetLine: Number
                    },
                    total: {
                        column: Number,
                        line: Number,
                        component: String
                    },
                    details: {
                        column: Number,
                        line: Number
                    },
                    detailsContent: {
                        column: Number,
                        line: Number,
                        component: String
                    }
                }
            }
        }
    },
    campos: [CampoSchema],
    name: String,
    description: String,
    createDate: Date,
    hashid: Number
});


var Visio = mongoose.model('Visio', VisioSchema);
var Cabecalho = mongoose.model('Cabecalho', CabecalhoSchema);
var Details = mongoose.model('Details', DetailsSchema);
var Rodape = mongoose.model('Rodape', RodapeSchema);
var Campo = mongoose.model('Campo', CampoSchema);


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
//module.exports = mongoose.model('campos', CampoSchema);
module.exports = mongoose.model('cabecalhos', CabecalhoSchema);
module.exports = mongoose.model('details', DetailsSchema);
module.exports = mongoose.model('rodapes', RodapeSchema);

