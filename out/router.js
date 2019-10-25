"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = router;

var _next2 = _interopRequireDefault(require("next"));

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var dev = process.env.NODE_ENV !== 'production';
var app = (0, _next2["default"])({
  dev: dev,
  dir: "".concat(__dirname, "/app")
});

var expressRouter = _express["default"].Router();

function router() {
  return _router.apply(this, arguments);
}

function _router() {
  _router = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var handle;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return app.prepare();

          case 2:
            handle = app.getRequestHandler();
            expressRouter.get('*', function (req, res) {
              return handle(req, res);
            });
            return _context.abrupt("return", expressRouter);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _router.apply(this, arguments);
}

module.exports = exports.default;