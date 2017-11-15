<?php
	if (isset($_GET["username"])) {
		$username=$_GET["username"];
		$action=$_GET["action"];
	}
	$servername = "localhost";  
	$usernames = "root";  
	$passwords = "";  
	$dbname = "ggrsc";
	// 创建连接  
	$conn = mysqli_connect($servername, $usernames, $passwords, $dbname);
	if (!$conn) {
    	die("连接失败: " . mysqli_connect_error());  
	}
	mysqli_query($conn,"set character set 'utf8'");
	mysqli_query($conn,"set names 'utf8'");	

	if ($action==="add") {//新增购物车商品
		$sid = $_GET["prod_id"];
		$img = $_GET["img"];
		$title = $_GET["title"];
		$newprice = $_GET["newprice"];
		$oldprice = $_GET["oldprice"];
		$amount = $_GET["amount"];
		$sql = "INSERT INTO carts (id, username, sid, title, img, newprice, oldprice, amount, status) VALUES (NULL, '$username', '$sid', '$title', '$img', '$newprice', '$oldprice', '$amount', '1')";
		echo $sql;
		$result = mysqli_query($conn,$sql);
		if ($result) {
			echo '{"status":1,"message":"success"}';
		}else{
			echo '{"status":0,"message":"failed"}';
		}

	}else if ($action==="modify") { // 修改购物车选购商品数量
		$sid=$_GET["prod_id"];
		$amount=$_GET["amount"];

		$sql = "UPDATE  `ggrsc`.`carts` SET amount='$amount' WHERE username='$username' AND sid='$sid'";
		$result=mysqli_query($conn,$sql);

		// 根据数据修改成功/失败判断
		if ($result) {
			echo '{"status":1, "message":"success"}';
		} else {
			echo '{"status":0, "message":"failed"}';
		}
	}else if ($action==="load") {  // 查询所有的登录用户选购的购物车数据
		// 创建插入数据的SQL语句
		$sql = "SELECT * FROM carts WHERE username='$username'";
		// 执行SQL语句
		$result = mysqli_query($conn,$sql);
		// 根据数据查询成功/失败判断
		$arr = array();
		if (mysqli_num_rows($result) > 0) {  
    		// 输出数据  
		    while($row = mysqli_fetch_assoc($result)) { 
		    	$arr[]=$row;	          
		    }
		}		
		echo '{"status":1, "message":"success", "data":' . json_encode($arr) . '}';
	}else if ($action==="del") { // 删除购物车中选购的商品
		$sid = $_GET["prod_id"];

		// 创建插入数据的SQL语句
		$sql = "DELETE FROM carts WHERE username='$username' AND sid='$sid'";
		// 执行SQL语句
		$result = mysqli_query($conn,$sql);
		// 根据数据修改成功/失败判断
		if ($result) {
			echo '{"status":1, "message":"success"}';
		} else {
			echo '{"status":0, "message":"failed"}';
		}
	}

	mysqli_close($conn);
?>