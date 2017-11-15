
<?php
	// 获取待检测的用户名
	if (isset($_REQUEST["username"])) {
		$username = $_REQUEST["username"];
		$password = $_REQUEST["password"];
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
	$sql = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";  
	$result = mysqli_query($conn, $sql);
	
	if ($row = mysqli_fetch_assoc($result)) {
		echo '{"status":1, "message":"success", "data":'. json_encode($row) .'}';
	}else{
		echo '{"status":0, "message":"failed", "data":{}}';
	}
	/*if (mysqli_num_rows($result) > 0) {  
    // 输出数据  
	    while($row = mysqli_fetch_assoc($result)) { 
	    	$arr[]=$row; 
	          
	    } 
	     echo $arr[0]["username"];
	} else {  
	    echo "0 结果";  
	}  */
   
	mysqli_close($conn); 
?>