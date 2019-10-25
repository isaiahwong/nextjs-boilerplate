require('@babel/polyfill');
require('es6-promise').polyfill();
require('./lib/setupEnv')();
const path = require('path');
const logger = require('esther');

const Server = require('./server');
const router = require('./router');
const { setupLanguage } = require('./common/i18n');
const pkg = require('../package.json');

// Initialize logger
logger.init({
  useFileTransport: true,
  logDirectory: path.join(__dirname, '..', 'logs'),
  useStackDriver: process.env.ENABLE_STACKDRIVER === 'true',
  disableStackTrace: true,
  stackDriverOpt: {
    serviceName: 'dashboard-client',
    ver: pkg.version
  }
});

setupLanguage({ defaultLocale: 'en' });

router().then((expressRouter) => {
  const server = new Server({
    router: expressRouter
  });
  server.listen();
});
