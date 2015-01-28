var Router = Backbone.Router.extend({
    container: null,
    tips: null,
    tip: null,
    sub: null,

    initialize: function(){
        this.tips = new Tips();
    },

    routes: {
        // 'tip/:id(/)': 'tip',
        // 'subscribe': 'sub',
        '' : 'home',
        '*404': 'home',
    },

    tip: function(id){
        if(!id){
            throw new Error('Dude, you didn\' ask for any tips');
            return false;
        }
        var tip = new Tip({id: id});
        var tipView = new BabyTipView({model: tip});
    },

    subscribeRoute: function () {
        console.log('Thanks for your interest?');
        // var subscribeCollection = new SubscribeCollection();
        // var subscribeView = new SubscribeView();
        // $(".app_container").html(subscribeView.el);
    },

    home: function () {
        var listView = new BabyTipsView({collection: this.tips});
        listView.render();
    }
});
