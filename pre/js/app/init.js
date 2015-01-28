var BabyTips = BabyTips || {};

BabyTips.registerPartials = function(partials){
    for(var name in partials){
        var el = $(partials[name]);
        Handlebars.registerPartial(name, el.val());
    }
    return this;
}

BabyTips.pre = function(){
    var partials = {
        _banner: '#partial-banner',
        _nav: '#partial-nav',
        _tip_content: '#partial-tip_content'
    }
    this.registerPartials(partials);
}

$(function(){
    BabyTips.pre();
    BabyTips.Router = new Router();
    Backbone.history.start({pushState: true});
});
