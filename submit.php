<?php

include('verify.php');

if ($output['name'] && $output['email'] && $output['phone'] && $output['postcode'] ){
	$sql = "INSERT INTO `users` (`name`, `phone`, `email`) VALUES (:name, :phone, :email);";
	$stmt = $db -> prepare( $sql );
	$stmt -> bindParam( ':name', $name, PDO::PARAM_STR );
	$stmt -> bindParam( ':phone', $phone, PDO::PARAM_STR );
	$stmt -> bindParam( ':email', $email, PDO::PARAM_STR );
	$stmt -> execute();

	// echo json_encode("true");
};


?>