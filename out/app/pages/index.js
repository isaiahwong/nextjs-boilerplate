"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _link = _interopRequireDefault(require("next/link"));

require("../styles/index.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default() {
  return _react["default"].createElement("ul", null, _react["default"].createElement("li", null, _react["default"].createElement(_link["default"], {
    href: "/b",
    as: "/a"
  }, _react["default"].createElement("a", null, "a"))), _react["default"].createElement("li", null, _react["default"].createElement(_link["default"], {
    href: "/a",
    as: "/b"
  }, _react["default"].createElement("a", null, "b"))), _react["default"].createElement("li", null, _react["default"].createElement(_link["default"], {
    href: {
      pathname: '/posts',
      query: {
        id: '2'
      }
    },
    as: "/posts/2"
  }, _react["default"].createElement("a", null, "post #2"))));
};

exports["default"] = _default;
module.exports = exports.default;