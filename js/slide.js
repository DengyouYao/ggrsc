$(function(){
	$(".slide_right").delegate(".icon","mouseenter",function(){
		$(this).addClass("show_child").siblings().removeClass("show_child");
		$(this).children(".hide_menu").show().animate({left:-77},1000);
	});
	$(".slide_right").delegate(".icon","mouseleave",function(){
		$(this).removeClass("show_child");
		$(this).children(".hide_menu").animate({left:0},1000).done(function(){
			$(this).children(".hide_menu").hide();
		});
		


	});
});