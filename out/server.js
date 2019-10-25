"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _path = _interopRequireDefault(require("path"));

var _http = _interopRequireDefault(require("http"));

var _express = _interopRequireDefault(require("express"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _helmet = _interopRequireDefault(require("helmet"));

var _esther = _interopRequireDefault(require("esther"));

var _lodash = require("lodash");

var _morgan = _interopRequireDefault(require("./middleware/morgan"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var HttpServer =
/*#__PURE__*/
function () {
  function HttpServer(_ref) {
    var nodeEnv = _ref.nodeEnv,
        name = _ref.name,
        port = _ref.port,
        router = _ref.router;

    _classCallCheck(this, HttpServer);

    this.server = (0, _express["default"])();
    this.nodeEnv = nodeEnv || 'development';
    this.name = name || 'Server';
    this.router = router || _express["default"].router();
    this.server.set('port', port || 3000);
  }

  _createClass(HttpServer, [{
    key: "attachMiddleware",
    value: function attachMiddleware() {
      this.server.use((0, _helmet["default"])());
      this.server.use(_helmet["default"].hidePoweredBy({
        setTo: ''
      }));
      this.server.set('trust proxy', true); // Logs every request

      this.server.use(_morgan["default"]);
      this.server.use(_express["default"]["static"](_path["default"].resolve(__dirname, 'public')));
      this.server.use((0, _cookieParser["default"])());
      this.server.use(_bodyParser["default"].urlencoded({
        extended: true
      }));
      this.server.use(_bodyParser["default"].json());
      this.server.use(this.router);
    }
  }, {
    key: "listen",
    value: function listen() {
      var _this = this;

      this.attachMiddleware();
      this.http = _http["default"].createServer();
      this.http.on('request', this.server);
      this.http.listen(this.server.get('port'), function () {
        _esther["default"].info("[".concat((0, _lodash.capitalize)(_this.nodeEnv), "] ").concat(_this.name, " listening on port ").concat(_this.server.get('port')));
      });
    }
  }]);

  return HttpServer;
}();

var _default = HttpServer;
exports["default"] = _default;
module.exports = exports.default;