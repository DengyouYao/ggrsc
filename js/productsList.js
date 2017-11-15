

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
				$(".right").find("li").eq(0).html("你好<a href='javascript:void(0);'>"+users.username+"</a><a href='html/login.html'>退出</a>");
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
	// $(".search").load("include/search.html");
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
		})
	});	
	$(".link").load("include/link.html");
	$(".footer").load("include/footer.html");

	$.getJSON("../json/container.json",function(data){
		var html = template("container_products", {products:data.shangwuyinshua.zhipinyinshua});
		$(".list-pic").html(html);
	})

	//鼠标经过改变样式
	$(".list-pic").delegate(".item","mouseenter",function(){
		$(this).addClass("product-item-show");
		var that=$(this);
		$(this).find(".goods-pic-small").delegate("li","mouseenter",function(){
			that.find(".goods-pic-small li").removeClass("selected");
			$(this).addClass("selected");
		})
	})
	$(".list-pic").delegate(".item","mouseleave",function(){
		$(this).removeClass("product-item-show");
	});

	//点击加入购物车操作
	$(".list-pic").delegate(".add-cart","click",function(){
		var _box=$(this).parents(".item");
		var prod={
			id:_box.find(".id").text(),
			title:_box.find(".goods-name").children("a").text(),
			img:_box.find(".goods-pic").find("img").attr("src"),
			newprice:_box.find(".sale-price").children("i").text(),
			oldprice:_box.find(".mark-price").children("i").text(),
			amount:1
		};
		var products=$.cookie("products") || [];
		var index=findProd(prod.id,products);
		if (index!==-1) {
			products[index].amount++;
		}else if (index==-1) {
			products.push(prod);
		}
		$(".cart-list-amounts").text(products.length);
		$.cookie("products",products,{path:"/"});

		//同步加入数据库中
		if (users){		
			if (index !== -1){
				$.get("../php/cart.php",{
					action:"modify",
					username:users.username,
					prod_id:prod.id,
					amount:products[index].amount				
				},function(data){
				},"json");
			}	
			else{
				$.get("../php/cart.php",{
					action:"add",
					username:users.username,
					prod_id : prod.id,
					img : prod.img,
					title : prod.title,
					newprice : prod.newprice,
					oldprice : prod.oldprice,
					amount : prod.amount
				},"json");
			}				
		}

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