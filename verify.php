<?php
	try {
	    
		$db = new PDO('mysql:host=localhost;dbname=< databaseName >;charset=utf8','< username >','< password >');
		set error mode, which allows errors to be thrown, rather than silently ignored
		$db -> setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
		$db -> setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

		$sql = "SELECT * FROM users WHERE users.email = :email";
		$stmt = $db -> prepare( $sql );
		$output['dbError'] = "None";
	} catch (PDOException $e) {
	    $output['dbError'] = 'Connection failed: ' . $e->getMessage();
	}

	$output;
	$output['CurrentPHPVersion'] = phpversion();

// CHECK INPUT FIELDS

	// NAME
	if (isset($_POST['name'])){
		$name = $_POST['name'];
		if (strlen($name) > 2){
			$output['name'] = true;
		} else {
			$output['name'] = false;
		}
	} else {
		$output['name'] = false;
	}

	// EMAIL
	if (isset($_POST['email'])){
		$email = $_POST['email'];
		if (preg_match('/^(?!(?:(?:\x22?\x5C[\x00-\x7E]\x22?)|(?:\x22?[^\x5C\x22]\x22?)){255,})(?!(?:(?:\x22?\x5C[\x00-\x7E]\x22?)|(?:\x22?[^\x5C\x22]\x22?)){65,}@)(?:(?:[\x21\x23-\x27\x2A\x2B\x2D\x2F-\x39\x3D\x3F\x5E-\x7E]+)|(?:\x22(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|(?:\x5C[\x00-\x7F]))*\x22))(?:\.(?:(?:[\x21\x23-\x27\x2A\x2B\x2D\x2F-\x39\x3D\x3F\x5E-\x7E]+)|(?:\x22(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|(?:\x5C[\x00-\x7F]))*\x22)))*@(?:(?:(?!.*[^.]{64,})(?:(?:(?:xn--)?[a-z0-9]+(?:-[a-z0-9]+)*\.){1,126}){1,}(?:(?:[a-z][a-z0-9]*)|(?:(?:xn--)[a-z0-9]+))(?:-[a-z0-9]+)*)|(?:\[(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){7})|(?:(?!(?:.*[a-f0-9][:\]]){7,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?)))|(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){5}:)|(?:(?!(?:.*[a-f0-9]:){5,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3}:)?)))?(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))(?:\.(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))){3}))\]))$/iD', $email)){
			
			// Checks if email already in database
			$stmt -> bindParam( ':email', $email, PDO::PARAM_STR );
			$stmt -> execute();
			$data = $stmt -> fetch();

			if (empty($data)) {
				$output['email'] = true;
			} else {
				$output['email'] = false;
				$output['errText'] = "Email is already in use.";
			}

		} else {
			$output['email'] = false;
		}
	} else {
		$output['email'] = false;
	}

	// PHONE
	if (isset($_POST['phone'])){
		$phone = $_POST['phone'];
		if (preg_match('/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/', $phone)){
			$output['phone'] = true;
		} else {
			$output['phone'] = false;
		}
	} else {
		$output['phone'] = false;
	}

	// POSTAL CODE
	if (isset($_POST['postcode'])){
		$postcode = $_POST['postcode'];
		if (preg_match('/^(\d{5}(-\d{4})?|[A-CEGHJ-NPRSTVXY]\d[A-CEGHJ-NPRSTV-Z] ?\d[A-CEGHJ-NPRSTV-Z]\d)$/', strtoupper($postcode))){
			$output['postcode'] = true;
		} else {
			$output['postcode'] = false;
		}
	} else {
		$output['postcode'] = false;
	}

	echo json_encode($output);

?>