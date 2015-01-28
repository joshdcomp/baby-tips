var BabyTipView = Backbone.View.extend({
    template: Handlebars.compile( $('#template-view_single').val() ),
    el: $('.app_container'),
    initialize: function (cards) {
        var listData = {
            title: 'Baby',
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
                items: {}
            }
        };

        this.viewData = listData;
    },
    render: function () {
        this.$el.html( this.template( this.viewData ) );
    }
});
