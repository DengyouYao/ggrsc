$(function(){
	$.cookie.json=true;
	var users=$.cookie("username");
	var totalprice=$.cookie("totalprice");
	$("#cartTotal").text(totalprice);
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

	//一部加载地址信息
	$.when(
		$.ajax("http://route.showapi.com/1149-1?showapi_appid=29550&showapi_sign=08402fce064a484baad949d9a18f75e7&level=1"),
		$.ajax("http://route.showapi.com/1149-1?showapi_appid=29550&showapi_sign=08402fce064a484baad949d9a18f75e7&level=1&page=2")
	).then(function(data1,data2){

		var html="<option value='-1'>-请选择-</option>";
		data1[0].showapi_res_body.data.forEach(function(province){
			html+=`<option value="${province.id}">${province.areaName}</option>`;
		});
		data2[0].showapi_res_body.data.forEach(function(province){
			html+=`<option value="${province.id}">${province.areaName}</option>`;
		});
		$("#province").html(html);
	});


	$("#province").change(function(){
		var _parentId=$(this).val();
		if (_parentId===-1) {
			return;
		}
		$("#city").show();		
		var url="http://route.showapi.com/1149-2?showapi_appid=29550&showapi_sign=08402fce064a484baad949d9a18f75e7&parentId=" + _parentId;
		var html="<option value='-1'>-请选择-</option>";
		$.getJSON(url,function(data){
			data.showapi_res_body.data.forEach(function(city){
				html+=`<option value="${city.id}">${city.areaName}</option>`;
			});
			$("#city").html(html);
		});
	});
	$("#city").change(function(){
		var _parentId=$(this).val();
		if (_parentId===-1) {
			return;
		}
		$("#district").show();		
		var url="http://route.showapi.com/1149-2?showapi_appid=29550&showapi_sign=08402fce064a484baad949d9a18f75e7&parentId=" + _parentId;
		var html="<option value='-1'>-请选择-</option>";
		$.getJSON(url,function(data){
			data.showapi_res_body.data.forEach(function(city){
				html+=`<option value="${city.id}">${city.areaName}</option>`;
			});
			$("#district").html(html);
		});		
	});
	$("#district").change(function(){
		var _parentId=$(this).val();
		if (_parentId===-1) {
			return;
		}
		$("#cun").show();
		var url="http://route.showapi.com/1149-2?showapi_appid=29550&showapi_sign=08402fce064a484baad949d9a18f75e7&parentId=" + _parentId;
		var html="<option value='-1'>-请选择-</option>";
		$.getJSON(url,function(data){
			data.showapi_res_body.data.forEach(function(city){
				html+=`<option value="${city.id}">${city.areaName}</option>`;
			});
			$("#cun").html(html);
		});	
	});

	//判断输入信息
	$(".hr16").click(function(){
		var name=$(".name").val();
		var addr=$(".addr").val();
		var phone=$(".phone").val();
		var tel=$(".tel").val();
		if (name&&addr&&(phone||tel)) {
			$(".submit-bth").addClass("ok");
			$(".submit-bth").click(function(){
				alert("确认提交订单");
			})
		}else {
			$(".submit-bth").removeClass("ok");
		}

	});
});