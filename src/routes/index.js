'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _dentist = require('./dentist');

var _dentist2 = _interopRequireDefault(_dentist);

var _clinic = require('./clinic');

var _clinic2 = _interopRequireDefault(_clinic);

var _treatment = require('./treatment');

var _treatment2 = _interopRequireDefault(_treatment);

var _patient = require('./patient');

var _patient2 = _interopRequireDefault(_patient);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var router = (0, _express.Router)();
router.get('/', function (req, res) {
  res.status(200).send({ status: 'Server API Running' });
});

router.use('/dentist', _dentist2.default);
router.use('/clinic', _clinic2.default);
router.use('/treatment', _treatment2.default);
router.use('/patient', _patient2.default);

exports.default = router;