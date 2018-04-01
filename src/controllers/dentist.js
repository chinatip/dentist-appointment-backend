'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.remove = exports.update = exports.create = exports.list = undefined;

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require('../utils');

var _models = require('../models');

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var list = exports.list = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
    var dentists;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _models.Dentist.find({ deleted: false });

          case 3:
            dentists = _context.sent;

            (0, _utils.respondResult)(res)({ dentists: dentists });
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context['catch'](0);

            (0, _utils.respondErrors)(res)(_context.t0);

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 7]]);
  }));

  return function list(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var create = exports.create = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
    var dentist;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _models.Dentist.create({ firstname: 'f', lastname: 'l' });

          case 3:
            dentist = _context2.sent;

            (0, _utils.respondResult)(res)({ dentist: dentist });
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2['catch'](0);

            (0, _utils.respondErrors)(res)(_context2.t0);

          case 10:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 7]]);
  }));

  return function create(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var update = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
    var _req$body, _id, body, availbleFields, dentist;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _req$body = req.body, _id = _req$body._id, body = (0, _objectWithoutProperties3.default)(_req$body, ['_id']);
            availbleFields = ['firstname', 'lastname'];
            _context3.next = 5;
            return _models.Dentist.findOne({ _id: _id });

          case 5:
            dentist = _context3.sent;

            _lodash2.default.map(availbleFields, function (field) {
              dentist[field] = body[field] || dentist[field];
            });
            _context3.next = 9;
            return dentist.save();

          case 9:

            (0, _utils.respondResult)(res)({ dentist: dentist });
            _context3.next = 15;
            break;

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3['catch'](0);

            (0, _utils.respondErrors)(res)(_context3.t0);

          case 15:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 12]]);
  }));

  return function update(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.update = update;
var remove = exports.remove = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
    var dentist;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _models.Dentist.findOne({ _id: req.body._id });

          case 3:
            dentist = _context4.sent;

            dentist.deleted = true;
            _context4.next = 7;
            return dentist.save();

          case 7:

            (0, _utils.respondSuccess)(res)();
            _context4.next = 13;
            break;

          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4['catch'](0);

            (0, _utils.respondErrors)(res)(_context4.t0);

          case 13:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[0, 10]]);
  }));

  return function remove(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();