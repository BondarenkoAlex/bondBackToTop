/*
 bondHoverBlock - jQuery plugin
 Author: Bondarenko Aleksey
 Homepage: http://alexbond.ru/
 */
(function ($) {
    $.fn.bondBackToTop = function (options) {
        var defaults = {
            scrollEasing:"linear",
            scrollTop:0,
            scrollBot:0,
            scrollSpeed: "fast",
            offsetTop:200,
            wrapId: null,
            button: "<div><a href='#'>Направление </a></div>",
			bind: null,
            upClass:"bondUp",
            downClass:"bondDown"
        }
        var options = $.extend(defaults, options);
        var this$ = this;
        var memory = {button:null};
        init();
        bindEvent();

        function init(){
			if ( options.bind ) {
				memory.button = $(options.bind);
			}
			else {
				var wrap$ = options.wrapId ? $("#"+options.wrapId) : $("body");
				memory.button = $(options.button);
				wrap$.append(memory.button);
			} 
            //$(options.button)
        }
        function bindEvent() {
            var windows$ = $(window);
            windows$.scroll( function (e) {
                var windowScrollTop = $(window).scrollTop();
                if (windowScrollTop >= options.offsetTop){
                    memory.button.addClass(options.upClass).removeClass(options.downClass);
                }
                else {
                    memory.button.addClass(options.downClass).removeClass(options.upClass);
                }
            });
            windows$.scroll();
            memory.button.click(function(e) {
                //alert('Handler for .click() called.');
                var htmlbody$ = $("html,body");
                var windows$ = $(window);
                var effect = (jQuery.easing[options.scrollEasing] == null) ? "linear" : options.scrollEasing;
                var classNameArr = memory.button.get(0).className.split(/\s+/);/*0 и более пробелов*/
				var isUp = !1;
				for (var i = 0; i < classNameArr.length; i++) {
					if (classNameArr[i] == options.upClass) {
						isUp = !0;
						break;
					}
				}
                if (isUp){
                    htmlbody$.animate({scrollTop:options.scrollTop}, options.scrollSpeed, effect );
                }
                else{
                    htmlbody$.animate({scrollTop:htmlbody$.height()-windows$.height()-options.scrollBot}, options.scrollSpeed, effect );
                }
                return false;
            });
        }

    }
})(jQuery);
