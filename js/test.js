$(function(){
	$.getJSON("json/productlist.json",function(data){
		console.log(data[0]);
		var html = template("container_products", {products:data});
		$(".box-list-item").html(html);
	})
});