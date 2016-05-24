var Backbone = require('backbone');
Backbone.Marionette = require('backbone.marionette');
Backbone.Validation = require('backbone.validation');
var User = require('../models/User');

module.exports = Backbone.Marionette.ItemView.extend({
    className: 'panel panel-success',
    template: '#basic_form_with_tooltip_view',
    ui: {
        inputName: 'input.name',
        inputAge: 'input.age',
        inputs: 'input',
        submitBtn: 'button.submit'
    },
    events: {
        'click @ui.submitBtn': 'clickSubmitBtn'
    },
    clickSubmitBtn: function() {
        var name = this.ui.inputName.val().trim();
        var age = this.ui.inputAge.val().trim();
        this.model = new User();
        this.bindBackboneValidation();

        this.model.set({name: name, age: age});
        if(this.model.isValid(true)) {
            this.collection.create(this.model);
            this.ui.inputs.val('');
        }
    },
    bindBackboneValidation: function() {
        Backbone.Validation.bind(this, {
            valid: function(view, attr) {
                var control = view.$('[name=' + attr + ']');
                var group = control.closest('.form-group');
                group.removeClass('has-error');
                if(control.next('.tooltip')) control.tooltip('hide');
            },
            invalid: function(view, attr, error) {
                var control = view.$('[name=' + attr + ']');
                var group = control.closest('.form-group');
                group.addClass('has-error');
                control.tooltip({trigger: 'manual', title: error}).tooltip('show');
            }
        });
    }
});
