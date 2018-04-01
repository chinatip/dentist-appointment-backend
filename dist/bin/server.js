'use strict';

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('babel-polyfill');
var PORT = process.env.PORT || 8080;

_app2.default.listen(PORT, function () {
  console.log('Listening on port ' + PORT);
});