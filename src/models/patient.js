'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Schema = _mongoose2.default.Schema;

var schema = new _mongoose2.default.Schema({
  __v: { type: Number, select: false },
  firstname: String,
  lastname: String,
  phone: String,
  facebook: String,
  deleted: { type: Boolean, default: false, select: false }
});

exports.default = _mongoose2.default.model('Patient', schema);