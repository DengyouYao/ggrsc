$(function(){
	$.cookie.json=true;
	var users=$.cookie("username");
	var products=$.cookie("products") || [];
	$.ajax({
		type:"get",
		url:"include/header.html",
		async:true,
		success:function(data){
			$(".header").html(data);
			if (users) {
				$(".right").find("li").eq(0).html("你好<a href='javascript:void(0);'>"+users.username+"</a><a href='http://localhost/javascript/ggrsc/html/login.html'>退出</a>");
			}					
		}
	});
	$.ajax({
		type:"get",
		url:"include/search.html",
		async:true,
		success:function(data){
			$(".search").html(data);				
		}
	}).done(function(){
		$(".cart-list-amounts").text(products.length);
	});	
	$.ajax({
		type:"get",
		url:"include/nav.html",
		async:true,
		success:function(data){
			$(".nav").html(data);							
		}
	}).done(function(){
		$(".nav .menu-list").hide();

		$(".nav .list").hover(function(){
			$(".menu-list").show();
		},function(){
			$(".menu-list").hide();
		});
	});	
	$(".link").load("include/link.html");
	$(".footer").load("include/footer.html");



	//图片切换进行放大
	$(".container-zoom .cloudzoom-blank .pictures-list").delegate("a","mouseenter",function(){
		$(this).addClass("border-show").siblings().removeClass("border-show");
	});
	$("#zoom_03").elevateZoom({
		// // zoomType:"lens"
		cursor:"crosshair",
		zoomWindowFadeIn:600,
		zoomWindowFadeOut:600,
		zoomWindowWidth: 360,
		zoomWindowHeight: 360,
		zoomWindowOffetx: 25,
		zoomWindowOffety: -10,
		gallery: 'pics', //缩略图id
        lensColour: '#fede4f',//放大镜背景颜色
        borderSize: '2',//右侧放大镜边框尺寸
        borderColour: '#dddddd' //右侧放大镜边框颜色
	});


	//产品数量修改
	$(".buy .input .increase").click(function(){
		var amount=$(".buy .input input").val();
		amount++;
		$(".buy .input input").val(amount);
	});
	$(".buy .input .decrease").click(function(){
		var amount=$(".buy .input input").val();
		amount--;
		if (amount<=1) {
			amount=1;
		}		
		$(".buy .input input").val(amount);
	});
	//加入购物车
	$(".addcart").click(function(){
		var prod={
			id:12,
			title:$(".middle-xiangqing .name h3").text(),
			img:$("#zoom_03").attr("src"),
			newprice:$(".prices-list .newprice").text(),
			oldprice:$(".prices-list .oldprice").text(),
			amount:Number($("#quantity").val())
		};
		console.log(prod.amount);
		var index=findProd(prod.id,products);
		if (index!==-1) {
			products[index].amount+=prod.amount;
		}else if (index==-1) {
			products.push(prod);
		}
		// Number(products[index].amount);
		$(".cart-list-amounts").text(products.length);
		$.cookie("products",products,{expires:7,path:"/"});
	});
	// 查找在商品数组中是否有某id的商品，返回其在数组中的下标，如果不存在，则返回-1
	function findProd(id,products){
		for (var i = 0; i < products.length; i++) {
			if (id===products[i].id) {
				return i;
			}
		}
		return -1;
	}

});