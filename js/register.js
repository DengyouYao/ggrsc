$(function(){
	$(".footer").load("include/footer.html");
	var usernameExist=false;
	$("form").on("focus","input",function(){
		$(this).parents("dl").css({
			borderColor:"#81d951",
			zIndex:3
		});
	})
	$("form").on("blur","input",function(){
		var index=$(this).parents("dl").index();
		$(this).parents("dl").css({
			borderColor:"#E6E6E6",
			zIndex:0
		});
		var reg,status;
		if (index==0) {
			reg=/^[\u4E00-\u9FA5A-Za-z0-9_]{3,20}$/;
			status=reg.test($(this).val());
		}else if (index==1) {
			reg=/^.{6,20}$/;
			status=reg.test($(this).val());
		}else if(index==3){
			reg=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
			status=reg.test($(this).val());
		}else if (index==2) {			
			status=($("#password").val()==$("#repassword").val());
		}		
		if (status) {
			$(this).parents("dd").children("span").hide();
			console.log($(this).text());
			$(this).parents("dd").children("span").hide();
			usernameExist=true;
			if (index==0) {
				$.ajax({
					type:"post",
					url:"../php/checked.php",				
					data:{
						username:$(this).val()
					},
					dataType:"json",
					success:function(requestData){
						if (requestData.status==0) {
							$("#username").parents("dd")
								   .children("span")
								   .text("用户已存在")
								   .show();
							console.log($("#username").parents("dd").children("span").text());
							usernameExist=false;
						}else if (requestData.status==1) {
							$("#username").parents("dd").children("span").hide();
							usernameExist=true;
						}
					}
				});	
			}
			
		}else{
			$(this).parents("dd").children("span").show();
		}
	})
	$(".btnregister").click(function(){
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
				if (usernameExist) {
					$.post("../php/register.php",{
						username:$("#username").val(),
						password:$("#password").val(),
						email:$("#email").val()
					},function(data){
						if (data.status===1) {
							alert("注册成功 ,请登录");
							location="login.html";
						}else if (data.status===0) {
							alert("注册失败，请稍后重试");
						}
					},"json");
				}		
			}	
		});	
	});
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