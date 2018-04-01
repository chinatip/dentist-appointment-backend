'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _dentist = require('./dentist');

var _dentist2 = _interopRequireDefault(_dentist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.get('/', function (req, res) {
  res.status(200).send({ status: 'Server API Running' });
});

router.use('/dentist', _dentist2.default);

exports.default = router;