var Backbone = require('backbone');
Backbone.Marionette = require('backbone.marionette');
var BasicFormView = require('./BasicFormView');
var HorizontalFormView = require('./HorizontalFormView');
var BasicFormWithTooltipView = require('./BasicFormWithTooltipView');
var InlineFormView = require('./InlineFormView');

module.exports = Backbone.Marionette.LayoutView.extend({
    className: 'row',
    template: '#forms_view',
    regions: {
        basicForm: '#basic_form',
        horizontalForm: '#horizontal_form',
        basicFormWithTooltip: '#basic_form_with_tooltip',
        inlineForm: '#inline_form'
    },
    onRender: function() {
        this.getRegion('basicForm').show(new BasicFormView({collection: this.collection}));
        this.getRegion('horizontalForm').show(new HorizontalFormView({collection: this.collection}));
        this.getRegion('basicFormWithTooltip').show(new BasicFormWithTooltipView({collection: this.collection}));
        this.getRegion('inlineForm').show(new InlineFormView({collection: this.collection}));
    }
});
