'use strict';

var express = require('express');
var controller = require('./movimento.controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/', controller.create);
router.post('/field/header', controller.getHeader);

module.exports = router;
