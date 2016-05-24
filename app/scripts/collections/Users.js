var Backbone = require('backbone');
Backbone.LocalStorage = require('backbone.LocalStorage');
var User = require('../models/User');

module.exports = Backbone.Collection.extend({
    mdoel: User,
    localStorage: new Backbone.LocalStorage('backbone_validation_sample'),
});
