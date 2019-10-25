"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _morgan = _interopRequireDefault(require("morgan"));

var _lodash = require("lodash");

var _esther = _interopRequireDefault(require("esther"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable dot-notation */
// Logs request to console as well as log files
var doNotLog = ['/hz', '/assets'];

var _default = (0, _morgan["default"])(function (tokens, req, res) {
  // retrieved from morgan lib
  var message = ["[".concat(tokens['remote-addr'](req, res), "]"), "[".concat(tokens.method(req, res), "]"), tokens.url(req, res), tokens.status(req, res), tokens.res(req, res, 'content-length'), '-', tokens['response-time'](req, res), 'ms'].join(' '); // logger format

  var toBeLogged = {
    httpRequest: {
      status: res.statusCode,
      requestUrl: req.url,
      requestMethod: req.method,
      remoteIp: req.connection.remoteAddress,
      responseSize: tokens.res(req, res, 'content-length'),
      userAgent: tokens['user-agent'](req, res)
    },
    originalUrl: req.originalUrl,
    referrer: tokens['referrer'](req, res),
    remoteAddr: tokens['remote-addr'](req, res),
    // don't send sensitive information that only adds noise
    headers: (0, _lodash.omit)(req.headers, ['x-api-key', 'cookie', 'password', 'confirmPassword']),
    body: (0, _lodash.omit)(req.body, ['password', 'confirmPassword']),
    query: req.query,
    params: req.params,
    responseTime: {
      ms: tokens['response-time'](req, res)
    }
  };

  if (doNotLog.find(function (r) {
    return req.originalUrl.includes(r);
  })) {
    return null;
  }

  _esther["default"].route(message, toBeLogged);

  return null;
});

exports["default"] = _default;
module.exports = exports.default;