define('Carousel',function(){
    var Carousel = {
        viewport : null ,
        intervlTime : 3000 ,
        index : 0 ,

        init : function(config) {
            this.viewport = config.viewport;
　　　　//<div class="viewport" style="position:relative;width:558px;height:240px;overflow:hidden;><ul><li></li></ul></div>"

            this.ul = this.viewport.find('ul');

            this.len = this.ul.find('li').length;

            if(this.len<=1){
                return ;
            }

            this.width = this.viewport.width();

            this.render();

            this.bindEvent();

            this.start();

        },

        render : function() {
            this.ul.css('width',this.width*this.len);

            this.page();

            return this;
        },

        page : function() {
            var html='';

            this.viewport.append('<div class="pager"></div>');

            for(var i=0; i<this.len; i++){
                html += ((i==0)?'<span class="active">':'<span>') + (i+1) +'</span>';
            }

            this.page = this.viewport.find('.pager');
            this.page.append(html);

            return this;
        },

        bindEvent : function() {
            this.viewport.on('mouseenter',jQuery.proxy(this,'mouseenter'));
            this.viewport.on('mouseleave',jQuery.proxy(this,'mouseleave'));
            this.page.on('click','span',jQuery.proxy(this,'click'));
        },

        mouseenter : function(event) {
            this.stop();
        },

        mouseleave : function(event) {
            this.start();
        },

        click : function(event) {
            this.remove();

            this.index = $(event.target).html()-1;

            this.move(false);
        },

        loop : function(){
            this.remove();

            (this.index === this.len-1)? this.index=0 : this.index++;

            this.move(true);
        },

        start : function(){
            this.interval = window.setInterval(jQuery.proxy(this,'loop'),this.intervlTime);
        },

        stop : function(){
            window.clearInterval(this.interval);
        },

        move : function(animate){
            this.page.find('span').eq(this.index).addClass('active');

            var _marginLeft = '-'+(this.index*this.width)+'px';

            if(animate){
                this.ul.animate({'margin-left': _marginLeft},'slow');
            }else{
                this.ul.css({'margin-left': _marginLeft});
            }
        },

        remove : function(){
            this.page.find('span').eq(this.index).removeClass('active');
        }
    };

    return Carousel;  
});


var carousel = require('');Carousel
carousel.init({"viewport":$('#Silder-TC')});