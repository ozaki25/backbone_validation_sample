var Backbone = require('backbone');
Backbone.Marionette = require('backbone.marionette');
Backbone.Validation = require('backbone.validation');
var User = require('../models/User');
var UserView = require('./UserView');

module.exports = Backbone.Marionette.CompositeView.extend({
    childView: UserView,
    childViewContainer: '#users_list',
    template: '#users_view',
    ui: {
        inputName: '#name',
        inputAge: '#age',
        inputs: 'input',
        submitBtn: '#submit'
    },
    events: {
        'click @ui.submitBtn': 'clickSubmitBtn'
    },
    clickSubmitBtn: function() {
        var name = this.ui.inputName.val();
        var age = this.ui.inputAge.val();
        this.model = new User();

        Backbone.Validation.bind(this, {
            valid: function(view, attr) {
                var input = view.$('[name=' + attr + ']')
                input.next('.help-inline').remove();
            },
            invalid: function(view, attr, error) {
                var input = view.$('[name=' + attr + ']')
                if(input.next('.help-inline').length == 0) {
                    input.after('<span class=\"help-inline\" style=\"color:red\"></span>');
                }
                input.next('.help-inline').text(error);
            }
        });

        this.model.set({name: name, age: age});
        if(this.model.isValid(true)) {
            this.collection.create(this.model);
            this.ui.inputs.val('');
            alert('Success!');
        }
    }
});

