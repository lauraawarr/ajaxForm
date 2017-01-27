<?php
try {
	    $db = new PDO('mysql:host=localhost;dbname=warrla_contact;charset=utf8','warrla','cjp!123!law', array(
    		PDO::ATTR_PERSISTENT => true
		));
		// $db = new PDO('mysql:host=localhost;dbname=contact;charset=utf8','root','root', array(
  //   		PDO::ATTR_PERSISTENT => true
		// ));
		// $db = new PDO('mysql:host=localhost;dbname=< databaseName >;charset=utf8','< username >','< password >');
		//set error mode, which allows errors to be thrown, rather than silently ignored
		$db -> setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
		$db -> setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

	} catch (PDOException $e) {
	   $output['error'] = 'Connection failed: ' . $e->getMessage();
	}
?>
