'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _treatment = require('../controllers/treatment');

var router = (0, _express.Router)();

router.get('/list', _treatment.list);

exports.default = router;