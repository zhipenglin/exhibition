/**
 * Created by lzp on 2017/4/6.
 */
(function(){
    function Animate($el){
        this.$el=$($el);
        this.promise=Promise.resolve();
    }

    Animate.prototype={
        constructor:Animate,
        animateList:['flipInX','flipInY','zoomInLeft','zoomIn','zoomInDown','zoomInRight','zoomInUp','rotateIn','fadeIn','fadeInDown','fadeInRight','fadeInUp','fadeInLeft'],
        add:function(name,callback){
            var self=this;
            name+=' animated';
            this.promise.then(function () {
                return new Promise(function(reslove,reject){
                    self.$el.addClass(name).on('webkitAnimationEnd animationend',function(){
                        self.$el.removeClass(name);
                        callback&&callback();
                        reslove();
                    });
                });
            });
            return this;
        },
        random:function(callback){
            return this.add(this.animateList[Math.floor(Math.random()*this.animateList.length)],callback);
        }
    };

    $.fn.animate=function(){
        return new Animate(this);
    }
})();