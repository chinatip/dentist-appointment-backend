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
var ObjectId = Schema.Types.ObjectId;

var schema = new _mongoose2.default.Schema({
  __v: { type: Number, select: false },
  name: String,
  phone: String,
  dentists: [{ type: ObjectId, ref: 'Dentist' }],
  deleted: { type: Boolean, default: false, select: false }
});

exports.default = _mongoose2.default.model('Clinic', schema);