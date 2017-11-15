$(function(){
	$.cookie.json=true;
	var users=$.cookie("username");
	var products;
	if (users) {
		$.ajax({
			type:"get",
			url:"php/cart.php",
			data:{username:users.username,action:"load"},
			async:true,
			dataType:"json",
			success:function(data){
				$.cookie("products",data.data,{path:"/"});
				products=$.cookie("products") || [];
				$.ajax({
					type:"get",
					url:"html/include/search.html",
					async:true,
					success:function(data){
						$(".search").html(data);				
					}
				}).done(function(){
					$(".cart-list-amounts").text(products.length);
				});
			}
		});
	}else {
		products=$.cookie("products") || [];
		$.ajax({
			type:"get",
			url:"html/include/search.html",
			async:true,
			success:function(data){
				$(".search").html(data);				
			}
		}).done(function(){
			$(".cart-list-amounts").text(products.length);
		});
	}
	
	$.ajax({
		type:"get",
		url:"html/include/header.html",
		async:true,
		success:function(data){
			$(".header").html(data);
			if (users) {
				$(".right").find("li").eq(0).html("你好<a href='javascript:void(0);'>"+users.username+"</a><a href='html/login.html' class='back_login'>退出</a>");
			}					
		}
	}).done(function(){
		//点击退出 登录
		$(".back_login").click(function(){
			$.cookie("products",null,{path:"/",expires:-1});
		});	
	});
	
	$(".nav").load("html/include/nav.html");
	$(".link").load("html/include/link.html");
	$(".footer").load("html/include/footer.html");
	
	
	var currentIndex=0;
	var nextIndex=1;
	var len=$(".image").children("li").length;
	// var tiner;
	$(".image").everyTime("3s",move);

	//创建小圆点
	var html="<li><a href='javascript:void(0);' class='current'></a></li>";
	for(var i=0;i<len-1;i++){
		 html+="<li><a href='javascript:void(0);'></a></li>";
	}
	$(".circle").html(html);
	$(".circle").css({
		width:25*len+"px",
		margin:"0 auto"
	});
	$(".circle").find("li").css({
		display:"block",
		width:20+"px",
		float:"left",
		marginLeft:"5px",
		borderRadius:"50%",
		opacity:"0.3",
		background:"#000"
		// margin:"0 auto"
	});
	$(".circle").find("a").css({
		display:"block",		
		width:"20px",
		borderRadius:"50%",
		opacity:"1",
		height:"20px"		
	});
	//点击小圆点进行切换
	$(".circle").delegate("li","click",function(){
		nextIndex=$(this).index();
		move();
	});
	//特价商品区
	$.getJSON("json/rightbanner.json",function(data){
		// 在页面中显示购物车中信息
		// 渲染模板
		var html = template("tehui_products", {products:data.left});
		$(".tejia-products").html(html);
	}).done(function(){
		var currentIndex=1;
		var nextIndex=2;
		var len=$(".row").width();
		var num=$(".tejia-products").children().length;

		// $(".row").eq(0).clone(true).
		$("<div class='prev'><</div><div class='next'>></div>").appendTo(".middle");
		$(".prev, .next").css({
			width: "30px",
			height:"40px",
			background:"#000",
			position:"absolute",
			top:"90px",			
			color:"#fff",
			opacity:0.6,
			cursor:"pointer",
			"text-align":"center",
			"line-height":"40px"
		});
		$(".next").css("right","0");

		$(".next").click(function(){
			move();
		});
		$(".prev").click(function(){
			nextIndex=currentIndex-1;

			move();
		});
		$(".tejia-products").everyTime("2s",move);
		//鼠标移入移除启动和停止计时器
		$(".tejia-products").mouseenter(function(){
			$(".tejia-products").stopTime();
		})
		$(".tejia-products").mouseleave(function(){
			$(".tejia-products").everyTime("2s",move);
		})
		function move(){
			var _left=-1*len*nextIndex;
			$(".tejia-products").stop().animate({left:_left},800);
			currentIndex=nextIndex;
			nextIndex++;
			if (nextIndex>num-1) {
				nextIndex=0;
			}
			
		}
	});

	//今日限时购
	$.getJSON("json/rightbanner.json",function(data){
		
		//添加图片到指定位置
		$(".xianshigou .right").find("img").each(function(index){
			$(".xianshigou .right").find("img").eq(index).attr({src:data.xianshigou[index].src,title:data.xianshigou[index].alt});
		});

	}).done(function(){
		$(".xianshigou .right").delegate("a","mouseenter",function(){
			$(".xianshigou .right").find("a").css({opacity:0.5});
			$(this).css({opacity:1});
		});
		$(".xianshigou .right").delegate("a","mouseleave",function(){
			$(".xianshigou .right").find("a").css({opacity:1});
		});
		$(".pre,.nextt").hover(function(){
			$(this).css({opacity:0.5});
		},function(){
			$(this).css({opacity:0});
		});

		//实现轮播
		var width=$(".xianshigou .right li").width();
		var status=1;

		$(".xianshigou .right ul").everyTime("3s",move);
		$(".xianshigou .right").hover(function(){
			$(".xianshigou .right ul").stopTime();
		},function(){
			$(".xianshigou .right ul").everyTime("3s",move);
		});
		$(".pre,.nextt").click(function(){
			move();
		})
		function move(){
			var _left;
			if (status===1) {
				_left=-1*width;
			}else if (status===-1) {
				_left=0;
			}
			$(".xianshigou .right ul").stop().animate({left:_left},300);
			status=-status;
			
		}
	});

	//热卖商品
	$.getJSON("json/remaishangpin.json",function(data){
		var html1 = template("remai_products", {products:data.remaishangpin});
		$(".remai-list ul").html(html1);
		var html2 = template("remai_products", {products:data.xinpinshangjia});
		$(".xinpin-list ul").html(html2);
		var html3 = template("remai_products", {products:data.fengkuangqianggou});
		$(".fengkuang-list ul").html(html3);
		var html4 = template("remai_products", {products:data.cainixihuang});
		$(".like-list ul").html(html4);	
		var html5 = template("remai_products", {products:data.repingshangpin});
		$(".reping-list ul").html(html5);	

		//加载商城快报
		$(".right-layout .news li").each(function(index){
			$(this).children("a").text(data.news[index].title).end()
					.children("span").text(data.news[index].time);
		})
		
	}).done(function(){
		$(".remenshangpin .left-layout .tabs-nav li").hover(function(){
			$(".remenshangpin .left-layout .tabs-nav li").removeClass("current-title");
			$(this).addClass("current-title");
			var index=$(this).index();
			$(".remenshangpin .left-layout .list").removeClass("current-list");
			$(".remenshangpin .left-layout .list").eq(index).addClass("current-list");
		},function(){

		});

		//商报链接区效果
		$(".right-layout .links ul").delegate("li","mouseenter",function(){
			$(this).find("i").stop().animate({top:"10px"},200)
						  .animate({top:"15px"},200);
		});
	});
	function move(){ //定义图片运动的函数
		$(".image").children("li").eq(currentIndex).fadeOut(1000);
		$(".image").children("li").eq(nextIndex).fadeIn(1000);

		$(".circle").find("li").eq(currentIndex).children("a").removeClass();
		$(".circle").find("li").eq(nextIndex).children("a").addClass("current");

		$(".circle").find("li").css({
			opacity:0.3
		})
		$(".circle").find("li").eq(nextIndex).css({
			opacity:1
		});
		currentIndex=nextIndex;
		nextIndex++;		
		if(nextIndex>=len){
			nextIndex=0;
		}
	}
});
