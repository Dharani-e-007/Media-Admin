"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = exports.newsList = exports.login = exports.isAuthenticated = exports.editNews = exports.deleteNews = exports.deleteAccount = exports.allUsers = exports.addNews = void 0;
var _auth = require("../../auth.js");
var _userService = require("./user.service.js");
var _express = _interopRequireDefault(require("express"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();
var _dirname = _path["default"].resolve();
var token = '';
var allNewsList = {};
var register = function register(req, res) {
  (0, _userService.createUser)(req.body).then(function (result) {
    res.status(200).send({
      message: "User Registered"
    });
  })["catch"](function () {
    res.status(500).send({
      error: "Internal Server Error"
    });
  });
};
exports.register = register;
var isAuthenticated = function isAuthenticated(req, res, next) {
  req.headers.authorization = token;
  token = req.get("Authorization");
  if (token) {
    var result = (0, _auth.verifyToken)(token);
    if (result) {
      next(); // moving request to next function which is deletAccount
    } else {
      res.status(401).send({
        error: "Unauthorized"
      });
    }
  } else {
    res.status(401).send({
      error: "Unauthorized"
    });
  }
};
exports.isAuthenticated = isAuthenticated;
var login = function login(req, res) {
  (0, _userService.findUser)(req.body).then(function (result) {
    token = (0, _auth.createToken)({
      email: req.body.email
    });
    res.set("Auhtorization", token);
    res.redirect("/admin/newsForm");
    // res.status(200).send({
    // message:"Login Success"
    // })
  })["catch"](function (err) {
    res.status(500).send({
      error: "INVALID LOGIN"
    });
  });
};
exports.login = login;
var deleteAccount = function deleteAccount(req, res) {
  (0, _userService.removeUser)(req.body).then(function () {
    res.status(200).send({
      message: "Account Deleted"
    });
  }, function () {
    res.status(500).send({
      error: "Internal Server Error"
    });
  });
};
exports.deleteAccount = deleteAccount;
var allUsers = function allUsers(req, res) {
  (0, _userService.listAll)(req.body).then(function (result) {
    res.status(200).send({
      users: result
    });
  }, function () {
    res.status(500).send({
      error: "Internal Server Error"
    });
  });
};
exports.allUsers = allUsers;
var addNews = function addNews(req, res) {
  (0, _userService.createNews)(req.body).then(function (result) {
    res.status(200).send({
      message: "news added successfully"
    });
  })["catch"](function () {
    res.status(500).send({
      error: "Internal Server Error"
    });
  });
};
exports.addNews = addNews;
var newsList = function newsList(req, res) {
  (0, _userService.listAllNews)(req.body).then(function (result) {
    allNewsList = result;
    res.render("allnews", {
      news: result
    });
    // res.status(200).send({
    //    news:result
    // })
  }, function () {
    res.status(500).send({
      error: "Internal Server Error"
    });
  });
};
exports.newsList = newsList;
var deleteNews = function deleteNews(req, res) {
  (0, _userService.removeNews)(req.params).then(function () {
    res.status(200).send({
      message: "News Deleted"
    });
  }, function () {
    res.status(500).send({
      error: "Internal Server Error"
    });
  });
};
exports.deleteNews = deleteNews;
var editNews = function editNews(req, res) {
  var selectedNews = allNewsList.find(function (news) {
    return news._id == req.params.id;
  });
  console.log(selectedNews);
  res.render("editnews", {
    selectedNews: selectedNews
  });
};
exports.editNews = editNews;