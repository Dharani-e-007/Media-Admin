"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var NewsSchema = new _mongoose["default"].Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  urlToImage: {
    type: String,
    required: true
  },
  publishedAt: {
    type: String,
    required: true
  }
});
var Newsmodel = _mongoose["default"].model("news", NewsSchema);
var _default = Newsmodel;
exports["default"] = _default;