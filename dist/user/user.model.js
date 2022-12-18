"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var UserSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isVerified: {
    type: Boolean,
    "default": false
  },
  isAdmin: {
    type: Boolean,
    "default": false
  },
  date: {
    type: Date,
    "default": new Date()
  }
});
var Usermodel = _mongoose["default"].model("admin", UserSchema);
var _default = Usermodel;
exports["default"] = _default;