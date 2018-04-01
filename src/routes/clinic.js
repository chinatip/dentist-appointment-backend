'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _clinic = require('../controllers/clinic');

var router = (0, _express.Router)();

router.get('/list', _clinic.list);

exports.default = router;