$(function(){
	$.cookie.json=true;
	var users=$.cookie("username");
	$.ajax({
		type:"get",
		url:"../html/include/header.html",
		async:true,
		success:function(data){
			$(".header").html(data);
			if (users) {
				$(".right").find("li").eq(0).html("你好<a href='javascript:void(0);'>"+users.username+"</a><a href='http://localhost/javascript/ggrsc/html/login.html'>退出</a>");
			}				
		}
	});	
	$(".link").load("../html/include/link.html");
	$(".footer").load("../html/include/footer.html");

	var products=$.cookie("products");
	var html=template("cart_products",{products:products});
	$(".cart-products-list").html(html);
	checkAll();
	calcTotal();
	isTrue();

	//点击删除按钮删除商品
	$(".row").delegate(".del","click",function(){
		if(confirm("确定要删除商品？")){
			$(this).parents(".row").remove();
			var id=$(this).parents(".row").find(".id").text();
			var index=findProd(id,products);
			products.splice(index,1);
			$.cookie("products",products,{expires:7,path:"/"});
			// 从服务器保存的购物车商品中删除
			if (users) {
				$.get("../php/cart.php",{
					action:"del",
					username:users.username,
					prod_id:id
				},"json");
			}

			calcTotal();
		}
	});
	//数量加减
	$(".cart-products-list").delegate(".add,.minus","click",function(){
		var _row=$(this).parents(".row");
		var id=_row.find(".id").text();
		var index=findProd(id,products);
		isTrue();
		_row.find(".ck-prod").prop("checked",true);

		if ($(this).is(".minus")) {
			if (products[index].amount<=1) {
				return;
			}
			products[index].amount--;
		}else if ($(this).is(".add")) {
			products[index].amount++;
		}

		_row.find(".amount").val(products[index].amount);
		_row.find(".sub").text(products[index].amount*products[index].newprice);
		$.cookie("products",products,{expires:7,path:"/"});
		// 从服务器保存的购物车商品中数量修改
		if (users) {
			console.log("kkk");
			$.get("../php/cart.php",{
				action:"modify",
				username:users.username,
				prod_id:id,
				amount:products[index].amount
			},"json");
		}
		checkAll();
		calcTotal()		
	});
	//数量修改，文本框失去焦点修改价格
	$(".cart-products-list .amount").blur(function(){
		var _row=$(this).parents(".row");
		var id=_row.find(".id").text();
		isTrue();
		_row.find(".ck-prod").prop("checked",true);
		checkAll();

		var prod=products[findProd(id,products)];
		if (!/^[1,9]\d*$/.test($(this).val())) {
			$(this).val(prod.amount);
			return;
		}
		prod.amount=$(this).val();
		$.cookie("products",products,{path:"/",expires:7});
		_row.find(".sub").text(prod.amount*prod.newprice);
		//更新在数据库中
		if (users) {
			$.get("../php/cart.php",{
				action:"modify",
				username:users.username,
				prod_id:id,
				amount:prod.amount
			},"json");
		}
		calcTotal();
	});
	// 全选功能
	$(".check-all").click(function(){
		//获取全选按钮的状态
		var status=$(this).prop("checked");
		$(".ck-prod").prop("checked",status);
		isTrue();
		calcTotal();
	});
	$(".cart-products-list .row").click(function(){
		checkAll();
		isTrue();
		calcTotal();
	});
	//是否全选勾起
	function checkAll(){
		var status=($(".cart-products-list .ck-prod:checked").length===products.length);

		$(".check-all").prop("checked",status);
	}
	// 定义函数，计算商品合计金额
	function calcTotal(){
		var sum=0;
		$(".cart-products-list .ck-prod:checked").each(function(index,element){
			sum+=Number($(this).parents(".row").find(".sub").text());
		});
		$("#cartTotal").text(sum.toFixed(2));
		// isTrue();
	}
	//是否禁用确认订单按钮
	function isTrue(){
		var status=($(".cart-products-list .ck-prod:checked").length>=1);
		if(status){
			$(".submit-bth").addClass("ok");
		}else {
			$(".submit-bth").removeClass("ok");
		}
	}	
	// 查找在商品数组中是否有某id的商品，返回其在数组中的下标，如果不存在，则返回-1
	function findProd(id,products){
		for (var i = 0; i < products.length; i++) {
			if (id==products[i].id) {
				return i;
			}
		}
		return -1;
	}
	//点击确认订单
	$(".submit-bth").click(function(){
		$.cookie("totalprice",$("#cartTotal").text(),{path:"/"});
	});	
});