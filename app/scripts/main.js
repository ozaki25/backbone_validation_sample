var Backbone = require('backbone');
Backbone.Marionette = require('backbone.marionette');
var Users = require('./collections/Users');
var UsersView = require('./views/UsersView');

var App = new Backbone.Marionette.Application({
    regions: {
        main: '#main'
    },
    onStart: function() {
        var users = new Users();
        users.fetch().done(function() {
            this.getRegion('main').show(new UsersView({collection: users}));
        }.bind(this));
    }
});

App.start();
