var BabyTipsView = Backbone.View.extend({
    collection: BabyTips,
    template: Handlebars.compile( $('#template-view_grid').val() ),
    el: $('.app_container'),
    initialize: function () {
        this.listenTo( this.collection, 'reset add change remove', this.render, this );
        this.collection.fetch({ data: { fetch:true, type:"post" } });
    },
    render: function (model, collection, context) {
        model = model || {},
        collection = collection || {};
        var tips = (model.attributes) ? model.attributes.tips : {};

        var listData = {
            // title: 'Baby',
            descrip: 'Instructions',
            tagline: 'Basic instructions for your newly acquired baby.',
            nav:{
                lists:[
                    {
                        links: [
                            {
                                href: 'subscribe/',
                                label: 'Subscribe'
                            }
                        ],
                    },
                ]
            },
            content: {
                items: tips
            }
        };
        this.$el.html( this.template( listData ) );
    }
});
