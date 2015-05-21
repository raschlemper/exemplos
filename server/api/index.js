'use strict';

var express = require('express');
var movimento = require('./movimento/movimento.controller');
var campo = require('./campo/campo.controller');
var container = require('./container/container.controller');
var visio = require('./visio/visio.controller');
var layout = require('./layout/layout.controller');
var entity = require('./entity/entity.controller');

var router = express.Router();

router.get('/movimento', movimento.index);
router.post('/movimento', movimento.create);

router.get('/campo', campo.index);
router.post('/campo', campo.create);

router.get('/visio', visio.index);
router.get('/visio/:hashid', visio.findByHashid);
router.post('/visio', visio.create);
router.post('/visio/remove', visio.remove);
router.put('/visio', visio.update);

router.get('/container', container.index);
router.post('/container', container.create);

router.get('/entity', entity.index);
router.post('/entity', entity.create);

router.get('/layout', layout.index);
router.post('/layout', layout.create);

module.exports = router;
