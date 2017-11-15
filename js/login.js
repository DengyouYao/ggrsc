$(function(){
	$.cookie.json=true;
	$.cookie("username",null,{path:"/",expires:-1});
	$(".footer").load("include/footer.html");
	$("form").on("focus","input",function(){
		$(this).parents(".border").css({
			borderColor:"#81d951",
			zIndex:3
		});
	});
	$("form").on("blur","input",function(){
		$(this).parents(".border").css({
			borderColor:"#CCCCCC",
			zIndex:0
		});
	});
	$(".btnlogin").click(function(){
		var valid=$("#inputcode").val();
		var sid=$(".gen_code").attr("alt");
		var status=false;
		$.ajax({
			type:"get",
			url:"http://route.showapi.com/932-1?showapi_appid=48144&showapi_sign=cd43274bd0f7415b86531138076115f8&checkcode="+valid+"&sid="+sid,
			dataType:"json",
			success:function(data){
				var returnData=data.showapi_res_body;
				if (returnData.valid) {
					status=true;
				}else{
					alert("验证码错误");
					loadCode();
				}
			}
		}).done(function(){
			if (status) {				
				$.post("../php/login.php",{
					username:$("#username").val(),
					password:$("#password").val()
				},function(data){
					if (data.status===1) {
						if ($("#check").prop("checked")) {
							$.cookie("username",data.data,{path:"/",expires:7});
						}else{
							$.cookie("username",data. data,{path:"/"});
						}						 							
						location="../index.html";
					}else if (data.status===0) {
						alert("登录失败，请稍后重试");
					}
				},"json");				
			}	
		});	
	})
	loadCode();
	$(".makecode").click(function(){
		loadCode();
	});
	function loadCode(){
		$.ajax({
			type:"get",
			url:"http://route.showapi.com/932-2?showapi_appid=48144&showapi_sign=cd43274bd0f7415b86531138076115f8",
			dataType:"json",
			success:function(responseData){
				var src=responseData.showapi_res_body.image;
				var sid=responseData.showapi_res_body.sid;
				$(".gen_code").attr({src:src,alt:sid});
			}
		});
	}
	
});
