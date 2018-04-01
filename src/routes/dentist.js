'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _dentist = require('../controllers/dentist');

var router = (0, _express.Router)();

router.get('/list', _dentist.list);
router.get('/create', _dentist.create);

router.post('/update', _dentist.update);
router.post('/delete', _dentist.remove);

exports.default = router;