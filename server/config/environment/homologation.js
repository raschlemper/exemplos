'use strict';

// Production specific configuration
// =================================
module.exports = {

  // Server IP
  ip: process.env.FINANCEIRO_IP_ADDRESS || "localhost",

  // Server port
  port: process.env.FINANCEIRO_PORT_ADDRESS || 9000,

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/movimento'
  }
  
};