"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeUser = exports.removeNews = exports.listAllNews = exports.listAll = exports.findUser = exports.createUser = exports.createNews = void 0;
var _userModel = _interopRequireDefault(require("./user.model.js"));
var _newsModel = _interopRequireDefault(require("./news.model.js"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var saltRounds = 10;
var createUser = function createUser(data) {
  return new Promise(function (resolve, reject) {
    _bcrypt["default"].hash(data.password, saltRounds, function (err, hash) {
      // Store hash in your password DB.
      data.email = data.email.toLowerCase();
      data.password = hash;
      var validdata = new _userModel["default"](data);
      validdata.save().then(function (newuser) {
        resolve(newuser);
      }, function (error) {
        reject(error);
      });
    });
  });
};
exports.createUser = createUser;
var findUser = function findUser(data) {
  return new Promise(function (resolve, reject) {
    var query = {
      email: data.email
    };
    _userModel["default"].findOne(query).then(function (result) {
      if (result) {
        _bcrypt["default"].compare(data.password, result.password, function (err, result) {
          // result == true
          if (result) {
            resolve();
          } else {
            reject();
          }
        });
      } else {
        reject();
      }
    }, function (error) {
      reject(error);
    });
  });
};
exports.findUser = findUser;
var removeUser = function removeUser(data) {
  return new Promise(function (resolve, reject) {
    var query = {
      email: data.email
    };
    _userModel["default"].deleteOne(query).then(function (result) {
      console.log("Result of user delete operation", result);
      if (result.deletedCount) {
        resolve();
      } else {
        reject();
      }
    })["catch"](function (error) {
      reject();
      console.log("Error in use delete operation", error);
    });
  });
};
exports.removeUser = removeUser;
var listAll = function listAll(data) {
  return new Promise(function (resolve, reject) {
    var query = {};
    _userModel["default"].find(query).then(function (result) {
      if (result) {
        resolve(result);
      }
    }, function (error) {
      reject();
    });
  });
};
exports.listAll = listAll;
var createNews = function createNews(data) {
  return new Promise(function (resolve, reject) {
    var validdata = new _newsModel["default"](data);
    validdata.save().then(function (news) {
      resolve(news);
    }, function (error) {
      reject(error);
    });
  });
};
exports.createNews = createNews;
var listAllNews = function listAllNews(data) {
  return new Promise(function (resolve, reject) {
    var query = {};
    _newsModel["default"].find(query).then(function (result) {
      if (result) {
        resolve(result);
      }
    }, function (error) {
      reject();
    });
  });
};
exports.listAllNews = listAllNews;
var removeNews = function removeNews(data) {
  return new Promise(function (resolve, reject) {
    var query = {
      id: data.id
    };
    _newsModel["default"].deleteOne(query).then(function (result) {
      console.log("Result of news delete operation", result);
      if (result.deletedCount) {
        resolve();
      } else {
        reject();
      }
    })["catch"](function (error) {
      reject();
      console.log("Error in use delete operation", error);
    });
  });
};
exports.removeNews = removeNews;