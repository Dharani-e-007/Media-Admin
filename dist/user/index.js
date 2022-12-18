"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _userController = require("./user.controller.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Router = _express["default"].Router();
Router.post("/register", _userController.register);
Router.post("/login", _userController.login);
Router["delete"]("/deleteaccount", _userController.isAuthenticated, _userController.deleteAccount);
Router.get("/all", _userController.allUsers);
Router.post("/addNews", _userController.isAuthenticated, _userController.addNews);
Router.get("/newsList", _userController.newsList);
Router.get("/deleteNews/:id", _userController.deleteNews);
Router.get("/editNews/:id", _userController.editNews);
var _default = Router; // middleware vs endpoint function
// midlleware has req,res,next where as end point has req,res only
exports["default"] = _default;