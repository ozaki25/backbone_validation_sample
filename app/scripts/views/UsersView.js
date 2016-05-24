var Backbone = require('backbone');
Backbone.Marionette = require('backbone.marionette');
var UserView = require('./UserView');

module.exports = Backbone.Marionette.CollectionView.extend({
    id: 'user_list',
    childView: UserView,
    childViewContainer: '#users_list'
});
