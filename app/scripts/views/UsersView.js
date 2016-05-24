var Backbone = require('backbone');
Backbone.Marionette = require('backbone.marionette');
var User = require('../models/User');
var UserView = require('./UserView');

module.exports = Backbone.Marionette.CompositeView.extend({
    childView: UserView,
    childViewContainer: '#users_list',
    template: '#users_view',
    ui: {
        inputName: '#name',
        inputAge: '#age',
        submitBtn: '#submit'
    },
    events: {
        'click @ui.submitBtn': 'clickSubmitBtn'
    },
    clickSubmitBtn: function() {
        var name = this.ui.inputName.val();
        var age = this.ui.inputAge.val();
        this.model = new User();
        this.model.set({name: name, age: age});
        if(this.model.isValid(true)) {
            this.collection.create(this.model);
            alert('Success!');
        }
    }
});

