
	//	移动端 点击 菜单按钮 展开/收起 导航层
	$('.x-header .menu-btn').on('click',function(){
		var hd = $('.x-header');
		if(!hd.hasClass('menu-open')){
			hd.addClass('menu-open');
			if($('.x-header').css('position') === 'fixed'){
				unWinScroll();
			}else{
				$('body, html').animate({scrollTop: 0}, 100, function(){
					unWinScroll();
				});
			}
		}else{
			hd.removeClass('menu-open');
			enWinScroll();
		}
	});

	//	移动端 点击 导航链接 收起 弹出导航层（用于解决点击锚点导航在页面没刷新的情况下收起弹出的导航层）
	$('.nav-lv a[href]').on('click',function(){
		$('.x-header').removeClass('menu-open');
		enWinScroll();
	});
	
	//	移动端 点击 导航项的箭头 展开/收起 子级导航
	$('.nav-mod .arr').on('click',function(){
		var _this = $(this);
		var par = _this.closest('.nav-item');
		if(!par.hasClass('act')){
			par.addClass('act').siblings('.nav-item').removeClass('act').children('.nav-lv').slideUp(0);
			_this.parent().siblings('.nav-lv').slideDown(200);
		}else{
			par.removeClass('act').children('.nav-lv').slideUp(200);
		}
	});
	
	//	关闭弹窗
	$('.pop-close, .pop-overlay').on('click', function(e){
		e.stopPropagation();
		$(this).parents('.pop-mod').removeClass('x-show');
		enWinScroll();
		
		if($(this).parents('.pop-mod').find('video').length > 0){
			$(this).parents('.pop-mod').find('video')[0].pause().attr("src",'');
		}
		
		if($(this).parents('.pop-mod').find('iframe').length > 0){
			$(this).parents('.pop-mod').find('iframe').remove();
		}
	});
	
	//	下拉框
		$('.select-mod').each(function(){
		var obj = $(this);
		var selectBtn = obj.find('.select-btn');
		var selectTit = obj.find('.select-tit');
		var selectOpts = obj.find('.select-opts');
		var selectQue = obj.find('.squery-list');
		var selectIpt = obj.find('.select-input');
		var selectNat = obj.find('.select-native');
		var val = obj.find('.select-val');

		selectOpts.mCustomScrollbar({
			mouseWheel:{ preventDefault: true}
		});

		selectQue.mCustomScrollbar();

		selectBtn.on('click',function(){
//			if(!device().isMobile){
				if(!obj.hasClass('sc-show')){
					obj.addClass('sc-show');
				}else{
					obj.removeClass('sc-show');
				}
//			}
		});

		selectTit.on('click',function(){
			var _this = $(this);
			var grp = _this.parents('.select-grp');
			if(!grp.hasClass('open')){
				grp.addClass('open').siblings('.select-grp').removeClass('open');
				selectOpts.mCustomScrollbar("scrollTo", grp ,{
						scrollInertia: 0
				});
			}else{
				grp.removeClass('open');
			}
		});

		selectNat.on('change',function(){
			var _this = $(this);

			obj.find('.select-item').eq(_this.get(0).selectedIndex).trigger('click');
		});

		obj.on('click','.select-item',function(){
			var _this = $(this);
			var ptxt = _this.parent().siblings('.select-tit').text();
			var text = !ptxt ? _this.text() : ptxt + ' - ' + _this.text();
			
			if(!_this.hasClass('selected')){
				obj.find('.select-item').removeClass('selected');
				_this.addClass('selected');
				obj.removeClass('sc-show');
				obj.find('.squery-item').removeClass('selected');
				val.text(text);
				selectIpt.val(text);
				if(selectNat[0]){
					selectNat[0].selectedindex = _this.index();
				}
				if(val.hasClass('placeholder')){
					val.removeClass('placeholder');
				}
			}
		});
		
		obj.on('click','.squery-item',function(){
			var _this = $(this);
			var text = _this.text();

			if(!_this.hasClass('selected')){
				_this.addClass('selected').siblings().removeClass('selected');
				obj.find('.select-item').removeClass('selected');
//				obj.removeClass('sq-show');
				val.text(text);
				selectIpt.val(text);
				if(val.hasClass('placeholder')){
					val.removeClass('placeholder');
				}
			}
		});
		
		if(is_undefined(obj.data('clickup'))){
			selectOpts.data("mCS").opt.mouseWheel.preventDefault = false;
		
			obj.on('mouseenter',function(){
				obj.addClass('hover');
			});
			
			obj.on('mouseleave',function(){
				obj.removeClass('hover');
			});
			
			$(document).on('click',function(){
				if(!obj.hasClass('hover')){
					obj.removeClass('sc-show');
				}
			});
		}else{
			obj.on('mouseleave',function(){
				obj.removeClass('sc-show');
			});
		}
		
		selectIpt.on('focus',function(){
			obj.addClass('sq-show');
		});

		selectIpt.on('blur',function(){
			setTimeout(function(){
				obj.removeClass('sq-show');
			},300);
		});

		selectIpt.on('click',function(e){
			e.stopPropagation();
		});
		
	});
	
	//	tab切换模块
	$('.tab-mod').each(function(i){
		var _this = $(this);
		var _bar = _this.find('.tab-bar');
		var _term = _bar.find('.tab-term');
		var _cont = _this.find('.tab-cont');
		var _item = _cont.find('.tab-item');
    var event = $(this).data("event");
    var ww = $(window).width();
    if(event != undefined){
      event = ww >= 750 ? event : 'click';
    }else{
      event = 'click'
    }

		if(_bar.find('.cur').length<1){
			_term.eq(0).addClass('cur');
		}
		var _cur = _bar.find('.cur');

    _item.eq(_cur.index()).addClass('act');
    
		_term.on(event,function(){
			var $this = $(this);
			if(!$this.hasClass('cur')){
				$this.addClass('cur').siblings('.tab-term').removeClass('cur');
				_item.eq($this.index()).addClass('act').siblings('.tab-item').removeClass('act');
			}
		});
	});
/* Function */
function weasel(){
	var obj = $('.x-footer');
	var slot = obj.find('.slot');
	var track = slot.find('.slot-track');
	var item = slot.find('.slot-item');
	var width = obj.width();
	var length = track.length;
	
	var limit = width / length * 5;
	var timer = null, times = 0, clientX = 0;
	
	obj.on('mousemove.move', moveFn);
	obj.on('mousemove.out', $.debounce(5000, outFn));
	
	function moveFn(ev){
		clientX = ev.clientX;
		cancelAnimationFrame(timer);
		timer = requestAnimationFrame(animation);
		times = new Date().valueOf();
	}

	function outFn(){
		cancelAnimationFrame(timer);
		item.removeAttr('style');
	}

	function animation(){
		var animationTime = new Date().valueOf();

		track.each(function(idx, el){
			var _this = $(this);
			var _item = _this.find('.slot-item');
			var middle = offsetL(_this) + _this.width() / 2;
			var distance = Math.abs(clientX - middle);
			
			if(distance > limit)  distance = limit;
			
			var scale = Math.abs(distance/limit) * 50;

			var top = _item.position().top;
			var n = top / slot.height() * 100;
			var t = (scale - n)/2;
					n += t;
			
			TweenMax.set(_item, {y: n+'%', top: 0});
		});

		if(animationTime - times < 1000){
			timer = requestAnimationFrame(animation);
		}
	}	

	function offsetL(obj){
		var left = 0;
		var ol = obj.offset().left;
		
		while(obj){
			left += ol;
			obj = null;
		}
		return left;
	}	
}	


/*	返回顶部	*/
function goTop(cls){	//	cls-[字符串]	类名
	$(cls).on('click', function(){
		$('body, html').stop().animate({scrollTop: 0}, 400 + $(window).scrollTop() * 0.3);
	});
}
/*	获取滚动条宽度	*/
function getScrollBarWidth(){
	var rw = 0, wh = 0, bh = 0;
	wh = $(window).height();
	bh = $('body').height();
	if(bh > wh){
		if(!$('body').data('scrollBarWidth')){
			$('body').append('<div class="fnScrollBarWrap" style="position: fixed; left: 0; top: 0; width: 100px; height: 100px; overflow: auto; visibility: hidden; z-index: -9999;"><div class="fnScrollBarInner" style="width: 100%; height: 200px;"></div></div>');
			rw = 100-$('.fnScrollBarInner').width();
			$('body').data('scrollBarWidth', rw);
			$('.fnScrollBarWrap').remove();
		}else{
			rw = $('body').data('scrollBarWidth');
		}
	}
	return rw;
}

/*	禁止窗口滚动	*/
function unWinScroll(){
	var top = $(window).scrollTop();
	$('body').css({'position':'fixed','top':-top + 'px','left':'0px','right':getScrollBarWidth() + 'px'}).data('winScroll',top);
}

/*	释放窗口滚动	*/
function enWinScroll(){
	if(!$('body').data('ostyle')){
		$('body').removeAttr('style');
	}else{
		$('body').attr('style', $('body').data('ostyle'));
	}
	$(window).scrollTop($('body').data('winScroll'));
}

/*	多行文本省略号	*/
function ellipsis(e,h){
	$(e).each(function(){
			var $p = $(this);
			while ($p.outerHeight() > h) {
				$p.text($p.text().replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/, "..."));
			}
	});
}
/*	滚动tab	*/
function scrollTab(ele){
	var scrolltab = $(ele);
	var scrollitem = scrolltab.find('li');
	var	myScroll = new IScroll(scrolltab[0], {
//		momentum: false,
		mouseWheel: true,
		scrollX: true,
		scrollY: false,
		click: true,
		tap:true
	});

	scrolltab.on('touchmove',function(e){
		e.preventDefault();
	});

	scrollitem.on('tap',function(){
		if(!$(this).hasClass('cur')){
			$(this).addClass('cur').siblings().removeClass('cur');
			myScroll.scrollToElement(this, 500, true, null, IScroll.utils.ease.circular);
		}
	});
}
	
/*	侧边栏定位	*/
function sideBarPos(ele,wrap,n){
	var sBar = $(ele);
	sBar.css('margin-left',wrap/2+n+'px');
	var sWidth = sBar.width()+n;
	var gWidth = wrap + sWidth*2;

	rePos();

	$(window).on('resize', rePos);

	function rePos(){
		if(sBar.offset().left + sBar.width() < gWidth){
			sBar.css({'left':'auto', 'right':0});
		}else{
			sBar.css({'left':'50%', 'right':'auto'});
		}
	}
}

/*	模拟 background-size:cover 算法	*/
function fixCover(ele,node,w,h,limit,winw,winh,pos){	//	ele-元素对象（父级）,node-子元素类型（为空默认子元素）,w-元素原始宽度,h-元素原始高度,limit-元素对象最小宽度,winw-设为窗口宽度,winh-设为窗口高度,pos-是否z绝对定位
	var _this=$(ele);
	if(winw){
		_this.css({'width':$(window).width(),'min-width':limit+'px'});
	}
	if(winh){
		_this.css('height',$(window).height());
	}
	var per=w/h;
	var ww=_this.width();
	var wh=_this.height();
	var pw=wh*per;
	var ph=ww/per;
	var cld=null;
	if(node==''){
		cld=_this.children();
	}else{
		cld=_this.find(node);
	}
	if(pos){
		cld.css({'position':'absolute','left':'0','top':'0'});
	}
	cld.css({'margin-top':0,'margin-left':0,'max-width':'none','max-height':'none'});
	if(ww<pw){
		cld.css({'width':pw+'px','height':wh+'px','margin-left':(ww-pw)*0.5+'px'});
	}else{
		cld.css({'width':ww+'px','height':ph+'px','margin-top':(wh-ph)*0.5+'px'});
	}
}