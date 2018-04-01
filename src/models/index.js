'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Treatment = exports.Patient = exports.Clinic = exports.Dentist = undefined;

var _dentist = require('./dentist');

var _dentist2 = _interopRequireDefault(_dentist);

var _clinic = require('./clinic');

var _clinic2 = _interopRequireDefault(_clinic);

var _patient = require('./patient');

var _patient2 = _interopRequireDefault(_patient);

var _treatment = require('./treatment');

var _treatment2 = _interopRequireDefault(_treatment);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.Dentist = _dentist2.default;
exports.Clinic = _clinic2.default;
exports.Patient = _patient2.default;
exports.Treatment = _treatment2.default;