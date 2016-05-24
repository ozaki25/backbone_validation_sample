var $ = jQuery = require('jquery');
require('bootstrap');
var Backbone = require('backbone');
Backbone.Marionette = require('backbone.marionette');
var Users = require('./collections/Users');
var UsersView = require('./views/UsersView');
var FormsView = require('./views/FormsView');

var App = new Backbone.Marionette.Application({
    regions: {
        users: '#users',
        forms: '#forms'
    },
    onStart: function() {
        var usersCollection = new Users();
        usersCollection.fetch().done(function() {
            this.getRegion('users').show(new UsersView({collection: usersCollection}));
            this.getRegion('forms').show(new FormsView({collection: usersCollection}));
        }.bind(this));
    }
});

App.start();
