"use strict";

require('@babel/polyfill');

var path = require('path');

var logger = require('esther');

var Server = require('./server');

var router = require('./router');

var pkg = require('../package.json'); // initialise logger


logger.init({
  useFileTransport: true,
  logDirectory: path.join(__dirname, '..', 'logs'),
  useStackDriver: process.env.ENABLE_STACKDRIVER === 'true',
  disableStackTrace: true,
  stackDriverOpt: {
    serviceName: 'auth-service',
    ver: pkg.version
  }
});
router().then(function (expressRouter) {
  var server = new Server({
    router: expressRouter
  });
  server.listen();
});