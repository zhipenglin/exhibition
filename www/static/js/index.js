/**
 * Created by lzp on 2017/4/6.
 */

/**首页banner**/
(function(){
    function Banner($el,imgList){
        this.list=[];
        this.$el=$($el);
        this.init(imgList);
    }
    Banner.prototype={
        constructor:Banner,
        init:function(imgList){
            var self=this;
            _.each(imgList,function(n,i){
                var group=i%9;
                if(!_.isArray(self.list[group])){
                    self.list[group]=[];
                }
                self.list[group].push(n);
            });
            this.content=$(this.$el).html();
            this.render();
            this.bindEvent();
            this.timer();
        },
        timer:function(){
            var self=this;
            this.timerId=setInterval(function(){
                self.bannerItemList[Math.floor(Math.random()*self.bannerItemList.length)].next();
            },2000);
        },
        render:function(){
            var self=this;
            var size=Math.round($(window).width()/6);
            this.$el.html(_.template(
                '<%_.each(position,function(n,i){%><div class="banner__item" style="top:<%=n.y%>px;left:<%=n.x%>px;width:<%=n.width%>px;height:<%=n.height%>px;"><%_.each(list[i],function(img){%><img src="<%=img%>"/><%})%><%if(n.content){%><div style="font-size:<%=n.width/10%>px;"><%=n.content%></div><%}%></div><%})%>'
            )({position:[
                {x:0,y:0,width:size,height:size},
                {x:size,y:0,width:size,height:size},
                {x:2*size,y:0,width:size,height:size},
                {x:3*size,y:0,width:2*size,height:2*size,content:this.content},
                {x:5*size,y:0,width:size,height:size},
                {x:0,y:size,width:size,height:size},
                {x:size,y:size,width:size,height:size},
                {x:2*size,y:size,width:size,height:size},
                {x:5*size,y:size,width:size,height:size}
            ],list:this.list}));

            this.bannerItemList=_.map(this.$el.find('.banner__item'),function(item,i){
                return new BannerItem(item,self.list[i]);
            });
        },
        bindEvent:function(){
            var self=this;
            $(window).on('resize',function(){
                self.render();
            });
        }
    }
    function BannerItem($el,list){
        this.$el=$($el);
        this.list=list;
        this.index=0;
        this.init();
    }
    BannerItem.prototype={
        constructor:BannerItem,
        init:function(){
            this.render();
        },
        next:function(){
            if(this.index>=this.list.length-1){
                this.index=0;
            }else{
                this.index++;
            }
            this.render();
        },
        render:function(){
            var current=this.$el.find('img:eq('+this.index+')'),outer=this.$el.find('img.active');
            if(outer.length){
                current.animate().random(function(){
                    current.addClass('active');
                    outer.removeClass('active');
                });
            }else{
                current.addClass('active');
            }
        }
    }
    new Banner('.banner',['/static/imageData/banner_03.jpg','/static/imageData/banner_07.jpg','/static/imageData/banner_06.jpg','/static/imageData/banner_05.jpg','/static/imageData/banner_08.jpg','/static/imageData/banner_09.jpg','/static/imageData/banner_10.jpg','/static/imageData/banner_11.jpg','/static/imageData/banner_12.jpg'
        ,'/static/imageData/banner_07.jpg','/static/imageData/banner_06.jpg','/static/imageData/banner_05.jpg','/static/imageData/banner_08.jpg','/static/imageData/banner_09.jpg','/static/imageData/banner_10.jpg','/static/imageData/banner_11.jpg','/static/imageData/banner_12.jpg'
        ,'/static/imageData/banner_06.jpg','/static/imageData/banner_05.jpg','/static/imageData/banner_08.jpg','/static/imageData/banner_09.jpg','/static/imageData/banner_10.jpg','/static/imageData/banner_11.jpg','/static/imageData/banner_12.jpg'
        ,'/static/imageData/banner_05.jpg','/static/imageData/banner_08.jpg','/static/imageData/banner_09.jpg','/static/imageData/banner_10.jpg','/static/imageData/banner_11.jpg','/static/imageData/banner_12.jpg'
    ]);
})();
