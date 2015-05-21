/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

/*
 * Insert users
 */
require('./movimento/movimento.mock'); 
require('./campo/campo.mock'); 
require('./component/component.mock'); 
require('./container/container.mock'); 
require('./layout/layout.mock'); 
require('./entity/entity.mock'); 
require('./visio/visio.mock'); 