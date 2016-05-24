var Backbone = require('backbone');
Backbone.Marionette = require('backbone.marionette');
var UserView = require('./UserView');

module.exports = Backbone.Marionette.CompositeView.extend({
    childView: UserView,
    childViewContainer: '#users_list',
    template: '#users_view'
});
