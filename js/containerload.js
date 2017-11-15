$(function(){

	//商务印刷数据加载
	$.getJSON("json/container.json",function(data){
		var html = template("container_products", {products:data.shangwuyinshua.zhipinyinshua});
		var html2 = template("container_products", {products:data.shangwuyinshua.pvcyinshua});
		$(".shangwuyinshua .right .zhipinyinshua ul").html(html);
		$(".shangwuyinshua .right .pvcyinshua ul").html(html2);
	}).done(function(){
		$(".shangwuyinshua .right .goods-list ul").delegate("li","mouseenter",function(){
			$(".shangwuyinshua .right .goods-list ul").find("li").css({opacity:0.5});
			$(this).css({opacity:1});
		});
		$(".shangwuyinshua .right .goods-list ul").delegate("li","mouseleave",function(){
			$(".shangwuyinshua .right .goods-list ul").find("li").css({opacity:1});
			// $(this).css({opacity:1});
		});
		//切换
		$(".shangwuyinshua .right .tabs-nav li").hover(function(){
			$(".shangwuyinshua .right .tabs-nav li").removeClass("tabs-selected");
			$(this).addClass("tabs-selected");
			$(this).css({cursor:"pointer",color:"red"});
			var index=$(this).index();
			$(".shangwuyinshua .right .goods-list").removeClass("current-list-show");
			$(".shangwuyinshua .right .goods-list").eq(index).addClass("current-list-show");
		},function(){

		});
	});
	//喷绘写真数据加载
	$.getJSON("json/container.json",function(data){
		var html = template("container_products", {products:data.penhuixiezhen.shangpintuijian});
		var html2 = template("container_products", {products:data.penhuixiezhen.xiezhencailiao});

		$(".penhuixiezhen .right .zhipinyinshua ul").html(html);
		$(".penhuixiezhen .right .pvcyinshua ul").html(html2);
	}).done(function(){
		$(".penhuixiezhen .right .goods-list ul").delegate("li","mouseenter",function(){
			$(".penhuixiezhen .right .goods-list ul").find("li").css({opacity:0.5});
			$(this).css({opacity:1});
		});
		$(".penhuixiezhen .right .goods-list ul").delegate("li","mouseleave",function(){
			$(".container-main-list .right .goods-list ul").find("li").css({opacity:1});
			// $(this).css({opacity:1});
		});
		//切换
		$(".penhuixiezhen .right .tabs-nav li").hover(function(){
			$(".penhuixiezhen .right .tabs-nav li").removeClass("tabs-selected");
			$(this).addClass("tabs-selected");
			$(this).css({cursor:"pointer",color:"red"});
			var index=$(this).index();
			$(".penhuixiezhen .right .goods-list").removeClass("current-list-show");
			$(".penhuixiezhen .right .goods-list").eq(index).addClass("current-list-show");
		},function(){

		});

		$(".penhuixiezhen .right .tabs-nav li").hover(function(){
			$(".penhuixiezhen .right .tabs-nav li").removeClass("tabs-selected");
			$(this).addClass("tabs-selected");
			$(this).css({cursor:"pointer",color:"red"});
			var index=$(this).index();
			$(".penhuixiezhen .right .goods-list").removeClass("current-list-show");
			$(".penhuixiezhen .right .goods-list").eq(index).addClass("current-list-show");
		},function(){

		});
	});
	//广告板材数据加载
	$.getJSON("json/container.json",function(data){
		var html = template("container_products", {products:data.guanggaobancai});

		$(".guanggaobancai .right .goods-list ul").html(html);
	}).done(function(){
		$(".guanggaobancai .right .goods-list ul").delegate("li","mouseenter",function(){
			$(".guanggaobancai .right .goods-list ul").find("li").css({opacity:0.5});
			$(this).css({opacity:1});
		});
		$(".guanggaobancai .right .goods-list ul").delegate("li","mouseleave",function(){
			$(".container-main-list .right .goods-list ul").find("li").css({opacity:1});
			// $(this).css({opacity:1});
		});
		
	});
	//灯箱照明数据加载
	$.getJSON("json/container.json",function(data){
		var html = template("container_products", {products:data.dengxiangzhaoming});

		$(".dengxiangzhaoming .right .goods-list ul").html(html);
	}).done(function(){
		$(".dengxiangzhaoming .right .goods-list ul").delegate("li","mouseenter",function(){
			$(".dengxiangzhaoming .right .goods-list ul").find("li").css({opacity:0.5});
			$(this).css({opacity:1});
		});
		$(".dengxiangzhaoming .right .goods-list ul").delegate("li","mouseleave",function(){
			$(".container-main-list .right .goods-list ul").find("li").css({opacity:1});
			// $(this).css({opacity:1});
		});
		
	});
	//工艺字金属字数据加载
	$.getJSON("json/container.json",function(data){
		var html = template("container_products", {products:data.gongyijinshuzi});

		$(".gongyijinshuzi .right .goods-list ul").html(html);
	}).done(function(){
		$(".gongyijinshuzi .right .goods-list ul").delegate("li","mouseenter",function(){
			$(".gongyijinshuzi .right .goods-list ul").find("li").css({opacity:0.5});
			$(this).css({opacity:1});
		});
		$(".gongyijinshuzi .right .goods-list ul").delegate("li","mouseleave",function(){
			$(".container-main-list .right .goods-list ul").find("li").css({opacity:1});
			// $(this).css({opacity:1});
		});
		
	});
	//展览展示数据加载
	$.getJSON("json/container.json",function(data){
		var html = template("container_products", {products:data.zhanlanzhanshi});

		$(".zhanlanzhanshi .right .goods-list ul").html(html);
	}).done(function(){
		$(".zhanlanzhanshi .right .goods-list ul").delegate("li","mouseenter",function(){
			$(".zhanlanzhanshi .right .goods-list ul").find("li").css({opacity:0.5});
			$(this).css({opacity:1});
		});
		$(".zhanlanzhanshi .right .goods-list ul").delegate("li","mouseleave",function(){
			$(".container-main-list .right .goods-list ul").find("li").css({opacity:1});
			// $(this).css({opacity:1});
		});
		
	});
	//广告辅料数据加载
	$.getJSON("json/container.json",function(data){
		var html = template("container_products", {products:data.guanggaofuliao});

		$(".guanggaofuliao .right .goods-list ul").html(html);
	}).done(function(){
		$(".guanggaofuliao .right .goods-list ul").delegate("li","mouseenter",function(){
			$(".guanggaofuliao .right .goods-list ul").find("li").css({opacity:0.5});
			$(this).css({opacity:1});
		});
		$(".guanggaofuliao .right .goods-list ul").delegate("li","mouseleave",function(){
			$(".container-main-list .right .goods-list ul").find("li").css({opacity:1});
			// $(this).css({opacity:1});
		});
		
	});
	//LED照明数据加载
	$.getJSON("json/container.json",function(data){
		var html = template("container_products", {products:data.ledzhaoming});

		$(".ledzhaoming .right .goods-list ul").html(html);
	}).done(function(){
		$(".ledzhaoming .right .goods-list ul").delegate("li","mouseenter",function(){
			$(".ledzhaoming .right .goods-list ul").find("li").css({opacity:0.5});
			$(this).css({opacity:1});
		});
		$(".ledzhaoming .right .goods-list ul").delegate("li","mouseleave",function(){
			$(".container-main-list .right .goods-list ul").find("li").css({opacity:1});
			// $(this).css({opacity:1});
		});
		
	});
});