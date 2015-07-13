// api/services/protocols/openid.js

var _ = require('lodash');
var _super = require('sails-permissions/api/services/protocols/openid');

function protocols () { }

protocols.prototype = Object.create(_super);
_.extend(protocols.prototype, {

  // Extend with custom logic here by adding additional fields and methods,
  // and/or overriding methods in the superclass.

});

module.exports = new protocols();
