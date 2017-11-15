
<?php
	// 获取待检测的用户名
	if (isset($_POST["username"])) {
		$username = $_POST["username"];
		$password = $_POST["password"];
		$email = $_POST["email"];
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
	$sql = "INSERT INTO users (username, password, email) VALUES ('$username', '$password', '$email')";
	/*$sql="INSERT INTO user (firstname, lastname, email)
			VALUES ('John', 'Doe', 'john@example.com')"*/
	$result = mysqli_query($conn, $sql);
	if ($result) {
		echo '{"status":1, "message":"success"}';
	} else {
		echo '{"status":0, "message":"failed"}';
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