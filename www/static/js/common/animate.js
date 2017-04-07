/**
 * Created by lzp on 2017/4/6.
 */
;(function () {
    'use strict';

    if (!Date.now)
        Date.now = function () { return new Date().getTime(); };

    var vendors = ['webkit', 'moz'];
    for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
        var vp = vendors[i];
        window.requestAnimationFrame = window[vp + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = (window[vp + 'CancelAnimationFrame']
        || window[vp + 'CancelRequestAnimationFrame']);
    }
    if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) // iOS6 is buggy
        || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
        var lastTime = 0;
        window.requestAnimationFrame = function (callback) {
            var now = Date.now();
            var nextTime = Math.max(lastTime + 16, now);
            return setTimeout(function () { callback(lastTime = nextTime); },
                nextTime - now);
        };
        window.cancelAnimationFrame = clearTimeout;
    }

    $.setTimeout=function(callback,time){
        var now=Date.now(),id=null;
        function run(){
            id=requestAnimationFrame(function(){
                if(Date.now()-now>=time){
                    callback();
                }else{
                    run();
                }
            });
        }
        run();
        return function(){
            cancelAnimationFrame(id);
        };
    }
    $.setInterval=function(callback,time){
        var clear=function(){};
        function run(){
            clear=$.setTimeout(function(){
                callback();
                run();
            },time);
        }
        run();
        return function(){
            clear();
        }
    }
}());

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
                        $.setTimeout(function(){
                            reslove();
                        },0);
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