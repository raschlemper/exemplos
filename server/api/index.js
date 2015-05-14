'use strict';

var express = require('express');
var movimento = require('./movimento/movimento.controller');
var campo = require('./campo/campo.controller');
var visio = require('./visio/visio.controller');

var router = express.Router();

router.get('/movimento', movimento.index);
router.post('/movimento', movimento.create);

router.get('/campo', campo.index);
router.post('/campo', campo.create);

router.get('/visio', visio.index);
router.post('/visio', visio.create);

module.exports = router;
