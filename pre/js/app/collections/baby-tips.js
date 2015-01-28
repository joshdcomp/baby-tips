var Tips = Backbone.Collection.extend({
    model: BabyTip,
    url: '/api/get/tips',
});
