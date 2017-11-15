$(function(){
	var currentIndex=0;
	var nextIndex=2;
	var len=$(".row").width();

	setInterval(function(){
		move();
	},300);
	function move(){
		var _left=-1*len*nextIndex+"px";
		$(".tejia-products").stop().animate({left:_left},1000);
		nextIndex++;
	}
});