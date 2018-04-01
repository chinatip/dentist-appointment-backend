'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _patient = require('../controllers/patient');

var router = (0, _express.Router)();

router.get('/list', _patient.list);

exports.default = router;