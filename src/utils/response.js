'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var respondErrors = exports.respondErrors = function respondErrors(res) {
  return function (err, code) {
    console.log(err);
    res.status(code || err.code || 500).send(err || { message: 'Internal Error' });
  };
};

var respondResult = exports.respondResult = function respondResult(res) {
  return function (result) {
    return res.status(200).send(result);
  };
};

var respondSuccess = exports.respondSuccess = function respondSuccess(res) {
  return function () {
    return res.status(200).send({ message: 'Success' });
  };
};